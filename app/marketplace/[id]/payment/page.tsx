"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Copy,
  Check,
  Info,
  Shield,
  AlertTriangle,
  CreditCard,
  Timer,
  DollarSign,
  HelpCircle,
  Upload,
  Eye,
  CheckCircle,
  Trophy,
  Share2,
  Twitter,
  MessageCircle,
  Home,
  History,
  Camera,
  Smartphone,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Stepper, { Step } from "@/components/Stepper"

// Types
interface PaymentOrder {
  id: string
  asset: {
    name: string
    collection: string
    image: string
    type: string
  }
  price: number
  platformFee: number
  total: number
  uniqueAmount: number
  paymentMethod: string
  paymentAccount: {
    name: string
    number: string
    type: "bank" | "ewallet"
  }
  expiresAt: string
  referenceCode: string
  seller: {
    name: string
    address: string
  }
}

// Sample data
const sampleOrder: PaymentOrder = {
  id: "order-123456",
  asset: {
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    type: "ERC721"
  },
  price: 1500000,
  platformFee: 15000,
  total: 1515000,
  uniqueAmount: 1515134,
  paymentMethod: "DANA",
  paymentAccount: {
    name: "PUYOK Marketplace",
    number: "0812-3456-7890",
    type: "ewallet"
  },
  expiresAt: "2025-02-01T10:30:00Z",
  referenceCode: "PUYOK-123456",
  seller: {
    name: "CryptoArt_Master",
    address: "0x1234...5678"
  }
}

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatUniqueAmount = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 3,
  }).format(amount)
}

