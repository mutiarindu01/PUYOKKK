"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Grid3x3,
  List,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Heart,
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Star,
  Zap,
  Trophy,
  Flame,
  Sparkles,
  CheckCircle,
  X,
  ArrowUpDown,
  MoreHorizontal,
  ShoppingCart,
  Bookmark,
  Share2,
  ExternalLink,
  Palette,
  Music,
  Camera,
  Gamepad2,
  ImageIcon,
  Video,
  Code,
  Globe,
  BarChart3,
  LineChart,
  TrendingDown,
  Activity,
  Shield,
  Lock,
  UserCheck,
  AlertTriangle,
  MessageCircle,
  Bell,
  PlayCircle,
  Coffee,
  Rocket,
  Gavel,
  Timer,
  Layers,
  PieChart,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// NFT Data Type
interface NFT {
  id: string
  name: string
  collection: string
  creator: string
  creatorAvatar: string
  price: number
  currency: string
  image: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  category: string
  verified: boolean
  likes: number
  views: number
  isLive: boolean
  timeLeft?: string
  lastSale?: number
  floorPrice?: number
  volume24h?: number
  traits?: { trait_type: string; value: string }[]
}

// Order Book Types
interface OrderBookEntry {
  price: number
  quantity: number
  total: number
  percentage: number
}

interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  spread: number
  lastPrice: number
}

// Analytics Types
interface PricePoint {
  timestamp: number
  price: number
  volume: number
}

interface AnalyticsData {
  priceHistory: PricePoint[]
  volumeHistory: PricePoint[]
  marketCap: number
  totalSupply: number
  holders: number
  floorPrice: number
  avgPrice: number
  change24h: number
  volume24h: number
}

// Live Activity Types
interface LiveActivity {
  id: string
  type: "sale" | "bid" | "listing" | "transfer"
  nft: string
  user: string
  price?: number
  timestamp: number
  avatar?: string
}

// Sample NFT Data
const sampleNFTs: NFT[] = [
  {
    id: "1",
    name: "Golden Dragon Legendary",
    collection: "Mythical Creatures",
    creator: "@dragons_master",
    creatorAvatar: "",
    price: 125000000,
    currency: "IDR",
    image: "https://cdn.builder.io/api/v1/file/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Ff68d04f7302e4504a1b068fc78cb436e",
    rarity: "Legendary",
    category: "Digital Art",
    verified: true,
    likes: 234,
    views: 1205,
    isLive: true,
    timeLeft: "2h 15m",
    lastSale: 120000000,
    floorPrice: 118000000,
    volume24h: 350000000,
    traits: [
      { trait_type: "Background", value: "Cosmic" },
      { trait_type: "Element", value: "Fire" },
      { trait_type: "Rarity", value: "1/1" }
    ]
  },
  {
    id: "2",
    name: "Epic Phoenix Crown",
    collection: "Royal Collection",
    creator: "@phoenix_arts",
    creatorAvatar: "",
    price: 89500000,
    currency: "IDR",
    image: "https://cdn.builder.io/api/v1/file/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Fb5534d3c4897482fabbf004398457c71",
    rarity: "Epic",
    category: "Digital Art",
    verified: true,
    likes: 189,
    views: 892,
    isLive: false,
    lastSale: 85000000,
    floorPrice: 80000000,
    volume24h: 180000000,
    traits: [
      { trait_type: "Background", value: "Royal" },
      { trait_type: "Element", value: "Lightning" },
      { trait_type: "Rarity", value: "1/10" }
    ]
  },
  {
    id: "3",
    name: "Cyber Punk Warrior",
    collection: "Future Fighters",
    creator: "@cyber_studio",
    creatorAvatar: "",
    price: 45000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Rare",
    category: "Gaming",
    verified: false,
    likes: 156,
    views: 634,
    isLive: true,
    timeLeft: "1d 5h",
    lastSale: 42000000,
    floorPrice: 40000000,
    volume24h: 120000000,
  },
  {
    id: "4",
    name: "Mystic Forest Spirit",
    collection: "Nature Elementals",
    creator: "@forest_keeper",
    creatorAvatar: "",
    price: 32000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Rare",
    category: "Digital Art",
    verified: true,
    likes: 98,
    views: 445,
    isLive: false,
    lastSale: 30000000,
    floorPrice: 28000000,
    volume24h: 85000000,
  },
  {
    id: "5",
    name: "Quantum Music Box",
    collection: "Sound Waves",
    creator: "@music_verse",
    creatorAvatar: "",
    price: 18000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Common",
    category: "Music",
    verified: true,
    likes: 67,
    views: 289,
    isLive: true,
    timeLeft: "8h 30m",
    lastSale: 16000000,
    floorPrice: 15000000,
    volume24h: 45000000,
  },
  {
    id: "6",
    name: "Digital Dreamscape",
    collection: "Abstract Visions",
    creator: "@dream_artist",
    creatorAvatar: "",
    price: 75000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Epic",
    category: "Photography",
    verified: true,
    likes: 203,
    views: 967,
    isLive: false,
    lastSale: 72000000,
    floorPrice: 70000000,
    volume24h: 210000000,
  }
]

