"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GooeyNav from "./GooeyNav"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Heart,
  Calendar,
  Activity,
  Target,
  Award,
  Users,
  Zap,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from "lucide-react"

interface ChartData {
  month: string
  amount: number
  sales: number
  views: number
  followers: number
}

interface ProfileChartProps {
  data: {
    monthlyEarnings: Array<{ month: string; amount: number }>
    totalEarnings: string
    totalViews: number
    totalFollowers: number
    averageRating: number
    completionRate: number
    responseTime: string
    successfulTransactions: number
  }
}

export default function ProfileChart({ data }: ProfileChartProps) {
  const [activeChart, setActiveChart] = useState<"earnings" | "performance" | "analytics">("earnings")
  const [animationPhase, setAnimationPhase] = useState(0)

  const navItems = [
    { label: "💰 Earnings" },
    { label: "📈 Performance" },
    { label: "📊 Analytics" }
  ]

  const handleTabChange = (index: number) => {
    const tabs = ["earnings", "performance", "analytics"] as const
    setActiveChart(tabs[index])
  }

  // Enhanced data processing with consistent mock data
  const mockSalesData = [12, 8, 15, 22, 18, 25]; // Consistent mock sales data
  const mockViewsData = [2500, 3200, 4100, 3800, 4500, 4200]; // Consistent mock views data

  const chartData: ChartData[] = data.monthlyEarnings.map((item, index) => ({
    month: item.month,
    amount: item.amount,
    sales: mockSalesData[index] || 15, // Consistent sales data
    views: mockViewsData[index] || 3000, // Consistent views data
    followers: data.totalFollowers + (index * 50), // Progressive followers
  }))

  const maxAmount = Math.max(...chartData.map(d => d.amount))
  const maxSales = Math.max(...chartData.map(d => d.sales))
  const maxViews = Math.max(...chartData.map(d => d.views))

  // Performance metrics
  const performanceMetrics = [
    {
      label: "Response Time",
      value: data.responseTime,
      icon: Clock,
      color: "text-blue-500",
      trend: "+15%",
      isPositive: true,
    },
    {
      label: "Success Rate",
      value: `${data.completionRate}%`,
      icon: Target,
      color: "text-green-500", 
      trend: "+2%",
      isPositive: true,
    },
    {
      label: "Average Rating",
      value: data.averageRating.toString(),
      icon: Star,
      color: "text-yellow-500",
      trend: "+0.1",
      isPositive: true,
    },
    {
      label: "Total Sales",
      value: data.successfulTransactions.toString(),
      icon: DollarSign,
      color: "text-purple-500",
      trend: "+12",
      isPositive: true,
    },
  ]

  // Analytics data
  const analyticsData = [
    { label: "Profile Views", value: data.totalViews, icon: Eye, change: "+23%" },
    { label: "Followers", value: data.totalFollowers, icon: Users, change: "+18%" },
    { label: "Engagement Rate", value: "8.4%", icon: Heart, change: "+5%" },
    { label: "Click Through Rate", value: "12.1%", icon: Activity, change: "+8%" },
  ]

  // Animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Chart Navigation */}
      <Tabs value={activeChart} onValueChange={(value) => setActiveChart(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-transparent border border-slate-800">
          <TabsTrigger value="earnings" className="flex items-center gap-2 bg-slate-900 shadow-sm rounded border border-slate-700 hover:bg-slate-800 data-[state=active]:bg-slate-900">
            <BarChart3 className="w-4 h-4" />
            <p><strong>Earnings</strong></p>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <p><strong>Performance</strong></p>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            <p><strong>Analytics</strong></p>
          </TabsTrigger>
        </TabsList>

        {/* Earnings Chart */}
        <TabsContent value="earnings" className="mt-6">
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Monthly Earnings Trend
                </CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +24% this month
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              {/* Custom Bar Chart */}
              <div className="h-80 flex items-end justify-between gap-2 mb-6 px-4">
                {chartData.map((item, index) => {
                  const height = (item.amount / maxAmount) * 100
                  const delay = index * 0.1
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-1000 ease-out hover:from-green-600 hover:to-green-500 cursor-pointer relative group"
                        style={{ 
                          height: `${height}%`,
                          animationDelay: `${delay}s`
                        }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatCurrency(item.amount)}
                        </div>
                        
                        {/* Sparkle effect on highest bar */}
                        {item.amount === maxAmount && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
                    </div>
                  )
                })}
              </div>

              {/* Earnings Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-900 rounded-xl text-white border border-slate-700">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(chartData[chartData.length - 1]?.amount || 0)}
                  </div>
                  <div className="text-xs text-muted-foreground"><p><strong>Current Month</strong></p></div>
                </div>
                <div className="text-center p-4 bg-slate-900 rounded-xl text-white border border-slate-800">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(chartData.reduce((sum, item) => sum + item.amount, 0))}
                  </div>
                  <div className="text-xs text-muted-foreground"><p><strong>Total 6 Months</strong></p></div>
                </div>
                <div className="text-center p-4 bg-slate-900 rounded-xl text-white border border-slate-700">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(chartData.reduce((sum, item) => sum + item.amount, 0) / chartData.length)}
                  </div>
                  <div className="text-xs text-muted-foreground"><p><strong>Average/Month</strong></p></div>
                </div>
                <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-lg font-bold">
                    <span className="text-white">{Math.round(((chartData[chartData.length - 1]?.amount || 0) / (chartData[chartData.length - 2]?.amount || 1) - 1) * 100)}</span><span className="text-white">%</span>
                  </div>
                  <div className="text-xs text-muted-foreground"><p><strong>Growth Rate</strong></p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Chart */}
        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          metric.color.includes('blue') ? 'from-blue-100 to-blue-200' :
                          metric.color.includes('green') ? 'from-green-100 to-green-200' :
                          metric.color.includes('yellow') ? 'from-yellow-100 to-yellow-200' :
                          'from-purple-100 to-purple-200'
                        }`}>
                          <Icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{metric.label}</h4>
                          <p className="text-sm text-muted-foreground">Current metric</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        metric.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {metric.isPositive ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {metric.trend}
                      </div>
                    </div>

                    {/* Progress visualization for percentage metrics */}
                    {metric.value.includes('%') && (
                      <div className="mt-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ease-out ${
                              metric.color.includes('blue') ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                              metric.color.includes('green') ? 'bg-gradient-to-r from-green-400 to-green-500' :
                              metric.color.includes('yellow') ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                              'bg-gradient-to-r from-purple-400 to-purple-500'
                            }`}
                            style={{ 
                              width: `${parseFloat(metric.value)}%`,
                              animationDelay: `${index * 0.2}s`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Analytics Chart */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analytics Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analyticsData.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={item.label} className="shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-8 h-8 text-primary" />
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          {item.change}
                        </Badge>
                      </div>
                      <h4 className="text-sm text-muted-foreground mb-1">{item.label}</h4>
                      <div className="text-2xl font-bold text-foreground">
                        {typeof item.value === 'number' ? formatNumber(item.value) : item.value}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Circular Progress Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="relative w-40 h-40">
                  {/* Background Circle */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${data.completionRate * 2.51} 251`}
                      className="text-primary transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{data.completionRate}%</div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Line Chart */}
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Activity Trends (Last 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end justify-between gap-1">
                {chartData.map((item, index) => {
                  const height = (item.views / maxViews) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end gap-0.5">
                        {/* Views line */}
                        <div 
                          className="w-1/2 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t transition-all duration-1000 ease-out"
                          style={{ 
                            height: `${height}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        />
                        {/* Sales line */}
                        <div 
                          className="w-1/2 bg-gradient-to-t from-green-400 to-green-300 rounded-t transition-all duration-1000 ease-out"
                          style={{ 
                            height: `${(item.sales / maxSales) * 100}%`,
                            animationDelay: `${index * 0.1 + 0.5}s`
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{item.month}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded" />
                  <span className="text-sm text-muted-foreground">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded" />
                  <span className="text-sm text-muted-foreground">Sales</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
