"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Upload,
  Check,
  X,
  Image as ImageIcon,
  AlertTriangle,
  Shield,
  Eye,
  RotateCcw,
  HelpCircle,
  CheckCircle,
  Timer,
  Camera,
  Smartphone,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Types
interface UploadOrder {
  id: string
  asset: {
    name: string
    collection: string
    image: string
  }
  uniqueAmount: number
  referenceCode: string
  paymentMethod: string
  paymentAccount: {
    name: string
    number: string
  }
  expiresAt: string
}

// Sample data
const sampleOrder: UploadOrder = {
  id: "order-123456",
  asset: {
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
  },
  uniqueAmount: 1515134,
  referenceCode: "PUYOK-123456",
  paymentMethod: "DANA",
  paymentAccount: {
    name: "PUYOK Marketplace",
    number: "0812-3456-7890"
  },
  expiresAt: "2024-02-01T10:30:00Z"
}

// Helper functions
const formatUniqueAmount = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 3,
  }).format(amount)
}

// Components
function FileDropzone({ onFileSelected, isDragging, setIsDragging }: {
  onFileSelected: (file: File) => void
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}) {
  const [dragCounter, setDragCounter] = useState(0)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(dragCounter + 1)
    setIsDragging(true)
  }, [dragCounter, setIsDragging])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(dragCounter - 1)
    if (dragCounter === 1) {
      setIsDragging(false)
    }
  }, [dragCounter, setIsDragging])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setDragCounter(0)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      onFileSelected(imageFile)
    }
  }, [onFileSelected, setIsDragging])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelected(file)
    }
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10 scale-105'
          : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileInput}
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
      
      {isDragging && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-blue-500/5 rounded-xl border-2 border-blue-500 flex items-center justify-center"
        >
          <div className="bg-blue-500/20 rounded-full p-4">
            <Upload className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

function PreviewSection({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [preview, setPreview] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [validationResults, setValidationResults] = useState({
    hasAmount: false,
    hasReference: false,
    hasDate: false,
    isScreenshot: false
  })

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Simulate AI analysis
    setTimeout(() => {
      setValidationResults({
        hasAmount: Math.random() > 0.3,
        hasReference: Math.random() > 0.4,
        hasDate: true,
        isScreenshot: Math.random() > 0.7
      })
      setIsAnalyzing(false)
    }, 2000)
  }, [file])

  const validationScore = Object.values(validationResults).filter(Boolean).length

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Pratinjau Bukti Transfer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Preview */}
        <div className="relative">
          <img
            src={preview}
            alt="Bukti transfer"
            className="w-full max-h-96 object-contain rounded-lg bg-slate-900"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
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
              <Badge className={`${validationScore >= 3 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {validationScore}/4 Valid
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
              <div className={`flex items-center gap-2 text-sm ${!validationResults.isScreenshot ? 'text-green-400' : 'text-yellow-400'}`}>
                {!validationResults.isScreenshot ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{validationResults.isScreenshot ? 'Screenshot terdeteksi (tidak masalah)' : 'Foto asli terdeteksi'}</span>
              </div>
            </div>
          )}

          {!isAnalyzing && validationScore < 3 && (
            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Beberapa informasi tidak terdeteksi. Pastikan bukti transfer mencakup semua detail yang diperlukan.
              </p>
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="p-3 bg-slate-700/30 rounded-lg text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Nama file:</span>
            <span className="text-white">{file.name}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Ukuran:</span>
            <span className="text-white">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Jenis:</span>
            <span className="text-white">{file.type}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RequirementsCard({ order }: { order: UploadOrder }) {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Pastikan Bukti Transfer Menunjukkan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
              <div className="text-white font-medium">Tujuan Transfer</div>
              <div className="text-purple-400">{order.paymentMethod} - {order.paymentAccount.number}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold">4</span>
            </div>
            <div>
              <div className="text-white font-medium">Tanggal & Waktu</div>
              <div className="text-yellow-400">Transfer dilakukan hari ini</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm flex items-center gap-2">
            <Info className="w-4 h-4" />
            <strong>Tips:</strong> Screenshot dari aplikasi banking/e-wallet atau foto struk ATM keduanya diterima.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ActionButtons({ 
  order, 
  file, 
  onSubmit, 
  isSubmitting 
}: { 
  order: UploadOrder
  file: File | null
  onSubmit: () => void
  isSubmitting: boolean 
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="space-y-4">
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogTrigger asChild>
          <Button
            disabled={!file || isSubmitting}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold disabled:bg-slate-600"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Mengunggah Bukti...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Konfirmasi Pembayaran
              </>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Konfirmasi Upload Bukti</DialogTitle>
            <DialogDescription className="text-slate-300">
              Pastikan bukti transfer sudah benar sebelum mengirim
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <h3 className="font-medium text-white mb-2">Detail Transfer yang Dikonfirmasi:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nominal:</span>
                  <span className="text-green-400 font-mono">{formatUniqueAmount(order.uniqueAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kode Referensi:</span>
                  <span className="text-blue-400 font-mono">{order.referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Metode:</span>
                  <span className="text-white">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-green-400 font-medium">Escrow Protection Aktif</h4>
                  <p className="text-slate-300 text-sm">
                    Aset akan dikirim otomatis setelah pembayaran terverifikasi. 
                    Dana Anda aman sampai proses selesai.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-slate-600"
              >
                Periksa Lagi
              </Button>
              <Button
                onClick={() => {
                  setShowConfirm(false)
                  onSubmit()
                }}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Ya, Kirim Bukti
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 border-slate-600 text-slate-300"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Butuh Bantuan?
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-slate-600 text-slate-300"
          asChild
        >
          <Link href={`/payment/${order.id}`}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Lihat Instruksi Lagi
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function UploadProofPage() {
  const params = useParams()
  const router = useRouter()
  const [order] = useState<UploadOrder>(sampleOrder)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileSelected = (selectedFile: File) => {
    // Validate file
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

  const handleSubmit = async () => {
    if (!file) return

    setIsSubmitting(true)
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Navigate to success page
      router.push(`/payment-success/${order.id}`)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload gagal. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/payment/${params?.orderId}`} className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div className="text-slate-400">/</div>
            <div className="text-white">Upload Bukti Transfer</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            📸 Upload Bukti Transfer
          </h1>
          <p className="text-slate-400">
            Upload bukti pembayaran untuk verifikasi otomatis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Requirements */}
          <div className="lg:col-span-1">
            <RequirementsCard order={order} />
            
            {/* Quick Tips */}
            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Tips Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Pastikan gambar jelas dan tidak buram</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Sertakan semua informasi transfer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-slate-300">Screenshot atau foto keduanya OK</span>
                </div>
                <div className="flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span className="text-slate-300">Bisa upload langsung dari galeri HP</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upload & Preview */}
          <div className="lg:col-span-2 space-y-6">
            {!file ? (
              <FileDropzone
                onFileSelected={handleFileSelected}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
              />
            ) : (
              <PreviewSection
                file={file}
                onRemove={() => setFile(null)}
              />
            )}

            <ActionButtons
              order={order}
              file={file}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
