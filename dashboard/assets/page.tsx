import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Eye, DollarSign, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface UserAsset {
  id: string
  name: string
  type: "NFT" | "Token"
  image?: string // For NFTs
  ticker?: string // For Tokens
  quantity?: string // For Tokens
  price: string
  status: "listed" | "sold" | "draft" | "pending_verification"
  listedDate: string
}

const dummyAssets: UserAsset[] = [
  {
    id: "nft001",
    name: "CyberPunk Cityscape",
    type: "NFT",
    image: "/placeholder.svg?height=200&width=200",
    price: "Rp 12.000.000",
    status: "listed",
    listedDate: "2024-07-10",
  },
  {
    id: "token001",
    name: "Tether",
    type: "Token",
    ticker: "USDT",
    quantity: "500 USDT",
    price: "Rp 15.500/USDT",
    status: "listed",
    listedDate: "2024-07-08",
  },
  {
    id: "nft002",
    name: "Abstract Flow",
    type: "NFT",
    image: "/placeholder.svg?height=200&width=200",
    price: "Rp 8.500.000",
    status: "sold",
    listedDate: "2024-07-05",
  },
  {
    id: "token002",
    name: "Ethereum",
    type: "Token",
    ticker: "ETH",
    quantity: "0.2 ETH",
    price: "Rp 45.000.000/ETH",
    status: "draft",
    listedDate: "2024-07-01",
  },
  {
    id: "nft003",
    name: "Galactic Explorer",
    type: "NFT",
    image: "/placeholder.svg?height=200&width=200",
    price: "Rp 20.000.000",
    status: "pending_verification",
    listedDate: "2024-07-12",
  },
]

export default function AssetsPage() {
  const getStatusBadgeVariant = (status: UserAsset["status"]) => {
    switch (status) {
      case "listed":
        return "default"
      case "sold":
        return "secondary"
      case "draft":
        return "outline"
      case "pending_verification":
        return "destructive" // Using destructive for attention, can be changed
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Your Assets</h3>
          <p className="text-sm text-muted-foreground">Manage your listed NFTs and Tokens.</p>
        </div>
        <Link href="/create-listing" passHref>
          <Button>Create New Listing</Button>
        </Link>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyAssets.map((asset) => (
          <Card key={asset.id} className="bg-card border border-border p-4">
            <div className="flex items-center gap-4">
              {asset.type === "NFT" && asset.image && (
                <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={asset.image || "/placeholder.svg"}
                    alt={asset.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              {asset.type === "Token" && (
                <div className="w-20 h-20 flex-shrink-0 rounded-md bg-muted flex items-center justify-center text-2xl font-bold text-primary">
                  {asset.ticker}
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{asset.name}</h4>
                  <Badge variant={getStatusBadgeVariant(asset.status)}>{asset.status.replace(/_/g, " ")}</Badge>
                </div>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> {asset.price}
                  {asset.quantity && <span className="ml-1">({asset.quantity})</span>}
                </p>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Listed: {asset.listedDate}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end gap-2">
              {asset.status === "listed" && (
                <Link href={`/marketplace/${asset.id}`} passHref>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" /> View Listing
                  </Button>
                </Link>
              )}
              {asset.status !== "sold" && (
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Trash className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
