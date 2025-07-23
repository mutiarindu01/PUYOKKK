"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, ExternalLink, User, Clock, DollarSign, Tag, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Star } from "lucide-react" // Import Star component

interface Asset {
  id: string
  name: string
  type: "NFT" | "Token"
  image?: string
  ticker?: string
  price: string
  quantity?: string
  description: string
  seller: {
    username: string
    avatar: string
    rating: number
  }
  details: {
    contractAddress: string
    tokenId?: string
    blockchain: string
    listingDate: string
    paymentMethods: string[]
  }
  history: {
    event: string
    from: string
    to: string
    price: string
    date: string
  }[]
}

const sampleAssets: Asset[] = [
  {
    id: "nft1",
    name: "Mystic Forest #001",
    type: "NFT",
    image: "/placeholder.svg?height=500&width=500",
    price: "Rp 15.000.000",
    description:
      "A unique digital artwork capturing the serene beauty of an enchanted forest. Part of the 'Nature's Embrace' collection.",
    seller: {
      username: "art_visionary",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    details: {
      contractAddress: "0xabc123def456...",
      tokenId: "789012345",
      blockchain: "Ethereum",
      listingDate: "2024-07-15",
      paymentMethods: ["DANA", "GoPay", "OVO", "Bank Transfer"],
    },
    history: [
      {
        event: "Listed",
        from: "art_visionary",
        to: "Marketplace",
        price: "Rp 15.000.000",
        date: "2024-07-15",
      },
    ],
  },
  {
    id: "token1",
    name: "Tether",
    type: "Token",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    description:
      "1,000 units of Tether (USDT), a stablecoin pegged to the US Dollar. Ideal for secure and fast transactions.",
    seller: {
      username: "stable_trader",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    details: {
      contractAddress: "0xdef789abc123...",
      blockchain: "Polygon",
      listingDate: "2024-07-14",
      paymentMethods: ["DANA", "GoPay", "OVO", "Bank Transfer"],
    },
    history: [
      {
        event: "Listed",
        from: "stable_trader",
        to: "Marketplace",
        price: "Rp 15.500/USDT",
        date: "2024-07-14",
      },
      {
        event: "Transferred",
        from: "previous_owner",
        to: "stable_trader",
        price: "-",
        date: "2024-07-10",
      },
    ],
  },
]

export default function MarketplaceDetailPage() {
  const params = useParams()
  const { id } = params as { id: string }
  const [asset, setAsset] = useState<Asset | null>(null)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [buyQuantity, setBuyQuantity] = useState("")

  useEffect(() => {
    const foundAsset = sampleAssets.find((a) => a.id === id)
    setAsset(foundAsset || null)
  }, [id])

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-muted-foreground">
        Asset not found.
      </div>
    )
  }

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
    })
  }

  const handleBuy = () => {
    // Implement actual buy logic here
    console.log(`Buying ${buyQuantity} of ${asset.name}`)
    toast({
      title: "Purchase Initiated!",
      description: `You are attempting to buy ${buyQuantity} of ${asset.name}.`,
    })
    setIsBuyModalOpen(false)
    // Redirect to payment instructions page
    window.location.href = `/payment-instructions?assetId=${asset.id}&quantity=${buyQuantity}`
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image/Preview */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            {asset.type === "NFT" && asset.image && (
              <Image
                src={asset.image || "/placeholder.svg"}
                alt={asset.name}
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-t-lg"
              />
            )}
            {asset.type === "Token" && (
              <div className="flex items-center justify-center h-96 bg-muted rounded-t-lg">
                <span className="text-6xl font-bold text-primary">{asset.ticker}</span>
              </div>
            )}
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-2">{asset.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{asset.type}</Badge>
                {asset.ticker && <Badge variant="outline">{asset.ticker}</Badge>}
              </div>
              <p className="text-muted-foreground leading-relaxed">{asset.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Price & Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-primary">{asset.price}</div>
                {asset.quantity && <div className="text-lg text-muted-foreground">({asset.quantity})</div>}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={asset.seller.avatar || "/placeholder.svg"} alt={asset.seller.username} />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/profile/${asset.seller.username}`} className="font-semibold hover:underline">
                      {asset.seller.username}
                    </Link>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-1">{asset.seller.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {/* Use Star component here */}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
              <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6">Buy Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Purchase</DialogTitle>
                    <DialogDescription>
                      You are about to purchase {asset.name}. Please enter the quantity if applicable.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="asset-name" className="text-right">
                        Asset
                      </Label>
                      <Input id="asset-name" value={asset.name} readOnly className="col-span-3 w-2/3" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input id="price" value={asset.price} readOnly className="col-span-3 w-2/3" />
                    </div>
                    {asset.type === "Token" && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={buyQuantity}
                          onChange={(e) => setBuyQuantity(e.target.value)}
                          placeholder={`e.g., ${asset.quantity?.split(" ")[0]}`}
                          className="col-span-3 w-2/3"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsBuyModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBuy}>Proceed to Payment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center">
                    <Wallet className="w-4 h-4 mr-2" />
                    Blockchain:
                  </span>
                  <span className="font-medium">{asset.details.blockchain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Listed On:
                  </span>
                  <span className="font-medium">{asset.details.listingDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Contract Address:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-primary hover:underline"
                    onClick={() => handleCopy(asset.details.contractAddress, "Contract address copied!")}
                  >
                    {asset.details.contractAddress.substring(0, 6)}...{asset.details.contractAddress.slice(-4)}
                    <Copy className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                {asset.details.tokenId && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Token ID:
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-primary hover:underline"
                      onClick={() => handleCopy(asset.details.tokenId!, "Token ID copied!")}
                    >
                      {asset.details.tokenId}
                      <Copy className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Payment Methods:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {asset.details.paymentMethods.map((method) => (
                      <Badge key={method} variant="secondary">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for History/More Info */}
      <div className="mt-8">
        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="history">Transaction History</TabsTrigger>
            <TabsTrigger value="more-info">More Info</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset.history.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{entry.event}</TableCell>
                        <TableCell>{entry.from}</TableCell>
                        <TableCell>{entry.to}</TableCell>
                        <TableCell>{entry.price}</TableCell>
                        <TableCell className="text-right">{entry.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="more-info" className="mt-4">
            <Card>
              <CardContent className="p-6 text-muted-foreground">
                <p>Additional information about the asset or collection can go here.</p>
                <p className="mt-2">
                  This might include links to the original collection, creator's website, or detailed specifications.
                </p>
                <Button variant="link" className="p-0 h-auto mt-4">
                  <ExternalLink className="w-4 h-4 mr-2" /> View on Blockchain Explorer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
