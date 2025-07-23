"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/Footer"
import NotificationCenter from "@/components/NotificationCenter"
import {
  ArrowLeft,
  Trophy,
  Crown,
  Medal,
  Star,
  Sparkles,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Eye,
  Heart,
  Share2,
  ExternalLink,
  Award,
  Target,
  Zap,
  Diamond,
  Gem,
  ShoppingCart,
  Clock,
  CheckCircle,
  ArrowRight,
  Flame,
  Bolt,
  Shield,
  Plus,
} from "lucide-react"

// Sample awards marketplace data
const awardListings = [
  {
    id: "award-listing-001",
    awardId: "top-creator-q4-2024",
    title: "Top Creator Q4 2024",
    description: "Penghargaan eksklusif untuk 10 kreator terbaik berdasarkan volume transaksi di Q4 2024",
    image: "/placeholder.svg?height=400&width=400&text=Top+Creator+2024",
    currentOwner: "rafly_art",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "rafly_art",
    earnedDate: "31 Desember 2024",
    rarity: "Legendary",
    editionNumber: "1 dari 10",
    price: "Rp 25.000.000",
    category: "Achievement",
    isForSale: true,
    views: 1247,
    likes: 89,
    listedDate: "2 hari lalu",
    verified: true,
    achievements: ["Volume Terbesar", "Rating Tertinggi", "Konsistensi Terbaik"],
  },
  {
    id: "award-listing-002", 
    awardId: "heritage-champion-2024",
    title: "Indonesian Heritage Champion",
    description: "Pengakuan khusus untuk kreator yang mempromosikan budaya Indonesia melalui seni digital",
    image: "/placeholder.svg?height=400&width=400&text=Heritage+Champion",
    currentOwner: "cultural_artist",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "cultural_artist",
    earnedDate: "17 Agustus 2024",
    rarity: "Epic",
    editionNumber: "1 dari 25",
    price: "Rp 15.500.000",
    category: "Recognition",
    isForSale: true,
    views: 892,
    likes: 67,
    listedDate: "5 hari lalu",
    verified: true,
    achievements: ["Budaya Indonesia", "Inovasi Kreatif", "Dampak Sosial"],
  },
  {
    id: "award-listing-003",
    awardId: "community-favorite-2024",
    title: "Community Favorite Artist",
    description: "Kreator paling disukai oleh komunitas PUYOK berdasarkan voting dan engagement",
    image: "/placeholder.svg?height=400&width=400&text=Community+Favorite",
    currentOwner: "people_choice",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "people_choice",
    earnedDate: "12 Juni 2024",
    rarity: "Rare",
    editionNumber: "1 dari 50",
    price: "Rp 8.750.000",
    category: "Community",
    isForSale: true,
    views: 634,
    likes: 52,
    listedDate: "1 minggu lalu",
    verified: true,
    achievements: ["Engagement Tinggi", "Komunitas Aktif", "Feedback Positif"],
  },
  {
    id: "award-listing-004",
    awardId: "pioneer-badge-2023",
    title: "PUYOK Pioneer Badge", 
    description: "Badge eksklusif untuk 100 pengguna pertama yang bergabung dengan PUYOK",
    image: "/placeholder.svg?height=400&width=400&text=Pioneer+Badge",
    currentOwner: "early_adopter",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "early_adopter",
    earnedDate: "15 Juli 2023",
    rarity: "Legendary",
    editionNumber: "7 dari 100",
    price: "Rp 50.000.000",
    category: "Milestone",
    isForSale: true,
    views: 2156,
    likes: 178,
    listedDate: "3 hari lalu",
    verified: true,
    achievements: ["Pioneer Spirit", "Early Supporter", "Platform Founder"],
  },
  {
    id: "award-listing-005",
    awardId: "monthly-champion-jul-2024",
    title: "Piala Bulanan Juli 2024",
    description: "Juara umum untuk bulan Juli 2024 berdasarkan kombinasi penjualan dan engagement",
    image: "/placeholder.svg?height=400&width=400&text=Monthly+Champion",
    currentOwner: "monthly_king",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "monthly_king",
    earnedDate: "31 Juli 2024",
    rarity: "Epic",
    editionNumber: "Unik",
    price: "Rp 12.000.000",
    category: "Competition",
    isForSale: true,
    views: 445,
    likes: 34,
    listedDate: "2 minggu lalu",
    verified: true,
    achievements: ["Penjualan Terbaik", "Engagement Tinggi", "Konsistensi"],
  },
  {
    id: "award-listing-006",
    awardId: "diamond-seller-2024",
    title: "Diamond Seller Status",
    description: "Status eksklusif untuk seller dengan penjualan di atas Rp 1 Miliar dalam setahun",
    image: "/placeholder.svg?height=400&width=400&text=Diamond+Seller",
    currentOwner: "diamond_trader",
    ownerAvatar: "/placeholder.svg?height=40&width=40",
    originalRecipient: "diamond_trader",
    earnedDate: "15 November 2024",
    rarity: "Mythical",
    editionNumber: "1 dari 5",
    price: "Rp 100.000.000",
    category: "Achievement",
    isForSale: true,
    views: 3421,
    likes: 267,
    listedDate: "1 hari lalu",
    verified: true,
    achievements: ["Volume Ekstrem", "Konsistensi Luar Biasa", "Market Leader"],
  },
]

