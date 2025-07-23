"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { UploadCloud, ImageIcon, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UploadProofPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assetId = searchParams.get("assetId")
  const quantity = searchParams.get("quantity")
  const method = searchParams.get("method")

  const [proofImage, setProofImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProofImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProofImage(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!proofImage) {
      toast({
        title: "Validation Error",
        description: "Please upload your proof of payment.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call to upload proof
    console.log("Uploading proof for:", {
      assetId,
      quantity,
      method,
      proofImage: proofImage.name,
    })

    toast({
      title: "Proof Uploaded!",
      description: "Your payment proof has been submitted for verification.",
    })

    // Redirect to a success page or dashboard
    router.push("/upload-success")
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-2">Upload Payment Proof</h1>
      <p className="text-muted-foreground mb-8">Please upload a screenshot or photo of your payment confirmation.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-card border border-border p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary" /> Payment Proof
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div>
              <Label htmlFor="proofImageUpload" className="mb-2 block">
                Upload Image
              </Label>
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30 transition-colors relative">
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Payment Proof Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <UploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-2" />
                    <p>Drag & drop your proof here, or click to select</p>
                    <p className="text-sm">(Max 10MB, JPG, PNG)</p>
                  </div>
                )}
                <Input
                  id="proofImageUpload"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
                  required
                />
              </div>
              {proofImage && <p className="text-sm text-muted-foreground mt-2">Selected file: {proofImage.name}</p>}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full py-3 text-lg">
          <CheckCircle className="w-5 h-5 mr-2" /> Submit Proof
        </Button>
      </form>

      <div className="text-center mt-4">
        <Link href="/payment-instructions" className="text-sm text-muted-foreground hover:underline">
          Back to Payment Instructions
        </Link>
      </div>
    </div>
  )
}
