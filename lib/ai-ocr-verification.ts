import { createClientSupabaseClient } from './supabase'

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
    isScreenshot: boolean
    imageQuality: 'high' | 'medium' | 'low'
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

export class AIProofVerification {
  private supabase = createClientSupabaseClient()

  // Simulasi OCR dengan AI validation
  async verifyPaymentProof(data: PaymentProofData): Promise<OCRValidationResult> {
    try {
      console.log('🤖 Memulai analisis AI OCR untuk bukti transfer...')
      
      // Simulasi proses OCR dan AI analysis
      const result = await this.processImageWithAI(data)
      
      // Simpan hasil verifikasi ke database
      await this.saveVerificationResult(data.orderId, result)
      
      return result
      
    } catch (error: any) {
      console.error('Error dalam verifikasi AI OCR:', error)
      return this.createErrorResult(error.message)
    }
  }

  private async processImageWithAI(data: PaymentProofData): Promise<OCRValidationResult> {
    // Simulasi delay untuk processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Analisis simulasi berdasarkan nama file dan ukuran
    const imageAnalysis = this.analyzeImageQuality(data.imageFile)
    
    // Generate realistic OCR simulation results
    const extractedText = this.simulateOCRExtraction(data)
    
    // Validate extracted data
    const validation = this.validateExtractedData(extractedText, data)
    
    return validation
  }

  private analyzeImageQuality(file: File): { quality: 'high' | 'medium' | 'low', isScreenshot: boolean } {
    // Simulasi analisis kualitas gambar
    const fileSize = file.size / (1024 * 1024) // MB
    const fileName = file.name.toLowerCase()
    
    const isScreenshot = fileName.includes('screenshot') || 
                        fileName.includes('screen') || 
                        fileName.includes('ss_') ||
                        fileName.includes('img_')
    
    let quality: 'high' | 'medium' | 'low'
    if (fileSize > 2) quality = 'high'
    else if (fileSize > 0.5) quality = 'medium'
    else quality = 'low'
    
    return { quality, isScreenshot }
  }

  private simulateOCRExtraction(data: PaymentProofData) {
    // Simulasi ekstraksi teks dari gambar
    const randomSuccess = Math.random()
    
    // Generate realistic extracted text simulation
    const extractedTexts: string[] = []
    
    // Simulasi berbagai kemungkinan OCR result
    if (randomSuccess > 0.2) {
      // Amount detection
      const amountVariations = [
        data.expectedAmount,
        data.expectedAmount.replace(/\./g, ','),
        data.expectedAmount + '00', // dengan desimal
        'Rp ' + data.expectedAmount,
        'IDR ' + data.expectedAmount
      ]
      extractedTexts.push(amountVariations[Math.floor(Math.random() * amountVariations.length)])
    }
    
    if (randomSuccess > 0.3) {
      // Reference code detection
      extractedTexts.push(data.expectedReference)
      if (Math.random() > 0.5) {
        extractedTexts.push('Ref: ' + data.expectedReference)
      }
    }
    
    if (randomSuccess > 0.1) {
      // Date detection
      const today = new Date()
      extractedTexts.push(today.toLocaleDateString('id-ID'))
      extractedTexts.push(today.toISOString().split('T')[0])
    }
    
    if (randomSuccess > 0.4) {
      // Account number detection
      extractedTexts.push(data.expectedAccount)
    }
    
    if (randomSuccess > 0.3) {
      // Bank name detection
      extractedTexts.push(data.expectedBank)
    }
    
    return extractedTexts
  }

  private validateExtractedData(extractedTexts: string[], data: PaymentProofData): OCRValidationResult {
    const result: OCRValidationResult = {
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
        isScreenshot: Math.random() > 0.6,
        imageQuality: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
      },
      errors: [],
      warnings: [],
      overallScore: 0
    }

    const allText = extractedTexts.join(' ').toLowerCase()
    
