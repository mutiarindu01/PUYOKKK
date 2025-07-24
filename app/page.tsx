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
import { motion } from "framer-motion"

// Cleaned up - all marketplace data and components moved to SophisticatedMarketplace

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundType, setBackgroundType] = useState<"gradient" | "particles" | "spline" | "mesh">("spline")
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const lastScrollY = useRef(0)
  const router = useRouter()

  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

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

              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex items-center gap-4 ml-6">
                <DropdownMenu open={isExploreDropdownOpen} onOpenChange={setIsExploreDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-foreground hover:bg-accent">
                      Jelajahi <ChevronDown className="ml-1 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border text-foreground w-56">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Aset</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-card border-border text-foreground">
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#marketplace")
                          }}
                        >
                          NFT
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#marketplace")
                          }}
                        >
                          Token
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Kategori Seni</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#")
                          }}
                        >
                          Seni
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#")
                          }}
                        >
                          Fotografi
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#")
                          }}
                        >
                          Gaming
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Tentang PUYOK</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-card border-border text-foreground">
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#how-it-works")
                          }}
                        >
                          Bagaimana Kami Bekerja
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#why-different")
                          }}
                        >
                          Mengapa PUYOK
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("#testimonials")
                          }}
                        >
                          Testimoni
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("/help")
                          }}
                        >
                          Pusat Bantuan
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setIsExploreDropdownOpen(false)
                            router.push("/whitepaper")
                          }}
                        >
                          Whitepaper
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
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
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-accent bg-transparent hidden md:inline-flex"
                asChild
              >
                <Link href="/dashboard">Masuk</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hidden md:inline-flex">
                <Plus className="w-4 h-4 mr-2" />
                Jual Aset
              </Button>

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

      {/* Enhanced Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tukar Aset Digital,
            <br />
            <span className="text-primary">Terima Rupiah.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Marketplace P2P pertama di Indonesia untuk menukar NFT & Token dengan DANA, GoPay, OVO, dan transfer bank.
          </p>
          {/* Tiered CTA System */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" })}
              >
                Lihat Marketplace
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-medium"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                Daftar Sekarang - Gratis
              </Button>
            </div>

            {/* Lead Magnet */}
            <Card className="max-w-md mx-auto bg-card/50 border border-primary/30 p-4">
              <div className="text-center mb-3">
                <p className="text-sm text-gray-300">💎 Dapatkan Update Eksklusif:</p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 bg-background/50 border-border text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90 px-4">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Notifikasi NFT trending • Tips trading • Promo eksklusif
              </p>
            </Card>
          </div>

          {/* Enhanced Trust indicators */}
          <div className="mt-12 space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">Transaksi Aman: Dana diamankan escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm">10,000+ Pengguna</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">Rating 4.8/5</span>
              </div>
            </div>

            {/* Real-time Activity Widget */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>24 NFT terjual dalam 1 jam terakhir</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>1,240 pengguna aktif sekarang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Escrow terverifikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Smart contract audited</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" />
                <span>Terdaftar BAPPEBTI</span>
              </div>
            </div>
          </div>

          {/* Escrow Transparency */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">🛡️ Proteksi PUYOK</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Dana Anda diamankan 100% dengan sistem escrow otomatis. Ganti rugi penuh jika terjadi masalah dalam transaksi.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <span>Smart Contract Address: </span>
                    <code className="bg-card px-2 py-1 rounded text-primary">0x863...bffb</code>
                    <span className="text-green-500 ml-2">(Verified ✓)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* NEW: Kenapa PUYOK Berbeda Section */}
      <section id="why-different" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Kenapa PUYOK Berbeda?</h2>
            <p className="text-base text-gray-300 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Solusi lokal untuk kebutuhan global Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Platform Global (Rumit & Mahal) */}
            <Card className="bg-card border border-border p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <Building2 className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Platform Global</h3>
              <Badge variant="destructive" className="mb-4">
                Rumit & Mahal
              </Badge>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">❌</span>
                  <p className="text-muted-foreground">Fee tinggi hingga 10-15%</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">❌</span>
                  <p className="text-muted-foreground">Proses KYC rumit & lama</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">❌</span>
                  <p className="text-muted-foreground">Tidak support pembayaran lokal</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">❌</span>
                  <p className="text-muted-foreground">Customer service bahasa Inggris</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg">❌</span>
                  <p className="text-muted-foreground">Interface kompleks untuk pemula</p>
                </div>
              </div>
            </Card>

            {/* PUYOK (Lokal & Mudah) */}
            <Card className="bg-card border border-primary p-8 text-center relative overflow-hidden shadow-lg shadow-primary/20">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-600"></div>
              <Coffee className="w-20 h-20 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">PUYOK</h3>
              <Badge className="mb-4 bg-primary text-primary-foreground">Lokal & Mudah</Badge>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✅</span>
                  <p className="text-muted-foreground">Fee rendah hanya 2-3%</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✅</span>
                  <p className="text-muted-foreground">Daftar cukup dengan nomor HP</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✅</span>
                  <p className="text-muted-foreground">DANA, GoPay, OVO, Bank Lokal</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✅</span>
                  <p className="text-muted-foreground">Support 24/7 dalam Bahasa Indonesia</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✅</span>
                  <p className="text-muted-foreground">Interface sederhana seperti e-commerce</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              3 Keunggulan yang Anda Rasakan
            </h2>
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
                  <span className="text-4xl">💳</span>
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

      {/* Sophisticated Marketplace Section */}
      <section id="marketplace">
        <SophisticatedMarketplace />
      </section>

      {/* Unified PUYOK Value Proposition - Part 2: How It Works */}
      <motion.section
        id="how-it-works"
        className="py-32 bg-card/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="text-primary font-semibold">BAGAIMANA CARA KERJANYA</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transaksi Aman dalam 3 Langkah
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sistem escrow otomatis yang melindungi setiap transaksi Anda dengan teknologi blockchain terdepan
            </p>
          </div>

          <div className="relative mb-20">
            {/* Flow Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    01
                  </div>
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center mt-4">
                    <span className="text-4xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Jual & Escrow</h3>
                  <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    List aset Anda dengan harga yang diinginkan. Sistem escrow otomatis mengamankan aset hingga pembayaran dikonfirmasi.
                  </p>
                  <div className="bg-card/50 border border-primary/20 rounded-lg p-3">
                    <div className="text-xs text-primary font-mono">Smart Contract: 0x863...bffb</div>
                    <div className="text-xs text-green-500 mt-1">✓ Terverifikasi</div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    02
                  </div>
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center mt-4">
                    <span className="text-4xl">💸</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Bayar & Verifikasi</h3>
                  <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Pembeli transfer via DANA/GoPay/OVO. Verifikasi instan dengan AI OCR untuk kecepatan maksimal.
                  </p>
                  <div className="flex justify-center gap-2 bg-card/50 border border-blue-500/20 rounded-lg p-3">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <div className="w-6 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">B</div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    03
                  </div>
                  <div className="w-16 h-16 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center mt-4">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Transfer Aman</h3>
                  <p className="text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Aset otomatis ke pembeli. Dana langsung ke penjual. Semua terjadi secara otomatis dan transparan.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="text-green-500 font-semibold text-sm">🛡️ Garansi 100% Uang Kembali</div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Interactive Demo CTA */}
          <motion.div
            className="text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30 p-8">
              <h3 className="text-xl font-bold text-white mb-4">🚀 Mau Coba Langsung?</h3>
              <p className="text-gray-300 mb-6">Simulasi transaksi interaktif - tanpa risiko, pahami prosesnya</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-primary hover:bg-primary/90 px-6 py-3">
                  🎮 Coba Demo Transaksi
                </Button>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 px-6 py-3">
                  📖 Baca Panduan Lengkap
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Live Social Proof Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Aktivitas Real-time</h2>
            <p className="text-gray-300">Transaksi yang terjadi saat ini di PUYOK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Live Transaction Feed */}
            <Card className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500 font-semibold">BARU SAJA</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-primary font-medium">@crypto_art</span> menjual NFT
              </p>
              <p className="text-xs text-muted-foreground">
                💰 Rp 2,500,000 via DANA • 2 menit lalu
              </p>
            </Card>

            <Card className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-500 font-semibold">AKTIF</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-primary font-medium">@token_trader</span> beli USDT
              </p>
              <p className="text-xs text-muted-foreground">
                💳 Rp 15,000,000 via GoPay • 5 menit lalu
              </p>
            </Card>

            <Card className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-500 font-semibold">SELESAI</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-primary font-medium">@nft_collector</span> terima aset
              </p>
              <p className="text-xs text-muted-foreground">
                🎨 Digital Art Collection • 8 menit lalu
              </p>
            </Card>

            <Card className="bg-card border border-primary/50 p-4 shadow-lg shadow-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Rp 1.2M</div>
                <div className="text-xs text-muted-foreground mb-2">Volume 24 Jam</div>
                <div className="text-lg font-semibold text-green-500 mb-1">98%</div>
                <div className="text-xs text-muted-foreground">Transaksi Sukses</div>
              </div>
            </Card>
          </div>

          {/* Quick Testimonials */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border border-border p-4">
              <p className="text-sm text-gray-300 mb-3">
                "Jual Crypto dapat Rupiah instan! 🔥"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                  B
                </div>
                <span className="text-xs text-muted-foreground">@budi_web3 • 5 menit lalu</span>
              </div>
            </Card>

            <Card className="bg-card/50 border border-border p-4">
              <p className="text-sm text-gray-300 mb-3">
                "Escrow system nya TOP! Aman banget 🛡️"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">
                  S
                </div>
                <span className="text-xs text-muted-foreground">@sara_nft • 12 menit lalu</span>
              </div>
            </Card>

            <Card className="bg-card/50 border border-border p-4">
              <p className="text-sm text-gray-300 mb-3">
                "Payment via DANA langsung masuk! 💰"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                  A
                </div>
                <span className="text-xs text-muted-foreground">@ahmad_trader • 18 menit lalu</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Apa Kata Komunitas Kami?</h2>
            <p className="text-base text-gray-300 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Pengalaman nyata dari pengguna PUYOK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border border-border p-6">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-gray-300 mb-6 leading-relaxed text-base font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                "Akhirnya bisa jual NFT langsung dapat Rupiah! Prosesnya cepat dan aman. Paling suka bisa terima
                pembayaran lewat DANA."
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-foreground font-medium">@rafly_art</div>
                  <div className="text-muted-foreground text-sm">NFT Creator</div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-6">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Sebagai newbie di dunia crypto, PUYOK bikin semuanya jadi gampang. Beli NFT pakai GoPay, langsung masuk
                wallet!"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-foreground font-medium">@sarah_collector</div>
                  <div className="text-muted-foreground text-sm">NFT Enthusiast</div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-6">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Trading USDT jadi lebih praktis. Sistem escrow-nya bikin tenang, ga khawatir kena scam. Recommended
                banget!"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-foreground font-medium">@crypto_trader88</div>
                  <div className="text-muted-foreground text-sm">Token Trader</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pertanyaan yang Sering Ditanyakan</h2>
            <p className="text-gray-300">Jawaban untuk keraguan Anda tentang PUYOK</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">🔒 Bagaimana keamanan dana saya?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dana Anda diamankan 100% dengan sistem escrow otomatis. Ketika membeli, uang disimpan dalam smart contract hingga aset NFT/Token berhasil ditransfer ke wallet Anda. Jika ada masalah, dana otomatis dikembalikan penuh. Sistem ini sudah diaudit dan terdaftar resmi.
                </p>
              </div>
            </Card>

            <Card className="bg-card border border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">💰 Berapa biaya transaksi di PUYOK?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Biaya transaksi hanya 2-3% dari nilai transaksi - jauh lebih murah dari platform global yang memungut 10-15%. Tidak ada biaya tersembunyi. Yang Anda lihat di kalkulator adalah yang Anda bayar. Biaya sudah termasuk escrow, verifikasi, dan customer support 24/7.
                </p>
              </div>
            </Card>

            <Card className="bg-card border border-border">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">🚨 Apa yang terjadi jika ada masalah dalam transaksi?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  PUYOK memiliki sistem proteksi berlapis:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Escrow otomatis:</strong> Dana dikembalikan jika aset tidak terkirim dalam 24 jam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Tim mediasi:</strong> Support 24/7 untuk menyelesaikan sengketa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Garansi 100%:</strong> Ganti rugi penuh jika sistem kami error</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Blacklist otomatis:</strong> Penipu langsung diblokir dari platform</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/30">
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-3">🤔 Masih ada pertanyaan?</h3>
                <p className="text-gray-300 mb-4">Tim support kami siap membantu Anda 24/7</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-primary hover:bg-primary/90">
                    💬 Chat dengan Support
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    📖 Baca Panduan Lengkap
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Siap Memulai Perjalanan Digital Anda?
          </h2>
          <p className="text-base text-gray-300 mb-10 leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Bergabunglah dengan ribuan kreator dan kolektor yang sudah mempercayai PUYOK untuk transaksi aset digital
            mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
              Mulai Jual Aset Anda
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-muted-foreground hover:bg-accent bg-transparent px-8 py-4 text-lg"
              onClick={() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" })}
            >
              Jelajahi Marketplace
            </Button>
          </div>
        </div>
      </section>

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
