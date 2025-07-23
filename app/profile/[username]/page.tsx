"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Footer from "@/components/Footer"
import {
  ArrowLeft,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  Twitter,
  Instagram,
  Globe,
  MessageCircle,
  Share2,
  Flag,
  Heart,
  Eye,
  Clock,
  Award,
  Trophy,
  Medal,
  Crown,
  Zap,
  Verified,
  DollarSign,
  Target,
  Users,
  ShoppingCart,
  Camera,
  Palette,
  Music,
  Video,
  Image as ImageIcon,
  ArrowRight,
  TrendingDown,
  MoreHorizontal,
} from "lucide-react"

// Sample creator data - in real app this would come from API
const creatorData = {
  username: "rafly_art",
  displayName: "Rafly Ananda",
  bio: "Digital artist & NFT creator focused on Indonesian culture and modern art. Creating unique pieces that bridge traditional aesthetics with contemporary digital expression.",
  avatar: "/placeholder.svg?height=150&width=150",
  coverImage: "/placeholder.svg?height=400&width=1200&text=Cover+Photo",
  joinDate: "Juli 2023",
  location: "Jakarta, Indonesia",
  verified: true,
  
  // Reputation stats
  totalTransactions: 47,
  successfulTransactions: 45,
  averageRating: 4.9,
  totalRatings: 42,
  completionRate: 98,
  responseTime: "< 2 jam",
  totalEarnings: "Rp 185.750.000",
  
  // Social links
  socialLinks: {
    twitter: "https://twitter.com/rafly_art",
    instagram: "https://instagram.com/rafly.art",
    website: "https://raflyart.com",
  },
  
  // Assets for sale
  assetsForSale: [
    {
      id: "nft-001",
      title: "Batik Modern Genesis #1",
      price: "Rp 2.500.000",
      image: "/placeholder.svg?height=300&width=300&text=Batik+Modern",
      category: "Art",
      views: 1250,
      likes: 89,
      timeLeft: "5 hari",
    },
    {
      id: "nft-002", 
      title: "Indonesian Landscape Collection",
      price: "Rp 1.800.000",
      image: "/placeholder.svg?height=300&width=300&text=Landscape",
      category: "Photography",
      views: 820,
      likes: 67,
      timeLeft: "12 hari",
    },
    {
      id: "nft-003",
      title: "Wayang Digital Reimagined",
      price: "Rp 3.200.000", 
      image: "/placeholder.svg?height=300&width=300&text=Wayang+Digital",
      category: "Art",
      views: 2100,
      likes: 156,
      timeLeft: "8 hari",
    },
    {
      id: "nft-004",
      title: "Nusantara Stories #5",
      price: "Rp 1.500.000",
      image: "/placeholder.svg?height=300&width=300&text=Nusantara",
      category: "Illustration",
      views: 945,
      likes: 73,
      timeLeft: "15 hari",
    },
  ],
  
  // Sold assets
  soldAssets: [
    {
      id: "sold-001",
      title: "Jakarta Skyline NFT",
      price: "Rp 4.500.000",
      image: "/placeholder.svg?height=300&width=300&text=Jakarta+Skyline",
      soldDate: "15 Des 2024",
      buyer: "crypto_collector99",
      category: "Photography",
    },
    {
      id: "sold-002",
      title: "Traditional Dance Motion",
      price: "Rp 3.800.000", 
      image: "/placeholder.svg?height=300&width=300&text=Dance+Motion",
      soldDate: "8 Des 2024",
      buyer: "art_enthusiast",
      category: "Animation",
    },
    {
      id: "sold-003",
      title: "Gamelan Harmony Series",
      price: "Rp 2.200.000",
      image: "/placeholder.svg?height=300&width=300&text=Gamelan",
      soldDate: "1 Des 2024",
      buyer: "music_lover88",
      category: "Art",
    },
    {
      id: "sold-004",
      title: "Borobudur Digital Heritage",
      price: "Rp 5.200.000",
      image: "/placeholder.svg?height=300&width=300&text=Borobudur",
      soldDate: "22 Nov 2024",
      buyer: "heritage_collector",
      category: "Art",
    },
    {
      id: "sold-005",
      title: "Indonesian Flora Collection",
      price: "Rp 1.900.000",
      image: "/placeholder.svg?height=300&width=300&text=Flora",
      soldDate: "18 Nov 2024", 
      buyer: "nature_fan",
      category: "Photography",
    },
    {
      id: "sold-006",
      title: "Street Art Jakarta", 
      price: "Rp 2.700.000",
      image: "/placeholder.svg?height=300&width=300&text=Street+Art",
      soldDate: "10 Nov 2024",
      buyer: "urban_explorer",
      category: "Art",
    },
  ],
  
  // Awards and achievements
  awards: [
    {
      id: "award-001",
      title: "Top Creator Q4 2024",
      description: "Awarded to top 10 creators by transaction volume in Q4 2024",
      image: "/placeholder.svg?height=300&width=300&text=Top+Creator+Award",
      earnedDate: "31 Des 2024",
      rarity: "Legendary",
      type: "Achievement",
    },
    {
      id: "award-002", 
      title: "Indonesian Heritage Champion",
      description: "Special recognition for promoting Indonesian culture through digital art",
      image: "/placeholder.svg?height=300&width=300&text=Heritage+Champion",
      earnedDate: "17 Agu 2024",
      rarity: "Epic", 
      type: "Recognition",
    },
    {
      id: "award-003",
      title: "Community Favorite Artist",
      description: "Most liked creator by the PUYOK community in 2024",
      image: "/placeholder.svg?height=300&width=300&text=Community+Favorite",
      earnedDate: "12 Jun 2024",
      rarity: "Rare",
      type: "Community",
    },
    {
      id: "award-004",
      title: "First Sale Milestone",
      description: "Commemorating your first successful sale on PUYOK",
      image: "/placeholder.svg?height=300&width=300&text=First+Sale",
      earnedDate: "3 Jul 2023",
      rarity: "Common",
      type: "Milestone",
    },
  ]
}

