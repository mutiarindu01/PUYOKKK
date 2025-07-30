"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Plus,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  Heart,
  Zap,
  Trophy,
  Flame,
  Star,
  CheckCircle,
  ImageIcon,
  Coins,
  Layers,
  ArrowRight,
  Info,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

// Asset types
interface Asset {
  id: string
  name: string
  collection: string
  type: "ERC20" | "ERC721" | "ERC1155"
  image: string
  balance?: number
  value: number
  lastSalePrice?: number
  floorPrice?: number
  salesLastWeek: number
  marketTrend: "up" | "down" | "stable"
  rarity?: "Common" | "Rare" | "Epic" | "Legendary"
  isHot?: boolean
  category: string
  bestSeller?: boolean
  recommendationTooltip?: string
  avgSaleDays?: number
  conversionRate?: number
}

// Sample asset data
const sampleAssets: Asset[] = [
  {
    id: "1",
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    type: "ERC721",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    value: 1500000,
    lastSalePrice: 1400000,
    floorPrice: 1200000,
    salesLastWeek: 3,
    marketTrend: "up",
    rarity: "Rare",
    isHot: true,
    category: "Art",
    bestSeller: true,
    recommendationTooltip: "NFT ini terjual 3x dalam seminggu",
    avgSaleDays: 2,
    conversionRate: 85
  },
  {
    id: "2",
    name: "PUYOK Token",
    collection: "PUYOK",
    type: "ERC20",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
    balance: 10000,
    value: 5000000,
    salesLastWeek: 15,
    marketTrend: "up",
    isHot: true,
    category: "Token",
    bestSeller: true,
    recommendationTooltip: "Token dengan volume tinggi, 15 transaksi minggu ini",
    avgSaleDays: 1,
    conversionRate: 92
  },
  {
    id: "3",
    name: "CryptoPunk #5678",
    collection: "CryptoPunks",
    type: "ERC721",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400",
    value: 2800000,
    lastSalePrice: 2500000,
    floorPrice: 2200000,
    salesLastWeek: 1,
    marketTrend: "stable",
    rarity: "Epic",
    category: "Collectibles",
    recommendationTooltip: "Harga stabil, koleksi prestisius",
    avgSaleDays: 5,
    conversionRate: 75
  },
  {
    id: "4",
    name: "Art Blocks #999",
    collection: "Art Blocks Curated",
    type: "ERC721",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400",
    value: 800000,
    lastSalePrice: 750000,
    floorPrice: 700000,
    salesLastWeek: 2,
    marketTrend: "up",
    rarity: "Rare",
    category: "Generative",
    recommendationTooltip: "Seni generatif populer, 2 terjual minggu ini",
    avgSaleDays: 3,
    conversionRate: 80
  },
  {
    id: "5",
    name: "Gaming NFT Pack",
    collection: "MetaGame",
    type: "ERC1155",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
    balance: 5,
    value: 300000,
    salesLastWeek: 8,
    marketTrend: "up",
    isHot: true,
    category: "Gaming",
    bestSeller: true,
    recommendationTooltip: "Gaming NFT sedang naik daun, 8 terjual minggu ini",
    avgSaleDays: 1.5,
    conversionRate: 90
  },
]

