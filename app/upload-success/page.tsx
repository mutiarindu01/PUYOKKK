"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Shield,
  Star,
  Eye,
  Bell,
  Home,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Asset {
  id: string
  name: string
  type: "NFT" | "Token"
  image?: string
  ticker?: string
  price: string
  quantity?: string
  seller: {
    username: string
    avatar: string
    rating: number
    totalTransactions: number
  }
}

// Mock asset data
const mockAssets: Asset[] = [
  {
    id: "101",
    name: "Bored Ape #1234",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 15.000.000",
    seller: {
      username: "art_visionary",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalTransactions: 247
    }
  },
  {
    id: "1",
    name: "Tether",
    type: "Token",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    seller: {
      username: "stable_trader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      totalTransactions: 523
    }
  }
]

export default function UploadSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const assetId = searchParams.get('assetId')
  
  const [asset, setAsset] = useState<Asset | null>(null)
  const [verificationProgress, setVerificationProgress] = useState(10)
  const [estimatedTime, setEstimatedTime] = useState(8) // minutes

  // Generate order ID
  const orderId = `ORD-${assetId}-${Date.now().toString().slice(-6)}`

  useEffect(() => {
    const foundAsset = mockAssets.find(a => a.id === assetId)
    setAsset(foundAsset || mockAssets[0])

    // Simulate verification progress
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
      
      setEstimatedTime(prev => Math.max(0, prev - 0.5))
    }, 2000)

    return () => clearInterval(interval)
  }, [assetId])

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Asset tidak ditemukan.</p>
          <Button onClick={() => router.push('/marketplace')}>Kembali ke Marketplace</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
          <span>/</span>
          <span className="text-foreground">Konfirmasi Upload</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Order #{orderId}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asset Info */}
                  <div className="flex items-center gap-4">
                    {asset.type === "NFT" && asset.image ? (
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border-2 border-border">
                        <span className="text-2xl font-bold text-primary">{asset.ticker}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{asset.name}</h3>
                      <Badge variant="secondary">{asset.type}</Badge>
                      {asset.quantity && (
                        <p className="text-sm text-muted-foreground mt-1">{asset.quantity}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Total Harga:</span>
                      <span className="text-2xl font-bold text-primary">{asset.price}</span>
                    </div>
                    <Badge variant="outline" className="w-full justify-center py-2">
                      Menunggu Verifikasi
                    </Badge>
                  </div>

                  {/* Seller Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={asset.seller.avatar}
                        alt={asset.seller.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{asset.seller.username}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {asset.seller.rating} ({asset.seller.totalTransactions} transaksi)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Success Message & Next Steps */}
          <div className="lg:col-span-3 space-y-6">
            {/* Success Alert */}
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <AlertDescription>
                <div className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                  🎉 Bukti Transfer Berhasil Dikirim!
                </div>
                <div className="text-green-700 dark:text-green-300">
                  Terima kasih! Bukti transfer Anda telah diterima dan sedang dalam proses verifikasi.
                </div>
              </AlertDescription>
            </Alert>

            {/* Verification Status */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status Verifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress Verifikasi</span>
                    <span>{Math.round(verificationProgress)}%</span>
                  </div>
                  <Progress value={verificationProgress} className="h-3" />
                </div>

                {/* Estimated Time */}
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <AlertDescription>
                    <div className="font-semibold text-blue-800 dark:text-blue-400">
                      ⏱️ Estimasi Waktu Verifikasi: {Math.max(1, Math.round(estimatedTime))} menit
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Tim verifikasi kami sedang mengecek pembayaran Anda. Anda akan mendapat notifikasi saat selesai.
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Verification Steps */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Tahap Verifikasi:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Bukti transfer diterima</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Validasi nominal dan kode transfer</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Konfirmasi dengan bank</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Transfer aset ke wallet Anda</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Langkah Selanjutnya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-semibold">Tunggu Notifikasi</div>
                      <div className="text-sm text-muted-foreground">
                        Kami akan mengirim notifikasi ke email dan dalam aplikasi saat verifikasi selesai
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-semibold">Aset Ditransfer</div>
                      <div className="text-sm text-muted-foreground">
                        Setelah verifikasi, aset akan otomatis ditransfer ke wallet Anda
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-semibold">Berikan Rating</div>
                      <div className="text-sm text-muted-foreground">
                        Jangan lupa berikan rating untuk penjual dan bantu komunitas
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800 dark:text-orange-400">
                      Butuh Bantuan?
                    </h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Tim customer support kami siap membantu 24/7
                    </p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="h-12"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Lihat Dashboard
              </Button>
              <Button 
                onClick={() => router.push('/marketplace')}
                className="h-12"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Marketplace
              </Button>
            </div>

            {/* Trust & Security */}
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <Shield className="h-5 w-5 text-green-600" />
              <AlertDescription>
                <div className="font-semibold text-green-800 dark:text-green-400 mb-2">
                  🔒 Transaksi Aman & Terpercaya
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Dana Anda dilindungi sistem escrow PUYOK. Aset hanya akan dirilis setelah pembayaran dikonfirmasi valid.
                </div>
              </AlertDescription>
            </Alert>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Rekomendasi Untuk Anda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Jelajahi Koleksi Serupa</div>
                      <div className="text-sm text-muted-foreground">
                        Temukan aset lain dari kategori yang sama
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Aktifkan Notifikasi</div>
                      <div className="text-sm text-muted-foreground">
                        Dapatkan update tentang aset dan promo terbaru
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
