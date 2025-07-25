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
        className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-y border-green-500/20 py-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-green-400 font-medium">🔒 Escrow Terverifikasi Etherscan</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                ✓ Verified Contract
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">💳</span>
              <span className="text-gray-300">DANA • GoPay • OVO Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs animate-pulse">
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
                <Badge className="bg-brand-green/20 text-brand-green border-brand-green/50 px-4 py-2 text-sm font-medium">
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-blue-400">
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
                  <div className="text-2xl md:text-3xl font-bold text-brand-green mb-1">{liveStats.collections}</div>
                  <div className="text-sm text-gray-400">Koleksi Unik</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{liveStats.partners}</div>
                  <div className="text-sm text-gray-400">Mitra Resmi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">{liveStats.creators}</div>
                  <div className="text-sm text-gray-400">Pioneers NFT</div>
                </div>
                <div className="text-center relative">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">156</div>
                  <div className="text-sm text-gray-400">Active Voters</div>
                  <Badge className="absolute -top-2 -right-1 bg-green-500 text-white text-xs animate-pulse">
                    LIVE
                  </Badge>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-brand-green/25 transition-all"
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
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Legendary Awards</h3>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 animate-pulse">
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
                  className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/50"
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




