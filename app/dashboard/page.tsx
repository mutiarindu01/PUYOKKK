"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ElegantTabs from "@/components/ElegantTabs"
import {
  Bell,
  Plus,
  ShoppingCart,
  Wallet,
  Settings,
  Users,
  Home,
  User,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Package,
  Star,
  ArrowRight,
  Search,
  Filter,
  MoreHorizontal,
  DollarSign,
  Activity,
  Trophy,
  Target,
  Award,
  Flame,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  RefreshCw,
  Menu,
  ChevronLeft,
  ChevronRight,
  Camera,
  Save,
  EyeOff,
  Smartphone,
  Mail,
  Key,
  AlertTriangle,
  Grid,
  List,
  Edit,
  Trash2,
  Share2,
  Heart,
  Crown,
  Shield,
  Lock,
  Gift,
  Bank,
  ArrowUpRight,
  ArrowDownLeft,
  MessageCircle
} from "lucide-react"

// Enhanced user data with more metrics
const currentUser = {
  username: "crypto_trader88",
  displayName: "Crypto Trader Pro",
  email: "trader@example.com",
  phone: "+62 812-3456-7890",
  bio: "Professional crypto trader with 5+ years experience. Specializing in NFT and DeFi investments.",
  avatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
  joinDate: "Januari 2023",
  totalEarnings: "Rp 45.250.000",
  monthlyEarnings: "Rp 12.500.000",
  totalOrders: 23,
  completedOrders: 21,
  rating: 4.8,
  level: "Gold Trader",
  successRate: 91.3,
  responseTime: "< 2 jam",
  totalViews: 1420,
  followers: 234,
  badges: ["Verified", "Top Trader", "Fast Response"],
  isVerified: true,
  location: "Jakarta, Indonesia",
  website: "https://cryptotrader.pro"
}

// Enhanced stats data
const dashboardStats = [
  {
    title: "Total Earnings",
    value: "Rp 45.250.000",
    change: "+23.5%",
    isPositive: true,
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-600/10",
    description: "From 21 completed orders"
  },
  {
    title: "Monthly Revenue",
    value: "Rp 12.500.000",
    change: "+8.2%",
    isPositive: true,
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/10 to-indigo-600/10",
    description: "This month progress"
  },
  {
    title: "Success Rate",
    value: "91.3%",
    change: "+2.1%",
    isPositive: true,
    icon: Target,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10",
    description: "21 of 23 orders completed"
  },
  {
    title: "Active Orders",
    value: "5",
    change: "+2",
    isPositive: true,
    icon: Activity,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
    description: "Currently in progress"
  }
]

// Performance metrics
const performanceMetrics = [
  { label: "Response Time", value: "< 2 jam", progress: 95, color: "text-blue-500" },
  { label: "Customer Rating", value: "4.8/5", progress: 96, color: "text-yellow-500" },
  { label: "Order Completion", value: "91.3%", progress: 91, color: "text-green-500" },
  { label: "Profile Views", value: "1,420", progress: 78, color: "text-purple-500" }
]

// Sample orders with enhanced data
const sampleOrders = [
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
  }
]

// Quick actions data
const quickActions = [
  {
    title: "List New Asset",
    description: "Sell your NFT or Token",
    icon: Plus,
    gradient: "from-blue-500 to-indigo-600",
    href: "/create-listing"
  },
  {
    title: "Browse Marketplace", 
    description: "Find assets to buy",
    icon: Search,
    gradient: "from-purple-500 to-pink-600",
    href: "/marketplace"
  },
  {
    title: "Check Awards",
    description: "Claim achievements",
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-600",
    action: "awards"
  },
  {
    title: "Account Settings",
    description: "Manage your profile",
    icon: Settings,
    gradient: "from-gray-500 to-slate-600",
    action: "settings"
  }
]

// Sample data for other sections
const ordersData = {
  active: [
    {
      id: "ORD-001",
      type: "NFT", 
      assetName: "Indonesian Heritage #001",
      price: "Rp 15.000.000",
      buyer: "heritage_collector",
      status: "pending_payment",
      timeLeft: "2h 15m",
      paymentMethod: "DANA",
      date: "15 Juli 2024",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      priority: "high"
    }
  ],
  completed: [
    {
      id: "ORD-004",
      type: "NFT",
      assetName: "Jakarta Street Art #12", 
      price: "Rp 12.300.000",
      buyer: "urban_collector",
      status: "completed",
      paymentMethod: "DANA",
      date: "10 Juli 2024",
      completedDate: "12 Juli 2024",
      rating: 5,
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b"
    }
  ]
}