// Sample Order Book Data
const sampleOrderBook: OrderBook = {
  bids: [
    { price: 125000000, quantity: 3, total: 375000000, percentage: 100 },
    { price: 124000000, quantity: 5, total: 620000000, percentage: 85 },
    { price: 123000000, quantity: 2, total: 246000000, percentage: 70 },
    { price: 122000000, quantity: 8, total: 976000000, percentage: 55 },
    { price: 121000000, quantity: 4, total: 484000000, percentage: 40 },
    { price: 120000000, quantity: 6, total: 720000000, percentage: 25 },
    { price: 119000000, quantity: 3, total: 357000000, percentage: 15 },
  ],
  asks: [
    { price: 126000000, quantity: 2, total: 252000000, percentage: 20 },
    { price: 127000000, quantity: 4, total: 508000000, percentage: 35 },
    { price: 128000000, quantity: 3, total: 384000000, percentage: 50 },
    { price: 129000000, quantity: 6, total: 774000000, percentage: 65 },
    { price: 130000000, quantity: 5, total: 650000000, percentage: 80 },
    { price: 131000000, quantity: 7, total: 917000000, percentage: 95 },
    { price: 132000000, quantity: 2, total: 264000000, percentage: 100 },
  ],
  spread: 1000000,
  lastPrice: 125500000
}

// Sample Analytics Data
const sampleAnalytics: AnalyticsData = {
  priceHistory: Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    price: 125000000 + Math.random() * 20000000 - 10000000,
    volume: Math.random() * 1000000000
  })),
  volumeHistory: Array.from({ length: 7 }, (_, i) => ({
    timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
    price: 0,
    volume: Math.random() * 5000000000
  })),
  marketCap: 15600000000,
  totalSupply: 10000,
  holders: 2847,
  floorPrice: 115000000,
  avgPrice: 125000000,
  change24h: 5.7,
  volume24h: 2300000000
}

// Sample Live Activities
const sampleActivities: LiveActivity[] = [
  { id: "1", type: "sale", nft: "Golden Dragon #1", user: "@crypto_whale", price: 125000000, timestamp: Date.now() - 2 * 60 * 1000, avatar: "" },
  { id: "2", type: "bid", nft: "Epic Phoenix #23", user: "@nft_collector", price: 89000000, timestamp: Date.now() - 5 * 60 * 1000, avatar: "" },
  { id: "3", type: "listing", nft: "Cyber Warrior #456", user: "@gaming_pro", price: 45000000, timestamp: Date.now() - 8 * 60 * 1000, avatar: "" },
  { id: "4", type: "transfer", nft: "Mystic Spirit #789", user: "@forest_lover", timestamp: Date.now() - 12 * 60 * 1000, avatar: "" },
  { id: "5", type: "sale", nft: "Digital Dream #12", user: "@art_enthusiast", price: 75000000, timestamp: Date.now() - 15 * 60 * 1000, avatar: "" },
]

// Categories with icons
const categories = [
  { id: "all", name: "Semua", icon: Globe, count: 1247 },
  { id: "digital-art", name: "Digital Art", icon: Palette, count: 456 },
  { id: "gaming", name: "Gaming", icon: Gamepad2, count: 234 },
  { id: "music", name: "Music", icon: Music, count: 189 },
  { id: "photography", name: "Photography", icon: Camera, count: 167 },
  { id: "video", name: "Video", icon: Video, count: 123 },
  { id: "code", name: "Code", icon: Code, count: 78 },
]

