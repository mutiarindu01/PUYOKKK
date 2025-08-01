"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home, Users, Shield, DollarSign, BarChart3, Lock,
  Gauge, Headphones, Settings, Crown, LogOut, Bell,
  Search, Menu, X, RefreshCw, Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navigationItems = [
    { 
      href: "/admin", 
      label: "Dashboard", 
      icon: Home, 
      badge: null,
      description: "Overview and key metrics"
    },
    { 
      href: "/admin/users", 
      label: "User Management", 
      icon: Users, 
      badge: "12",
      description: "Manage users and permissions"
    },
    { 
      href: "/admin/verification", 
      label: "Content Moderation", 
      icon: Shield, 
      badge: "5",
      description: "Review and moderate content"
    },
    { 
      href: "/admin/transactions", 
      label: "Transactions", 
      icon: DollarSign, 
      badge: "3",
      description: "Monitor financial activity"
    },
    { 
      href: "/admin/analytics", 
      label: "Analytics", 
      icon: BarChart3, 
      badge: null,
      description: "Business intelligence"
    },
    { 
      href: "/admin/security", 
      label: "Security Center", 
      icon: Lock, 
      badge: "23",
      description: "Security monitoring"
    },
    { 
      href: "/admin/system", 
      label: "System Health", 
      icon: Gauge, 
      badge: null,
      description: "Infrastructure monitoring"
    },
    { 
      href: "/admin/support", 
      label: "Support Tickets", 
      icon: Headphones, 
      badge: "89",
      description: "Customer support"
    },
    { 
      href: "/admin/settings", 
      label: "Admin Settings", 
      icon: Settings, 
      badge: null,
      description: "System configuration"
    }
  ]

  const adminUser = {
    name: "Bude Putuk",
    email: "admin@puyok.com",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64"
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
                <p className="text-xs text-slate-400">Control Panel</p>
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
              <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
              <AvatarFallback>{adminUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{adminUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{adminUser.role}</p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">Online</Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item) => {
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

        {/* System Status */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300">System Health</span>
              <span className="text-xs text-green-400">97.8%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '97.8%' }}></div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              All systems operational
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <Button 
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
                  {navigationItems.find(item => item.href === pathname)?.label || 'Admin Panel'}
                </h2>
                <p className="text-slate-400 text-sm hidden sm:block">
                  {navigationItems.find(item => item.href === pathname)?.description || 'Administrative control panel'}
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
                <AvatarImage src={adminUser.avatar} alt={adminUser.name} />
                <AvatarFallback>{adminUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
