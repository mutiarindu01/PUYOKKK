"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, Shield, DollarSign, TrendingUp, AlertTriangle, 
  Activity, FileText, Settings, Eye, Search, Filter,
  MoreHorizontal, CheckCircle, XCircle, Clock, Star,
  Download, Upload, RefreshCw, Bell, MessageSquare,
  BarChart3, PieChart, LineChart, Calendar, MapPin,
  Wallet, CreditCard, Ban, Unlock, Lock, Edit, Trash2,
  Plus, ArrowUpDown, ExternalLink, Flag, Target,
  Zap, Globe, Smartphone, Mail, Phone, Building2,
  Database, Server, Cpu, HardDrive, Network, Wifi,
  UserCheck, UserX, UserPlus, Crown, Award, Gavel,
  ShoppingCart, Package, Tag, Image, Coins, Receipt,
  AlertCircle, Info, HelpCircle, Headphones, BookOpen,
  Code, Terminal, Bug, Wrench, Gauge, Layers, Hash,
  QrCode, Link, Share2, Copy, Save, X, Check,
  ChevronDown, ChevronRight, ChevronLeft, ChevronUp,
  Home, Menu, LogOut, User, Briefcase, Archive
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Enhanced Admin Data Types
interface AdminUser {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "moderator" | "support"
  avatar: string
  lastActive: string
  permissions: string[]
  status: "active" | "inactive" | "suspended"
}

interface PlatformStats {
  totalUsers: number
  activeUsers24h: number
  totalTransactions: number
  revenue24h: number
  totalNFTs: number
  activeListings: number
  flaggedContent: number
  pendingVerifications: number
  supportTickets: number
  systemHealth: number
}

interface UserManagement {
  id: string
  username: string
  email: string
  kycStatus: "none" | "pending" | "verified" | "rejected"
  membershipTier: "basic" | "silver" | "gold" | "platinum"
  totalTrades: number
  successRate: number
  reputation: number
  accountValue: number
  joinDate: string
  lastActive: string
  status: "active" | "suspended" | "banned"
  flaggedActivity: number
  verificationDocuments?: string[]
}

interface ContentModeration {
  id: string
  type: "nft" | "collection" | "user_profile" | "chat_message"
  title: string
  creator: string
  reportCount: number
  status: "pending" | "approved" | "rejected" | "flagged"
  reportReasons: string[]
  submittedDate: string
  reviewedBy?: string
  thumbnailUrl?: string
}

interface TransactionMonitoring {
  id: string
  type: "nft_sale" | "token_swap" | "withdrawal" | "deposit"
  amount: number
  currency: string
  buyer: string
  seller: string
  status: "completed" | "pending" | "failed" | "suspicious"
  timestamp: string
  fees: number
  escrowId?: string
  riskScore: number
  paymentMethod: string
}

interface SystemMetrics {
  category: string
  metric: string
  current: number
  target: number
  status: "healthy" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdated: string
}

// Sample Data
const adminUser: AdminUser = {
  id: "admin-001",
  name: "Bude Putuk",
  email: "admin@puyok.com",
  role: "super_admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64",
  lastActive: new Date().toISOString(),
  permissions: ["all"],
  status: "active"
}

const platformStats: PlatformStats = {
  totalUsers: 15420,
  activeUsers24h: 2847,
  totalTransactions: 89650,
  revenue24h: 1250000000,
  totalNFTs: 45280,
  activeListings: 12450,
  flaggedContent: 23,
  pendingVerifications: 156,
  supportTickets: 89,
  systemHealth: 97.8
}

const sampleUsers: UserManagement[] = [
  {
    id: "user-001",
    username: "crypto_whale_88",
    email: "whale@example.com",
    kycStatus: "verified",
    membershipTier: "platinum",
    totalTrades: 1247,
    successRate: 99.2,
    reputation: 4.9,
    accountValue: 2450000000,
    joinDate: "2023-01-15",
    lastActive: "2024-01-20T10:30:00Z",
    status: "active",
    flaggedActivity: 0
  },
  {
    id: "user-002",
    username: "nft_collector_pro",
    email: "collector@example.com",
    kycStatus: "pending",
    membershipTier: "gold",
    totalTrades: 456,
    successRate: 95.6,
    reputation: 4.7,
    accountValue: 890000000,
    joinDate: "2023-03-22",
    lastActive: "2024-01-20T08:15:00Z",
    status: "active",
    flaggedActivity: 1
  },
  {
    id: "user-003",
    username: "suspicious_trader",
    email: "suspicious@example.com",
    kycStatus: "rejected",
    membershipTier: "basic",
    totalTrades: 23,
    successRate: 78.2,
    reputation: 3.2,
    accountValue: 45000000,
    joinDate: "2024-01-10",
    lastActive: "2024-01-19T22:45:00Z",
    status: "suspended",
    flaggedActivity: 5
  }
]

