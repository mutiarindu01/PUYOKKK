"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Search,
  Bell,
  Settings,
  User,
  Wallet,
  LogOut,
  Menu,
  Shield,
  Trophy,
  Gift,
  HelpCircle,
  ChevronDown,
  Crown,
  Zap
} from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import WalletAuth from '@/components/auth/WalletAuth'
import { motion, AnimatePresence } from 'framer-motion'

interface EnhancedNavbarProps {
  isNavOpen: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function EnhancedNavbar({
  isNavOpen,
  searchTerm,
  setSearchTerm
}: EnhancedNavbarProps) {
  const { user, isAuthenticated, signOut } = useAuthContext()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [unreadNotifications] = useState(3)

  const handleAuthSuccess = (user: any) => {
    setShowAuthModal(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  // Get user initials for avatar
  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase()
  }

  // Get membership color
  const getMembershipColor = (tier?: string) => {
    switch (tier) {
      case 'platinum': return 'text-purple-400'
      case 'gold': return 'text-yellow-400'
      case 'silver': return 'text-slate-400'
      default: return 'text-blue-400'
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isNavOpen ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-lg">Ꭾ</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white">PUYOK</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/marketplace" className="text-slate-300 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/collections" className="text-slate-300 hover:text-white transition-colors">
                Collections
              </Link>
              <Link href="/create" className="text-slate-300 hover:text-white transition-colors">
                Create
              </Link>
              <Link href="/stats" className="text-slate-300 hover:text-white transition-colors">
                Stats
              </Link>
              
              {/* Explore Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                  <span>Explore</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuItem className="hover:bg-slate-700">
                    <Trophy className="w-4 h-4 mr-2" />
                    Awards
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700">
                    <Crown className="w-4 h-4 mr-2" />
                    Legendary
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Trending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search NFTs, collections..."
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications (only when authenticated) */}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" className="relative text-slate-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Authentication */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-3 hover:bg-slate-800/50 rounded-lg p-2 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                      <AvatarFallback className="bg-slate-700 text-white text-sm">
                        {user?.username ? getUserInitials(user.username) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{user?.username}</span>
                        {user?.membershipTier && (
                          <Crown className={`w-3 h-3 ${getMembershipColor(user.membershipTier)}`} />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">⭐ {user?.reputationScore?.toFixed(1)}</span>
                        <span className="text-slate-500">•</span>
                        <span className={getMembershipColor(user?.membershipTier)}>
                          {user?.membershipTier?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white w-64">
                    <div className="p-3 border-b border-slate-700">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                          <AvatarFallback className="bg-slate-700 text-white">
                            {user?.username ? getUserInitials(user.username) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user?.username}</div>
                          <div className="text-sm text-slate-400">{user?.email || user?.walletAddress?.slice(0, 8) + '...'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${getMembershipColor(user?.membershipTier)} bg-slate-700`}>
                              {user?.membershipTier?.toUpperCase()}
                            </Badge>
                            {user?.kycStatus === 'verified' && (
                              <Badge className="text-xs text-green-400 bg-green-500/10">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenuItem className="hover:bg-slate-700" asChild>
                      <Link href={`/profile/${user?.username}`}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-700" asChild>
                      <Link href="/dashboard">
                        <Wallet className="w-4 h-4 mr-2" />
                        My Assets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-700" asChild>
                      <Link href="/settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    <DropdownMenuItem className="hover:bg-slate-700" asChild>
                      <Link href="/referral">
                        <Gift className="w-4 h-4 mr-2" />
                        Referrals ({user?.loyaltyPoints || 0} pts)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-slate-700" asChild>
                      <Link href="/help">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    <DropdownMenuItem 
                      className="hover:bg-slate-700 text-red-400 hover:text-red-300"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal('signin')}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden text-slate-400 hover:text-white">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-900 border-slate-700 text-white w-80">
                  <div className="flex flex-col h-full">
                    {/* Mobile Search */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search NFTs, collections..."
                          className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-4">
                      <Link
                        href="/marketplace"
                        className="block py-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Marketplace
                      </Link>
                      <Link
                        href="/collections"
                        className="block py-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Collections
                      </Link>
                      <Link
                        href="/create"
                        className="block py-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create
                      </Link>
                      <Link
                        href="/stats"
                        className="block py-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Stats
                      </Link>
                    </nav>

                    {/* Mobile Auth */}
                    {!isAuthenticated && (
                      <div className="mt-6 space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            openAuthModal('signin')
                          }}
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            openAuthModal('signup')
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          Get Started
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Authentication Modal */}
      <WalletAuth
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </>
  )
}
