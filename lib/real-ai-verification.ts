import { createClientSupabaseClient } from './supabase'
import GoogleVisionOCR from './google-vision-ocr'

export interface OCRValidationResult {
  isValid: boolean
  confidence: number
  details: {
    amountDetected: {
      found: boolean
      value?: string
      confidence: number
      expectedAmount: string
      match: boolean
    }
    referenceCodeDetected: {
      found: boolean
      value?: string
      confidence: number
      expectedCode: string
      match: boolean
    }
    dateDetected: {
      found: boolean
      value?: string
      confidence: number
      isToday: boolean
    }
    accountNumberDetected: {
      found: boolean
      value?: string
      confidence: number
      expectedAccount: string
      match: boolean
    }
    bankNameDetected: {
      found: boolean
      value?: string
      confidence: number
      expectedBank: string
      match: boolean
    }
    transactionStatus: {
      found: boolean
      value?: string
      isSuccess: boolean
    }
    imageQuality: 'high' | 'medium' | 'low'
    processingTime: number
    extractedText: string
  }
  errors: string[]
  warnings: string[]
  overallScore: number
}

export interface PaymentProofData {
  orderId: string
  expectedAmount: string
  expectedReference: string
  expectedAccount: string
  expectedBank: string
  imageFile: File
}

export class RealAIVerification {
  private supabase = createClientSupabaseClient()
  private ocrService = new GoogleVisionOCR()

  async verifyPaymentProof(data: PaymentProofData): Promise<OCRValidationResult> {
    const startTime = Date.now()
    
    try {
      console.log('🤖 Starting real AI verification for order:', data.orderId)
      
      // Convert File to Buffer
      const imageBuffer = await this.fileToBuffer(data.imageFile)
      
      // Validate image quality
      const imageQuality = this.analyzeImageQuality(data.imageFile)
      
      if (imageQuality === 'low') {
        return this.createLowQualityResult(data, Date.now() - startTime)
      }

      // Perform OCR analysis with Google Vision
      const ocrResult = await this.ocrService.analyzePaymentProof(imageBuffer, {
        amount: data.expectedAmount,
        reference: data.expectedReference,
        accountNumber: data.expectedAccount,
        bankName: data.expectedBank
      })

      // Create validation result
      const result = this.createValidationResult(ocrResult, data, imageQuality, Date.now() - startTime)
      
      // Save to database
      await this.saveVerificationResult(data.orderId, result, ocrResult.extractedText)
      
      console.log('✅ AI verification completed:', {
        orderId: data.orderId,
        isValid: result.isValid,
        confidence: result.confidence,
        processingTime: result.details.processingTime
      })
      
      return result
      
    } catch (error: any) {
      console.error('❌ AI verification failed:', error)
      
      const errorResult = this.createErrorResult(data, error.message, Date.now() - startTime)
      await this.saveVerificationResult(data.orderId, errorResult, `ERROR: ${error.message}`)
      
      return errorResult
    }
  }

