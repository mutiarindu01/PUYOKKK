"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PaymentMethodIcons } from "@/components/payment-method-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Banknote, Wallet } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assetId = searchParams.get("assetId")
  const quantity = searchParams.get("quantity")

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  // Dummy asset data for display
  const assetName = "Bored Ape #1234" // Replace with actual fetch based on assetId
  const assetPrice = "Rp 15.000.000" // Replace with actual fetch based on assetId

  const handleProceedToInstructions = () => {
    if (!selectedMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed.",
        variant: "destructive",
      })
      return
    }
    router.push(`/payment-instructions?assetId=${assetId}&quantity=${quantity}&method=${selectedMethod}`)
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
      <p className="text-muted-foreground mb-8">Select your preferred payment method for {assetName}.</p>

      <Card className="bg-card border border-border p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Banknote className="w-6 h-6 text-primary" /> Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-muted-foreground">Asset:</span>
            <span className="font-medium">{assetName}</span>
          </div>
          {quantity && (
            <div className="flex justify-between items-center text-lg">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">{quantity}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center text-xl font-bold text-primary">
            <span>Total Amount:</span>
            <span>{assetPrice}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border p-6 mt-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" /> Choose Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <RadioGroup onValueChange={setSelectedMethod} className="space-y-4">
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="dana" id="dana" />
              <Label htmlFor="dana" className="flex-1 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-lg">DANA</span>
                <PaymentMethodIcons.Dana className="h-6" />
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="gopay" id="gopay" />
              <Label htmlFor="gopay" className="flex-1 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-lg">GoPay</span>
                <PaymentMethodIcons.Gopay className="h-6" />
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="ovo" id="ovo" />
              <Label htmlFor="ovo" className="flex-1 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-lg">OVO</span>
                <PaymentMethodIcons.Ovo className="h-6" />
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="flex-1 flex items-center justify-between cursor-pointer">
                <span className="font-medium text-lg">Bank Transfer</span>
                <Banknote className="h-6 w-6 text-muted-foreground" />
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={handleProceedToInstructions} className="w-full mt-8 py-3 text-lg">
        Proceed to Payment Instructions
      </Button>
    </div>
  )
}
