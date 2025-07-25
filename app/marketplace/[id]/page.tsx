"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import ScrollReveal from "@/components/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Star, 
  Shield, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  TrendingUp, 
  Wallet,
  Copy,
  ExternalLink,
  Tag,
  Calendar,
  Users,
  Heart,
  Eye,
  AlertCircle,
  Zap,
  Award,
  DollarSign
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

interface Asset {
  id: string
  name: string
  type: "NFT" | "Token"
  image?: string
  ticker?: string
  price: string
  originalPrice?: string
  quantity?: string
  description: string
  seller: {
    username: string
    avatar: string
    rating: number
    totalTransactions: number
    successRate: number
    avgResponseTime: string
    joinDate: string
    isVerified: boolean
    badges: string[]
  }
  details: {
    contractAddress: string
    tokenId?: string
    blockchain: string
    listingDate: string
    paymentMethods: string[]
    marketCap?: string
    volume24h?: string
  }
  priceHistory: {
    timeframe: string
    change: number
  }[]
  analytics: {
    views: number
    favorites: number
    watchers: number
  }
  reviews: {
    id: string
    buyer: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
}

// Extended sample data with trust-building elements
const sampleAssets: Asset[] = [
  {
    id: "101",
    name: "Bored Ape #1234",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 15.000.000",
    originalPrice: "Rp 18.000.000",
    description: "A unique digital artwork capturing the serene beauty of an enchanted forest. Part of the 'Nature's Embrace' collection. This piece features mystical elements and was created by renowned digital artist using advanced AI techniques.",
    seller: {
      username: "art_visionary",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalTransactions: 247,
      successRate: 98.5,
      avgResponseTime: "8 menit",
      joinDate: "Januari 2023",
      isVerified: true,
      badges: ["Top Seller", "Fast Responder", "Verified Artist"]
    },
    details: {
      contractAddress: "0xabc123def456789...",
      tokenId: "789012345",
      blockchain: "Ethereum",
      listingDate: "15 Juli 2024",
      paymentMethods: ["DANA", "GoPay", "OVO", "Bank Transfer"],
      marketCap: "Rp 2.4B",
      volume24h: "Rp 45.2M"
    },
    priceHistory: [
      { timeframe: "24h", change: -5.2 },
      { timeframe: "7d", change: 12.8 },
      { timeframe: "30d", change: 23.1 }
    ],
    analytics: {
      views: 1247,
      favorites: 89,
      watchers: 34
    },
    reviews: [
      {
        id: "1",
        buyer: "crypto_collector88",
        rating: 5,
        comment: "Transaksi sangat lancar! Penjual responsif dan proses transfer cepat. NFT sesuai deskripsi. Highly recommended!",
        date: "12 Juli 2024",
        verified: true
      },
      {
        id: "2", 
        buyer: "nft_enthusiast",
        rating: 5,
        comment: "Kualitas artwork luar biasa. Penjual memberikan panduan lengkap cara transfer ke wallet. Terima kasih!",
        date: "8 Juli 2024",
        verified: true
      },
      {
        id: "3",
        buyer: "digital_art_lover",
        rating: 4,
        comment: "Proses pembelian mudah, seller sangat membantu. Artwork berkualitas tinggi sesuai ekspektasi.",
        date: "5 Juli 2024", 
        verified: true
      }
    ]
  },
  {
    id: "1",
    name: "Tether",
    type: "Token",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    description: "1,000 units of Tether (USDT), a stablecoin pegged to the US Dollar. Ideal for secure and fast transactions. This is a verified stable token with minimal volatility risk.",
    seller: {
      username: "stable_trader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      totalTransactions: 523,
      successRate: 99.2,
      avgResponseTime: "5 menit",
      joinDate: "Oktober 2022",
      isVerified: true,
      badges: ["Power Trader", "Stability Expert", "Fast Delivery"]
    },
    details: {
      contractAddress: "0xdef789abc123456...",
      blockchain: "Polygon",
      listingDate: "14 Juli 2024",
      paymentMethods: ["DANA", "GoPay", "OVO", "Bank Transfer"],
      marketCap: "Rp 1.2T",
      volume24h: "Rp 156B"
    },
    priceHistory: [
      { timeframe: "24h", change: 0.1 },
      { timeframe: "7d", change: -0.2 },
      { timeframe: "30d", change: 0.3 }
    ],
    analytics: {
      views: 892,
      favorites: 156,
      watchers: 67
    },
    reviews: [
      {
        id: "1",
        buyer: "trader_pro",
        rating: 5,
        comment: "Transfer USDT sangat cepat dan aman. Seller memberikan konfirmasi real-time. Akan beli lagi!",
        date: "11 Juli 2024",
        verified: true
      },
      {
        id: "2",
        buyer: "crypto_newbie",
        rating: 5, 
        comment: "Sempurna untuk pemula! Seller sabar menjelaskan proses dan membantu setup wallet. Recommended!",
        date: "9 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "2",
    name: "Ethereum",
    type: "Token",
    ticker: "ETH",
    price: "Rp 45.000.000",
    quantity: "0.5 ETH",
    description: "0.5 units of Ethereum (ETH), the second-largest cryptocurrency by market cap. Perfect for DeFi and NFT transactions.",
    seller: {
      username: "eth_master",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      totalTransactions: 156,
      successRate: 97.8,
      avgResponseTime: "12 menit",
      joinDate: "Maret 2023",
      isVerified: true,
      badges: ["ETH Expert", "DeFi Pro", "Trusted Seller"]
    },
    details: {
      contractAddress: "0x456def123abc789...",
      blockchain: "Ethereum",
      listingDate: "13 Juli 2024",
      paymentMethods: ["DANA", "Bank Transfer"],
      marketCap: "Rp 5.8T",
      volume24h: "Rp 234B"
    },
    priceHistory: [
      { timeframe: "24h", change: -1.5 },
      { timeframe: "7d", change: 8.3 },
      { timeframe: "30d", change: 15.7 }
    ],
    analytics: {
      views: 856,
      favorites: 123,
      watchers: 45
    },
    reviews: [
      {
        id: "1",
        buyer: "defi_trader",
        rating: 5,
        comment: "ETH transfer sangat cepat! Seller profesional dan membantu setup MetaMask. Highly recommended untuk pemula.",
        date: "10 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "3",
    name: "Bitcoin",
    type: "Token",
    ticker: "BTC",
    price: "Rp 850.000.000",
    quantity: "0.1 BTC",
    description: "0.1 units of Bitcoin (BTC), the original cryptocurrency and digital gold. Store of value untuk investasi jangka panjang.",
    seller: {
      username: "btc_hodler",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      totalTransactions: 89,
      successRate: 96.5,
      avgResponseTime: "15 menit",
      joinDate: "Juni 2023",
      isVerified: false,
      badges: ["Bitcoin Expert", "Long Term Holder"]
    },
    details: {
      contractAddress: "0x789abc456def123...",
      blockchain: "Bitcoin",
      listingDate: "12 Juli 2024",
      paymentMethods: ["GoPay", "OVO", "Bank Transfer"],
      marketCap: "Rp 12.1T",
      volume24h: "Rp 567B"
    },
    priceHistory: [
      { timeframe: "24h", change: 2.1 },
      { timeframe: "7d", change: -3.2 },
      { timeframe: "30d", change: 18.9 }
    ],
    analytics: {
      views: 2100,
      favorites: 267,
      watchers: 89
    },
    reviews: [
      {
        id: "1",
        buyer: "bitcoin_newbie",
        rating: 4,
        comment: "Proses pembelian BTC pertama saya. Seller sabar menjelaskan cara setup wallet. Terima kasih!",
        date: "9 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "102",
    name: "CryptoPunk #5678",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 45.000.000",
    description: "Iconic CryptoPunk NFT from the legendary collection. One of the first and most valuable NFT projects in crypto history.",
    seller: {
      username: "pixelartfan",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalTransactions: 334,
      successRate: 99.1,
      avgResponseTime: "6 menit",
      joinDate: "Desember 2022",
      isVerified: true,
      badges: ["NFT Curator", "Pixel Art Expert", "Premium Seller"]
    },
    details: {
      contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb...",
      tokenId: "5678",
      blockchain: "Ethereum",
      listingDate: "11 Juli 2024",
      paymentMethods: ["GoPay", "Bank Transfer"],
      marketCap: "Rp 890M",
      volume24h: "Rp 23.4M"
    },
    priceHistory: [
      { timeframe: "24h", change: 3.2 },
      { timeframe: "7d", change: -8.1 },
      { timeframe: "30d", change: 45.7 }
    ],
    analytics: {
      views: 3200,
      favorites: 445,
      watchers: 112
    },
    reviews: [
      {
        id: "1",
        buyer: "nft_collector_id",
        rating: 5,
        comment: "CryptoPunk asli dengan authenticity terjamin! Seller sangat profesional dan proses transfer aman. Worth every rupiah!",
        date: "8 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "4",
    name: "Binance Coin",
    type: "Token",
    ticker: "BNB",
    price: "Rp 6.000.000",
    quantity: "2 BNB",
    description: "2 units of Binance Coin (BNB), the native token of Binance Smart Chain. Perfect for DeFi and low-cost transactions.",
    seller: {
      username: "bnb_trader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      totalTransactions: 634,
      successRate: 99.6,
      avgResponseTime: "4 menit",
      joinDate: "November 2022",
      isVerified: true,
      badges: ["BSC Expert", "Fast Trader", "Reliable"]
    },
    details: {
      contractAddress: "0x123bnb456def789...",
      blockchain: "Binance Smart Chain",
      listingDate: "10 Juli 2024",
      paymentMethods: ["DANA", "GoPay"],
      marketCap: "Rp 1.8T",
      volume24h: "Rp 89B"
    },
    priceHistory: [
      { timeframe: "24h", change: 0.8 },
      { timeframe: "7d", change: 5.2 },
      { timeframe: "30d", change: 12.4 }
    ],
    analytics: {
      views: 634,
      favorites: 89,
      watchers: 23
    },
    reviews: [
      {
        id: "1",
        buyer: "bnb_fan",
        rating: 5,
        comment: "BNB transfer ke Binance wallet super cepat! Gas fee murah dan seller responsif. Recommended!",
        date: "7 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "103",
    name: "Azuki #9876",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 8.500.000",
    description: "Beautiful Azuki NFT from the popular anime-inspired collection. Clean art style and strong community backing.",
    seller: {
      username: "azuki_lover",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      totalTransactions: 78,
      successRate: 94.2,
      avgResponseTime: "18 menit",
      joinDate: "Mei 2023",
      isVerified: false,
      badges: ["Anime Fan", "NFT Collector"]
    },
    details: {
      contractAddress: "0xed5af388653567af2f388e6224dc7c4b3241c544...",
      tokenId: "9876",
      blockchain: "Ethereum",
      listingDate: "9 Juli 2024",
      paymentMethods: ["DANA", "OVO"],
      marketCap: "Rp 234M",
      volume24h: "Rp 8.9M"
    },
    priceHistory: [
      { timeframe: "24h", change: -2.1 },
      { timeframe: "7d", change: 6.7 },
      { timeframe: "30d", change: -8.3 }
    ],
    analytics: {
      views: 967,
      favorites: 67,
      watchers: 19
    },
    reviews: [
      {
        id: "1",
        buyer: "anime_collector",
        rating: 4,
        comment: "Azuki artwork sangat bagus! Seller membantu proses transfer dan memberikan tips untuk hold NFT. Good deal.",
        date: "6 Juli 2024",
        verified: true
      }
    ]
  },
  {
    id: "104",
    name: "Moonbird #2468",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 18.000.000",
    description: "Premium Moonbird NFT with unique traits and rarity. Part of the prestigious Moonbirds collection with utility benefits.",
    seller: {
      username: "moon_collector",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalTransactions: 167,
      successRate: 98.8,
      avgResponseTime: "7 menit",
      joinDate: "Februari 2023",
      isVerified: true,
      badges: ["Premium Collector", "Moonbird Expert", "Trusted"]
    },
    details: {
      contractAddress: "0x23581767687eadbbeb96f84742a8e1e21c4bc00...",
      tokenId: "2468",
      blockchain: "Ethereum",
      listingDate: "8 Juli 2024",
      paymentMethods: ["DANA", "GoPay", "OVO", "Bank Transfer"],
      marketCap: "Rp 456M",
      volume24h: "Rp 15.7M"
    },
    priceHistory: [
      { timeframe: "24h", change: 1.8 },
      { timeframe: "7d", change: -4.2 },
      { timeframe: "30d", change: 28.5 }
    ],
    analytics: {
      views: 1400,
      favorites: 198,
      watchers: 56
    },
    reviews: [
      {
        id: "1",
        buyer: "moon_investor",
        rating: 5,
        comment: "Moonbird dengan traits bagus! Seller sangat detail menjelaskan utility dan roadmap project. Excellent service!",
        date: "5 Juli 2024",
        verified: true
      }
    ]
  }
]

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params as { id: string }
  const [asset, setAsset] = useState<Asset | null>(null)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Simulate checking if current user is the seller
  const [currentUser] = useState("current_user") // This would come from auth context
  const isOwner = asset?.seller.username === currentUser

  useEffect(() => {
    const foundAsset = sampleAssets.find((a) => a.id === id)
    setAsset(foundAsset || null)
  }, [id])

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Aset Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">Maaf, aset yang Anda cari tidak tersedia.</p>
          <Button onClick={() => router.push("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    )
  }

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Berhasil Disalin!",
      description: message,
    })
  }

  const handleBuyNow = () => {
    if (isOwner) return
    
    setIsLoading(true)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/payment-instructions?assetId=${asset.id}`)
      toast({
        title: "Mengarahkan ke Pembayaran...", 
        description: "Anda akan segera diarahkan ke halaman instruksi pembayaran.",
      })
    }, 1000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
          <span>/</span>
          <span className="text-foreground">{asset.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Large Asset Image - 3 columns */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden border-2 border-border shadow-xl">
              {asset.type === "NFT" && asset.image && (
                <div className="relative group">
                  <Image
                    src={asset.image}
                    alt={asset.name}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {formatNumber(asset.analytics.views)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {asset.analytics.favorites}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {asset.type === "Token" && (
                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="text-center">
                    <span className="text-8xl font-bold text-primary">{asset.ticker}</span>
                    <p className="text-xl text-muted-foreground mt-2">{asset.name}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Asset Description */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-4">{asset.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-sm">{asset.type}</Badge>
                  {asset.ticker && <Badge variant="outline" className="text-sm">{asset.ticker}</Badge>}
                  {asset.seller.isVerified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Terverifikasi
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">{asset.description}</p>
                
                {/* Asset Analytics */}
                <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatNumber(asset.analytics.views)}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{asset.analytics.favorites}</div>
                    <div className="text-sm text-muted-foreground">Favorites</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{asset.analytics.watchers}</div>
                    <div className="text-sm text-muted-foreground">Watchers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Price & Seller Info - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Section */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <div className="text-4xl font-bold text-primary">{asset.price}</div>
                  {asset.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">{asset.originalPrice}</div>
                  )}
                </div>
                {asset.quantity && (
                  <div className="text-lg text-muted-foreground mb-4">Jumlah: {asset.quantity}</div>
                )}
                
                {/* Price History */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {asset.priceHistory.map((period) => (
                    <div key={period.timeframe} className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-xs text-muted-foreground">{period.timeframe}</div>
                      <div className={`text-sm font-semibold ${period.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {period.change >= 0 ? '+' : ''}{period.change}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Buy Button */}
                <Button 
                  onClick={handleBuyNow}
                  disabled={isOwner || isLoading}
                  className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
                    isOwner 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105'
                  }`}
                >
                  {isOwner ? (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Ini adalah order Anda
                    </>
                  ) : isLoading ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Beli Sekarang
                    </>
                  )}
                </Button>

                {!isOwner && (
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    🔒 Transaksi 100% aman dengan garansi uang kembali
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Seller Reputation - The Trust Builder */}
            <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <Shield className="w-5 h-5" />
                  Informasi Penjual Terpercaya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-green-200">
                    <AvatarImage src={asset.seller.avatar} alt={asset.seller.username} />
                    <AvatarFallback className="bg-green-100 text-green-800 text-lg font-semibold">
                      {asset.seller.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Link 
                        href={`/profile/${asset.seller.username}`} 
                        className="text-xl font-bold hover:text-primary transition-colors"
                      >
                        {asset.seller.username}
                      </Link>
                      {asset.seller.isVerified && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(asset.seller.rating)}
                      <span className="ml-2 font-semibold">{asset.seller.rating}</span>
                      <span className="text-muted-foreground">
                        ({formatNumber(asset.seller.totalTransactions)} transaksi)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {asset.seller.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs bg-green-100 text-green-800">
                          <Award className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trust Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ✅ {formatNumber(asset.seller.totalTransactions)}
                    </div>
                    <div className="text-sm text-muted-foreground">Transaksi Berhasil</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {asset.seller.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Tingkat Penyelesaian</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Waktu Respon Rata-rata:
                    </span>
                    <span className="font-semibold text-green-600">{asset.seller.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Bergabung Sejak:
                    </span>
                    <span className="font-semibold">{asset.seller.joinDate}</span>
                  </div>
                </div>

                {/* Reviews Link */}
                <Dialog open={showReviewsModal} onOpenChange={setShowReviewsModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Lihat Ulasan Pembeli ({asset.reviews.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Ulasan dari Pembeli Sebelumnya</DialogTitle>
                      <DialogDescription>
                        Testimoni nyata dari {asset.reviews.length} pembeli yang telah bertransaksi dengan {asset.seller.username}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {asset.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{review.buyer}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Terverifikasi
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2 leading-relaxed">{review.comment}</p>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Teknis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Wallet className="w-4 h-4 mr-2" />
                      Blockchain:
                    </span>
                    <Badge variant="outline">{asset.details.blockchain}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Tanggal Listing:
                    </span>
                    <span className="font-medium">{asset.details.listingDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Contract Address:
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-primary hover:bg-primary/10"
                      onClick={() => handleCopy(asset.details.contractAddress, "Contract address berhasil disalin!")}
                    >
                      <span className="text-sm font-mono">
                        {asset.details.contractAddress.substring(0, 6)}...{asset.details.contractAddress.slice(-4)}
                      </span>
                      <Copy className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  {asset.details.tokenId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Token ID:
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-primary hover:bg-primary/10"
                        onClick={() => handleCopy(asset.details.tokenId!, "Token ID berhasil disalin!")}
                      >
                        <span className="text-sm font-mono">{asset.details.tokenId}</span>
                        <Copy className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                  <div className="pt-2">
                    <span className="text-muted-foreground flex items-center mb-2">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Metode Pembayaran:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {asset.details.paymentMethods.map((method) => (
                        <Badge key={method} variant="secondary" className="bg-green-100 text-green-800">
                          ✓ {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Jaminan Keamanan PUYOK
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Sistem escrow otomatis melindungi dana Anda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Verifikasi identitas penjual telah dilakukan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Garansi uang kembali 100% jika ada masalah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Customer support 24/7 siap membantu</span>
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
