"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Clock, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  Eye, 
  ArrowRight,
  AlertTriangle,
  Lock,
  CreditCard,
  DollarSign,
  FileText,
  Smartphone,
  Banknote,
  Zap
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Sample order data - in real app this would come from API based on order ID
const orderData = {
  id: "ORD-12345",
  asset: {
    id: "101",
    name: "Bored Ape #1234",
    type: "NFT",
    image: "/placeholder.svg?height=120&width=120&text=Bored+Ape",
    collection: "Bored Ape Yacht Club",
    seller: {
      username: "cryptoking88",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      totalSales: 247
    }
  },
  basePrice: 15000000, // Rp 15.000.000
  uniqueAmount: 15000134, // Rp 15.000.134 (with unique digits)
  paymentMethod: "DANA",
  recipientAccount: {
    name: "DANA - cryptoking88",
    number: "081234567890",
    type: "DANA"
  },
  transferCode: "PUYOK-12345",
  createdAt: new Date(),
  expiresIn: 24 * 60 * 60 * 1000 // 24 hours
}

interface CopyButtonProps {
  text: string
  label: string
  className?: string
}

function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Berhasil Disalin!",
        description: `${label} telah disalin ke clipboard`,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Gagal Menyalin",
        description: "Silakan salin secara manual",
        variant: "destructive"
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`transition-all duration-300 ${copied ? 'bg-green-100 border-green-300 text-green-700' : ''} ${className}`}
    >
      {copied ? (
        <>
          <CheckCircle className="w-4 h-4 mr-2" />
          Tersalin!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Salin
        </>
      )}
    </Button>
  )
}

