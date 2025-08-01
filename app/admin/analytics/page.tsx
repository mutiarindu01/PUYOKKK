"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3, LineChart, PieChart, TrendingUp, TrendingDown,
  Users, DollarSign, ShoppingCart, Eye, Download, Calendar,
  Globe, Smartphone, Clock, Target, Award, Zap, Activity,
  Filter, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample Analytics Data
const revenueData = [
  { month: "Jan", revenue: 1250000000, transactions: 234, users: 145 },
  { month: "Feb", revenue: 1680000000, transactions: 312, users: 198 },
  { month: "Mar", revenue: 2100000000, transactions: 421, users: 267 },
  { month: "Apr", revenue: 1890000000, transactions: 376, users: 289 },
  { month: "May", revenue: 2450000000, transactions: 502, users: 334 },
  { month: "Jun", revenue: 2780000000, transactions: 634, users: 412 },
]

const categoryData = [
  { name: "Digital Art", value: 45, revenue: 1250000000, color: "bg-blue-500" },
  { name: "Gaming", value: 28, revenue: 780000000, color: "bg-purple-500" },
  { name: "Photography", value: 15, revenue: 420000000, color: "bg-green-500" },
  { name: "Music", value: 8, revenue: 225000000, color: "bg-yellow-500" },
  { name: "Other", value: 4, revenue: 125000000, color: "bg-slate-500" },
]

const topCreators = [
  { rank: 1, name: "Digital Artist Pro", username: "@digital_pro", sales: 156, revenue: 450000000, growth: 23.5 },
  { rank: 2, name: "Gaming NFT Master", username: "@game_master", sales: 134, revenue: 380000000, growth: 18.2 },
  { rank: 3, name: "Photo Virtuoso", username: "@photo_king", sales: 98, revenue: 290000000, growth: 15.7 },
  { rank: 4, name: "Music Producer", username: "@beats_maker", sales: 67, revenue: 195000000, growth: 12.3 },
  { rank: 5, name: "Abstract Vision", username: "@abstract_art", sales: 45, revenue: 145000000, growth: 9.8 },
]

const userMetrics = [
  { metric: "Daily Active Users", current: 2847, previous: 2654, change: 7.3, trend: "up" },
  { metric: "New Registrations", current: 156, previous: 134, change: 16.4, trend: "up" },
  { metric: "User Retention (7d)", current: 78.5, previous: 76.2, change: 3.0, trend: "up" },
  { metric: "Average Session Duration", current: 24.5, previous: 26.1, change: -6.1, trend: "down" },
]

const geographicData = [
  { country: "Indonesia", users: 8450, percentage: 54.8, revenue: 1680000000 },
  { country: "Malaysia", users: 2340, percentage: 15.2, revenue: 456000000 },
  { country: "Singapore", users: 1890, percentage: 12.3, revenue: 890000000 },
  { country: "Thailand", users: 1234, percentage: 8.0, revenue: 234000000 },
  { country: "Philippines", users: 987, percentage: 6.4, revenue: 178000000 },
  { country: "Others", users: 519, percentage: 3.3, revenue: 89000000 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400">Comprehensive platform performance insights</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(2780000000)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-sm">+24.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">89,650</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 text-sm">+18.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">15,420</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-400 text-sm">+12.8%</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg. Order Value</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(31000000)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDown className="w-3 h-3 text-red-400" />
                    <span className="text-red-400 text-sm">-3.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart and Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-400" />
                Revenue Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-slate-700/30 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Revenue Chart Visualization</p>
                  <p className="text-slate-500 text-sm">Integration with chart library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{category.name}</span>
                    <span className="text-slate-400 text-sm">{category.value}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">{formatCurrency(category.revenue)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* User Metrics and Top Creators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                User Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{metric.metric}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-white">{metric.current}</span>
                      <div className={`flex items-center gap-1 ${
                        metric.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}>
                        {metric.trend === "up" ? 
                          <ArrowUp className="w-3 h-3" /> : 
                          <ArrowDown className="w-3 h-3" />
                        }
                        <span className="text-sm">{Math.abs(metric.change)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Top Creators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCreators.map((creator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    creator.rank === 1 ? "bg-yellow-500" :
                    creator.rank === 2 ? "bg-slate-400" :
                    creator.rank === 3 ? "bg-amber-600" :
                    "bg-slate-600"
                  }`}>
                    {creator.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{creator.name}</p>
                    <p className="text-slate-400 text-sm">{creator.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{formatCurrency(creator.revenue)}</p>
                    <p className="text-green-400 text-sm">+{creator.growth}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {geographicData.map((country, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{country.country}</h4>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {country.percentage}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Users:</span>
                      <span className="text-white">{formatNumber(country.users)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Revenue:</span>
                      <span className="text-white">{formatCurrency(country.revenue)}</span>
                    </div>
                    <Progress value={country.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Activity Feed */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Real-time Platform Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "sale", user: "crypto_whale_88", action: "purchased NFT for", amount: 125000000, time: "2 min ago" },
                { type: "listing", user: "artist_pro", action: "listed new NFT for", amount: 89000000, time: "5 min ago" },
                { type: "bid", user: "collector_king", action: "placed bid of", amount: 67000000, time: "8 min ago" },
                { type: "withdrawal", user: "trader_master", action: "withdrew", amount: 450000000, time: "12 min ago" },
                { type: "verification", user: "new_creator", action: "completed KYC verification", amount: 0, time: "15 min ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "sale" ? "bg-green-400" :
                    activity.type === "listing" ? "bg-blue-400" :
                    activity.type === "bid" ? "bg-yellow-400" :
                    activity.type === "withdrawal" ? "bg-red-400" :
                    "bg-purple-400"
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                      {activity.amount > 0 && <span className="font-medium"> {formatCurrency(activity.amount)}</span>}
                    </p>
                  </div>
                  <span className="text-slate-400 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
