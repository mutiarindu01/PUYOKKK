"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  XCircle, Clock, Search, Filter, Eye, Download, Flag,
  ArrowUpDown, ArrowUp, ArrowDown, Package, CreditCard,
  Wallet, Ban, Shield, Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Progress } from "@/components/ui/progress"

interface Transaction {
  id: string
  type: "nft_sale" | "token_swap" | "withdrawal" | "deposit" | "transfer"
  amount: number
  currency: string
  buyer: string
  seller: string
  status: "completed" | "pending" | "failed" | "suspicious" | "cancelled"
  timestamp: string
  fees: number
  escrowId?: string
  riskScore: number
  paymentMethod: string
  description: string
  blockchainTx?: string
  gasUsed?: number
  confirmations?: number
}

const transactions: Transaction[] = [
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
    paymentMethod: "DANA",
    description: "Indonesian Heritage NFT #001",
    blockchainTx: "0x1234...5678",
    gasUsed: 21000,
    confirmations: 12
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
    paymentMethod: "Bank Transfer",
    description: "Large withdrawal to new bank account",
    confirmations: 0
  },
  {
    id: "tx-003",
    type: "token_swap",
    amount: 50000000,
    currency: "IDR",
    buyer: "defi_trader",
    seller: "token_holder_123",
    status: "completed",
    timestamp: "2024-01-20T07:45:00Z",
    fees: 500000,
    riskScore: 25,
    paymentMethod: "MetaMask",
    description: "PUYOK to USDT swap",
    blockchainTx: "0xabcd...efgh",
    gasUsed: 65000,
    confirmations: 25
  },
  {
    id: "tx-004",
    type: "deposit",
    amount: 75000000,
    currency: "IDR",
    buyer: "new_investor",
    seller: "",
    status: "pending",
    timestamp: "2024-01-20T09:20:00Z",
    fees: 0,
    riskScore: 35,
    paymentMethod: "Bank Transfer",
    description: "Initial platform deposit",
    confirmations: 1
  },
  {
    id: "tx-005",
    type: "nft_sale",
    amount: 89000000,
    currency: "IDR",
    buyer: "collector_pro",
    seller: "gaming_artist",
    status: "failed",
    timestamp: "2024-01-20T06:10:00Z",
    fees: 4450000,
    riskScore: 45,
    paymentMethod: "OVO",
    description: "Gaming NFT - Payment failed",
    confirmations: 0
  }
]

