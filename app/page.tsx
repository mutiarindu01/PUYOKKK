"use client"

import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Plus,
  ArrowRight,
  User,
  Shield,
  Zap,
  Users,
  Star,
  Quote,
  ChevronDown,
  Menu,
  Building2,
  Coffee,
  CreditCard,
  DollarSign,
  Handshake,
  TrendingUp,
  TrendingDown,
  Crown,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Eye,
  Heart,
  Users2,
  Palette,
  Camera,
  Gamepad2,
  Music,
  ImageIcon,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import MarketplaceLoading from "@/components/MarketplaceLoading"
import BackgroundParticles from "@/components/BackgroundParticles"
import SplineBackground, { SplineBackgroundDemo } from "@/components/SplineBackground"
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher"
import SophisticatedMarketplace from "@/components/SophisticatedMarketplace"
import ProfileCard from "@/components/ProfileCard"
import ScrollFloat from "@/components/ScrollFloat"
import CompactStats from "@/components/CompactStats"
import { motion } from "framer-motion"

// Cleaned up - all marketplace data and components moved to SophisticatedMarketplace

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundType, setBackgroundType] = useState<"gradient" | "particles" | "spline" | "mesh">("spline")
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transactionValue, setTransactionValue] = useState(10000000)
  const lastScrollY = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

  // Live stats data
  const [liveStats, setLiveStats] = useState({
    collections: "1,247",
    partners: "89",
    creators: "2,350"
  })

  // Featured NFTs Data
  const featuredNFTs = [
    {
      id: 1,
      title: "Mystical Garuda Shield",
      collection: "Indonesian Mythology",
      price: "Rp 45.000.000",
      image: "/placeholder.svg",
      creator: "MythArt_ID",
      verified: true,
      likes: 324,
      offers: 12
    },
    {
      id: 2,
      title: "Rare Batik Medallion",
      collection: "Traditional Arts",
      price: "Rp 25.800.000",
      image: "/placeholder.svg",
      creator: "BatikMaster",
      verified: true,
      likes: 198,
      offers: 8
    },
    {
      id: 3,
      title: "Cyberpunk Jakarta",
      collection: "Future Indonesia",
      price: "Rp 18.500.000",
      image: "/placeholder.svg",
      creator: "PixelIndo",
      verified: false,
      likes: 156,
      offers: 5
    },
    {
      id: 4,
      title: "Wayang Punk Genesis",
      collection: "Modern Traditional",
      price: "Rp 32.000.000",
      image: "/placeholder.svg",
      creator: "WayangPunk",
      verified: true,
      likes: 267,
      offers: 15
    }
  ]

  // Live Activities Data
  const liveActivities = [
    {
      id: 1,
      user: "Budi_Collector",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
      action: "membeli",
      item: "Bored Ape #1234",
      price: "Rp 850.000.000",
      time: "2 menit lalu",
      verified: true
    },
    {
      id: 2,
      user: "CryptoQueen_ID",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen",
      action: "menjual",
      item: "CryptoPunk #7890",
      price: "Rp 1.200.000.000",
      time: "5 menit lalu",
      verified: true
    },
    {
      id: 3,
      user: "ArtistIndo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Artist",
      action: "listing baru",
      item: "Batik Genesis Collection",
      price: "mulai Rp 15.000.000",
      time: "8 menit lalu",
      verified: false
    },
    {
      id: 4,
      user: "TokenMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Master",
      action: "swap",
      item: "50 ETH → 750jt USDT",
      price: "dalam 30 detik",
      time: "12 menit lalu",
      verified: true
    },
    {
      id: 5,
      user: "NFTHunter_JKT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hunter",
      action: "bid",
      item: "Rare Wayang Digital",
      price: "Rp 28.000.000",
      time: "15 menit lalu",
      verified: true
    }
  ]

  // Categories Data
  const categories = [
    {
      id: 1,
      name: "Seni Digital",
      icon: Palette,
      count: "2,341",
      href: "/marketplace?category=art",
      color: "from-pink-500 to-purple-600"
    },
    {
      id: 2,
      name: "Koleksi",
      icon: Trophy,
      count: "1,847",
      href: "/marketplace?category=collectibles",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      name: "Fotografi",
      icon: Camera,
      count: "956",
      href: "/marketplace?category=photography",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      name: "Gaming",
      icon: Gamepad2,
      count: "1,234",
      href: "/marketplace?category=gaming",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "Musik",
      icon: Music,
      count: "567",
      href: "/marketplace?category=music",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 6,
      name: "Virtual World",
      icon: ImageIcon,
      count: "834",
      href: "/marketplace?category=virtual",
      color: "from-yellow-500 to-orange-600"
    }
  ]

  // Legendary Awards Data
  const legendaryAwards = [
    {
      id: 1,
      title: "Golden Dragon Legendary",
      price: "Rp 125.000.000",
      image: "/placeholder.svg",
      rarity: "Legendary",
      badge: "Award",
      seller: "DragonMaster_ID",
      verified: true,
      likes: 1247,
      views: 8924
    },
    {
      id: 2,
      title: "Epic Phoenix Crown",
      price: "Rp 89.500.000",
      image: "/placeholder.svg",
      rarity: "Epic",
      badge: "Award",
      seller: "PhoenixArt",
      verified: true,
      likes: 892,
      views: 5634
    },
    {
      id: 3,
      title: "Mythical Garuda Shield",
      price: "Rp 156.000.000",
      image: "/placeholder.svg",
      rarity: "Mythical",
      badge: "Award",
      seller: "GarudaLegend",
      verified: true,
      likes: 2156,
      views: 12847
    },
    {
      id: 4,
      title: "Rare Batik Medallion",
      price: "Rp 67.800.000",
      image: "/placeholder.svg",
      rarity: "Rare",
      badge: "Award",
      seller: "BatikArtisan",
      verified: false,
      likes: 634,
      views: 3421
    },
    {
      id: 5,
      title: "Divine Wayang Trophy",
      price: "Rp 198.000.000",
      image: "/placeholder.svg",
      rarity: "Divine",
      badge: "Award",
      seller: "WayangMaster",
      verified: true,
      likes: 3247,
      views: 18925
    }
  ]

  // Slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % legendaryAwards.length)
    if (scrollRef.current) {
      const cardWidth = 320 // 300px width + 20px gap
      scrollRef.current.scrollTo({
        left: ((currentSlide + 1) % legendaryAwards.length) * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + legendaryAwards.length) % legendaryAwards.length)
    if (scrollRef.current) {
      const cardWidth = 320
      scrollRef.current.scrollTo({
        left: ((currentSlide - 1 + legendaryAwards.length) % legendaryAwards.length) * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [currentSlide])

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 second loading simulation
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const scrollHidePosition = 80
    const scrollDeltaHide = 15
    const scrollShowPosition = 300

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY.current

      // Enhanced header hide/show logic
      if (scrollDifference > scrollDeltaHide && currentScrollY > scrollHidePosition) {
        if (isNavOpen) {
          setIsNavOpen(false)
        }
      } else if (scrollDifference < -scrollDeltaHide || currentScrollY <= 20) {
        if (!isNavOpen) {
          setIsNavOpen(true)
        }
      }

      // Scroll to top button logic
      setShowScrollToTop(currentScrollY > scrollShowPosition)

      lastScrollY.current = currentScrollY
    }

    // Use throttle for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [isNavOpen])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Show loading screen while data is being fetched
  if (isLoading) {
    return <MarketplaceLoading />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground font-inter relative"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dynamic Background Options with Smooth Transitions */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {backgroundType === "gradient" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="animated-background absolute inset-0" />
            <div className="floating-orbs absolute inset-0" />
          </motion.div>
        )}

        {backgroundType === "particles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BackgroundParticles />
          </motion.div>
        )}

        {backgroundType === "spline" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SplineBackgroundDemo />
          </motion.div>
        )}

        {backgroundType === "mesh" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="mesh-gradient absolute inset-0" />
            <div className="grid-pattern absolute inset-0" />
          </motion.div>
        )}
      </motion.div>

      {/* Floating Background Switcher */}
      <FloatingBackgroundSwitcher
        backgroundType={backgroundType}
        setBackgroundType={setBackgroundType}
      />

      {/* Navigation Bar - Enhanced Design */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
          isNavOpen
            ? "h-16 backdrop-blur-md bg-background/80 border-b border-border/50 shadow-lg shadow-background/20"
            : "h-12 bg-transparent border-transparent transform -translate-y-1"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <div
            className={`flex items-center justify-between w-full transition-all duration-500 ease-out ${
              isNavOpen
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 pointer-events-none transform -translate-y-2"
            }`}
          >
            {/* Left Side - Logo and Title */}
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F78dd0b4d06b0470ca31749b6b150d462?format=webp&width=800"
                alt="PUYOK Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-foreground">PUYOK</span>

              {/* Enhanced Desktop Navigation Menu */}
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors font-bold text-lg">
                  MARKETPLACE
                </Link>
                <Link href="/nft" className="text-foreground hover:text-primary transition-colors font-medium">
                  NFT
                </Link>
                <Link href="/rewards" className="text-foreground hover:text-primary transition-colors font-medium relative">
                  HADIAH
                  <Badge className="absolute -top-2 -right-6 bg-red-500 text-white text-xs animate-pulse">
                    NEW
                  </Badge>
                </Link>
                <Link href="/voting" className="text-foreground hover:text-primary transition-colors font-medium">
                  VOTING
                </Link>
              </nav>
            </div>

            {/* Center: Search Bar (Desktop Only) */}
            <div className="relative flex-1 mx-4 hidden md:block max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aset, koleksi, atau kreator..."
                className="w-full pl-10 pr-4 py-2 bg-input border-border text-foreground placeholder-muted-foreground focus:ring-ring focus:border-primary rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Right Side - Buttons */}
            <nav className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent" asChild>
                  <Link href="/dashboard">Masuk</Link>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Jual Aset
                </Button>
              </div>

              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-card border-border text-foreground w-64">
                  <div className="flex flex-col gap-4 py-6">
                    <SheetClose asChild>
                      <Link href="/dashboard" className="text-lg font-medium hover:text-primary">
                        Masuk
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="#" className="text-lg font-medium hover:text-primary">
                        Jual Aset
                      </Link>
                    </SheetClose>
                    <div className="border-t border-border my-2" />

                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary">
                        Aset{" "}
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 space-y-2 py-2">
                        <SheetClose asChild>
                          <Link
                            href="#marketplace"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            NFT
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="#marketplace"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Token
                          </Link>
                        </SheetClose>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium hover:text-primary">
                        Tentang PUYOK{" "}
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-4 space-y-2 py-2">
                        <SheetClose asChild>
                          <Link
                            href="#how-it-works"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Bagaimana Kami Bekerja
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="#why-different"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Mengapa PUYOK
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="#testimonials"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Testimoni
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/help"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Pusat Bantuan
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/whitepaper"
                            className="block text-base font-normal text-muted-foreground hover:text-primary"
                          >
                            Whitepaper
                          </Link>
                        </SheetClose>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      {/* Trust Bar - Positioned prominently */}
      <motion.div
        className="bg-gradient-to-r from-slate-900/30 to-gray-900/30 border-y border-slate-700/30 py-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 font-medium">🔒 Escrow Terverifikasi Etherscan</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">
                ✓ Verified Contract
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">💳</span>
              <span className="text-slate-400">DANA • GoPay • OVO Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">
                🏆 Pioneer NFT Rewards
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Hero Section with Pioneer NFT Integration */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 items-center min-h-[600px]">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/50 px-4 py-2 text-sm font-medium">
                  🔥 Bergabung dengan 10,000+ Pengguna
                </Badge>
              </motion.div>

              {/* Main Headlines */}
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-300"
                >
                  Aset Digital Bertemu Realitas
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl font-bold text-white leading-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                    Marketplace
                  </span>
                  <br />
                  P2P Indonesia
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-300 leading-relaxed max-w-lg"
                >
                  PUYOK mempelopori panggung NFT di Indonesia dengan marketplace untuk koleksi digital dan aset kreatif
                </motion.p>
              </div>

              {/* Enhanced Statistics with Pioneer System */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-slate-200 mb-1">{liveStats.collections}</div>
                  <div className="text-sm text-gray-400">Koleksi Unik</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-slate-300 mb-1">{liveStats.partners}</div>
                  <div className="text-sm text-gray-400">Mitra Resmi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-slate-300 mb-1">{liveStats.creators}</div>
                  <div className="text-sm text-gray-400">Pioneers NFT</div>
                </div>
                <div className="text-center relative">
                  <div className="text-2xl md:text-3xl font-bold text-slate-200 mb-1">156</div>
                  <div className="text-sm text-gray-400">Active Voters</div>
                  <Badge className="absolute -top-2 -right-1 bg-slate-700 text-slate-200 text-xs">
                    LIVE
                  </Badge>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  size="lg"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-slate-700/25 transition-all"
                  asChild
                >
                  <Link href="/marketplace">
                    Jelajahi Marketplace
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
              </motion.div>


            </motion.div>

            {/* Right Column - Legendary Awards Marketplace Slider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Enhanced Header with Pioneer System */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-slate-400" />
                  <h3 className="text-xl font-bold text-white">Legendary Awards</h3>
                  <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/50">
                    Pioneer System
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  NFT 1/1 eksklusif otomatis dikirim untuk milestone pertama
                </p>
              </div>

              {/* Slider Container */}
              <div className="relative">
                {/* Navigation Buttons - Positioned at edges */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm rounded-full opacity-60 hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm rounded-full opacity-60 hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                <div className="flex gap-6 justify-center">
                  {legendaryAwards.slice(0, 2).map((award, index) => (
                    <motion.div
                      key={award.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-80"
                    >
                      <ProfileCard
                        avatarUrl="https://cdn.builder.io/o/assets%2Fe1c1ed8edce84b16b5c048c563eec914%2Fa6583448df0d4e7b9175452307243e11?alt=media&token=58823c53-5fd4-4a44-8922-03d6fe609378&apiKey=e1c1ed8edce84b16b5c048c563eec914"
                        name={award.title}
                        title={`🏆 1/1 PIONEER • ${award.price}`}
                        handle={award.seller}
                        status="✅ Auto Mint"
                        contactText="🏆 Lihat NFT"
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => window.open(`/awards-marketplace/${award.id}`, '_blank')}
                        className="legendary-card"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>



              {/* Enhanced Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                  asChild
                >
                  <Link href="/awards-marketplace">
                    🏆 Lihat Semua Awards
                  </Link>
                </Button>
                <Button
                  className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-600/50"
                  asChild
                >
                  <Link href="/voting">
                    🗳️ Voting Aktif (3)
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>


      </section>







      {/* Enhanced Trending Tokens Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-slate-900/20 via-background to-gray-900/20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-slate-600/30 rounded-full px-6 py-3 mb-6">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400 font-semibold">TRENDING SEKARANG</span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Token yang
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500"> Sedang Tren</span>
              </h2>
              <p className="text-gray-300 max-w-2xl">
                Cryptocurrency dengan volume trading tertinggi dan paling diminati saat ini.
                <span className="text-slate-400 font-medium"> Live update setiap 30 detik.</span>
              </p>
            </div>
            <Link
              href="/marketplace"
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Token Cards - Mobile Responsive with Horizontal Scroll */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max md:grid md:grid-cols-3 md:min-w-0">
              {/* Enhanced Bitcoin Card */}
              <motion.div
                className="min-w-[320px] md:min-w-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 p-6 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 h-full">
                  {/* Header with Logo and Trending Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {/* Enhanced Bitcoin Logo */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          ₿
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Bitcoin</h3>
                        <p className="text-sm text-gray-400">BTC</p>
                      </div>
                    </div>
                    <Badge className="bg-slate-700 text-white font-bold">�� #1 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">Rp 850.000.000</span>
                      <div className="flex items-center gap-1 bg-slate-700/50 border border-slate-600/50 rounded-full px-3 py-1">
                        <TrendingUp className="w-4 h-4 text-slate-300" />
                        <span className="text-slate-300 font-bold text-sm">+2.15%</span>
                      </div>
                    </div>

                    {/* Market Sentiment Indicator */}
                    <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xl">🔥</span>
                        <span className="text-slate-400 font-medium text-sm">Hot Trend</span>
                      </div>
                      <p className="text-xs text-gray-400">Dibicarakan 247x/jam di media sosial</p>
                    </div>

                    {/* Enhanced Market Data */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Volume 24h</span>
                        <span className="text-white font-bold">Rp 2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Order Aktif</span>
                        <span className="text-white">23 orders</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Likuiditas</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: '75%' }} />
                          </div>
                          <span className="text-xs text-gray-400">Tinggi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Seller Info */}
                  <div className="bg-background/50 border border-border/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          CM
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium">@crypto_master</span>
                            <Shield className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">98.5% sukses</span>
                            <span className="text-gray-400 text-xs">• 156 trades</span>
                            <div className="flex text-slate-400 text-xs">
                              ⭐⭐⭐⭐⭐
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">Verified Pro</Badge>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Metode Bayar:</span>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                      <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                      <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                      <span className="text-gray-400 text-xs ml-1">+2</span>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold"
                      asChild
                    >
                      <Link href="/marketplace">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Beli Sekarang
                      </Link>
                    </Button>
                    <Button size="icon" variant="outline" className="border-slate-600/50 text-slate-400 hover:bg-slate-800/50">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Enhanced Ethereum Card */}
              <motion.div
                className="min-w-[320px] md:min-w-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 p-6 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 h-full">
                  {/* Header with Logo and Trending Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          Ξ
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Ethereum</h3>
                        <p className="text-sm text-gray-400">ETH</p>
                      </div>
                    </div>
                    <Badge className="bg-slate-700 text-white font-bold">🔥 #2 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">Rp 45.000.000</span>
                      <div className="flex items-center gap-1 bg-slate-700/50 border border-slate-600/50 rounded-full px-3 py-1">
                        <TrendingDown className="w-4 h-4 text-slate-300" />
                        <span className="text-slate-300 font-bold text-sm">-1.8%</span>
                      </div>
                    </div>

                    {/* Market Sentiment */}
                    <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xl">📊</span>
                        <span className="text-slate-400 font-medium text-sm">Stabil</span>
                      </div>
                      <p className="text-xs text-gray-400">Analisis teknikal menunjukkan konsolidasi</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Volume 24h</span>
                        <span className="text-white font-bold">Rp 1.8M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Order Aktif</span>
                        <span className="text-white">18 orders</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Likuiditas</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: '60%' }} />
                          </div>
                          <span className="text-xs text-gray-400">Sedang</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-background/50 border border-border/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          ET
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium">@eth_trader</span>
                            <Shield className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">97.2% sukses</span>
                            <span className="text-gray-400 text-xs">• 89 trades</span>
                            <div className="flex text-slate-400 text-xs">
                              ⭐⭐⭐⭐⭐
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">Verified</Badge>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Metode Bayar:</span>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                      <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                      <span className="text-gray-400 text-xs ml-1">+3</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold"
                      asChild
                    >
                      <Link href="/marketplace">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Beli Sekarang
                      </Link>
                    </Button>
                    <Button size="icon" variant="outline" className="border-slate-600/50 text-slate-400 hover:bg-slate-800/50">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Enhanced USDT Card */}
              <motion.div
                className="min-w-[320px] md:min-w-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 p-6 hover:border-slate-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 h-full">
                  {/* Header with Logo and Trending Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          ₮
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Tether</h3>
                        <p className="text-sm text-gray-400">USDT</p>
                      </div>
                    </div>
                    <Badge className="bg-slate-700 text-white font-bold">🔥 #3 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">Rp 15.750</span>
                      <div className="flex items-center gap-1 bg-slate-700/50 border border-slate-600/50 rounded-full px-3 py-1">
                        <TrendingUp className="w-4 h-4 text-slate-300" />
                        <span className="text-slate-300 font-bold text-sm">+0.1%</span>
                      </div>
                    </div>

                    {/* Market Sentiment */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xl">��️</span>
                        <span className="text-green-400 font-medium text-sm">Safe Haven</span>
                      </div>
                      <p className="text-xs text-gray-400">Stablecoin terpercaya dengan demand tinggi</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Volume 24h</span>
                        <span className="text-white font-bold">Rp 3.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Order Aktif</span>
                        <span className="text-white">34 orders</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Likuiditas</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{ width: '90%' }} />
                          </div>
                          <span className="text-xs text-gray-400">Sangat Tinggi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-background/50 border border-border/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          ST
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium">@stable_pro</span>
                            <Shield className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">99.1% sukses</span>
                            <span className="text-gray-400 text-xs">• 234 trades</span>
                            <div className="flex text-slate-400 text-xs">
                              ⭐⭐⭐⭐⭐
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">Verified Pro+</Badge>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Metode Bayar:</span>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                      <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                      <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                      <div className="w-6 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">B</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold"
                      asChild
                    >
                      <Link href="/marketplace">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Beli Sekarang
                      </Link>
                    </Button>
                    <Button size="icon" variant="outline" className="border-slate-600/50 text-slate-400 hover:bg-slate-800/50">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua Token</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Live Market Stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">Rp 7.1M</div>
              <div className="text-sm text-gray-400">Total Volume 24h</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">75</div>
              <div className="text-sm text-gray-400">Order Aktif</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">142</div>
              <div className="text-sm text-gray-400">Trader Online</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">98.5%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Interactive NFT Carousel Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-slate-900/20 via-background to-gray-900/20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-slate-600/30 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 font-semibold">KOLEKSI UNGGULAN</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-slate-400 rounded-full"
              />
            </div>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              NFT
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500"> Pilihan Minggu</span> Ini
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Koleksi NFT terpilih dengan kualitas premium dan nilai investasi terbaik dari kreator Indonesia.
              <span className="text-slate-400 font-medium"> Swipe untuk melihat lebih banyak koleksi.</span>
            </motion.p>
          </div>

          {/* Interactive NFT Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background/90 text-white border border-border backdrop-blur-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentSlide(prev => Math.min(featuredNFTs.length - 3, prev + 1))}
              disabled={currentSlide >= featuredNFTs.length - 3}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background/90 text-white border border-border backdrop-blur-sm rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Mobile Swipe Container */}
            <div className="overflow-x-auto pb-4 hide-scrollbar md:overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out min-w-max md:min-w-0"
                style={{
                  transform: `translateX(-${currentSlide * 350}px)`,
                }}
              >
                {/* Enhanced NFT Cards */}
                {[
                  {
                    id: 1,
                    name: "Mystical Dragon #001",
                    collection: "Indonesian Mythology Collection",
                    price: "Rp 25.000.000",
                    floorPrice: "Rp 22.000.000",
                    volume24h: "Rp 125.5M",
                    rarity: "Legendary",
                    image: "https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F1234567890abcdef",
                    creator: "@dragon_artist",
                    verified: true,
                    likes: 324,
                    views: 1247,
                    properties: ["Fire Element", "Golden Scales", "Ancient Runes"],
                    rarityColor: "from-red-500 to-orange-500",
                    bidCount: 12
                  },
                  {
                    id: 2,
                    name: "Batik Genesis #042",
                    collection: "Traditional Art Digital",
                    price: "Rp 15.000.000",
                    floorPrice: "Rp 12.500.000",
                    volume24h: "Rp 89.3M",
                    rarity: "Rare",
                    image: "https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Fabcdef1234567890",
                    creator: "@batik_creator",
                    verified: true,
                    likes: 198,
                    views: 856,
                    properties: ["Traditional Pattern", "Java Style", "Hand Drawn"],
                    rarityColor: "from-orange-500 to-yellow-500",
                    bidCount: 8
                  },
                  {
                    id: 3,
                    name: "Wayang Punk #117",
                    collection: "Modern Traditional Fusion",
                    price: "Rp 12.000.000",
                    floorPrice: "Rp 10.200.000",
                    volume24h: "Rp 67.8M",
                    rarity: "Epic",
                    image: "https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F0987654321fedcba",
                    creator: "@wayang_modern",
                    verified: true,
                    likes: 156,
                    views: 634,
                    properties: ["Cyber Enhancement", "Traditional Mask", "Neon Glow"],
                    rarityColor: "from-blue-500 to-purple-500",
                    bidCount: 5
                  },
                  {
                    id: 4,
                    name: "Cyberpunk Jakarta #055",
                    collection: "Future City Collection",
                    price: "Rp 8.500.000",
                    floorPrice: "Rp 7.100.000",
                    volume24h: "Rp 45.2M",
                    rarity: "Common",
                    image: "https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Ffedcba0987654321",
                    creator: "@cyber_artist",
                    verified: false,
                    likes: 87,
                    views: 312,
                    properties: ["Neon Lights", "Urban Style", "Night Scene"],
                    rarityColor: "from-green-500 to-emerald-500",
                    bidCount: 3
                  },
                  {
                    id: 5,
                    name: "Garuda Phoenix #009",
                    collection: "National Pride Series",
                    price: "Rp 35.000.000",
                    floorPrice: "Rp 32.500.000",
                    volume24h: "Rp 156.7M",
                    rarity: "Mythical",
                    image: "https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F9876543210abcdef",
                    creator: "@garuda_master",
                    verified: true,
                    likes: 567,
                    views: 2134,
                    properties: ["Divine Wings", "Sacred Fire", "National Symbol"],
                    rarityColor: "from-purple-500 to-pink-500",
                    bidCount: 18
                  }
                ].map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    className="min-w-[320px] md:min-w-[350px] group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                  >
                    <Card className="bg-gradient-to-br from-card/80 to-card/40 border border-border hover:border-slate-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full group-hover:shadow-2xl group-hover:shadow-slate-500/20">
                      {/* Enhanced Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Enhanced Rarity Badge */}
                        <Badge className={`absolute top-3 right-3 bg-gradient-to-r ${nft.rarityColor} text-white border-none font-bold px-3 py-1 shadow-lg`}>
                          {nft.rarity}
                        </Badge>

                        {/* Wishlist Button */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 left-3 w-10 h-10 bg-background/20 backdrop-blur-md border border-white/20 text-white hover:bg-background/40 hover:text-red-400 transition-all"
                        >
                          <Heart className="w-5 h-5" />
                        </Button>

                        {/* Live Auction Indicator */}
                        {nft.bidCount > 0 && (
                          <div className="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                            🔴 LIVE • {nft.bidCount} bids
                          </div>
                        )}

                        {/* Quick Action Buttons (Appear on Hover) */}
                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold"
                              asChild
                            >
                              <Link href={`/marketplace/${nft.id}`}>
                                <DollarSign className="w-4 h-4 mr-1" />
                                Beli
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-slate-500/30 text-slate-300 hover:bg-slate-800/10"
                              asChild
                            >
                              <Link href={`/marketplace/${nft.id}`}>
                                <Eye className="w-4 h-4 mr-1" />
                                Detail
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div className="p-6">
                        {/* Header with Creator Info */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                              {nft.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2">{nft.collection}</p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {nft.creator.slice(1, 3).toUpperCase()}
                              </div>
                              <span className="text-sm text-gray-300">{nft.creator}</span>
                              {nft.verified && (
                                <Shield className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{nft.price}</div>
                            <div className="text-xs text-gray-400">Floor: {nft.floorPrice}</div>
                          </div>
                        </div>

                        {/* Market Statistics */}
                        <div className="bg-background/30 border border-border/50 rounded-lg p-3 mb-4">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-gray-400">24h Volume</span>
                              <div className="text-white font-semibold">{nft.volume24h}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Activity</span>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 text-gray-400" />
                                <span className="text-white">{nft.views}</span>
                                <Heart className="w-3 h-3 text-red-400 ml-2" />
                                <span className="text-white">{nft.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* NFT Properties */}
                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Featured Properties</div>
                          <div className="flex flex-wrap gap-1">
                            {nft.properties.slice(0, 3).map((prop, propIndex) => (
                              <Badge
                                key={propIndex}
                                variant="outline"
                                className="text-xs border-slate-600/30 text-slate-400 bg-slate-800/10"
                              >
                                {prop}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-400 text-sm">Payment:</span>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 bg-slate-700 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                            <div className="w-6 h-6 bg-slate-700 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                            <div className="w-6 h-6 bg-slate-700 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold"
                            asChild
                          >
                            <Link href={`/marketplace/${nft.id}`}>
                              Ajukan Penawaran
                            </Link>
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="border-slate-600/50 text-slate-400 hover:bg-slate-800/10"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(1, featuredNFTs.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-purple-500 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-slate-800/30 to-gray-800/30 border border-slate-600/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Temukan Koleksi NFT Terlengkap
              </h3>
              <p className="text-gray-300 mb-6">
                Jelajahi ribuan NFT berkualitas tinggi dari kreator terbaik Indonesia dengan berbagai kategori dan harga.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                asChild
              >
                <Link href="/marketplace?tab=nft">
                  🎨 Jelajahi Semua NFT
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </Card>
          </motion.div>

          {/* Live Market Stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-1">2,341</div>
              <div className="text-sm text-gray-400">NFT Listed</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-pink-400 mb-1">89</div>
              <div className="text-sm text-gray-400">Live Auctions</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-1">1,247</div>
              <div className="text-sm text-gray-400">Active Collectors</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-1">Rp 234M</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
          </motion.div>
        </div>

        {/* Add custom styles for smooth scrolling */}
        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.section>

      {/* Enhanced: Kenapa PUYOK Berbeda Section */}
      <motion.section
        id="why-different"
        className="py-32 bg-gradient-to-br from-red-950/20 via-card/30 to-green-950/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-orange-500 font-semibold">PERBANDINGAN KOMPETITOR</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Jual NFT, Dapat Rupiah Instan!
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tidak perlu ribet crypto - Tarik langsung ke DANA/GoPay dalam hitungan menit
            </p>

            {/* Unique Badge */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-full px-8 py-4">
                <span className="text-3xl">💰</span>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">Satu-satunya di Indonesia</div>
                  <div className="text-yellow-300 text-sm">NFT → Rupiah Instan</div>
                </div>
                <span className="text-3xl">⚡</span>
              </div>
            </motion.div>
          </div>

          {/* Process Flow Comparison */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="max-w-6xl mx-auto bg-gradient-to-r from-slate-900/50 to-gray-900/50 border border-gray-700/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Bandingkan Proses Pencairan Dana</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Other Platforms - Complex Process */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2">
                    <span className="text-2xl">😵‍💫</span>
                    Platform Lain (Rumit & Lama)
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">1</div>
                      <div>
                        <div className="text-white font-medium">Jual NFT → Dapat ETH/MATIC</div>
                        <div className="text-red-400 text-sm">⏱️ ~10 menit</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">2</div>
                      <div>
                        <div className="text-white font-medium">Kirim ke Exchange</div>
                        <div className="text-red-400 text-sm">⏱️ ~30 menit</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">3</div>
                      <div>
                        <div className="text-white font-medium">Konversi ETH �� IDR</div>
                        <div className="text-red-400 text-sm">⏱️ ~1 jam</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">4</div>
                      <div>
                        <div className="text-white font-medium">Withdraw ke Bank</div>
                        <div className="text-red-400 text-sm">⏱️ 3-7 hari</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">5</div>
                      <div>
                        <div className="text-white font-medium">Transfer ke E-wallet</div>
                        <div className="text-red-400 text-sm">⏱�� ~5 menit</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
                    <div className="text-red-300 font-bold">Total Waktu: 5-10 hari</div>
                    <div className="text-red-400 text-sm">Total Fee: 15-20%</div>
                  </div>
                </div>

                {/* PUYOK - Simple Process */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    PUYOK (Cepat & Langsung)
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">1</div>
                      <div>
                        <div className="text-white font-medium">Jual NFT</div>
                        <div className="text-green-400 text-sm">⏱️ ~10 detik</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">2</div>
                      <div>
                        <div className="text-white font-medium">Verifikasi Pembayaran</div>
                        <div className="text-green-400 text-sm">⏱️ ~1 menit</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">3</div>
                      <div>
                        <div className="text-white font-medium">Dana Masuk DANA/GoPay</div>
                        <div className="text-green-400 text-sm">⏱️ ~3 menit</div>
                      </div>
                    </div>

                    {/* Empty slots to match height */}
                    <div className="h-16"></div>
                    <div className="h-16"></div>
                  </div>
                  <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                    <div className="text-green-300 font-bold">Total Waktu: 2-5 menit</div>
                    <div className="text-green-400 text-sm">Total Fee: 3%</div>
                  </div>
                </div>
              </div>

              {/* Time Savings Highlight */}
              <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
                <div className="text-4xl font-bold text-yellow-400 mb-2">Hemat 99% Waktu!</div>
                <div className="text-yellow-300">Dari berhari-hari menjadi hanya hitungan menit</div>
              </div>
            </Card>
          </motion.div>

          {/* Time Comparison Calculator */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Kalkulator Perbandingan Waktu</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Competitor Time */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4 text-center">Platform Kompetitor</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-500/5 rounded-lg">
                      <span className="text-white">Verifikasi:</span>
                      <span className="text-red-400 font-bold">2 hari</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/5 rounded-lg">
                      <span className="text-white">Pencairan:</span>
                      <span className="text-red-400 font-bold">3-7 hari</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <span className="text-white font-bold">Total:</span>
                      <span className="text-red-400 font-bold text-xl">5-9 hari</span>
                    </div>
                  </div>
                </div>

                {/* PUYOK Time */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-4 text-center">PUYOK</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-500/5 rounded-lg">
                      <span className="text-white">Verifikasi:</span>
                      <span className="text-green-400 font-bold">2 menit</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/5 rounded-lg">
                      <span className="text-white">Pencairan:</span>
                      <span className="text-green-400 font-bold">3 menit</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <span className="text-white font-bold">Total:</span>
                      <span className="text-green-400 font-bold text-xl">5 menit</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">Hemat 99% Waktu Anda!</div>
                <div className="text-green-300">1,440 menit vs 5 menit - Selisih 1,435 menit lebih cepat!</div>
              </div>
            </Card>
          </motion.div>

          {/* Live Withdrawal Tracker */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-green-950/30 to-blue-950/30 border border-green-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                <span className="text-2xl">🔴</span>
                Live Feed: Pencairan Real-time
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-green-400 border-green-500/20 animate-pulse">LIVE</div>
              </h3>

              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-4 p-4 bg-green-500/5 border border-green-500/10 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">@sarah_art</span>
                      <span className="text-green-400 text-sm">• berhasil cairkan</span>
                    </div>
                    <div className="text-gray-300 text-sm">Batik Digital #123 → GoPay</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">Rp 850,000</div>
                    <div className="text-green-300 text-sm">2 menit lalu</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-green-500/5 border border-green-500/10 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">@digital_creator</span>
                      <span className="text-green-400 text-sm">• berhasil cairkan</span>
                    </div>
                    <div className="text-gray-300 text-sm">Garuda Shield NFT → DANA</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">Rp 1,200,000</div>
                    <div className="text-green-300 text-sm">5 menit lalu</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 bg-green-500/5 border border-green-500/10 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">@rizki_trader</span>
                      <span className="text-green-400 text-sm">• berhasil cairkan</span>
                    </div>
                    <div className="text-gray-300 text-sm">Wayang Collection #45 → OVO</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">Rp 675,000</div>
                    <div className="text-green-300 text-sm">8 menit lalu</div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-green-400 font-bold mb-1">Total hari ini: Rp 45,8M dicairkan</div>
                <div className="text-green-300 text-sm">Rata-rata waktu pencairan: 3 menit 24 detik</div>
              </div>
            </Card>
          </motion.div>

          {/* Interactive Fee Calculator */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500/5 via-primary/5 to-green-500/5 border border-primary/20 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">💰 Kalkulator Penghematan</h3>
                <p className="text-gray-300">Lihat berapa banyak yang bisa Anda hemat dengan PUYOK</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-3 font-medium">Nilai Transaksi Anda:</label>
                  <div className="relative">
                    <input
                      type="range"
                      min="500000"
                      max="100000000"
                      value={transactionValue}
                      onChange={(e) => setTransactionValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10B981 0%, #10B981 ${((transactionValue - 500000) / (100000000 - 500000)) * 100}%, #374151 ${((transactionValue - 500000) / (100000000 - 500000)) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>Rp 500K</span>
                      <span className="text-primary font-bold">
                        Rp {(transactionValue / 1000000).toFixed(transactionValue >= 1000000 ? 0 : 1)}M
                      </span>
                      <span>Rp 100M</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                    <div className="text-red-400 text-sm font-medium mb-2">Platform Global</div>
                    <div className="text-red-500 text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.15) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-red-400 text-xs">Fee 15%</div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <div className="text-primary text-sm font-medium mb-2">PUYOK</div>
                    <div className="text-primary text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.03) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-primary text-xs">Fee 3%</div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <div className="text-green-400 text-sm font-medium mb-2">Penghematan Anda</div>
                    <div className="text-green-500 text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.12) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-green-400 text-xs">Hemat {Math.round(((0.15 - 0.03) / 0.15) * 100)}%!</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Trust Badges Indonesia */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
                <span className="text-2xl">🇮🇩</span>
                <span className="text-red-400 font-semibold">100% Tim Lokal Indonesia</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Didukung Regulator Indonesia</span>
              </div>
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Terpercaya 10,000+ User</span>
              </div>
            </div>
          </motion.div>

          {/* Live Market Comparison Table */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="max-w-6xl mx-auto bg-gradient-to-r from-slate-900/50 to-gray-900/50 border border-gray-700/50 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Perbandingan Platform Real-time</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-4 px-4 text-gray-300 font-semibold">Fitur</th>
                        <th className="py-4 px-4 text-gray-300 font-semibold text-center">OpenSea</th>
                        <th className="py-4 px-4 text-gray-300 font-semibold text-center">Tokocrypto</th>
                        <th className="py-4 px-4 text-green-400 font-semibold text-center bg-green-500/10 rounded-t-lg">PUYOK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">Fee Transaksi</td>
                        <td className="py-4 px-4 text-center text-red-400 font-bold">12.5%</td>
                        <td className="py-4 px-4 text-center text-orange-400 font-bold">10%</td>
                        <td className="py-4 px-4 text-center text-green-400 font-bold bg-green-500/5">3%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">Waktu Verifikasi</td>
                        <td className="py-4 px-4 text-center text-red-400">7-14 hari</td>
                        <td className="py-4 px-4 text-center text-orange-400">3-5 hari</td>
                        <td className="py-4 px-4 text-center text-green-400 bg-green-500/5">5 menit</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">Support Bahasa</td>
                        <td className="py-4 px-4 text-center text-red-400">English</td>
                        <td className="py-4 px-4 text-center text-orange-400">Limited ID</td>
                        <td className="py-4 px-4 text-center text-green-400 bg-green-500/5">100% Indonesia</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">Metode Pembayaran</td>
                        <td className="py-4 px-4 text-center text-red-400">Crypto Only</td>
                        <td className="py-4 px-4 text-center text-orange-400">Bank Transfer</td>
                        <td className="py-4 px-4 text-center text-green-400 bg-green-500/5">DANA, GoPay, OVO</td>
                      </tr>
                      <tr className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">Customer Support</td>
                        <td className="py-4 px-4 text-center text-red-400">24-48 jam</td>
                        <td className="py-4 px-4 text-center text-orange-400">8-12 jam</td>
                        <td className="py-4 px-4 text-center text-green-400 bg-green-500/5 rounded-b-lg">Real-time 24/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Fee Comparison Progress Bars */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-red-950/30 to-green-950/30 border border-gray-700/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Visualisasi Perbandingan Fee</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-400 font-semibold">Platform Global</span>
                    <span className="text-red-400 font-bold">15%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-semibold">PUYOK</span>
                    <span className="text-green-400 font-bold">3%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: '20%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div className="text-center mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 text-lg font-bold">Penghematan: 80% 🎉</div>
                  <div className="text-green-300 text-sm">Dari transaksi Rp 10 juta, Anda hemat Rp 1.2 juta!</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Platform Global */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-red-950/30 to-orange-950/30 border border-red-500/20 p-8 text-center relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">MAHAL</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Platform Global</h3>
                <Badge variant="destructive" className="mb-6">
                  Rumit & Mahal
                </Badge>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">����</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Fee Menggerus Keuntungan</p>
                      <p className="text-red-400 text-sm">Hingga 15% dari nilai transaksi</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">⏳</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Verifikasi Berbelit-belit</p>
                      <p className="text-red-400 text-sm">KYC bisa sampai berminggu-minggu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">🚫</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pembayaran Ribet</p>
                      <p className="text-red-400 text-sm">Tidak support DANA, GoPay, OVO</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">🗣️</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Support Bahasa Asing</p>
                      <p className="text-red-400 text-sm">Sulit komunikasi saat ada masalah</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* PUYOK */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-primary/20 to-green-500/20 border border-primary p-8 text-center relative overflow-hidden shadow-lg shadow-primary/20 h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-500"></div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">JUARA!</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">������🇩</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">PUYOK</h3>
                <Badge className="mb-6 bg-primary text-primary-foreground">
                  Lokal & Menguntungkan
                </Badge>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">💰</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Hemat 80% Biaya Transaksi</p>
                      <p className="text-primary text-sm">Fee hanya 2-3%, keuntungan maksimal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Daftar Instan</p>
                      <p className="text-primary text-sm">Cukup nomor HP, langsung trading</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">��</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pembayaran Familiar</p>
                      <p className="text-primary text-sm">DANA, GoPay, OVO, Bank Lokal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">🗨��</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Support Bahasa Indonesia</p>
                      <p className="text-primary text-sm">24/7 siap bantu dalam bahasa kita</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Speed-Focused Testimonials */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Testimonial: Kecepatan Pencairan Dana</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Speed Testimonial 1 */}
              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                  <div>
                    <div className="text-white font-semibold">@budi_art</div>
                    <div className="text-gray-400 text-sm">NFT Creator • Verified ✓</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-green-400 text-sm font-bold">⚡ 3 menit</div>
                  </div>
                </div>
                <blockquote className="text-gray-300 mb-4 italic text-lg">
                  "Dulu butuh seminggu buat cairkan NFT, sekarang cuma 5 menit langsung masuk GoPay!"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-green-400 font-bold">NFT → GoPay: 5 menit</div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </Card>

              {/* Speed Testimonial 2 */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    L
                  </div>
                  <div>
                    <div className="text-white font-semibold">@lisa_digital</div>
                    <div className="text-gray-400 text-sm">Digital Artist • Verified ✓</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-purple-400 text-sm font-bold">⚡ 2 menit</div>
                  </div>
                </div>
                <blockquote className="text-gray-300 mb-4 italic text-lg">
                  "Gak percaya awalnya, ternyata beneran bisa langsung ke DANA tanpa ribet crypto!"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-purple-400 font-bold">Tanpa Konversi Crypto</div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </Card>
            </div>

            {/* Speed Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">2.3</div>
                <div className="text-sm text-green-300">Rata-rata menit</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">99%</div>
                <div className="text-sm text-blue-300">Lebih cepat</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                <div className="text-sm text-purple-300">Available</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">0</div>
                <div className="text-sm text-yellow-300">Konversi crypto</div>
              </div>
            </div>
          </motion.div>

          {/* Case Study Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-purple-950/30 to-blue-950/30 border border-purple-500/20 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">📊 Case Study: Digital Art Gallery</h3>
                <p className="text-gray-300">Transformasi nyata sebuah galeri digital setelah beralih ke PUYOK</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">❌</span>
                    Sebelum PUYOK
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Fee Bulanan:</span>
                      <span className="text-red-400 font-bold">Rp 45M (15%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Waktu Verifikasi:</span>
                      <span className="text-red-400 font-bold">2 minggu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Support:</span>
                      <span className="text-red-400 font-bold">Bahasa Inggris</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pembayaran:</span>
                      <span className="text-red-400 font-bold">Crypto saja</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    Setelah PUYOK
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Fee Bulanan:</span>
                      <span className="text-green-400 font-bold">Rp 9M (3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Waktu Verifikasi:</span>
                      <span className="text-green-400 font-bold">5 menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Support:</span>
                      <span className="text-green-400 font-bold">Indonesia 24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pembayaran:</span>
                      <span className="text-green-400 font-bold">DANA, GoPay, OVO</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">Total Penghematan: Rp 36M/bulan</div>
                <div className="text-green-300">ROI: 400% dalam 6 bulan pertama</div>
              </div>
            </Card>
          </motion.div>

          {/* Expert Endorsement */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
                  AW
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-white font-medium text-lg mb-4 italic">
                    "PUYOK mengubah permainan NFT Indonesia dengan model fee revolusioner dan infrastruktur yang benar-benar memahami ekosistem lokal."
                  </blockquote>
                  <div>
                    <div className="text-white font-bold text-lg">Dr. Andi Wijaya</div>
                    <div className="text-purple-400 font-medium">Blockchain Expert - Universitas Indonesia</div>
                    <div className="text-gray-400 text-sm">Penulis "Masa Depan Digital Indonesia"</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 text-2xl mb-2">🏆</div>
                  <div className="text-purple-300 text-sm font-medium">Expert<br/>Verified</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 5-Minute Liquidation Guarantee */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Garansi Pencairan 5 Menit</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Jika pencairan Anda melebihi 5 menit, kami berikan kompensasi 2x lipat nilai transaksi!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="text-orange-400 font-bold mb-2 text-lg">Jaminan Kecepatan:</div>
                    <div className="text-sm text-orange-300 space-y-2">
                      <div className="flex justify-between">
                        <span>⚡ Verifikasi:</span>
                        <span className="font-bold">≤ 2 menit</span>
                      </div>
                      <div className="flex justify-between">
                        <span>💰 Pencairan:</span>
                        <span className="font-bold">≤ 3 menit</span>
                      </div>
                      <div className="flex justify-between border-t border-orange-500/20 pt-2">
                        <span>🎯 Total:</span>
                        <span className="font-bold text-lg">≤ 5 menit</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="text-green-400 font-bold mb-2 text-lg">Jika Terlambat:</div>
                    <div className="text-sm text-green-300 space-y-2">
                      <div>🎁 Kompensasi 2x nilai transaksi</div>
                      <div>📞 Priority support 24/7</div>
                      <div>🔄 Proses ulang gratis</div>
                      <div>✅ Tanpa pertanyaan tambahan</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-lg p-6">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">99.7% Success Rate</div>
                  <div className="text-yellow-300">Dari 10,847 transaksi bulan ini, hanya 0.3% yang melebihi 5 menit</div>
                </div>
              </div>
            </Card>
          </motion.div>


        </div>
      </motion.section>

      {/* Unified PUYOK Value Proposition - Part 1: Benefits */}
      <motion.section
        className="scroll-section-compact bg-gradient-to-br from-background via-card/20 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span className="text-green-500 font-semibold">MENGAPA PILIH PUYOK</span>
            </div>
            <ScrollFloat
              animationDuration={1.2}
              ease="back.inOut(2)"
              scrollStart="center bottom+=30%"
              scrollEnd="bottom bottom-=20%"
              stagger={0.05}
              containerClassName="mb-6"
              textClassName="text-4xl md:text-5xl font-bold text-white"
            >
              3 Keunggulan yang Anda Rasakan
            </ScrollFloat>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Dari kemudahan pembayaran hingga kepastian nilai - inilah mengapa ribuan pengguna memilih PUYOK
            </p>
          </div>

          <div className="compact-features-grid">
            <motion.div
              className="compact-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">�����</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Bayar dengan Dompet Digital Favorit</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Beli NFT langsung dari saldo DANA-mu. Jual token dan terima uang di GoPay dalam hitungan menit. Tidak perlu belajar cara baru.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex justify-center gap-3 mb-3">
                    {[
                      { icon: '💳', name: 'Card' },
                      { icon: '🟢', name: 'DANA' },
                      { icon: '🟣', name: 'OVO' },
                      { icon: '🏦', name: 'Bank' }
                    ].map((method, index) => (
                      <motion.span
                        key={method.name}
                        className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          rotate: { duration: 0.4 }
                        }}
                        title={method.name}
                      >
                        {method.icon}
                      </motion.span>
                    ))}
                  </div>
                  <div className="text-primary text-sm font-medium">4+ Metode Pembayaran Instant</div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Dapatkan Rupiah Penuh</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Jual hasil karya digitalmu dan langsung dapat Rupiah di rekening. Tidak ada konversi ribet atau fee tersembunyi.
                </p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-500 mb-2">Rp</div>
                  <div className="text-xs text-gray-400">Platform Lain: $8,200</div>
                  <div className="text-sm text-green-500 font-semibold">PUYOK: Rp 125,000,000</div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">😴</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Tidur Nyenyak</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sistem escrow otomatis melindungi setiap transaksi. Pembeli dapat aset setelah bayar, penjual dapat uang setelah aset terkirim.
                </p>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <span className="text-blue-500 font-semibold">100% Aman</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Keamanan:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                        </div>
                        <span className="text-xs text-blue-400 font-bold">100%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Kepuasan:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '98%' }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-green-400 font-bold">98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
          {/* Real-time Conversion Demo */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Demo Konversi Real-time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4">Platform Lain (Ribet)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Jual NFT:</span>
                      <span className="text-red-400">$8,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Konversi ke IDR:</span>
                      <span className="text-red-400">Rp 125,000,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Fee (15%):</span>
                      <span className="text-red-400">-Rp 18,750,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-red-500/20 pt-3">
                      <span className="text-white font-bold">Anda Terima:</span>
                      <span className="text-red-400 font-bold">Rp 106,250,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-green-400 mb-4">PUYOK (Langsung)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Jual NFT:</span>
                      <span className="text-green-400">Rp 125,000,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Konversi:</span>
                      <span className="text-green-400">Tidak perlu!</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Fee (3%):</span>
                      <span className="text-green-400">-Rp 3,750,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-green-500/20 pt-3">
                      <span className="text-white font-bold">Anda Terima:</span>
                      <span className="text-green-400 font-bold">Rp 121,250,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">Selisih: +Rp 15,000,000</div>
                <div className="text-green-300">Lebih untung 14.1% dengan PUYOK!</div>
              </div>
            </Card>
          </motion.div>

          {/* Milestone Counter */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Pencapaian PUYOK Real-time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <motion.div
                    className="text-3xl font-bold text-green-400 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    12,847+
                  </motion.div>
                  <div className="text-green-300 text-sm">Pioneer Users</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <motion.div
                    className="text-3xl font-bold text-blue-400 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    1,247
                  </motion.div>
                  <div className="text-blue-300 text-sm">Unique NFTs</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <motion.div
                    className="text-3xl font-bold text-purple-400 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Rp 2.8B
                  </motion.div>
                  <div className="text-purple-300 text-sm">Total Volume</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <motion.div
                    className="text-3xl font-bold text-orange-400 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    98.7%
                  </motion.div>
                  <div className="text-orange-300 text-sm">Satisfaction</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Payment Methods Showcase */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Metode Pembayaran Indonesia</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { name: 'DANA', icon: '🟢', color: 'blue' },
                  { name: 'GoPay', icon: '���', color: 'green' },
                  { name: 'OVO', icon: '��', color: 'purple' },
                  { name: 'Bank', icon: '🏦', color: 'orange' }
                ].map((method, index) => (
                  <motion.div
                    key={method.name}
                    className={`text-center p-4 bg-${method.color}-500/10 border border-${method.color}-500/20 rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="text-4xl mb-2">{method.icon}</div>
                    <div className={`text-${method.color}-400 font-semibold`}>{method.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Instant</div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
                <div className="text-green-400 font-bold mb-1">✨ Keunggulan Pembayaran PUYOK</div>
                <div className="text-sm text-green-300">Transfer instan • Tanpa biaya tambahan • Support 24/7</div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Tutorial Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-900/10 to-blue-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="text-blue-500 font-semibold">TUTORIAL MUDAH</span>
            </div>

            <ScrollFloat
              animationDuration={1.5}
              ease="power2.inOut"
              scrollStart="center bottom+=40%"
              scrollEnd="bottom bottom-=30%"
              stagger={0.04}
              containerClassName="mb-6"
              textClassName="text-3xl md:text-4xl font-bold text-white"
            >
              Cara Menggunakan PUYOK
            </ScrollFloat>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Panduan sederhana untuk memulai transaksi aman di PUYOK
            </p>

            {/* Progress Tracker */}
            <div className="flex justify-center mb-8">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 text-sm font-medium">Progress Tutorial:</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <motion.div
                        key={step}
                        className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/40"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        whileInView={{ scale: 1, opacity: 1, backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                        transition={{ duration: 0.4, delay: step * 0.2 }}
                      />
                    ))}
                  </div>
                  <span className="text-blue-300 text-sm">4 langkah mudah</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pioneer NFT Preview */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-4">🏆 Preview: Pioneer NFT yang Akan Anda Dapatkan</h3>
              <div className="flex justify-center items-center gap-6">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-3xl"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  🏆
                </motion.div>
                <div className="text-left">
                  <div className="text-yellow-400 font-bold mb-1">PUYOK Pioneer #1247</div>
                  <div className="text-gray-300 text-sm mb-2">Status: Exclusive 1/1</div>
                  <div className="flex gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">Rare</span>
                    <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Tradeable</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                NFT ini akan otomatis masuk ke wallet Anda setelah menyelesaikan tutorial!
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div
              className="group flex items-start gap-4 p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-xl hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-green-400 font-bold text-lg">1</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">📱 Daftar dengan Nomor HP</h3>
                <p className="text-gray-300 mb-3">
                  Cukup masukkan nomor HP, verifikasi OTP, dan langsung bisa mulai trading. Tidak ada KYC yang merepotkan.
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400 font-medium">
                    ⏱️ ~2 menit
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400 font-medium">
                    ✅ Instant
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="group flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: -5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-blue-400 font-bold text-lg">2</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">💰 Pilih Metode Pembayaran</h3>
                <p className="text-gray-300 mb-3">
                  Bayar pakai DANA, GoPay, OVO, atau transfer bank. Semua metode yang sudah familiar dengan Anda.
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-medium">
                    🟢 DANA
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-medium">
                    �� GoPay
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-medium">
                    🟣 OVO
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="group flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-purple-400 font-bold text-lg">3</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">🛡️ Escrow Otomatis Aktif</h3>
                <p className="text-gray-300 mb-3">
                  Sistem escrow melindungi kedua belah pihak. Pembeli dapat aset setelah bayar, penjual dapat uang setelah transfer aset.
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-400 font-medium">
                    🛡️ 100% Aman
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-400 font-medium">
                    ⚙️ Otomatis
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="group flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-xl hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: -5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/30 transition-colors"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-orange-400 font-bold text-lg">4</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">🏆 Dapatkan Pioneer NFT</h3>
                <p className="text-gray-300 mb-3">
                  NFT 1/1 eksklusif otomatis dikirim ke wallet Anda untuk setiap milestone pertama yang dicapai.
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 text-xs text-orange-400 font-medium">
                    🏆 Eksklusif
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 text-xs text-orange-400 font-medium">
                    🎁 Gratis
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 text-xs text-orange-400 font-medium">
                    ✨ 1/1
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonial Carousel */}
          <motion.div
            className="mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="text-sm text-green-400 font-medium mb-2">💬 Kata Mereka yang Sudah Mencoba</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      R
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">@rini_creator</div>
                      <div className="text-gray-400 text-xs">Digital Artist</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "Tutorial PUYOK jelas banget! 10 menit udah bisa jual NFT pertama."
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      D
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">@deni_trader</div>
                      <div className="text-gray-400 text-xs">NFT Collector</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "Gampang banget daftar pakai HP, langsung dapat Pioneer NFT!"
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA */}
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <Link href="/marketplace">
                  <motion.span
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    �� Mulai Sekarang & Dapat Pioneer NFT!
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </Button>
              <p className="text-gray-400 text-sm mt-4">
                ✨ Gratis daftar • 🏆 Pioneer NFT eksklusif • 🛡️ 100% aman
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pioneer NFT Reward System Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-900/20 via-background to-yellow-900/20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-sm">🏆</span>
              </div>
              <span className="text-yellow-500 font-semibold">SISTEM REWARD EKSKLUSIF</span>
            </div>

            {/* Exclusive Alert Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(239, 68, 68, 0.4)',
                  '0 0 0 8px rgba(239, 68, 68, 0)',
                  '0 0 0 0 rgba(239, 68, 68, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-red-400 font-bold text-sm animate-pulse">⚠️ EKSKLUSIF</span>
              <span className="text-red-300 text-sm">Hanya Pioneer Pertama yang Mendapat NFT!</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400">
                Jadilah Legenda
              </span>
              <br />
              <span className="text-white">PUYOK</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hanya <span className="text-yellow-400 font-bold text-2xl">USER PERTAMA</span> yang melakukan aksi bersejarah
              akan mendapatkan <span className="text-purple-400 font-semibold">NFT Pioneer 1/1</span> yang tidak bisa diduplikasi selamanya.
            </motion.p>

            {/* Live Status Counter */}
            <motion.div
              className="flex justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">3</div>
                <div className="text-green-300 text-sm">NFT Sudah Diklaim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1 animate-pulse">9</div>
                <div className="text-yellow-300 text-sm">Masih Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">18</div>
                <div className="text-purple-300 text-sm">Hari Tanpa Pioneer</div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced NFT Pioneer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* First Mint Card - CLAIMED */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 p-6 h-full relative overflow-hidden">
                {/* Claimed Overlay */}
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <div className="text-red-400 font-bold text-lg mb-2">SUDAH DIKLAIM</div>
                    <div className="text-gray-300 text-sm">oleh @budi_art</div>
                    <div className="text-xs text-gray-500 mt-1">24 Jan 2024, 14:32</div>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white font-bold">✓ CLAIMED</Badge>
                </div>
                <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl">🎨</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pertama Mencetak Karya</h3>
                <p className="text-gray-300 mb-4">NFT unik "Genesis Creator" untuk kreator pertama yang mencetak karya digital di PUYOK</p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-500 text-sm font-medium">Legendary • 1/1</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* First Trade Card - AVAILABLE */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-6 h-full hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden">
                {/* Available Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />

                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white font-bold animate-pulse">⚡ AVAILABLE</Badge>
                </div>
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pertama Bertransaksi</h3>
                <p className="text-gray-300 mb-4">NFT eksklusif "Pioneer Trader" untuk trader pertama yang menyelesaikan escrow dengan sukses</p>

                {/* Urgency Timer */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-yellow-400 text-sm font-medium mb-1">⏱️ Kesempatan Terbatas</div>
                    <div className="text-yellow-300 text-xs">Hanya 1 orang yang bisa mendapat NFT ini!</div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-500 text-sm font-medium">Epic • 1/1</span>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-2 animate-pulse"
                  >
                    🏆 Jadilah yang Pertama!
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Community Builder Card - UPCOMING */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 border border-gray-600/30 p-6 h-full relative overflow-hidden">
                {/* Upcoming Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <div className="text-gray-400 font-bold text-lg mb-2">BELUM TERSEDIA</div>
                    <div className="text-yellow-400 text-sm mb-1">⏱️ Mulai 1 Agustus 2024</div>
                    <div className="text-xs text-gray-500">12 hari lagi</div>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-gray-500 text-white font-bold">🕒 UPCOMING</Badge>
                </div>
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl">🤝</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pertama Mengajak Teman</h3>
                <p className="text-gray-300 mb-4">NFT spesial "Community Builder" untuk pioneer yang berhasil mengajak 10+ teman bergabung</p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">Rare • 1/1</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Historical Proof Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-brand-green/10 via-purple-500/10 to-blue-500/10 border border-brand-green/20 p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔥</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Bukti Sejarah Digital</h3>
                  <p className="text-gray-300">Setiap NFT Pioneer bersifat 1/1 dan tidak bisa diduplikasi</p>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <p className="text-brand-green font-medium text-lg">
                  "NFT ini adalah bukti sejarah bahwa Anda adalah pelopor di PUYOK dan tidak akan bisa diduplikasi.
                  Jadilah bagian dari cerita sukses yang terukir selamanya di blockchain."
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Community Governance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="text-purple-400">Suara Anda</span> Menentukan Masa Depan PUYOK
                </h3>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Jika selama 30 hari tidak ada aksi baru yang memicu pencetakan NFT Pioneer,
                  sistem akan otomatis membuka voting untuk fitur atau aksi baru.
                  <span className="text-purple-400 font-semibold"> PUYOK berkembang sesuai keinginan komunitas!</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-400 font-bold text-xl">1</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Deteksi Stagnasi</h4>
                  <p className="text-gray-300 text-sm">Sistem memantau aktivitas pioneer NFT secara otomatis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 font-bold text-xl">2</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Buka Voting</h4>
                  <p className="text-gray-300 text-sm">Proposal fitur baru dirilis ke komunitas untuk dipilih</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 font-bold text-xl">3</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Eksekusi Upgrade</h4>
                  <p className="text-gray-300 text-sm">Fitur terpilih langsung diimplementasikan ke platform</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  asChild
                >
                  <Link href="/marketplace">
                    🏆 Bergabunglah Sekarang dan Jadilah Bagian dari Sejarah!
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Gasless Transactions Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-900/20 via-background to-green-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-blue-500 font-semibold">TEKNOLOGI GASLESS</span>
            </div>

            {/* Live Demo Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(34, 197, 94, 0.4)',
                  '0 0 0 8px rgba(34, 197, 94, 0)',
                  '0 0 0 0 rgba(34, 197, 94, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-green-400 font-bold text-sm animate-pulse">🔴 DEMO LANGSUNG</span>
              <span className="text-green-300 text-sm">Transaksi Real-time Tanpa Gas!</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transaksi Tanpa Biaya Gas
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Semudah Berbelanja Online
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              PUYOK menggunakan teknologi <span className="text-blue-400 font-semibold">meta-transaksi</span> canggih
              sehingga Anda tidak perlu memikirkan biaya gas. Cukup tanda tangani transaksi dengan dompet Anda,
              dan <span className="text-green-400 font-semibold">biaya gas akan ditanggung oleh sistem</span>.
            </motion.p>

            {/* Live Gas Savings Counter */}
            <motion.div
              className="flex justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">24,891+</div>
                <div className="text-green-300 text-sm">Transaksi Gasless Berhasil</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">Rp 189M</div>
                <div className="text-blue-300 text-sm">Gas Fee Ditanggung PUYOK</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">3.2 detik</div>
                <div className="text-purple-300 text-sm">Rata-rata Kecepatan</div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Visual Flow Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-border rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Pengguna PUYOK</h4>
                      <p className="text-gray-300 text-sm">Anda menandatangani permintaan transaksi</p>
                    </div>
                  </div>
                  <div className="text-blue-400 text-2xl">→</div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-border rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Tanda Tangan Digital</h4>
                      <p className="text-gray-300 text-sm">Tanpa biaya gas, aman dengan kriptografi</p>
                    </div>
                  </div>
                  <div className="text-blue-400 text-2xl">→</div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-border rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Relayer PUYOK</h4>
                      <p className="text-gray-300 text-sm">Sistem kami bayar gas & kirim ke blockchain</p>
                    </div>
                  </div>
                  <div className="text-blue-400 text-2xl">→</div>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⛓️</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Blockchain</h4>
                      <p className="text-green-400 text-sm font-medium">✅ Transaksi berhasil tanpa biaya untuk Anda!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits & Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                Mengapa Gasless itu <span className="text-blue-400">Penting?</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-colors">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Ramah Pengguna Baru</h4>
                    <p className="text-gray-300">Tidak perlu memiliki cryptocurrency untuk biaya gas. Langsung bisa trading!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-colors">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xl">���</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Pengalaman Seperti Web2</h4>
                    <p className="text-gray-300">Transaksi semulus aplikasi konvensional yang sudah familiar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg hover:bg-purple-500/10 transition-colors">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Keamanan Tetap Terjamin</h4>
                    <p className="text-gray-300">Menggunakan standar EIP-2771 yang sudah diaudit keamanannya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/10 transition-colors">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 text-xl">���</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Transaksi Lebih Cepat</h4>
                    <p className="text-gray-300">Tidak perlu menunggu konfirmasi gas fee, proses otomatis dan instant</p>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="mt-8 p-6 bg-background/50 border border-border rounded-lg">
                <h4 className="text-white font-bold mb-4">��� Teknologi Di Balik Layar:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">Meta-Transactions</Badge>
                  <Badge variant="outline" className="border-green-500/50 text-green-400">EIP-2771</Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">MinimalForwarder.sol</Badge>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">Signature Verification</Badge>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Siap Merasakan Kemudahan Transaksi Gasless?
              </h3>
              <p className="text-gray-300 mb-6">
                Bergabunglah dengan ribuan pengguna yang sudah menikmati pengalaman trading tanpa ribet biaya gas!
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                asChild
              >
                <Link href="/marketplace">
                  🚀 Coba Sekarang, Rasakan Kemudahannya!
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Simple CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary/10 to-purple-600/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Siap Mulai Trading?
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Bergabunglah dengan ribuan trader yang sudah mempercayai PUYOK untuk transaksi aset digital mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg" asChild>
              <Link href="/marketplace">
                🛒 Mulai Beli Aset
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/create-listing">
                💰 Jual Aset Anda
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <Footer />

      {/* Scroll to Top Bubble */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center transition-all duration-300 ${
          showScrollToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollToTop ? 1 : 0,
          scale: showScrollToTop ? 1 : 0.75
        }}
        whileHover={{
          scale: 1.1,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            y: [0, -3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90" />
        </motion.div>

        {/* Subtle pulse ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </motion.button>
    </motion.div>
  )
}