function CountdownTimer({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const expiry = expiresAt.getTime()
      const difference = expiry - now

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        setIsUrgent(hours < 1) // Red when less than 1 hour
      } else {
        setTimeLeft("00:00:00")
        setIsUrgent(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  return (
    <Card className={`border-2 ${isUrgent ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className={`w-6 h-6 ${isUrgent ? 'text-red-600' : 'text-orange-600'}`} />
          <div className="text-center">
            <div className={`text-3xl font-bold font-mono ${isUrgent ? 'text-red-600' : 'text-orange-600'}`}>
              {timeLeft}
            </div>
            <p className={`text-sm ${isUrgent ? 'text-red-700' : 'text-orange-700'}`}>
              {isUrgent ? '⚠️ Waktu hampir habis!' : 'Waktu tersisa untuk pembayaran'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PaymentInstructionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentStarted, setPaymentStarted] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  
  const orderExpiry = new Date(orderData.createdAt.getTime() + orderData.expiresIn)

  // Enable proceed button after 30 seconds (simulating transfer time)
  useEffect(() => {
    if (paymentStarted) {
      const timer = setTimeout(() => {
        setCanProceed(true)
      }, 30000) // 30 seconds
      return () => clearTimeout(timer)
    }
  }, [paymentStarted])

  const handlePaymentStarted = () => {
    setPaymentStarted(true)
    toast({
      title: "Pembayaran Dimulai",
      description: "Tombol upload bukti akan aktif dalam 30 detik",
    })
  }

  const handleProceedToUpload = () => {
    router.push(`/upload-proof?orderId=${orderData.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Instruksi Pembayaran</h1>
              <p className="text-sm text-muted-foreground">Order #{orderData.id}</p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm">
                Kembali ke Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Countdown Timer */}
          <CountdownTimer expiresAt={orderExpiry} />

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Ringkasan Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <img 
                  src={orderData.asset.image} 
                  alt={orderData.asset.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{orderData.asset.name}</h3>
                  <p className="text-muted-foreground">{orderData.asset.collection}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={orderData.asset.seller.avatar} />
                      <AvatarFallback>{orderData.asset.seller.username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      Penjual: {orderData.asset.seller.username}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      ⭐ {orderData.asset.seller.rating}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    Rp {orderData.basePrice.toLocaleString('id-ID')}
                  </div>
                  <Badge variant="outline">{orderData.asset.type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details - Most Important Section */}
          <Card className="border-2 border-primary shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                Detail Pembayaran - SANGAT PENTING
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Unique Amount */}
              <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">
                      Nominal Transfer (WAJIB TEPAT)
                    </h3>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 font-mono tracking-wider">
                    Rp {orderData.uniqueAmount.toLocaleString('id-ID')}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <p className="text-sm text-blue-700 dark:text-blue-300 max-w-md">
                      <strong>Transfer sesuai nominal unik ini agar pembayaranmu bisa diverifikasi lebih cepat.</strong>
                      Jangan dibulatkan!
                    </p>
                  </div>
                  <CopyButton 
                    text={orderData.uniqueAmount.toString()} 
                    label="Nominal pembayaran"
                    className="bg-blue-100 border-blue-300 hover:bg-blue-200"
                  />
                </div>
              </div>

              {/* Transfer Note Instructions */}
              <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-400">
                      Berita Transfer (WAJIB ISI)
                    </h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded border border-red-300">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                        PENTING: Masukkan kode ini di kolom Berita/Catatan saat transfer
                      </p>
                      <div className="text-2xl font-bold text-red-600 font-mono bg-red-100 dark:bg-red-900/30 py-2 px-4 rounded border">
                        {orderData.transferCode}
                      </div>
                      <CopyButton 
                        text={orderData.transferCode} 
                        label="Kode transfer"
                        className="bg-red-100 border-red-300 hover:bg-red-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Kode ini untuk keamanan dan pelacakan transaksi. Tanpa kode ini, 
                      pembayaran Anda mungkin tidak terdeteksi otomatis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Detail Akun Tujuan
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Metode Pembayaran</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" className="bg-blue-600">
                        {orderData.paymentMethod}
                      </Badge>
                      <Zap className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Instan</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Nama Akun</Label>
                    <div className="font-semibold mt-1">{orderData.recipientAccount.name}</div>
                  </div>
                </div>

                <div className="p-4 border-2 border-dashed border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Nomor {orderData.paymentMethod}
                      </Label>
                      <div className="text-xl font-bold font-mono mt-1">
                        {orderData.recipientAccount.number}
                      </div>
                    </div>
                    <CopyButton 
                      text={orderData.recipientAccount.number} 
                      label={`Nomor ${orderData.paymentMethod}`}
                      className="bg-primary/10 border-primary/30 hover:bg-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Step by Step Instructions */}
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Langkah-langkah Transfer
                </h4>
                <ol className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    Buka aplikasi {orderData.paymentMethod} Anda
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    Pilih "Transfer" atau "Kirim Uang"
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    Masukkan nomor: <strong>{orderData.recipientAccount.number}</strong>
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    Masukkan nominal: <strong>Rp {orderData.uniqueAmount.toLocaleString('id-ID')}</strong>
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                    Di kolom Berita/Catatan, tulis: <strong>{orderData.transferCode}</strong>
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">6</span>
                    Periksa kembali semua detail, lalu kirim
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!paymentStarted ? (
              <Button 
                onClick={handlePaymentStarted}
                size="lg" 
                className="w-full h-14 text-lg font-semibold gap-2"
              >
                <Banknote className="w-6 h-6" />
                Saya Sudah Melakukan Transfer
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 text-center">
                  <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-blue-800 dark:text-blue-400">
                    Transfer berhasil dicatat!
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    {canProceed 
                      ? "Sekarang Anda bisa upload bukti transfer" 
                      : "Menunggu waktu minimal sebelum upload bukti..."}
                  </p>
                </div>
                
                <Button 
                  onClick={handleProceedToUpload}
                  disabled={!canProceed}
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold gap-2"
                >
                  {canProceed ? (
                    <>
                      <ArrowRight className="w-6 h-6" />
                      Lanjut Upload Bukti Transfer
                    </>
                  ) : (
                    <>
                      <Clock className="w-6 h-6" />
                      Tunggu sebentar... ({Math.max(0, 30 - Math.floor((Date.now() - (paymentStarted ? Date.now() : 0)) / 1000))}s)
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">
                    🔒 Jaminan Keamanan PUYOK
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    <li>✅ Dana Anda dilindungi sistem escrow otomatis</li>
                    <li>✅ Nominal unik memastikan verifikasi instant</li>
                    <li>✅ Kode transfer mencegah fraud dan memudahkan pelacakan</li>
                    <li>✅ Tim support 24/7 siap membantu jika ada masalah</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function Label({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <label className={`block text-sm font-medium ${className}`}>{children}</label>
}
