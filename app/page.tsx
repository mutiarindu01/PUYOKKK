"use client"

import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Plus,
  ArrowRight,
  User,
  List,
  Grid3X3,
  Shield,
  Zap,
  Users,
  Star,
  Quote,
  Twitter,
  Instagram,
  MessageCircle,
  ChevronDown,
  Menu,
  Building2,
  Coffee,
  CreditCard,
  DollarSign,
  Handshake,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Verified,
  Clock,
  Eye,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for trending items
const trendingItems = [
  {
    id: "trending-1",
    type: "NFT",
    name: "Batik Genesis #001",
    price: "Rp 25.000.000",
    image: "/placeholder.svg?height=300&width=300&text=Batik+Genesis",
    collection: "Indonesian Heritage",
    seller: "batik_master",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    badge: "🔥 Hot",
    views: "2.1k",
    timeLeft: "2h",
    paymentMethods: ["dana", "gopay", "ovo"],
  },
  {
    id: "trending-2",
    type: "Token",
    name: "Ethereum",
    ticker: "ETH",
    price: "Rp 45.000.000",
    quantity: "0.5 ETH",
    trend: "up",
    change: "+2.5%",
    icon: "/placeholder.svg?height=32&width=32&text=ETH",
    seller: "crypto_whale",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    badge: "⚡ Fast",
    views: "1.8k",
    paymentMethods: ["dana", "gopay", "bank"],
  },
  {
    id: "trending-3",
    type: "NFT",
    name: "Wayang Digital #456",
    price: "Rp 12.500.000",
    image: "/placeholder.svg?height=300&width=300&text=Wayang+Digital",
    collection: "Cultural Arts",
    seller: "wayang_artist",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    badge: "✨ Rare",
    views: "956",
    timeLeft: "5h",
    paymentMethods: ["dana", "ovo"],
  },
  {
    id: "trending-4",
    type: "NFT",
    name: "Jakarta Skyline",
    price: "Rp 8.750.000",
    image: "/placeholder.svg?height=300&width=300&text=Jakarta+Skyline",
    collection: "Urban Photography",
    seller: "jakarta_lens",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    badge: "📸 Photo",
    views: "1.2k",
    timeLeft: "1d",
    paymentMethods: ["gopay", "ovo", "bank"],
  },
  {
    id: "trending-5",
    type: "Token",
    name: "Tether",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    trend: "up",
    change: "+0.1%",
    icon: "/placeholder.svg?height=32&width=32&text=USDT",
    seller: "stable_trader",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    badge: "💎 Stable",
    views: "3.4k",
    paymentMethods: ["dana", "gopay", "ovo", "bank"],
  },
]

// Sample data for marketplace items
const marketplaceTokens = [
  {
    id: 1,
    type: "Token",
    name: "Tether",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    trend: "up",
    change: "+0.2%",
    icon: "/placeholder.svg?height=32&width=32&text=USDT",
    seller: "cryptotrader88",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "gopay", "ovo"],
    views: "1.2k",
    verified: true,
  },
  {
    id: 2,
    type: "Token",
    name: "Ethereum",
    ticker: "ETH",
    price: "Rp 45.000.000",
    quantity: "0.5 ETH",
    trend: "down",
    change: "-1.5%",
    icon: "/placeholder.svg?height=32&width=32&text=ETH",
    seller: "eth_master",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "bank"],
    views: "856",
    verified: true,
  },
  {
    id: 3,
    type: "Token",
    name: "Bitcoin",
    ticker: "BTC",
    price: "Rp 850.000.000",
    quantity: "0.1 BTC",
    trend: "up",
    change: "+2.1%",
    icon: "/placeholder.svg?height=32&width=32&text=BTC",
    seller: "btc_hodler",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["gopay", "ovo", "bank"],
    views: "2.1k",
    verified: false,
  },
  {
    id: 4,
    type: "Token",
    name: "Binance Coin",
    ticker: "BNB",
    price: "Rp 6.000.000",
    quantity: "2 BNB",
    trend: "up",
    change: "+0.8%",
    icon: "/placeholder.svg?height=32&width=32&text=BNB",
    seller: "bnb_trader",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "gopay"],
    views: "634",
    verified: true,
  },
]

