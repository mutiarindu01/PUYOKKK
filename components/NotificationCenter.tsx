"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  DollarSign,
  CheckCircle,
  Trophy,
  MessageCircle,
  AlertCircle,
  Star,
  Users,
  Megaphone,
  Gift,
  Clock,
  Eye,
  ExternalLink,
  Settings,
  Mail,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

// Sample notification data
const notifications = [
  {
    id: "notif-001",
    type: "sales",
    category: "payment",
    icon: <DollarSign className="w-5 h-5 text-green-500" />,
    title: "Pembayaran Diterima",
    message: "Pembeli @crypto_collector99 telah mengupload bukti pembayaran untuk order 'Batik Modern Genesis #1'.",
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    actionUrl: "/dashboard",
    actionLabel: "Lihat Order",
  },
  {
    id: "notif-002", 
    type: "sales",
    category: "completion",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    title: "Transaksi Selesai",
    message: "Selamat! Transaksi 'Indonesian Landscape Collection' telah selesai. Dana telah masuk ke rekening Anda.",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    actionUrl: "/dashboard",
    actionLabel: "Lihat Detail",
  },
  {
    id: "notif-003",
    type: "community",
    category: "award",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    title: "NFT Penghargaan Baru!",
    message: "Kejutan! Anda mendapatkan NFT penghargaan baru: 'Top Creator Q4 2024'. Cek di profilmu!",
    time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: true,
    actionUrl: "/profile/rafly_art",
    actionLabel: "Lihat Profil",
  },
  {
    id: "notif-004",
    type: "sales",
    category: "order",
    icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
    title: "Order Baru",
    message: "art_enthusiast ingin membeli 'Wayang Digital Reimagined' seharga Rp 3.200.000. Segera respon!",
    time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    actionUrl: "/dashboard",
    actionLabel: "Respon Sekarang",
  },
  {
    id: "notif-005",
    type: "community",
    category: "announcement",
    icon: <Megaphone className="w-5 h-5 text-purple-500" />,
    title: "Fitur Baru: Mobile App",
    message: "PUYOK Mobile App untuk iOS dan Android sudah tersedia! Download sekarang untuk pengalaman trading yang lebih mudah.",
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    actionUrl: "/help",
    actionLabel: "Pelajari Lebih",
  },
  {
    id: "notif-006",
    type: "sales",
    category: "dispute",
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    title: "Sengketa Memerlukan Perhatian",
    message: "Ada sengketa untuk transaksi 'Nusantara Stories #5'. Tim support akan membantu menyelesaikan dalam 24 jam.",
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    actionUrl: "/dashboard",
    actionLabel: "Lihat Sengketa",
  },
  {
    id: "notif-007",
    type: "community",
    category: "rating",
    icon: <Star className="w-5 h-5 text-yellow-400" />,
    title: "Rating Baru",
    message: "heritage_collector memberikan rating 5 bintang untuk 'Borobudur Digital Heritage'. Rating Anda naik menjadi 4.9!",
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    actionUrl: "/profile/rafly_art",
    actionLabel: "Lihat Profil",
  },
  {
    id: "notif-008",
    type: "community",
    category: "community",
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    title: "Follower Baru",
    message: "digital_art_lover mulai mengikuti Anda. Anda sekarang memiliki 1,247 followers!",
    time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    isRead: true,
    actionUrl: "/profile/rafly_art",
    actionLabel: "Lihat Follower",
  },
  {
    id: "notif-009",
    type: "sales",
    category: "promotion",
    icon: <Gift className="w-5 h-5 text-pink-500" />,
    title: "Promosi Khusus",
    message: "Fee penjualan turun menjadi 1.5% untuk 7 hari ke depan! Manfaatkan untuk meningkatkan penjualan Anda.",
    time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: true,
    actionUrl: "/dashboard",
    actionLabel: "Mulai Jual",
  },
]

interface NotificationCenterProps {
  className?: string
}

export default function NotificationCenter({ className }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Calculate unread notifications count
  useEffect(() => {
    const unread = notifications.filter(notif => !notif.isRead).length
    setUnreadCount(unread)
  }, [])

  // Filter notifications by tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "sales":
        return notifications.filter(notif => notif.type === "sales")
      case "community":
        return notifications.filter(notif => notif.type === "community")
      default:
        return notifications
    }
  }

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    notification.isRead = true
    setUnreadCount(prev => prev - 1)

    // Navigate to action URL
    if (notification.actionUrl) {
      try {
        window.location.href = notification.actionUrl
      } catch (error) {
        console.error('Navigation error:', error)
      }
    }

    setIsOpen(false)
  }

  const markAllAsRead = () => {
    notifications.forEach(notif => {
      notif.isRead = true
    })
    setUnreadCount(0)
  }

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: id 
    })
  }

  const getNotificationBgColor = (category: string) => {
    switch (category) {
      case "payment": return "bg-green-50 border-green-200"
      case "completion": return "bg-blue-50 border-blue-200"
      case "award": return "bg-yellow-50 border-yellow-200"
      case "order": return "bg-purple-50 border-purple-200"
      case "dispute": return "bg-red-50 border-red-200"
      case "announcement": return "bg-indigo-50 border-indigo-200"
      case "rating": return "bg-amber-50 border-amber-200"
      case "community": return "bg-teal-50 border-teal-200"
      case "promotion": return "bg-pink-50 border-pink-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-red-500 text-white border-2 border-background"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-96 p-0 max-h-[80vh]" 
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-lg">Notifikasi</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Tandai Semua Terbaca
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{unreadCount} notifikasi belum dibaca</span>
            <span>{notifications.length} total</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 m-0 h-auto rounded-none border-b">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Semua
              <Badge variant="secondary" className="ml-2 text-xs">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="sales" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Penjualan
              <Badge variant="secondary" className="ml-2 text-xs">
                {notifications.filter(n => n.type === "sales").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Komunitas
              <Badge variant="secondary" className="ml-2 text-xs">
                {notifications.filter(n => n.type === "community").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Notification List */}
          <TabsContent value={activeTab} className="m-0 p-0">
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {getFilteredNotifications().length > 0 ? (
                  <div className="space-y-1">
                    {getFilteredNotifications().map((notification, index) => (
                      <div key={notification.id}>
                        <div
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md border ${
                            !notification.isRead 
                              ? getNotificationBgColor(notification.category) + " shadow-sm" 
                              : "bg-background hover:bg-accent border-transparent"
                          }`}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              {notification.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                )}
                              </div>
                              
                              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{getTimeAgo(notification.time)}</span>
                                </div>
                                
                                {notification.actionLabel && (
                                  <div className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                                    <span>{notification.actionLabel}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < getFilteredNotifications().length - 1 && (
                          <Separator className="my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Tidak ada notifikasi untuk kategori ini</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/30">
          <Button variant="outline" className="w-full text-sm" onClick={() => setIsOpen(false)}>
            <Eye className="w-4 h-4 mr-2" />
            Lihat Semua Notifikasi
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
