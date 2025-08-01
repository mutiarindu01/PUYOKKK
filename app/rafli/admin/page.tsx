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

  return (
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

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-500/20 rounded-xl mx-auto w-fit mb-4">
              <UserPlus className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-2">User Management</h3>
            <p className="text-slate-400 text-sm">Manage user accounts and permissions</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-purple-500/20 rounded-xl mx-auto w-fit mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Content Review</h3>
            <p className="text-slate-400 text-sm">Review flagged content and reports</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-500/20 rounded-xl mx-auto w-fit mb-4">
              <BarChart3 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Analytics</h3>
            <p className="text-slate-400 text-sm">View detailed platform analytics</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-red-500/20 rounded-xl mx-auto w-fit mb-4">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Security Center</h3>
            <p className="text-slate-400 text-sm">Monitor security threats and logs</p>
          </CardContent>
        </Card>
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
