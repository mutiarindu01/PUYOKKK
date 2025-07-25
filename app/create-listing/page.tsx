"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ScrollReveal from "@/components/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft, 
  ArrowRight,
  Lightbulb, 
  TrendingUp, 
  Shield, 
  Eye, 
  Clock, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  Wallet,
  CreditCard,
  Star,
  Zap,
  Target,
  BarChart3,
  Users,
  Calendar
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Sample user assets data
const userAssets = [
  {
    id: "asset-001",
    type: "NFT",
    name: "Cool Cat #1234",
    image: "/placeholder.svg?height=200&width=200&text=Cool+Cat",
    collection: "Cool Cats",
    estimatedValue: "Rp 8.500.000",
    lastSold: "Rp 9.200.000",
    floorPrice: "Rp 7.800.000",
    rarity: "Rare",
    traits: 5
  },
  {
    id: "asset-002", 
    type: "NFT",
    name: "Bored Ape #5678",
    image: "/placeholder.svg?height=200&width=200&text=Bored+Ape",
    collection: "Bored Ape Yacht Club",
    estimatedValue: "Rp 15.000.000",
    lastSold: "Rp 16.500.000", 
    floorPrice: "Rp 14.200.000",
    rarity: "Epic",
    traits: 7
  },
  {
    id: "asset-003",
    type: "Token",
    name: "Ethereum",
    ticker: "ETH",
    balance: "2.5 ETH",
    currentPrice: "Rp 45.000.000",
    image: "/placeholder.svg?height=200&width=200&text=ETH",
    marketCap: "Rp 5.8T",
    volume24h: "15%"
  },
  {
    id: "asset-004",
    type: "Token", 
    name: "Tether",
    ticker: "USDT",
    balance: "5,000 USDT",
    currentPrice: "Rp 15.500",
    image: "/placeholder.svg?height=200&width=200&text=USDT",
    marketCap: "Rp 1.2T",
    volume24h: "8%"
  }
]

// Sample payment accounts
const paymentAccounts = [
  {
    id: "acc-001",
    type: "DANA",
    name: "DANA - Utama",
    number: "081234****567",
    verified: true,
    completionRate: 98.5
  },
  {
    id: "acc-002", 
    type: "GoPay",
    name: "GoPay - Bisnis",
    number: "087654****321",
    verified: true,
    completionRate: 96.2
  },
  {
    id: "acc-003",
    type: "Bank Transfer",
    name: "BCA - a.n. John Doe",
    number: "1234567890",
    verified: true,
    completionRate: 94.8
  },
  {
    id: "acc-004",
    type: "OVO",
    name: "OVO - Personal", 
    number: "089876****543",
    verified: false,
    completionRate: 92.1
  }
]

// Smart pricing data
const getPricingInsights = (asset: any) => {
  const insights = {
    marketPrice: "",
    recommendation: "",
    tips: [],
    confidence: 0
  }

  if (asset.type === "NFT") {
    insights.marketPrice = `Rp ${(parseInt(asset.estimatedValue.replace(/[^\d]/g, '')) * 1.05).toLocaleString('id-ID')}`
    insights.recommendation = "Berdasarkan penjualan terakhir dan floor price koleksi"
    insights.tips = [
      "💡 NFT dengan rarity 'Rare' di kisaran harga ini biasanya terjual dalam 48 jam",
      "💡 Listing pada hari Sabtu-Minggu memiliki tingkat penjualan 23% lebih tinggi",
      "💡 Harga 5-10% di atas floor price optimal untuk koleksi populer"
    ]
    insights.confidence = 85
  } else {
    insights.marketPrice = asset.currentPrice  
    insights.recommendation = "Harga pasar real-time dari exchange utama"
    insights.tips = [
      "💡 Token stabil seperti USDT memiliki margin harga terbatas",
      "💡 Pengguna yang menerima pembayaran via DANA memiliki tingkat penyelesaian 15% lebih tinggi",
      "💡 Volume trading tinggi menunjukkan likuiditas yang baik"
    ]
    insights.confidence = 95
  }

  return insights
}

// Platform fees calculation
const calculateFees = (price: number) => {
  const platformFee = price * 0.025 // 2.5%
  const networkFee = price * 0.005 // 0.5%
  const totalFees = platformFee + networkFee
  const netAmount = price - totalFees

  return {
    platformFee,
    networkFee, 
    totalFees,
    netAmount,
    feePercentage: ((totalFees / price) * 100).toFixed(1)
  }
}

