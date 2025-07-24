"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Eye,
  Star,
  Verified,
  User,
  ArrowRight,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatRupiah } from "@/lib/currency"
import PaymentMethods, { PaymentMethodsDetailed } from "./PaymentMethods"
import TokenPriceChart, { DetailedTokenChart } from "./TokenPriceChart"
import OrderBook from "./OrderBook"

// Enhanced data for sophisticated marketplace
const trendingTokens = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "/placeholder.svg?height=32&width=32&text=BTC",
    price: "Rp 850.000.000",
    change: "+2.1%",
    trend: "up" as const,
    volume: "Rp 2.100.000",
    high24h: "Rp 870.000.000",
    low24h: "Rp 820.000.000",
    sparklineData: [820000000, 835000000, 825000000, 845000000, 840000000, 855000000, 860000000, 865000000, 855000000, 850000000],
    topSeller: {
      username: "crypto_master",
      avatar: "/placeholder.svg?height=24&width=24",
      verified: true,
      completedTrades: 156,
      successRate: 98.5
    },
    paymentMethods: ["dana", "gopay", "ovo", "bank"],
    totalOrders: 23
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/placeholder.svg?height=32&width=32&text=ETH",
    price: "Rp 45.000.000",
    change: "-1.5%",
    trend: "down" as const,
    volume: "Rp 1.800.000",
    high24h: "Rp 47.000.000",
    low24h: "Rp 44.000.000",
    sparklineData: [47000000, 46500000, 46000000, 45500000, 45200000, 45000000, 44800000, 44500000, 44200000, 45000000],
    topSeller: {
      username: "eth_trader",
      avatar: "/placeholder.svg?height=24&width=24",
      verified: true,
      completedTrades: 89,
      successRate: 97.2
    },
    paymentMethods: ["dana", "gopay", "bank"],
    totalOrders: 18
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "/placeholder.svg?height=32&width=32&text=USDT",
    price: "Rp 15.500",
    change: "+0.2%",
    trend: "up" as const,
    volume: "Rp 5.200.000",
    high24h: "Rp 15.600",
    low24h: "Rp 15.400",
    sparklineData: [15400, 15420, 15410, 15450, 15460, 15480, 15490, 15470, 15500, 15500],
    topSeller: {
      username: "stable_king",
      avatar: "/placeholder.svg?height=24&width=24",
      verified: false,
      completedTrades: 245,
      successRate: 99.1
    },
    paymentMethods: ["dana", "gopay", "ovo", "shopeepay"],
    totalOrders: 67
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    icon: "/placeholder.svg?height=32&width=32&text=BNB",
    price: "Rp 6.000.000",
    change: "+0.8%",
    trend: "up" as const,
    volume: "Rp 980.000",
    high24h: "Rp 6.100.000",
    low24h: "Rp 5.900.000",
    sparklineData: [5900000, 5920000, 5950000, 5980000, 6000000, 6020000, 6010000, 6030000, 6020000, 6000000],
    topSeller: {
      username: "bnb_holder",
      avatar: "/placeholder.svg?height=24&width=24",
      verified: true,
      completedTrades: 34,
      successRate: 96.8
    },
    paymentMethods: ["dana", "gopay"],
    totalOrders: 12
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    icon: "/placeholder.svg?height=32&width=32&text=ADA",
    price: "Rp 7.500",
    change: "+5.2%",
    trend: "up" as const,
    volume: "Rp 1.200.000",
    high24h: "Rp 8.000",
    low24h: "Rp 7.100",
    sparklineData: [7100, 7200, 7300, 7400, 7500, 7600, 7550, 7650, 7600, 7500],
    topSeller: {
      username: "ada_fan",
      avatar: "/placeholder.svg?height=24&width=24",
      verified: false,
      completedTrades: 67,
      successRate: 95.5
    },
    paymentMethods: ["dana", "ovo", "bank"],
    totalOrders: 8
  }
]

