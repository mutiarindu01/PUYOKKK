"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Shield, 
  User, 
  Eye, 
  EyeOff, 
  Lock,
  BarChart3,
  CheckCircle,
  Users,
  LogOut,
  Home
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const pathname = usePathname()

  const adminPassword = "PUYOK-ADMIN-2024"

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true)
    } else {
      alert("❌ Password admin salah!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  const navigationItems = [
    {
      href: "/admin",
      label: "📊 Dashboard Analytics",
      icon: BarChart3,
      isActive: pathname === "/admin"
    },
    {
      href: "/admin/verification",
      label: "✅ Verifikasi Order",
      icon: CheckCircle,
      isActive: pathname === "/admin/verification"
    },
    {
      href: "/admin/users",
      label: "👥 User Management",
      icon: Users,
      isActive: pathname === "/admin/users"
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                🔐 Panel Admin Internal
              </CardTitle>
              <p className="text-slate-300">
                Akses terbatas untuk administrator sistem
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password Admin
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                <Lock className="w-4 h-4 mr-2" />
                Masuk ke Panel Admin
              </Button>

              <div className="text-center">
                <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  🚨 Area Terlarang - Khusus Admin
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Admin Navigation Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  PUYOK Admin Panel
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Internal Control Center
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.isActive ? "default" : "ghost"}
                    size="sm"
                    className={`${
                      item.isActive 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Admin Profile & Actions */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Ke Website Utama
                </Button>
              </Link>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Super Admin
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Administrator
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.isActive ? "default" : "ghost"}
                  size="sm"
                  className={`whitespace-nowrap ${
                    item.isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Online</span>
            </div>
            <div className="text-sm">
              Last Updated: {new Date().toLocaleTimeString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