// Filter options
const rarityOptions = ["Common", "Rare", "Epic", "Legendary"]
const statusOptions = ["For Sale", "Live Auction", "Recently Sold", "Not for Sale"]
const priceRanges = [
  { label: "Under 10M IDR", min: 0, max: 10000000 },
  { label: "10M - 50M IDR", min: 10000000, max: 50000000 },
  { label: "50M - 100M IDR", min: 50000000, max: 100000000 },
  { label: "Over 100M IDR", min: 100000000, max: 1000000000 },
]

export default function MarketplacePage() {
  // Add scrollbar hiding styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  // State Management
  const [activeTab, setActiveTab] = useState<"nfts" | "tokens" | "collections">("nfts")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [gridSize, setGridSize] = useState<"compact" | "comfortable" | "spacious">("comfortable")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000000])
  const [selectedRarity, setSelectedRarity] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [filteredNFTs, setFilteredNFTs] = useState(sampleNFTs)
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showOrderBook, setShowOrderBook] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showLiveActivity, setShowLiveActivity] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [isPlayingLive, setIsPlayingLive] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<NFT[]>([])
  const [aiSearchSuggestions, setAiSearchSuggestions] = useState<string[]>([])
  const [showAiFeatures, setShowAiFeatures] = useState(false)
  const [aiAnalysisResults, setAiAnalysisResults] = useState<string>("")

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale": return <ShoppingCart className="w-4 h-4 text-green-400" />
      case "bid": return <Gavel className="w-4 h-4 text-blue-400" />
      case "listing": return <Tag className="w-4 h-4 text-yellow-400" />
      case "transfer": return <ArrowUpDown className="w-4 h-4 text-purple-400" />
      default: return <Activity className="w-4 h-4 text-slate-400" />
    }
  }

  // AI-Powered Features
  const generateAiRecommendations = () => {
    // Simulate AI recommendation algorithm
    const userInterests = favorites.length > 0 ? sampleNFTs.filter(nft => favorites.includes(nft.id)) : []
    const recommended = sampleNFTs
      .filter(nft => !favorites.includes(nft.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    setAiRecommendations(recommended)
  }

  const generateSearchSuggestions = (query: string) => {
    if (query.length < 2) {
      setAiSearchSuggestions([])
      return
    }

    const suggestions = [
      `${query} - trending`,
      `${query} - by verified artists`,
      `${query} - under 50M IDR`,
      `${query} - rare items`,
      `similar to ${query}`
    ]
    setAiSearchSuggestions(suggestions)
  }

  const performAiAnalysis = () => {
    const analysis = `
AI Market Analysis:
• Current trend: Gaming NFTs showing 23% growth
• Optimal price range: 45M-125M IDR
• Best selling time: Weekends 7-9 PM
• Similar collections performing 15% above average
• Recommendation: Consider listing during peak hours
    `.trim()
    setAiAnalysisResults(analysis)
  }

  // Toggle favorite
  const toggleFavorite = (nftId: string) => {
    setFavorites(prev => 
      prev.includes(nftId) 
        ? prev.filter(id => id !== nftId)
        : [...prev, nftId]
    )
  }

  // Filter NFTs based on criteria
  useEffect(() => {
    let filtered = sampleNFTs.filter(nft => {
      // Search filter
      if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !nft.collection.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !nft.creator.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategory !== "all") {
        const categoryMap: { [key: string]: string } = {
          "digital-art": "Digital Art",
          "gaming": "Gaming",
          "music": "Music",
          "photography": "Photography",
          "video": "Video",
          "code": "Code"
        }
        if (nft.category !== categoryMap[selectedCategory]) return false
      }

      // Price filter
      if (nft.price < priceRange[0] || nft.price > priceRange[1]) return false

      // Rarity filter
      if (selectedRarity.length > 0 && !selectedRarity.includes(nft.rarity)) return false

      // Status filter
      if (selectedStatus.length > 0) {
        if (selectedStatus.includes("For Sale") && !nft.isLive) return false
        if (selectedStatus.includes("Live Auction") && !nft.isLive) return false
        // Add more status logic as needed
      }

      // Verified filter
      if (verifiedOnly && !nft.verified) return false

      return true
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "likes": return b.likes - a.likes
        case "recent": return new Date().getTime() - new Date().getTime() // Mock recent
        default: return 0
      }
    })

    setFilteredNFTs(filtered)
  }, [searchTerm, selectedCategory, priceRange, selectedRarity, selectedStatus, verifiedOnly, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Marketplace Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Marketplace</span>
          </div>

          {/* Title & Stats */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="text-center md:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                NFT Marketplace
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Discover, collect, and trade extraordinary NFTs
              </p>
            </div>

            {/* Mobile-Optimized Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:flex lg:items-center lg:justify-end">
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">1.2K</div>
                <div className="text-xs text-slate-400">Items</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">89</div>
                <div className="text-xs text-slate-400">Collections</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">2.3K</div>
                <div className="text-xs text-slate-400">Owners</div>
              </div>
            </div>
          </div>

          {/* AI-Enhanced Search Bar */}
          <div className="relative w-full lg:max-w-2xl">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <Input
              placeholder="Search NFTs, collections... (AI-powered)"
              className="pl-10 sm:pl-12 pr-12 sm:pr-16 py-2.5 sm:py-3 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-xl text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                generateSearchSuggestions(e.target.value)
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setShowAiFeatures(!showAiFeatures)}
            >
              <Sparkles className="w-4 h-4" />
            </Button>

            {/* AI Search Suggestions */}
            {aiSearchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                {aiSearchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion)
                      setAiSearchSuggestions([])
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white first:rounded-t-lg last:rounded-b-lg"
                  >
                    <Sparkles className="w-3 h-3 inline mr-2 text-purple-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Marketplace Tabs */}
      <div className="border-b border-slate-700/30 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("nfts")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "nfts"
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>NFTs</span>
                <span className="hidden sm:inline text-xs bg-slate-700 px-2 py-0.5 rounded-full">1.2K</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("tokens")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "tokens"
                  ? "border-green-500 text-green-400 bg-green-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Tokens</span>
                <span className="hidden sm:inline text-xs bg-slate-700 px-2 py-0.5 rounded-full">89</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "collections"
                  ? "border-purple-500 text-purple-400 bg-purple-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Collections</span>
                <span className="hidden sm:inline text-xs bg-slate-700 px-2 py-0.5 rounded-full">156</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Order Book & Analytics Dashboard */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile-First Dashboard Controls */}
          <div className="mb-6">
            {/* Mobile: Horizontal scroll with indicators */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
              <Button
                variant={showOrderBook ? "default" : "outline"}
                onClick={() => setShowOrderBook(!showOrderBook)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showOrderBook ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Order Book</span>
                <span className="sm:hidden">Orders</span>
              </Button>
              <Button
                variant={showAnalytics ? "default" : "outline"}
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showAnalytics ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <LineChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </Button>
              <Button
                variant={showLiveActivity ? "default" : "outline"}
                onClick={() => setShowLiveActivity(!showLiveActivity)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showLiveActivity ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Live Activity</span>
                <span className="sm:hidden">Live</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPlayingLive(!isPlayingLive)}
                className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm"
                size="sm"
              >
                {isPlayingLive ? (
                  <>
                    <Coffee className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Pause Live</span>
                    <span className="sm:hidden">Pause</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Play Live</span>
                    <span className="sm:hidden">Play</span>
                  </>
                )}
              </Button>
            </div>

            {/* Mobile indicators */}
            <div className="flex justify-center gap-1 mt-2 md:hidden">
              <div className={`w-2 h-1 rounded-full ${showOrderBook ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${showAnalytics ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${showLiveActivity ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${isPlayingLive ? 'bg-green-500' : 'bg-slate-600'}`}></div>
            </div>
          </div>

          {/* Dashboard Content */}
          <AnimatePresence>
            {(showOrderBook || showAnalytics || showLiveActivity) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 mb-6"
              >
                {/* Order Book */}
                {showOrderBook && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4"
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Order Book</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-green-500/50 text-green-400">
                              Spread: {formatPrice(sampleOrderBook.spread)}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Asks (Sell Orders) */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                              <span>Price (IDR)</span>
                              <span>Quantity</span>
                              <span>Total (IDR)</span>
                            </div>
                            <div className="space-y-1">
                              {sampleOrderBook.asks.slice().reverse().map((ask, index) => (
                                <div key={index} className="relative">
                                  <div
                                    className="absolute inset-0 bg-red-500/10 rounded"
                                    style={{ width: `${ask.percentage}%` }}
                                  />
                                  <div className="relative flex items-center justify-between text-xs py-1 px-2">
                                    <span className="text-red-400 font-mono">
                                      {(ask.price / 1000000).toFixed(1)}M
                                    </span>
                                    <span className="text-slate-300">{ask.quantity}</span>
                                    <span className="text-slate-400">
                                      {(ask.total / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Current Price */}
                          <div className="text-center py-2 border-y border-slate-700">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleOrderBook.lastPrice)}
                            </div>
                            <div className="text-xs text-slate-400">Last Price</div>
                          </div>

                          {/* Bids (Buy Orders) */}
                          <div>
                            <div className="space-y-1">
                              {sampleOrderBook.bids.map((bid, index) => (
                                <div key={index} className="relative">
                                  <div
                                    className="absolute inset-0 bg-green-500/10 rounded"
                                    style={{ width: `${bid.percentage}%` }}
                                  />
                                  <div className="relative flex items-center justify-between text-xs py-1 px-2">
                                    <span className="text-green-400 font-mono">
                                      {(bid.price / 1000000).toFixed(1)}M
                                    </span>
                                    <span className="text-slate-300">{bid.quantity}</span>
                                    <span className="text-slate-400">
                                      {(bid.total / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Analytics */}
                {showAnalytics && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={showOrderBook && showLiveActivity ? "lg:col-span-4" : showOrderBook || showLiveActivity ? "lg:col-span-8" : "lg:col-span-12"}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Market Analytics</h3>
                          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                            <SelectTrigger className="w-20 bg-slate-700 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="1h">1H</SelectItem>
                              <SelectItem value="24h">24H</SelectItem>
                              <SelectItem value="7d">7D</SelectItem>
                              <SelectItem value="30d">30D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleAnalytics.floorPrice)}
                            </div>
                            <div className="text-xs text-slate-400">Floor Price</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleAnalytics.volume24h)}
                            </div>
                            <div className="text-xs text-slate-400">24h Volume</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-green-400">
                              +{sampleAnalytics.change24h}%
                            </div>
                            <div className="text-xs text-slate-400">24h Change</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatNumber(sampleAnalytics.holders)}
                            </div>
                            <div className="text-xs text-slate-400">Holders</div>
                          </div>
                        </div>

                        {/* Price Chart Placeholder */}
                        <div className="h-32 bg-slate-700/20 rounded-lg flex items-center justify-center border border-slate-700/50">
                          <div className="text-center">
                            <PieChart className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <div className="text-sm text-slate-400">Price Chart</div>
                            <div className="text-xs text-slate-500">Real-time data visualization</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Live Activity */}
                {showLiveActivity && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={showOrderBook && showAnalytics ? "lg:col-span-4" : showOrderBook || showAnalytics ? "lg:col-span-8" : "lg:col-span-12"}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Live Activity</h3>
                          <div className="flex items-center gap-2">
                            {isPlayingLive && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                              Live
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {sampleActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                              <div className="flex-shrink-0">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate">
                                  {activity.nft}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <span>{activity.user}</span>
                                  <span>•</span>
                                  <span>{formatTimeAgo(activity.timestamp)}</span>
                                </div>
                              </div>
                              {activity.price && (
                                <div className="text-right">
                                  <div className="text-sm font-bold text-white">
                                    {formatPrice(activity.price)}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Trust & Security Indicators */}
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <h4 className="text-sm font-medium text-white mb-3">Security Status</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              <Shield className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">SSL Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Lock className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <UserCheck className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">KYC Verified</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <AlertTriangle className="w-3 h-3 text-yellow-400" />
                              <span className="text-slate-400">Risk Monitored</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile-Optimized Interactive Features Bar */}
          <div className="py-3 sm:py-4 border-t border-slate-700/50">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:gap-3">
              <Button variant="outline" size="sm" className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm px-2 sm:px-3">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Price Alerts</span>
                <span className="sm:hidden">Alerts</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm px-2 sm:px-3">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Community Chat</span>
                <span className="sm:hidden">Chat</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm px-2 sm:px-3">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Trending</span>
                <span className="sm:hidden">Hot</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm px-2 sm:px-3">
                <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Auctions Ending Soon</span>
                <span className="sm:hidden">Ending</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-xs sm:text-sm px-2 sm:px-3"
                onClick={() => {
                  setShowAiFeatures(!showAiFeatures)
                  generateAiRecommendations()
                  performAiAnalysis()
                }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>

          {/* AI Features Panel */}
          <AnimatePresence>
            {showAiFeatures && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* AI Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      AI Recommendations
                    </h3>
                    <div className="space-y-3">
                      {aiRecommendations.length > 0 ? aiRecommendations.map((nft) => (
                        <div key={nft.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                          <img src={nft.image} alt={nft.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{nft.name}</div>
                            <div className="text-xs text-slate-400">{formatPrice(nft.price)}</div>
                          </div>
                          <div className="text-xs text-purple-400">92% match</div>
                        </div>
                      )) : (
                        <div className="text-center py-6 text-slate-400">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Like some NFTs to get personalized recommendations</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Market Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      Market Analysis
                    </h3>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {aiAnalysisResults || "Analyzing market trends..."}
                      </pre>
                    </div>
                  </div>

                  {/* AI Trading Assistant */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-green-400" />
                      Trading Assistant
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-green-500">
                        <div className="text-sm font-medium text-green-400">Buy Signal</div>
                        <div className="text-xs text-slate-400">Gaming NFTs showing strong momentum</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-yellow-500">
                        <div className="text-sm font-medium text-yellow-400">Hold Signal</div>
                        <div className="text-xs text-slate-400">Art collections in consolidation phase</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
                        <div className="text-sm font-medium text-blue-400">Watch Signal</div>
                        <div className="text-xs text-slate-400">Music NFTs gaining popularity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Content */}
        {activeTab === "nfts" && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-slate-800/50 border-slate-700 sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange([0, 200000000])
                      setSelectedRarity([])
                      setSelectedStatus([])
                      setVerifiedOnly(false)
                      setSearchTerm("")
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${ 
                              selectedCategory === category.id
                                ? "bg-blue-600/20 border border-blue-500/50 text-blue-400"
                                : "bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="bg-slate-600 text-slate-300 text-xs">
                              {category.count}
                            </Badge>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={200000000}
                        step={1000000}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {priceRanges.map((range, index) => (
                          <button
                            key={index}
                            onClick={() => setPriceRange([range.min, range.max])}
                            className="text-left p-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/30 rounded transition-colors"
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rarity */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Rarity</h4>
                    <div className="space-y-2">
                      {rarityOptions.map((rarity) => (
                        <div key={rarity} className="flex items-center space-x-2">
                          <Checkbox
                            id={rarity}
                            checked={selectedRarity.includes(rarity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRarity([...selectedRarity, rarity])
                              } else {
                                setSelectedRarity(selectedRarity.filter(r => r !== rarity))
                              }
                            }}
                          />
                          <label
                            htmlFor={rarity}
                            className="text-sm text-slate-300 cursor-pointer flex items-center gap-2"
                          >
                            {rarity === "Legendary" && <Sparkles className="w-4 h-4 text-yellow-400" />}
                            {rarity === "Epic" && <Flame className="w-4 h-4 text-purple-400" />}
                            {rarity === "Rare" && <Star className="w-4 h-4 text-blue-400" />}
                            {rarity === "Common" && <CheckCircle className="w-4 h-4 text-slate-400" />}
                            {rarity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Status</h4>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={selectedStatus.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStatus([...selectedStatus, status])
                              } else {
                                setSelectedStatus(selectedStatus.filter(s => s !== status))
                              }
                            }}
                          />
                          <label
                            htmlFor={status}
                            className="text-sm text-slate-300 cursor-pointer"
                          >
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm text-slate-300 cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Verified Creators Only
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Results Count */}
                <span className="text-sm text-slate-400">
                  {filteredNFTs.length} of {sampleNFTs.length} items
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Grid Size */}
                {viewMode === "grid" && (
                  <Select value={gridSize} onValueChange={setGridSize}>
                    <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* NFT Grid/List */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`grid gap-6 ${
                    gridSize === "compact" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" :
                    gridSize === "comfortable" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" :
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {filteredNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="relative">
                          {/* NFT Image */}
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={nft.image}
                              alt={nft.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Live Badge */}
                            {nft.isLive && (
                              <Badge className="absolute top-3 left-3 bg-red-500/90 text-white animate-pulse">
                                🔴 LIVE
                              </Badge>
                            )}
                            
                            {/* Rarity Badge */}
                            <Badge 
                              className={`absolute top-3 right-3 ${
                                nft.rarity === "Legendary" ? "bg-yellow-500/90 text-black" :
                                nft.rarity === "Epic" ? "bg-purple-500/90 text-white" :
                                nft.rarity === "Rare" ? "bg-blue-500/90 text-white" :
                                "bg-slate-500/90 text-white"
                              }`}
                            >
                              {nft.rarity}
                            </Badge>

                            {/* Quick Actions */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                                onClick={() => toggleFavorite(nft.id)}
                              >
                                <Heart className={`w-4 h-4 ${favorites.includes(nft.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Bottom Quick Actions */}
                            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Buy Now
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                                >
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  Bid
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <CardContent className="p-4">
                            {/* Collection & Verified */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">{nft.collection}</span>
                              {nft.verified && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                            </div>

                            {/* NFT Name */}
                            <h3 className="font-semibold text-white mb-2 truncate">
                              {nft.name}
                            </h3>

                            {/* Creator */}
                            <div className="flex items-center gap-2 mb-3">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={nft.creatorAvatar} />
                                <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600">
                                  {nft.creator.slice(1, 3).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-400">{nft.creator}</span>
                            </div>

                            {/* Price & Stats */}
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="text-lg font-bold text-white">
                                  {formatPrice(nft.price)}
                                </div>
                                {nft.lastSale && (
                                  <div className="text-xs text-slate-400">
                                    Last: {formatPrice(nft.lastSale)}
                                  </div>
                                )}
                              </div>
                              {nft.timeLeft && (
                                <div className="text-right">
                                  <div className="text-sm text-orange-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {nft.timeLeft}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Engagement Stats */}
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {formatNumber(nft.likes)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {formatNumber(nft.views)}
                                </span>
                              </div>
                              {nft.volume24h && (
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {formatPrice(nft.volume24h)}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {filteredNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-slate-600 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                              <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-full object-cover"
                              />
                              {nft.isLive && (
                                <Badge className="absolute top-1 left-1 bg-red-500/90 text-white text-xs animate-pulse">
                                  LIVE
                                </Badge>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-white truncate">{nft.name}</h3>
                                    {nft.verified && (
                                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    )}
                                    <Badge 
                                      className={`text-xs ${
                                        nft.rarity === "Legendary" ? "bg-yellow-500/20 text-yellow-400" :
                                        nft.rarity === "Epic" ? "bg-purple-500/20 text-purple-400" :
                                        nft.rarity === "Rare" ? "bg-blue-500/20 text-blue-400" :
                                        "bg-slate-500/20 text-slate-400"
                                      }`}
                                    >
                                      {nft.rarity}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-slate-400">{nft.collection}</span>
                                    <span className="text-slate-500">•</span>
                                    <span className="text-sm text-slate-400">{nft.creator}</span>
                                  </div>

                                  <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <Heart className="w-3 h-3" />
                                      {formatNumber(nft.likes)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      {formatNumber(nft.views)}
                                    </span>
                                    {nft.volume24h && (
                                      <span className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        {formatPrice(nft.volume24h)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right ml-4">
                                  <div className="text-lg font-bold text-white mb-1">
                                    {formatPrice(nft.price)}
                                  </div>
                                  {nft.timeLeft && (
                                    <div className="text-sm text-orange-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {nft.timeLeft}
                                    </div>
                                  )}
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                      Buy
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                                      Bid
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More NFTs"}
              </Button>
            </div>
          </div>
        </div>
        )}

        {/* Tokens Tab Content */}
        {activeTab === "tokens" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Token Marketplace</h3>
              <p className="text-slate-400 mb-6">Trade tokens with advanced order books and real-time analytics</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Coming Soon
              </Button>
            </div>
          </div>
        )}

        {/* Collections Tab Content */}
        {activeTab === "collections" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Globe className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">NFT Collections</h3>
              <p className="text-slate-400 mb-6">Browse and discover amazing NFT collections</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Coming Soon
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
