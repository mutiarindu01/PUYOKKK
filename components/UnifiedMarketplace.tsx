"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Wallet,
  Settings,
  X,
  ChevronRight,
  Search,
  Filter,
  Grid3x3,
  List,
  ImageIcon,
  Coins,
  Layers,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  Heart,
  Zap,
  Target,
  Building2,
  Smartphone,
  CreditCard,
  Save,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Sparkles,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

// Types
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
  category: string
  isHot?: boolean
  marketData?: {
    avgPrice: number
    avgSaleDays: number
    successRate: number
    viewsPerListing: number
  }
}

interface PaymentAccount {
  id: string
  type: "bank" | "ewallet"
  name: string
  accountName: string
  accountNumber: string
  logo: string
  isVerified: boolean
  isDefault: boolean
}

interface PriceRecommendation {
  min: number
  max: number
  optimal: number
  reasoning: string
  confidence: number
  estimatedSaleDays: number
  conversionRate: number
}

// Sample data
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
    marketData: {
      avgPrice: 1450000,
      avgSaleDays: 2.5,
      successRate: 85,
      viewsPerListing: 180
    }
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
    category: "Token"
  }
]

const paymentAccounts: PaymentAccount[] = [
  {
    id: "1",
    type: "bank",
    name: "BCA",
    accountName: "Rafly Rizky",
    accountNumber: "1234567890",
    logo: "🏦",
    isVerified: true,
    isDefault: true
  },
  {
    id: "2",
    type: "ewallet",
    name: "DANA",
    accountName: "0812-3456-7890",
    accountNumber: "0812-3456-7890",
    logo: "💳",
    isVerified: true,
    isDefault: false
  }
]