interface StepProps {
  currentStep: number
  totalSteps: number
}

function StepIndicator({ currentStep, totalSteps }: StepProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1 <= currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  i + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function AssetSelectionStep({ 
  selectedAsset, 
  setSelectedAsset, 
  onNext 
}: { 
  selectedAsset: any, 
  setSelectedAsset: (asset: any) => void, 
  onNext: () => void 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Pilih Aset yang Ingin Dijual</h2>
        <p className="text-muted-foreground">Pilih dari koleksi aset digital Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userAssets.map((asset) => (
          <Card
            key={asset.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedAsset?.id === asset.id
                ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAsset(asset)}
          >
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {asset.type}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{asset.name}</h3>
              
              {asset.type === "NFT" ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{asset.collection}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estimasi Nilai:</span>
                    <span className="font-bold text-primary">{asset.estimatedValue}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">{asset.rarity}</Badge>
                    <Badge variant="outline" className="text-xs">{asset.traits} traits</Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Balance: {asset.balance}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Harga Saat Ini:</span>
                    <span className="font-bold text-primary">{asset.currentPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Vol 24h: {asset.volume24h}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onNext} 
          disabled={!selectedAsset}
          size="lg"
          className="gap-2"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function PricingStep({ 
  selectedAsset, 
  price, 
  setPrice, 
  quantity, 
  setQuantity,
  onNext, 
  onBack 
}: { 
  selectedAsset: any, 
  price: string, 
  setPrice: (price: string) => void,
  quantity: string,
  setQuantity: (quantity: string) => void,
  onNext: () => void, 
  onBack: () => void 
}) {
  const insights = getPricingInsights(selectedAsset)
  const numericPrice = parseInt(price.replace(/[^\d]/g, '')) || 0
  const fees = calculateFees(numericPrice)

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '')
    if (numericValue) {
      setPrice(`Rp ${parseInt(numericValue).toLocaleString('id-ID')}`)
    } else {
      setPrice('')
    }
  }

  const applyRecommendedPrice = () => {
    setPrice(insights.marketPrice)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Tentukan Harga & Kuantitas</h2>
        <p className="text-muted-foreground">Dapatkan rekomendasi harga cerdas dari data pasar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Asset Preview */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={selectedAsset.image} 
                  alt={selectedAsset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedAsset.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedAsset.type === "NFT" ? selectedAsset.collection : selectedAsset.ticker}
                  </p>
                </div>
              </div>

              {/* Smart Pricing Insights */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">
                        💡 Harga Pasar Saat Ini: {insights.marketPrice}
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{insights.recommendation}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-blue-600 border-blue-200"
                        onClick={applyRecommendedPrice}
                      >
                        Gunakan Harga Ini
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Smart Tips */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Tips Cerdas
                  </h4>
                  {insights.tips.map((tip, index) => (
                    <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">{tip}</p>
                    </div>
                  ))}
                </div>

                {/* Confidence Score */}
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800 dark:text-green-300">
                    Tingkat Akurasi Prediksi: {insights.confidence}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Pricing Form */}
        <div className="space-y-6">
          {/* Quantity (for tokens) */}
          {selectedAsset.type === "Token" && (
            <div>
              <Label htmlFor="quantity" className="text-lg font-semibold">Kuantitas</Label>
              <div className="mt-2">
                <Input
                  id="quantity"
                  placeholder="Masukkan jumlah token"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="text-lg h-12"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Tersedia: {selectedAsset.balance}
                </p>
              </div>
            </div>
          )}

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-lg font-semibold">Harga</Label>
            <div className="mt-2">
              <Input
                id="price"
                placeholder="Masukkan harga jual"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="text-lg h-12 font-bold"
              />
            </div>
          </div>

          {/* Fee Breakdown */}
          {numericPrice > 0 && (
            <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Transparansi Biaya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Harga Jual</span>
                  <span className="font-semibold">{price}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Biaya Platform (2.5%)</span>
                  <span>-Rp {fees.platformFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Biaya Network (0.5%)</span>
                  <span>-Rp {fees.networkFee.toLocaleString('id-ID')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Anda Terima</span>
                  <span className="text-green-600">Rp {fees.netAmount.toLocaleString('id-ID')}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Total biaya: {fees.feePercentage}% dari harga jual
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!price || (selectedAsset.type === "Token" && !quantity)}
          className="gap-2"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function PaymentStep({ 
  selectedAccount, 
  setSelectedAccount, 
  onNext, 
  onBack 
}: { 
  selectedAccount: any, 
  setSelectedAccount: (account: any) => void, 
  onNext: () => void, 
  onBack: () => void 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Pilih Akun Pembayaran</h2>
        <p className="text-muted-foreground">Pilih akun untuk menerima pembayaran dari pembeli</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {paymentAccounts.map((account) => (
          <Card
            key={account.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedAccount?.id === account.id
                ? 'ring-2 ring-primary shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAccount(account)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{account.name}</h3>
                      {account.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.number}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Tingkat Penyelesaian: {account.completionRate}%
                      </span>
                      {account.completionRate >= 95 && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Terpercaya
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant={account.type === "DANA" ? "default" : "outline"}>
                    {account.type}
                  </Badge>
                  {account.completionRate >= 95 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">Fast Track</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Account */}
        <Card className="border-dashed border-2 cursor-pointer hover:border-primary transition-colors">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">Tambah Akun Baru</h3>
              <p className="text-sm text-muted-foreground">Hubungkan metode pembayaran lainnya</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedAccount}
          className="gap-2"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function PreviewStep({ 
  selectedAsset, 
  price, 
  quantity, 
  selectedAccount, 
  onPublish, 
  onBack 
}: { 
  selectedAsset: any, 
  price: string, 
  quantity: string, 
  selectedAccount: any, 
  onPublish: () => void, 
  onBack: () => void 
}) {
  const numericPrice = parseInt(price.replace(/[^\d]/g, '')) || 0
  const fees = calculateFees(numericPrice)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Preview Listing Anda</h2>
        <p className="text-muted-foreground">Periksa kembali sebelum mempublikasikan ke marketplace</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Tampilan di Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* How it will appear in marketplace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Asset Preview */}
              <div>
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={selectedAsset.image} 
                    alt={selectedAsset.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {selectedAsset.type}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-sm">🔥 New</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2">{selectedAsset.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedAsset.type === "NFT" ? selectedAsset.collection : `${quantity} ${selectedAsset.ticker}`}
                </p>
              </div>

              {/* Pricing & Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-primary mb-2">{price}</h4>
                  {selectedAsset.type === "Token" && (
                    <p className="text-muted-foreground">Jumlah: {quantity} {selectedAsset.ticker}</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h5 className="font-semibold mb-3">Informasi Penjual</h5>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">crypto_trader88</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">4.8 (23 transaksi)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Metode Pembayaran</h5>
                  <Badge variant="outline" className="mb-2">{selectedAccount.type}</Badge>
                  <p className="text-sm text-muted-foreground">
                    Tingkat penyelesaian: {selectedAccount.completionRate}%
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-semibold mb-2">Estimasi Waktu Transaksi</h5>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Biasanya selesai dalam 24 jam</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ringkasan Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Aset:</span>
                  <span className="font-medium">{selectedAsset.name}</span>
                </div>
                {selectedAsset.type === "Token" && (
                  <div className="flex justify-between">
                    <span>Kuantitas:</span>
                    <span className="font-medium">{quantity} {selectedAsset.ticker}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Harga Jual:</span>
                  <span className="font-medium">{price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Akun Penerima:</span>
                  <span className="font-medium">{selectedAccount.name}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Biaya Platform:</span>
                  <span>Rp {fees.platformFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Biaya Network:</span>
                  <span>Rp {fees.networkFee.toLocaleString('id-ID')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Anda Terima:</span>
                  <span className="text-green-600">Rp {fees.netAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        <Button 
          onClick={onPublish} 
          size="lg"
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-5 h-5" />
          Publikasikan ke Marketplace
        </Button>
      </div>
    </div>
  )
}

export default function CreateListingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [selectedAccount, setSelectedAccount] = useState(null)

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = () => {
    toast({
      title: "Listing Berhasil Dipublikasikan!",
      description: "Aset Anda sekarang tersedia di marketplace",
    })
    
    // Redirect to dashboard or marketplace
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Dashboard
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-bold">Jual Aset Baru</h1>
              <p className="text-sm text-muted-foreground">Langkah {currentStep} dari {totalSteps}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <AssetSelectionStep
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 2 && (
            <PricingStep
              selectedAsset={selectedAsset}
              price={price}
              setPrice={setPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <PaymentStep
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 4 && (
            <PreviewStep
              selectedAsset={selectedAsset}
              price={price}
              quantity={quantity}
              selectedAccount={selectedAccount}
              onPublish={handlePublish}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </div>
  )
}
