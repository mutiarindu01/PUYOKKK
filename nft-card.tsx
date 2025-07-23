import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface NFTCardProps {
  nft: {
    id: string | number
    name: string
    price: string
    image: string
    collection: string
    seller: string
  }
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group hover:-translate-y-1">
      <Link href={`/marketplace/${nft.id}`} passHref>
        <div className="aspect-square relative overflow-hidden rounded-t-lg cursor-pointer">
          <Image
            src={nft.image || "/placeholder.svg"}
            alt={nft.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="text-foreground font-semibold text-lg mb-1 truncate">{nft.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 truncate">{nft.collection}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground font-bold text-xl">{nft.price}</p>
            <p className="text-muted-foreground text-xs">by {nft.seller}</p>
          </div>
          <Link href={`/marketplace/${nft.id}`} passHref>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Beli <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
