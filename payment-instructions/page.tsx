"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PaymentMethodIcons } from "@/components/payment-method-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Copy, Clock, Info, UploadCloud } from "lucide-react"
import Link from "next/link"

export default function PaymentInstructionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assetId = searchParams.get("assetId")
  const quantity = searchParams.get("quantity")
  const method = searchParams.get("method")

  // Dummy data based on method
  const paymentDetails = {
    dana: {
      accountName: "John Doe",
      accountNumber: "081234567890",
      qrCode: "/placeholder.svg?height=200&width=200",
    },
    gopay: {
      accountName: "Jane Smith",
      accountNumber: "087654321098",
      qrCode: "/placeholder.svg?height=200&width=200",
    },
    ovo: {
      accountName: "Alice Brown",
      accountNumber: "085012345678",
      qrCode: "/placeholder.svg?height=200&width=200",
    },
    bank_transfer: {
      bankName: "Bank Central Asia (BCA)",
      accountName: "PT Puyok Digital",
      accountNumber: "1234567890",
      swiftCode: "CENAIDJA",
    },
  }

  const currentDetails = method ? paymentDetails[method as keyof typeof paymentDetails] : null

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
    })
  }

  const handleUploadProof = () => {
    router.push(`/upload-proof?assetId=${assetId}&quantity=${quantity}&method=${method}`)
  }

  if (!method || !currentDetails) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 text-center text-muted-foreground">
        <h1 className="text-3xl font-bold mb-4">Payment Method Not Selected</h1>
        <p className="mb-6">Please go back and select a payment method to view instructions.</p>
        <Button onClick={() => router.back()}>Go Back to Payment</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-2">Payment Instructions</h1>
      <p className="text-muted-foreground mb-8">Please complete your payment using your selected method.</p>

      <Card className="bg-card border border-border p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Info className="w-6 h-6 text-primary" /> Payment Details ({method.toUpperCase().replace("_", " ")})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {method !== "bank_transfer" && (
            <>
              <div className="flex justify-center mb-4">
                {method === "dana" && <PaymentMethodIcons.Dana className="h-10" />}
                {method === "gopay" && <PaymentMethodIcons.Gopay className="h-10" />}
                {method === "ovo" && <PaymentMethodIcons.Ovo className="h-10" />}
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Scan QR code or transfer to:</p>
                <p className="text-2xl font-bold text-foreground mt-2">{(currentDetails as any).accountNumber}</p>
                <p className="text-muted-foreground">a.n. {(currentDetails as any).accountName}</p>
                {(currentDetails as any).qrCode && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={(currentDetails as any).qrCode || "/placeholder.svg"}
                      alt={`${method} QR Code`}
                      className="w-48 h-48 border border-border rounded-lg"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {method === "bank_transfer" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bank Name:</span>
                <span className="font-medium">{(currentDetails as any).bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-medium">{(currentDetails as any).accountName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-bold text-lg">{(currentDetails as any).accountNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy((currentDetails as any).accountNumber, "Account number copied!")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">SWIFT Code:</span>
                <span className="font-medium">{(currentDetails as any).swiftCode}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy((currentDetails as any).swiftCode, "SWIFT code copied!")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" /> Important Notes
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Please transfer the exact amount shown on the previous page.</li>
              <li>Your order will be processed after payment verification.</li>
              <li>Upload your proof of payment immediately after transfer.</li>
              <li>Payment usually takes 5-15 minutes to verify.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleUploadProof} className="w-full mt-8 py-3 text-lg">
        <UploadCloud className="w-5 h-5 mr-2" /> Upload Proof of Payment
      </Button>

      <div className="text-center mt-4">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
          Cancel and go back to Dashboard
        </Link>
      </div>
    </div>
  )
}
