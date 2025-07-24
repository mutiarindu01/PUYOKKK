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
    volume: "Rp 2.1M",
    sparklineData: [45, 52, 48, 61, 55, 67, 69, 74, 78, 82]
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "/placeholder.svg?height=32&width=32&text=ETH",
    price: "Rp 45.000.000",
    change: "-1.5%",
    trend: "down" as const,
    volume: "Rp 1.8M",
    sparklineData: [67, 65, 62, 59, 55, 52, 48, 45, 43, 41]
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "/placeholder.svg?height=32&width=32&text=USDT",
    price: "Rp 15.500",
    change: "+0.2%",
    trend: "up" as const,
    volume: "Rp 5.2M",
    sparklineData: [15, 15.1, 15.05, 15.2, 15.18, 15.25, 15.3, 15.28, 15.35, 15.4]
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    icon: "/placeholder.svg?height=32&width=32&text=BNB",
    price: "Rp 6.000.000",
    change: "+0.8%",
    trend: "up" as const,
    volume: "Rp 980K",
    sparklineData: [58, 59, 61, 63, 65, 67, 66, 68, 70, 72]
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    icon: "/placeholder.svg?height=32&width=32&text=ADA",
    price: "Rp 7.500",
    change: "+5.2%",
    trend: "up" as const,
    volume: "Rp 1.2M",
    sparklineData: [6.8, 7.1, 7.3, 7.5, 7.8, 8.0, 7.9, 8.2, 8.1, 8.4]
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
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
          <div>
            <h3 className="text-white font-semibold text-sm">{token.name}</h3>
            <p className="text-gray-400 text-xs">{token.symbol}</p>
          </div>
        </div>
        <Badge variant={token.trend === "up" ? "default" : "destructive"} className="text-xs">
          {token.change}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-bold text-lg">{token.price}</span>
        <Sparkline data={token.sparklineData} trend={token.trend} />
      </div>
      
      <div className="text-gray-400 text-xs">
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
          <h3 className="text-white font-semibold text-lg truncate">{nft.name}</h3>
          {nft.verified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
        </div>
        <p className="text-gray-400 text-sm mb-4 truncate">{nft.collection}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Harga</p>
            <p className="text-white font-bold text-xl">{nft.price}</p>
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
    <div className="bg-[#0D1117] text-white font-['Inter'] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Jelajahi Marketplace
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              NFT Pilihan Minggu Ini
            </h2>
            <p className="text-gray-400">
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

        {/* Section 3: All Orders */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Semua Order
            </h2>
            <p className="text-gray-400">
              Jelajahi semua aset digital yang tersedia di marketplace
            </p>
          </div>
          
          {/* Control Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <Tabs value={activeFilter} onValueChange={setActiveFilter}>
              <TabsList className="bg-[#1F2937] border border-white/10">
                <TabsTrigger value="Semua" className="text-white data-[state=active]:bg-blue-600">
                  Semua
                </TabsTrigger>
                <TabsTrigger value="NFT" className="text-white data-[state=active]:bg-blue-600">
                  NFT
                </TabsTrigger>
                <TabsTrigger value="Token" className="text-white data-[state=active]:bg-blue-600">
                  Token
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-1 bg-[#1F2937] border border-white/10 rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Display Area */}
          <div className="bg-[#1F2937] border border-white/10 rounded-xl p-6">
            {viewMode === "list" ? (
              <div className="space-y-0">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between py-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={order.type === "Token" ? order.icon : order.image} 
                        alt={order.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{order.name}</span>
                          {order.verified && <Verified className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className="text-gray-400 text-sm">{order.symbol}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-bold">{order.price}</div>
                      {order.type === "Token" && order.change && (
                        <div className={`text-sm ${
                          order.change.startsWith("+") ? "text-green-400" : "text-red-400"
                        }`}>
                          {order.change}
                        </div>
                      )}
                    </div>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                  >
                    <FeaturedNFTCard nft={nft as any} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