const assetsData = {
  nfts: [
    {
      id: "NFT-001",
      name: "Indonesian Heritage #001",
      description: "Beautiful traditional Indonesian art piece",
      price: "Rp 15.000.000",
      category: "Art",
      status: "listed",
      views: 342,
      likes: 28,
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      rarity: "Rare"
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
      isPositive: true
    }
  ]
}

const achievementsData = {
  earned: [
    {
      id: "ach_001",
      title: "First Sale", 
      description: "Complete your first successful sale",
      icon: Trophy,
      rarity: "Common",
      points: 100,
      earnedDate: "15 Juli 2024",
      reward: "Rp 50.000 bonus"
    }
  ],
  available: [
    {
      id: "ach_005",
      title: "Platinum Seller",
      description: "Complete 50 successful sales",
      icon: Crown,
      rarity: "Legendary", 
      points: 2000,
      progress: 21,
      maxProgress: 50,
      reward: "VIP status + Rp 1.000.000"
    }
  ]
}

const walletBalance = {
  available: "Rp 32.450.000",
  pending: "Rp 12.300.000",
  total: "Rp 44.750.000"
}

const transactionHistory = [
  {
    id: "tx_001",
    type: "incoming",
    amount: "Rp 15.000.000",
    description: "Payment for Indonesian Heritage #001",
    method: "DANA",
    status: "completed",
    date: "15 Juli 2024",
    time: "14:30",
    from: "heritage_collector",
    fee: "Rp 75.000"
  }
]

