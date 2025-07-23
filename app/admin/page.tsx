"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  ArrowUpIcon,
  ArrowDownIcon
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const kpiData = [
  {
    title: "Pendapatan Hari Ini",
    value: "Rp 45.750.000",
    change: "+12.5%",
    changeType: "increase",
    icon: DollarSign,
    description: "Dibandingkan kemarin"
  },
  {
    title: "Transaksi Sukses",
    value: "127",
    change: "+8.2%",
    changeType: "increase", 
    icon: CreditCard,
    description: "24 jam terakhir"
  },
  {
    title: "Pengguna Aktif",
    value: "2,349",
    change: "-2.1%",
    changeType: "decrease",
    icon: Users,
    description: "Pengguna online saat ini"
  },
  {
    title: "Order Baru",
    value: "89",
    change: "+15.3%",
    changeType: "increase",
    icon: ShoppingCart,
    description: "Menunggu verifikasi"
  }
]

const transactionData = [
  { day: "Sen", transactions: 65, revenue: 32500000 },
  { day: "Sel", transactions: 89, revenue: 41200000 },
  { day: "Rab", transactions: 76, revenue: 38900000 },
  { day: "Kam", transactions: 134, revenue: 52100000 },
  { day: "Jum", transactions: 112, revenue: 48700000 },
  { day: "Sab", transactions: 98, revenue: 43200000 },
  { day: "Min", transactions: 127, revenue: 45750000 }
]

const recentActivity = [
  {
    id: "act001",
    type: "payment",
    user: { username: "crypto_king", avatar: "/placeholder.svg" },
    amount: "Rp 15.500.000",
    asset: "Mystic Dragon NFT",
    status: "completed",
    time: "2 menit lalu"
  },
  {
    id: "act002", 
    type: "registration",
    user: { username: "new_trader_88", avatar: "/placeholder.svg" },
    amount: null,
    asset: null,
    status: "verified",
    time: "5 menit lalu"
  },
  {
    id: "act003",
    type: "payment",
    user: { username: "nft_collector", avatar: "/placeholder.svg" },
    amount: "Rp 8.750.000",
    asset: "Galaxy Explorer Token",
    status: "pending",
    time: "12 menit lalu"
  },
  {
    id: "act004",
    type: "payment",
    user: { username: "digital_artist", avatar: "/placeholder.svg" },
    amount: "Rp 25.000.000",
    asset: "Legendary Sword NFT",
    status: "failed",
    time: "18 menit lalu"
  },
  {
    id: "act005",
    type: "registration",
    user: { username: "artist_pro_99", avatar: "/placeholder.svg" },
    amount: null,
    asset: null,
    status: "pending",
    time: "23 menit lalu"
  }
]

const pendingVerifications = [
  {
    id: "ver001",
    type: "order",
    user: { username: "buyer_123", avatar: "/placeholder.svg" },
    orderId: "ORD-789456",
    amount: "Rp 12.500.000",
    uniqueAmount: "Rp 12.500.327",
    expectedMessage: "PUYOK-ORD789456-BUYER123",
    submittedAt: "10:45 AM",
    priority: "high"
  },
  {
    id: "ver002",
    type: "order",
    user: { username: "crypto_enthusiast", avatar: "/placeholder.svg" },
    orderId: "ORD-789457",
    amount: "Rp 8.750.000",
    uniqueAmount: "Rp 8.750.142",
    expectedMessage: "PUYOK-ORD789457-CRYPTOENTHUSIAST",
    submittedAt: "09:32 AM",
    priority: "medium"
  },
  {
    id: "ver003",
    type: "order",
    user: { username: "nft_hunter", avatar: "/placeholder.svg" },
    orderId: "ORD-789458",
    amount: "Rp 35.000.000",
    uniqueAmount: "Rp 35.000.891",
    expectedMessage: "PUYOK-ORD789458-NFTHUNTER",
    submittedAt: "08:15 AM",
    priority: "urgent"
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "verified":
        return <Badge className="bg-green-500/20 text-green-500">Sukses</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-500">Gagal</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500/20 text-red-500 animate-pulse">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-500/20 text-orange-500">High</Badge>
      case "medium":
        return <Badge className="bg-blue-500/20 text-blue-500">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                🎛️ Panel Admin Internal
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Ruang kontrol rahasia untuk mengelola platform PUYOK
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-500 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-300">Admin</p>
                <p className="font-semibold text-slate-900 dark:text-white">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              📊 Overview Analytics
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              ✅ Verifikasi Order
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              👥 User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {kpi.title}
                    </CardTitle>
                    <kpi.icon className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {kpi.value}
                    </div>
                    <div className="flex items-center text-sm">
                      {kpi.changeType === "increase" ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`font-medium ${kpi.changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
                        {kpi.change}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-1">
                        {kpi.description}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Volume Chart */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    📈 Volume Transaksi (7 Hari)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === "transactions" ? `${value} transaksi` : `Rp ${value.toLocaleString()}`,
                          name === "transactions" ? "Transaksi" : "Revenue"
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="transactions" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                    💰 Pendapatan Harian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`Rp ${value.toLocaleString()}`, "Pendapatan"]}
                      />
                      <Bar 
                        dataKey="revenue" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                  ⚡ Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {activity.user.username}
                            </span>
                            {getStatusBadge(activity.status)}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {activity.type === "payment" 
                              ? `Membeli ${activity.asset} - ${activity.amount}`
                              : "Mendaftar sebagai pengguna baru"
                            }
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            {/* Quick Stats for Verification */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100">Urgent</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Pending Total</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <Clock className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Completed Today</p>
                      <p className="text-3xl font-bold">89</p>
                    </div>
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Verifications List */}
            <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                  ⏳ Order Menunggu Verifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={verification.user.avatar} />
                            <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {verification.user.username}
                              </span>
                              {getPriorityBadge(verification.priority)}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              Order ID: {verification.orderId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {verification.amount}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {verification.submittedAt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-md space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Nominal Unik yang Diharapkan:
                            </p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {verification.uniqueAmount}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Berita Transfer yang Diharapkan:
                            </p>
                            <p className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-2 rounded">
                              {verification.expectedMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Detail
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4 mr-2" />
                          Tolak
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Setujui & Lepaskan Aset
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  👥 User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  User management features will be implemented here...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
