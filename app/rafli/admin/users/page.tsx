"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Users, Search, Filter, Eye, Edit, Ban, Lock, Unlock,
  UserPlus, UserX, UserCheck, MoreHorizontal, CheckCircle,
  XCircle, AlertTriangle, Crown, Award, Star, Clock,
  Mail, Phone, MapPin, Calendar, TrendingUp, ArrowUp,
  ArrowDown, Download, Upload, RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Enhanced User Data Types
interface UserData {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
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
  location?: string
  referralCode?: string
  referredBy?: string
  loyaltyPoints?: number
  warningCount?: number
  disputeCount?: number
  transactionLimits?: {
    daily: number
    monthly: number
    used: { daily: number; monthly: number }
  }
}

// Sample Users Data
const sampleUsers: UserData[] = [
  {
    id: "user-001",
    username: "crypto_whale_88",
    email: "whale@example.com",
    phone: "+62812-3456-7890",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64",
    kycStatus: "verified",
    membershipTier: "platinum",
    totalTrades: 1247,
    successRate: 99.2,
    reputation: 4.9,
    accountValue: 2450000000,
    joinDate: "2023-01-15",
    lastActive: "2024-01-20T10:30:00Z",
    status: "active",
    flaggedActivity: 0,
    location: "Jakarta, Indonesia",
    referralCode: "WHALE2023",
    loyaltyPoints: 15420,
    warningCount: 0,
    disputeCount: 0,
    transactionLimits: {
      daily: 1000000000,
      monthly: 25000000000,
      used: { daily: 245000000, monthly: 3200000000 }
    }
  },
  {
    id: "user-002",
    username: "nft_collector_pro",
    email: "collector@example.com",
    phone: "+62856-7890-1234",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64",
    kycStatus: "pending",
    membershipTier: "gold",
    totalTrades: 456,
    successRate: 95.6,
    reputation: 4.7,
    accountValue: 890000000,
    joinDate: "2023-03-22",
    lastActive: "2024-01-20T08:15:00Z",
    status: "active",
    flaggedActivity: 1,
    location: "Surabaya, Indonesia",
    referralCode: "COLLECT456",
    loyaltyPoints: 8920,
    warningCount: 1,
    disputeCount: 0,
    transactionLimits: {
      daily: 500000000,
      monthly: 12000000000,
      used: { daily: 156000000, monthly: 1800000000 }
    }
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
    flaggedActivity: 5,
    location: "Unknown",
    loyaltyPoints: 120,
    warningCount: 3,
    disputeCount: 2,
    transactionLimits: {
      daily: 50000000,
      monthly: 1000000000,
      used: { daily: 45000000, monthly: 890000000 }
    }
  },
  {
    id: "user-004",
    username: "art_enthusiast",
    email: "art@example.com",
    phone: "+62821-1111-2222",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64",
    kycStatus: "verified",
    membershipTier: "silver",
    totalTrades: 89,
    successRate: 92.1,
    reputation: 4.5,
    accountValue: 234000000,
    joinDate: "2023-08-12",
    lastActive: "2024-01-20T06:22:00Z",
    status: "active",
    flaggedActivity: 0,
    location: "Bandung, Indonesia",
    referralCode: "ART2023",
    loyaltyPoints: 2340,
    warningCount: 0,
    disputeCount: 0,
    transactionLimits: {
      daily: 200000000,
      monthly: 5000000000,
      used: { daily: 89000000, monthly: 780000000 }
    }
  }
]

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>(sampleUsers)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastActive")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

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

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "verified": return "text-green-400 bg-green-500/20"
      case "pending": return "text-yellow-400 bg-yellow-500/20"
      case "suspended":
      case "rejected": return "text-red-400 bg-red-500/20"
      case "banned": return "text-red-600 bg-red-600/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "text-purple-400 bg-purple-500/20"
      case "gold": return "text-yellow-400 bg-yellow-500/20"
      case "silver": return "text-slate-300 bg-slate-500/20"
      case "basic": return "text-slate-400 bg-slate-600/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getRiskLevel = (user: UserData) => {
    let riskScore = 0
    if (user.flaggedActivity > 0) riskScore += user.flaggedActivity * 10
    if (user.warningCount && user.warningCount > 0) riskScore += user.warningCount * 15
    if (user.disputeCount && user.disputeCount > 0) riskScore += user.disputeCount * 20
    if (user.successRate < 90) riskScore += 10
    if (user.kycStatus === "rejected") riskScore += 30
    if (user.kycStatus === "none") riskScore += 20

    if (riskScore >= 50) return { level: "High", color: "text-red-400", score: riskScore }
    if (riskScore >= 25) return { level: "Medium", color: "text-yellow-400", score: riskScore }
    return { level: "Low", color: "text-green-400", score: riskScore }
  }

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      if (searchTerm && !user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (statusFilter !== "all" && user.status !== statusFilter) return false
      if (kycFilter !== "all" && user.kycStatus !== kycFilter) return false
      if (tierFilter !== "all" && user.membershipTier !== tierFilter) return false
      return true
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof UserData]
      let bValue: any = b[sortBy as keyof UserData]
      
      if (sortBy === "lastActive") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleUserAction = (userId: string, action: "suspend" | "activate" | "ban" | "verify") => {
    setUsers(prev => prev.map(user => {
      if (user.id !== userId) return user
      
      switch (action) {
        case "suspend":
          return { ...user, status: "suspended" }
        case "activate":
          return { ...user, status: "active" }
        case "ban":
          return { ...user, status: "banned" }
        case "verify":
          return { ...user, kycStatus: "verified" }
        default:
          return user
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400">Manage user accounts, verification, and permissions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{formatNumber(users.length)}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(users.filter(u => u.status === "active").length)}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Verified Users</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(users.filter(u => u.kycStatus === "verified").length)}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Flagged Users</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(users.filter(u => u.flaggedActivity > 0).length)}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search users by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KYC</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Users ({filteredUsers.length})</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastActive">Last Active</SelectItem>
                  <SelectItem value="joinDate">Join Date</SelectItem>
                  <SelectItem value="totalTrades">Total Trades</SelectItem>
                  <SelectItem value="accountValue">Account Value</SelectItem>
                  <SelectItem value="reputation">Reputation</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="text-slate-400 hover:text-white"
              >
                {sortOrder === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const risk = getRiskLevel(user)
              return (
                <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{user.username}</h4>
                        <Badge className={getStatusColor(user.kycStatus)}>
                          {user.kycStatus}
                        </Badge>
                        <Badge className={getTierColor(user.membershipTier)}>
                          {user.membershipTier}
                        </Badge>
                        {user.flaggedActivity > 0 && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">
                            {user.flaggedActivity} flags
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{user.email}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>{user.totalTrades} trades</span>
                        <span>{user.successRate}% success</span>
                        <span>⭐ {user.reputation}</span>
                        <span className={risk.color}>Risk: {risk.level}</span>
                        <span>Last: {formatTimeAgo(user.lastActive)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-white font-medium">{formatCurrency(user.accountValue)}</p>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    
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
                    
                    {user.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, "suspend")}
                        className="border-yellow-600 text-yellow-400"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, "activate")}
                        className="border-green-600 text-green-400"
                      >
                        <Unlock className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                  User Details - {selectedUser.username}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Complete user information and administrative controls
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-slate-800 border-slate-700">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.username} />
                            <AvatarFallback>{selectedUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-white font-medium">{selectedUser.username}</h3>
                            <p className="text-slate-400 text-sm">{selectedUser.email}</p>
                            {selectedUser.phone && (
                              <p className="text-slate-400 text-sm">{selectedUser.phone}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-slate-400">Status</Label>
                            <Badge className={getStatusColor(selectedUser.status)}>
                              {selectedUser.status}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-slate-400">KYC Status</Label>
                            <Badge className={getStatusColor(selectedUser.kycStatus)}>
                              {selectedUser.kycStatus}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-slate-400">Tier</Label>
                            <Badge className={getTierColor(selectedUser.membershipTier)}>
                              {selectedUser.membershipTier}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-slate-400">Risk Level</Label>
                            <Badge className={`${getRiskLevel(selectedUser).color} bg-transparent border-current`}>
                              {getRiskLevel(selectedUser).level}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Trading Stats */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Trading Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-slate-400">Total Trades</Label>
                            <p className="text-white font-medium">{selectedUser.totalTrades}</p>
                          </div>
                          <div>
                            <Label className="text-slate-400">Success Rate</Label>
                            <p className="text-white font-medium">{selectedUser.successRate}%</p>
                          </div>
                          <div>
                            <Label className="text-slate-400">Reputation</Label>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-white font-medium">{selectedUser.reputation}</span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-400">Account Value</Label>
                            <p className="text-white font-medium">{formatCurrency(selectedUser.accountValue)}</p>
                          </div>
                        </div>
                        
                        {selectedUser.loyaltyPoints && (
                          <div>
                            <Label className="text-slate-400">Loyalty Points</Label>
                            <p className="text-purple-400 font-medium">{formatNumber(selectedUser.loyaltyPoints)}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Transaction Limits */}
                  {selectedUser.transactionLimits && (
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Transaction Limits</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-slate-400">Daily Limit</Label>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">
                                  {formatCurrency(selectedUser.transactionLimits.used.daily)}
                                </span>
                                <span className="text-slate-400">
                                  {formatCurrency(selectedUser.transactionLimits.daily)}
                                </span>
                              </div>
                              <Progress 
                                value={(selectedUser.transactionLimits.used.daily / selectedUser.transactionLimits.daily) * 100} 
                                className="h-2"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-slate-400">Monthly Limit</Label>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">
                                  {formatCurrency(selectedUser.transactionLimits.used.monthly)}
                                </span>
                                <span className="text-slate-400">
                                  {formatCurrency(selectedUser.transactionLimits.monthly)}
                                </span>
                              </div>
                              <Progress 
                                value={(selectedUser.transactionLimits.used.monthly / selectedUser.transactionLimits.monthly) * 100} 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="actions" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Account Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleUserAction(selectedUser.id, "verify")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verify KYC
                        </Button>
                        
                        {selectedUser.status === "active" ? (
                          <Button 
                            variant="outline"
                            className="w-full justify-start border-yellow-600 text-yellow-400"
                            onClick={() => handleUserAction(selectedUser.id, "suspend")}
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Suspend Account
                          </Button>
                        ) : (
                          <Button 
                            variant="outline"
                            className="w-full justify-start border-green-600 text-green-400"
                            onClick={() => handleUserAction(selectedUser.id, "activate")}
                          >
                            <Unlock className="w-4 h-4 mr-2" />
                            Activate Account
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-red-600 text-red-400"
                          onClick={() => handleUserAction(selectedUser.id, "ban")}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Ban Account
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Communications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start border-slate-600">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-600">
                          <Bell className="w-4 h-4 mr-2" />
                          Send Notification
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-600">
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