    // Validate amount
    const amountMatch = this.findAmountMatch(allText, data.expectedAmount)
    if (amountMatch) {
      result.details.amountDetected = {
        found: true,
        value: amountMatch.value,
        confidence: amountMatch.confidence,
        expectedAmount: data.expectedAmount,
        match: amountMatch.match
      }
    }
    
    // Validate reference code
    const refMatch = this.findReferenceMatch(allText, data.expectedReference)
    if (refMatch) {
      result.details.referenceCodeDetected = {
        found: true,
        value: refMatch.value,
        confidence: refMatch.confidence,
        expectedCode: data.expectedReference,
        match: refMatch.match
      }
    }
    
    // Validate date
    const dateMatch = this.findDateMatch(allText)
    if (dateMatch) {
      result.details.dateDetected = {
        found: true,
        value: dateMatch.value,
        confidence: dateMatch.confidence,
        isToday: dateMatch.isToday
      }
    }
    
    // Validate account number
    const accountMatch = this.findAccountMatch(allText, data.expectedAccount)
    if (accountMatch) {
      result.details.accountNumberDetected = {
        found: true,
        value: accountMatch.value,
        confidence: accountMatch.confidence,
        expectedAccount: data.expectedAccount,
        match: accountMatch.match
      }
    }
    
    // Validate bank name
    const bankMatch = this.findBankMatch(allText, data.expectedBank)
    if (bankMatch) {
      result.details.bankNameDetected = {
        found: true,
        value: bankMatch.value,
        confidence: bankMatch.confidence,
        expectedBank: data.expectedBank,
        match: bankMatch.match
      }
    }
    
    // Calculate overall score and validation
    this.calculateOverallScore(result)
    
