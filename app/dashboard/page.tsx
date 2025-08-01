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
  Menu,
  ChevronLeft,
  ChevronRight,
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
  RefreshCw
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Enhanced user data with more metrics
const currentUser = {
  username: "crypto_trader88",
  displayName: "Crypto Trader Pro",
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
  badges: ["Verified", "Top Trader", "Fast Response"]
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
    href: "/awards"
  },
  {
    title: "Account Settings",
    description: "Manage your profile",
    icon: Settings,
    gradient: "from-gray-500 to-slate-600",
    href: "/settings"
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
  const router = useRouter()
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { id: "orders", label: "Order Saya", icon: ShoppingCart, count: 5, href: "/orders" },
    { id: "marketplace", label: "Marketplace", icon: Home, href: "/marketplace" },
    { id: "awards", label: "Awards", icon: Trophy, badge: "Premium", href: "/awards" },
    { id: "assets", label: "Aset Saya", icon: Wallet, count: 12, href: "/assets" },
    { id: "payments", label: "Pembayaran", icon: CreditCard, href: "/payments" },
    { id: "analytics", label: "Analytics", icon: LineChart, badge: "New", href: "/analytics" },
    { id: "settings", label: "Pengaturan", icon: Settings, href: "/settings" }
  ]

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setActiveTab(item.id)
    if (item.href && item.href !== '/dashboard') {
      router.push(item.href)
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

      {/* Enhanced Navigation */}
      <nav className={`flex-1 py-6 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => handleMenuClick(item)}
              className={`
                w-full flex items-center gap-3 py-3 rounded-xl transition-all duration-300 relative
                ${isCollapsed ? 'px-3 justify-center' : 'px-4'}
                ${activeTab === item.id
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
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
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
          <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dashboard
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

          {/* Main Content */}
          <div className="p-8 space-y-8">
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
                        <Link href={action.href}>
                          <div className="p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer">
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
                        </Link>
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
        </main>
      </div>
    </div>
  )
}
