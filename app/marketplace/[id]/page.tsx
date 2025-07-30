"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Star,
  Shield,
  Clock,
  TrendingUp,
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
  Copy
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
    description?: string
    traits?: { trait_type: string; value: string }[]
  }
  seller: {
    id: string
    address: string
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
  }
  price: number
  platformFee: number
  total: number
  paymentMethod: string
  paymentAccountName?: string
  paymentAccountNumber?: string
  availableStock: number
  totalStock: number
  expiresAt: string
  marketPrice: number
  createdAt: string
  status: "active" | "sold" | "expired"
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
}

// Sample data
const sampleOrder: OrderDetail = {
  id: "order-123",
  asset: {
    id: "asset-456",
    name: "Bored Ape #1234",
    collection: "Bored Ape Yacht Club",
    type: "ERC721",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    description: "A rare Bored Ape from the original collection with unique traits including golden fur and laser eyes.",
    traits: [
      { trait_type: "Background", value: "Orange" },
      { trait_type: "Fur", value: "Golden" },
      { trait_type: "Eyes", value: "Laser Eyes" },
      { trait_type: "Mouth", value: "Bored" }
    ]
  },
  seller: {
    id: "seller-789",
    address: "0x1234...5678",
    name: "CryptoArt_Master",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    isVerified: true,
    completedTrades: 847,
    rating: 4.8,
    completionRate: 98,
    avgResponseTime: 12,
    lastActive: "2 minutes ago",
    joinDate: "2021-03-15",
    reviews: [
      {
        id: "review-1",
        buyerAddress: "0xabc...def",
        buyerName: "NFTCollector99",
        rating: 5,
        comment: "Transaksi sangat lancar, penjual responsif dan aset diterima sesuai deskripsi. Highly recommended!",
        date: "2024-01-15",
        orderType: "NFT Purchase",
        isVerified: true
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
      },
      {
        id: "review-3",
        buyerAddress: "0x555...666",
        buyerName: "CryptoWhale",
        rating: 4,
        comment: "Good seller, transaction went smoothly. NFT as described.",
        date: "2024-01-05",
        orderType: "NFT Purchase",
        isVerified: true
      }
    ]
  },
  price: 1500000,
  platformFee: 15000,
  total: 1515000,
  paymentMethod: "DANA",
  paymentAccountName: "John Doe",
  paymentAccountNumber: "0812-3456-7890",
  availableStock: 1,
  totalStock: 1,
  expiresAt: "2025-02-01T10:00:00Z",
  marketPrice: 1450000,
  createdAt: "2024-01-20T08:00:00Z",
  status: "active"
}

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
function AssetVisualSection({ order }: { order: OrderDetail }) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="relative">
      <div className="aspect-square lg:aspect-[4/3] relative overflow-hidden rounded-xl bg-slate-800">
        <img
          src={order.asset.image}
          alt={order.asset.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
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

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-black/50 backdrop-blur-sm border-none hover:bg-black/70"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-black/50 backdrop-blur-sm border-none hover:bg-black/70"
          >
            <Share2 className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Price Comparison */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-xl">{formatCurrency(order.price)}</p>
                <p className="text-slate-300 text-sm">
                  Market: {formatCurrency(order.marketPrice)} 
                  <span className={`ml-2 ${order.price < order.marketPrice ? 'text-green-400' : 'text-red-400'}`}>
                    ({order.price < order.marketPrice ? '-' : '+'}{Math.abs(((order.price - order.marketPrice) / order.marketPrice) * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm">Stock</p>
                <p className="text-white font-semibold">{order.availableStock}/{order.totalStock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{order.asset.name}</h1>
        <p className="text-slate-400 mb-4">{order.asset.collection}</p>
        {order.asset.description && (
          <p className="text-slate-300 text-sm leading-relaxed">{order.asset.description}</p>
        )}
      </div>

      {/* Traits */}
      {order.asset.traits && order.asset.traits.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-medium mb-3">Traits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {order.asset.traits.map((trait, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wide">{trait.trait_type}</p>
                <p className="text-white font-medium">{trait.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TrustBadge({ icon, text, color = "slate" }: { icon: string; text: string; color?: string }) {
  const colorClasses = {
    slate: "bg-slate-800/50 text-slate-300",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.slate}`}>
      <span>{icon}</span>
      <span className="text-sm font-medium">{text}</span>
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
                {seller.name || shortenAddress(seller.address)}
              </h3>
              {seller.isVerified && (
                <Badge className="bg-blue-500/20 text-blue-400">
                  <Verified className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-3">{shortenAddress(seller.address)}</p>
            
            {/* Trust Metrics */}
            <div className="flex flex-wrap gap-2">
              <TrustBadge icon="✅" text={`${seller.completedTrades} Transaksi`} color="green" />
              <TrustBadge icon="⭐" text={`${seller.rating} Rating`} color="yellow" />
              <TrustBadge icon="📈" text={`${seller.completionRate}% Sukses`} color="blue" />
              <TrustBadge icon="⏱️" text={`${seller.avgResponseTime}m Respon`} color="slate" />
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-lg font-bold text-white">{seller.completedTrades}</div>
            <div className="text-xs text-slate-400">Total Sales</div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-lg font-bold text-green-400">{seller.completionRate}%</div>
            <div className="text-xs text-slate-400">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-lg font-bold text-blue-400">{seller.rating}</div>
            <div className="text-xs text-slate-400">Avg Rating</div>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="text-lg font-bold text-yellow-400">{seller.avgResponseTime}m</div>
            <div className="text-xs text-slate-400">Response</div>
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

function TransactionDetails({ order }: { order: OrderDetail }) {
  const priceComparison = ((order.price - order.marketPrice) / order.marketPrice) * 100

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Detail Transaksi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Harga Aset</span>
            <span className="text-white font-semibold">{formatCurrency(order.price)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Biaya Platform (1%)</span>
            <span className="text-white">{formatCurrency(order.platformFee)}</span>
          </div>
          
          <div className="border-t border-slate-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Total Pembayaran</span>
              <span className="text-green-400 font-bold text-xl">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Market Comparison */}
        <div className="p-3 bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Perbandingan Harga Pasar</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Berdasarkan rata-rata harga 7 hari terakhir</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Harga Pasar: {formatCurrency(order.marketPrice)}</span>
            <span className={`font-medium ${priceComparison < 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceComparison > 0 ? '+' : ''}{priceComparison.toFixed(1)}%
            </span>
          </div>
          {priceComparison < 0 && (
            <p className="text-green-400 text-sm mt-1">🎉 Harga di bawah pasar!</p>
          )}
        </div>

        {/* Payment Method */}
        {order.paymentMethod !== "on-chain" && (
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <h4 className="text-white font-medium mb-2">Metode Pembayaran</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">💳</span>
              </div>
              <div>
                <p className="text-white font-medium">{order.paymentMethod}</p>
                <p className="text-slate-400 text-sm">
                  Transfer ke {order.paymentAccountName} ({order.paymentAccountNumber?.replace(/(.{4})/g, '$1-')})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Info */}
        <div className="p-3 bg-slate-700/30 rounded-lg">
          <h4 className="text-white font-medium mb-2">Informasi Order</h4>
          <div className="text-sm text-slate-300 space-y-1">
            <p>📅 Dibuat: {formatDate(order.createdAt)}</p>
            <p>🟢 Status: Tersedia</p>
            <p>⚡ Pembelian Instant</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



function IntegratedPaymentSection({ order, currentUser }: { order: OrderDetail; currentUser?: { address: string } }) {
  const [paymentStep, setPaymentStep] = useState(1) // 1: Buy, 2: Payment Method, 3: Payment, 4: Success
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"onchain" | "bank" | "ewallet">()
  const [isBuying, setIsBuying] = useState(false)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)

  const isSeller = currentUser?.address === order.seller.address
  const isSold = order.status === "sold"

  const handleStartPurchase = () => {
    setPaymentStep(2)
  }

  const handlePaymentMethodSelect = (method: "onchain" | "bank" | "ewallet") => {
    setSelectedPaymentMethod(method)
    setPaymentStep(3)
  }

  const handlePaymentComplete = async () => {
    setIsBuying(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      setPaymentStep(4)
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsBuying(false)
    }
  }

  const resetPaymentFlow = () => {
    setPaymentStep(1)
    setSelectedPaymentMethod(undefined)
    setPaymentProof(null)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        {isSeller ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-slate-400">Ini adalah listing Anda</p>
            <Button variant="outline" className="mt-3 border-slate-600" asChild>
              <Link href={`/marketplace/${order.id}/edit`}>
                Edit Listing
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Step 1: Buy Button */}
            {paymentStep === 1 && (
              <>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400 mb-1">{formatCurrency(order.total)}</p>
                  <p className="text-slate-400 text-sm">Total yang harus dibayar</p>
                  <div className="mt-2">
                    <Badge className="bg-green-500/20 text-green-400">
                      🟢 Tersedia - Beli Instant
                    </Badge>
                  </div>
                </div>

                {isSold ? (
                  <Button disabled className="w-full h-12">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Sudah Terjual
                  </Button>
                ) : (
                  <Button
                    onClick={handleStartPurchase}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Beli Sekarang
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-slate-600 text-slate-300" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Penjual
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-600 text-slate-300" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Chain
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Payment Method Selection */}
            {paymentStep === 2 && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Pilih Metode Pembayaran</h3>
                  <p className="text-slate-400 text-sm">Semua metode aman dengan PUYOK Escrow</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePaymentMethodSelect("onchain")}
                    className="w-full p-4 border-2 border-slate-700 hover:border-purple-500 rounded-lg transition-all bg-slate-700/30 hover:bg-purple-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-white">Crypto/On-Chain</p>
                        <p className="text-sm text-slate-400">Transfer langsung dari wallet</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelect("bank")}
                    className="w-full p-4 border-2 border-slate-700 hover:border-blue-500 rounded-lg transition-all bg-slate-700/30 hover:bg-blue-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400">🏦</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-white">Transfer Bank</p>
                        <p className="text-sm text-slate-400">Transfer ke {order.paymentMethod} - {order.paymentAccountNumber}</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelect("ewallet")}
                    className="w-full p-4 border-2 border-slate-700 hover:border-green-500 rounded-lg transition-all bg-slate-700/30 hover:bg-green-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400">💳</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-white">E-Wallet</p>
                        <p className="text-sm text-slate-400">DANA, OVO, GoPay</p>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  variant="outline"
                  onClick={resetPaymentFlow}
                  className="w-full border-slate-600 text-slate-400"
                >
                  Kembali
                </Button>
              </>
            )}

            {/* Step 3: Payment Process */}
            {paymentStep === 3 && selectedPaymentMethod && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedPaymentMethod === "onchain" ? "Transfer Crypto" :
                     selectedPaymentMethod === "bank" ? "Transfer Bank" : "E-Wallet Payment"}
                  </h3>
                  <p className="text-green-400 font-bold text-xl">{formatCurrency(order.total)}</p>
                </div>

                {selectedPaymentMethod === "onchain" ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h4 className="text-purple-400 font-medium mb-2">Smart Contract Address</h4>
                      <div className="bg-slate-900/50 p-3 rounded font-mono text-sm text-white">
                        0x1234...5678
                        <Button size="sm" variant="ghost" className="ml-2">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handlePaymentComplete}
                      disabled={isBuying}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isBuying ? "Memproses..." : "Konfirmasi Transfer"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-blue-400 font-medium mb-2">Detail Transfer</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Metode:</span>
                          <span className="text-white">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Nama:</span>
                          <span className="text-white">{order.paymentAccountName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Nomor:</span>
                          <span className="text-white font-mono">{order.paymentAccountNumber}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-400">Jumlah:</span>
                          <span className="text-green-400">{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400 text-sm">
                        💡 Transfer dengan nominal PERSIS untuk verifikasi otomatis
                      </p>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Upload Bukti Transfer (Opsional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                      />
                    </div>

                    <Button
                      onClick={handlePaymentComplete}
                      disabled={isBuying}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isBuying ? "Memverifikasi..." : "Konfirmasi Pembayaran"}
                    </Button>
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={() => setPaymentStep(2)}
                  className="w-full border-slate-600 text-slate-400"
                >
                  Ganti Metode
                </Button>
              </>
            )}

            {/* Step 4: Success */}
            {paymentStep === 4 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pembayaran Berhasil!</h3>
                <p className="text-slate-400 mb-4">
                  {selectedPaymentMethod === "onchain"
                    ? "NFT sedang ditransfer ke wallet Anda"
                    : "Pembayaran sedang diverifikasi. NFT akan dikirim dalam 5-15 menit."
                  }
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Lihat Status Transaksi
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-400">
                    Kembali ke Marketplace
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EscrowGuaranteeSection() {
  return (
    <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">🛡️ Dilindungi Escrow PUYOK</h3>
            <div className="text-slate-300 space-y-2">
              <p>✅ Dana Anda diamankan sampai aset diterima</p>
              <p>✅ Jaminan 100% uang kembali jika terjadi masalah</p>
              <p>✅ Tim support 24/7 siap membantu</p>
              <p>✅ Sistem reputasi terintegrasi untuk keamanan maksimal</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 border-green-500/50 text-green-400 hover:bg-green-500/10">
              <Info className="w-4 h-4 mr-2" />
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-400"
          }`}
        />
      ))}
      <span className="text-sm text-slate-400 ml-1">({rating})</span>
    </div>
  )
}

function ReviewModal({ reviews, onClose }: { reviews: Review[]; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Ulasan Pembeli ({reviews.length})</DialogTitle>
          <DialogDescription className="text-slate-300">
            Feedback dari pembeli yang telah bertransaksi
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
                      </div>
                      <span className="text-slate-400 text-sm">{formatDate(review.date)}</span>
                    </div>
                    <RatingStars rating={review.rating} />
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
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/marketplace" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Marketplace
              </Link>
            </Button>
            <div className="text-slate-400">/</div>
            <div className="text-white">{order.asset.name}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Asset Visual */}
          <div className="lg:col-span-2">
            <AssetVisualSection order={order} />
          </div>

          {/* Right Column - Order Details */}
          <div className="space-y-6">
            <BuyActionSection order={order} currentUser={currentUser} />
            <SellerTrustSection seller={order.seller} onShowReviews={() => setShowReviews(true)} />
            <TransactionDetails order={order} />
            <EscrowGuaranteeSection />
          </div>
        </div>
      </div>

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
