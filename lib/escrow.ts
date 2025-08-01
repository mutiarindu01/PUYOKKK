import { ethers } from 'ethers'
import { createClientSupabaseClient } from './supabase'

// Escrow Smart Contract ABI (simplified)
const ESCROW_ABI = [
  "function createEscrow(address buyer, address seller, uint256 amount, bytes32 orderHash) external payable returns (uint256)",
  "function releaseEscrow(uint256 escrowId) external",
  "function disputeEscrow(uint256 escrowId, string memory reason) external",
  "function resolveDispute(uint256 escrowId, bool favorBuyer) external",
  "function cancelEscrow(uint256 escrowId) external",
  "function getEscrowDetails(uint256 escrowId) external view returns (address, address, uint256, uint8, uint256)",
  "event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount)",
  "event EscrowReleased(uint256 indexed escrowId)",
  "event EscrowDisputed(uint256 indexed escrowId, string reason)",
  "event EscrowCancelled(uint256 indexed escrowId)"
]

export interface EscrowDetails {
  id: string
  contractAddress: string
  orderId: string
  buyerId: string
  sellerId: string
  assetDetails: {
    type: 'ERC20' | 'ERC721' | 'ERC1155'
    contractAddress: string
    tokenId?: string
    amount: number
  }
  paymentAmount: number
  currency: string
  escrowFee: number
  insuranceFee: number
  status: 'created' | 'funded' | 'released' | 'disputed' | 'cancelled'
  milestones: {
    id: string
    name: string
    completed: boolean
    timestamp?: string
  }[]
  disputeId?: string
  createdAt: string
  expiresAt: string
}

export interface CreateEscrowParams {
  orderId: string
  buyerAddress: string
  sellerAddress: string
  assetDetails: EscrowDetails['assetDetails']
  paymentAmount: number
  currency: string
  expirationDays: number
}

export class EscrowService {
  private provider: ethers.JsonRpcProvider | null = null
  private contract: ethers.Contract | null = null
  private supabase = createClientSupabaseClient()

  constructor() {
    this.initializeProvider()
  }

