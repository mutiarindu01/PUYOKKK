"use client"

import { useState } from "react"
import Link from "next/link"
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
  Plus,
  CreditCard,
  Wallet,
  Bank,
  Smartphone,
  TrendingUp,
  TrendingDown,
  Calendar,
  MoreHorizontal,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react"

// Payment methods data
const paymentMethods = [
  {
    id: "pm_001",
    type: "Bank Transfer",
    name: "BCA - 1234567890",
    provider: "Bank Central Asia",
    isDefault: true,
    isVerified: true,
    icon: Bank,
    color: "text-blue-400"
  },
  {
    id: "pm_002", 
    type: "E-Wallet",
    name: "DANA - 08123456789",
    provider: "DANA",
    isDefault: false,
    isVerified: true,
    icon: Smartphone,
    color: "text-green-400"
  },
  {
    id: "pm_003",
    type: "E-Wallet", 
    name: "GoPay - 08198765432",
    provider: "GoPay",
    isDefault: false,
    isVerified: true,
    icon: Smartphone,
    color: "text-purple-400"
  },
  {
    id: "pm_004",
    type: "E-Wallet",
    name: "OVO - 08187654321", 
    provider: "OVO",
    isDefault: false,
    isVerified: false,
    icon: Smartphone,
    color: "text-yellow-400"
  }
]

// Transaction history data
const transactionHistory = [
  {
    id: "tx_001",
    type: "incoming",
    amount: "Rp 15.000.000",
    description: "Payment for Indonesian Heritage #001",
    orderId: "ORD-001",
    method: "DANA",
    status: "completed",
    date: "15 Juli 2024",
    time: "14:30",
    from: "heritage_collector",
    fee: "Rp 75.000"
  },
  {
    id: "tx_002",
    type: "outgoing", 
    amount: "Rp 2.500.000",
    description: "Withdrawal to Bank BCA",
    method: "Bank Transfer",
    status: "completed", 
    date: "14 Juli 2024",
    time: "09:15",
    to: "BCA - 1234567890",
    fee: "Rp 5.000"
  },
  {
    id: "tx_003",
    type: "incoming",
    amount: "Rp 8.750.000", 
    description: "Payment for Bali Sunset #25",
    orderId: "ORD-003",
    method: "GoPay",
    status: "completed",
    date: "13 Juli 2024", 
    time: "16:45",
    from: "art_enthusiast",
    fee: "Rp 43.750"
  },
  {
    id: "tx_004",
    type: "incoming",
    amount: "Rp 12.300.000",
    description: "Payment for Jakarta Street Art #12", 
    orderId: "ORD-004",
    method: "DANA",
    status: "pending",
    date: "12 Juli 2024",
    time: "11:20",
    from: "urban_collector",
    fee: "Rp 61.500"
  },
  {
    id: "tx_005",
    type: "outgoing",
    amount: "Rp 5.000.000",
    description: "Withdrawal to DANA",
    method: "DANA", 
    status: "failed",
    date: "10 Juli 2024",
    time: "13:00",
    to: "DANA - 08123456789",
    fee: "Rp 25.000",
    failureReason: "Insufficient balance"
  }
]

// Wallet balance data
const walletBalance = {
  available: "Rp 32.450.000",
  pending: "Rp 12.300.000",
  total: "Rp 44.750.000"
}

function PaymentMethodCard({ method }: { method: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-slate-700/30`}>
            <method.icon className={`w-6 h-6 ${method.color}`} />
          </div>
          <div>
            <h3 className="text-white font-semibold">{method.name}</h3>
            <p className="text-slate-400 text-sm">{method.provider}</p>
            <div className="flex items-center gap-2 mt-2">
              {method.isDefault && (
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">Default</Badge>
              )}
              {method.isVerified ? (
                <Badge className="bg-green-500/20 text-green-400 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-slate-300 hover:text-white">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Set as Default
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:text-red-300">
              Remove Method
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

function TransactionCard({ transaction }: { transaction: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const isIncoming = transaction.type === 'incoming'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${
          isIncoming ? 'bg-green-500/20' : 'bg-blue-500/20'
        }`}>
          {isIncoming ? (
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
                {isIncoming ? `From: ${transaction.from}` : `To: ${transaction.to}`}
              </p>
              {transaction.orderId && (
                <p className="text-slate-500 text-xs">Order ID: {transaction.orderId}</p>
              )}
            </div>
            
            <div className="text-right">
              <p className={`font-bold text-lg ${
                isIncoming ? 'text-green-400' : 'text-white'
              }`}>
                {isIncoming ? '+' : '-'}{transaction.amount}
              </p>
              <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
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
          
          {transaction.failureReason && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">Failed: {transaction.failureReason}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const completedTransactions = transactionHistory.filter(tx => tx.status === 'completed')
  const pendingTransactions = transactionHistory.filter(tx => tx.status === 'pending')
  const failedTransactions = transactionHistory.filter(tx => tx.status === 'failed')

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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Pembayaran
              </h1>
              <p className="text-slate-400 mt-1">Kelola pembayaran dan withdrawal</p>
            </div>
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
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                      <p className="text-2xl font-bold text-white">{completedTransactions.length}</p>
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
                      <p className="text-2xl font-bold text-white">{pendingTransactions.length}</p>
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
                      <p className="text-2xl font-bold text-white">{failedTransactions.length}</p>
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
                  <TransactionCard key={transaction.id} transaction={transaction} />
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
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
