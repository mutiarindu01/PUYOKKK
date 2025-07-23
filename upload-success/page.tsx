import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UploadSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <Card className="w-full max-w-md text-center p-8 bg-card border border-border shadow-lg">
        <CardContent className="p-0">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Listing Created Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Your asset has been successfully listed on the marketplace. It will be visible shortly after verification.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/dashboard/assets" passHref>
              <Button className="w-full">View My Assets</Button>
            </Link>
            <Link href="/dashboard/marketplace" passHref>
              <Button variant="outline" className="w-full bg-transparent">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
