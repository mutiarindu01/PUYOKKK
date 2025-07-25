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
import Link from "next/link"
import Footer from "@/components/Footer"
import MarketplaceLoading from "@/components/MarketplaceLoading"
import BackgroundParticles from "@/components/BackgroundParticles"
import SplineBackground, { SplineBackgroundDemo } from "@/components/SplineBackground"
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher"
import SophisticatedMarketplace from "@/components/SophisticatedMarketplace"
import ProfileCard from "@/components/ProfileCard"
import ScrollFloat from "@/components/ScrollFloat"
import { motion } from "framer-motion"

// Cleaned up - all marketplace data and components moved to SophisticatedMarketplace

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundType, setBackgroundType] = useState<"gradient" | "particles" | "spline" | "mesh">("spline")
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
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

      {/* Voting System Preview */}
      <motion.section
        className="py-16 bg-gradient-to-br from-purple-900/10 to-blue-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Card className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">🗳️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Community Governance</h3>
                  <p className="text-sm text-gray-400">Otomatis trigger voting setiap 30 hari</p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 animate-pulse">
                3 Proposal Aktif
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card/30 border border-purple-500/20 rounded-lg p-4">
                <div className="text-sm text-purple-400 mb-1">Proposal #1</div>
                <div className="text-white font-medium mb-2">New Payment Method: QRIS</div>
                <div className="flex justify-between text-xs">
                  <span className="text-green-400">68% Setuju</span>
                  <span className="text-gray-400">2 hari lagi</span>
                </div>
              </div>

              <div className="bg-card/30 border border-blue-500/20 rounded-lg p-4">
                <div className="text-sm text-blue-400 mb-1">Proposal #2</div>
                <div className="text-white font-medium mb-2">Reduce Trading Fees</div>
                <div className="flex justify-between text-xs">
                  <span className="text-green-400">84% Setuju</span>
                  <span className="text-gray-400">5 hari lagi</span>
                </div>
              </div>

              <div className="bg-card/30 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-sm text-yellow-400 mb-1">Proposal #3</div>
                <div className="text-white font-medium mb-2">NFT Staking Feature</div>
                <div className="flex justify-between text-xs">
                  <span className="text-orange-400">45% Setuju</span>
                  <span className="text-gray-400">1 minggu lagi</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <Link href="/voting">
                  🗳️ Vote & Terima POAP NFT Otomatis
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Pioneer NFT Behavior Tracker Preview */}
      <motion.section
        className="py-16 bg-gradient-to-br from-orange-900/10 to-red-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Pioneer NFT Auto-Delivery</h2>
            <p className="text-gray-300">Sistem AI otomatis mint & kirim NFT 1/1 ke wallet Anda saat milestone tercapai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Auto-Minted Rewards</h3>
                  <p className="text-sm text-gray-400">Instant delivery to wallet</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card/30 border border-orange-500/20 rounded-lg">
                  <span className="text-white">First Escrow Transaction</span>
                  <Badge className="bg-green-500/10 text-green-400">✅ Auto Mint</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-card/30 border border-orange-500/20 rounded-lg">
                  <span className="text-white">First NFT Creation</span>
                  <Badge className="bg-green-500/10 text-green-400">✅ Auto Mint</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-card/30 border border-orange-500/20 rounded-lg">
                  <span className="text-white">First Voting Participation</span>
                  <Badge className="bg-green-500/10 text-green-400">✅ Auto Mint</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">����</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Monitoring</h3>
                  <p className="text-sm text-gray-400">Stagnation detection</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-card/30 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Innovation Rate</span>
                    <span className="text-green-400 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: "98%"}}></div>
                  </div>
                </div>

                <div className="bg-card/30 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-sm text-blue-400 mb-1">Next Auto-Voting</div>
                  <div className="text-white font-medium">27 hari lagi</div>
                  <div className="text-xs text-gray-400">Berdasarkan aktivitas community</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Live Activity Feed */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Aktivitas Terbaru
              </h2>
            </div>
            <p className="text-gray-300">
              Pantau transaksi dan aktivitas terbaru dari komunitas PUYOK
            </p>
          </div>

          <Card className="bg-gray-900/60 border border-gray-700 p-6 rounded-xl">
            <div className="space-y-4">
              {liveActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:border-brand-green/30 transition-colors"
                >
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{activity.user}</span>
                      {activity.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 mb-1">
                      {activity.action} <Link href="#" className="text-brand-green hover:underline">{activity.item}</Link>
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand-green font-bold">{activity.price}</span>
                      <span className="text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button
                variant="outline"
                className="border-brand-green/50 text-brand-green hover:bg-brand-green/10"
                asChild
              >
                <Link href="/activity">Lihat Semua Aktivitas</Link>
              </Button>
            </div>
          </Card>
        </div>
      </motion.section>



      {/* Trust Badges & Payment Partners Section */}
      <section className="py-12 bg-card/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-6">Didukung Pembayaran:</p>

            {/* Payment Partner Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  DANA
                </div>
                <span className="text-foreground font-medium">DANA</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  Go
                </div>
                <span className="text-foreground font-medium">GoPay</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  OVO
                </div>
                <span className="text-foreground font-medium">OVO</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  BRI
                </div>
                <span className="text-foreground font-medium">Bank BRI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  BCA
                </div>
                <span className="text-foreground font-medium">Bank BCA</span>
              </div>
            </div>


          </div>

          {/* Enhanced Escrow Transparency */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-4">🛡️ Proteksi PUYOK</h3>

                  {/* Simplified Contract Verification */}
                  <div className="bg-card/50 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Contract Address:</span>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://sepolia.etherscan.io/address/0x86391db0f7614e31cbaefb0b881f2fb3dbffbffb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors font-mono text-sm flex items-center gap-1"
                        >
                          0x863...bffb
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                          ✓ Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

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
              Kenapa PUYOK Jauh Lebih Baik?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Platform global bikin ribet dan mahal. PUYOK hadir sebagai solusi lokal yang benar-benar memahami kebutuhan Anda.
            </p>
          </div>

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
                      defaultValue="10000000"
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, #10B981 0%, #10B981 20%, #374151 20%, #374151 100%)'
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>Rp 500K</span>
                      <span className="text-primary font-bold">Rp 10M</span>
                      <span>Rp 100M</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                    <div className="text-red-400 text-sm font-medium mb-2">Platform Global</div>
                    <div className="text-red-500 text-2xl font-bold mb-1">Rp 1.500.000</div>
                    <div className="text-red-400 text-xs">Fee 15%</div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <div className="text-primary text-sm font-medium mb-2">PUYOK</div>
                    <div className="text-primary text-2xl font-bold mb-1">Rp 300.000</div>
                    <div className="text-primary text-xs">Fee 3%</div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <div className="text-green-400 text-sm font-medium mb-2">Penghematan Anda</div>
                    <div className="text-green-500 text-2xl font-bold mb-1">Rp 1.200.000</div>
                    <div className="text-green-400 text-xs">Hemat 80%!</div>
                  </div>
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
                  <span className="text-4xl">����🇩</span>
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
                      <span className="text-primary text-sm">📱</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pembayaran Familiar</p>
                      <p className="text-primary text-sm">DANA, GoPay, OVO, Bank Lokal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">🗨️</span>
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

          {/* Social Proof & Testimonial */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20 p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-6 h-6 text-primary" />
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">PENGHEMATAN NYATA</span>
                  </div>
                  <blockquote className="text-white font-medium text-lg mb-3">
                    "Berhasil hemat 12 juta rupiah dengan fee rendah PUYOK! Dulu pake platform lain habis buat biaya admin."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <div className="text-white font-medium">@budi_nft_art</div>
                      <div className="text-gray-400 text-sm">NFT Creator • 89 Transaksi Sukses</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-1">Rp 12M</div>
                  <div className="text-green-400 text-sm">Total Penghematan</div>
                </div>
              </div>
            </Card>
          </motion.div>


        </div>
      </motion.section>

      {/* Unified PUYOK Value Proposition - Part 1: Benefits */}
      <motion.section
        className="py-32 bg-gradient-to-br from-background via-card/20 to-background"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">���</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Bayar dengan Dompet Digital Favorit</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Beli NFT langsung dari saldo DANA-mu. Jual token dan terima uang di GoPay dalam hitungan menit. Tidak perlu belajar cara baru.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex justify-center gap-3 mb-2">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">🟢</span>
                    <span className="text-2xl">🟣</span>
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div className="text-primary text-sm font-medium">4+ Metode Pembayaran</div>
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
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <span className="text-blue-500 font-semibold">100% Aman</span>
                  </div>
                  <div className="text-xs text-gray-400">Keamanan: ████████ 100%</div>
                  <div className="text-xs text-gray-400">Kepuasan: ███████▌ 98%</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tutorial Section with ScrollFloat */}
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

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Panduan sederhana untuk memulai transaksi aman di PUYOK
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">📱 Daftar dengan Nomor HP</h3>
                <p className="text-gray-300">
                  Cukup masukkan nomor HP, verifikasi OTP, dan langsung bisa mulai trading. Tidak ada KYC yang merepotkan.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">💰 Pilih Metode Pembayaran</h3>
                <p className="text-gray-300">
                  Bayar pakai DANA, GoPay, OVO, atau transfer bank. Semua metode yang sudah familiar dengan Anda.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🛡️ Escrow Otomatis Aktif</h3>
                <p className="text-gray-300">
                  Sistem escrow melindungi kedua belah pihak. Pembeli dapat aset setelah bayar, penjual dapat uang setelah transfer aset.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🏆 Dapatkan Pioneer NFT</h3>
                <p className="text-gray-300">
                  NFT 1/1 eksklusif otomatis dikirim ke wallet Anda untuk setiap milestone pertama yang dicapai.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              asChild
            >
              <Link href="/marketplace">
                🚀 Mulai Sekarang
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Trending Tokens Section */}
      <motion.section
        id="trending-tokens"
        className="py-20 bg-card/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-blue-500 font-semibold">TRENDING SEKARANG</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Token yang Sedang Tren
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Cryptocurrency dengan volume trading tertinggi dan paling diminati saat ini
            </p>
          </div>

          {/* Token Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Bitcoin Card */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">₿</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Bitcoin</h3>
                      <p className="text-sm text-gray-400">BTC</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20">🔥 #1</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 850.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-green-400 font-medium">+2.15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-primary">23 orders</span>
                  </div>
                </div>

                {/* Top Seller */}
                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        CM
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">@crypto_master</div>
                        <div className="text-xs text-gray-400">98.5% sukses • 156 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <span className="text-xs text-gray-400 ml-1">+2 lainnya</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Beli Sekarang
                </Button>
              </Card>
            </motion.div>

            {/* Ethereum Card */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Ξ</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Ethereum</h3>
                      <p className="text-sm text-gray-400">ETH</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">🔥 #2</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 45.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-red-400 font-medium">-1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 1.8M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-primary">18 orders</span>
                  </div>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ET
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">@eth_trader</div>
                        <div className="text-xs text-gray-400">97.2% sukses • 89 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <span className="text-xs text-gray-400 ml-1">+3 lainnya</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Beli Sekarang
                </Button>
              </Card>
            </motion.div>

            {/* USDT Card */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">₮</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Tether</h3>
                      <p className="text-sm text-gray-400">USDT</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">🔥 #3</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 15.750</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-green-400 font-medium">+0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 3.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-primary">34 orders</span>
                  </div>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ST
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">@stable_pro</div>
                        <div className="text-xs text-gray-400">99.1% sukses • 234 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <div className="w-6 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">B</div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Beli Sekarang
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* View All Tokens CTA */}
          <div className="text-center">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
              <Link href="/marketplace">
                Lihat Semua Token
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Featured NFTs Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="text-purple-500 font-semibold">KOLEKSI UNGGULAN</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              NFT Pilihan Minggu Ini
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Koleksi NFT terpilih dengan kualitas dan nilai investasi terbaik dari kreator Indonesia
            </p>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* NFT 1 */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F1234567890abcdef"
                    alt="Mystical Dragon #001"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500/90 text-white border-none">
                    Legendary
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Mystical Dragon #001</h3>
                  <p className="text-sm text-gray-400 mb-3">Indonesian Mythology Collection</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Harga</span>
                      <span className="text-white font-bold">Rp 25.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Pemilik</span>
                      <span className="text-primary text-sm">@dragon_artist</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Ajukan Penawaran
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* NFT 2 */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Fabcdef1234567890"
                    alt="Batik Genesis #042"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-500/90 text-white border-none">
                    Rare
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Batik Genesis #042</h3>
                  <p className="text-sm text-gray-400 mb-3">Traditional Art Digital</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Harga</span>
                      <span className="text-white font-bold">Rp 15.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Pemilik</span>
                      <span className="text-primary text-sm">@batik_creator</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Ajukan Penawaran
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* NFT 3 */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F0987654321fedcba"
                    alt="Wayang Punk #117"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-500/90 text-white border-none">
                    Epic
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Wayang Punk #117</h3>
                  <p className="text-sm text-gray-400 mb-3">Modern Traditional Fusion</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Harga</span>
                      <span className="text-white font-bold">Rp 12.000.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Pemilik</span>
                      <span className="text-primary text-sm">@wayang_modern</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Ajukan Penawaran
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* NFT 4 */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Ffedcba0987654321"
                    alt="Cyberpunk Jakarta #055"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500/90 text-white border-none">
                    Common
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Cyberpunk Jakarta #055</h3>
                  <p className="text-sm text-gray-400 mb-3">Future City Collection</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Harga</span>
                      <span className="text-white font-bold">Rp 8.500.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Pemilik</span>
                      <span className="text-primary text-sm">@cyber_artist</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Ajukan Penawaran
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* View All NFTs CTA */}
          <div className="text-center">
            <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" asChild>
              <Link href="/marketplace?tab=nft">
                Jelajahi Semua NFT
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
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
