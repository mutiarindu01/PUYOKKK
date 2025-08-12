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
  Plus,
  Minus,
  RefreshCw,
  Settings,
  CreditCard,
  Wallet,
  Gas,
  Coins,
  Timer,
  Copy,
  Building2,
  Smartphone,
  HelpCircle,
  Info
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

// Types for Token Order Book
interface TokenOrder {
  id: string
  token: {
    id: string
    name: string
    symbol: string
    contractAddress: string
    decimals: number
    logo: string
    description?: string
    totalSupply: string
    verified: boolean
  }
  side: "buy" | "sell"
  price: number
  amount: number
  filled: number
  total: number
  maker: {
    address: string
    username?: string
    reputation: number
    completedTrades: number
    isVerified: boolean
  }
  paymentMethod: "gasless" | "onchain"
  paymentDetails?: {
    methods: string[] // ["DANA", "OVO", "Bank Transfer"]
    accountInfo?: any
  }
  createdAt: string
  expiresAt: string
  status: "active" | "filled" | "cancelled" | "expired"
  feeStructure: {
    makerFee: number
    takerFee: number
    gasFee?: number
  }
}

interface TokenInfo {
  id: string
  name: string
  symbol: string
  contractAddress: string
  decimals: number
  logo: string
  currentPrice: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  totalSupply: string
  verified: boolean
  description: string
  website?: string
  twitter?: string
  telegram?: string
}

// Sample token data
const sampleTokens: TokenInfo[] = [
  {
    id: "puyok-token",
    name: "PUYOK Token",
    symbol: "PUYOK",
    contractAddress: "0x123...abc",
    decimals: 18,
    logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100",
    currentPrice: 0.25,
    priceChange24h: 12.5,
    volume24h: 1250000,
    marketCap: 25000000,
    totalSupply: "100000000",
    verified: true,
    description: "Native utility token of the PUYOK ecosystem",
    website: "https://puyok.com",
    twitter: "@puyok_official"
  },
  {
    id: "dragon-coin",
    name: "Dragon Coin",
    symbol: "DRG",
    contractAddress: "0x456...def",
    decimals: 18,
    logo: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100",
    currentPrice: 1.75,
    priceChange24h: -5.2,
    volume24h: 850000,
    marketCap: 15750000,
    totalSupply: "9000000",
    verified: true,
    description: "Gaming token for Dragon NFT ecosystem"
  }
]

