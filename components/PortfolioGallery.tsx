"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Eye,
  Clock,
  ArrowRight,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Grid3x3,
  List,
  Filter,
  Search,
  TrendingUp,
  Flame,
  Star,
  Download,
  ExternalLink,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  ShoppingCart,
  MessageCircle,
} from "lucide-react"

interface Asset {
  id: string
  title: string
  price: string
  image: string
  category: string
  views: number
  likes: number
  timeLeft: string
  rarity: string
  isHot: boolean
  priceHistory: Array<{ date: string; price: number }>
  description?: string
  tags?: string[]
  creator?: string
  dimensions?: string
  fileSize?: string
  format?: string
}

interface PortfolioGalleryProps {
  assets: Asset[]
  viewMode: "grid" | "list"
  filterCategory: string
  sortBy: string
  onLike?: (assetId: string) => void
  onShare?: (asset: Asset) => void
  onBookmark?: (assetId: string) => void
}

export default function PortfolioGallery({ 
  assets, 
  viewMode, 
  filterCategory, 
  sortBy,
  onLike,
  onShare,
  onBookmark 
}: PortfolioGalleryProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedAssets, setLikedAssets] = useState<Set<string>>(new Set())
  const [bookmarkedAssets, setBookmarkedAssets] = useState<Set<string>>(new Set())
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Filter and sort assets
  const filteredAssets = assets.filter(asset => {
    const matchesCategory = filterCategory === "all" || asset.category === filterCategory
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-high": return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''))
      case "price-low": return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))
      case "popular": return b.likes - a.likes
      case "newest": 
      default: return 0
    }
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
      case "Epic": return "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
      case "Rare": return "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
      case "Common": return "bg-gradient-to-r from-gray-400 to-gray-600"
      default: return "bg-gradient-to-r from-gray-400 to-gray-600"
    }
  }

  const handleLike = (assetId: string) => {
    const newLikedAssets = new Set(likedAssets)
    if (likedAssets.has(assetId)) {
      newLikedAssets.delete(assetId)
    } else {
      newLikedAssets.add(assetId)
    }
    setLikedAssets(newLikedAssets)
    onLike?.(assetId)
  }

  const handleBookmark = (assetId: string) => {
    const newBookmarkedAssets = new Set(bookmarkedAssets)
    if (bookmarkedAssets.has(assetId)) {
      newBookmarkedAssets.delete(assetId)
    } else {
      newBookmarkedAssets.add(assetId)
    }
    setBookmarkedAssets(newBookmarkedAssets)
    onBookmark?.(assetId)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedAsset) return
    
    switch (e.key) {
      case "Escape":
        setSelectedAsset(null)
        break
      case "ArrowLeft":
        const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredAssets.length - 1
        setCurrentImageIndex(prevIndex)
        setSelectedAsset(filteredAssets[prevIndex])
        break
      case "ArrowRight":
        const nextIndex = currentImageIndex < filteredAssets.length - 1 ? currentImageIndex + 1 : 0
        setCurrentImageIndex(nextIndex)
        setSelectedAsset(filteredAssets[nextIndex])
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedAsset, currentImageIndex, filteredAssets])

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAssets.map((asset, index) => (
        <Card 
          key={asset.id} 
          className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border-0 shadow-lg overflow-hidden interactive-card"
          onMouseEnter={() => setHoveredAsset(asset.id)}
          onMouseLeave={() => setHoveredAsset(null)}
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="backdrop-blur-md bg-white/20 text-white border-white/20 hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedAsset(asset)
                      setCurrentImageIndex(index)
                    }}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="backdrop-blur-md bg-white/20 text-white border-white/20 hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(asset.id)
                    }}
                  >
                    <Heart className={`w-4 h-4 ${likedAssets.has(asset.id) ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="backdrop-blur-md bg-white/20 text-white border-white/20 hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation()
                      onShare?.(asset)
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-4 text-white mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{asset.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{asset.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Clock className="w-4 h-4" />
                    <span>{asset.timeLeft}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex gap-2">
                <Badge className={`${getRarityColor(asset.rarity)} text-white border-0 shadow-lg badge-glow`}>
                  {asset.rarity}
                </Badge>
                {asset.isHot && (
                  <Badge className="bg-red-500 text-white border-0 shadow-lg animate-pulse">
                    <Flame className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <Badge 
                variant="secondary" 
                className="bg-black/50 text-white border-0 backdrop-blur-sm"
              >
                {asset.category}
              </Badge>
            </div>

            {/* Bookmark Button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                handleBookmark(asset.id)
              }}
            >
              <Bookmark className={`w-4 h-4 ${bookmarkedAssets.has(asset.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {asset.title}
            </h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-bold text-primary">{asset.price}</p>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // List View Component
  const ListView = () => (
    <div className="space-y-4">
      {filteredAssets.map((asset, index) => (
        <Card key={asset.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-xl text-foreground">{asset.title}</h3>
                  <div className="flex gap-2">
                    <Badge className={`${getRarityColor(asset.rarity)} text-white border-0`}>
                      {asset.rarity}
                    </Badge>
                    <Badge variant="secondary">{asset.category}</Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {asset.description || "Beautiful digital artwork with unique characteristics and limited availability."}
                </p>
                
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{asset.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{asset.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{asset.timeLeft} left</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">{asset.price}</div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleLike(asset.id)}>
                      <Heart className={`w-4 h-4 ${likedAssets.has(asset.id) ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onShare?.(asset)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6" ref={galleryRef}>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAssets.length} of {assets.length} artworks
      </div>

      {/* Gallery */}
      {viewMode === "grid" ? <GridView /> : <ListView />}

      {/* Lightbox Modal */}
      {selectedAsset && (
        <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
            <div className="relative h-full">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-md text-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{selectedAsset.title}</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(selectedAsset.id)}>
                      <Heart className={`w-4 h-4 ${likedAssets.has(selectedAsset.id) ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onShare?.(selectedAsset)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAsset(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={selectedAsset.image}
                  alt={selectedAsset.title}
                  className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => {
                    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredAssets.length - 1
                    setCurrentImageIndex(prevIndex)
                    setSelectedAsset(filteredAssets[prevIndex])
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => {
                    const nextIndex = currentImageIndex < filteredAssets.length - 1 ? currentImageIndex + 1 : 0
                    setCurrentImageIndex(nextIndex)
                    setSelectedAsset(filteredAssets[nextIndex])
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Details Panel */}
              <div className="p-6 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={`${getRarityColor(selectedAsset.rarity)} text-white border-0`}>
                        {selectedAsset.rarity}
                      </Badge>
                      <Badge variant="secondary">{selectedAsset.category}</Badge>
                      {selectedAsset.isHot && (
                        <Badge className="bg-red-500 text-white">
                          <Flame className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{selectedAsset.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedAsset.description || "Unique digital artwork with exceptional quality and craftsmanship."}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Views:</span>
                        <span className="ml-2 font-medium">{selectedAsset.views.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Likes:</span>
                        <span className="ml-2 font-medium">{selectedAsset.likes}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Left:</span>
                        <span className="ml-2 font-medium">{selectedAsset.timeLeft}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <span className="ml-2 font-medium">{selectedAsset.format || "PNG"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-primary mb-4">{selectedAsset.price}</div>
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy Now
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <Heart className="w-4 h-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