// Enhanced Sidebar Component
function ModernSidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed 
}: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) {
  const menuItems = [
    { id: "orders", label: "Order Saya", icon: ShoppingCart, count: 5 },
    { id: "marketplace", label: "Marketplace", icon: Home, special: true },
    { id: "awards", label: "Awards", icon: Trophy, badge: "Premium" },
    { id: "assets", label: "Aset Saya", icon: Wallet, count: 12 },
    { id: "payments", label: "Pembayaran", icon: CreditCard },
    { id: "analytics", label: "Analytics", icon: LineChart, badge: "New" },
    { id: "settings", label: "Pengaturan", icon: Settings }
  ]

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.id === 'marketplace') {
      window.open('/marketplace', '_blank')
    } else {
      setActiveTab(item.id)
    }
  }

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-gradient-to-b from-slate-950/50 to-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 h-screen sticky top-0 flex flex-col overflow-hidden"
    >
      {/* Collapse/Expand Button */}
      <div className="p-4 border-b border-slate-700/50 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800/50"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Enhanced User Profile Section */}
      <div className={`p-6 border-b border-slate-700/50 ${isCollapsed ? 'px-4' : ''}`}>
        <div className={`flex items-center gap-4 mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <Avatar className={`ring-2 ring-blue-500/30 ${isCollapsed ? 'w-12 h-12' : 'w-16 h-16'}`}>
            <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
              {currentUser.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1"
              >
                <h3 className="font-bold text-white text-lg">{currentUser.displayName}</h3>
                <p className="text-slate-400 text-sm">@{currentUser.username}</p>
                <Badge className="mt-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                  {currentUser.level}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">{currentUser.rating}</div>
                <div className="text-xs text-slate-400">Rating</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">{currentUser.completedOrders}</div>
                <div className="text-xs text-slate-400">Orders</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Navigation with Scrolling */}
      <nav className={`flex-1 py-6 space-y-2 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-4'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => handleMenuClick(item)}
              className={`
                w-full flex items-center gap-3 py-3 rounded-xl transition-all duration-300 relative
                ${isCollapsed ? 'px-3 justify-center' : 'px-4'}
                ${item.special
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-pink-700'
                  : activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.label}</span>
                    <div className="flex gap-1">
                      {item.count && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {item.count}
                        </Badge>
                      )}
                      {item.badge && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-slate-600">
                  {item.label}
                  {item.count && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {item.count}
                    </Badge>
                  )}
                  {item.badge && (
                    <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              )}
            </button>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-slate-700/50 ${isCollapsed ? 'px-2' : ''}`}>
        <Button className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 ${isCollapsed ? 'px-2' : ''}`}>
          <Plus className="w-4 h-4" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-2"
              >
                Quick Sell
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.aside>
  )
}

// Enhanced Stats Card Component
function StatsCard({ stat, index }: { stat: typeof dashboardStats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              stat.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.description}</p>
          </div>
          
          {/* Animated border */}
          <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Performance Ring Component
function PerformanceRing({ metric, index }: { metric: typeof performanceMetrics[0]; index: number }) {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (metric.progress / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl"
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-700"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={metric.color}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, delay: index * 0.1 }}
            style={{ strokeDasharray }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{metric.progress}%</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-white">{metric.label}</h4>
        <p className="text-slate-400 text-sm">{metric.value}</p>
      </div>
    </motion.div>
  )
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Performance & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Metrics */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <PerformanceRing key={metric.label} metric={metric} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer"
                    onClick={() => action.href ? window.open(action.href, '_blank') : null}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient}`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-slate-400 text-sm">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <section>
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Recent Orders
              </CardTitle>
              <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={order.image} 
                      alt={order.assetName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{order.assetName}</h4>
                          <p className="text-slate-400 text-sm">by @{order.buyer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{order.price}</p>
                          <Badge className={`text-xs ${
                            order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

// Orders Content Component
function OrdersContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeOrderTab, setActiveOrderTab] = useState("active")

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Order Saya</h2>
          <p className="text-slate-400 mt-1">Kelola semua pesanan Anda</p>
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
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Orders</p>
                <p className="text-3xl font-bold text-white">{ordersData.active.length}</p>
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
                <p className="text-3xl font-bold text-white">{ordersData.completed.length}</p>
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
                <p className="text-3xl font-bold text-white">95%</p>
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
          <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab}>
            <TabsList className="bg-slate-800/50 border-slate-700">
              <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
                Active ({ordersData.active.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-600">
                Completed ({ordersData.completed.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4 mt-6">
              {ordersData.active.map((order) => (
                <div key={order.id} className="bg-slate-800/30 rounded-xl p-6 border-l-4 border-l-red-500 hover:bg-slate-800/50 transition-all duration-300">
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
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-6">
              {ordersData.completed.map((order) => (
                <div key={order.id} className="bg-slate-800/30 rounded-xl p-6 border-l-4 border-l-green-500 hover:bg-slate-800/50 transition-all duration-300">
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
                            Completed: {order.completedDate}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Assets Content Component  
function AssetsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeAssetTab, setActiveAssetTab] = useState("nfts")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Aset Saya</h2>
          <p className="text-slate-400 mt-1">Kelola NFT dan Token Anda</p>
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

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total NFTs</p>
                <p className="text-3xl font-bold text-white">{assetsData.nfts.length}</p>
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
                <p className="text-3xl font-bold text-white">{assetsData.tokens.length}</p>
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
                <p className="text-3xl font-bold text-white">Rp 186.100.000</p>
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
            {activeAssetTab === 'nfts' && (
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
          <Tabs value={activeAssetTab} onValueChange={setActiveAssetTab}>
            <TabsList className="bg-slate-800/50 border-slate-700">
              <TabsTrigger value="nfts" className="data-[state=active]:bg-purple-600">
                NFTs ({assetsData.nfts.length})
              </TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-blue-600">
                Tokens ({assetsData.tokens.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nfts" className="mt-6">
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {assetsData.nfts.map((nft) => (
                  viewMode === 'grid' ? (
                    <div key={nft.id} className="bg-slate-800/30 rounded-xl overflow-hidden hover:bg-slate-800/50 transition-all duration-300 group">
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
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={nft.id} className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300">
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
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tokens" className="space-y-4 mt-6">
              {assetsData.tokens.map((token) => (
                <div key={token.id} className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
                      <span className="text-white font-bold">{token.symbol}</span>
                    </div>
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
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Settings Content Component
function SettingsContent() {
  const [profileData, setProfileData] = useState(currentUser)
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    security: true,
    marketing: false
  })
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEarnings: false,
    showOrders: true,
    allowMessages: true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Pengaturan</h2>
          <p className="text-slate-400 mt-1">Kelola akun dan preferensi Anda</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>

      <div className="max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-slate-800/50 border-slate-700 grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-600">
              <Shield className="w-4 h-4 mr-2" />
              Keamanan
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-yellow-600">
              <Bell className="w-4 h-4 mr-2" />
              Notifikasi
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-green-600">
              <Settings className="w-4 h-4 mr-2" />
              Privasi
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Informasi Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} alt={profileData.username} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                      {profileData.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold text-lg">{profileData.displayName}</h3>
                      {profileData.isVerified && (
                        <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>
                      )}
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        {profileData.level}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">@{profileData.username}</p>
                    <Button size="sm" variant="outline" className="mt-3 border-slate-600 text-slate-400 hover:text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Ubah Foto
                    </Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="displayName" className="text-slate-300">Nama Tampilan</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-slate-300">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-slate-300">Lokasi</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-slate-300">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                    placeholder="Ceritakan tentang diri Anda..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Keamanan Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Ubah Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-slate-300">Password Saat Ini</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 pr-10"
                          placeholder="Masukkan password saat ini"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-slate-300">Password Baru</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        placeholder="Masukkan password baru"
                      />
                    </div>
                  </div>
                </div>

                {/* Two Factor Authentication */}
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-white font-semibold mb-4">Autentikasi Dua Faktor</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">SMS Authentication</p>
                          <p className="text-slate-400 text-sm">Terima kode verifikasi via SMS</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Email Authentication</p>
                          <p className="text-slate-400 text-sm">Terima kode verifikasi via email</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Preferensi Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Metode Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-slate-400 text-sm">Terima notifikasi via email</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-slate-400 text-sm">Terima notifikasi push di browser</p>
                      </div>
                      <Switch 
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-white font-semibold mb-4">Jenis Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Trading Activities</p>
                        <p className="text-slate-400 text-sm">Order updates, payment received, etc.</p>
                      </div>
                      <Switch 
                        checked={notifications.trading}
                        onCheckedChange={(checked) => setNotifications({...notifications, trading: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Security Alerts</p>
                        <p className="text-slate-400 text-sm">Login attempts, password changes, etc.</p>
                      </div>
                      <Switch 
                        checked={notifications.security}
                        onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Privasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Visibilitas Profile</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Public Profile</p>
                        <p className="text-slate-400 text-sm">Profile Anda dapat dilihat oleh semua orang</p>
                      </div>
                      <Switch 
                        checked={privacy.profilePublic}
                        onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Show Earnings</p>
                        <p className="text-slate-400 text-sm">Tampilkan total earnings di profile public</p>
                      </div>
                      <Switch 
                        checked={privacy.showEarnings}
                        onCheckedChange={(checked) => setPrivacy({...privacy, showEarnings: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-t border-slate-700 pt-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                        <p className="text-slate-300 text-sm mb-4">
                          Tindakan di bawah ini tidak dapat dibatalkan. Harap berhati-hati.
                        </p>
                        <div className="space-y-3">
                          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                            Deactivate Account
                          </Button>
                          <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Awards Content Component
function AwardsContent() {
  const [activeAwardTab, setActiveAwardTab] = useState("achievements")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-500/30'
      case 'Rare': return 'text-blue-400 border-blue-500/30'
      case 'Epic': return 'text-purple-400 border-purple-500/30'
      case 'Legendary': return 'text-yellow-400 border-yellow-500/30'
      default: return 'text-gray-400 border-gray-500/30'
    }
  }

  const earnedCount = achievementsData.earned.length
  const availableCount = achievementsData.available.length
  const totalPoints = achievementsData.earned.reduce((sum, ach) => sum + ach.points, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Awards & Achievements
        </h2>
        <p className="text-slate-400 mt-1">Raih pencapaian dan kumpulkan reward</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Achievements Earned</p>
                <p className="text-3xl font-bold text-white">{earnedCount}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Available Achievements</p>
                <p className="text-3xl font-bold text-white">{availableCount}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-white">{totalPoints.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeAwardTab} onValueChange={setActiveAwardTab}>
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="achievements" className="data-[state=active]:bg-yellow-600">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-blue-600">
            <Award className="w-4 h-4 mr-2" />
            Badges
          </TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-8 mt-8">
          {/* Earned Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Earned Achievements ({earnedCount})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievementsData.earned.map((achievement) => (
                <div key={achievement.id} className={`
                  relative overflow-hidden rounded-xl border-2 transition-all duration-300
                  bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30
                  ${getRarityColor(achievement.rarity)}
                `}>
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-green-500/20">
                        <achievement.icon className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-2 ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                        <p className="text-slate-400 text-sm">{achievement.points} pts</p>
                      </div>
                    </div>

                    <h4 className="text-white font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-slate-400 text-sm mb-4">{achievement.description}</p>

                    <div className="flex items-center gap-2 mb-3 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      Earned on {achievement.earnedDate}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400">{achievement.reward}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-400" />
              Available Achievements ({availableCount})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievementsData.available.map((achievement) => {
                const progressPercentage = achievement.maxProgress ? (achievement.progress / achievement.maxProgress) * 100 : 0
                return (
                  <div key={achievement.id} className={`
                    relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105
                    bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50
                    ${getRarityColor(achievement.rarity)}
                  `}>
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-slate-700/30">
                          <achievement.icon className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="text-right">
                          <Badge className={`mb-2 ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                          <p className="text-slate-400 text-sm">{achievement.points} pts</p>
                        </div>
                      </div>

                      <h4 className="text-white font-semibold text-lg mb-2">{achievement.title}</h4>
                      <p className="text-slate-400 text-sm mb-4">{achievement.description}</p>

                      {achievement.maxProgress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">{achievement.reward}</span>
                      </div>

                      {progressPercentage >= 100 && (
                        <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                          <Trophy className="w-4 h-4 mr-2" />
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="mt-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Your Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-500/10 rounded-xl p-6 border border-slate-700/50">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Verified Trader</h4>
                    <p className="text-slate-400 text-sm">Verified account with completed KYC</p>
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 rounded-xl p-6 border border-slate-700/50">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Fast Response</h4>
                    <p className="text-slate-400 text-sm">Average response time under 2 hours</p>
                  </div>
                </div>
                
                <div className="bg-purple-500/10 rounded-xl p-6 border border-slate-700/50">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                      <Star className="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Top Rated</h4>
                    <p className="text-slate-400 text-sm">Maintaining 4.8+ star rating</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Payments Content Component
function PaymentsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activePaymentTab, setActivePaymentTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Pembayaran
          </h2>
          <p className="text-slate-400 mt-1">Kelola pembayaran dan withdrawal</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 w-80"
            />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm">Available Balance</p>
                <p className="text-3xl font-bold text-white">{walletBalance.available}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Wallet className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-white">{walletBalance.pending}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm">Total Balance</p>
                <p className="text-3xl font-bold text-white">{walletBalance.total}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button className="h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg">
          <ArrowDownLeft className="w-6 h-6 mr-3" />
          Withdraw Funds
        </Button>
        <Button className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg">
          <Plus className="w-6 h-6 mr-3" />
          Add Payment Method
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activePaymentTab} onValueChange={setActivePaymentTab}>
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Transaction History
          </TabsTrigger>
          <TabsTrigger value="methods" className="data-[state=active]:bg-green-600">
            Payment Methods
          </TabsTrigger>
        </TabsList>

        {/* Transaction History Tab */}
        <TabsContent value="overview" className="space-y-6 mt-8">
          {/* Transaction Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white">2</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Failed</p>
                    <p className="text-2xl font-bold text-white">1</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction List */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      transaction.type === 'incoming' ? 'bg-green-500/20' : 'bg-blue-500/20'
                    }`}>
                      {transaction.type === 'incoming' ? (
                        <ArrowDownLeft className="w-6 h-6 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{transaction.description}</h3>
                          <p className="text-slate-400 text-sm">
                            {transaction.type === 'incoming' ? `From: ${transaction.from}` : `To: Bank Account`}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className={`font-bold text-lg ${
                            transaction.type === 'incoming' ? 'text-green-400' : 'text-white'
                          }`}>
                            {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount}
                          </p>
                          <Badge className="text-xs bg-green-500/20 text-green-400">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {transaction.date} • {transaction.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {transaction.method}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span>Fee: {transaction.fee}</span>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6 mt-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Payment Methods</CardTitle>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Method
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-700/30">
                      <Bank className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">BCA - 1234567890</h3>
                      <p className="text-slate-400 text-sm">Bank Central Asia</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">Default</Badge>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-700/30">
                      <Smartphone className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">DANA - 08123456789</h3>
                      <p className="text-slate-400 text-sm">DANA</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
          />
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersContent />
      case 'assets':
        return <AssetsContent />
      case 'settings':
        return <SettingsContent />
      case 'awards':
        return <AwardsContent />
      case 'payments':
        return <PaymentsContent />
      default:
        return <DashboardContent />
    }
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'orders':
        return 'Order Saya'
      case 'assets':
        return 'Aset Saya'
      case 'settings':
        return 'Pengaturan'
      case 'awards':
        return 'Awards'
      case 'payments':
        return 'Pembayaran'
      default:
        return 'Dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="flex">
        <ModernSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        
        <main className="flex-1 overflow-hidden transition-all duration-300">
          {/* Enhanced Header */}
          {activeTab === 'dashboard' && (
            <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {getPageTitle()}
                  </h1>
                  <p className="text-slate-400 mt-1">Welcome back, {currentUser.displayName}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </header>
          )}

          {/* Main Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
