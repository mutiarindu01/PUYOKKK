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
  Calculator,
  Globe,
  Clock,
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
import TrustBar from "@/components/TrustBar"
import SafeTransactionSteps from "@/components/SafeTransactionSteps"
import GaslessSection from "@/components/GaslessSection"
import ValuePropositionSection from "@/components/ValuePropositionSection"
import LegendSection from "@/components/LegendSection"
import { motion } from "framer-motion"
import { formatRupiah, formatVolume, formatActivity, formatNumber } from "@/lib/formatters"

// Cleaned up - all marketplace data and components moved to SophisticatedMarketplace

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundType, setBackgroundType] = useState<"gradient" | "particles" | "spline" | "mesh">("spline")
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transactionValue, setTransactionValue] = useState(10000000)
  const [visibleNFTs, setVisibleNFTs] = useState(3) // Default to desktop
  const lastScrollY = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

  // Live stats data
  const [liveStats, setLiveStats] = useState({
    collections: formatNumber(1247),
    partners: formatNumber(89),
    creators: formatNumber(2350)
  })

  // Featured NFTs Data - Extended for better infinite scroll
  const featuredNFTs = [
    {
      id: 1,
      name: "Mystical Garuda Shield",
      collection: "Indonesian Mythology",
      price: formatRupiah(45000000),
      floorPrice: formatRupiah(42000000),
      volume24h: formatVolume(165500000),
      rarity: "Legendary",
      image: "/placeholder.svg",
      creator: "@MythArt_ID",
      verified: true,
      likes: 324,
      views: formatActivity(1567),
      properties: ["Fire Element", "Golden Shield", "Ancient Power"],
      rarityColor: "from-red-500 to-orange-500",
      bidCount: 12
    },
    {
      id: 2,
      name: "Rare Batik Medallion",
      collection: "Traditional Arts",
      price: formatRupiah(25800000),
      floorPrice: formatRupiah(23000000),
      volume24h: formatVolume(89300000),
      rarity: "Rare",
      image: "/placeholder.svg",
      creator: "@BatikMaster",
      verified: true,
      likes: 198,
      views: formatActivity(856),
      properties: ["Traditional Pattern", "Java Style", "Hand Drawn"],
      rarityColor: "from-orange-500 to-yellow-500",
      bidCount: 8
    },
    {
      id: 3,
      name: "Cyberpunk Jakarta",
      collection: "Future Indonesia",
      price: formatRupiah(18500000),
      floorPrice: formatRupiah(16200000),
      volume24h: formatVolume(67800000),
      rarity: "Epic",
      image: "/placeholder.svg",
      creator: "@PixelIndo",
      verified: false,
      likes: 156,
      views: formatActivity(634),
      properties: ["Neon Lights", "Urban Style", "Night Scene"],
      rarityColor: "from-blue-500 to-purple-500",
      bidCount: 5
    },
    {
      id: 4,
      name: "Wayang Punk Genesis",
      collection: "Modern Traditional",
      price: formatRupiah(32000000),
      floorPrice: formatRupiah(29500000),
      volume24h: formatVolume(125700000),
      rarity: "Epic",
      image: "/placeholder.svg",
      creator: "@WayangPunk",
      verified: true,
      likes: 267,
      views: formatActivity(1134),
      properties: ["Cyber Enhancement", "Traditional Mask", "Neon Glow"],
      rarityColor: "from-blue-500 to-purple-500",
      bidCount: 15
    },
    {
      id: 5,
      name: "Divine Phoenix Crown",
      collection: "Legendary Collection",
      price: formatRupiah(78000000),
      floorPrice: formatRupiah(75000000),
      volume24h: formatVolume(234200000),
      rarity: "Mythical",
      image: "/placeholder.svg",
      creator: "@PhoenixArt",
      verified: true,
      likes: 445,
      views: formatActivity(2341),
      properties: ["Divine Wings", "Sacred Fire", "Royal Crown"],
      rarityColor: "from-purple-500 to-pink-500",
      bidCount: 22
    },
    {
      id: 6,
      name: "Sacred Temple Guardian",
      collection: "Ancient Spirits",
      price: formatRupiah(39500000),
      floorPrice: formatRupiah(36000000),
      volume24h: formatVolume(98500000),
      rarity: "Rare",
      image: "/placeholder.svg",
      creator: "@TempleKeeper",
      verified: true,
      likes: 189,
      views: formatActivity(745),
      properties: ["Guardian Spirit", "Temple Stone", "Ancient Magic"],
      rarityColor: "from-orange-500 to-yellow-500",
      bidCount: 11
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
    setCurrentSlide((prev) => {
      const newSlide = (prev + 1) % legendaryAwards.length
      if (scrollRef.current) {
        const cardWidth = 320 // 300px width + 20px gap
        scrollRef.current.scrollTo({
          left: newSlide * cardWidth,
          behavior: 'smooth'
        })
      }
      return newSlide
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = (prev - 1 + legendaryAwards.length) % legendaryAwards.length
      if (scrollRef.current) {
        const cardWidth = 320
        scrollRef.current.scrollTo({
          left: newSlide * cardWidth,
          behavior: 'smooth'
        })
      }
      return newSlide
    })
  }

  // Responsive screen size detection
  useEffect(() => {
    const updateVisibleNFTs = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleNFTs(1) // Mobile: 1 NFT
      } else if (width < 1024) {
        setVisibleNFTs(2) // Tablet: 2 NFTs
      } else {
        setVisibleNFTs(3) // Desktop: 3 NFTs
      }
    }

    updateVisibleNFTs()
    window.addEventListener('resize', updateVisibleNFTs)
    return () => window.removeEventListener('resize', updateVisibleNFTs)
  }, [])

  // Auto slide effect - loops back to beginning after reaching end
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = Math.max(0, featuredNFTs.length - visibleNFTs)
        if (prev >= maxSlide) {
          // Return to first slide when reaching the end
          return 0
        }
        return prev + 1
      })
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [visibleNFTs])

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

      {/* Enhanced Trust Bar */}
      <TrustBar />

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
                        avatarUrl="https://cdn.builder.io/api/v1/file/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Ff68d04f7302e4504a1b068fc78cb436e"
                        miniAvatarUrl="https://cdn.builder.io/api/v1/image/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Fa4852b16ed014ea5a8905781db68c81d"
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

      {/* Safe Transaction Steps Section */}
      <SafeTransactionSteps />

      {/* Gasless Section */}
      <GaslessSection />

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* Legend Section */}
      <LegendSection />

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
                    <Badge className="bg-slate-700 text-white font-bold">#1 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">Rp 850.000.000</span>
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
                        <span className="text-white font-bold">Rp 2.1JT</span>
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
                      <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">Verified</Badge>
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
                    <Badge className="bg-slate-700 text-white font-bold">#2 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">Rp 45.000.000</span>
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
                    <Badge className="bg-slate-700 text-white font-bold">#3 Trending</Badge>
                  </div>

                  {/* Price with Live Change Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">Rp 15.750</span>
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
                        <span className="text-white font-bold">Rp 3.2JT</span>
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
                      <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/30 text-xs">Verified</Badge>
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
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatVolume(7100000)}</div>
              <div className="text-sm text-gray-400">Total Volume 24h</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatNumber(75)}</div>
              <div className="text-sm text-gray-400">Order Aktif</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatNumber(142)}</div>
              <div className="text-sm text-gray-400">Trader Online</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">98,5%</div>
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
              onClick={() => setCurrentSlide(prev => {
                const maxSlide = Math.max(0, featuredNFTs.length - visibleNFTs)
                return prev === 0 ? maxSlide : prev - 1
              })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background/90 text-white border border-border backdrop-blur-sm rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentSlide(prev => {
                const maxSlide = Math.max(0, featuredNFTs.length - visibleNFTs)
                return prev >= maxSlide ? 0 : prev + 1
              })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background/90 text-white border border-border backdrop-blur-sm rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Mobile Swipe Container */}
            <div className="overflow-x-auto pb-4 hide-scrollbar md:overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out min-w-max md:min-w-0"
                style={{
                  transform: `translateX(-${currentSlide * (visibleNFTs === 1 ? 350 : visibleNFTs === 2 ? 350 : 350)}px)`,
                }}
              >
                {/* Enhanced NFT Cards */}
                {featuredNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    className="min-w-[320px] sm:min-w-[350px] md:min-w-[350px] lg:min-w-[350px] group"
                    style={{
                      width: visibleNFTs === 1 ? '320px' : visibleNFTs === 2 ? '350px' : '350px'
                    }}
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
                            <div className="text-lg font-bold text-white">{nft.price}</div>
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
              {Array.from({ length: Math.max(1, featuredNFTs.length - visibleNFTs + 1) }).map((_, index) => (
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
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatNumber(2341)}</div>
              <div className="text-sm text-gray-400">NFT Listed</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatNumber(89)}</div>
              <div className="text-sm text-gray-400">Live Auctions</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatNumber(1247)}</div>
              <div className="text-sm text-gray-400">Active Collectors</div>
            </div>
            <div className="text-center p-4 bg-card/20 border border-border/30 rounded-lg">
              <div className="text-2xl font-bold text-slate-300 mb-1">{formatVolume(234000000)}</div>
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



      <div />

      <div />

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