interface CreatorProfilePageProps {
  params: {
    username: string
  }
}

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const [activeTab, setActiveTab] = useState("for-sale")
  const [isFollowing, setIsFollowing] = useState(false)
  const router = useRouter()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Profil ${creatorData.displayName} di PUYOK`,
        text: `Lihat karya amazing dari ${creatorData.displayName} di PUYOK!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "Epic": return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "Rare": return "bg-gradient-to-r from-blue-500 to-indigo-500"
      case "Common": return "bg-gradient-to-r from-gray-400 to-gray-500"
      default: return "bg-gradient-to-r from-gray-400 to-gray-500"
    }
  }

  const getAwardIcon = (type: string) => {
    switch (type) {
      case "Achievement": return <Trophy className="w-5 h-5" />
      case "Recognition": return <Award className="w-5 h-5" />
      case "Community": return <Heart className="w-5 h-5" />
      case "Milestone": return <Target className="w-5 h-5" />
      default: return <Medal className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Profil Kreator</h1>
              <p className="text-sm text-muted-foreground">@{params.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Laporkan
            </Button>
          </div>
        </div>
      </header>

      {/* Cover Photo & Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-primary/20 to-purple-500/20 relative overflow-hidden">
          <img
            src={creatorData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative -mt-20 md:-mt-24">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
                  <AvatarImage src={creatorData.avatar} alt={creatorData.displayName} />
                  <AvatarFallback className="text-4xl">
                    {creatorData.displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {creatorData.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-background">
                    <Verified className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Name & Bio */}
              <div className="flex-1 pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                      {creatorData.displayName}
                      {creatorData.verified && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Verified className="w-4 h-4 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2">@{creatorData.username}</p>
                    <p className="text-foreground max-w-2xl leading-relaxed">{creatorData.bio}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleFollow}
                      className={isFollowing ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Stats & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Reputation Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Statistik Reputasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bergabung sejak</p>
                    <p className="font-medium">{creatorData.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Transaksi Sukses</p>
                    <p className="font-bold text-green-600">{creatorData.successfulTransactions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating Rata-rata</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-yellow-600">{creatorData.averageRating}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= creatorData.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({creatorData.totalRatings})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tingkat Penyelesaian</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-purple-600">{creatorData.completionRate}%</p>
                      <Progress value={creatorData.completionRate} className="w-16 h-2" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Waktu Respon</p>
                    <p className="font-medium">{creatorData.responseTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Penjualan</p>
                    <p className="font-bold text-green-600">{creatorData.totalEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Link Sosial Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={creatorData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Twitter</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                </a>
                <a
                  href={creatorData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span className="font-medium">Instagram</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                </a>
                <a
                  href={creatorData.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Website</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                </a>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{creatorData.assetsForSale.length}</div>
                  <div className="text-sm text-muted-foreground">Karya Dijual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{creatorData.soldAssets.length}</div>
                  <div className="text-sm text-muted-foreground">Karya Terjual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{creatorData.awards.length}</div>
                  <div className="text-sm text-muted-foreground">Penghargaan</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tabbed Gallery */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="for-sale" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Dijual ({creatorData.assetsForSale.length})
                </TabsTrigger>
                <TabsTrigger value="sold" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Terjual ({creatorData.soldAssets.length})
                </TabsTrigger>
                <TabsTrigger value="awards" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Penghargaan ({creatorData.awards.length})
                </TabsTrigger>
              </TabsList>

              {/* For Sale Tab */}
              <TabsContent value="for-sale" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {creatorData.assetsForSale.map((asset) => (
                    <Card key={asset.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Badge className="bg-background/90 text-foreground">
                            {asset.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-4 text-white">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{asset.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{asset.likes}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{asset.title}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold text-primary">{asset.price}</p>
                          <div className="flex items-center gap-1 text-orange-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{asset.timeLeft}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          Lihat Detail
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sold Tab */}
              <TabsContent value="sold" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {creatorData.soldAssets.map((asset) => (
                    <Card key={asset.id} className="group relative overflow-hidden">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            TERJUAL
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary">
                            {asset.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{asset.title}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Harga Jual</span>
                            <span className="font-bold text-green-600">{asset.price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Tanggal</span>
                            <span className="text-sm font-medium">{asset.soldDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Pembeli</span>
                            <span className="text-sm font-medium">@{asset.buyer}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Awards Tab */}
              <TabsContent value="awards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatorData.awards.map((award) => (
                    <Card key={award.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 ${getRarityColor(award.rarity)}`} />
                      <div className="flex gap-4 p-6">
                        <div className="flex-shrink-0">
                          <div className={`w-20 h-20 rounded-lg ${getRarityColor(award.rarity)} p-0.5`}>
                            <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                              <img
                                src={award.image}
                                alt={award.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-foreground text-lg">{award.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getRarityColor(award.rarity)} text-white border-0`}>
                                {award.rarity}
                              </Badge>
                              <div className="text-yellow-500">
                                {getAwardIcon(award.type)}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                            {award.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {award.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Diraih {award.earnedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Awards Summary */}
                <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-xl">Lemari Trofi</h3>
                        <p className="text-muted-foreground">Koleksi pencapaian dan pengakuan dari komunitas PUYOK</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {creatorData.awards.filter(a => a.rarity === 'Legendary').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Legendary</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {creatorData.awards.filter(a => a.rarity === 'Epic').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Epic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {creatorData.awards.filter(a => a.rarity === 'Rare').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Rare</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">
                          {creatorData.awards.filter(a => a.rarity === 'Common').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Common</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
