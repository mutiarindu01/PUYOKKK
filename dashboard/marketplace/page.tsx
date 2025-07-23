"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, List, Grid3X3, User } from "lucide-react"
import { NFTCard } from "@/components/nft-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import Link from "next/link"

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
    icon: "/placeholder.svg?height=32&width=32",
    seller: "cryptotrader88",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
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
    icon: "/placeholder.svg?height=32&width=32",
    seller: "eth_master",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
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
    icon: "/placeholder.svg?height=32&width=32",
    seller: "btc_hodler",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
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
    icon: "/placeholder.svg?height=32&width=32",
    seller: "bnb_trader",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
  },
]

const marketplaceNFTs = [
  {
    id: 1,
    type: "NFT",
    name: "Bored Ape #1234",
    price: "Rp 15.000.000",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Bored Ape Yacht Club",
    seller: "cryptoking88",
  },
  {
    id: 2,
    type: "NFT",
    name: "CryptoPunk #5678",
    price: "Rp 45.000.000",
    image: "/placeholder.svg?height=300&width=300",
    collection: "CryptoPunks",
    seller: "pixelartfan",
  },
  {
    id: 3,
    type: "NFT",
    name: "Azuki #9876",
    price: "Rp 8.500.000",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Azuki",
    seller: "azuki_lover",
  },
  {
    id: 4,
    type: "NFT",
    name: "Moonbird #2468",
    price: "Rp 18.000.000",
    image: "/placeholder.svg?height=300&width=300",
    collection: "Moonbirds",
    seller: "moon_collector",
  },
]

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

function TokenRow({ token }: { token: (typeof marketplaceTokens)[0] }) {
  return (
    <Link href={`/marketplace/${token.id}`} passHref>
      <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0 hover:bg-accent transition-all duration-200 rounded-lg px-2 -mx-2 cursor-pointer">
        <div className="flex items-center gap-4">
          <img src={token.icon || "/placeholder.svg"} alt={token.ticker} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-foreground font-medium">{token.name}</div>
            <div className="text-muted-foreground text-sm">{token.ticker}</div>
          </div>
        </div>

        <div className="flex items-center">
          <MiniSparkline trend={token.trend} />
          <div className={`text-sm ml-2 ${token.trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {token.change}
          </div>
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
          <span className="text-muted-foreground text-sm">{token.seller}</span>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Beli</Button>
      </div>
    </Link>
  )
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Semua")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredItems = [...marketplaceTokens, ...marketplaceNFTs].filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === "Token" && item.ticker.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === "NFT" && item.collection.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = activeFilter === "Semua" || item.type === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Marketplace</h3>
      <p className="text-sm text-muted-foreground">Explore NFTs and Tokens listed by other users.</p>
      <div className="relative flex-1 w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari aset, koleksi, atau kreator..."
          className="w-full pl-10 pr-4 py-2 bg-input border-border text-foreground placeholder-muted-foreground focus:ring-ring focus:border-primary rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Filter Buttons */}
        <Tabs defaultValue="Semua" onValueChange={setActiveFilter}>
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="Semua">Semua</TabsTrigger>
            <TabsTrigger value="NFT">NFT</TabsTrigger>
            <TabsTrigger value="Token">Token</TabsTrigger>
          </TabsList>
        </Tabs>
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

      <div className="bg-card rounded-xl p-6 border border-border">
        {filteredItems.length > 0 ? (
          viewMode === "list" ? (
            <div className="space-y-0">
              {filteredItems.map((item) =>
                item.type === "Token" ? <TokenRow key={item.id} token={item} /> : <NFTCard key={item.id} nft={item} />,
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
    </div>
  )
}
