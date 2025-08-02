import { ImageAnnotatorClient } from '@google-cloud/vision'

// Real Google Vision OCR Implementation
export class GoogleVisionOCR {
  private client: ImageAnnotatorClient

  constructor() {
    // Initialize Google Vision client
    // You'll need to set GOOGLE_APPLICATION_CREDENTIALS environment variable
    // or provide credentials directly
    this.client = new ImageAnnotatorClient({
      // Option 1: Use service account key file
      // keyFilename: 'path/to/service-account-key.json',
      
      // Option 2: Use environment variable (recommended for production)
      // credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}'),
      
      // Option 3: Use service account key directly
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID,
      },
    })
  }

  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      const [result] = await this.client.textDetection({
        image: {
          content: imageBuffer,
        },
      })

      const detections = result.textAnnotations
      if (!detections || detections.length === 0) {
        throw new Error('No text detected in image')
      }

      // The first annotation contains the entire detected text
      return detections[0].description || ''
    } catch (error) {
      console.error('OCR Error:', error)
      throw new Error(`Failed to extract text: ${error.message}`)
    }
  }

  async analyzePaymentProof(imageBuffer: Buffer, expectedData: {
    amount: string
    reference: string
    accountNumber: string
    bankName: string
  }) {
    try {
      const extractedText = await this.extractTextFromImage(imageBuffer)
      console.log('Extracted text:', extractedText)

      // Clean and normalize text for better matching
      const normalizedText = this.normalizeText(extractedText)
      
      const analysis = {
        extractedText,
        normalizedText,
        detectedData: {
          amount: this.findAmount(normalizedText, expectedData.amount),
          reference: this.findReference(normalizedText, expectedData.reference),
          accountNumber: this.findAccountNumber(normalizedText, expectedData.accountNumber),
          bankName: this.findBankName(normalizedText, expectedData.bankName),
          date: this.findDate(normalizedText),
          status: this.findTransactionStatus(normalizedText)
        },
        confidence: 0,
        isValid: false
      }

      // Calculate confidence and validity
      analysis.confidence = this.calculateConfidence(analysis.detectedData, expectedData)
      analysis.isValid = analysis.confidence >= 0.7 // 70% confidence threshold

      return analysis
    } catch (error) {
      console.error('Payment proof analysis error:', error)
      throw error
    }
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s\d.,:-]/g, ' ') // Remove special chars except common ones
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim()
  }

  private findAmount(text: string, expectedAmount: string): {
    found: boolean
    value?: string
    confidence: number
    match: boolean
  } {
    // Remove currency symbols and normalize
    const cleanExpected = expectedAmount.replace(/[^\d]/g, '')
    
    // Common amount patterns in Indonesian banking
    const amountPatterns = [
      /rp\.?\s*([\d.,]+)/gi,
      /idr\.?\s*([\d.,]+)/gi,
      /nominal\.?\s*:?\s*([\d.,]+)/gi,
      /([\d.,]{7,})/g, // Large numbers (7+ digits)
    ]

    for (const pattern of amountPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        for (const match of matches) {
          const cleanMatch = match.replace(/[^\d]/g, '')
          if (cleanMatch === cleanExpected) {
            return {
              found: true,
              value: match.trim(),
              confidence: 0.95,
              match: true
            }
          }
          // Partial match (last 6 digits)
          if (cleanMatch.length >= 6 && cleanExpected.endsWith(cleanMatch.slice(-6))) {
            return {
              found: true,
              value: match.trim(),
              confidence: 0.8,
              match: true
            }
          }
        }
      }
    }

    return { found: false, confidence: 0, match: false }
  }

  private findReference(text: string, expectedRef: string): {
    found: boolean
    value?: string
    confidence: number
    match: boolean
  } {
    const refPatterns = [
      new RegExp(expectedRef.toLowerCase(), 'gi'),
      new RegExp(`ref\\w*\\s*:?\\s*${expectedRef.toLowerCase()}`, 'gi'),
      new RegExp(`berita\\s*:?\\s*${expectedRef.toLowerCase()}`, 'gi'),
      new RegExp(`keterangan\\s*:?\\s*${expectedRef.toLowerCase()}`, 'gi'),
    ]

    for (const pattern of refPatterns) {
      const match = text.match(pattern)
      if (match) {
        return {
          found: true,
          value: match[0],
          confidence: 0.9,
          match: true
        }
      }
    }

    return { found: false, confidence: 0, match: false }
  }

  private findAccountNumber(text: string, expectedAccount: string): {
    found: boolean
    value?: string
    confidence: number
    match: boolean
  } {
    // Find account number patterns
    const accountPatterns = [
      new RegExp(expectedAccount.replace(/\s/g, '\\s*'), 'gi'),
      /rekening\s*:?\s*([\d\s-]+)/gi,
      /ke\s*rekening\s*:?\s*([\d\s-]+)/gi,
      /([\d]{10,16})/g, // Account number length
    ]

    for (const pattern of accountPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        for (const match of matches) {
          const cleanMatch = match.replace(/[^\d]/g, '')
          const cleanExpected = expectedAccount.replace(/[^\d]/g, '')
          
          if (cleanMatch === cleanExpected) {
            return {
              found: true,
              value: match.trim(),
              confidence: 0.9,
              match: true
            }
          }
        }
      }
    }

    return { found: false, confidence: 0, match: false }
  }

  private findBankName(text: string, expectedBank: string): {
    found: boolean
    value?: string
    confidence: number
    match: boolean
  } {
    const bankPattern = new RegExp(expectedBank.toLowerCase(), 'gi')
    const match = text.match(bankPattern)
    
    if (match) {
      return {
        found: true,
        value: match[0],
        confidence: 0.8,
        match: true
      }
    }

    return { found: false, confidence: 0, match: false }
  }

  private findDate(text: string): {
    found: boolean
    value?: string
    confidence: number
    isToday: boolean
  } {
    const datePatterns = [
      /(\d{1,2})\s*(jan|feb|mar|apr|mei|jun|jul|aug|sep|okt|nov|des)\s*(\d{2,4})/gi,
      /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/g,
      /(\d{2,4})[\/\-](\d{1,2})[\/\-](\d{1,2})/g,
    ]

    for (const pattern of datePatterns) {
      const match = text.match(pattern)
      if (match) {
        const today = new Date()
        const isToday = this.isDateToday(match[0], today)
        
        return {
          found: true,
          value: match[0],
          confidence: 0.8,
          isToday
        }
      }
    }

    return { found: false, confidence: 0, isToday: false }
  }

  private findTransactionStatus(text: string): {
    found: boolean
    value?: string
    isSuccess: boolean
  } {
    const successPatterns = [
      /berhasil/gi,
      /sukses/gi,
      /success/gi,
      /completed/gi,
      /selesai/gi,
    ]

    for (const pattern of successPatterns) {
      const match = text.match(pattern)
      if (match) {
        return {
          found: true,
          value: match[0],
          isSuccess: true
        }
      }
    }

    return { found: false, isSuccess: false }
  }

  private isDateToday(dateStr: string, today: Date): boolean {
    // Simple date matching - could be improved with better parsing
    const todayDay = today.getDate()
    const todayMonth = today.getMonth() + 1
    
    const dayMatch = dateStr.match(/\d{1,2}/)
    if (dayMatch) {
      const day = parseInt(dayMatch[0])
      return Math.abs(day - todayDay) <= 1 // Allow 1 day difference for timezone
    }
    
    return false
  }

  private calculateConfidence(detected: any, expected: any): number {
    let score = 0
    let totalChecks = 0

    // Amount check (weight: 40%)
    if (detected.amount.found) {
      score += detected.amount.match ? 0.4 : 0.1
    }
    totalChecks++

    // Reference check (weight: 30%)
    if (detected.reference.found) {
      score += detected.reference.match ? 0.3 : 0.1
    }
    totalChecks++

    // Account check (weight: 15%)
    if (detected.accountNumber.found) {
      score += detected.accountNumber.match ? 0.15 : 0.05
    }
    totalChecks++

    // Date check (weight: 10%)
    if (detected.date.found) {
      score += detected.date.isToday ? 0.1 : 0.05
    }
    totalChecks++

    // Bank check (weight: 5%)
    if (detected.bankName.found) {
      score += detected.bankName.match ? 0.05 : 0.02
    }
    totalChecks++

    return Math.min(score, 1.0) // Cap at 100%
  }
}

export default GoogleVisionOCR
