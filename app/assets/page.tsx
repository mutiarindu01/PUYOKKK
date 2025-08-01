"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Package,
  Star,
  Share2,
  Heart,
  Download
} from "lucide-react"

// Sample assets data
const assetsData = {
  nfts: [
    {
      id: "NFT-001",
      name: "Indonesian Heritage #001",
      description: "Beautiful traditional Indonesian art piece",
      price: "Rp 15.000.000",
      originalPrice: "Rp 12.000.000",
      category: "Art",
      status: "listed",
      views: 342,
      likes: 28,
      dateCreated: "10 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      rarity: "Rare"
    },
    {
      id: "NFT-002",
      name: "Bali Sunset #25",
      description: "Stunning Bali sunset landscape NFT",
      price: "Rp 8.750.000",
      originalPrice: "Rp 8.000.000",
      category: "Photography",
      status: "sold",
      views: 156,
      likes: 42,
      dateCreated: "8 Juli 2024",
      soldDate: "13 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      rarity: "Common"
    },
    {
      id: "NFT-003",
      name: "Jakarta Street Art #12",
      description: "Urban street art from Jakarta",
      price: "Rp 12.300.000",
      originalPrice: "Rp 10.500.000",
      category: "Street Art",
      status: "draft",
      views: 0,
      likes: 0,
      dateCreated: "15 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      rarity: "Epic"
    }
  ],
  tokens: [
    {
      id: "TOKEN-001",
      name: "USDT",
      symbol: "USDT",
      amount: "1,000",
      valueIDR: "Rp 15.500.000",
      valueUSD: "$1,000",
      change24h: "+0.1%",
      isPositive: true,
      icon: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    },
    {
      id: "TOKEN-002",
      name: "Ethereum",
      symbol: "ETH",
      amount: "2.5",
      valueIDR: "Rp 95.000.000",
      valueUSD: "$6,150",
      change24h: "+3.2%",
      isPositive: true,
      icon: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    },
    {
      id: "TOKEN-003",
      name: "BNB",
      symbol: "BNB",
      amount: "15.8",
      valueIDR: "Rp 75.600.000",
      valueUSD: "$4,890",
      change24h: "-1.8%",
      isPositive: false,
      icon: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    }
  ]
}

function NFTCard({ nft, viewMode }: { nft: any; viewMode: 'grid' | 'list' }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'listed': return 'bg-green-500/20 text-green-400'
      case 'sold': return 'bg-blue-500/20 text-blue-400'
      case 'draft': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400'
      case 'Rare': return 'text-blue-400'
      case 'Epic': return 'text-purple-400'
      case 'Legendary': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <img 
            src={nft.image} 
            alt={nft.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold">{nft.name}</h3>
                <p className="text-slate-400 text-sm">{nft.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getStatusColor(nft.status)}`}>
                    {nft.status}
                  </Badge>
                  <span className={`text-xs ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-white font-bold">{nft.price}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {nft.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {nft.likes}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
              <Edit className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                <DropdownMenuItem className="text-slate-300 hover:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/30 rounded-xl overflow-hidden hover:bg-slate-800/50 transition-all duration-300 group"
    >
      <div className="aspect-square relative">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`text-xs ${getStatusColor(nft.status)}`}>
            {nft.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 bg-black/50 rounded ${getRarityColor(nft.rarity)}`}>
            {nft.rarity}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold mb-1">{nft.name}</h3>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-bold">{nft.price}</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {nft.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {nft.likes}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-slate-300 hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  )
}

function TokenCard({ token }: { token: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <img 
          src={token.icon} 
          alt={token.symbol}
          className="w-16 h-16 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg">{token.name}</h3>
              <p className="text-slate-400 text-sm">{token.symbol}</p>
              <p className="text-slate-300 font-mono">{token.amount} {token.symbol}</p>
            </div>
            
            <div className="text-right">
              <p className="text-white font-bold text-lg">{token.valueIDR}</p>
              <p className="text-slate-400 text-sm">{token.valueUSD}</p>
              <p className={`text-sm font-medium ${token.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {token.change24h}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Sell
          </Button>
          <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
            Transfer
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("nfts")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const totalNFTs = assetsData.nfts.length
  const totalTokens = assetsData.tokens.length
  const totalValue = assetsData.tokens.reduce((sum, token) => {
    return sum + parseInt(token.valueIDR.replace(/[^\d]/g, ''))
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aset Saya
              </h1>
              <p className="text-slate-400 mt-1">Kelola NFT dan Token Anda</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari aset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 w-80"
              />
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Aset
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total NFTs</p>
                  <p className="text-3xl font-bold text-white">{totalNFTs}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Token Holdings</p>
                  <p className="text-3xl font-bold text-white">{totalTokens}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Portfolio Value</p>
                  <p className="text-3xl font-bold text-white">
                    Rp {totalValue.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Tabs */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Portfolio</CardTitle>
              {activeTab === 'nfts' && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className="border-slate-600"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className="border-slate-600"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="nfts" className="data-[state=active]:bg-purple-600">
                  NFTs ({totalNFTs})
                </TabsTrigger>
                <TabsTrigger value="tokens" className="data-[state=active]:bg-blue-600">
                  Tokens ({totalTokens})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="nfts" className="mt-6">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {assetsData.nfts.map((nft, index) => (
                    <NFTCard key={nft.id} nft={nft} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tokens" className="space-y-4 mt-6">
                {assetsData.tokens.map((token, index) => (
                  <TokenCard key={token.id} token={token} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
