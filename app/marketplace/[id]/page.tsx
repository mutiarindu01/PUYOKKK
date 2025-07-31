"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Star,
  Shield,
  Clock,
  TrendingUp,
  TrendingDown,
  User,
  MessageCircle,
  Eye,
  Heart,
  Share2,
  AlertTriangle,
  CheckCircle,
  Info,
  Copy,
  ExternalLink,
  Zap,
  Timer,
  Verified,
  Award,
  ThumbsUp,
  Activity,
  DollarSign,
  Search,
  Bell,
  ChevronDown,
  Menu,
  Play,
  RotateCcw,
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
  Crown,
  Flame,
  Gem,
  ShieldCheck,
  BarChart3,
  TrendingUpIcon,
  HelpCircle,
  Plus
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useParams } from "next/navigation"

// Types
interface OrderDetail {
  id: string
  asset: {
    id: string
    name: string
    collection: string
    type: "ERC20" | "ERC721" | "ERC1155"
    image: string
    video?: string
    description?: string
    traits?: { trait_type: string; value: string; rarity?: number }[]
    isPioneerNFT?: boolean
    isAnimated?: boolean
  }
  seller: {
    id: string
    address: string
    username: string
    name?: string
    avatar?: string
    isVerified: boolean
    completedTrades: number
    rating: number
    completionRate: number
    avgResponseTime: number
    lastActive: string
    joinDate: string
    reviews: Review[]
    trustScore: number
    riskLevel: "Low" | "Medium" | "High"
  }
  price: number
  marketPrice: number
  priceHistory: { date: string; price: number }[]
  platformFee: number
  buyerFee: number
  total: number
  paymentMethods: string[]
  availableStock: number
  totalStock: number
  expiresAt: string
  createdAt: string
  status: "active" | "sold" | "expired"
  aiPrediction: {
    nextWeek: number
    confidence: number
    trend: "up" | "down" | "stable"
    aiTags: string[]
  }
  escrowAddress: string
  chainInfo: {
    network: string
    contractAddress: string
    tokenId?: string
  }
}

interface Review {
  id: string
  buyerAddress: string
  buyerName?: string
  buyerAvatar?: string
  rating: number
  comment: string
  date: string
  orderType: string
  isVerified: boolean
  isRecent?: boolean
}

interface LiveActivity {
  id: string
  username: string
  action: string
  assetName: string
  timestamp: string
  amount?: number
}

// Sample data with enhanced information
const sampleOrder: OrderDetail = {
  id: "order-123",
  asset: {
    id: "asset-456",
    name: "Legendary Dragon #1234",
    collection: "PUYOK Genesis Collection",
    type: "ERC721",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    video: "https://example.com/dragon-animation.mp4",
    description: "A legendary dragon NFT from the genesis PUYOK collection with ultra-rare fire elemental traits and mystical powers. This dragon represents one of only 50 legendary dragons ever minted.",
    traits: [
      { trait_type: "Element", value: "Fire", rarity: 2.1 },
      { trait_type: "Power Level", value: "Legendary", rarity: 0.8 },
      { trait_type: "Wings", value: "Golden", rarity: 3.2 },
      { trait_type: "Eyes", value: "Mystic Blue", rarity: 1.5 },
      { trait_type: "Background", value: "Volcano", rarity: 4.7 }
    ],
    isPioneerNFT: true,
    isAnimated: true
  },
  seller: {
    id: "seller-789",
    address: "0x1234...5678",
    username: "btc_lover",
    name: "Dragon Master Pro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    isVerified: true,
    completedTrades: 847,
    rating: 4.9,
    completionRate: 98,
    avgResponseTime: 10,
    lastActive: "2 menit yang lalu",
    joinDate: "2021-03-15",
    trustScore: 92,
    riskLevel: "Low",
    reviews: [
      {
        id: "review-1",
        buyerAddress: "0xabc...def",
        buyerName: "NFTCollector99",
        rating: 5,
        comment: "Transaksi sangat lancar, penjual responsif dan aset diterima sesuai deskripsi. Highly recommended!",
        date: "2024-01-15",
        orderType: "NFT Purchase",
        isVerified: true,
        isRecent: true
      },
      {
        id: "review-2",
        buyerAddress: "0x123...789",
        buyerName: "DigitalArtFan",
        rating: 5,
        comment: "Penjual terpercaya, komunikasi baik, pengiriman cepat. Akan transaksi lagi di masa depan.",
        date: "2024-01-10",
        orderType: "NFT Purchase",
        isVerified: true
      }
    ]
  },
  price: 1500000,
  marketPrice: 1450000,
  priceHistory: [
    { date: "2024-01-01", price: 1200000 },
    { date: "2024-01-07", price: 1350000 },
    { date: "2024-01-14", price: 1450000 },
    { date: "2024-01-21", price: 1500000 }
  ],
  platformFee: 0, // 0% for pioneer NFT
  buyerFee: 0,
  total: 1500000,
  paymentMethods: ["DANA", "OVO", "GoPay", "Bank Transfer"],
  availableStock: 1,
  totalStock: 1,
  expiresAt: "2025-02-01T10:00:00Z",
  createdAt: "2024-01-20T08:00:00Z",
  status: "active",
  aiPrediction: {
    nextWeek: 5.2,
    confidence: 78,
    trend: "up",
    aiTags: ["Hot Deal", "Diamond Pick"]
  },
  escrowAddress: "0x863...bffb",
  chainInfo: {
    network: "Polygon",
    contractAddress: "0x789...abc",
    tokenId: "1234"
  }
}

