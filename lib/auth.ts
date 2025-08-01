import { createClientSupabaseClient, createServerSupabaseClient, supabaseAdmin } from './supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ethers } from 'ethers'

export interface AuthUser {
  id: string
  email?: string
  walletAddress?: string
  username: string
  avatarUrl?: string
  kycLevel: 'none' | 'basic' | 'advanced' | 'premium'
  kycStatus: 'pending' | 'verified' | 'rejected'
  membershipTier: 'basic' | 'silver' | 'gold' | 'platinum'
  reputationScore: number
  totalTrades: number
  successRate: number
  escrowRating: number
  is2FAEnabled: boolean
  isPhoneVerified: boolean
  isEmailVerified: boolean
  transactionLimits: {
    daily: number
    monthly: number
    used: {
      daily: number
      monthly: number
    }
  }
  loyaltyPoints: number
  location: {
    country: string
    city: string
  }
}

export interface WalletAuthParams {
  walletAddress: string
  signature: string
  message: string
  username?: string
}

export interface EmailAuthParams {
  email: string
  password: string
  username?: string
}

export class AuthService {
  private supabase = createClientComponentClient()

  // Wallet Authentication
  async signInWithWallet({ walletAddress, signature, message, username }: WalletAuthParams): Promise<AuthUser | null> {
    try {
      // Verify the signature using ethers v6 syntax
      const recoveredAddress = ethers.verifyMessage(message, signature)
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error('Invalid signature')
      }

      // Check if user exists
      const { data: existingUser, error: fetchError } = await this.supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      let user: AuthUser

      if (existingUser) {
        // Update last active
        const { data: updatedUser, error: updateError } = await this.supabase
          .from('users')
          .update({ last_active: new Date().toISOString() })
          .eq('id', existingUser.id)
          .select()
          .single()

        if (updateError) throw updateError
        user = this.mapDatabaseUserToAuthUser(updatedUser)
      } else {
        // Create new user
        if (!username) {
          throw new Error('Username is required for new wallet registration')
        }

        const newUserData = {
          wallet_address: walletAddress.toLowerCase(),
          username,
          kyc_level: 'none' as const,
          kyc_status: 'pending' as const,
          membership_tier: 'basic' as const,
          reputation_score: 0,
          total_trades: 0,
          success_rate: 0,
          response_time: 'Not available',
          escrow_rating: 0,
          dispute_count: 0,
          warning_count: 0,
          is_2fa_enabled: false,
          is_phone_verified: false,
          is_email_verified: false,
          transaction_limits: {
            daily: 50000000, // 50M IDR for basic users
            monthly: 1000000000, // 1B IDR
            used: { daily: 0, monthly: 0 }
          },
          loyalty_points: 0,
          referral_code: this.generateReferralCode(),
          languages: ['Bahasa Indonesia'],
          preferred_payments: [],
          location: { country: 'Indonesia', city: '' },
          last_active: new Date().toISOString()
        }

        const { data: createdUser, error: createError } = await this.supabase
          .from('users')
          .insert(newUserData)
          .select()
          .single()

        if (createError) throw createError
        user = this.mapDatabaseUserToAuthUser(createdUser)
      }

      // Create session token
      const token = this.createSessionToken(user)
      
      // Store in local storage or cookie
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    } catch (error) {
      console.error('Wallet authentication failed:', error)
      return null
    }
  }

  // Email Authentication
  async signInWithEmail({ email, password }: EmailAuthParams): Promise<AuthUser | null> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Get user profile from our custom users table
      const { data: userProfile, error: profileError } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (profileError) throw profileError

      const user = this.mapDatabaseUserToAuthUser(userProfile)
      
      if (typeof window !== 'undefined') {
        const token = this.createSessionToken(user)
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    } catch (error) {
      console.error('Email authentication failed:', error)
      return null
    }
  }

  // Email Registration
  async signUpWithEmail({ email, password, username }: EmailAuthParams & { username: string }): Promise<AuthUser | null> {
    try {
      // First create auth user
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email,
        password
      })

      if (authError) throw authError

      // Then create profile in our users table
      const newUserData = {
        email,
        username,
        kyc_level: 'none' as const,
        kyc_status: 'pending' as const,
        membership_tier: 'basic' as const,
        reputation_score: 0,
        total_trades: 0,
        success_rate: 0,
        response_time: 'Not available',
        escrow_rating: 0,
        dispute_count: 0,
        warning_count: 0,
        is_2fa_enabled: false,
        is_phone_verified: false,
        is_email_verified: false,
        transaction_limits: {
          daily: 50000000,
          monthly: 1000000000,
          used: { daily: 0, monthly: 0 }
        },
        loyalty_points: 0,
        referral_code: this.generateReferralCode(),
        languages: ['Bahasa Indonesia'],
        preferred_payments: [],
        location: { country: 'Indonesia', city: '' },
        last_active: new Date().toISOString()
      }

      const { data: createdUser, error: createError } = await this.supabase
        .from('users')
        .insert(newUserData)
        .select()
        .single()

      if (createError) throw createError

      const user = this.mapDatabaseUserToAuthUser(createdUser)
      
      if (typeof window !== 'undefined') {
        const token = this.createSessionToken(user)
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    } catch (error) {
      console.error('Email registration failed:', error)
      return null
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  // Get Current User
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  // Verify Session Token
  verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      return decoded.user
    } catch {
      return null
    }
  }

  // Update User Profile
  async updateUser(userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> {
    try {
      const { data: updatedUser, error } = await this.supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error

      const user = this.mapDatabaseUserToAuthUser(updatedUser)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    } catch (error) {
      console.error('Update user failed:', error)
      return null
    }
  }

  // KYC Verification
  async submitKYCVerification(userId: string, documents: {
    identityCard: File
    selfiePhoto: File
    addressProof?: File
  }, level: 'basic' | 'advanced' | 'premium'): Promise<boolean> {
    try {
      // Upload documents to storage
      const documentUrls: Record<string, string> = {}
      
      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          const fileName = `kyc/${userId}/${key}_${Date.now()}.${file.name.split('.').pop()}`
          const { data: uploadData, error: uploadError } = await this.supabase.storage
            .from('kyc-documents')
            .upload(fileName, file)

          if (uploadError) throw uploadError
          
          const { data: { publicUrl } } = this.supabase.storage
            .from('kyc-documents')
            .getPublicUrl(fileName)
          
          documentUrls[key] = publicUrl
        }
      }

      // Update user KYC status
      const { error: updateError } = await this.supabase
        .from('users')
        .update({
          kyc_status: 'pending',
          kyc_level: level
        })
        .eq('id', userId)

      if (updateError) throw updateError

      // Create KYC submission record (you might want to create a separate table for this)
      // This is a simplified version - in production you'd want proper KYC workflow

      return true
    } catch (error) {
      console.error('KYC submission failed:', error)
      return false
    }
  }

  // Enable 2FA
  async enable2FA(userId: string, phoneNumber: string): Promise<string | null> {
    try {
      // Generate TOTP secret
      const secret = this.generate2FASecret()
      
      // Update user with 2FA secret
      const { error } = await this.supabase
        .from('users')
        .update({
          is_2fa_enabled: true,
          // Store 2FA secret securely (you might want to encrypt this)
        })
        .eq('id', userId)

      if (error) throw error

      return secret
    } catch (error) {
      console.error('2FA enable failed:', error)
      return null
    }
  }

  // Helper Methods
  private createSessionToken(user: AuthUser): string {
    return jwt.sign(
      { user, exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) }, // 24 hours
      process.env.JWT_SECRET || 'fallback-secret-for-development'
    )
  }

  private generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  private generate2FASecret(): string {
    return Math.random().toString(36).substring(2, 32)
  }

  private mapDatabaseUserToAuthUser(dbUser: any): AuthUser {
    return {
      id: dbUser.id,
      email: dbUser.email,
      walletAddress: dbUser.wallet_address,
      username: dbUser.username,
      avatarUrl: dbUser.avatar_url,
      kycLevel: dbUser.kyc_level,
      kycStatus: dbUser.kyc_status,
      membershipTier: dbUser.membership_tier,
      reputationScore: dbUser.reputation_score,
      totalTrades: dbUser.total_trades,
      successRate: dbUser.success_rate,
      escrowRating: dbUser.escrow_rating,
      is2FAEnabled: dbUser.is_2fa_enabled,
      isPhoneVerified: dbUser.is_phone_verified,
      isEmailVerified: dbUser.is_email_verified,
      transactionLimits: dbUser.transaction_limits,
      loyaltyPoints: dbUser.loyalty_points,
      location: dbUser.location
    }
  }
}

// Hook for client-side usage
export const useAuth = () => {
  const authService = new AuthService()
  
  return {
    signInWithWallet: authService.signInWithWallet.bind(authService),
    signInWithEmail: authService.signInWithEmail.bind(authService),
    signUpWithEmail: authService.signUpWithEmail.bind(authService),
    signOut: authService.signOut.bind(authService),
    getCurrentUser: authService.getCurrentUser.bind(authService),
    updateUser: authService.updateUser.bind(authService),
    submitKYCVerification: authService.submitKYCVerification.bind(authService),
    enable2FA: authService.enable2FA.bind(authService)
  }
}

// Server-side authentication
export const getServerUser = async (request: Request): Promise<AuthUser | null> => {
  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization) return null

    const token = authorization.replace('Bearer ', '')
    const authService = new AuthService()
    return authService.verifyToken(token)
  } catch {
    return null
  }
}