const marketplaceNFTs = [
  {
    id: 101,
    type: "NFT",
    name: "Bored Ape #1234",
    price: "Rp 15.000.000",
    image: "/placeholder.svg?height=300&width=300&text=Bored+Ape",
    collection: "Bored Ape Yacht Club",
    seller: "cryptoking88",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "gopay", "ovo"],
    views: "1.8k",
    verified: true,
  },
  {
    id: 102,
    type: "NFT",
    name: "CryptoPunk #5678",
    price: "Rp 45.000.000",
    image: "/placeholder.svg?height=300&width=300&text=CryptoPunk",
    collection: "CryptoPunks",
    seller: "pixelartfan",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["gopay", "bank"],
    views: "3.2k",
    verified: true,
  },
  {
    id: 103,
    type: "NFT",
    name: "Azuki #9876",
    price: "Rp 8.500.000",
    image: "/placeholder.svg?height=300&width=300&text=Azuki",
    collection: "Azuki",
    seller: "azuki_lover",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "ovo"],
    views: "967",
    verified: false,
  },
  {
    id: 104,
    type: "NFT",
    name: "Moonbird #2468",
    price: "Rp 18.000.000",
    image: "/placeholder.svg?height=300&width=300&text=Moonbird",
    collection: "Moonbirds",
    seller: "moon_collector",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    paymentMethods: ["dana", "gopay", "ovo", "bank"],
    views: "1.4k",
    verified: true,
  },
]

// Payment method icons mapping
const paymentIcons = {
  dana: "💳",
  gopay: "🟢",
  ovo: "🟣",
  bank: "🏦",
}

function MiniSparkline({ trend }: { trend: "up" | "down" }) {
  return (
    <div className="w-16 h-8 flex items-center">
      <svg width="64" height="32" viewBox="0 0 64 32" className="overflow-visible">
        <path
          d={trend === "up" ? "M2,28 L16,20 L32,16 L48,8 L62,4" : "M2,4 L16,12 L32,16 L48,24 L62,28"}
          stroke={trend === "up" ? "#10B981" : "#EF4444"}
          strokeWidth="2"
          fill="none"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  )
}

function PaymentMethodIcons({ methods }: { methods: string[] }) {
  return (
    <div className="flex gap-1">
      {methods.slice(0, 3).map((method) => (
        <span key={method} className="text-xs" title={method.toUpperCase()}>
          {paymentIcons[method as keyof typeof paymentIcons]}
        </span>
      ))}
      {methods.length > 3 && <span className="text-xs text-muted-foreground">+{methods.length - 3}</span>}
    </div>
  )
}

