"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { 
  Clock, 
  Copy, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Banknote,
  Timer,
  Star,
  Eye
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

// Mock asset data - in real app this would come from API
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

export default function PaymentInstructionsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const assetId = searchParams.get('assetId')
  
  const [asset, setAsset] = useState<Asset | null>(null)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes
  const [canProceed, setCanProceed] = useState(false)
  const [copiedStates, setCopiedStates] = useState({
    amount: false,
    account: false,
    code: false
  })

  // Generate unique payment details based on assetId
  const paymentDetails = {
    uniqueAmount: asset ? `${asset.price.replace(/[^\d]/g, '')}.134` : "15000000.134",
    accountNumber: "1234-5678-9012-3456",
    transferCode: `PUYOK-${assetId || '101'}`,
    bankName: "Bank Central Asia (BCA)",
    accountName: "PT PUYOK MARKETPLACE"
  }

  useEffect(() => {
    // Find asset based on assetId
    const foundAsset = mockAssets.find(a => a.id === assetId)
    setAsset(foundAsset || mockAssets[0])

    // Enable "I Have Paid" button after 30 seconds
    const proceedTimer = setTimeout(() => {
      setCanProceed(true)
    }, 30000)

    return () => clearTimeout(proceedTimer)
  }, [assetId])

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          router.push('/marketplace')
          toast({
            title: "Waktu Habis",
            description: "Silakan coba lagi dari halaman marketplace.",
            variant: "destructive"
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopy = (text: string, type: 'amount' | 'account' | 'code') => {
    navigator.clipboard.writeText(text)
    setCopiedStates(prev => ({ ...prev, [type]: true }))
    
    const messages = {
      amount: "Nominal unik berhasil disalin!",
      account: "Nomor rekening berhasil disalin!",
      code: "Kode transfer berhasil disalin!"
    }
    
    toast({
      title: "Berhasil Disalin!",
      description: messages[type],
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [type]: false }))
    }, 2000)
  }

  const handleProceedToUpload = () => {
    router.push(`/upload-proof?assetId=${assetId}`)
  }

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Asset Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">Silakan kembali ke marketplace.</p>
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
          <Link href={`/marketplace/${assetId}`} className="hover:text-primary">{asset.name}</Link>
          <span>/</span>
          <span className="text-foreground">Instruksi Pembayaran</span>
        </div>

        {/* Timer Alert - Prominent */}
        <Alert className="mb-6 border-2 border-red-200 bg-red-50 dark:bg-red-950/20">
          <Timer className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-center">
            <div className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
              Selesaikan Pembayaran Dalam
            </div>
            <div className="text-3xl font-mono font-bold text-red-600 dark:text-red-300">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-red-600/80 mt-1">
              Waktu terbatas untuk menjamin ketersediaan aset
            </div>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Ringkasan Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asset Image/Icon */}
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
                      <span className="text-muted-foreground">Harga:</span>
                      <span className="text-2xl font-bold text-primary">{asset.price}</span>
                    </div>
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

          {/* Right Column - Payment Instructions */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-6 h-6" />
                  Instruksi Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Important Notice */}
                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <AlertDescription>
                    <div className="font-semibold text-orange-800 dark:text-orange-400 mb-2">
                      PENTING: Ikuti instruksi dengan tepat!
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      Transfer sesuai nominal unik dan masukkan kode berita agar pembayaran dapat diverifikasi otomatis.
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Payment Details Box */}
                <div className="border-2 border-primary/30 rounded-lg p-6 bg-primary/5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Detail Pembayaran
                  </h3>

                  <div className="space-y-4">
                    {/* Bank Details */}
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Bank Tujuan:</label>
                        <div className="text-lg font-semibold">{paymentDetails.bankName}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nama Penerima:</label>
                        <div className="text-lg font-semibold">{paymentDetails.accountName}</div>
                      </div>
                    </div>

                    {/* Account Number */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nomor Rekening:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 p-3 bg-background border rounded-lg">
                          <div className="text-2xl font-mono font-bold">{paymentDetails.accountNumber}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCopy(paymentDetails.accountNumber, 'account')}
                          className="shrink-0"
                        >
                          {copiedStates.account ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Unique Amount */}
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-200 rounded-lg p-4">
                      <label className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                        💰 Nominal Transfer Unik (WAJIB):
                      </label>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 p-3 bg-background border rounded-lg">
                          <div className="text-3xl font-mono font-bold text-primary">
                            Rp {paymentDetails.uniqueAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCopy(`Rp ${paymentDetails.uniqueAmount}`, 'amount')}
                          className="shrink-0"
                        >
                          {copiedStates.amount ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                        Transfer sesuai nominal unik ini agar pembayaranmu bisa diverifikasi lebih cepat.
                      </div>
                    </div>

                    {/* Transfer Code */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 rounded-lg p-4">
                      <label className="text-sm font-medium text-blue-800 dark:text-blue-400">
                        📝 Berita Transfer (WAJIB):
                      </label>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 p-3 bg-background border rounded-lg">
                          <div className="text-2xl font-mono font-bold text-blue-600">
                            {paymentDetails.transferCode}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCopy(paymentDetails.transferCode, 'code')}
                          className="shrink-0"
                        >
                          {copiedStates.code ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mt-2 font-semibold">
                        PENTING: Masukkan kode {paymentDetails.transferCode} di kolom Berita/Catatan saat transfer.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <Shield className="h-5 w-5 text-green-600" />
                  <AlertDescription>
                    <div className="font-semibold text-green-800 dark:text-green-400 mb-2">
                      🔒 Transaksi Aman dengan PUYOK
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Dana Anda dilindungi sistem escrow. Aset akan ditransfer otomatis setelah pembayaran dikonfirmasi.
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleProceedToUpload}
                    disabled={!canProceed}
                    className={`w-full h-12 text-lg ${
                      canProceed 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {canProceed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Saya Sudah Bayar, Lanjut Upload Bukti
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5 mr-2" />
                        Mohon tunggu... (aktivasi dalam {Math.max(0, 30 - Math.floor((15 * 60 - timeLeft) / 1))}s)
                      </>
                    )}
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/marketplace')}
                    className="w-full"
                  >
                    Batal dan Kembali
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