const sampleContent: ContentModeration[] = [
  {
    id: "content-001",
    type: "nft",
    title: "Suspicious NFT Collection",
    creator: "fake_artist_123",
    reportCount: 8,
    status: "pending",
    reportReasons: ["copyright_violation", "fake_artwork", "misleading_description"],
    submittedDate: "2024-01-20T09:00:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200"
  },
  {
    id: "content-002",
    type: "user_profile",
    title: "Inappropriate Profile Content",
    creator: "bad_user_456",
    reportCount: 3,
    status: "flagged",
    reportReasons: ["inappropriate_content", "spam"],
    submittedDate: "2024-01-19T15:30:00Z",
    reviewedBy: "mod-001"
  }
]

const sampleTransactions: TransactionMonitoring[] = [
  {
    id: "tx-001",
    type: "nft_sale",
    amount: 125000000,
    currency: "IDR",
    buyer: "crypto_whale_88",
    seller: "digital_artist_pro",
    status: "completed",
    timestamp: "2024-01-20T10:15:00Z",
    fees: 6250000,
    riskScore: 15,
    paymentMethod: "DANA"
  },
  {
    id: "tx-002",
    type: "withdrawal",
    amount: 500000000,
    currency: "IDR",
    buyer: "",
    seller: "suspicious_trader",
    status: "suspicious",
    timestamp: "2024-01-20T08:30:00Z",
    fees: 2500000,
    riskScore: 85,
    paymentMethod: "Bank Transfer"
  }
]

