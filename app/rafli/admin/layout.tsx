"use client"

import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home, Users, Shield, DollarSign, BarChart3, Lock,
  Gauge, Headphones, Settings, Crown, LogOut, Bell,
  Search, Menu, X, RefreshCw, Download, AlertTriangle,
  CheckCircle, Clock, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminSession {
  email: string
  name: string
  role: "super_admin" | "admin" | "moderator"
  avatar: string
  loginTime: string
  sessionId: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0)

  // Check authentication on mount and route changes
  useEffect(() => {
    checkAuthentication()
  }, [pathname])

  // Session timeout timer
  useEffect(() => {
    if (adminSession) {
      const loginTime = new Date(adminSession.loginTime).getTime()
      const sessionDuration = 8 * 60 * 60 * 1000 // 8 hours
      const expiryTime = loginTime + sessionDuration
      
      const updateTimer = () => {
        const now = Date.now()
        const timeLeft = Math.max(0, expiryTime - now)
        setSessionTimeLeft(timeLeft)
        
        if (timeLeft === 0) {
          handleSessionExpiry()
        }
      }
      
      updateTimer()
      const interval = setInterval(updateTimer, 60000) // Update every minute
      
      return () => clearInterval(interval)
    }
  }, [adminSession])

  const checkAuthentication = () => {
    try {
      const sessionData = localStorage.getItem('admin_session')
      
      if (!sessionData) {
        redirectToLogin()
        return
      }
      
      const session: AdminSession = JSON.parse(sessionData)
      
      // Check if session is still valid (8 hours)
      const loginTime = new Date(session.loginTime).getTime()
      const now = Date.now()
      const sessionDuration = 8 * 60 * 60 * 1000 // 8 hours
      
      if (now - loginTime > sessionDuration) {
        handleSessionExpiry()
        return
      }
      
      setAdminSession(session)
      setIsLoading(false)
    } catch (error) {
      console.error('Authentication check failed:', error)
      redirectToLogin()
    }
  }

  const redirectToLogin = () => {
    if (pathname !== '/rafli/admin/login') {
      router.push('/rafli/admin/login')
    }
    setIsLoading(false)
  }

  const handleSessionExpiry = () => {
    localStorage.removeItem('admin_session')
    setAdminSession(null)
    alert('Your session has expired. Please log in again.')
    router.push('/rafli/admin/login')
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    setAdminSession(null)
    router.push('/rafli/admin/login')
  }

  const formatTimeLeft = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  // Navigation items with role-based access
  const navigationItems = [
    { 
      href: "/rafli/admin", 
      label: "Dashboard", 
      icon: Home, 
      badge: null,
      description: "Overview and key metrics",
      roles: ["super_admin", "admin", "moderator"]
    },
    { 
      href: "/rafli/admin/users", 
      label: "User Management", 
      icon: Users, 
      badge: "12",
      description: "Manage users and permissions",
      roles: ["super_admin", "admin"]
    },
    { 
      href: "/rafli/admin/verification", 
      label: "Content Moderation", 
      icon: Shield, 
      badge: "5",
      description: "Review and moderate content",
      roles: ["super_admin", "admin", "moderator"]
    },
    { 
      href: "/rafli/admin/transactions", 
      label: "Transactions", 
      icon: DollarSign, 
      badge: "3",
      description: "Monitor financial activity",
      roles: ["super_admin", "admin"]
    },
    { 
      href: "/rafli/admin/analytics", 
      label: "Analytics", 
      icon: BarChart3, 
      badge: null,
      description: "Business intelligence",
      roles: ["super_admin", "admin"]
    },
    { 
      href: "/rafli/admin/security", 
      label: "Security Center", 
      icon: Lock, 
      badge: "23",
      description: "Security monitoring",
      roles: ["super_admin"]
    },
    { 
      href: "/rafli/admin/system", 
      label: "System Health", 
      icon: Gauge, 
      badge: null,
      description: "Infrastructure monitoring",
      roles: ["super_admin"]
    },
    { 
      href: "/rafli/admin/support", 
      label: "Support Tickets", 
      icon: Headphones, 
      badge: "89",
      description: "Customer support",
      roles: ["super_admin", "admin", "moderator"]
    },
    { 
      href: "/rafli/admin/settings", 
      label: "Admin Settings", 
      icon: Settings, 
      badge: null,
      description: "System configuration",
      roles: ["super_admin"]
    }
  ]

  // Filter navigation based on user role
  const filteredNavigation = navigationItems.filter(item => 
    adminSession && item.roles.includes(adminSession.role)
  )

  // Show loading or redirect if not authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 mx-auto">
            <Crown className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-white text-lg">Authenticating...</p>
          <p className="text-slate-400 text-sm">Verifying admin credentials</p>
        </div>
      </div>
    )
  }

  // Don't render layout for login page
  if (pathname === '/rafli/admin/login' || !adminSession) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Admin Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">PUYOK Admin</h1>
                <p className="text-xs text-slate-400">Secure Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={adminSession.avatar} alt={adminSession.name} />
              <AvatarFallback>{adminSession.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{adminSession.name}</p>
              <p className="text-xs text-slate-400 truncate capitalize">{adminSession.role.replace('_', ' ')}</p>
            </div>
            <div className="flex flex-col items-end">
              <Badge className="bg-blue-500/20 text-blue-400 text-xs">Online</Badge>
              {sessionTimeLeft > 0 && (
                <span className="text-xs text-slate-500 mt-1">
                  {formatTimeLeft(sessionTimeLeft)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-slate-800/50 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.label}</div>
                  {!isActive && (
                    <div className="text-xs text-slate-500 truncate group-hover:text-slate-400">
                      {item.description}
                    </div>
                  )}
                </div>
                {item.badge && (
                  <Badge className={`text-xs flex-shrink-0 ${
                    parseInt(item.badge) > 0 
                      ? "bg-red-500/20 text-red-400" 
                      : "bg-slate-600/20 text-slate-400"
                  }`}>
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Session Info */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300">Session Status</span>
              <span className="text-xs text-green-400">Active</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              Expires in {formatTimeLeft(sessionTimeLeft)}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <User className="w-3 h-3" />
              Role: {adminSession.role.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <Button 
            onClick={() => setShowLogoutDialog(true)}
            variant="outline" 
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-4 lg:p-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div>
                <h2 className="text-xl font-bold text-white">
                  {filteredNavigation.find(item => item.href === pathname)?.label || 'Admin Panel'}
                </h2>
                <p className="text-slate-400 text-sm hidden sm:block">
                  {filteredNavigation.find(item => item.href === pathname)?.description || 'Administrative control panel'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-slate-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Quick Actions */}
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hidden sm:flex">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hidden sm:flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              {/* Admin Avatar */}
              <Avatar className="w-8 h-8">
                <AvatarImage src={adminSession.avatar} alt={adminSession.name} />
                <AvatarFallback>{adminSession.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to log out of the admin panel? You will need to authenticate again to access admin features.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1 border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
