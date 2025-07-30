"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Eye,
  Users,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  CreditCard,
  Building2,
  Smartphone,
  Plus,
  Minus,
  RotateCcw,
  Save,
  Send,
  ImageIcon,
  Coins,
  Layers,
  ChevronDown,
  Calculator,
  HelpCircle,
  Share2,
  Twitter,
  MessageCircle,
  BookOpen
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

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
}

interface PriceRecommendation {
  min: number
  max: number
  optimal: number
  reasoning: string
  confidence: number
  estimatedSaleDays: number
  conversionRate: number
  marketPrice?: number
  floorPrice?: number
  hotDealThreshold?: number
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
    category: "Art",
    marketData: {
      avgPrice: 1450000,
      avgSaleDays: 2.5,
      successRate: 85,
      viewsPerListing: 180
    }
  }
]

const paymentAccounts: PaymentAccount[] = [
  {
    id: "1",
    type: "bank",
    name: "BCA",
    accountName: "Rafly Rizky",
    accountNumber: "1234567890",
    logo: "🏦"
  },
  {
    id: "2",
    type: "ewallet",
    name: "DANA",
    accountName: "0812-3456-7890",
    accountNumber: "0812-3456-7890",
    logo: "💳"
  }
]

export default function CreateListingPage() {
  // URL params
  const searchParams = useSearchParams()
  const preselectedAssetId = searchParams?.get("asset")

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Form state
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(
    preselectedAssetId ? sampleAssets.find(a => a.id === preselectedAssetId) || null : null
  )
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"onchain" | "hybrid">("hybrid")
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const [acceptOffers, setAcceptOffers] = useState(true)
  
  // Smart assistance state
  const [priceRecommendation, setPriceRecommendation] = useState<PriceRecommendation | null>(null)
  const [priceConfidence, setPriceConfidence] = useState(0)
  const [showPriceAssistant, setShowPriceAssistant] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [saleSpeedLevel, setSaleSpeedLevel] = useState<"low" | "medium" | "high">("medium")
  const [showHighValueWarning, setShowHighValueWarning] = useState(false)

  // Generate price recommendation
  const generatePriceRecommendation = useCallback((asset: Asset) => {
    if (!asset.marketData) return null

    const { avgPrice, avgSaleDays, successRate } = asset.marketData
    const variance = 0.15 // 15% variance

    const recommendation: PriceRecommendation = {
      min: Math.round(avgPrice * (1 - variance)),
      max: Math.round(avgPrice * (1 + variance)),
      optimal: Math.round(avgPrice * 0.98), // Slightly below average for faster sale
      reasoning: `Berdasarkan ${asset.salesLastWeek} penjualan sejenis dalam 7 hari terakhir`,
      confidence: successRate,
      estimatedSaleDays: avgSaleDays,
      conversionRate: successRate,
      marketPrice: asset.lastSalePrice || avgPrice,
      floorPrice: asset.floorPrice,
      hotDealThreshold: Math.round(avgPrice * 0.85) // 15% below market for hot deal
    }

    return recommendation
  }, [])

  // Calculate price confidence and sale speed
  const calculatePriceConfidence = useCallback((priceValue: number, recommendation: PriceRecommendation | null) => {
    if (!recommendation || !priceValue) return 0

    const { min, max, optimal, hotDealThreshold } = recommendation

    // Determine sale speed level
    if (priceValue <= (hotDealThreshold || min)) {
      setSaleSpeedLevel("high")
    } else if (priceValue <= optimal) {
      setSaleSpeedLevel("medium")
    } else {
      setSaleSpeedLevel("low")
    }

    if (priceValue < min * 0.7) {
      return Math.max(0, 20 - Math.abs(priceValue - min) / min * 100)
    } else if (priceValue > max * 1.3) {
      return Math.max(0, 30 - Math.abs(priceValue - max) / max * 100)
    } else if (priceValue >= min && priceValue <= max) {
      const distanceFromOptimal = Math.abs(priceValue - optimal) / optimal
      return Math.max(70, 100 - distanceFromOptimal * 50)
    } else {
      return 50
    }
  }, [])

  // Effects
  useEffect(() => {
    if (selectedAsset) {
      const recommendation = generatePriceRecommendation(selectedAsset)
      setPriceRecommendation(recommendation)
      if (recommendation && !price) {
        setPrice(recommendation.optimal.toString())
      }
    }
  }, [selectedAsset, generatePriceRecommendation, price])

  useEffect(() => {
    if (price && priceRecommendation) {
      const confidence = calculatePriceConfidence(parseFloat(price), priceRecommendation)
      setPriceConfidence(confidence)
    }
  }, [price, priceRecommendation, calculatePriceConfidence])

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStepStatus = (step: number) => {
    if (completedSteps.includes(step)) return "completed"
    if (step === currentStep) return "current"
    return "upcoming"
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1: return selectedAsset !== null
      case 2: return price && parseFloat(price) > 0
      case 3: return paymentMethod === "onchain" || selectedAccount
      case 4: return true
      default: return false
    }
  }

  const nextStep = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCompletedSteps(prev => [...prev, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400"
    if (confidence >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return "Tinggi"
    if (confidence >= 60) return "Sedang"
    return "Rendah"
  }

  const steps = [
    { id: 1, title: "Pilih Aset", icon: ImageIcon },
    { id: 2, title: "Atur Harga", icon: DollarSign },
    { id: 3, title: "Pembayaran", icon: CreditCard },
    { id: 4, title: "Preview", icon: Eye }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
                asChild
              >
                <Link href="/assets">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Link>
              </Button>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  Mari kita buat listing yang menarik! 🚀
                </h1>
                <p className="text-slate-400 text-sm">
                  Harga optimal membantu asetmu cepat laku
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDraft(true)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="border-b border-slate-700/30 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id)
              const Icon = step.icon
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-3 ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                      ${status === "completed" ? "bg-green-500 border-green-500 text-white" :
                        status === "current" ? "bg-blue-500 border-blue-500 text-white" :
                        "bg-slate-800 border-slate-600 text-slate-400"}
                    `}>
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="hidden sm:block">
                      <div className={`font-medium ${
                        status === "current" ? "text-white" : 
                        status === "completed" ? "text-green-400" :
                        "text-slate-400"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block flex-1 h-0.5 mx-4 ${
                      completedSteps.includes(step.id) ? "bg-green-500" : "bg-slate-700"
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Mobile step indicator */}
          <div className="sm:hidden mt-3 text-center">
            <span className="text-slate-400 text-sm">
              Langkah {currentStep} dari {steps.length}: {steps[currentStep - 1].title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Asset */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Pilih Aset untuk Dijual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAsset ? (
                    <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                      <img
                        src={selectedAsset.image}
                        alt={selectedAsset.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{selectedAsset.name}</h3>
                        <p className="text-slate-400">{selectedAsset.collection}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className="bg-blue-500/20 text-blue-400">
                            {selectedAsset.type}
                          </Badge>
                          <span className="text-green-400 font-medium">
                            {formatCurrency(selectedAsset.value)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAsset(null)}
                        className="border-slate-600 text-slate-400 hover:bg-slate-700"
                      >
                        Ganti
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Pilih aset dari koleksi Anda
                      </h3>
                      <p className="text-slate-400 mb-6">
                        Lihat semua aset yang tersedia di galeri
                      </p>
                      <Button asChild>
                        <Link href="/assets">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Buka Galeri Aset
                        </Link>
                      </Button>
                    </div>
                  )}

                  {selectedAsset && (selectedAsset.type === "ERC1155" || selectedAsset.type === "ERC20") && (
                    <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                      <Label className="text-white mb-2 block">Jumlah</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="border-slate-600"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 text-center bg-slate-800 border-slate-600 text-white"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                          className="border-slate-600"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="text-slate-400 text-sm">
                          dari {selectedAsset.balance?.toLocaleString()} tersedia
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Price Setting */}
          {currentStep === 2 && selectedAsset && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Asset Summary */}
              <Card className="bg-slate-800/50 border-slate-700">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Harga Pasar</div>
                        <div className="text-white font-semibold">
                          {formatCurrency(priceRecommendation.min)} - {formatCurrency(priceRecommendation.max)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-sm text-green-400 mb-1">💸 Harga Optimal</div>
                        <div className="text-white font-bold text-lg">
                          {formatCurrency(priceRecommendation.optimal)}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Estimasi Terjual</div>
                        <div className="text-white font-semibold">
                          ⏱️ {priceRecommendation.estimatedSaleDays} hari
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/30 rounded-lg">
                      <p className="text-slate-300 text-sm">
                        🎯 <strong>Tip:</strong> {priceRecommendation.reasoning}. 
                        Harga di range ini memiliki <strong>{priceRecommendation.conversionRate}%</strong> tingkat penyelesaian.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price Input */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Tentukan Harga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Harga (IDR)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="number"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="pl-10 bg-slate-800 border-slate-600 text-white text-lg font-semibold"
                      />
                    </div>
                  </div>

                  {/* Price Confidence Indicator */}
                  {price && priceRecommendation && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Kemungkinan Cepat Laku</span>
                        <span className={`text-sm font-medium ${getConfidenceColor(priceConfidence)}`}>
                          {getConfidenceLabel(priceConfidence)} ({Math.round(priceConfidence)}%)
                        </span>
                      </div>
                      <Progress 
                        value={priceConfidence} 
                        className="h-2"
                      />
                      
                      {priceConfidence < 60 && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                            <div className="text-sm">
                              <p className="text-yellow-400 font-medium">Peringatan Harga</p>
                              <p className="text-slate-300">
                                {parseFloat(price) < (priceRecommendation?.min || 0) ? 
                                  "Harga terlalu rendah - risiko kehilangan nilai" :
                                  "Harga tinggi - mungkin membutuhkan waktu lebih lama untuk terjual"
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Price Actions */}
                  {priceRecommendation && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPrice(priceRecommendation.optimal.toString())}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Gunakan Harga Optimal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPrice((priceRecommendation.optimal * 0.9).toString())}
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Quick Sale (-10%)
                      </Button>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <Label className="text-white mb-2 block">Deskripsi (Opsional)</Label>
                    <Textarea
                      placeholder="Tambahkan deskripsi menarik untuk meningkatkan penjualan..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                      rows={3}
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      💡 Tip: Deskripsi menarik dapat meningkatkan tingkat konversi hingga 40%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Konfigurasi Pembayaran</CardTitle>
                  <p className="text-slate-400">
                    Pilih akun penerimaan - dana akan masuk langsung ke sini ✅
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Toggle */}
                  <div className="space-y-4">
                    <Label className="text-white">Metode Pembayaran</Label>
                    <div className="flex gap-4">
                      <div 
                        className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "hybrid" 
                            ? "border-blue-500 bg-blue-500/10" 
                            : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
                        }`}
                        onClick={() => setPaymentMethod("hybrid")}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-medium text-white">Hybrid Payment</div>
                            <div className="text-sm text-slate-400">Bank & E-wallet (Recommended)</div>
                          </div>
                        </div>
                        {paymentMethod === "hybrid" && (
                          <div className="mt-2 p-2 bg-green-500/10 rounded text-xs text-green-400">
                            💡 15% lebih banyak penyelesaian dengan metode ini
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "onchain" 
                            ? "border-purple-500 bg-purple-500/10" 
                            : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
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

                  {/* Payment Account Selection */}
                  {paymentMethod === "hybrid" && (
                    <div className="space-y-4">
                      <Label className="text-white">Akun Penerima</Label>
                      <div className="space-y-3">
                        {paymentAccounts.map((account) => (
                          <div
                            key={account.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedAccount === account.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
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
                        
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-slate-400 hover:bg-slate-700"
                          asChild
                        >
                          <Link href="/settings?tab=payment">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Akun Pembayaran
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Fee Breakdown */}
                  {price && (
                    <div className="p-4 bg-slate-700/30 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Rincian Biaya</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Harga Jual</span>
                          <span className="text-white">{formatCurrency(parseFloat(price) || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Biaya Platform (1%)</span>
                          <span className="text-white">-{formatCurrency((parseFloat(price) || 0) * 0.01)}</span>
                        </div>
                        <div className="border-t border-slate-600 pt-2 flex justify-between font-medium">
                          <span className="text-white">Diterima</span>
                          <span className="text-green-400 font-bold">
                            {formatCurrency((parseFloat(price) || 0) * 0.99)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Preview */}
          {currentStep === 4 && selectedAsset && price && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Tinjau lagi - pastikan semuanya sudah benar sebelum publikasi 👀
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Listing Preview */}
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="font-medium text-white mb-3">Akan Terlihat Seperti Ini</h4>
                    
                    {/* Mock marketplace card */}
                    <div className="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden">
                      <div className="aspect-square relative">
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
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-xl font-bold text-green-400">
                            {formatCurrency(parseFloat(price))}
                          </div>
                          <div className="flex items-center text-slate-400 text-sm">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{selectedAsset.marketData?.viewsPerListing || 150}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Checklist */}
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="font-medium text-white mb-3">Final Checklist</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Aset: {selectedAsset.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Harga: {formatCurrency(parseFloat(price))}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">
                          Pembayaran: {paymentMethod === "onchain" ? "On-chain" : 
                            paymentAccounts.find(a => a.id === selectedAccount)?.name + " •••• " + 
                            paymentAccounts.find(a => a.id === selectedAccount)?.accountNumber.slice(-4)
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Biaya: Sudah termasuk</span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Booster */}
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

                  {/* Potential Stats */}
                  {selectedAsset.marketData && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-blue-400 font-medium mb-2">Statistik Potensial</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">👁️‍🗨️ Perkiraan viewer</div>
                          <div className="text-white font-medium">
                            {selectedAsset.marketData.viewsPerListing - 30}-{selectedAsset.marketData.viewsPerListing + 70} orang
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400">🛒 Tingkat konversi</div>
                          <div className="text-white font-medium">
                            {selectedAsset.marketData.successRate}% order sejenis terjual dalam {Math.ceil(selectedAsset.marketData.avgSaleDays)} hari
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-slate-600 text-slate-400 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>

          <div className="flex items-center gap-3">
            {currentStep === 4 ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={!canProceedToNextStep()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publikasikan Listing 🚀
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>🚀 Listing Akan Dipublikasikan!</DialogTitle>
                    <DialogDescription className="text-slate-300">
                      Pastikan semua informasi sudah benar. Setelah dipublikasi, listing akan muncul di marketplace.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div>📷 <strong>Aset:</strong> {selectedAsset?.name}</div>
                        <div>💰 <strong>Harga:</strong> {formatCurrency(parseFloat(price || "0"))}</div>
                        <div>📥 <strong>Diterima:</strong> {formatCurrency((parseFloat(price || "0")) * 0.99)}</div>
                        <div>🏦 <strong>Akun:</strong> {
                          paymentMethod === "onchain" ? "On-chain Wallet" :
                          paymentAccounts.find(a => a.id === selectedAccount)?.name + " •••• " + 
                          paymentAccounts.find(a => a.id === selectedAccount)?.accountNumber.slice(-4)
                        }</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 border-slate-600">
                        Batal
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        Ya, Publikasikan!
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceedToNextStep()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
