"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { EscrowService } from "@/lib/escrow"
import { ethers } from "ethers"
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
  Download,
  Eye,
  MoreHorizontal,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Star,
  MessageCircle
} from "lucide-react"

// Sample orders data
const ordersData = {
  active: [
    {
      id: "ORD-001",
      type: "NFT",
      assetName: "Indonesian Heritage #001",
      price: "Rp 15.000.000",
      buyer: "heritage_collector",
      buyerAvatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
      status: "pending_payment",
      timeLeft: "2h 15m",
      paymentMethod: "DANA",
      date: "15 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      priority: "high"
    },
    {
      id: "ORD-002", 
      type: "Token",
      assetName: "1,000 USDT",
      price: "Rp 15.500.000",
      buyer: "stable_investor",
      buyerAvatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
      status: "in_progress",
      paymentMethod: "GoPay",
      date: "14 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      priority: "medium"
    },
    {
      id: "ORD-003",
      type: "NFT",
      assetName: "Bali Sunset #25",
      price: "Rp 8.750.000",
      buyer: "art_enthusiast",
      buyerAvatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
      status: "awaiting_delivery",
      paymentMethod: "OVO",
      date: "13 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      priority: "low"
    }
  ],
  completed: [
    {
      id: "ORD-004",
      type: "NFT", 
      assetName: "Jakarta Street Art #12",
      price: "Rp 12.300.000",
      buyer: "urban_collector",
      buyerAvatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
      status: "completed",
      paymentMethod: "DANA",
      date: "10 Juli 2024",
      completedDate: "12 Juli 2024",
      rating: 5,
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    }
  ],
  cancelled: [
    {
      id: "ORD-005",
      type: "Token",
      assetName: "500 BNB",
      price: "Rp 45.000.000",
      buyer: "crypto_whale",
      buyerAvatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
      status: "cancelled",
      paymentMethod: "Bank Transfer",
      date: "8 Juli 2024",
      cancelReason: "Buyer cancelled - Price too high",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    }
  ]
}

function OrderCard({ order, type }: { order: any; type: 'active' | 'completed' | 'cancelled' }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_payment': return 'bg-yellow-500/20 text-yellow-400'
      case 'in_progress': return 'bg-blue-500/20 text-blue-400'
      case 'awaiting_delivery': return 'bg-purple-500/20 text-purple-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800/30 rounded-xl p-6 border-l-4 ${getPriorityColor(order.priority)} hover:bg-slate-800/50 transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <img 
          src={order.image} 
          alt={order.assetName}
          className="w-20 h-20 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-semibold text-lg">{order.assetName}</h3>
              <p className="text-slate-400 text-sm">Order ID: {order.id}</p>
              <p className="text-slate-400 text-sm">Buyer: @{order.buyer}</p>
            </div>
            
            <div className="text-right">
              <p className="text-white font-bold text-lg">{order.price}</p>
              <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {order.date}
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {order.paymentMethod}
              </div>
              {order.timeLeft && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Clock className="w-4 h-4" />
                  {order.timeLeft}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {type === 'completed' && order.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                    />
                  ))}
                </div>
              )}
              
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                <Eye className="w-4 h-4 mr-1" />
                Detail
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Buyer
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {order.cancelReason && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{order.cancelReason}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  const totalActive = ordersData.active.length
  const totalCompleted = ordersData.completed.length
  const totalCancelled = ordersData.cancelled.length

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
                Order Saya
              </h1>
              <p className="text-slate-400 mt-1">Kelola semua pesanan Anda</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari order..."
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
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Orders</p>
                  <p className="text-3xl font-bold text-white">{totalActive}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{totalCompleted}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Success Rate</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round((totalCompleted / (totalCompleted + totalCancelled)) * 100)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Semua Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
                  Active ({totalActive})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-green-600">
                  Completed ({totalCompleted})
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-600">
                  Cancelled ({totalCancelled})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4 mt-6">
                {ordersData.active.map((order, index) => (
                  <OrderCard key={order.id} order={order} type="active" />
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4 mt-6">
                {ordersData.completed.map((order, index) => (
                  <OrderCard key={order.id} order={order} type="completed" />
                ))}
              </TabsContent>
              
              <TabsContent value="cancelled" className="space-y-4 mt-6">
                {ordersData.cancelled.map((order, index) => (
                  <OrderCard key={order.id} order={order} type="cancelled" />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