function TrendingCard({ item }: { item: (typeof trendingItems)[0] }) {
  return (
    <Card className="bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group hover:-translate-y-1 min-w-[280px] relative overflow-hidden">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="bg-background/90 text-foreground text-xs font-medium">
          {item.badge}
        </Badge>
      </div>

      {/* Stats */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-1 bg-background/90 rounded px-2 py-1">
          <Eye className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.views}</span>
        </div>
        {item.timeLeft && (
          <div className="flex items-center gap-1 bg-background/90 rounded px-2 py-1">
            <Clock className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-orange-500">{item.timeLeft}</span>
          </div>
        )}
      </div>

      {item.type === "NFT" ? (
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
          <img src={item.icon || "/placeholder.svg"} alt={item.ticker} className="w-16 h-16 rounded-full" />
          {item.trend && (
            <div className="absolute bottom-4 right-4">
              <MiniSparkline trend={item.trend} />
            </div>
          )}
        </div>
      )}

      <CardContent className="p-4">
        <h3 className="text-foreground font-semibold text-lg mb-1 truncate">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 truncate">
          {item.type === "NFT" ? item.collection : `${item.quantity} • ${item.change}`}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-foreground font-bold text-xl">{item.price}</p>
            <div className="flex items-center gap-2">
              <Avatar className="w-4 h-4">
                <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  <User className="w-2 h-2" />
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground text-xs">{item.seller}</span>
            </div>
          </div>
          <PaymentMethodIcons methods={item.paymentMethods} />
        </div>

        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Beli Sekarang
          <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

function TokenRow({ token }: { token: (typeof marketplaceTokens)[0] }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0 hover:bg-accent transition-all duration-200 rounded-lg px-2 -mx-2">
      <div className="flex items-center gap-4">
        <img src={token.icon || "/placeholder.svg"} alt={token.ticker} className="w-8 h-8 rounded-full" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">{token.name}</span>
            {token.verified && <Verified className="w-4 h-4 text-blue-500" />}
          </div>
          <div className="text-muted-foreground text-sm">{token.ticker}</div>
        </div>
      </div>

      <div className="flex items-center">
        <MiniSparkline trend={token.trend} />
        <div className={`text-sm ml-2 ${token.trend === "up" ? "text-green-500" : "text-red-500"}`}>{token.change}</div>
      </div>

      <div className="text-right">
        <div className="text-foreground font-bold">{token.price}</div>
        <div className="text-muted-foreground text-sm">{token.quantity}</div>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={token.sellerAvatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
            <User className="w-3 h-3" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">{token.seller}</span>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{token.views}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <PaymentMethodIcons methods={token.paymentMethods} />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Beli</Button>
      </div>
    </div>
  )
}

function NFTCard({ nft }: { nft: (typeof marketplaceNFTs)[0] }) {
  return (
    <Card className="bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group hover:-translate-y-1 relative overflow-hidden">
      {/* Views counter */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-background/90 rounded px-2 py-1">
        <Eye className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{nft.views}</span>
      </div>

      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <img
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-foreground font-semibold text-lg truncate">{nft.name}</h3>
          {nft.verified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
        </div>
        <p className="text-muted-foreground text-sm mb-3 truncate">{nft.collection}</p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-foreground font-bold text-xl">{nft.price}</p>
            <div className="flex items-center gap-2">
              <Avatar className="w-4 h-4">
                <AvatarImage src={nft.sellerAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  <User className="w-2 h-2" />
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground text-xs">{nft.seller}</span>
            </div>
          </div>
          <PaymentMethodIcons methods={nft.paymentMethods} />
        </div>
        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Beli Sekarang
          <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Token")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [trendingIndex, setTrendingIndex] = useState(0)
  const lastScrollY = useRef(0)
  const router = useRouter()

  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)
  const [filteredItems, setFilteredItems] = useState([...marketplaceTokens, ...marketplaceNFTs])

  useEffect(() => {
    const scrollHidePosition = 60
    const scrollDeltaHide = 10

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY.current

      if (scrollDifference > scrollDeltaHide && currentScrollY > scrollHidePosition) {
        if (isNavOpen) {
          setIsNavOpen(false)
        }
      } else if (currentScrollY === 0) {
        if (!isNavOpen) {
          setIsNavOpen(true)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isNavOpen])

  useEffect(() => {
    if (activeFilter === "Token") {
      setFilteredItems(marketplaceTokens)
    } else if (activeFilter === "NFT") {
      setFilteredItems(marketplaceNFTs)
    } else {
      setFilteredItems([...marketplaceTokens, ...marketplaceNFTs])
    }
  }, [activeFilter])

  const nextTrending = () => {
    setTrendingIndex((prev) => (prev + 1) % Math.max(1, trendingItems.length - 2))
  }

  const prevTrending = () => {
    setTrendingIndex(
      (prev) => (prev - 1 + Math.max(1, trendingItems.length - 2)) % Math.max(1, trendingItems.length - 2),
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter'] relative">
      {/* Abstract tech network background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none animated-background" />

      {/* Navigation Bar - Cleaner Design */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isNavOpen ? "h-16 backdrop-blur-md bg-background/80 border-b border-border/50" : "h-12 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <div
            className={`flex items-center justify-between w-full transition-opacity duration-300 ease-in-out ${isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {/* Left Side - Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
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
                <Link href="/login">Masuk</Link>
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
                      <Link href="#" className="text-lg font-medium hover:text-primary">
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
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, rgba(29, 78, 216, 0.15) 0%, rgba(13, 17, 23, 0) 70%)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Cpath d='M30 0v30M0 30h30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            boxShadow: "1px 1px 3px 0px rgba(0, 0, 0, 1)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Tukar Aset Digital,
            <br />
            <span className="text-primary">Terima Rupiah.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Marketplace P2P pertama di Indonesia untuk menukar NFT & Token dengan DANA, GoPay, OVO, dan transfer bank.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            onClick={() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" })}
          >
            Lihat Marketplace
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">Transaksi Aman</span>
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
        </div>
      </section>

      {/* NEW: Kenapa PUYOK Berbeda Section */}
      <section id="why-different" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Kenapa PUYOK Berbeda?</h2>
            <p className="text-xl text-muted-foreground">Solusi lokal untuk kebutuhan global Anda</p>
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

      {/* NEW: Tiga Pilar Nilai Jual Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Tiga Pilar Nilai Jual Kami</h2>
            <p className="text-xl text-muted-foreground">Fokus pada hasil akhir yang Anda rasakan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1: Pembayaran Familiar */}
            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">💳 Bayar Seperti Biasa</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beli NFT langsung dari saldo DANA-mu. Jual token dan terima uang di GoPay dalam hitungan menit. Tidak
                perlu belajar cara baru - gunakan metode pembayaran yang sudah kamu kenal.
              </p>
              <div className="flex justify-center gap-2">
                <span className="text-2xl">💳</span>
                <span className="text-2xl">🟢</span>
                <span className="text-2xl">🟣</span>
                <span className="text-2xl">🏦</span>
              </div>
            </Card>

            {/* Pilar 2: Uang Sungguhan */}
            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">💰 Uang Sungguhan</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Jual hasil karya digitalmu dan langsung dapat Rupiah di rekening. Tidak ada konversi ribet atau fee
                tersembunyi. Yang kamu lihat adalah yang kamu dapat - dalam mata uang yang kamu pahami.
              </p>
              <div className="text-3xl font-bold text-green-500">Rp</div>
            </Card>

            {/* Pilar 3: Transaksi Aman */}
            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Handshake className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">🤝 Tidur Nyenyak</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Sistem escrow otomatis melindungi setiap transaksi. Pembeli dapat aset setelah bayar, penjual dapat uang
                setelah aset terkirim. Tidak ada yang bisa curang - semua otomatis dan transparan.
              </p>
              <div className="flex justify-center items-center gap-2">
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="text-blue-500 font-semibold">100% Aman</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Marketplace Section with Trending */}
      <section id="marketplace" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Jelajahi Marketplace</h2>
            <p className="text-lg text-muted-foreground">Temukan aset digital terbaik dari kreator Indonesia</p>
          </div>

          {/* NEW: Trending Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">🔥 Trending Sekarang</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTrending}
                  className="border-border hover:bg-accent bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTrending}
                  className="border-border hover:bg-accent bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${trendingIndex * 296}px)` }}
              >
                {trendingItems.map((item) => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            {/* Search Bar - Mobile */}
            <div className="relative flex-1 w-full sm:max-w-sm md:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari aset, koleksi, atau kreator..."
                className="w-full pl-10 pr-4 py-2 bg-input border-border text-foreground placeholder-muted-foreground focus:ring-ring focus:border-primary rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <Tabs defaultValue="Semua" onValueChange={setActiveFilter}>
              <TabsList className="grid w-auto grid-cols-3">
                <TabsTrigger value="Semua">Semua</TabsTrigger>
                <TabsTrigger value="NFT">NFT</TabsTrigger>
                <TabsTrigger value="Token">Token</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Display Area */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            {filteredItems.length > 0 ? (
              viewMode === "list" ? (
                <div className="space-y-0">
                  {filteredItems.map((item) =>
                    item.type === "Token" ? (
                      <TokenRow key={item.id} token={item} />
                    ) : (
                      <NFTCard key={item.id} nft={item} />
                    ),
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (item.type === "NFT" ? <NFTCard key={item.id} nft={item} /> : null))}
                </div>
              )
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">Tidak ada aset yang cocok dengan kriteria Anda.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="border-border text-muted-foreground hover:bg-accent bg-transparent"
            >
              Muat Lebih Banyak
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transaksi Aman dalam 3 Langkah Mudah
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistem escrow otomatis melindungi setiap transaksi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-4">01</div>
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-border rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Jual & Escrow</h3>
              <p className="text-muted-foreground leading-relaxed">
                List aset Anda dengan harga yang diinginkan. Sistem escrow otomatis mengamankan aset hingga pembayaran
                dikonfirmasi.
              </p>
            </Card>

            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-4">02</div>
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-border rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Bayar & Verifikasi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pembeli transfer ke rekening penjual via DANA, GoPay, atau OVO. Upload bukti pembayaran untuk verifikasi
                cepat.
              </p>
            </Card>

            <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-4">03</div>
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-border rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Transfer Aman</h3>
              <p className="text-muted-foreground leading-relaxed">
                Setelah verifikasi, aset otomatis ditransfer ke wallet pembeli. Penjual menerima dana langsung ke akun
                mereka.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Apa Kata Komunitas Kami?</h2>
            <p className="text-lg text-muted-foreground">Pengalaman nyata dari pengguna PUYOK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border border-border p-6">
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
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

      {/* Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Siap Memulai Perjalanan Digital Anda?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
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

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">P</span>
                </div>
                <span className="text-2xl font-bold text-foreground">PUYOK</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Marketplace P2P terpercaya untuk aset digital Anda. Tukar NFT & Token dengan Rupiah secara aman dan
                mudah.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary transition-colors text-foreground hover:text-primary-foreground"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary transition-colors text-foreground hover:text-primary-foreground"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary transition-colors text-foreground hover:text-primary-foreground"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Produk Column */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Produk</h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace NFT
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Trading Token
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Wallet Integration
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Mobile App
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  API Developer
                </a>
              </div>
            </div>

            {/* Perusahaan Column */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Perusahaan</h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Tentang Kami
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Whitepaper
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Tim
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Karir
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Legal</h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Bantuan
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Kontak
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} PUYOK. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>🇮🇩 Made in Indonesia</span>
              <span>•</span>
              <span>Powered by Blockchain</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
