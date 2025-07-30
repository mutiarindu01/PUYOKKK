"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  Shield,
  Clock,
  Eye,
  Share2,
  Twitter,
  MessageCircle,
  ExternalLink,
  Download,
  Bell,
  Smartphone,
  Mail,
  ArrowRight,
  Home,
  History,
  RefreshCw,
  AlertTriangle,
  Info,
  Trophy,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useParams } from "next/navigation"

// Types
interface SuccessOrder {
  id: string
  asset: {
    name: string
    collection: string
    image: string
    type: string
  }
  amount: number
  status: "verifying" | "verified" | "manual_review" | "completed"
  estimatedCompletion: string
  transactionHash?: string
  seller: {
    name: string
    address: string
  }
}

// Sample data
const sampleOrder: SuccessOrder = {
  id: "order-123456",
  asset: {
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    type: "ERC721"
  },
  amount: 1515134,
  status: "verifying",
  estimatedCompletion: "2024-02-01T10:45:00Z",
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

const formatTimeLeft = (targetTime: string) => {
  const now = new Date().getTime()
  const target = new Date(targetTime).getTime()
  const diff = target - now

  if (diff <= 0) return "Segera"

  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (minutes > 0) {
    return `${minutes} menit ${seconds} detik`
  }
  return `${seconds} detik`
}

// Components
function SuccessAnimation() {
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

function StatusTimeline({ status }: { status: string }) {
  const steps = [
    { id: 'received', title: 'Bukti Diterima', icon: CheckCircle, status: 'completed' },
    { id: 'verifying', title: 'Verifikasi AI', icon: RefreshCw, status: status === 'verifying' ? 'active' : status === 'verified' || status === 'completed' ? 'completed' : 'pending' },
    { id: 'verified', title: 'Pembayaran Terverifikasi', icon: Shield, status: status === 'verified' || status === 'completed' ? 'completed' : 'pending' },
    { id: 'transfer', title: 'Transfer Aset', icon: ArrowRight, status: status === 'completed' ? 'completed' : 'pending' }
  ]

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isActive = step.status === 'active'
        const isCompleted = step.status === 'completed'
        const isPending = step.status === 'pending'

        return (
          <div key={step.id} className="flex items-center gap-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
              ${isCompleted ? 'bg-green-500 border-green-500' :
                isActive ? 'bg-blue-500 border-blue-500 animate-pulse' :
                'bg-slate-700 border-slate-600'}
            `}>
              <Icon className={`w-5 h-5 ${
                isCompleted ? 'text-white' :
                isActive ? 'text-white animate-spin' :
                'text-slate-400'
              }`} />
            </div>
            
            <div className="flex-1">
              <div className={`font-medium ${
                isCompleted ? 'text-green-400' :
                isActive ? 'text-blue-400' :
                'text-slate-400'
              }`}>
                {step.title}
              </div>
              {isActive && (
                <div className="text-sm text-slate-300">Sedang diproses...</div>
              )}
              {isCompleted && index === 0 && (
                <div className="text-sm text-slate-400">Bukti transfer berhasil diunggah</div>
              )}
              {isCompleted && index === 1 && (
                <div className="text-sm text-slate-400">AI berhasil memverifikasi pembayaran</div>
              )}
              {isCompleted && index === 2 && (
                <div className="text-sm text-slate-400">Pembayaran valid dan terkonfirmasi</div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className={`absolute left-5 mt-10 w-0.5 h-6 ${
                steps[index + 1].status === 'completed' ? 'bg-green-500' : 'bg-slate-600'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function NextStepsCard({ order }: { order: SuccessOrder }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(order.estimatedCompletion))
    }, 1000)

    return () => clearInterval(timer)
  }, [order.estimatedCompletion])

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          Langkah Selanjutnya
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="text-blue-400 font-medium mb-1">Aset Sedang Diproses</h4>
              <p className="text-slate-300 text-sm">
                {order.asset.type} akan dikirim ke wallet Anda dalam <strong>{timeLeft}</strong>
              </p>
              <div className="mt-2">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-slate-400 mt-1">Estimasi penyelesaian: 75%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="text-purple-400 font-medium mb-1">Pantau Status Real-time</h4>
              <p className="text-slate-300 text-sm mb-2">
                Lacak progress transaksi di halaman riwayat
              </p>
              <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" asChild>
                <Link href="/dashboard">
                  <History className="w-4 h-4 mr-2" />
                  Lihat Riwayat
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="text-green-400 font-medium mb-1">Notifikasi Otomatis</h4>
              <p className="text-slate-300 text-sm mb-2">
                Kami akan memberitahu Anda via email dan WhatsApp saat aset diterima
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-green-400">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SecurityAssuranceCard() {
  return (
    <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">🛡️ Escrow Protection Aktif</h3>
            <div className="text-slate-300 space-y-2 text-sm">
              <p>✅ Dana penjual diamankan sampai Anda menerima aset</p>
              <p>✅ Jaminan 100% uang kembali jika ada masalah</p>
              <p>✅ Sistem monitoring otomatis 24/7</p>
              <p>✅ Tim dispute resolution siap membantu</p>
            </div>
            
            <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                <strong>Penting:</strong> Laporkan dalam 24 jam jika ada masalah dengan aset yang diterima.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ShareSuccessCard({ order }: { order: SuccessOrder }) {
  const shareText = `Baru saja membeli ${order.asset.name} di PUYOK Marketplace! 🚀 #NFT #PUYOK #Crypto`
  const shareUrl = `https://puyok.id/marketplace/${order.id}`

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Bagikan Keberhasilan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300 text-sm">
          Bangga dengan pembelian NFT Anda? Bagikan ke komunitas!
        </p>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }}
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            onClick={() => {
              const message = `${shareText}\n\n${shareUrl}`
              window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                '_blank'
              )
            }}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl)
              alert('Link berhasil disalin!')
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Salin Link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PaymentSuccessPage() {
  const params = useParams()
  const [order] = useState<SuccessOrder>(sampleOrder)
  const [showCelebration, setShowCelebration] = useState(true)

  useEffect(() => {
    // Hide celebration after 5 seconds
    const timer = setTimeout(() => {
      setShowCelebration(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Order Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-6">Order dengan ID tersebut tidak tersedia</p>
          <Button asChild>
            <Link href="/marketplace">
              Kembali ke Marketplace
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
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
              <Badge className="bg-green-500/20 text-green-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                Pembayaran Berhasil
              </Badge>
              <div className="text-slate-400">Order #{order.id.slice(0, 8)}</div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-slate-600" asChild>
                <Link href="/dashboard">
                  <History className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600" asChild>
                <Link href="/marketplace">
                  <Home className="w-4 h-4 mr-2" />
                  Marketplace
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <SuccessAnimation />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Pembayaran Terverifikasi! 🎉
          </h1>
          <p className="text-slate-400 text-lg">
            Selamat! {order.asset.name} akan segera menjadi milik Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Asset Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Asset Card */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden mb-4">
                    <img
                      src={order.asset.image}
                      alt={order.asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{order.asset.name}</h3>
                  <p className="text-slate-400 mb-3">{order.asset.collection}</p>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {order.asset.type}
                  </Badge>
                </div>
                
                <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-1">Total Dibayar</div>
                    <div className="text-xl font-bold text-green-400">
                      {formatCurrency(order.amount)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Card */}
            <ShareSuccessCard order={order} />
          </div>

          {/* Right Column - Status & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status Transaksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StatusTimeline status={order.status} />
              </CardContent>
            </Card>

            {/* Next Steps */}
            <NextStepsCard order={order} />

            {/* Security Assurance */}
            <SecurityAssuranceCard />

            {/* Transaction Hash */}
            {order.transactionHash && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Blockchain Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-400">Transaction Hash</div>
                        <div className="font-mono text-white">{order.transactionHash}</div>
                      </div>
                      <Button variant="outline" size="sm" className="border-slate-600">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-yellow-400 font-bold">🏆 NFT Collector Achievement!</h3>
                      <p className="text-slate-300 text-sm">
                        Anda telah berhasil menambah koleksi NFT premium. Bagikan pencapaian ini!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