  private async fileToBuffer(file: File): Promise<Buffer> {
    const arrayBuffer = await file.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  private analyzeImageQuality(file: File): 'high' | 'medium' | 'low' {
    const fileSize = file.size / (1024 * 1024) // MB
    const fileName = file.name.toLowerCase()
    
    // Check if it's a screenshot (usually lower quality for OCR)
    const isScreenshot = fileName.includes('screenshot') || 
                        fileName.includes('screen') || 
                        fileName.includes('ss_')
    
    if (isScreenshot) return 'low'
    if (fileSize > 2) return 'high'
    if (fileSize > 0.5) return 'medium'
    return 'low'
  }

  private createValidationResult(
    ocrResult: any, 
    data: PaymentProofData, 
    imageQuality: 'high' | 'medium' | 'low',
    processingTime: number
  ): OCRValidationResult {
    
    const result: OCRValidationResult = {
      isValid: ocrResult.isValid,
      confidence: ocrResult.confidence,
      details: {
        amountDetected: {
          found: ocrResult.detectedData.amount.found,
          value: ocrResult.detectedData.amount.value,
          confidence: ocrResult.detectedData.amount.confidence,
          expectedAmount: data.expectedAmount,
          match: ocrResult.detectedData.amount.match
        },
        referenceCodeDetected: {
          found: ocrResult.detectedData.reference.found,
          value: ocrResult.detectedData.reference.value,
          confidence: ocrResult.detectedData.reference.confidence,
          expectedCode: data.expectedReference,
          match: ocrResult.detectedData.reference.match
        },
        dateDetected: {
          found: ocrResult.detectedData.date.found,
          value: ocrResult.detectedData.date.value,
          confidence: ocrResult.detectedData.date.confidence,
          isToday: ocrResult.detectedData.date.isToday
        },
        accountNumberDetected: {
          found: ocrResult.detectedData.accountNumber.found,
          value: ocrResult.detectedData.accountNumber.value,
          confidence: ocrResult.detectedData.accountNumber.confidence,
          expectedAccount: data.expectedAccount,
          match: ocrResult.detectedData.accountNumber.match
        },
        bankNameDetected: {
          found: ocrResult.detectedData.bankName.found,
          value: ocrResult.detectedData.bankName.value,
          confidence: ocrResult.detectedData.bankName.confidence,
          expectedBank: data.expectedBank,
          match: ocrResult.detectedData.bankName.match
        },
        transactionStatus: {
          found: ocrResult.detectedData.status.found,
          value: ocrResult.detectedData.status.value,
          isSuccess: ocrResult.detectedData.status.isSuccess
        },
        imageQuality,
        processingTime,
        extractedText: ocrResult.extractedText
      },
      errors: [],
      warnings: [],
      overallScore: ocrResult.confidence
    }

    // Generate errors and warnings
    this.generateErrorsAndWarnings(result)
    
    return result
  }

  private generateErrorsAndWarnings(result: OCRValidationResult) {
    // Errors (critical issues)
    if (!result.details.amountDetected.found || !result.details.amountDetected.match) {
      result.errors.push('Nominal transfer tidak ditemukan atau tidak sesuai dengan yang diharapkan')
    }
    
    if (!result.details.referenceCodeDetected.found || !result.details.referenceCodeDetected.match) {
      result.errors.push('Kode referensi tidak ditemukan atau tidak sesuai')
    }
    
    if (!result.details.dateDetected.found || !result.details.dateDetected.isToday) {
      result.errors.push('Tanggal transfer tidak valid atau bukan hari ini')
    }

    // Warnings (minor issues)
    if (result.details.imageQuality === 'low') {
      result.warnings.push('Kualitas gambar rendah, pertimbangkan untuk menggunakan foto yang lebih jelas')
    }
    
    if (!result.details.transactionStatus.found || !result.details.transactionStatus.isSuccess) {
      result.warnings.push('Status transaksi tidak terdeteksi atau tidak menunjukkan keberhasilan')
    }
    
    if (result.confidence < 0.8) {
      result.warnings.push('Confidence level rendah, memerlukan review manual')
    }
    
    if (!result.details.accountNumberDetected.found || !result.details.accountNumberDetected.match) {
      result.warnings.push('Nomor rekening tujuan tidak terdeteksi dengan jelas')
    }
  }

  private createLowQualityResult(data: PaymentProofData, processingTime: number): OCRValidationResult {
    return {
      isValid: false,
      confidence: 0,
      details: {
        amountDetected: {
          found: false,
          confidence: 0,
          expectedAmount: data.expectedAmount,
          match: false
        },
        referenceCodeDetected: {
          found: false,
          confidence: 0,
          expectedCode: data.expectedReference,
          match: false
        },
        dateDetected: {
          found: false,
          confidence: 0,
          isToday: false
        },
        accountNumberDetected: {
          found: false,
          confidence: 0,
          expectedAccount: data.expectedAccount,
          match: false
        },
        bankNameDetected: {
          found: false,
          confidence: 0,
          expectedBank: data.expectedBank,
          match: false
        },
        transactionStatus: {
          found: false,
          isSuccess: false
        },
        imageQuality: 'low',
        processingTime,
        extractedText: ''
      },
      errors: ['Kualitas gambar terlalu rendah untuk diproses'],
      warnings: ['Gunakan foto dengan resolusi lebih tinggi atau pencahayaan yang lebih baik'],
      overallScore: 0
    }
  }

  private createErrorResult(data: PaymentProofData, errorMessage: string, processingTime: number): OCRValidationResult {
    return {
      isValid: false,
      confidence: 0,
      details: {
        amountDetected: {
          found: false,
          confidence: 0,
          expectedAmount: data.expectedAmount,
          match: false
        },
        referenceCodeDetected: {
          found: false,
          confidence: 0,
          expectedCode: data.expectedReference,
          match: false
        },
        dateDetected: {
          found: false,
          confidence: 0,
          isToday: false
        },
        accountNumberDetected: {
          found: false,
          confidence: 0,
          expectedAccount: data.expectedAccount,
          match: false
        },
        bankNameDetected: {
          found: false,
          confidence: 0,
          expectedBank: data.expectedBank,
          match: false
        },
        transactionStatus: {
          found: false,
          isSuccess: false
        },
        imageQuality: 'low',
        processingTime,
        extractedText: ''
      },
      errors: [errorMessage],
      warnings: [],
      overallScore: 0
    }
  }

  private async saveVerificationResult(orderId: string, result: OCRValidationResult, extractedText: string) {
    try {
      const { error } = await this.supabase
        .from('payment_verifications')
        .insert({
          order_id: orderId,
          verification_result: result,
          status: result.isValid ? 'verified' : (result.confidence > 0.5 ? 'manual_review' : 'rejected'),
          confidence_score: result.confidence,
          processing_time_ms: result.details.processingTime,
          created_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Error saving verification result:', error)
      }
    } catch (error) {
      console.error('Database error:', error)
    }
  }

  // Method untuk mendapatkan riwayat verifikasi
  async getVerificationHistory(orderId: string) {
    try {
      const { data, error } = await this.supabase
        .from('payment_verifications')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching verification history:', error)
      return []
    }
  }

  // Method untuk admin review manual
  async submitForManualReview(orderId: string, reason: string) {
    try {
      const { error } = await this.supabase
        .from('manual_reviews')
        .insert({
          order_id: orderId,
          reason: reason,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error submitting for manual review:', error)
      return { success: false, error: error.message }
    }
  }
}

export default RealAIVerification