export default function AssetsPage() {
  const [assets, setAssets] = useState(sampleAssets)
  const [filteredAssets, setFilteredAssets] = useState(sampleAssets)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("value-high")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(false)

  // Filter and sort assets
  useEffect(() => {
    let filtered = assets

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.collection.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== "All") {
      filtered = filtered.filter(asset => asset.type === selectedType)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "value-high":
          return b.value - a.value
        case "value-low":
          return a.value - b.value
        case "hot":
          return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredAssets(filtered)
  }, [searchTerm, selectedType, sortBy, assets])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ERC20":
        return <Coins className="w-4 h-4" />
      case "ERC721":
        return <ImageIcon className="w-4 h-4" />
      case "ERC1155":
        return <Layers className="w-4 h-4" />
      default:
        return <ImageIcon className="w-4 h-4" />
    }
  }

  const getSmartBadge = (asset: Asset) => {
    if (asset.bestSeller) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
          ⭐ Best Seller
        </Badge>
      )
    }
    if (asset.salesLastWeek >= 5) {
      return (
        <Badge className="bg-red-500/90 text-white animate-pulse">
          🔥 Laris
        </Badge>
      )
    }
    if (asset.marketTrend === "up" && asset.salesLastWeek >= 2) {
      return (
        <Badge className="bg-green-500/90 text-white">
          📈 Trending
        </Badge>
      )
    }
    if (asset.rarity === "Legendary" || asset.rarity === "Epic") {
      return (
        <Badge className="bg-purple-500/90 text-white">
          ⭐ Rare
        </Badge>
      )
    }
    return null
  }

  const getSmartTooltip = (asset: Asset) => {
    const messages = []

    if (asset.recommendationTooltip) {
      messages.push(asset.recommendationTooltip)
    }

    if (asset.avgSaleDays) {
      messages.push(`⏱️ Rata-rata terjual dalam ${asset.avgSaleDays} hari`)
    }

    if (asset.conversionRate) {
      messages.push(`📊 ${asset.conversionRate}% tingkat konversi`)
    }

    return messages.join(" • ")
  }

  // Skeleton loader component
  const SkeletonCard = () => (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-700" />
      <CardContent className="p-4 space-y-2">
        <div className="h-4 bg-slate-700 rounded" />
        <div className="h-3 bg-slate-700 rounded w-2/3" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
      </CardContent>
    </Card>
  )

  // Simulate loading
  const handleRefresh = () => {
    setShowSkeletonLoader(true)
    setTimeout(() => {
      setShowSkeletonLoader(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Aset Saya</span>
          </div>

          {/* Title & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Aset Saya
              </h1>
              <p className="text-slate-400">
                Pilih aset untuk dijual dengan bantuan rekomendasi cerdas
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                asChild
              >
                <Link href="/marketplace">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Marketplace
                </Link>
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <Link href="/create-listing">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Listing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Stats Bar */}
      <div className="bg-slate-900/50 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{assets.length}</div>
              <div className="text-xs text-slate-400">Total Aset</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
              </div>
              <div className="text-xs text-slate-400">Nilai Portfolio</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {assets.filter(a => a.isHot).length}
              </div>
              <div className="text-xs text-slate-400">Aset Hot</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">
                {assets.reduce((sum, asset) => sum + asset.salesLastWeek, 0)}
              </div>
              <div className="text-xs text-slate-400">Penjualan Minggu Ini</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari nama aset atau koleksi..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Quick Filters */}
            <div className="flex gap-2">
              <Button
                variant={selectedType === "ERC20" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(selectedType === "ERC20" ? "All" : "ERC20")}
                className={selectedType === "ERC20" ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
              >
                <Coins className="w-4 h-4 mr-1" />
                ERC20
              </Button>
              <Button
                variant={selectedType === "ERC721" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(selectedType === "ERC721" ? "All" : "ERC721")}
                className={selectedType === "ERC721" ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                ERC721
              </Button>
              <Button
                variant={selectedType === "ERC1155" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(selectedType === "ERC1155" ? "All" : "ERC1155")}
                className={selectedType === "ERC1155" ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
              >
                <Layers className="w-4 h-4 mr-1" />
                ERC1155
              </Button>
            </div>

            {/* Type Filter Dropdown */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="All">Semua Aset</SelectItem>
                <SelectItem value="ERC20">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4" />
                    Token (ERC20)
                  </div>
                </SelectItem>
                <SelectItem value="ERC721">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    NFT 1/1 (ERC721)
                  </div>
                </SelectItem>
                <SelectItem value="ERC1155">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Editions (ERC1155)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="value-high">Nilai Tertinggi</SelectItem>
                <SelectItem value="value-low">Nilai Terendah</SelectItem>
                <SelectItem value="hot">Paling Hot</SelectItem>
                <SelectItem value="name">Nama A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={showSkeletonLoader}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              {showSkeletonLoader ? "Loading..." : "Refresh"}
            </Button>

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
          </div>
        </div>

        {/* Smart Recommendations */}
        {assets.filter(a => a.isHot).length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">💡 Rekomendasi Cerdas</h3>
                <p className="text-slate-300 text-sm">
                  Anda memiliki {assets.filter(a => a.isHot).length} aset yang sedang trending. 
                  Ini adalah waktu yang tepat untuk listing dengan harga optimal!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Asset Grid */}
        <AnimatePresence mode="wait">
          {showSkeletonLoader ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAssets.map((asset) => (
                <TooltipProvider key={asset.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer">
                          <div className="relative">
                            {/* Asset Image */}
                            <div className="aspect-square relative overflow-hidden">
                              <img
                                src={asset.image}
                                alt={asset.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Type Badge */}
                              <Badge className="absolute top-3 left-3 bg-slate-900/90 text-white">
                                {getTypeIcon(asset.type)}
                                <span className="ml-1">{asset.type}</span>
                              </Badge>
                              
                              {/* Smart Badge */}
                              {getSmartBadge(asset) && (
                                <div className="absolute top-3 right-3">
                                  {getSmartBadge(asset)}
                                </div>
                              )}

                              {/* Quick Action */}
                              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                    asChild
                                  >
                                    <Link href={`/create-listing?asset=${asset.id}`}>
                                      <Plus className="w-4 h-4 mr-1" />
                                      List
                                    </Link>
                                  </Button>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                        >
                                          <Info className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-sm max-w-xs">{getSmartTooltip(asset)}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>

                            {/* Asset Info */}
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div>
                                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                    {asset.name}
                                  </h3>
                                  <p className="text-sm text-slate-400 truncate">{asset.collection}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-lg font-bold text-green-400">
                                      {formatCurrency(asset.value)}
                                    </div>
                                    {asset.balance && (
                                      <div className="text-xs text-slate-400">
                                        Balance: {asset.balance.toLocaleString()}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {asset.marketTrend === "up" && (
                                    <div className="flex items-center text-green-400 text-sm">
                                      <TrendingUp className="w-4 h-4 mr-1" />
                                      <span>+{asset.salesLastWeek}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Market Insights */}
                                {(asset.lastSalePrice || asset.salesLastWeek > 0) && (
                                  <div className="pt-2 border-t border-slate-700/50">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                      {asset.lastSalePrice && (
                                        <span>
                                          Last: {formatCurrency(asset.lastSalePrice)}
                                        </span>
                                      )}
                                      {asset.salesLastWeek > 0 && (
                                        <span className="flex items-center">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {asset.salesLastWeek} sales/week
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-slate-800 border-slate-700 text-white max-w-xs"
                    >
                      <p className="text-sm">{getSmartTooltip(asset)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
          ) : (
            /* List View */
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Asset Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Asset Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{asset.name}</h3>
                          {getSmartBadge(asset)}
                        </div>
                        <p className="text-sm text-slate-400 truncate">{asset.collection}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            {getTypeIcon(asset.type)}
                            {asset.type}
                          </span>
                          {asset.salesLastWeek > 0 && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {asset.salesLastWeek} sales/week
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Value & Action */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-green-400 mb-2">
                          {formatCurrency(asset.value)}
                        </div>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          asChild
                        >
                          <Link href={`/create-listing?asset=${asset.id}`}>
                            <Plus className="w-4 h-4 mr-2" />
                            List
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Tidak ada aset ditemukan</h3>
            <p className="text-slate-400 mb-6">
              Coba sesuaikan filter atau kata kunci pencarian Anda
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setSelectedType("All")
            }}>
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
