import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentInstructionsLoading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Skeleton className="h-10 w-3/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-8" />

      <Card className="bg-card border border-border p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" /> <Skeleton className="h-6 w-64" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="text-center space-y-2">
            <Skeleton className="h-4 w-1/3 mx-auto" />
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
            <div className="mt-4 flex justify-center">
              <Skeleton className="w-48 h-48 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-px my-6 w-full" />

          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-12 w-full mt-8" />
      <Skeleton className="h-6 w-1/4 mx-auto mt-4" />
    </div>
  )
}
