"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Eye,
  Package,
  Star,
  ArrowRight,
  Search,
  Filter,
  MoreHorizontal,
  DollarSign,
  Activity
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import NotificationCenter from "@/components/NotificationCenter"

// Sample user data
const currentUser = {
  username: "crypto_trader88",
  avatar: "/placeholder.svg?height=40&width=40",
  joinDate: "Januari 2023",
  totalEarnings: "Rp 45.250.000",
  totalOrders: 23,
  completedOrders: 21,
  rating: 4.8,
  level: "Gold Trader"
}

// Sample orders data
const sampleOrders = [
  {
    id: "ORD-001",
    type: "NFT",
    assetName: "Bored Ape #1234",
    price: "Rp 15.000.000",
    buyer: "nft_collector99",
    buyerAvatar: "/placeholder.svg?height=32&width=32",
    status: "pending_payment",
    timeLeft: "2h 15m",
    paymentMethod: "DANA",
    date: "15 Juli 2024",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    id: "ORD-002", 
    type: "Token",
    assetName: "1,000 USDT",
    price: "Rp 15.500.000",
    buyer: "stable_investor",
    buyerAvatar: "/placeholder.svg?height=32&width=32",
    status: "in_progress",
    paymentMethod: "GoPay",
    date: "14 Juli 2024",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    id: "ORD-003",
    type: "NFT", 
    assetName: "CryptoPunk #5678",
    price: "Rp 45.000.000",
    buyer: "pixel_art_fan",
    buyerAvatar: "/placeholder.svg?height=32&width=32",
    status: "completed",
    paymentMethod: "Bank Transfer",
    date: "12 Juli 2024",
    image: "/placeholder.svg?height=80&width=80"
  }
]

