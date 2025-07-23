import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentLoading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Skeleton className="h-10 w-3/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-8" />

      <Card className="bg-card border border-border p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" /> <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-between items-center text-lg">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="flex justify-between items-center text-xl font-bold text-primary">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border p-6 mt-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" /> <Skeleton className="h-6 w-64" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Skeleton className="h-12 w-full mt-8" />
    </div>
  )
}