export default function UnifiedMarketplace() {
  // Main state
  const [activeModal, setActiveModal] = useState<"assets" | "create-listing" | "settings" | null>(null)
  
  // Assets modal state
  const [assetsSearchTerm, setAssetsSearchTerm] = useState("")
  const [assetsViewMode, setAssetsViewMode] = useState<"grid" | "list">("grid")
  const [filteredAssets, setFilteredAssets] = useState(sampleAssets)
  
  // Create listing state
  const [listingStep, setListingStep] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [listingPrice, setListingPrice] = useState("")
  const [listingDescription, setListingDescription] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"onchain" | "hybrid">("hybrid")
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const [priceRecommendation, setPriceRecommendation] = useState<PriceRecommendation | null>(null)
  const [priceConfidence, setPriceConfidence] = useState(0)

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const generatePriceRecommendation = (asset: Asset) => {
    if (!asset.marketData) return null

    const { avgPrice, avgSaleDays, successRate } = asset.marketData
    const variance = 0.15
    
    return {
      min: Math.round(avgPrice * (1 - variance)),
      max: Math.round(avgPrice * (1 + variance)),
      optimal: Math.round(avgPrice * 0.98),
      reasoning: `Berdasarkan ${asset.salesLastWeek} penjualan sejenis dalam 7 hari terakhir`,
      confidence: successRate,
      estimatedSaleDays: avgSaleDays,
      conversionRate: successRate
    }
  }

  const selectAssetForListing = (asset: Asset) => {
    setSelectedAsset(asset)
    setActiveModal("create-listing")
    setListingStep(2) // Skip asset selection since it's already selected
    
    const recommendation = generatePriceRecommendation(asset)
    setPriceRecommendation(recommendation)
    if (recommendation) {
      setListingPrice(recommendation.optimal.toString())
    }
  }

  const resetListingFlow = () => {
    setListingStep(1)
    setSelectedAsset(null)
    setListingPrice("")
    setListingDescription("")
    setPriceRecommendation(null)
    setPriceConfidence(0)
  }

  // Filter assets
  useEffect(() => {
    let filtered = sampleAssets
    
    if (assetsSearchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(assetsSearchTerm.toLowerCase()) ||
        asset.collection.toLowerCase().includes(assetsSearchTerm.toLowerCase())
      )
    }

    setFilteredAssets(filtered)
  }, [assetsSearchTerm])

  // Calculate price confidence
  useEffect(() => {
    if (listingPrice && priceRecommendation) {
      const priceValue = parseFloat(listingPrice)
      const { min, max, optimal } = priceRecommendation
      
      if (priceValue < min) {
        setPriceConfidence(Math.max(0, 30 - Math.abs(priceValue - min) / min * 100))
      } else if (priceValue > max) {
        setPriceConfidence(Math.max(0, 50 - Math.abs(priceValue - max) / max * 100))
      } else {
        const distanceFromOptimal = Math.abs(priceValue - optimal) / optimal
        setPriceConfidence(Math.max(60, 100 - distanceFromOptimal * 100))
      }
    }
  }, [listingPrice, priceRecommendation])

  return (
    <>
      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <Button
              onClick={() => setActiveModal("assets")}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              title="Aset Saya"
            >
              <Wallet className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setActiveModal("settings")}
              className="w-12 h-12 rounded-full bg-slate-600 hover:bg-slate-700 text-white shadow-lg"
              title="Pengaturan"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Create Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                resetListingFlow()
                setActiveModal("create-listing")
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-xl"
              title="Buat Listing"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Assets Modal */}
      <Dialog open={activeModal === "assets"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              🖼️ Aset Saya
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Pilih aset untuk dijual dengan bantuan rekomendasi cerdas
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 overflow-y-auto max-h-[70vh]">
            {/* Search & Filters */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Cari aset atau koleksi..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  value={assetsSearchTerm}
                  onChange={(e) => setAssetsSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center bg-slate-700 rounded-lg p-1">
                <Button
                  variant={assetsViewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setAssetsViewMode("grid")}
                  className={assetsViewMode === "grid" ? "bg-blue-600" : ""}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={assetsViewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setAssetsViewMode("list")}
                  className={assetsViewMode === "list" ? "bg-blue-600" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Smart Recommendation */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium mb-1">💡 Rekomendasi Cerdas</h3>
                  <p className="text-slate-300 text-sm">
                    Anda memiliki {sampleAssets.filter(a => a.isHot).length} aset yang sedang trending. 
                    Ini adalah waktu yang tepat untuk listing dengan harga optimal!
                  </p>
                </div>
              </div>
            </div>

            {/* Assets Grid */}
            <div className={`grid gap-4 ${
              assetsViewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="bg-slate-700/50 border-slate-600 overflow-hidden group hover:border-slate-500 transition-all">
                  <div className="relative">
                    <div className={`${assetsViewMode === "grid" ? "aspect-square" : "h-20 float-left mr-4 mt-4 ml-4"} relative overflow-hidden ${assetsViewMode === "grid" ? "" : "w-20 rounded-lg"}`}>
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                      {asset.isHot && (
                        <Badge className="absolute top-2 right-2 bg-red-500/90 text-white">
                          🔥 Hot
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-white">{asset.name}</h3>
                          <p className="text-sm text-slate-400">{asset.collection}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-green-400">
                            {formatCurrency(asset.value)}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => selectAssetForListing(asset)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            List
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Listing Modal */}
      <Dialog open={activeModal === "create-listing"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              🚀 Buat Listing yang Menarik!
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Harga optimal membantu asetmu cepat laku
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[
              { id: 1, title: "Pilih Aset", icon: ImageIcon },
              { id: 2, title: "Atur Harga", icon: DollarSign },
              { id: 3, title: "Pembayaran", icon: CreditCard },
              { id: 4, title: "Preview", icon: Eye }
            ].map((step, index) => {
              const isActive = step.id === listingStep
              const isCompleted = step.id < listingStep
              const Icon = step.icon
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isCompleted ? "bg-green-500 border-green-500 text-white" :
                      isActive ? "bg-blue-500 border-blue-500 text-white" :
                      "bg-slate-700 border-slate-600 text-slate-400"}
                  `}>
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? "bg-green-500" : "bg-slate-600"
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="overflow-y-auto max-h-[60vh] space-y-6">
            {/* Step 1: Select Asset */}
            {listingStep === 1 && (
              <div className="text-center py-8">
                <ImageIcon className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Pilih aset dari koleksi Anda
                </h3>
                <p className="text-slate-400 mb-6">
                  Buka galeri aset untuk memilih item yang ingin dijual
                </p>
                <Button 
                  onClick={() => setActiveModal("assets")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Buka Galeri Aset
                </Button>
              </div>
            )}

            {/* Step 2: Price Setting */}
            {listingStep === 2 && selectedAsset && (
              <div className="space-y-6">
                {/* Asset Summary */}
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedAsset.image}
                        alt={selectedAsset.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{selectedAsset.name}</h3>
                        <p className="text-slate-400">{selectedAsset.collection}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Intelligence */}
                {priceRecommendation && (
                  <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        Rekomendasi Harga Cerdas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                          <div className="text-sm text-slate-400 mb-1">Harga Pasar</div>
                          <div className="text-white font-semibold text-sm">
                            {formatCurrency(priceRecommendation.min)} - {formatCurrency(priceRecommendation.max)}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="text-sm text-green-400 mb-1">💸 Optimal</div>
                          <div className="text-white font-bold">
                            {formatCurrency(priceRecommendation.optimal)}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                          <div className="text-sm text-slate-400 mb-1">Estimasi</div>
                          <div className="text-white font-semibold">
                            ⏱️ {priceRecommendation.estimatedSaleDays} hari
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Price Input */}
                <div>
                  <Label className="text-white mb-2 block">Harga (IDR)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="number"
                      placeholder="0"
                      value={listingPrice}
                      onChange={(e) => setListingPrice(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white text-lg font-semibold"
                    />
                  </div>

                  {listingPrice && priceRecommendation && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Kemungkinan Cepat Laku</span>
                        <span className={`text-sm font-medium ${
                          priceConfidence >= 80 ? "text-green-400" :
                          priceConfidence >= 60 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {priceConfidence >= 80 ? "Tinggi" : priceConfidence >= 60 ? "Sedang" : "Rendah"} ({Math.round(priceConfidence)}%)
                        </span>
                      </div>
                      <Progress value={priceConfidence} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                {priceRecommendation && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setListingPrice(priceRecommendation.optimal.toString())}
                      className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Harga Optimal
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setListingPrice((priceRecommendation.optimal * 0.9).toString())}
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Quick Sale (-10%)
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {listingStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Metode Pembayaran</Label>
                  <div className="flex gap-4">
                    <div 
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "hybrid" 
                          ? "border-blue-500 bg-blue-500/10" 
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                      onClick={() => setPaymentMethod("hybrid")}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="font-medium text-white">Hybrid Payment</div>
                          <div className="text-sm text-slate-400">Recommended</div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "onchain" 
                          ? "border-purple-500 bg-purple-500/10" 
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                      onClick={() => setPaymentMethod("onchain")}
                    >
                      <div className="flex items-center gap-3">
                        <Coins className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="font-medium text-white">On-Chain</div>
                          <div className="text-sm text-slate-400">Crypto only</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === "hybrid" && (
                  <div>
                    <Label className="text-white mb-3 block">Akun Penerima</Label>
                    <div className="space-y-3">
                      {paymentAccounts.map((account) => (
                        <div
                          key={account.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedAccount === account.id
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-slate-600 hover:border-slate-500"
                          }`}
                          onClick={() => setSelectedAccount(account.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{account.logo}</div>
                            <div className="flex-1">
                              <div className="font-medium text-white">
                                {account.name} - {account.accountName}
                              </div>
                              <div className="text-sm text-slate-400">
                                •••• {account.accountNumber.slice(-4)}
                              </div>
                            </div>
                            {selectedAccount === account.id && (
                              <Check className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Preview */}
            {listingStep === 4 && selectedAsset && listingPrice && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-3">Preview Listing</h4>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={selectedAsset.image}
                        alt={selectedAsset.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-500/90 text-white">
                        BARU
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white">{selectedAsset.name}</h3>
                      <p className="text-sm text-slate-400">{selectedAsset.collection}</p>
                      <div className="text-xl font-bold text-green-400 mt-2">
                        {formatCurrency(parseFloat(listingPrice))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-green-400 font-medium">🛡️ PUYOK Escrow Protection</h4>
                      <p className="text-slate-300 text-sm">
                        Dana pembeli diamankan sampai NFT diterima. Transaksi Anda 100% aman!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              onClick={() => {
                if (listingStep > 1) setListingStep(listingStep - 1)
                else setActiveModal(null)
              }}
              className="border-slate-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {listingStep === 1 ? "Tutup" : "Sebelumnya"}
            </Button>

            <Button
              onClick={() => {
                if (listingStep < 4) {
                  setListingStep(listingStep + 1)
                } else {
                  // Publish listing
                  setActiveModal(null)
                  resetListingFlow()
                }
              }}
              disabled={
                (listingStep === 1 && !selectedAsset) ||
                (listingStep === 2 && !listingPrice) ||
                (listingStep === 3 && paymentMethod === "hybrid" && !selectedAccount)
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {listingStep === 4 ? "Publikasikan 🚀" : "Lanjutkan"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={activeModal === "settings"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              ⚙️ Pengaturan Akun
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Kelola profil dan preferensi akun Anda
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[70vh] space-y-6">
            {/* Profile Section */}
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">MR</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Memet Toping</h3>
                    <p className="text-slate-400">@memet_toping</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input 
                      defaultValue="memet@example.com"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Username</Label>
                    <Input 
                      defaultValue="memet_toping"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Notifikasi Email", desc: "Terima update via email", defaultChecked: true },
                  { title: "Two-Factor Auth", desc: "Keamanan ekstra", defaultChecked: false },
                  { title: "Public Profile", desc: "Profil dapat dilihat publik", defaultChecked: true },
                  { title: "Price Alerts", desc: "Notifikasi perubahan harga", defaultChecked: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Accounts */}
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Akun Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{account.logo}</span>
                      <div>
                        <div className="font-medium text-white">{account.name}</div>
                        <div className="text-sm text-slate-400">•••• {account.accountNumber.slice(-4)}</div>
                      </div>
                    </div>
                    {account.isDefault && (
                      <Badge className="bg-blue-500/20 text-blue-400">Default</Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full border-slate-600 text-slate-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Akun
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}