// Sample notifications
const notifications = [
  {
    id: 1,
    title: "Pembayaran Diterima",
    message: "nft_collector99 telah mengirim pembayaran untuk Bored Ape #1234",
    time: "5 menit lalu",
    type: "payment",
    unread: true
  },
  {
    id: 2,
    title: "Order Baru",
    message: "stable_investor ingin membeli 1,000 USDT Anda",
    time: "1 jam lalu", 
    type: "order",
    unread: true
  },
  {
    id: 3,
    title: "Transaksi Selesai",
    message: "Penjualan CryptoPunk #5678 berhasil diselesaikan",
    time: "2 hari lalu",
    type: "success",
    unread: false
  }
]

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "orders", label: "Order Saya", icon: ShoppingCart, count: 2 },
    { id: "marketplace", label: "Marketplace", icon: Home },
    { id: "awards-marketplace", label: "Awards Marketplace", icon: Trophy, badge: "Premium" },
    { id: "assets", label: "Aset Saya", icon: Wallet, count: 12 },
    { id: "payments", label: "Akun Pembayaran", icon: CreditCard },
    { id: "settings", label: "Pengaturan", icon: Settings },
    { id: "referral", label: "Referral", icon: Users, badge: "New" }
  ]

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
            <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{currentUser.username}</h3>
            <Badge variant="secondary" className="text-xs">{currentUser.level}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-primary/10 rounded-lg">
            <div className="font-bold text-primary">{currentUser.completedOrders}</div>
            <div className="text-muted-foreground text-xs">Orders</div>
          </div>
          <div className="text-center p-2 bg-green-500/10 rounded-lg">
            <div className="font-bold text-green-600">{currentUser.rating}</div>
            <div className="text-muted-foreground text-xs">Rating</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary-foreground' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <Badge 
                    variant={activeTab === item.id ? "secondary" : "default"} 
                    className="text-xs h-5 px-2"
                  >
                    {item.count}
                  </Badge>
                )}
                {item.badge && (
                  <Badge variant="destructive" className="text-xs h-5 px-2">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total Pendapatan</div>
          <div className="text-2xl font-bold text-foreground">{currentUser.totalEarnings}</div>
          <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12.5% bulan ini</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

function DashboardHeader() {
  return (
    <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Kelola bisnis digital Anda dengan mudah</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari order, aset..."
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                  <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{currentUser.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="text-destructive">
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function OrdersTab() {
  const [orderFilter, setOrderFilter] = useState("all")
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_payment":
        return <Badge variant="destructive" className="gap-1"><Clock className="w-3 h-3" />Menunggu Pembayaran</Badge>
      case "in_progress":
        return <Badge variant="default" className="gap-1"><Activity className="w-3 h-3" />Dalam Proses</Badge>
      case "completed":
        return <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" />Selesai</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatTimeLeft = (timeLeft: string | undefined) => {
    if (!timeLeft) return null
    return (
      <div className="flex items-center gap-1 text-orange-600 text-sm font-medium">
        <Clock className="w-3 h-3" />
        {timeLeft}
      </div>
    )
  }

  const pendingOrders = sampleOrders.filter(order => order.status === "pending_payment")
  const activeOrders = sampleOrders.filter(order => order.status === "in_progress")
  const completedOrders = sampleOrders.filter(order => order.status === "completed")

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12">
      <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button size="lg" className="gap-2" asChild>
        <Link href="/create-listing">
          <Plus className="w-5 h-5" />
          Jual Aset Pertama Anda
        </Link>
      </Button>
    </div>
  )

  if (sampleOrders.length === 0) {
    return (
      <EmptyState 
        title="Anda belum punya order aktif"
        description="Ayo jual aset pertama Anda dan mulai menghasilkan keuntungan!"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">{pendingOrders.length}</div>
            <div className="text-sm text-muted-foreground">Menunggu Pembayaran</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{activeOrders.length}</div>
            <div className="text-sm text-muted-foreground">Dalam Proses</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
            <div className="text-sm text-muted-foreground">Selesai</div>
          </Card>
        </div>
        
        <Button
          size="lg"
          className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/create-listing">
            <Plus className="w-5 h-5" />
            Jual Aset Baru
          </Link>
        </Button>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Menunggu Pembayaran ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-2">
            <Activity className="w-4 h-4" />
            Dalam Proses ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Selesai ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="p-4 border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={order.image} 
                      alt={order.assetName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{order.assetName}</h3>
                      <p className="text-2xl font-bold text-primary">{order.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={order.buyerAvatar} alt={order.buyer} />
                          <AvatarFallback>{order.buyer[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Pembeli: {order.buyer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(order.status)}
                    {formatTimeLeft(order.timeLeft)}
                    <div className="text-sm text-muted-foreground">via {order.paymentMethod}</div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="p-4 border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={order.image} 
                      alt={order.assetName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{order.assetName}</h3>
                      <p className="text-2xl font-bold text-primary">{order.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={order.buyerAvatar} alt={order.buyer} />
                          <AvatarFallback>{order.buyer[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Pembeli: {order.buyer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(order.status)}
                    <div className="text-sm text-muted-foreground">via {order.paymentMethod}</div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <Card key={order.id} className="p-4 border-l-4 border-l-green-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={order.image} 
                      alt={order.assetName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{order.assetName}</h3>
                      <p className="text-2xl font-bold text-primary">{order.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={order.buyerAvatar} alt={order.buyer} />
                          <AvatarFallback>{order.buyer[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Pembeli: {order.buyer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(order.status)}
                    <div className="text-sm text-muted-foreground">via {order.paymentMethod}</div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Settings className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button variant="outline">
        Segera Hadir
      </Button>
    </div>
  )
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("orders")

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />
      case "marketplace":
        return <PlaceholderTab title="Marketplace" description="Jelajahi aset digital dari seluruh pengguna" />
      case "awards-marketplace":
        window.location.href = '/awards-marketplace'
        return <PlaceholderTab title="Awards Marketplace" description="Perdagangkan NFT penghargaan eksklusif" />
      case "assets":
        return <PlaceholderTab title="Aset Saya" description="Lihat semua NFT dan token yang Anda miliki" />
      case "payments":
        return <PlaceholderTab title="Akun Pembayaran" description="Kelola metode pembayaran Anda" />
      case "settings":
        window.location.href = '/settings'
        return <PlaceholderTab title="Pengaturan" description="Atur preferensi akun Anda" />
      case "referral":
        window.location.href = '/referral'
        return <PlaceholderTab title="Program Referral" description="Ajak teman dan dapatkan komisi" />
      default:
        return <OrdersTab />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