// Sample order book data
const sampleOrders: TokenOrder[] = [
  {
    id: "order-1",
    token: sampleTokens[0],
    side: "buy",
    price: 0.24,
    amount: 10000,
    filled: 0,
    total: 2400,
    maker: {
      address: "0x789...123",
      username: "crypto_trader",
      reputation: 4.8,
      completedTrades: 156,
      isVerified: true
    },
    paymentMethod: "gasless",
    paymentDetails: {
      methods: ["DANA", "OVO", "Bank Transfer"]
    },
    createdAt: "2024-01-20T10:00:00Z",
    expiresAt: "2024-01-27T10:00:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.1,
      takerFee: 0.15
    }
  },
  {
    id: "order-2",
    token: sampleTokens[0],
    side: "sell",
    price: 0.26,
    amount: 5000,
    filled: 1000,
    total: 1300,
    maker: {
      address: "0xabc...789",
      username: "token_holder",
      reputation: 4.9,
      completedTrades: 89,
      isVerified: true
    },
    paymentMethod: "onchain",
    createdAt: "2024-01-20T11:00:00Z",
    expiresAt: "2024-01-25T11:00:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.05,
      takerFee: 0.1,
      gasFee: 0.02
    }
  }
]

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatToken = (amount: number, decimals: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Components
function TokenSelector({ selectedToken, onTokenSelect, tokens }: {
  selectedToken: TokenInfo | null
  onTokenSelect: (token: TokenInfo) => void
  tokens: TokenInfo[]
}) {
  return (
    <Select onValueChange={(value) => {
      const token = tokens.find(t => t.id === value)
      if (token) onTokenSelect(token)
    }}>
      <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white">
        <SelectValue placeholder="Pilih Token">
          {selectedToken && (
            <div className="flex items-center gap-2">
              <img src={selectedToken.logo} alt={selectedToken.symbol} className="w-6 h-6 rounded-full" />
              <span>{selectedToken.symbol}</span>
              <Badge className={`${selectedToken.priceChange24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {selectedToken.priceChange24h >= 0 ? '+' : ''}{selectedToken.priceChange24h.toFixed(2)}%
              </Badge>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-slate-700">
        {tokens.map((token) => (
          <SelectItem key={token.id} value={token.id} className="text-white hover:bg-slate-700">
            <div className="flex items-center gap-3 w-full">
              <img src={token.logo} alt={token.symbol} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{token.symbol}</span>
                  <span className="text-sm">${token.currentPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{token.name}</span>
                  <span className={token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function OrderBookTable({ orders, selectedToken, onOrderSelect }: {
  orders: TokenOrder[]
  selectedToken: TokenInfo | null
  onOrderSelect: (order: TokenOrder) => void
}) {
  const filteredOrders = orders.filter(order => 
    !selectedToken || order.token.id === selectedToken.id
  )

  const buyOrders = filteredOrders.filter(order => order.side === "buy").sort((a, b) => b.price - a.price)
  const sellOrders = filteredOrders.filter(order => order.side === "sell").sort((a, b) => a.price - b.price)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Buy Orders */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Buy Orders ({buyOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 font-medium border-b border-slate-700 pb-2">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
              <span>Method</span>
            </div>
            {buyOrders.slice(0, 10).map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                className="grid grid-cols-4 gap-2 text-sm py-2 px-2 rounded cursor-pointer"
                onClick={() => onOrderSelect(order)}
              >
                <span className="text-green-400 font-medium">${order.price.toFixed(4)}</span>
                <span className="text-white">{formatToken(order.amount - order.filled)}</span>
                <span className="text-slate-300">${(order.total - (order.filled * order.price)).toFixed(2)}</span>
                <div className="flex items-center gap-1">
                  {order.paymentMethod === "gasless" ? (
                    <CreditCard className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Wallet className="w-3 h-3 text-purple-400" />
                  )}
                  <span className="text-xs text-slate-400">
                    {order.paymentMethod === "gasless" ? "Gasless" : "On-chain"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sell Orders */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            Sell Orders ({sellOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 font-medium border-b border-slate-700 pb-2">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
              <span>Method</span>
            </div>
            {sellOrders.slice(0, 10).map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                className="grid grid-cols-4 gap-2 text-sm py-2 px-2 rounded cursor-pointer"
                onClick={() => onOrderSelect(order)}
              >
                <span className="text-red-400 font-medium">${order.price.toFixed(4)}</span>
                <span className="text-white">{formatToken(order.amount - order.filled)}</span>
                <span className="text-slate-300">${(order.total - (order.filled * order.price)).toFixed(2)}</span>
                <div className="flex items-center gap-1">
                  {order.paymentMethod === "gasless" ? (
                    <CreditCard className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Wallet className="w-3 h-3 text-purple-400" />
                  )}
                  <span className="text-xs text-slate-400">
                    {order.paymentMethod === "gasless" ? "Gasless" : "On-chain"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreateOrderModal({ isOpen, onClose, selectedToken }: {
  isOpen: boolean
  onClose: () => void
  selectedToken: TokenInfo | null
}) {
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy")
  const [paymentMethod, setPaymentMethod] = useState<"gasless" | "onchain">("gasless")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>(["DANA"])

  const total = parseFloat(price || "0") * parseFloat(amount || "0")
  const fees = paymentMethod === "gasless" 
    ? { maker: 0.15, taker: 0.2 } 
    : { maker: 0.05, taker: 0.1, gas: 0.02 }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create {orderSide === "buy" ? "Buy" : "Sell"} Order</DialogTitle>
          <DialogDescription className="text-slate-400">
            Create a new order for {selectedToken?.symbol || "selected token"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Type */}
          <div className="flex gap-2">
            <Button
              variant={orderSide === "buy" ? "default" : "outline"}
              onClick={() => setOrderSide("buy")}
              className={`flex-1 ${orderSide === "buy" ? "bg-green-600 hover:bg-green-700" : "border-slate-600"}`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy Order
            </Button>
            <Button
              variant={orderSide === "sell" ? "default" : "outline"}
              onClick={() => setOrderSide("sell")}
              className={`flex-1 ${orderSide === "sell" ? "bg-red-600 hover:bg-red-700" : "border-slate-600"}`}
            >
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell Order
            </Button>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-white font-medium">Payment Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gasless Method */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "gasless" 
                    ? "border-blue-500 bg-blue-500/10" 
                    : "border-slate-700 hover:border-slate-600"
                }`}
                onClick={() => setPaymentMethod("gasless")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Gasless P2P</h4>
                    <p className="text-slate-400 text-sm">Transfer bank/e-wallet</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Maker Fee:</span>
                    <span className="text-blue-400">{fees.maker}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Taker Fee:</span>
                    <span className="text-blue-400">{fees.taker}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gas Fee:</span>
                    <span className="text-green-400">GRATIS</span>
                  </div>
                </div>
              </div>

              {/* On-chain Method */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "onchain" 
                    ? "border-purple-500 bg-purple-500/10" 
                    : "border-slate-700 hover:border-slate-600"
                }`}
                onClick={() => setPaymentMethod("onchain")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">On-Chain Direct</h4>
                    <p className="text-slate-400 text-sm">Langsung dari wallet</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Maker Fee:</span>
                    <span className="text-purple-400">{fees.maker}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Taker Fee:</span>
                    <span className="text-purple-400">{fees.taker}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gas Fee:</span>
                    <span className="text-yellow-400">~{fees.gas}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gasless Payment Methods */}
          {paymentMethod === "gasless" && (
            <div className="space-y-3">
              <Label className="text-white font-medium">Select Payment Methods</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["DANA", "OVO", "GoPay", "Bank Transfer"].map((method) => (
                  <div
                    key={method}
                    className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                      selectedPaymentMethods.includes(method)
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    onClick={() => {
                      if (selectedPaymentMethods.includes(method)) {
                        setSelectedPaymentMethods(prev => prev.filter(m => m !== method))
                      } else {
                        setSelectedPaymentMethods(prev => [...prev, method])
                      }
                    }}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 bg-slate-700 rounded-full flex items-center justify-center">
                      {method === "Bank Transfer" ? (
                        <Building2 className="w-4 h-4 text-slate-300" />
                      ) : (
                        <Smartphone className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <span className="text-sm text-white">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Price (USD)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Amount ({selectedToken?.symbol})</Label>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Order Summary */}
          {total > 0 && (
            <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
              <h4 className="text-white font-medium mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total:</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Maker Fee ({fees.maker}%):</span>
                  <span className="text-slate-300">${(total * fees.maker / 100).toFixed(2)}</span>
                </div>
                {paymentMethod === "onchain" && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Gas Fee:</span>
                    <span className="text-yellow-400">${(total * (fees.gas || 0) / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-700 pt-2 flex justify-between font-medium">
                  <span className="text-white">You {orderSide === "buy" ? "Pay" : "Receive"}:</span>
                  <span className="text-white">
                    ${(total + (total * fees.maker / 100) + (total * (fees.gas || 0) / 100)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-slate-600">
              Cancel
            </Button>
            <Button 
              className={`flex-1 ${
                orderSide === "buy" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={!price || !amount || (paymentMethod === "gasless" && selectedPaymentMethods.length === 0)}
            >
              Create {orderSide === "buy" ? "Buy" : "Sell"} Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function TokensOrderBookPage() {
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(sampleTokens[0])
  const [showCreateOrder, setShowCreateOrder] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<TokenOrder | null>(null)
  const [activeTab, setActiveTab] = useState("orderbook")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Token Order Book</h1>
              <p className="text-slate-400 mt-1">Hybrid P2P trading dengan gasless & on-chain options</p>
            </div>
            <Button 
              onClick={() => setShowCreateOrder(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Token Selector */}
        <div className="mb-8">
          <Label className="text-white font-medium mb-3 block">Select Token</Label>
          <TokenSelector 
            selectedToken={selectedToken}
            onTokenSelect={setSelectedToken}
            tokens={sampleTokens}
          />
        </div>

        {/* Token Info Card */}
        {selectedToken && (
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <img src={selectedToken.logo} alt={selectedToken.symbol} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{selectedToken.name}</h2>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-slate-400">{selectedToken.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">${selectedToken.currentPrice}</div>
                  <div className={`text-lg ${selectedToken.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedToken.priceChange24h >= 0 ? '+' : ''}{selectedToken.priceChange24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="orderbook" className="data-[state=active]:bg-slate-700">
              Order Book
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
              Trade History
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-slate-700">
              Token Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orderbook" className="mt-6">
            <OrderBookTable 
              orders={sampleOrders}
              selectedToken={selectedToken}
              onOrderSelect={setSelectedOrder}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center py-8">No recent trades available</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            {selectedToken && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Token Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Market Cap:</span>
                      <span className="text-white">${selectedToken.marketCap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">24h Volume:</span>
                      <span className="text-white">${selectedToken.volume24h.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Supply:</span>
                      <span className="text-white">{selectedToken.totalSupply} {selectedToken.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contract:</span>
                      <span className="text-white font-mono">{shortenAddress(selectedToken.contractAddress)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Fee Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Gasless P2P</h4>
                      <div className="pl-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Maker Fee:</span>
                          <span className="text-blue-400">0.15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Taker Fee:</span>
                          <span className="text-blue-400">0.20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Gas Fee:</span>
                          <span className="text-green-400">FREE</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">On-Chain Direct</h4>
                      <div className="pl-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Maker Fee:</span>
                          <span className="text-purple-400">0.05%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Taker Fee:</span>
                          <span className="text-purple-400">0.10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Gas Fee:</span>
                          <span className="text-yellow-400">~0.02%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Order Modal */}
      <CreateOrderModal 
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        selectedToken={selectedToken}
      />
    </div>
  )
}