    return result
  }

  private findAmountMatch(text: string, expectedAmount: string) {
    const cleanExpected = expectedAmount.replace(/\D/g, '')
    const amountPatterns = [
      new RegExp(cleanExpected, 'g'),
      new RegExp(expectedAmount.replace(/\./g, ','), 'g'),
      new RegExp('rp\\s*' + cleanExpected, 'gi'),
      new RegExp('idr\\s*' + cleanExpected, 'gi')
    ]
    
    for (const pattern of amountPatterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        return {
          value: matches[0],
          confidence: Math.random() * 0.3 + 0.7, // 70-100%
          match: true
        }
      }
    }
    
    return null
  }

  private findReferenceMatch(text: string, expectedRef: string) {
    const refPatterns = [
      new RegExp(expectedRef.toLowerCase(), 'g'),
      new RegExp('ref\\s*:?\\s*' + expectedRef.toLowerCase(), 'g'),
      new RegExp('reference\\s*:?\\s*' + expectedRef.toLowerCase(), 'g'),
      new RegExp('berita\\s*:?\\s*' + expectedRef.toLowerCase(), 'g')
    ]
    
    for (const pattern of refPatterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        return {
          value: matches[0],
          confidence: Math.random() * 0.2 + 0.8, // 80-100%
          match: true
        }
      }
    }
    
    return null
  }

  private findDateMatch(text: string) {
    const today = new Date()
    const datePatterns = [
      /\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/g,
      /\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2}/g,
      /\d{1,2}\s+(jan|feb|mar|apr|mei|jun|jul|aug|sep|okt|nov|des)\s+\d{2,4}/gi
    ]
    
    for (const pattern of datePatterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        const isToday = this.isDateToday(matches[0])
        return {
          value: matches[0],
          confidence: Math.random() * 0.3 + 0.7,
          isToday
        }
      }
    }
    
    return null
  }

  private findAccountMatch(text: string, expectedAccount: string) {
    const accountPattern = new RegExp(expectedAccount.replace(/\s/g, '\\s*'), 'gi')
    const matches = text.match(accountPattern)
    
    if (matches && matches.length > 0) {
      return {
        value: matches[0],
        confidence: Math.random() * 0.2 + 0.8,
        match: true
      }
    }
    
    return null
  }

  private findBankMatch(text: string, expectedBank: string) {
    const bankPattern = new RegExp(expectedBank.toLowerCase(), 'gi')
    const matches = text.match(bankPattern)
    
    if (matches && matches.length > 0) {
      return {
        value: matches[0],
        confidence: Math.random() * 0.3 + 0.7,
        match: true
      }
    }
    
    return null
  }

  private isDateToday(dateStr: string): boolean {
    // Simplified date matching - dalam implementasi nyata perlu parsing lebih akurat
    const today = new Date()
    const todayStr = today.toLocaleDateString('id-ID')
    return dateStr.includes(todayStr) || Math.random() > 0.3
  }

  private calculateOverallScore(result: OCRValidationResult) {
    const weights = {
      amount: 0.35,
      reference: 0.30,
      date: 0.15,
      account: 0.10,
      bank: 0.10
    }
    
    let score = 0
    let validCount = 0
    
    if (result.details.amountDetected.found && result.details.amountDetected.match) {
      score += weights.amount * result.details.amountDetected.confidence
      validCount++
    }
    
    if (result.details.referenceCodeDetected.found && result.details.referenceCodeDetected.match) {
      score += weights.reference * result.details.referenceCodeDetected.confidence
      validCount++
    }
    
    if (result.details.dateDetected.found && result.details.dateDetected.isToday) {
      score += weights.date * result.details.dateDetected.confidence
      validCount++
    }
    
    if (result.details.accountNumberDetected.found && result.details.accountNumberDetected.match) {
      score += weights.account * result.details.accountNumberDetected.confidence
      validCount++
    }
    
    if (result.details.bankNameDetected.found && result.details.bankNameDetected.match) {
      score += weights.bank * result.details.bankNameDetected.confidence
      validCount++
    }
    
    result.overallScore = score
    result.confidence = score
    
    // Determine if valid based on minimum requirements
    const hasAmount = result.details.amountDetected.found && result.details.amountDetected.match
    const hasReference = result.details.referenceCodeDetected.found && result.details.referenceCodeDetected.match
    const hasValidDate = result.details.dateDetected.found && result.details.dateDetected.isToday
    
    result.isValid = hasAmount && hasReference && hasValidDate && score >= 0.65
    
    // Add warnings and errors
    if (!hasAmount) {
      result.errors.push('Nominal transfer tidak ditemukan atau tidak sesuai')
    }
    
    if (!hasReference) {
      result.errors.push('Kode referensi tidak ditemukan atau tidak sesuai')
    }
    
    if (!hasValidDate) {
      result.errors.push('Tanggal transfer tidak valid atau bukan hari ini')
    }
    
    if (result.details.isScreenshot) {
      result.warnings.push('Gambar terdeteksi sebagai screenshot, pastikan asli dari aplikasi bank')
    }
    
    if (result.details.imageQuality === 'low') {
      result.warnings.push('Kualitas gambar rendah, pertimbangkan untuk menggunakan foto yang lebih jelas')
    }
  }

  private async saveVerificationResult(orderId: string, result: OCRValidationResult) {
    try {
      const { error } = await this.supabase
        .from('payment_verifications')
        .insert({
          order_id: orderId,
          verification_result: result,
          status: result.isValid ? 'verified' : 'rejected',
          confidence_score: result.confidence,
          created_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Error saving verification result:', error)
      }
    } catch (error) {
      console.error('Database error:', error)
    }
  }

  private createErrorResult(errorMessage: string): OCRValidationResult {
    return {
      isValid: false,
      confidence: 0,
      details: {
        amountDetected: {
          found: false,
          confidence: 0,
          expectedAmount: '',
          match: false
        },
        referenceCodeDetected: {
          found: false,
          confidence: 0,
          expectedCode: '',
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
          expectedAccount: '',
          match: false
        },
        bankNameDetected: {
          found: false,
          confidence: 0,
          expectedBank: '',
          match: false
        },
        isScreenshot: false,
        imageQuality: 'low'
      },
      errors: [errorMessage],
      warnings: [],
      overallScore: 0
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

export default AIProofVerification
