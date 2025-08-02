import { createClientSupabaseClient } from './supabase'

export interface PaymentMethod {
  id: string
  type: 'bank' | 'ewallet' | 'crypto'
  provider: string
  name: string
  icon: string
  fee: number
  processingTime: string
  isActive: boolean
}

export interface PaymentRequest {
  orderId: string
  amount: number
  currency: string
  paymentMethod: string
  buyerEmail: string
  description: string
  redirectUrl: string
}

export class IndonesianPaymentGateway {
  private supabase = createClientSupabaseClient()

  // Indonesian payment methods
  getPaymentMethods(): PaymentMethod[] {
    return [
      // E-Wallets
      {
        id: 'gopay',
        type: 'ewallet',
        provider: 'GoPay',
        name: 'GoPay',
        icon: '🟢',
        fee: 0.7,
        processingTime: 'Instant',
        isActive: true
      },
      {
        id: 'ovo',
        type: 'ewallet', 
        provider: 'OVO',
        name: 'OVO',
        icon: '🟣',
        fee: 0.7,
        processingTime: 'Instant',
        isActive: true
      },
      {
        id: 'dana',
        type: 'ewallet',
        provider: 'DANA',
        name: 'DANA',
        icon: '🔵',
        fee: 0.7,
        processingTime: 'Instant',
        isActive: true
      },
      {
        id: 'shopeepay',
        type: 'ewallet',
        provider: 'ShopeePay',
        name: 'ShopeePay',
        icon: '🟠',
        fee: 0.7,
        processingTime: 'Instant',
        isActive: true
      },
      // Banks
      {
        id: 'bca',
        type: 'bank',
        provider: 'BCA',
        name: 'Bank BCA',
        icon: '🏦',
        fee: 4000,
        processingTime: '1-3 menit',
        isActive: true
      },
      {
        id: 'mandiri',
        type: 'bank',
        provider: 'Mandiri',
        name: 'Bank Mandiri',
        icon: '🏦',
        fee: 4000,
        processingTime: '1-3 menit',
        isActive: true
      },
      {
        id: 'bni',
        type: 'bank',
        provider: 'BNI',
        name: 'Bank BNI',
        icon: '🏦',
        fee: 4000,
        processingTime: '1-3 menit',
        isActive: true
      },
      {
        id: 'bri',
        type: 'bank',
        provider: 'BRI',
        name: 'Bank BRI',
        icon: '🏦',
        fee: 4000,
        processingTime: '1-3 menit',
        isActive: true
      },
      // Crypto
      {
        id: 'usdt',
        type: 'crypto',
        provider: 'USDT',
        name: 'USDT (TRC20)',
        icon: '₮',
        fee: 1,
        processingTime: '5-10 menit',
        isActive: true
      },
      {
        id: 'eth',
        type: 'crypto',
        provider: 'Ethereum',
        name: 'Ethereum (ETH)',
        icon: 'Ξ',
        fee: 0.5,
        processingTime: '2-5 menit',
        isActive: true
      }
    ]
  }

  // Create payment request
  async createPayment(request: PaymentRequest): Promise<{ success: boolean; paymentUrl?: string; virtualAccount?: string; qrCode?: string; error?: string }> {
    try {
      const method = this.getPaymentMethods().find(m => m.id === request.paymentMethod)
      if (!method) {
        throw new Error('Payment method not found')
      }

      // Calculate total amount including fees
      const fee = method.type === 'bank' ? method.fee : (request.amount * method.fee / 100)
      const totalAmount = request.amount + fee

      // For demo purposes, create mock payment data
      const paymentData = {
        id: `payment_${Date.now()}`,
        orderId: request.orderId,
        amount: totalAmount,
        currency: request.currency,
        paymentMethod: request.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }

      // Store payment in database
      const { error } = await this.supabase
        .from('payments')
        .insert(paymentData)

      if (error) throw error

      // Generate mock payment response based on method type
      if (method.type === 'ewallet') {
        return {
          success: true,
          qrCode: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`, // Mock QR code
          paymentUrl: `https://${method.provider.toLowerCase()}.app/pay/${paymentData.id}`
        }
      } else if (method.type === 'bank') {
        return {
          success: true,
          virtualAccount: this.generateVirtualAccount(method.provider),
        }
      } else if (method.type === 'crypto') {
        return {
          success: true,
          walletAddress: method.provider === 'USDT' 
            ? 'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7' // Mock USDT address
            : '0x742d35Cc6C6C2aCE0F3a9b7B1fFBC3F9F4B4D1A2' // Mock ETH address
        }
      }

      return { success: false, error: 'Unsupported payment method' }

    } catch (error: any) {
      console.error('Payment creation error:', error)
      return { success: false, error: error.message }
    }
  }

  // Check payment status
  async checkPaymentStatus(paymentId: string): Promise<{ status: string; paidAt?: string }> {
    try {
      const { data, error } = await this.supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single()

      if (error) throw error

      // In real implementation, check with payment gateway API
      // For demo, randomly update status after some time
      const isOld = new Date().getTime() - new Date(data.createdAt).getTime() > 5 * 60 * 1000 // 5 minutes
      const status = isOld && Math.random() > 0.3 ? 'paid' : 'pending'

      if (status === 'paid' && data.status !== 'paid') {
        // Update payment status
        await this.supabase
          .from('payments')
          .update({ 
            status: 'paid', 
            paidAt: new Date().toISOString() 
          })
          .eq('id', paymentId)
      }

      return {
        status,
        paidAt: status === 'paid' ? new Date().toISOString() : undefined
      }

    } catch (error: any) {
      console.error('Payment status check error:', error)
      return { status: 'error' }
    }
  }

  // Generate virtual account number
  private generateVirtualAccount(bankCode: string): string {
    const bankCodes = {
      'BCA': '014',
      'Mandiri': '008', 
      'BNI': '009',
      'BRI': '002'
    }

    const code = bankCodes[bankCode as keyof typeof bankCodes] || '000'
    const randomNumber = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0')
    
    return `${code}${randomNumber}`
  }

  // Format currency to IDR
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
}

export default IndonesianPaymentGateway
