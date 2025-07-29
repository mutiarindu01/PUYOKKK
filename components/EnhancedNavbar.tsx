"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search,
  Plus,
  ArrowRight,
  User,
  Bell,
  Filter,
  Wallet,
  Settings,
  LogOut,
  Bookmark,
  Trophy,
  Target,
  Flame,
  Sparkles,
  ChevronDown,
  Menu,
  Palette,
  Gamepad2,
  TrendingUp,
  Award,
  Eye,
  Heart,
  Loader2,
  X,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnhancedNavbarProps {
  isNavOpen: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function EnhancedNavbar({ isNavOpen, searchTerm, setSearchTerm }: EnhancedNavbarProps) {
  // Enhanced navbar state
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [language, setLanguage] = useState("id")
  const [currency, setCurrency] = useState("idr")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [user, setUser] = useState({
    name: "Pioneer User",
    avatar: "",
    level: 7,
    pioneerNumber: 1247,
    xp: 2350,
    maxXp: 3000
  })
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Popular searches data
  const popularSearches = [
    "🎨 Digital Art",
    "🏆 Legendary Cards", 
    "🔥 Trending NFT",
    "💎 Premium Collection",
    "🎮 Gaming Assets"
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        isNavOpen
          ? "h-20 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-slate-700/50 shadow-2xl shadow-slate-900/40"
          : "h-12 bg-transparent border-transparent transform -translate-y-1"
      }`}
      onKeyDown={(e) => {
        if (e.key === '/') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
        if (e.key === 'Escape') {
          setShowSearchSuggestions(false);
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <div
          className={`flex items-center justify-between w-full transition-all duration-500 ease-out ${
            isNavOpen
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 pointer-events-none transform -translate-y-2"
          }`}
        >
          {/* Left Side - Logo and Enhanced Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F78dd0b4d06b0470ca31749b6b150d462?format=webp&width=800"
                  alt="PUYOK Logo"
                  className="w-10 h-10 object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                PUYOK
              </span>
            </div>

            {/* Enhanced Desktop Mega Menu Navigation */}
            <nav className="hidden lg:flex items-center gap-6 ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-bold text-lg group">
                  MARKETPLACE
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-slate-800/95 border-slate-700 text-white backdrop-blur-xl">
                  <div className="p-4">
                    <div className="text-sm text-slate-400 mb-3">Jelajahi Marketplace</div>
                    <div className="grid grid-cols-2 gap-2">
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Palette className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-medium">Digital Art</div>
                            <div className="text-xs text-slate-400">NFT Seni Digital</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <div>
                            <div className="font-medium">Legendary</div>
                            <div className="text-xs text-slate-400">Premium Collection</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Flame className="w-5 h-5 text-red-400" />
                          <div>
                            <div className="font-medium">Trending</div>
                            <div className="text-xs text-slate-400">Hot Items</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Gamepad2 className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="font-medium">Gaming</div>
                            <div className="text-xs text-slate-400">Game Assets</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator className="my-3 bg-slate-700" />
                    <DropdownMenuItem className="hover:bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                      <div className="flex items-center justify-between w-full">
                        <span>Lihat Semua NFT</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors font-medium group">
                  CREATOR
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-slate-800/95 border-slate-700 text-white backdrop-blur-xl">
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3">
                    <Plus className="w-4 h-4 mr-3 text-green-400" />
                    <div>
                      <div className="font-medium">Buat NFT</div>
                      <div className="text-xs text-slate-400">Upload & Mint</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3">
                    <TrendingUp className="w-4 h-4 mr-3 text-blue-400" />
                    <div>
                      <div className="font-medium">Analytics</div>
                      <div className="text-xs text-slate-400">Tracking Performance</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3">
                    <Award className="w-4 h-4 mr-3 text-yellow-400" />
                    <div>
                      <div className="font-medium">Tutorial</div>
                      <div className="text-xs text-slate-400">Panduan Creator</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/rewards" className="text-white hover:text-orange-400 transition-colors font-medium relative group">
                <span className="flex items-center gap-2">
                  HADIAH
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs animate-pulse shadow-lg">
                    NEW
                  </Badge>
                </span>
              </Link>

              <Link href="/voting" className="text-white hover:text-green-400 transition-colors font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                VOTING
              </Link>
            </nav>
          </div>

          {/* Enhanced Center Search with Auto-suggestions */}
          <div className="relative flex-1 mx-6 hidden lg:block max-w-lg">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Cari NFT, creator, koleksi... (tekan '/' untuk fokus)"
                className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-xl backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                  if (e.target.value.length > 0) {
                    setIsSearching(true);
                    setTimeout(() => setIsSearching(false), 1000);
                  }
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <Filter className="w-4 h-4" />
              </Button>
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-xl z-50">
                  {isSearching ? (
                    <div className="p-4 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-400 mr-2" />
                      <span className="text-slate-400">Mencari...</span>
                    </div>
                  ) : (
                    <div className="p-3">
                      <div className="text-xs text-slate-400 mb-3 font-medium">PENCARIAN POPULER</div>
                      {popularSearches.map((search, index) => (
                        <div 
                          key={search} 
                          className="p-3 hover:bg-slate-700/50 rounded-lg cursor-pointer flex items-center gap-3 group"
                          onClick={() => {
                            setSearchTerm(search);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <Search className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                          <span className="text-white group-hover:text-blue-400">{search}</span>
                        </div>
                      ))}
                      <div className="border-t border-slate-700 mt-3 pt-3">
                        <div className="p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer flex items-center justify-between text-blue-400 hover:text-blue-300">
                          <span className="text-sm font-medium">Pencarian Lanjutan</span>
                          <Settings className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Right Side - Notifications, Wallet, User */}
          <nav className="flex items-center gap-3">
            {/* Language & Currency Switcher */}
            <div className="hidden xl:flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-16 lg:w-20 bg-slate-800/50 border-slate-700 text-white text-xs lg:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="id">🇮🇩 ID</SelectItem>
                  <SelectItem value="en">🇺🇸 EN</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-16 lg:w-20 bg-slate-800/50 border-slate-700 text-white text-xs lg:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="idr">IDR</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="relative hover:bg-slate-800/50 text-white">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full animate-pulse flex items-center justify-center">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-slate-800/95 border-slate-700 text-white backdrop-blur-xl">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Notifikasi</h3>
                    <Badge className="bg-blue-600">{unreadNotifications} Baru</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start gap-3">
                        <Trophy className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">NFT Terjual!</div>
                          <div className="text-xs text-slate-400">Golden Dragon Legendary berhasil dijual</div>
                          <div className="text-xs text-slate-500 mt-1">2 menit lalu</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-700/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Bid Baru</div>
                          <div className="text-xs text-slate-400">Seseorang menawar koleksi Anda</div>
                          <div className="text-xs text-slate-500 mt-1">1 jam lalu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-3 bg-slate-700" />
                  <Button variant="ghost" className="w-full justify-center text-blue-400 hover:text-blue-300">
                    Lihat Semua Notifikasi
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wallet Connection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`border-slate-700 hover:bg-slate-800/50 ${
                    isWalletConnected
                      ? "bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/50 text-green-400"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none"
                  }`}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isWalletConnected ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-slate-800/95 border-slate-700 text-white backdrop-blur-xl">
                {!isWalletConnected ? (
                  <div className="p-4">
                    <div className="text-sm text-slate-400 mb-3">Pilih Wallet</div>
                    <div className="space-y-2">
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer" onClick={() => {
                        setIsWalletConnected(true);
                        setWalletAddress("0x1234...5678");
                      }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            🦊
                          </div>
                          <div>
                            <div className="font-medium">MetaMask</div>
                            <div className="text-xs text-slate-400">Browser wallet</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            🔗
                          </div>
                          <div>
                            <div className="font-medium">WalletConnect</div>
                            <div className="text-xs text-slate-400">Mobile wallet</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            🏦
                          </div>
                          <div>
                            <div className="font-medium">Coinbase Wallet</div>
                            <div className="text-xs text-slate-400">Coinbase wallet</div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <div className="font-medium">Wallet Connected</div>
                        <div className="text-xs text-slate-400">{walletAddress}</div>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="my-3 bg-slate-700" />
                    <DropdownMenuItem className="hover:bg-slate-700/50 p-2 cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View on Explorer
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-700/50 p-2 cursor-pointer text-red-400" onClick={() => {
                      setIsWalletConnected(false);
                      setWalletAddress("");
                    }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile with Gamification */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center gap-3 hover:bg-slate-800/50 p-2">
                  <div className="relative">
                    <Avatar className="w-8 h-8 border-2 border-gradient-to-r from-yellow-500 to-orange-500">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {user.level}
                    </Badge>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-slate-400">Pioneer #{user.pioneerNumber}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-slate-800/95 border-slate-700 text-white backdrop-blur-xl">
                <div className="p-4">
                  {/* User Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Level {user.level} Pioneer</span>
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400">
                      {user.xp} / {user.maxXp} XP ke Level {user.level + 1}
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-3 bg-slate-700" />

                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                    <User className="w-4 h-4 mr-3 text-blue-400" />
                    <span>Profile Saya</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                    <Bookmark className="w-4 h-4 mr-3 text-green-400" />
                    <span>NFT Favorit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                    <TrendingUp className="w-4 h-4 mr-3 text-purple-400" />
                    <span>Portofolio</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700/50 p-3 cursor-pointer">
                    <Settings className="w-4 h-4 mr-3 text-slate-400" />
                    <span>Pengaturan</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-3 bg-slate-700" />

                  <DropdownMenuItem className="hover:bg-red-500/20 p-3 cursor-pointer text-red-400">
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Quick Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white">
                <Search className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white relative">
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full" />
                )}
              </Button>
            </div>

            {/* Enhanced Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-slate-800/50">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900/95 border-slate-700 text-white w-80 backdrop-blur-xl">
                <div className="flex flex-col gap-6 py-6">
                  {/* Mobile User Profile */}
                  <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                    <Avatar className="w-12 h-12 border-2 border-blue-500">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-slate-400">Level {user.level} Pioneer</div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                          style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Search Bar */}
                  <div className="p-4 border border-slate-700 rounded-xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="Cari NFT, koleksi..." 
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Mobile Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 px-4">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat NFT
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 text-white hover:bg-slate-800/50">
                      <Flame className="w-4 h-4 mr-2" />
                      Trending
                    </Button>
                  </div>

                  {/* Enhanced Mobile Navigation */}
                  <div className="flex flex-col gap-2">
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-400 p-3 hover:bg-slate-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Palette className="w-5 h-5" />
                          Marketplace
                        </div>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-8 space-y-2 py-2">
                        <SheetClose asChild>
                          <Link href="/marketplace" className="block text-base font-normal text-slate-300 hover:text-blue-400 py-2">
                            🎨 Digital Art
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/marketplace" className="block text-base font-normal text-slate-300 hover:text-blue-400 py-2">
                            🏆 Legendary Awards
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/marketplace" className="block text-base font-normal text-slate-300 hover:text-blue-400 py-2">
                            🔥 Trending
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/marketplace" className="block text-base font-normal text-slate-300 hover:text-blue-400 py-2">
                            🎮 Gaming
                          </Link>
                        </SheetClose>
                      </CollapsibleContent>
                    </Collapsible>

                    <SheetClose asChild>
                      <Link href="/rewards" className="flex items-center gap-3 text-lg font-medium hover:text-orange-400 p-3 hover:bg-slate-800/30 rounded-lg">
                        <Trophy className="w-5 h-5" />
                        <span>Hadiah</span>
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs ml-auto">
                          NEW
                        </Badge>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/voting" className="flex items-center gap-3 text-lg font-medium hover:text-green-400 p-3 hover:bg-slate-800/30 rounded-lg">
                        <Target className="w-5 h-5" />
                        Voting
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