const rarityConfig = {
  "Mythical": {
    color: "from-purple-600 via-pink-600 to-red-600",
    textColor: "text-purple-100",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-900/20",
    icon: <Crown className="w-5 h-5" />,
    glow: "shadow-purple-500/50",
  },
  "Legendary": {
    color: "from-yellow-400 via-orange-500 to-red-500",
    textColor: "text-yellow-100",
    borderColor: "border-yellow-500",
    bgColor: "bg-yellow-900/20",
    icon: <Trophy className="w-5 h-5" />,
    glow: "shadow-yellow-500/50",
  },
  "Epic": {
    color: "from-purple-500 via-blue-500 to-indigo-600",
    textColor: "text-purple-100",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-800/20",
    icon: <Award className="w-5 h-5" />,
    glow: "shadow-purple-400/50",
  },
  "Rare": {
    color: "from-blue-500 via-cyan-500 to-teal-500",
    textColor: "text-blue-100",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-800/20",
    icon: <Medal className="w-5 h-5" />,
    glow: "shadow-blue-400/50",
  },
  "Common": {
    color: "from-gray-400 via-gray-500 to-gray-600",
    textColor: "text-gray-100",
    borderColor: "border-gray-400",
    bgColor: "bg-gray-800/20",
    icon: <Star className="w-5 h-5" />,
    glow: "shadow-gray-400/50",
  },
}