  private initializeProvider() {
    try {
      // Initialize provider (you can use Infura, Alchemy, etc.)
      const infuraId = process.env.INFURA_PROJECT_ID
      const contractAddress = process.env.ESCROW_CONTRACT_ADDRESS

      if (infuraId && contractAddress) {
        this.provider = new ethers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${infuraId}`
        )
        
        // Initialize contract
        this.contract = new ethers.Contract(
          contractAddress,
          ESCROW_ABI,
          this.provider
        )
      } else {
        console.warn('⚠️ Escrow service not configured. Set INFURA_PROJECT_ID and ESCROW_CONTRACT_ADDRESS in .env.local')
      }
    } catch (error) {
      console.error('Failed to initialize escrow provider:', error)
    }
  }

  // Create Escrow Contract
  async createEscrow(params: CreateEscrowParams, signerPrivateKey: string): Promise<EscrowDetails | null> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Calculate fees
      const escrowFee = params.paymentAmount * 0.01 // 1% escrow fee
      const insuranceFee = params.paymentAmount * 0.005 // 0.5% insurance fee
      const totalAmount = params.paymentAmount + escrowFee + insuranceFee

      // Create order hash for verification
      const orderHash = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['string', 'address', 'address', 'uint256'],
          [params.orderId, params.buyerAddress, params.sellerAddress, params.paymentAmount]
        )
      )

      // Execute smart contract transaction
      const tx = await contractWithSigner.createEscrow(
        params.buyerAddress,
        params.sellerAddress,
        ethers.parseEther(params.paymentAmount.toString()),
        orderHash,
        { value: ethers.parseEther(totalAmount.toString()) }
      )

      const receipt = await tx.wait()
      
      // Extract escrow ID from event logs
      const escrowCreatedEvent = receipt.logs?.find(
        (log: any) => {
          try {
            const parsedLog = contractWithSigner.interface.parseLog(log)
            return parsedLog?.name === 'EscrowCreated'
          } catch {
            return false
          }
        }
      )
      
      if (!escrowCreatedEvent) {
        throw new Error('Escrow creation event not found')
      }

      const parsedLog = contractWithSigner.interface.parseLog(escrowCreatedEvent)
      const escrowId = parsedLog?.args?.escrowId?.toString()

      // Create escrow record in database
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + params.expirationDays)

      const escrowData = {
        contract_address: this.contract.target,
        order_id: params.orderId,
        buyer_id: params.buyerAddress,
        seller_id: params.sellerAddress,
        asset_details: params.assetDetails,
        payment_amount: params.paymentAmount,
        currency: params.currency,
        escrow_fee: escrowFee,
        insurance_fee: insuranceFee,
        status: 'created' as const,
        milestones: [
          { id: '1', name: 'Escrow Created', completed: true, timestamp: new Date().toISOString() },
          { id: '2', name: 'Payment Confirmed', completed: false },
          { id: '3', name: 'Asset Transferred', completed: false },
          { id: '4', name: 'Buyer Confirmation', completed: false },
          { id: '5', name: 'Release Funds', completed: false }
        ],
        expires_at: expirationDate.toISOString()
      }

      const { data: createdEscrow, error } = await this.supabase
        .from('escrow_contracts')
        .insert(escrowData)
        .select()
        .single()

      if (error) throw error

      return this.mapDatabaseEscrowToEscrowDetails(createdEscrow)
    } catch (error) {
      console.error('Create escrow failed:', error)
      return null
    }
  }

  // Release Escrow (when both parties agree)
  async releaseEscrow(escrowId: string, signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Execute release transaction
      const tx = await contractWithSigner.releaseEscrow(escrowId)
      await tx.wait()

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({
          status: 'released',
          milestones: [
            // You would update the milestones array here
          ]
        })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Release escrow failed:', error)
      return false
    }
  }

  // Dispute Escrow
  async disputeEscrow(escrowId: string, reason: string, evidence: any[], signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Execute dispute transaction
      const tx = await contractWithSigner.disputeEscrow(escrowId, reason)
      await tx.wait()

      // Create dispute record
      const { data: dispute, error: disputeError } = await this.supabase
        .from('disputes')
        .insert({
          order_id: escrowId, // This should be the actual order ID
          escrow_id: escrowId,
          complainant_id: signer.address,
          respondent_id: '', // You'd need to determine this
          reason,
          status: 'open',
          priority: 'medium',
          evidence
        })
        .select()
        .single()

      if (disputeError) throw disputeError

      // Update escrow status
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({
          status: 'disputed',
          dispute_id: dispute.id
        })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Dispute escrow failed:', error)
      return false
    }
  }

  // Cancel Escrow (before funding)
  async cancelEscrow(escrowId: string, signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      const tx = await contractWithSigner.cancelEscrow(escrowId)
      await tx.wait()

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({ status: 'cancelled' })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Cancel escrow failed:', error)
      return false
    }
  }

  // Get Escrow Details
  async getEscrowDetails(escrowId: string): Promise<EscrowDetails | null> {
    try {
      const { data: escrow, error } = await this.supabase
        .from('escrow_contracts')
        .select('*')
        .eq('id', escrowId)
        .single()

      if (error) throw error

      return this.mapDatabaseEscrowToEscrowDetails(escrow)
    } catch (error) {
      console.error('Get escrow details failed:', error)
      return null
    }
  }

  // Get User Escrows
  async getUserEscrows(userId: string): Promise<EscrowDetails[]> {
    try {
      const { data: escrows, error } = await this.supabase
        .from('escrow_contracts')
        .select('*')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return escrows.map(escrow => this.mapDatabaseEscrowToEscrowDetails(escrow))
    } catch (error) {
      console.error('Get user escrows failed:', error)
      return []
    }
  }

  // Update Milestone
  async updateMilestone(escrowId: string, milestoneId: string, completed: boolean): Promise<boolean> {
    try {
      // Get current escrow
      const { data: escrow, error: fetchError } = await this.supabase
        .from('escrow_contracts')
        .select('milestones')
        .eq('id', escrowId)
        .single()

      if (fetchError) throw fetchError

      // Update milestones
      const milestones = escrow.milestones.map((milestone: any) => {
        if (milestone.id === milestoneId) {
          return {
            ...milestone,
            completed,
            timestamp: completed ? new Date().toISOString() : undefined
          }
        }
        return milestone
      })

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({ milestones })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Update milestone failed:', error)
      return false
    }
  }

  // Automated Escrow Release (based on milestones)
  async checkAndAutoRelease(escrowId: string): Promise<boolean> {
    try {
      const escrowDetails = await this.getEscrowDetails(escrowId)
      if (!escrowDetails) return false

      // Check if all milestones are completed
      const allMilestonesCompleted = escrowDetails.milestones.every(m => m.completed)
      
      if (allMilestonesCompleted && escrowDetails.status === 'funded') {
        // Auto-release after 24 hours if no disputes
        const releaseTime = new Date(escrowDetails.createdAt)
        releaseTime.setHours(releaseTime.getHours() + 24)
        
        if (new Date() >= releaseTime) {
          // Use system private key for auto-release
          const privateKey = process.env.PRIVATE_KEY
          if (privateKey) {
            return await this.releaseEscrow(escrowId, privateKey)
          }
        }
      }

      return false
    } catch (error) {
      console.error('Auto release check failed:', error)
      return false
    }
  }

  // Calculate Escrow Fees
  calculateFees(amount: number): { escrowFee: number; insuranceFee: number; total: number } {
    const escrowFee = amount * 0.01 // 1%
    const insuranceFee = amount * 0.005 // 0.5%
    return {
      escrowFee,
      insuranceFee,
      total: amount + escrowFee + insuranceFee
    }
  }

  // Private helper method
  private mapDatabaseEscrowToEscrowDetails(dbEscrow: any): EscrowDetails {
    return {
      id: dbEscrow.id,
      contractAddress: dbEscrow.contract_address,
      orderId: dbEscrow.order_id,
      buyerId: dbEscrow.buyer_id,
      sellerId: dbEscrow.seller_id,
      assetDetails: dbEscrow.asset_details,
      paymentAmount: dbEscrow.payment_amount,
      currency: dbEscrow.currency,
      escrowFee: dbEscrow.escrow_fee,
      insuranceFee: dbEscrow.insurance_fee,
      status: dbEscrow.status,
      milestones: dbEscrow.milestones,
      disputeId: dbEscrow.dispute_id,
      createdAt: dbEscrow.created_at,
      expiresAt: dbEscrow.expires_at
    }
  }
}

// Hook for client-side usage
export const useEscrow = () => {
  const escrowService = new EscrowService()
  
  return {
    createEscrow: escrowService.createEscrow.bind(escrowService),
    releaseEscrow: escrowService.releaseEscrow.bind(escrowService),
    disputeEscrow: escrowService.disputeEscrow.bind(escrowService),
    cancelEscrow: escrowService.cancelEscrow.bind(escrowService),
    getEscrowDetails: escrowService.getEscrowDetails.bind(escrowService),
    getUserEscrows: escrowService.getUserEscrows.bind(escrowService),
    updateMilestone: escrowService.updateMilestone.bind(escrowService),
    checkAndAutoRelease: escrowService.checkAndAutoRelease.bind(escrowService),
    calculateFees: escrowService.calculateFees.bind(escrowService)
  }
}
