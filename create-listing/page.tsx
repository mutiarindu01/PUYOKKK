"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { UploadCloud, ImageIcon, DollarSign, Tag, Info } from "lucide-react"

export default function CreateListingPage() {
  const router = useRouter()
  const [assetType, setAssetType] = useState<"NFT" | "Token">("NFT")
  const [assetName, setAssetName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("IDR")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [contractAddress, setContractAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [tokenTicker, setTokenTicker] = useState("")
  const [tokenQuantity, setTokenQuantity] = useState("")
  const [isFixedPrice, setIsFixedPrice] = useState(true) // For future auction feature

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!assetName || !description || !price || !currency) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (assetType === "NFT" && !imageFile) {
      toast({
        title: "Validation Error",
        description: "Please upload an image for your NFT.",
        variant: "destructive",
      })
      return
    }

    if (assetType === "Token" && (!tokenTicker || !tokenQuantity)) {
      toast({
        title: "Validation Error",
        description: "Please provide ticker and quantity for your Token.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    console.log("Submitting listing:", {
      assetType,
      assetName,
      description,
      price,
      currency,
      imageFile: imageFile?.name,
      contractAddress,
      tokenId,
      tokenTicker,
      tokenQuantity,
      isFixedPrice,
    })

    toast({
      title: "Listing Created!",
      description: `Your ${assetType} "${assetName}" has been listed successfully.`,
    })

    // Redirect to a success page or dashboard
    router.push("/upload-success")
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
      <p className="text-muted-foreground mb-8">List your NFT or Token for sale on the marketplace.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-card border border-border p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" /> Asset Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div>
              <Label htmlFor="assetType" className="mb-2 block">
                Asset Type
              </Label>
              <Select value={assetType} onValueChange={(value: "NFT" | "Token") => setAssetType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NFT">NFT (Non-Fungible Token)</SelectItem>
                  <SelectItem value="Token">Token (Fungible Token)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="assetName">Asset Name</Label>
              <Input
                id="assetName"
                type="text"
                placeholder="e.g., 'CyberPunk #789' or 'Ethereum'"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your asset..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            {assetType === "NFT" && (
              <div>
                <Label htmlFor="imageUpload" className="mb-2 block">
                  <ImageIcon className="inline-block w-4 h-4 mr-2" /> Asset Image
                </Label>
                <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30 transition-colors relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Asset Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p>Drag & drop an image here, or click to select</p>
                      <p className="text-sm">(Max 5MB)</p>
                    </div>
                  )}
                  <Input
                    id="imageUpload"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                {imageFile && <p className="text-sm text-muted-foreground mt-2">Selected file: {imageFile.name}</p>}
              </div>
            )}

            {assetType === "Token" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tokenTicker">Token Ticker</Label>
                  <Input
                    id="tokenTicker"
                    type="text"
                    placeholder="e.g., 'USDT', 'ETH'"
                    value={tokenTicker}
                    onChange={(e) => setTokenTicker(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tokenQuantity">Quantity</Label>
                  <Input
                    id="tokenQuantity"
                    type="number"
                    placeholder="e.g., '1000'"
                    value={tokenQuantity}
                    onChange={(e) => setTokenQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="contractAddress">Contract Address</Label>
              <Input
                id="contractAddress"
                type="text"
                placeholder="e.g., 0xAbC...XyZ (optional)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>

            {assetType === "NFT" && (
              <div>
                <Label htmlFor="tokenId">Token ID</Label>
                <Input
                  id="tokenId"
                  type="text"
                  placeholder="e.g., '12345' (optional)"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border border-border p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" /> Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="fixedPrice">Fixed Price</Label>
              <Switch id="fixedPrice" checked={isFixedPrice} onCheckedChange={setIsFixedPrice} />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 15000000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IDR">IDR (Indonesian Rupiah)</SelectItem>
                  <SelectItem value="USD">USD (United States Dollar)</SelectItem>
                  <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full py-3 text-lg">
          <Tag className="w-5 h-5 mr-2" /> Create Listing
        </Button>
      </form>
    </div>
  )
}
