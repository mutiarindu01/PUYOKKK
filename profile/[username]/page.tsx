import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Twitter, Instagram, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NFTCard } from "@/components/nft-card"

interface UserProfile {
  username: string
  avatar: string
  bio: string
  rating: number
  totalSales: number
  totalAssets: number
  joinedDate: string
  socials: {
    twitter?: string
    instagram?: string
    website?: string
  }
  assets: {
    id: string
    name: string
    price: string
    image: string
    collection: string
    type: "NFT" | "Token"
  }[]
}

const dummyUserProfile: Record<string, UserProfile> = {
  cryptoking: {
    username: "cryptoking",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Passionate NFT collector and digital art enthusiast. Exploring the metaverse one pixel at a time.",
    rating: 4.9,
    totalSales: 120,
    totalAssets: 350,
    joinedDate: "January 2023",
    socials: {
      twitter: "https://twitter.com/cryptoking",
      instagram: "https://instagram.com/cryptoking_nft",
      website: "https://cryptoking.art",
    },
    assets: [
      {
        id: "nft1",
        name: "Bored Ape #1234",
        price: "Rp 15.000.000",
        image: "/placeholder.svg?height=300&width=300",
        collection: "Bored Ape Yacht Club",
        type: "NFT",
      },
      {
        id: "nft2",
        name: "Mutant Ape #5678",
        price: "Rp 8.000.000",
        image: "/placeholder.svg?height=300&width=300",
        collection: "Mutant Ape Yacht Club",
        type: "NFT",
      },
      {
        id: "token1",
        name: "Decentraland",
        price: "Rp 10.000",
        image: "/placeholder.svg?height=300&width=300",
        collection: "MANA",
        type: "Token",
      },
    ],
  },
  nftcollector: {
    username: "nftcollector",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Curator of unique digital collectibles. Always on the hunt for the next big thing in the NFT space.",
    rating: 4.7,
    totalSales: 80,
    totalAssets: 200,
    joinedDate: "March 2023",
    socials: {
      twitter: "https://twitter.com/nftcollector",
      instagram: "https://instagram.com/nftcollector_official",
    },
    assets: [
      {
        id: "nft3",
        name: "CryptoPunk #9999",
        price: "Rp 50.000.000",
        image: "/placeholder.svg?height=300&width=300",
        collection: "CryptoPunks",
        type: "NFT",
      },
      {
        id: "nft4",
        name: "Cool Cat #123",
        price: "Rp 7.000.000",
        image: "/placeholder.svg?height=300&width=300",
        collection: "Cool Cats",
        type: "NFT",
      },
    ],
  },
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const { username } = params
  const user = dummyUserProfile[username]

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] text-muted-foreground">
        User not found.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Card className="bg-card border border-border p-6 mb-8">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-0">
          <Avatar className="w-28 h-28 md:w-36 md:h-36 border-4 border-primary/50">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
            <AvatarFallback className="text-5xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{user.username}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold text-foreground">{user.rating} Rating</span>
              <Badge variant="secondary" className="ml-2">
                Joined {user.joinedDate}
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-prose">{user.bio}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold text-foreground">{user.totalSales}</span> Sales
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold text-foreground">{user.totalAssets}</span> Assets
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {user.socials.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
              )}
              {user.socials.instagram && (
                <Button variant="outline" size="icon" asChild>
                  <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
              )}
              {user.socials.website && (
                <Button variant="outline" size="icon" asChild>
                  <a href={user.socials.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5" />
                    <span className="sr-only">Website</span>
                  </a>
                </Button>
              )}
              <Button variant="outline" size="icon">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Contact</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] mx-auto">
          <TabsTrigger value="assets">Assets ({user.assets.length})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
        </TabsList>
        <TabsContent value="assets" className="mt-6">
          {user.assets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {user.assets.map((asset) => (
                <NFTCard key={asset.id} nft={asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No assets listed by this user yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card className="bg-card border border-border p-6 text-center text-muted-foreground">
            <p className="text-lg">No reviews available for this user yet.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