const formatTimeLeft = (targetTime: string) => {
  const now = new Date().getTime()
  const target = new Date(targetTime).getTime()
  const diff = target - now

  if (diff <= 0) return "Expired"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function UnifiedPaymentFlow() {
  const params = useParams()
  const router = useRouter()
  const [order] = useState<PaymentOrder>(sampleOrder)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Step 1 states
  const [timeLeft, setTimeLeft] = useState("")
  const [isExpired, setIsExpired] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const [proceedCountdown, setProceedCountdown] = useState(30)
  
  // Step 2 states
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [validationResults, setValidationResults] = useState({
    hasAmount: false,
    hasReference: false,
    hasDate: false,
    isScreenshot: false
  })
  const [aiVerificationResult, setAiVerificationResult] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  
  // Step 3 states
  const [verificationStatus, setVerificationStatus] = useState<"verifying" | "verified" | "manual_review" | "completed">("verifying")
  const [showCelebration, setShowCelebration] = useState(false)

  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(order.expiresAt))
      setIsExpired(new Date(order.expiresAt) < new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [order.expiresAt])

  useEffect(() => {
    if (proceedCountdown > 0) {
      const timer = setTimeout(() => {
        setProceedCountdown(proceedCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanProceed(true)
    }
  }, [proceedCountdown])

  useEffect(() => {
    if (file && !isAnalyzing) {
      setIsAnalyzing(true)
      setTimeout(() => {
        setValidationResults({
          hasAmount: Math.random() > 0.3,
          hasReference: Math.random() > 0.4,
          hasDate: true,
          isScreenshot: Math.random() > 0.7
        })
        setIsAnalyzing(false)
      }, 2000)
    }
  }, [file])

  // Handlers
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
  }

  const handleUploadProof = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setVerificationStatus("verified")
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 5000)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const CopyButton = ({ text, label = "Salin" }: { text: string; label?: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      await handleCopyToClipboard(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="border-slate-600 hover:bg-slate-700"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-green-400">Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            {label}
          </>
        )}
      </Button>
    )
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
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
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
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            isDragging ? 'bg-blue-500/20' : 'bg-slate-700/50'
          }`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-400' : 'text-slate-400'}`} />
          </div>
        </motion.div>
        
        <h3 className="text-lg font-semibold text-white mb-2">
          {isDragging ? 'Lepaskan file di sini' : 'Seret bukti transfer ke sini'}
        </h3>
        <p className="text-slate-400 mb-4">
          atau <span className="text-blue-400 font-medium">klik untuk memilih file</span>
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <span>Format: JPG, PNG</span>
          <span>•</span>
          <span>Maksimal: 5MB</span>
        </div>
      </div>
    )
  }

  const SuccessAnimation = () => {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="relative"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.5
          }}
          className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
        
        {/* Confetti effect */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100],
              x: [0, Math.random() * 200 - 100]
            }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.1,
              ease: "easeOut"
            }}
            className={`absolute top-0 left-1/2 w-3 h-3 rounded-full ${
              ['bg-yellow-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400'][i % 5]
            }`}
          />
        ))}
      </motion.div>
    )
  }

  const stepTitles = [
    "Instruksi Pembayaran",
    "Upload Bukti Transfer", 
    "Verifikasi & Konfirmasi"
  ]

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Order Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-6">Order dengan ID tersebut tidak tersedia</p>
          <Button asChild>
            <Link href="/marketplace">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Marketplace
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50%",
                  y: "100%",
                  opacity: 1,
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className={`absolute w-4 h-4 ${
                  ['bg-yellow-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400'][i % 5]
                } rounded-full`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/marketplace/${params?.id}`} className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Link>
              </Button>
              <div className="text-slate-400">/</div>
              <div className="text-white">Pembelian NFT</div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400">
              {stepTitles[currentStep - 1]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            💳 Pembelian {order.asset.name}
          </h1>
          <p className="text-slate-400">
            {!isExpired ? "Ikuti langkah-langkah berikut untuk menyelesaikan pembelian" : "Waktu pembelian telah habis"}
          </p>
        </div>

        <Stepper
          initialStep={1}
          onStepChange={setCurrentStep}
          onFinalStepCompleted={() => router.push("/marketplace")}
          backButtonText="Sebelumnya"
          nextButtonText="Lanjutkan"
          disableStepIndicators={isExpired}
          stepCircleContainerClassName="bg-slate-800/50 border-slate-700"
          contentClassName="bg-transparent"
          footerClassName="bg-transparent"
          backButtonProps={{
            className: "bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
          }}
          nextButtonProps={{
            className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed",
            disabled: (currentStep === 1 && (!canProceed || isExpired)) || 
                     (currentStep === 2 && !file) ||
                     (currentStep === 2 && isUploading)
          }}
        >
          {/* Step 1: Payment Instructions */}
          <Step>
            <div className="space-y-6">
              {/* Timer */}
              <div className={`p-4 rounded-lg border-2 ${
                isExpired ? 'bg-red-500/10 border-red-500/50' : 
                timeLeft.includes(':') && parseInt(timeLeft.split(':')[0]) < 5 ? 'bg-yellow-500/10 border-yellow-500/50' :
                'bg-blue-500/10 border-blue-500/50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isExpired ? 'bg-red-500/20' :
                    timeLeft.includes(':') && parseInt(timeLeft.split(':')[0]) < 5 ? 'bg-yellow-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    <Timer className={`w-6 h-6 ${
                      isExpired ? 'text-red-400' :
                      timeLeft.includes(':') && parseInt(timeLeft.split(':')[0]) < 5 ? 'text-yellow-400' :
                      'text-blue-400'
                    }`} />
                  </div>
                  <div>
                    {isExpired ? (
                      <div>
                        <h3 className="text-red-400 font-bold text-lg">⏰ Waktu Habis</h3>
                        <p className="text-slate-300">Silakan buat order baru untuk melanjutkan</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-white font-bold text-lg">Selesaikan pembayaran dalam:</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-mono font-bold ${
                            timeLeft.includes(':') && parseInt(timeLeft.split(':')[0]) < 5 ? 'text-yellow-400' : 'text-blue-400'
                          }`}>
                            {timeLeft}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isExpired && (
                <>
                  {/* Asset Summary */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={order.asset.image}
                            alt={order.asset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg">{order.asset.name}</h3>
                          <p className="text-slate-400">{order.asset.collection}</p>
                          <span className="text-green-400 font-bold text-xl">
                            {formatCurrency(order.price)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Details */}
                  <div className="grid gap-4">
                    {/* Unique Amount */}
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white font-medium">💸 Transfer Tepat Sebesar</label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">
                                Nominal unik dengan 3 digit terakhir memungkinkan sistem kami mengenali pembayaran Anda secara otomatis!
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                        <span className="text-2xl font-mono font-bold text-green-400">
                          {formatUniqueAmount(order.uniqueAmount)}
                        </span>
                        <CopyButton text={order.uniqueAmount.toString()} label="Salin Nominal" />
                      </div>
                    </div>

                    {/* Reference Code */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white font-medium">📝 Kode Berita Transfer</label>
                        <Badge className="bg-red-500/20 text-red-400">WAJIB</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                        <span className="text-xl font-mono font-bold text-blue-400">
                          {order.referenceCode}
                        </span>
                        <CopyButton text={order.referenceCode} label="Salin Kode" />
                      </div>
                    </div>

                    {/* Payment Destination */}
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <label className="text-white font-medium mb-3 block">
                        Transfer ke {order.paymentMethod}
                      </label>
                      
                      <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                        <div>
                          <div className="text-lg font-mono font-bold text-white">
                            {order.paymentAccount.number}
                          </div>
                          <div className="text-slate-400 text-sm">
                            a/n {order.paymentAccount.name}
                          </div>
                        </div>
                        <CopyButton text={order.paymentAccount.number} label="Salin Nomor" />
                      </div>
                    </div>
                  </div>

                  {/* Proceed Delay Message */}
                  {!canProceed && (
                    <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400">
                        Silakan transfer terlebih dahulu. Tombol lanjutkan akan aktif dalam {proceedCountdown} detik.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Step>

          {/* Step 2: Upload Proof */}
          <Step>
            <div className="space-y-6">
              {/* Requirements */}
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Pastikan Bukti Transfer Menunjukkan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400 font-bold">1</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Nominal Transfer</div>
                        <div className="text-green-400 font-mono">{formatUniqueAmount(order.uniqueAmount)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 font-bold">2</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Kode Referensi</div>
                        <div className="text-blue-400 font-mono">{order.referenceCode}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Tanggal & Waktu</div>
                        <div className="text-purple-400">Transfer dilakukan hari ini</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Area */}
              {!file ? (
                <FileDropzone onFileSelected={handleFileSelected} />
              ) : (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Pratinjau Bukti Transfer
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

                    {/* AI Validation */}
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">🤖 Analisis Otomatis</h4>
                        {isAnalyzing ? (
                          <div className="flex items-center gap-2 text-blue-400">
                            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm">Memindai...</span>
                          </div>
                        ) : (
                          <Badge className={`${Object.values(validationResults).filter(Boolean).length >= 3 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {Object.values(validationResults).filter(Boolean).length}/4 Valid
                          </Badge>
                        )}
                      </div>

                      {!isAnalyzing && (
                        <div className="space-y-2">
                          <div className={`flex items-center gap-2 text-sm ${validationResults.hasAmount ? 'text-green-400' : 'text-red-400'}`}>
                            {validationResults.hasAmount ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            <span>Nominal transfer terdeteksi</span>
                          </div>
                          <div className={`flex items-center gap-2 text-sm ${validationResults.hasReference ? 'text-green-400' : 'text-red-400'}`}>
                            {validationResults.hasReference ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            <span>Kode referensi terdeteksi</span>
                          </div>
                          <div className={`flex items-center gap-2 text-sm ${validationResults.hasDate ? 'text-green-400' : 'text-red-400'}`}>
                            {validationResults.hasDate ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            <span>Tanggal/waktu terdeteksi</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </Step>

          {/* Step 3: Success */}
          <Step>
            <div className="space-y-6 text-center">
              <SuccessAnimation />
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Pembayaran Terverifikasi! 🎉
                </h2>
                <p className="text-slate-400 text-lg">
                  Selamat! {order.asset.name} akan segera menjadi milik Anda
                </p>
              </div>

              {/* Next Steps */}
              <div className="grid gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-medium mb-1">Aset Sedang Diproses</h4>
                      <p className="text-slate-300 text-sm">
                        NFT akan dikirim ke wallet Anda dalam 5-15 menit
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-1">Pantau Status</h4>
                      <p className="text-slate-300 text-sm">
                        Lacak progress di halaman riwayat transaksi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Success */}
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => {
                    const shareText = `Baru saja membeli ${order.asset.name} di PUYOK Marketplace! 🚀 #NFT #PUYOK`
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
                      '_blank'
                    )
                  }}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                
                <Button variant="outline" size="sm" className="border-slate-600" asChild>
                  <Link href="/dashboard">
                    <History className="w-4 h-4 mr-2" />
                    Riwayat
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" className="border-slate-600" asChild>
                  <Link href="/marketplace">
                    <Home className="w-4 h-4 mr-2" />
                    Marketplace
                  </Link>
                </Button>
              </div>

              {/* Achievement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 max-w-lg mx-auto">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-yellow-400 font-bold">🏆 NFT Collector Achievement!</h3>
                        <p className="text-slate-300 text-sm">
                          Selamat menambah koleksi NFT premium Anda!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  )
}