const featuredNFTs = [
  {
    id: "bape-1234",
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    image: "/placeholder.svg?height=300&width=300&text=Bored+Ape",
    price: "Rp 125.000.000",
    rarity: "Legendary",
    verified: true,
    views: "2.1k",
    likes: 89
  },
  {
    id: "punk-5678",
    name: "CryptoPunk #5678",
    collection: "CryptoPunks",
    image: "/placeholder.svg?height=300&width=300&text=CryptoPunk",
    price: "Rp 450.000.000",
    rarity: "Ultra Rare",
    verified: true,
    views: "5.7k",
    likes: 156
  },
  {
    id: "azuki-9876",
    name: "Azuki #9876",
    collection: "Azuki",
    image: "/placeholder.svg?height=300&width=300&text=Azuki",
    price: "Rp 85.000.000",
    rarity: "Rare",
    verified: true,
    views: "1.3k",
    likes: 67
  }
]

const allOrders = [
  ...trendingTokens.map(token => ({ ...token, type: "Token" as const })),
  ...featuredNFTs.map(nft => ({ ...nft, type: "NFT" as const, symbol: nft.collection }))
]

// Sophisticated Sparkline Component
function Sparkline({ data, trend }: { data: number[], trend: "up" | "down" }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" className="overflow-visible">
      <path
        d={`M ${data.map((value, index) => {
          const x = (index / (data.length - 1)) * 60
          const y = 24 - ((value - min) / range) * 24
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}`}
        stroke={trend === "up" ? "#10B981" : "#EF4444"}
        strokeWidth="1.5"
        fill="none"
        className="drop-shadow-sm"
      />
      <defs>
        <linearGradient id={`gradient-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trend === "up" ? "#10B981" : "#EF4444"} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={trend === "up" ? "#10B981" : "#EF4444"} stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// Token Card Component
function TokenCard({ token }: { token: typeof trendingTokens[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, borderColor: "#3B82F6" }}
      className="min-w-[280px] bg-[#1F2937] border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
          <div>
            <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{token.name}</h3>
            <p className="text-gray-400 text-xs font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{token.symbol}</p>
          </div>
        </div>
        <Badge variant={token.trend === "up" ? "default" : "destructive"} className="text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
          {token.change}
        </Badge>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{token.price}</span>
        <Sparkline data={token.sparklineData} trend={token.trend} />
      </div>

      <div className="text-gray-400 text-xs font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
        Volume 24h: {token.volume}
      </div>
    </motion.div>
  )
}

// Featured NFT Card Component
function FeaturedNFTCard({ nft }: { nft: typeof featuredNFTs[0] }) {
  const router = useRouter()
  
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "#3B82F6" }}
      className="bg-[#1F2937] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
      onClick={() => router.push(`/marketplace/${nft.id}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-white text-xs">{nft.views}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-white text-xs">{nft.likes}</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="bg-purple-600/90 text-white text-xs">
            {nft.rarity}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white font-semibold text-lg truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.name}</h3>
          {nft.verified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
        </div>
        <p className="text-gray-300 text-sm mb-4 truncate font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.collection}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Harga</p>
            <p className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.price}</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/marketplace/${nft.id}`)
            }}
          >
            Lihat Detail
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function SophisticatedMarketplace() {
  const [activeFilter, setActiveFilter] = useState("NFT")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [tokenScrollPosition, setTokenScrollPosition] = useState(0)
  const [nftScrollPosition, setNftScrollPosition] = useState(0)
  const tokenCarouselRef = useRef<HTMLDivElement>(null)
  const nftCarouselRef = useRef<HTMLDivElement>(null)

  const filteredOrders = allOrders.filter(order => {
    const matchesFilter = activeFilter === "Semua" || order.type === activeFilter
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const scrollTokenCarousel = (direction: "left" | "right") => {
    if (tokenCarouselRef.current) {
      const scrollAmount = 300
      const newPosition = direction === "left"
        ? tokenScrollPosition - scrollAmount
        : tokenScrollPosition + scrollAmount

      tokenCarouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth"
      })
      setTokenScrollPosition(newPosition)
    }
  }

  const scrollNftCarousel = (direction: "left" | "right") => {
    if (nftCarouselRef.current) {
      const scrollAmount = 350
      const newPosition = direction === "left"
        ? nftScrollPosition - scrollAmount
        : nftScrollPosition + scrollAmount

      nftCarouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth"
      })
      setNftScrollPosition(newPosition)
    }
  }
  
  return (
    <div className="bg-[#0D1117] text-white py-20" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Jelajahi Marketplace
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Temukan aset digital terbaik dari kreator Indonesia dengan transaksi yang aman dan mudah
          </p>
        </motion.div>

        {/* Section 1: Trending Tokens Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Token yang Sedang Tren
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollTokenCarousel("left")}
                className="border-white/20 text-white hover:bg-white/10 hover:border-blue-500/50 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollTokenCarousel("right")}
                className="border-white/20 text-white hover:bg-white/10 hover:border-blue-500/50 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={tokenCarouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {trendingTokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </motion.section>

        {/* Section 2: Featured NFTs Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20 relative"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              NFT Pilihan Minggu Ini
            </h2>
            <p className="text-gray-300 text-base font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
              Koleksi NFT terpilih dengan kualitas dan nilai investasi terbaik
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollNftCarousel("left")}
              className="w-12 h-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 hover:border-blue-500/50 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollNftCarousel("right")}
              className="w-12 h-12 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 hover:border-blue-500/50 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* NFT Carousel */}
          <div
            ref={nftCarouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredNFTs.map((nft) => (
              <div key={nft.id} className="flex-none w-80">
                <FeaturedNFTCard nft={nft} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: All Orders with Refined Controls */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Semua Order
            </h2>
            <p className="text-gray-300 text-base font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
              Jelajahi semua aset digital yang tersedia di marketplace
            </p>
          </div>

          {/* Enhanced Control Bar */}
          <div className="flex items-center gap-4 mb-8 bg-[#1F2937] border border-white/10 rounded-xl p-4">
            {/* Filter Area */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Button
                size="sm"
                onClick={() => setActiveFilter("NFT")}
                className={`whitespace-nowrap transition-all ${
                  activeFilter === "NFT"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-transparent border border-white/20 text-gray-300 hover:bg-white/10 hover:border-blue-500/50"
                }`}
              >
                NFT
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveFilter("Token")}
                className={`whitespace-nowrap transition-all ${
                  activeFilter === "Token"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-transparent border border-white/20 text-gray-300 hover:bg-white/10 hover:border-blue-500/50"
                }`}
              >
                Token
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0D1117] border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 bg-[#0D1117] border border-white/10 rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={`transition-all ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={`transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Enhanced Display Area */}
          <div className="bg-[#1F2937] border border-white/10 rounded-xl p-6">
            {filteredOrders.length > 0 ? (
              viewMode === "list" ? (
                <div className="space-y-0">
                  {filteredOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 hover:border-blue-500/20 transition-all duration-200 rounded-lg px-4 -mx-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={order.type === "Token" ? order.icon : order.image}
                            alt={order.name}
                            className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-blue-500/30 transition-all"
                          />
                          {order.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                              <Verified className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {order.name}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{order.symbol}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>{order.price}</div>
                        {order.type === "Token" && order.change && (
                          <div className={`text-sm font-medium ${
                            order.change.startsWith("+") ? "text-green-400" : "text-red-400"
                          }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {order.change}
                          </div>
                        )}
                        {order.type === "NFT" && (
                          <div className="flex items-center gap-1 text-gray-400 text-sm font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <Eye className="w-3 h-3" />
                            {order.views}
                          </div>
                        )}
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/25 transition-all">
                        Beli
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredOrders.filter(order => order.type === "NFT").map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <div className="bg-[#0D1117] border border-white/10 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <Eye className="w-3 h-3 text-white" />
                            <span className="text-white text-xs">{nft.views}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-white font-semibold text-sm truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.name}</h3>
                            {nft.verified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                          </div>
                          <p className="text-gray-300 text-xs mb-3 truncate font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.collection}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-white font-bold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{nft.price}</div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Beli
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">Tidak ada hasil ditemukan</div>
                <div className="text-gray-500 text-sm">Coba ubah filter atau kata kunci pencarian</div>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
