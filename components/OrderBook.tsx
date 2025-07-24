"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { User, Verified, Clock, TrendingUp, TrendingDown } from "lucide-react"
import PaymentMethods from "./PaymentMethods"
import TokenPriceChart from "./TokenPriceChart"
import Link from "next/link"

interface OrderBookOrder {
  id: string
  userId: string
  username: string
  userAvatar?: string
  verified: boolean
  orderType: "buy" | "sell"
  quantity: string
  price: string
  priceChange: string
  priceChangePercent: string
  paymentMethods: string[]
  timePosted: string
  completedTrades: number
  successRate: number
  lastTradePrice?: string
}

interface OrderBookProps {
  tokenSymbol: string
  orders: OrderBookOrder[]
  currentPrice: string
  priceChange: string
  trend: "up" | "down"
  chartData?: number[]
  volume?: string
  high24h?: string
  low24h?: string
}

export default function OrderBook({
  tokenSymbol,
  orders,
  currentPrice,
  priceChange,
  trend,
  chartData = [],
  volume = "N/A",
  high24h = "N/A",
  low24h = "N/A"
}: OrderBookProps) {
  const [activeTab, setActiveTab] = useState("all")
  
  const buyOrders = orders.filter(order => order.orderType === "buy").slice(0, 10)
  const sellOrders = orders.filter(order => order.orderType === "sell").slice(0, 10)
  
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "buy":
        return buyOrders
      case "sell": 
        return sellOrders
      default:
        return [...sellOrders.slice(0, 5), ...buyOrders.slice(0, 5)]
    }
  }

  return (
    <Card className="bg-[#1F2937] border border-white/10">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              {tokenSymbol} Trading
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                {currentPrice}
              </span>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}>
                {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {priceChange}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Live Trading
            </p>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto mt-1" />
          </div>
        </div>

        {/* Combined Chart and Order Book Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-[#0D1117] border border-white/10 w-full">
            <TabsTrigger
              value="all"
              className="text-white data-[state=active]:bg-blue-600 flex-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Chart & Orders
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="text-white data-[state=active]:bg-red-600 flex-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Jual ({sellOrders.length})
            </TabsTrigger>
            <TabsTrigger
              value="buy"
              className="text-white data-[state=active]:bg-green-600 flex-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Beli ({buyOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {/* Price Chart Section */}
            {chartData.length > 0 && (
              <div className="mb-6 p-4 bg-[#0D1117] border border-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Price Chart (24h)
                    </h4>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    trend === "up" ? "text-green-400" : "text-red-400"
                  }`}>
                    {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {priceChange}
                  </div>
                </div>

                <div className="mb-4">
                  <TokenPriceChart
                    data={chartData}
                    trend={trend}
                    change={priceChange}
                    size="lg"
                    showTrend={false}
                    animated={true}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Volume 24h</p>
                    <p className="text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{volume}</p>
                  </div>
                  <div>
                    <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>High 24h</p>
                    <p className="text-green-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{high24h}</p>
                  </div>
                  <div>
                    <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Low 24h</p>
                    <p className="text-red-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{low24h}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Book Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Recent Orders ({orders.length})
                </h4>
                <div className="flex gap-2 text-xs">
                  <span className="text-red-400">{sellOrders.length} Sell</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-400">{buyOrders.length} Buy</span>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {getFilteredOrders().slice(0, 6).map((order) => (
                  <OrderRowCompact key={order.id} order={order} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="mt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sellOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="buy" className="mt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {buyOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function OrderRow({ order }: { order: OrderBookOrder }) {
  return (
    <div className="bg-[#0D1117] border border-white/5 rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Link href={`/profile/${order.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="w-10 h-10 border border-white/10">
              <AvatarImage src={order.userAvatar} />
              <AvatarFallback className="bg-[#1F2937] text-white">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  @{order.username}
                </span>
                {order.verified && <Verified className="w-4 h-4 text-blue-500" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{order.completedTrades} trades</span>
                <span>•</span>
                <span className="text-green-400">{order.successRate}% success</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Order Type Badge */}
        <Badge 
          className={`${
            order.orderType === "buy" 
              ? "bg-green-600 text-white" 
              : "bg-red-600 text-white"
          } font-medium`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {order.orderType === "buy" ? "BELI" : "JUAL"}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4">
        {/* Price Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              {order.price}
            </span>
            <div className={`text-sm font-medium ${
              order.priceChangePercent.startsWith("+") ? "text-green-400" : "text-red-400"
            }`} style={{ fontFamily: 'Inter, sans-serif' }}>
              {order.priceChangePercent}
            </div>
          </div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Qty: {order.quantity}
          </p>
          {order.lastTradePrice && (
            <p className="text-gray-500 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              Last: {order.lastTradePrice}
            </p>
          )}
        </div>

        {/* Payment & Time */}
        <div className="text-right">
          <PaymentMethods methods={order.paymentMethods} size="sm" />
          <div className="flex items-center justify-end gap-1 mt-2 text-gray-400 text-xs">
            <Clock className="w-3 h-3" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{order.timePosted}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <Button 
          size="sm" 
          className={`w-full ${
            order.orderType === "buy"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          } font-medium`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {order.orderType === "buy" ? "Jual ke User Ini" : "Beli dari User Ini"}
        </Button>
      </div>
    </div>
  )
}
