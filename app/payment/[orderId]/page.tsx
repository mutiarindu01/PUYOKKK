"use client"

import React, { useState, useEffect } from "react"
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
  Smartphone,
  Building2,
  Timer,
  DollarSign,
  Eye,
  EyeOff,
  HelpCircle,
  ExternalLink
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
  uniqueAmount: 1515134, // Unique amount for automatic verification
  paymentMethod: "DANA",
  paymentAccount: {
    name: "PUYOK Marketplace",
    number: "0812-3456-7890",
    type: "ewallet"
  },
  expiresAt: "2024-02-01T10:30:00Z",
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

// Components
function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ minutes, seconds })
      } else {
        setIsExpired(true)
        setTimeLeft({ minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  return (
    <div className={`p-4 rounded-lg border-2 mb-6 ${
      isExpired ? 'bg-red-500/10 border-red-500/50' : 
      timeLeft.minutes < 5 ? 'bg-yellow-500/10 border-yellow-500/50' :
      'bg-blue-500/10 border-blue-500/50'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isExpired ? 'bg-red-500/20' :
          timeLeft.minutes < 5 ? 'bg-yellow-500/20' :
          'bg-blue-500/20'
        }`}>
          <Timer className={`w-6 h-6 ${
            isExpired ? 'text-red-400' :
            timeLeft.minutes < 5 ? 'text-yellow-400' :
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
                  timeLeft.minutes < 5 ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-slate-400">menit</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {timeLeft.minutes < 5 && !isExpired && (
        <div className="mt-3 p-3 bg-yellow-500/10 rounded-lg">
          <p className="text-yellow-400 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Waktu hampir habis! Segera lakukan pembayaran untuk mengamankan NFT ini.
          </p>
        </div>
      )}
    </div>
  )
}

function OrderSummary({ order }: { order: PaymentOrder }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Ringkasan Pembelian
        </CardTitle>
      </CardHeader>
      <CardContent>
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
            <div className="flex items-center gap-4 mt-2">
              <Badge className="bg-blue-500/20 text-blue-400">
                {order.asset.type}
              </Badge>
              <span className="text-green-400 font-bold text-xl">
                {formatCurrency(order.price)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Price Breakdown */}
        <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Harga Aset</span>
              <span className="text-white">{formatCurrency(order.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Biaya Platform (1%)</span>
              <span className="text-white">{formatCurrency(order.platformFee)}</span>
            </div>
            <div className="border-t border-slate-600 pt-2 flex justify-between font-bold">
              <span className="text-white">Total Pembayaran</span>
              <span className="text-green-400">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CopyButton({ text, label = "Salin", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`border-slate-600 hover:bg-slate-700 ${className}`}
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

function PaymentDetailsBox({ order }: { order: PaymentOrder }) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <Card className="bg-slate-800/50 border-slate-700 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Detail Pembayaran
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-slate-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Transfer sesuai instruksi untuk verifikasi otomatis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
                    Nominal unik dengan 3 digit terakhir memungkinkan sistem kami mengenali pembayaran Anda secara otomatis dalam hitungan detik!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-slate-600">
            <span className="text-3xl font-mono font-bold text-green-400">
              {formatUniqueAmount(order.uniqueAmount)}
            </span>
            <CopyButton 
              text={order.uniqueAmount.toString()} 
              label="Salin Nominal"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            />
          </div>
          
          <div className="mt-3 p-3 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              <strong>PENTING:</strong> Jangan mengubah nominal ini! Sistem akan langsung mengenali pembayaran Anda.
            </p>
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
            <CopyButton 
              text={order.referenceCode} 
              label="Salin Kode"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            />
          </div>
          
          <div className="mt-3 p-3 bg-red-500/10 rounded-lg">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <strong>WAJIB</strong> dicantumkan di kolom berita/catatan transfer!
            </p>
          </div>
        </div>

        {/* Payment Destination */}
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            {order.paymentAccount.type === "bank" ? (
              <Building2 className="w-5 h-5 text-slate-400" />
            ) : (
              <Smartphone className="w-5 h-5 text-slate-400" />
            )}
            <label className="text-white font-medium">
              Transfer ke {order.paymentMethod}
            </label>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div>
                <div className="text-lg font-mono font-bold text-white">
                  {order.paymentAccount.number}
                </div>
                <div className="text-slate-400 text-sm">
                  a/n {order.paymentAccount.name}
                </div>
              </div>
              <CopyButton 
                text={order.paymentAccount.number} 
                label="Salin Nomor"
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="text-purple-400 font-medium mb-1">🛡️ Perlindungan Keamanan</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Dana akan diamankan sampai aset diterima</li>
                <li>• Verifikasi otomatis dalam hitungan detik</li>
                <li>• Garansi uang kembali 100% jika ada masalah</li>
                <li>• Tim support 24/7 siap membantu</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300">
              <HelpCircle className="w-4 h-4 mr-2" />
              Butuh Bantuan Transfer?
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Panduan Transfer {order.paymentMethod}</DialogTitle>
              <DialogDescription className="text-slate-300">
                Ikuti langkah-langkah berikut untuk transfer yang berhasil
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">Langkah 1: Buka Aplikasi {order.paymentMethod}</h3>
                <p className="text-slate-300 text-sm">Pastikan saldo mencukupi untuk transfer</p>
              </div>
              
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">Langkah 2: Pilih Transfer/Kirim Uang</h3>
                <p className="text-slate-300 text-sm">Masukkan nomor tujuan: <strong>{order.paymentAccount.number}</strong></p>
              </div>
              
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">Langkah 3: Masukkan Nominal Unik</h3>
                <p className="text-slate-300 text-sm">
                  <strong>{formatUniqueAmount(order.uniqueAmount)}</strong> - Jangan diubah!
                </p>
              </div>
              
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">Langkah 4: Isi Berita Transfer</h3>
                <p className="text-slate-300 text-sm">
                  Ketik: <strong>{order.referenceCode}</strong>
                </p>
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h3 className="font-medium text-green-400 mb-2">Langkah 5: Konfirmasi & Kirim</h3>
                <p className="text-slate-300 text-sm">
                  Periksa sekali lagi semua data, lalu kirim transfer
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function DelayedActionButton({ delay, orderId, disabled }: { delay: number; orderId: string; disabled?: boolean }) {
  const [enabled, setEnabled] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(delay)
  const router = useRouter()

  useEffect(() => {
    if (disabled) return

    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setEnabled(true)
    }
  }, [secondsLeft, disabled])

  const handleContinue = () => {
    router.push(`/upload-proof/${orderId}`)
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleContinue}
        disabled={!enabled || disabled}
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold disabled:bg-slate-600 disabled:text-slate-400"
      >
        {disabled ? (
          <>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Waktu Pembayaran Habis
          </>
        ) : enabled ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Saya Sudah Bayar, Lanjut Upload Bukti
          </>
        ) : (
          <>
            <Timer className="w-4 h-4 mr-2" />
            Harap transfer dulu ({secondsLeft}s)
          </>
        )}
      </Button>
      
      {enabled && !disabled && (
        <p className="text-center text-slate-400 text-sm">
          Pastikan transfer sudah berhasil sebelum melanjutkan
        </p>
      )}
    </div>
  )
}

export default function PaymentInstructionsPage() {
  const params = useParams()
  const [order] = useState<PaymentOrder>(sampleOrder)
  const [isExpired, setIsExpired] = useState(false)

  // Check if order is expired
  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date().getTime()
      const expiry = new Date(order.expiresAt).getTime()
      setIsExpired(now > expiry)
    }

    checkExpiry()
    const timer = setInterval(checkExpiry, 1000)
    return () => clearInterval(timer)
  }, [order.expiresAt])

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/marketplace/${params?.orderId}`} className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div className="text-slate-400">/</div>
            <div className="text-white">Instruksi Pembayaran</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            💳 Instruksi Pembayaran
          </h1>
          <p className="text-slate-400">
            Ikuti instruksi dengan teliti untuk proses verifikasi otomatis
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer expiresAt={order.expiresAt} />

        {/* Order Summary */}
        <OrderSummary order={order} />

        {/* Payment Details */}
        <PaymentDetailsBox order={order} />

        {/* Action Button */}
        <DelayedActionButton 
          delay={30} 
          orderId={order.id} 
          disabled={isExpired}
        />

        {/* Footer Help */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-3">
            Mengalami kesulitan? Tim support kami siap membantu 24/7
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <ExternalLink className="w-4 h-4 mr-2" />
              Chat WhatsApp
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ Pembayaran
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