export default function AwardsMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  const filteredListings = awardListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.currentOwner.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRarity = selectedRarity === "all" || listing.rarity === selectedRarity
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
    
    return matchesSearch && matchesRarity && matchesCategory
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-high":
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
      case "price-low":
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
      case "popular":
        return b.views - a.views
      case "oldest":
        return new Date(a.earnedDate).getTime() - new Date(b.earnedDate).getTime()
      default: // newest
        return new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime()
    }
  })

  const getRarityConfig = (rarity: string) => {
    return rarityConfig[rarity as keyof typeof rarityConfig] || rarityConfig.Common
  }

  const handleBuyNow = (listingId: string) => {
    router.push(`/awards-marketplace/${listingId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Awards Marketplace</h1>
                <p className="text-sm text-muted-foreground">Perdagangkan Trofi & Pencapaian Digital</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <Badge className="hidden sm:inline-flex bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              {awardListings.length} Artefak Tersedia
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl -m-8"></div>
          <div className="relative z-10 py-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full px-4 py-2 text-sm text-yellow-700 mb-6">
              <Sparkles className="w-4 h-4" />
              Marketplace Eksklusif NFT Penghargaan
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Artefak Digital
              </span>
              <br />
              Pencapaian Legendaris
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Jelajahi dan perdagangkan NFT penghargaan eksklusif dari sejarah PUYOK. Setiap artefak menceritakan kisah pencapaian luar biasa dan menjadi bagian dari jejak digital yang tak terlupakan.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{awardListings.length}</div>
                <div className="text-sm text-muted-foreground">Artefak Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {awardListings.filter(l => l.rarity === "Legendary" || l.rarity === "Mythical").length}
                </div>
                <div className="text-sm text-muted-foreground">Item Legendary+</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {awardListings.filter(l => l.editionNumber.includes("1 dari")).length}
                </div>
                <div className="text-sm text-muted-foreground">One-of-a-Kind</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari artefak, pemilik, atau pencapaian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg bg-white/50 border-2 border-border focus:border-primary rounded-xl"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Kelangkaan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Rarity</SelectItem>
                <SelectItem value="Mythical">Mythical</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
                <SelectItem value="Epic">Epic</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
                <SelectItem value="Recognition">Recognition</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
                <SelectItem value="Milestone">Milestone</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="oldest">Terlama</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="popular">Terpopuler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan {sortedListings.length} dari {awardListings.length} artefak
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedListings.map((listing) => {
            const rarityConfig = getRarityConfig(listing.rarity)
            
            return (
              <Card 
                key={listing.id} 
                className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${rarityConfig.glow} hover:shadow-2xl border-2 ${rarityConfig.borderColor} bg-gradient-to-br from-white to-gray-50/50`}
                onClick={() => handleBuyNow(listing.id)}
              >
                {/* Premium Border Animation */}
                <div className={`absolute inset-0 bg-gradient-to-r ${rarityConfig.color} opacity-20 animate-pulse`}></div>
                <div className="absolute -inset-1 bg-gradient-to-r ${rarityConfig.color} opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Rarity Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Badge className={`bg-gradient-to-r ${rarityConfig.color} text-white border-0 shadow-lg flex items-center gap-1`}>
                    {rarityConfig.icon}
                    {listing.rarity}
                  </Badge>
                </div>

                {/* Edition Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge variant="outline" className="bg-black/80 text-white border-white/30">
                    {listing.editionNumber}
                  </Badge>
                </div>

                {/* Award Image */}
                <div className="relative z-10 aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Sparkle Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="absolute top-4 left-4 w-6 h-6 text-white animate-pulse" />
                    <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-white animate-pulse delay-300" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-pulse delay-150" />
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-3 left-3 flex gap-3 text-white">
                    <div className="flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs">{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                      <Heart className="w-3 h-3" />
                      <span className="text-xs">{listing.likes}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="relative z-10 p-6 bg-white/90 backdrop-blur-sm">
                  {/* Award Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Earned By Label - PROMINENT */}
                  <div className={`p-3 rounded-lg mb-4 ${rarityConfig.bgColor} border ${rarityConfig.borderColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-foreground">Didapatkan oleh:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={listing.ownerAvatar} alt={listing.originalRecipient} />
                        <AvatarFallback className="text-xs">{listing.originalRecipient[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-foreground">@{listing.originalRecipient}</span>
                      <span className="text-muted-foreground text-sm">pada {listing.earnedDate}</span>
                    </div>
                  </div>

                  {/* Current Owner */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pemilik Saat Ini</p>
                      <Link href={`/profile/${listing.currentOwner}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={listing.ownerAvatar} alt={listing.currentOwner} />
                          <AvatarFallback className="text-xs">{listing.currentOwner[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">@{listing.currentOwner}</span>
                      </Link>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Listed</p>
                      <p className="text-sm text-foreground">{listing.listedDate}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Harga</p>
                      <p className="text-2xl font-bold text-primary">{listing.price}</p>
                    </div>
                    {listing.rarity === "Legendary" && listing.editionNumber.includes("1 dari") && (
                      <Badge className="bg-red-100 text-red-800 border-red-300">
                        <Diamond className="w-3 h-3 mr-1" />
                        Hanya 1 di Dunia
                      </Badge>
                    )}
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Pencapaian:</p>
                    <div className="flex flex-wrap gap-1">
                      {listing.achievements.slice(0, 2).map((achievement, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                      {listing.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{listing.achievements.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${rarityConfig.color} hover:opacity-90 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBuyNow(listing.id)
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Beli Artefak Ini
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {sortedListings.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Tidak Ada Artefak Ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              Coba ubah filter pencarian atau lihat semua kategori artefak.
            </p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedRarity("all")
              setSelectedCategory("all")
            }}>
              Reset Filter
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-8">
            <div className="max-w-2xl mx-auto">
              <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Punya Artefak untuk Dijual?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Listing NFT penghargaan Anda di marketplace eksklusif ini dan biarkan pencapaian Anda 
                menjadi bagian dari sejarah digital yang berharga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  List Artefak Saya
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/profile/rafly_art">
                    <Trophy className="w-5 h-5 mr-2" />
                    Lihat Koleksi Saya
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