// Live activity sample data
const liveActivities: LiveActivity[] = [
  { id: "1", username: "budi_web3", action: "membeli", assetName: "NFT #1234", timestamp: "2 menit yang lalu", amount: 850000 },
  { id: "2", username: "crypto_king", action: "membeli", assetName: "Dragon Token", timestamp: "5 menit yang lalu", amount: 1200000 },
  { id: "3", username: "art_collector", action: "membeli", assetName: "Rare Gem #567", timestamp: "8 menit yang lalu", amount: 650000 }
]

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString))
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const getTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`
  return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`
}

// Components
function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">P</span>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">PUYOK</span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-slate-300 hover:text-white text-sm">
                  Marketplace <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                <DropdownMenuItem>
                  <span className="text-white">Token</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-white">NFT</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="text-white">Koleksi</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/tentang" className="text-slate-300 hover:text-white transition-colors text-sm">
              Tentang
            </Link>
            <Link href="/bantuan" className="text-slate-300 hover:text-white transition-colors text-sm">
              Bantuan
            </Link>
          </nav>

          {/* Search - Hidden on small screens */}
          <div className="hidden xl:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari NFT, Token..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search icon for mobile */}
            <Button variant="ghost" size="sm" className="xl:hidden text-slate-300 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="outline" className="hidden md:inline-flex border-slate-600 text-slate-300 text-sm px-3 py-1.5">
              <Wallet className="w-4 h-4 mr-1.5" />
              <span className="hidden lg:inline">Connect Wallet</span>
              <span className="lg:hidden">Connect</span>
            </Button>

            <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs sm:text-sm">
                U
              </AvatarFallback>
            </Avatar>

            <Button variant="ghost" size="sm" className="lg:hidden text-slate-300 hover:text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function AssetVisualSection({ order }: { order: OrderDetail }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [is360View, setIs360View] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="relative">
      {/* Main Asset Display */}
      <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        {/* Asset Image/Video */}
        <div className="relative w-full h-full">
          {order.asset.isAnimated ? (
            <div className="w-full h-full flex items-center justify-center bg-black/20">
              <img
                src={order.asset.image}
                alt={order.asset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full w-16 h-16"
                >
                  <Play className="w-8 h-8 text-white" />
                </Button>
              </div>
            </div>
          ) : (
            <img
              src={order.asset.image}
              alt={order.asset.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* PUYOK Verified Badge */}
        <div className="absolute top-6 right-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Status Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {order.asset.isPioneerNFT && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Pioneer NFT
            </Badge>
          )}
          <Badge className={`${
            order.status === "active" ? "bg-green-500/90 text-white" :
            order.status === "sold" ? "bg-red-500/90 text-white" :
            "bg-yellow-500/90 text-black"
          }`}>
            {order.status === "active" ? "🟢 Tersedia" :
             order.status === "sold" ? "🔴 Terjual" :
             "⏰ Expired"}
          </Badge>
        </div>

        {/* AI Tags */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          {order.aiPrediction.aiTags.map((tag, index) => (
            <Badge 
              key={index}
              className={`${
                tag === "Hot Deal" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
                tag === "Diamond Pick" ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" :
                "bg-purple-500/20 text-purple-400 border border-purple-500/50"
              }`}
            >
              {tag === "Hot Deal" && <Flame className="w-3 h-3 mr-1" />}
              {tag === "Diamond Pick" && <Gem className="w-3 h-3 mr-1" />}
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-20 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-black/50 backdrop-blur-sm border-none hover:bg-black/70 rounded-full w-10 h-10 p-0"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-black/50 backdrop-blur-sm border-none hover:bg-black/70 rounded-full w-10 h-10 p-0"
          >
            <Share2 className="w-4 h-4 text-white" />
          </Button>
          {order.asset.type === "ERC721" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIs360View(!is360View)}
              className="bg-black/50 backdrop-blur-sm border-none hover:bg-black/70 rounded-full w-10 h-10 p-0"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </Button>
          )}
        </div>

        {/* Price Display Overlay */}
        <div className="absolute bottom-6 right-6">
          <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-right">
              <p className="text-white font-bold text-2xl">{formatCurrency(order.price)}</p>
              <p className="text-slate-300 text-sm">
                Market: {formatCurrency(order.marketPrice)} 
                <span className={`ml-2 ${order.price < order.marketPrice ? 'text-green-400' : 'text-red-400'}`}>
                  ({order.price < order.marketPrice ? '-' : '+'}{Math.abs(((order.price - order.marketPrice) / order.marketPrice) * 100).toFixed(1)}%)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Information */}
      <div className="mt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{order.asset.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-slate-400 text-lg">{order.asset.collection}</p>
              <Badge className="bg-blue-500/20 text-blue-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Collection
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">Stock Tersedia</p>
            <p className="text-white font-bold text-xl">{order.availableStock}/{order.totalStock}</p>
          </div>
        </div>
        
        {order.asset.description && (
          <div className="mb-6">
            <p className="text-slate-300 leading-relaxed">{order.asset.description}</p>
          </div>
        )}

        {/* AI Price Prediction */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Prediksi Harga AI
            </h3>
            <Badge className="bg-purple-500/20 text-purple-400">
              {order.aiPrediction.confidence}% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className={`w-5 h-5 ${
                order.aiPrediction.trend === 'up' ? 'text-green-400' : 
                order.aiPrediction.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
              }`} />
              <span className="text-white">
                Prediksi 7 hari: {order.aiPrediction.trend === 'up' ? '▲' : order.aiPrediction.trend === 'down' ? '▼' : '◆'} {order.aiPrediction.nextWeek}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Traits */}
      {order.asset.traits && order.asset.traits.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Traits & Rarity
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {order.asset.traits.map((trait, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center hover:border-purple-500/50 transition-colors">
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">{trait.trait_type}</p>
                <p className="text-white font-medium mb-1">{trait.value}</p>
                {trait.rarity && (
                  <p className="text-purple-400 text-xs">{trait.rarity}% rarity</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SellerTrustSection({ seller, onShowReviews }: { seller: OrderDetail['seller']; onShowReviews: () => void }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Informasi Penjual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seller Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={seller.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                {seller.name?.[0] || seller.address.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {seller.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-white">
                @{seller.username}
              </h3>
              {seller.isVerified && (
                <Badge className="bg-blue-500/20 text-blue-400">
                  <Verified className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-3">{seller.name} · {shortenAddress(seller.address)}</p>
            
            {/* Trust Score */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-bold text-lg">Trust Score: {seller.trustScore}/100</span>
                </div>
                <Badge className={`${
                  seller.riskLevel === "Low" ? "bg-green-500/20 text-green-400" :
                  seller.riskLevel === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {seller.riskLevel} Risk
                </Badge>
              </div>
              <Progress value={seller.trustScore} className="h-2 bg-slate-700" />
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">{seller.completedTrades} Transaksi Berhasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">{seller.rating} Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Tingkat Penyelesaian {seller.completionRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Biasanya merespon dalam {seller.avgResponseTime} menit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Terakhir aktif {seller.lastActive}</span>
          </div>
          <div className="text-sm text-slate-400">
            Bergabung {formatDate(seller.joinDate)}
          </div>
        </div>

        {/* Reviews Button */}
        <Button
          variant="outline"
          onClick={onShowReviews}
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Lihat Ulasan Pembeli ({seller.reviews.length})
        </Button>
      </CardContent>
    </Card>
  )
}

function PaymentBreakdownSection({ order }: { order: OrderDetail }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Ringkasan Biaya Pembeli & Metode Pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fee Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Harga Aset</span>
            <span className="text-white font-semibold">{formatCurrency(order.price)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Biaya Pembeli</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">PUYOK menanggung gas fee, tidak ada biaya tambahan!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-green-400 font-semibold">
              {order.asset.isPioneerNFT ? "0% (Pioneer NFT)" : "0%"}
            </span>
          </div>
          
          <div className="border-t border-slate-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-lg">Total yang Harus Dibayar</span>
              <span className="text-green-400 font-bold text-2xl">{formatCurrency(order.total)}</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">Ini adalah jumlah persis yang harus ditransfer</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="text-white font-medium mb-3">Metode Pembayaran Tersedia</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {order.paymentMethods.map((method, index) => (
              <div key={index} className="p-3 bg-slate-700/30 rounded-lg text-center border border-slate-600">
                <div className="w-8 h-8 mx-auto mb-2 bg-blue-500/20 rounded-full flex items-center justify-center">
                  {method === "DANA" && <span className="text-blue-400 text-xs font-bold">💳</span>}
                  {method === "OVO" && <span className="text-purple-400 text-xs font-bold">💳</span>}
                  {method === "GoPay" && <span className="text-green-400 text-xs font-bold">💳</span>}
                  {method === "Bank Transfer" && <Building2 className="w-4 h-4 text-yellow-400" />}
                </div>
                <p className="text-white text-sm font-medium">{method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Notice for Pioneer NFT */}
        {order.asset.isPioneerNFT && (
          <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Pioneer NFT Special</span>
            </div>
            <p className="text-slate-300 text-sm">
              🎉 Sebagai Pioneer NFT, tidak ada biaya platform untuk penjualan pertama. 
              Anda hanya membayar harga aset tanpa biaya tambahan!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function BuyActionSection({ order, currentUser }: { order: OrderDetail; currentUser?: { address: string } }) {
  const [paymentStep, setPaymentStep] = useState(1) // 1: Buy, 2: Payment Method, 3: Payment Instructions
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>()
  const [isBuying, setIsBuying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [canUploadProof, setCanUploadProof] = useState(false)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [copiedField, setCopiedField] = useState<string>('')
  const [uniqueAmount, setUniqueAmount] = useState(0)
  const [transferCode, setTransferCode] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const isSeller = currentUser?.address === order.seller.address
  const isSold = order.status === "sold"

  // Generate unique payment details
  useEffect(() => {
    if (paymentStep === 3) {
      // Generate unique amount (add random cents)
      const randomCents = Math.floor(Math.random() * 900) + 100 // 100-999
      setUniqueAmount(order.total + randomCents)

      // Generate transfer code
      setTransferCode(`PUYOK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Enable upload button after 1 minute
      const uploadTimer = setTimeout(() => {
        setCanUploadProof(true)
      }, 60000) // 1 minute

      return () => {
        clearInterval(timer)
        clearTimeout(uploadTimer)
      }
    }
  }, [paymentStep, order.total])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(''), 2000)
  }

  const handleStartPurchase = () => {
    setShowPaymentModal(true)
    setPaymentStep(2)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    setPaymentStep(3)
  }

  const handleCloseModal = () => {
    setShowPaymentModal(false)
    setPaymentStep(1)
    setSelectedPaymentMethod(undefined)
    setPaymentProof(null)
    setCopiedField('')
  }

  const handleUploadProof = () => {
    // Handle proof upload logic here
    console.log('Uploading proof:', paymentProof)
    // Show success state or next step
  }

  if (isSeller) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-slate-400 mb-4">Ini adalah order Anda</p>
          <Button variant="outline" className="border-slate-600" asChild>
            <Link href={`/marketplace/${order.id}/edit`}>
              Edit Listing
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        {/* Step 1: Initial Buy Button */}
        {paymentStep === 1 && (
          <>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(order.total)}</p>
              <p className="text-slate-400">Total yang harus dibayar</p>
              <Badge className="bg-green-500/20 text-green-400 mt-2">
                ��� Tersedia - Beli Instant
              </Badge>
            </div>

            {isSold ? (
              <Button disabled className="w-full h-14 text-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Sudah Terjual
              </Button>
            ) : (
              <Button
              onClick={handleStartPurchase}
              className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg transition-colors"
            >
              <Zap className="w-5 h-5 mr-2" />
              Beli Sekarang
            </Button>
            )}

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button variant="outline" className="border-slate-600 text-slate-300" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ajukan Penawaran
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Chain
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Payment Method Selection - Moved to Modal */}
        {false && paymentStep === 2 && (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Pilih Metode Pembayaran</h3>
              <p className="text-slate-400">Pilih cara pembayaran yang paling mudah untuk Anda</p>
            </div>

            <div className="space-y-3">
              {order.paymentMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className="w-full p-4 border-2 border-slate-700 hover:border-blue-500 rounded-lg transition-all bg-slate-700/30 hover:bg-blue-500/10 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      {method === "DANA" && <span className="text-blue-400 text-lg">💳</span>}
                      {method === "OVO" && <span className="text-purple-400 text-lg">💳</span>}
                      {method === "GoPay" && <span className="text-green-400 text-lg">💳</span>}
                      {method === "Bank Transfer" && <Building2 className="w-6 h-6 text-yellow-400" />}
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">{method}</p>
                      <p className="text-sm text-slate-400">
                        {method === "Bank Transfer" ? "Transfer bank konvensional" : "E-wallet digital"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setPaymentStep(1)}
              className="w-full mt-4 border-slate-600 text-slate-400"
            >
              Kembali
            </Button>
          </>
        )}

        {/* Step 3: Payment Instructions - Moved to Modal */}
        {false && paymentStep === 3 && selectedPaymentMethod && (
          <>
            {/* Timer Countdown */}
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Selesaikan pembayaran dalam</span>
              </div>
              <div className="text-3xl font-bold text-white font-mono">
                {formatTime(timeLeft)}
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Timer ini memastikan harga tidak berubah selama proses pembayaran
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6 p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Ringkasan Order
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={order.asset.image}
                  alt={order.asset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{order.asset.name}</p>
                  <p className="text-slate-400 text-sm">{order.asset.collection}</p>
                  <p className="text-green-400 font-bold">{formatCurrency(uniqueAmount)}</p>
                </div>
              </div>
            </div>

            {/* Payment Details Box */}
            <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-xl">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Detail Pembayaran - PENTING!
              </h4>

              {/* Unique Amount */}
              <div className="mb-6 p-3 sm:p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <h5 className="text-yellow-400 font-bold mb-2 text-sm sm:text-base">💰 Nominal Unik untuk Transfer</h5>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono break-all">{formatCurrency(uniqueAmount)}</span>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(uniqueAmount.toString(), 'amount')}
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 w-full sm:w-auto"
                  >
                    {copiedField === 'amount' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Salin
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  ⚠️ Transfer sesuai nominal unik ini agar pembayaranmu bisa diverifikasi lebih cepat dan akurat.
                </p>
              </div>

              {/* Transfer Code */}
              <div className="mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <h5 className="text-red-400 font-bold text-base sm:text-lg mb-2">📝 PENTING: Kode Berita Transfer</h5>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-lg sm:text-xl font-bold text-white font-mono bg-slate-900/50 px-3 py-2 rounded break-all">
                    {transferCode}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(transferCode, 'code')}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 w-full sm:w-auto"
                  >
                    {copiedField === 'code' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Salin
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-medium">
                  <strong>WAJIB:</strong> Masukkan kode <strong>{transferCode}</strong> di kolom Berita/Catatan/Keterangan saat transfer.
                </p>
              </div>

              {/* Account Details */}
              <div className="mb-4 p-3 sm:p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                <h5 className="text-white font-medium mb-3 text-sm sm:text-base">🏦 Detail Rekening Tujuan</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-slate-400">Metode:</span>
                    <span className="text-white font-medium">{selectedPaymentMethod}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-slate-400">Nama Penerima:</span>
                    <span className="text-white">{order.seller.name || "PUYOK Escrow"}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-slate-400">Nomor {selectedPaymentMethod}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">0812-3456-7890</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard("081234567890", 'account')}
                        className="h-6 w-6 p-0"
                      >
                        {copiedField === 'account' ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">Keamanan Escrow</span>
                </div>
                <p className="text-slate-300 text-xs">
                  Dana Anda diamankan oleh smart contract escrow. NFT akan otomatis dikirim setelah pembayaran terverifikasi.
                </p>
              </div>
            </div>

            {/* Upload Proof Section */}
            <div className="mb-6 p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
              <h5 className="text-white font-medium mb-3">📎 Upload Bukti Transfer (Opsional)</h5>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                className="w-full p-3 bg-slate-800 border border-slate-600 rounded text-white text-sm mb-3"
                disabled={!canUploadProof}
              />
              <p className="text-slate-400 text-xs">
                {!canUploadProof ?
                  "⏳ Upload akan tersedia dalam 2 menit setelah instruksi ditampilkan" :
                  "✅ Upload bukti transfer untuk mempercepat verifikasi"
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleUploadProof}
                disabled={!canUploadProof}
                className={`w-full h-12 font-bold ${
                  canUploadProof
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    : "bg-slate-600 cursor-not-allowed"
                }`}
              >
                {canUploadProof ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Saya Sudah Bayar, Lanjut Upload Bukti
                  </>
                ) : (
                  <>
                    <Timer className="w-5 h-5 mr-2" />
                    Menunggu Konfirmasi Transfer... ({Math.max(0, 120 - (900 - timeLeft))}s)
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setPaymentStep(2)}
                className="w-full border-slate-600 text-slate-400"
              >
                Ganti Metode Pembayaran
              </Button>

              <div className="text-center">
                <Link href="/bantuan/pembayaran" className="text-blue-400 hover:text-blue-300 text-sm">
                  <HelpCircle className="w-4 h-4 inline mr-1" />
                  Butuh bantuan pembayaran?
                </Link>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>

    <Dialog open={showPaymentModal} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-xl font-semibold">
            {paymentStep === 2 ? "Pilih Metode Pembayaran" : "Instruksi Pembayaran"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh]">
          {paymentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600">Pilih cara pembayaran yang paling mudah untuk Anda</p>
              </div>

              <div className="space-y-3">
                {order.paymentMethods.map((method, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className="w-full p-4 border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-lg transition-all bg-gray-50 hover:bg-gray-100 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {method === "DANA" && <span className="text-gray-700 text-lg">💳</span>}
                        {method === "OVO" && <span className="text-gray-700 text-lg">💳</span>}
                        {method === "GoPay" && <span className="text-gray-700 text-lg">💳</span>}
                        {method === "Bank Transfer" && <Building2 className="w-6 h-6 text-gray-700" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-lg">{method}</p>
                        <p className="text-sm text-gray-500">
                          {method === "Bank Transfer" ? "Transfer bank konvensional" : "E-wallet digital"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {paymentStep === 3 && selectedPaymentMethod && (
            <div className="space-y-6">
              {/* Timer */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Selesaikan pembayaran dalam</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 font-mono">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Waktu pembayaran terbatas untuk menjaga harga tetap
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  Ringkasan Pembelian
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={order.asset.image}
                    alt={order.asset.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{order.asset.name}</p>
                    <p className="text-gray-500 text-sm">{order.asset.collection}</p>
                    <p className="text-gray-900 font-bold">{formatCurrency(uniqueAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  Detail Transfer - Penting
                </h4>

                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-amber-800 font-semibold text-sm">Nominal Transfer</p>
                        <p className="text-xl font-bold text-gray-900 font-mono">{formatCurrency(uniqueAmount)}</p>
                        <p className="text-amber-700 text-xs mt-1">
                          Transfer sesuai nominal persis ini
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(uniqueAmount.toString(), 'amount')}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300"
                      >
                        {copiedField === 'amount' ? '✓ Tersalin' : 'Salin'}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-rose-800 font-semibold text-sm">Kode Berita Transfer</p>
                        <p className="text-lg font-bold text-gray-900 font-mono bg-white px-3 py-2 rounded border border-gray-200 mt-1">
                          {transferCode}
                        </p>
                        <p className="text-rose-700 text-xs mt-1">
                          Wajib diisi di kolom berita/catatan
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(transferCode, 'code')}
                        className="bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300"
                      >
                        {copiedField === 'code' ? '✓ Tersalin' : 'Salin'}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-900 font-semibold mb-3 text-sm">Detail Rekening Tujuan</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Metode:</span>
                        <span className="text-gray-900 font-medium">{selectedPaymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nomor:</span>
                        <span className="text-gray-900 font-mono">0812-3456-7890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama:</span>
                        <span className="text-gray-900 font-medium">PUYOK Escrow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleUploadProof}
                  disabled={!canUploadProof}
                  className={`w-full h-12 font-semibold transition-all ${
                    canUploadProof
                      ? "bg-gray-900 hover:bg-gray-800 text-white"
                      : "bg-gray-300 cursor-not-allowed text-gray-500"
                  }`}
                >
                  {canUploadProof ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Saya Sudah Transfer
                    </>
                  ) : (
                    <>
                      <Timer className="w-5 h-5 mr-2" />
                      Tunggu {Math.max(0, 60 - (900 - timeLeft))}s
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setPaymentStep(2)}
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  ← Ganti Metode Pembayaran
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

function SmartContractInfo({ order }: { order: OrderDetail }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Smart Contract & Blockchain Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Network:</span>
            <span className="text-white">{order.chainInfo.network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Contract Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono text-xs">{shortenAddress(order.chainInfo.contractAddress)}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(order.chainInfo.contractAddress)}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Escrow Address:</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono text-xs">{shortenAddress(order.escrowAddress)}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(order.escrowAddress)}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          {order.chainInfo.tokenId && (
            <div className="flex justify-between">
              <span className="text-slate-400">Token ID:</span>
              <span className="text-white font-mono">{order.chainInfo.tokenId}</span>
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Polygonscan
        </Button>

        {copied && (
          <p className="text-green-400 text-sm text-center">✅ Copied to clipboard!</p>
        )}
      </CardContent>
    </Card>
  )
}

function LiveMarketPulse() {
  const [currentActivity, setCurrentActivity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentActivity}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm"
      >
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-medium text-xs sm:text-sm">Baru saja terjual!</p>
              <p className="text-slate-400 text-xs truncate">
                @{liveActivities[currentActivity].username} {liveActivities[currentActivity].action} {liveActivities[currentActivity].assetName}
              </p>
              <p className="text-green-400 text-xs font-medium">
                {liveActivities[currentActivity].amount && formatCurrency(liveActivities[currentActivity].amount!)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function ReviewModal({ reviews, onClose }: { reviews: Review[]; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Ulasan Pembeli ({reviews.length})</DialogTitle>
          <DialogDescription className="text-slate-300">
            Feedback autentik dari pembeli yang telah bertransaksi
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-16 h-16 mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">Belum ada ulasan</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.buyerAvatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                      {review.buyerName?.[0] || review.buyerAddress.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {review.buyerName || shortenAddress(review.buyerAddress)}
                        </span>
                        {review.isVerified && (
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {review.isRecent && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Recent
                          </Badge>
                        )}
                      </div>
                      <span className="text-slate-400 text-sm">{formatDate(review.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{review.orderType}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">"{review.comment}"</p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function OrderDetailPage() {
  const params = useParams()
  const [showReviews, setShowReviews] = useState(false)
  const [order] = useState<OrderDetail>(sampleOrder)
  
  // Mock current user
  const currentUser = { address: "0x9999...1111" }

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
      {/* Sticky Header */}
      <StickyHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:space-y-0">
          {/* Mobile: Asset Visual First */}
          <div className="lg:hidden">
            <AssetVisualSection order={order} />
          </div>

          {/* Mobile: Buy Action (Prominent) */}
          <div className="lg:hidden">
            <BuyActionSection order={order} currentUser={currentUser} />
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Asset Visual (8 columns) */}
            <div className="lg:col-span-8">
              <AssetVisualSection order={order} />
            </div>

            {/* Right Column - Purchase & Details (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                <BuyActionSection order={order} currentUser={currentUser} />
                <SellerTrustSection seller={order.seller} onShowReviews={() => setShowReviews(true)} />
              </div>
            </div>
          </div>

          {/* Mobile & Tablet: Additional Details Below */}
          <div className="lg:hidden space-y-6">
            <SellerTrustSection seller={order.seller} onShowReviews={() => setShowReviews(true)} />
          </div>

          {/* All Devices: Secondary Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <PaymentBreakdownSection order={order} />
            <SmartContractInfo order={order} />
          </div>
        </div>
      </div>

      {/* Live Market Pulse */}
      <LiveMarketPulse />

      {/* Review Modal */}
      {showReviews && (
        <ReviewModal
          reviews={order.seller.reviews}
          onClose={() => setShowReviews(false)}
        />
      )}
    </div>
  )
}