const systemMetrics: SystemMetrics[] = [
  { category: "Performance", metric: "API Response Time", current: 125, target: 200, status: "healthy", trend: "down", lastUpdated: "2 min ago" },
  { category: "Security", metric: "Failed Login Attempts", current: 23, target: 50, status: "healthy", trend: "stable", lastUpdated: "1 min ago" },
  { category: "Database", metric: "Query Performance", current: 89, target: 100, status: "warning", trend: "down", lastUpdated: "5 min ago" },
  { category: "Network", metric: "CDN Cache Hit Rate", current: 94.5, target: 95, status: "warning", trend: "up", lastUpdated: "3 min ago" }
]

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedUser, setSelectedUser] = useState<UserManagement | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentModeration | null>(null)
  const [showContentModal, setShowContentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [timeRange, setTimeRange] = useState("24h")
  const [refreshing, setRefreshing] = useState(false)

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "verified":
      case "healthy": return "text-green-400 bg-green-500/20"
      case "pending":
      case "warning": return "text-yellow-400 bg-yellow-500/20"
      case "suspended":
      case "failed":
      case "rejected":
      case "critical": return "text-red-400 bg-red-500/20"
      case "suspicious":
      case "flagged": return "text-orange-400 bg-orange-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "High", color: "text-red-400" }
    if (score >= 40) return { level: "Medium", color: "text-yellow-400" }
    return { level: "Low", color: "text-green-400" }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  // Sidebar Navigation
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
    { id: "users", label: "User Management", icon: Users, badge: String(sampleUsers.filter(u => u.status === "suspended").length) },
    { id: "content", label: "Content Moderation", icon: Shield, badge: String(sampleContent.filter(c => c.status === "pending").length) },
    { id: "transactions", label: "Transactions", icon: DollarSign, badge: String(sampleTransactions.filter(t => t.status === "suspicious").length) },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
    { id: "security", label: "Security Center", icon: Lock, badge: "12" },
    { id: "system", label: "System Health", icon: Gauge, badge: null },
    { id: "support", label: "Support Tickets", icon: Headphones, badge: String(platformStats.supportTickets) },
    { id: "settings", label: "Admin Settings", icon: Settings, badge: null }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 min-h-screen sticky top-0">
          {/* Admin Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">PUYOK Admin</h1>
                <p className="text-xs text-slate-400">Internal Control Panel</p>
              </div>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
                <AvatarFallback>{adminUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{adminUser.name}</p>
                <p className="text-xs text-slate-400 capitalize">{adminUser.role.replace('_', ' ')}</p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 text-xs">Online</Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge className={`text-xs ${
                    parseInt(item.badge) > 0 ? "bg-red-500/20 text-red-400" : "bg-slate-600/20 text-slate-400"
                  }`}>
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* System Status */}
          <div className="p-4 border-t border-slate-700/50 mt-auto">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-300">System Health</span>
                <span className="text-xs text-green-400">{platformStats.systemHealth}%</span>
              </div>
              <Progress value={platformStats.systemHealth} className="h-1.5" />
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                All systems operational
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Header */}
          <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">
                  {activeSection.replace('_', ' ')}
                </h2>
                <p className="text-slate-400 text-sm">
                  {activeSection === "dashboard" && "Overview of platform performance and key metrics"}
                  {activeSection === "users" && "Manage user accounts, verification, and permissions"}
                  {activeSection === "content" && "Review and moderate user-generated content"}
                  {activeSection === "transactions" && "Monitor financial transactions and detect fraud"}
                  {activeSection === "analytics" && "Detailed analytics and business intelligence"}
                  {activeSection === "security" && "Security monitoring and threat detection"}
                  {activeSection === "system" && "System performance and infrastructure monitoring"}
                  {activeSection === "support" && "Customer support ticket management"}
                  {activeSection === "settings" && "Administrative settings and configuration"}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-slate-600 text-slate-300"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Dashboard Overview */}
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Total Users</p>
                          <p className="text-2xl font-bold text-white">{formatNumber(platformStats.totalUsers)}</p>
                          <p className="text-green-400 text-sm">+12.5% from last month</p>
                        </div>
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">24h Revenue</p>
                          <p className="text-2xl font-bold text-white">{formatCurrency(platformStats.revenue24h)}</p>
                          <p className="text-green-400 text-sm">+8.3% from yesterday</p>
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
                          <p className="text-slate-400 text-sm">Active Listings</p>
                          <p className="text-2xl font-bold text-white">{formatNumber(platformStats.activeListings)}</p>
                          <p className="text-blue-400 text-sm">+156 new today</p>
                        </div>
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                          <Package className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Pending Issues</p>
                          <p className="text-2xl font-bold text-white">{platformStats.flaggedContent + platformStats.pendingVerifications}</p>
                          <p className="text-yellow-400 text-sm">Needs attention</p>
                        </div>
                        <div className="p-3 bg-yellow-500/20 rounded-xl">
                          <AlertTriangle className="w-6 h-6 text-yellow-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & System Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Recent Platform Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">New user verification approved</p>
                          <p className="text-slate-400 text-xs">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">High-value transaction detected</p>
                          <p className="text-slate-400 text-xs">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">Content flagged for review</p>
                          <p className="text-slate-400 text-xs">12 minutes ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-purple-400" />
                        System Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {systemMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-sm">{metric.metric}</span>
                              <Badge className={getStatusColor(metric.status)}>
                                {metric.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={(metric.current / metric.target) * 100} className="flex-1 h-2" />
                              <span className="text-xs text-slate-400">{metric.current}/{metric.target}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeSection === "users" && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-800 border-slate-600"
                    />
                  </div>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                {/* Users Table */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-white">{user.username}</h4>
                                <Badge className={getStatusColor(user.kycStatus)}>
                                  {user.kycStatus}
                                </Badge>
                                <Badge className={`${
                                  user.membershipTier === "platinum" ? "bg-purple-500/20 text-purple-400" :
                                  user.membershipTier === "gold" ? "bg-yellow-500/20 text-yellow-400" :
                                  user.membershipTier === "silver" ? "bg-slate-500/20 text-slate-400" :
                                  "bg-slate-600/20 text-slate-300"
                                }`}>
                                  {user.membershipTier}
                                </Badge>
                              </div>
                              <p className="text-slate-400 text-sm">{user.email}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                <span>{user.totalTrades} trades</span>
                                <span>{user.successRate}% success</span>
                                <span>⭐ {user.reputation}</span>
                                <span>{formatCurrency(user.accountValue)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                            {user.flaggedActivity > 0 && (
                              <Badge className="bg-red-500/20 text-red-400">
                                {user.flaggedActivity} flags
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user)
                                setShowUserModal(true)
                              }}
                              className="border-slate-600 text-slate-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Content Moderation */}
            {activeSection === "content" && (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      Content Moderation Queue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleContent.map((content) => (
                        <div key={content.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center gap-4">
                            {content.thumbnailUrl && (
                              <img src={content.thumbnailUrl} alt={content.title} className="w-16 h-16 rounded-lg object-cover" />
                            )}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-white">{content.title}</h4>
                                <Badge className={`${
                                  content.type === "nft" ? "bg-purple-500/20 text-purple-400" :
                                  content.type === "collection" ? "bg-blue-500/20 text-blue-400" :
                                  "bg-slate-500/20 text-slate-400"
                                }`}>
                                  {content.type}
                                </Badge>
                              </div>
                              <p className="text-slate-400 text-sm">by {content.creator}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-red-500/20 text-red-400">
                                  {content.reportCount} reports
                                </Badge>
                                <div className="flex gap-1">
                                  {content.reportReasons.slice(0, 2).map((reason, index) => (
                                    <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                                      {reason.replace('_', ' ')}
                                    </Badge>
                                  ))}
                                  {content.reportReasons.length > 2 && (
                                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                      +{content.reportReasons.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(content.status)}>
                              {content.status}
                            </Badge>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Transaction Monitoring */}
            {activeSection === "transactions" && (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      Transaction Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleTransactions.map((tx) => {
                        const risk = getRiskLevel(tx.riskScore)
                        return (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${
                                tx.type === "nft_sale" ? "bg-purple-500/20" :
                                tx.type === "token_swap" ? "bg-blue-500/20" :
                                tx.type === "withdrawal" ? "bg-red-500/20" :
                                "bg-green-500/20"
                              }`}>
                                {tx.type === "nft_sale" && <Package className="w-5 h-5 text-purple-400" />}
                                {tx.type === "token_swap" && <ArrowUpDown className="w-5 h-5 text-blue-400" />}
                                {tx.type === "withdrawal" && <Download className="w-5 h-5 text-red-400" />}
                                {tx.type === "deposit" && <Upload className="w-5 h-5 text-green-400" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-white">{formatCurrency(tx.amount)}</h4>
                                  <Badge className={getStatusColor(tx.status)}>
                                    {tx.status}
                                  </Badge>
                                </div>
                                <p className="text-slate-400 text-sm">
                                  {tx.buyer && tx.seller ? `${tx.buyer} ↔ ${tx.seller}` : tx.seller || tx.buyer}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                  <span>{tx.paymentMethod}</span>
                                  <span>Fee: {formatCurrency(tx.fees)}</span>
                                  <span className={risk.color}>Risk: {risk.level} ({tx.riskScore}%)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {tx.riskScore > 70 && (
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                  <Flag className="w-4 h-4 mr-1" />
                                  Review
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                  User Management - {selectedUser.username}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Detailed user information and administrative actions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Username</Label>
                    <p className="text-white">{selectedUser.username}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">KYC Status</Label>
                    <Badge className={getStatusColor(selectedUser.kycStatus)}>
                      {selectedUser.kycStatus}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Membership Tier</Label>
                    <Badge className={`${
                      selectedUser.membershipTier === "platinum" ? "bg-purple-500/20 text-purple-400" :
                      selectedUser.membershipTier === "gold" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-slate-500/20 text-slate-400"
                    }`}>
                      {selectedUser.membershipTier}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Total Trades</Label>
                    <p className="text-white">{selectedUser.totalTrades}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Success Rate</Label>
                    <p className="text-white">{selectedUser.successRate}%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-slate-600">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-400">
                    <Lock className="w-4 h-4 mr-2" />
                    Suspend
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-400">
                    <Ban className="w-4 h-4 mr-2" />
                    Ban User
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