export default function TransactionMonitoringPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
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
      case "completed": return "text-green-400 bg-green-500/20"
      case "pending": return "text-yellow-400 bg-yellow-500/20"
      case "failed": return "text-red-400 bg-red-500/20"
      case "suspicious": return "text-orange-400 bg-orange-500/20"
      case "cancelled": return "text-slate-400 bg-slate-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "High", color: "text-red-400", bgColor: "bg-red-500/20" }
    if (score >= 40) return { level: "Medium", color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
    return { level: "Low", color: "text-green-400", bgColor: "bg-green-500/20" }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "nft_sale": return <Package className="w-4 h-4" />
      case "token_swap": return <ArrowUpDown className="w-4 h-4" />
      case "withdrawal": return <ArrowUp className="w-4 h-4" />
      case "deposit": return <ArrowDown className="w-4 h-4" />
      case "transfer": return <ArrowUpDown className="w-4 h-4" />
      default: return <DollarSign className="w-4 h-4" />
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    if (searchTerm && !tx.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tx.buyer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tx.seller.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tx.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (statusFilter !== "all" && tx.status !== statusFilter) return false
    if (typeFilter !== "all" && tx.type !== typeFilter) return false
    if (riskFilter !== "all") {
      const risk = getRiskLevel(tx.riskScore).level.toLowerCase()
      if (risk !== riskFilter) return false
    }
    return true
  })

  const suspiciousTransactions = transactions.filter(tx => tx.status === "suspicious" || tx.riskScore >= 70)
  const pendingTransactions = transactions.filter(tx => tx.status === "pending")
  const recentTransactions = transactions.filter(tx => {
    const hoursSince = (Date.now() - new Date(tx.timestamp).getTime()) / (1000 * 60 * 60)
    return hoursSince <= 24
  })

  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0)
  const totalFees = transactions.reduce((sum, tx) => sum + tx.fees, 0)
  const avgTransactionValue = totalVolume / transactions.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            Transaction Monitoring
          </h1>
          <p className="text-slate-400">Monitor and analyze all platform transactions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Volume (24h)</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalVolume)}</p>
                <p className="text-green-400 text-sm">+12.5% from yesterday</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Suspicious Activity</p>
                <p className="text-2xl font-bold text-white">{suspiciousTransactions.length}</p>
                <p className="text-orange-400 text-sm">Requires attention</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Transactions</p>
                <p className="text-2xl font-bold text-white">{pendingTransactions.length}</p>
                <p className="text-yellow-400 text-sm">Awaiting confirmation</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Transaction</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(avgTransactionValue)}</p>
                <p className="text-blue-400 text-sm">Platform average</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by transaction ID, user, or description..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspicious">Suspicious</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nft_sale">NFT Sales</SelectItem>
                <SelectItem value="token_swap">Token Swaps</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
            All Transactions ({filteredTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="suspicious" className="data-[state=active]:bg-orange-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Suspicious ({suspiciousTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-600">
            <Clock className="w-4 h-4 mr-2" />
            Pending ({pendingTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-green-600">
            Recent 24h ({recentTransactions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">All Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const risk = getRiskLevel(transaction.riskScore)
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        transaction.type === "nft_sale" ? "bg-purple-500/20" :
                        transaction.type === "token_swap" ? "bg-blue-500/20" :
                        transaction.type === "withdrawal" ? "bg-red-500/20" :
                        transaction.type === "deposit" ? "bg-green-500/20" :
                        "bg-slate-500/20"
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{transaction.description}</h4>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <Badge className={`${risk.color} ${risk.bgColor}`}>
                            {risk.level} Risk
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {transaction.buyer && transaction.seller ? 
                            `${transaction.buyer} ↔ ${transaction.seller}` : 
                            transaction.buyer || transaction.seller}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span>ID: {transaction.id}</span>
                          <span>{transaction.paymentMethod}</span>
                          <span>Fee: {formatCurrency(transaction.fees)}</span>
                          <span>{formatTimeAgo(transaction.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{formatCurrency(transaction.amount)}</p>
                        <p className="text-slate-400 text-sm capitalize">{transaction.type.replace('_', ' ')}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            setShowTransactionModal(true)
                          }}
                          className="border-slate-600 text-slate-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        {transaction.riskScore >= 70 && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Flag className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Suspicious Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suspiciousTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{transaction.description}</h4>
                        <Badge className="bg-orange-500/20 text-orange-400">
                          Risk Score: {transaction.riskScore}%
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">
                        {formatCurrency(transaction.amount)} - {transaction.paymentMethod}
                      </p>
                      <p className="text-orange-400 text-sm">
                        Requires immediate review - {formatTimeAgo(transaction.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Flag className="w-4 h-4 mr-1" />
                      Investigate
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                      <Ban className="w-4 h-4 mr-1" />
                      Block
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Pending Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{transaction.description}</h4>
                      <p className="text-slate-400 text-sm">
                        {formatCurrency(transaction.amount)} - {transaction.paymentMethod}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>Confirmations: {transaction.confirmations || 0}/12</span>
                        <span>{formatTimeAgo(transaction.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress value={(transaction.confirmations || 0) / 12 * 100} className="w-20 h-2" />
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent 24h Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(transaction.status)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{transaction.description}</h4>
                      <p className="text-slate-400 text-sm">
                        {formatCurrency(transaction.amount)} - {formatTimeAgo(transaction.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Modal */}
      <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getTransactionIcon(selectedTransaction.type)}
                  Transaction Details
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Transaction ID: {selectedTransaction.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Type</p>
                    <p className="text-white capitalize">{selectedTransaction.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <Badge className={getStatusColor(selectedTransaction.status)}>
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Amount</p>
                    <p className="text-white font-bold">{formatCurrency(selectedTransaction.amount)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Fees</p>
                    <p className="text-white">{formatCurrency(selectedTransaction.fees)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Payment Method</p>
                    <p className="text-white">{selectedTransaction.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Risk Score</p>
                    <Badge className={`${getRiskLevel(selectedTransaction.riskScore).color} ${getRiskLevel(selectedTransaction.riskScore).bgColor}`}>
                      {selectedTransaction.riskScore}% - {getRiskLevel(selectedTransaction.riskScore).level}
                    </Badge>
                  </div>
                </div>

                {selectedTransaction.buyer && (
                  <div>
                    <p className="text-slate-400 text-sm">Buyer</p>
                    <p className="text-white">{selectedTransaction.buyer}</p>
                  </div>
                )}

                {selectedTransaction.seller && (
                  <div>
                    <p className="text-slate-400 text-sm">Seller</p>
                    <p className="text-white">{selectedTransaction.seller}</p>
                  </div>
                )}

                <div>
                  <p className="text-slate-400 text-sm">Description</p>
                  <p className="text-white">{selectedTransaction.description}</p>
                </div>

                {selectedTransaction.blockchainTx && (
                  <div>
                    <p className="text-slate-400 text-sm">Blockchain Transaction</p>
                    <p className="text-white font-mono text-sm">{selectedTransaction.blockchainTx}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Timestamp</p>
                    <p className="text-white">{new Date(selectedTransaction.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Confirmations</p>
                    <p className="text-white">{selectedTransaction.confirmations || 0}/12</p>
                  </div>
                </div>

                {selectedTransaction.riskScore >= 50 && (
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <h4 className="text-orange-400 font-medium mb-2">Risk Assessment</h4>
                    <p className="text-slate-300 text-sm">
                      This transaction has been flagged for manual review due to its high risk score.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
