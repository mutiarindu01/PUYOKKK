"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Eye,
  CheckCircle,
  X,
  AlertTriangle,
  Zap,
  Brain,
  Shield,
  Clock,
  FileText,
  Star,
  TrendingUp,
  Camera
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AIProofVerification, { OCRValidationResult, PaymentProofData } from "@/lib/ai-ocr-verification"

interface AIVerificationUploadProps {
  orderData: {
    orderId: string
    expectedAmount: string
    expectedReference: string
    expectedAccount: string
    expectedBank: string
  }
  onVerificationComplete: (result: OCRValidationResult) => void
  onManualReview: () => void
}

export default function AIVerificationUpload({
  orderData,
  onVerificationComplete,
  onManualReview
}: AIVerificationUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState("")
  const [verificationResult, setVerificationResult] = useState<OCRValidationResult | null>(null)
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  const aiVerification = new AIProofVerification()

  const analysisSteps = [
    { step: "Memproses gambar...", duration: 1000 },
    { step: "Mengekstrak teks dengan OCR...", duration: 1500 },
    { step: "Menganalisis dengan AI...", duration: 2000 },
    { step: "Memvalidasi data pembayaran...", duration: 1000 },
    { step: "Menghitung skor kepercayaan...", duration: 500 }
  ]

  const handleFileSelected = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File terlalu besar. Maksimal 5MB.')
      return
    }

    if (!selectedFile.type.startsWith('image/')) {
      alert('File harus berupa gambar (JPG, PNG).')
      return
    }

    setFile(selectedFile)
    setVerificationResult(null)
  }

  const startAIVerification = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentAnalysisStep("")

    try {
      // Simulate analysis steps with progress
      let totalProgress = 0
      for (let i = 0; i < analysisSteps.length; i++) {
        setCurrentAnalysisStep(analysisSteps[i].step)
        
        const stepProgress = 100 / analysisSteps.length
        const startProgress = totalProgress
        const endProgress = totalProgress + stepProgress

        // Animate progress for current step
        const animateStep = () => {
          const duration = analysisSteps[i].duration
          const interval = 50
          const increments = duration / interval
          const progressIncrement = stepProgress / increments
          
          let currentIncrement = 0
          const progressInterval = setInterval(() => {
            currentIncrement++
            const currentStepProgress = (currentIncrement / increments) * stepProgress
            setAnalysisProgress(startProgress + currentStepProgress)
            
            if (currentIncrement >= increments) {
              clearInterval(progressInterval)
              totalProgress = endProgress
            }
          }, interval)
        }

        animateStep()
        await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration))
      }

      // Start actual AI verification
      const proofData: PaymentProofData = {
        orderId: orderData.orderId,
        expectedAmount: orderData.expectedAmount,
        expectedReference: orderData.expectedReference,
        expectedAccount: orderData.expectedAccount,
        expectedBank: orderData.expectedBank,
        imageFile: file
      }

      const result = await aiVerification.verifyPaymentProof(proofData)
      setVerificationResult(result)
      onVerificationComplete(result)

    } catch (error) {
      console.error('AI verification error:', error)
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(100)
      setCurrentAnalysisStep("Analisis selesai!")
    }
  }

  const FileDropzone = ({ onFileSelected }: { onFileSelected: (file: File) => void }) => {
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      
      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find(file => file.type.startsWith('image/'))
      
      if (imageFile) {
        onFileSelected(imageFile)
      }
    }, [onFileSelected])

    return (
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10 scale-105'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
        }`}
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('ai-file-input')?.click()}
      >
        <input
          id="ai-file-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              onFileSelected(file)
            }
          }}
          className="hidden"
        />
        
        <motion.div
          animate={{
            scale: isDragging ? 1.1 : 1,
            rotate: isDragging ? 5 : 0
          }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isDragging ? 'bg-blue-500/20' : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
          }`}>
            <Brain className={`w-10 h-10 ${isDragging ? 'text-blue-400' : 'text-purple-400'}`} />
          </div>
        </motion.div>
        
        <h3 className="text-xl font-bold text-white mb-2">
          {isDragging ? '🎯 Lepaskan file di sini' : '🤖 AI Smart Verification'}
        </h3>
        <p className="text-slate-400 mb-4">
          {isDragging ? 
            'File akan dianalisis dengan AI canggih' : 
            'Seret bukti transfer atau klik untuk memilih file'
          }
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-4">
          <span>Format: JPG, PNG</span>
          <span>•</span>
          <span>Maksimal: 5MB</span>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Verifikasi Otomatis</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-3 h-3 text-green-400" />
            <span>Anti-Fraud Detection</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>OCR Canggih</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp className="w-3 h-3 text-purple-400" />
            <span>99% Akurat</span>
          </div>
        </div>
      </div>
    )
  }

  const AIAnalysisProgress = () => (
    <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          AI Sedang Menganalisis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">{currentAnalysisStep}</span>
            <span className="text-purple-400 font-mono text-sm">{analysisProgress.toFixed(0)}%</span>
          </div>
          <Progress 
            value={analysisProgress} 
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>OCR Processing</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>AI Validation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Data Matching</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Score Calculation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const VerificationResults = ({ result }: { result: OCRValidationResult }) => {
    const getStatusColor = (valid: boolean, confidence: number) => {
      if (valid && confidence > 0.8) return 'text-green-400'
      if (valid && confidence > 0.6) return 'text-yellow-400'
      return 'text-red-400'
    }

    const getStatusIcon = (valid: boolean, confidence: number) => {
      if (valid && confidence > 0.8) return <CheckCircle className="w-4 h-4 text-green-400" />
      if (valid && confidence > 0.6) return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      return <X className="w-4 h-4 text-red-400" />
    }

    return (
      <Card className={`border-2 ${
        result.isValid ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {result.isValid ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <X className="w-6 h-6 text-red-400" />
              )}
              <span className={result.isValid ? 'text-green-400' : 'text-red-400'}>
                {result.isValid ? '✅ Verifikasi Berhasil' : '❌ Verifikasi Gagal'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm ${
                result.details.amountDetected.found && result.details.amountDetected.match ? 'text-green-400' : 'text-red-400'
              }`}>
                {getStatusIcon(
                  result.details.amountDetected.found && result.details.amountDetected.match,
                  result.details.amountDetected.confidence
                )}
                <span>Nominal Transfer</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                result.details.referenceCodeDetected.found && result.details.referenceCodeDetected.match ? 'text-green-400' : 'text-red-400'
              }`}>
                {getStatusIcon(
                  result.details.referenceCodeDetected.found && result.details.referenceCodeDetected.match,
                  result.details.referenceCodeDetected.confidence
                )}
                <span>Kode Referensi</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm ${
                result.details.dateDetected.found && result.details.dateDetected.isToday ? 'text-green-400' : 'text-red-400'
              }`}>
                {getStatusIcon(
                  result.details.dateDetected.found && result.details.dateDetected.isToday,
                  result.details.dateDetected.confidence
                )}
                <span>Tanggal Transfer</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                result.details.accountNumberDetected.found && result.details.accountNumberDetected.match ? 'text-green-400' : 'text-red-400'
              }`}>
                {getStatusIcon(
                  result.details.accountNumberDetected.found && result.details.accountNumberDetected.match,
                  result.details.accountNumberDetected.confidence
                )}
                <span>Nomor Rekening</span>
              </div>
            </div>
          </div>

          {/* Errors and Warnings */}
          {result.errors.length > 0 && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Masalah Ditemukan:
              </h4>
              <ul className="space-y-1">
                {result.errors.map((error, i) => (
                  <li key={i} className="text-red-300 text-sm">• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Perhatian:
              </h4>
              <ul className="space-y-1">
                {result.warnings.map((warning, i) => (
                  <li key={i} className="text-yellow-300 text-sm">• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {result.isValid ? (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
                onClick={() => onVerificationComplete(result)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Lanjutkan Proses
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={() => setFile(null)}
                  className="border-slate-600 flex-1"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Foto Ulang
                </Button>
                <Button 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1"
                  onClick={onManualReview}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Manual
                </Button>
              </>
            )}
          </div>

          {/* Detailed Results Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetailedResults(!showDetailedResults)}
            className="w-full text-slate-400 hover:text-white"
          >
            {showDetailedResults ? 'Sembunyikan Detail' : 'Lihat Detail Lengkap'}
          </Button>

          {/* Detailed Results */}
          <AnimatePresence>
            {showDetailedResults && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-4 border-t border-slate-700"
              >
                <div className="text-sm space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400">Kualitas Gambar:</span>
                      <span className={`ml-2 ${
                        result.details.imageQuality === 'high' ? 'text-green-400' :
                        result.details.imageQuality === 'medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {result.details.imageQuality.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Screenshot:</span>
                      <span className={`ml-2 ${result.details.isScreenshot ? 'text-yellow-400' : 'text-green-400'}`}>
                        {result.details.isScreenshot ? 'Ya' : 'Tidak'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-white font-medium">Detail Ekstraksi Data:</h5>
                    {result.details.amountDetected.found && (
                      <div className="text-xs bg-slate-800/50 p-2 rounded">
                        <span className="text-slate-400">Nominal terdeteksi:</span>
                        <span className="text-white ml-2">{result.details.amountDetected.value}</span>
                        <span className="text-slate-400 ml-2">
                          ({(result.details.amountDetected.confidence * 100).toFixed(1)}% confidence)
                        </span>
                      </div>
                    )}
                    {result.details.referenceCodeDetected.found && (
                      <div className="text-xs bg-slate-800/50 p-2 rounded">
                        <span className="text-slate-400">Referensi terdeteksi:</span>
                        <span className="text-white ml-2">{result.details.referenceCodeDetected.value}</span>
                        <span className="text-slate-400 ml-2">
                          ({(result.details.referenceCodeDetected.confidence * 100).toFixed(1)}% confidence)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Requirements */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI akan mengecek bukti transfer Anda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-medium">Nominal Transfer Tepat</div>
                <div className="text-green-400 font-mono">{orderData.expectedAmount}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-medium">Kode Referensi</div>
                <div className="text-blue-400 font-mono">{orderData.expectedReference}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-400 font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-medium">Transfer Hari Ini</div>
                <div className="text-purple-400">Dengan tanggal dan waktu yang jelas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      {!file && !isAnalyzing && !verificationResult ? (
        <FileDropzone onFileSelected={handleFileSelected} />
      ) : isAnalyzing ? (
        <AIAnalysisProgress />
      ) : verificationResult ? (
        <VerificationResults result={verificationResult} />
      ) : file ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              File Siap untuk Dianalisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Bukti transfer"
                className="w-full max-h-96 object-contain rounded-lg bg-slate-900"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFile(null)}
                className="absolute top-2 right-2 border-slate-600 bg-slate-800/80 backdrop-blur-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Ganti File
              </Button>
            </div>

            <div className="flex gap-3">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex-1"
                onClick={startAIVerification}
              >
                <Brain className="w-4 h-4 mr-2" />
                Mulai Verifikasi AI
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
