"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileImage,
  Camera,
  Shield,
  Clock,
  Star,
  Eye,
  FileText
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Asset {
  id: string
  name: string
  type: "NFT" | "Token"
  image?: string
  ticker?: string
  price: string
  quantity?: string
  seller: {
    username: string
    avatar: string
    rating: number
    totalTransactions: number
  }
}

interface UploadedFile {
  file: File
  preview: string
  id: string
}

// Mock asset data
const mockAssets: Asset[] = [
  {
    id: "101",
    name: "Bored Ape #1234",
    type: "NFT",
    image: "/placeholder.svg?height=800&width=800",
    price: "Rp 15.000.000",
    seller: {
      username: "art_visionary",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalTransactions: 247
    }
  },
  {
    id: "1",
    name: "Tether",
    type: "Token",
    ticker: "USDT",
    price: "Rp 15.500",
    quantity: "1,000 USDT",
    seller: {
      username: "stable_trader",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      totalTransactions: 523
    }
  }
]

export default function UploadProofPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const assetId = searchParams.get('assetId')
  
  const [asset, setAsset] = useState<Asset | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [notes, setNotes] = useState("")

  // Generate unique payment details based on assetId
  const paymentDetails = {
    uniqueAmount: asset ? `${asset.price.replace(/[^\d]/g, '')}.134` : "15000000.134",
    transferCode: `PUYOK-${assetId || '101'}`,
  }

  useEffect(() => {
    const foundAsset = mockAssets.find(a => a.id === assetId)
    setAsset(foundAsset || mockAssets[0])
  }, [assetId])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "File Tidak Valid",
          description: "Hanya file gambar yang diperbolehkan (JPG, PNG, etc.)",
          variant: "destructive"
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive"
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          file,
          preview: e.target?.result as string,
          id: Math.random().toString(36).substr(2, 9)
        }
        setUploadedFiles(prev => [...prev, newFile])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    onDrop(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onDrop(files)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Bukti Transfer Diperlukan",
        description: "Silakan upload bukti transfer terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      router.push(`/upload-success?assetId=${assetId}`)
      toast({
        title: "Bukti Transfer Berhasil Dikirim!",
        description: "Tim kami akan memverifikasi pembayaran dalam 5-10 menit.",
      })
    }, 2000)
  }

  if (!asset) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Asset Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">Silakan kembali ke marketplace.</p>
          <Button onClick={() => router.push('/marketplace')}>Kembali ke Marketplace</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
          <span>/</span>
          <Link href={`/marketplace/${assetId}`} className="hover:text-primary">{asset.name}</Link>
          <span>/</span>
          <Link href={`/payment-instructions?assetId=${assetId}`} className="hover:text-primary">Instruksi Pembayaran</Link>
          <span>/</span>
          <span className="text-foreground">Upload Bukti</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Ringkasan Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asset Info */}
                  <div className="flex items-center gap-4">
                    {asset.type === "NFT" && asset.image ? (
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border-2 border-border">
                        <span className="text-2xl font-bold text-primary">{asset.ticker}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{asset.name}</h3>
                      <Badge variant="secondary">{asset.type}</Badge>
                      {asset.quantity && (
                        <p className="text-sm text-muted-foreground mt-1">{asset.quantity}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Harga:</span>
                      <span className="text-2xl font-bold text-primary">{asset.price}</span>
                    </div>
                  </div>

                  {/* Payment Reference */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="text-sm text-muted-foreground">Detail Pembayaran:</div>
                    <div className="bg-muted/50 p-3 rounded-lg space-y-1 text-sm">
                      <div><span className="font-medium">Nominal:</span> Rp {paymentDetails.uniqueAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                      <div><span className="font-medium">Kode:</span> {paymentDetails.transferCode}</div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={asset.seller.avatar}
                        alt={asset.seller.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{asset.seller.username}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {asset.seller.rating} ({asset.seller.totalTransactions} transaksi)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upload Section */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="w-6 h-6" />
                  Upload Bukti Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instructions */}
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <AlertDescription>
                    <div className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                      📸 Tips Upload Bukti Transfer
                    </div>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Pastikan nominal dan kode transfer terlihat jelas</li>
                      <li>• Upload screenshot atau foto dari aplikasi banking</li>
                      <li>• Format yang didukung: JPG, PNG (maksimal 5MB)</li>
                      <li>• Bisa upload lebih dari 1 foto jika diperlukan</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* Drag and Drop Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileImage className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drag & Drop Bukti Transfer</h3>
                  <p className="text-muted-foreground mb-4">
                    atau klik tombol dibawah untuk pilih file
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Pilih File
                      </span>
                    </Button>
                  </label>
                </div>

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Bukti Transfer yang Diupload:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedFiles.map((uploadedFile) => (
                        <div key={uploadedFile.id} className="relative border rounded-lg overflow-hidden">
                          <Image
                            src={uploadedFile.preview}
                            alt="Bukti transfer"
                            width={200}
                            height={200}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="w-6 h-6"
                              onClick={() => removeFile(uploadedFile.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="p-2 bg-background/90 backdrop-blur-sm">
                            <div className="text-sm font-medium truncate">
                              {uploadedFile.file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catatan Tambahan (Opsional)</label>
                  <Textarea
                    placeholder="Tambahkan catatan jika ada hal khusus yang perlu diketahui..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Security Notice */}
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <Shield className="h-5 w-5 text-green-600" />
                  <AlertDescription>
                    <div className="font-semibold text-green-800 dark:text-green-400 mb-2">
                      🔒 Keamanan Data Terjamin
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Bukti transfer Anda dienkripsi dan hanya digunakan untuk verifikasi pembayaran.
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleSubmit}
                    disabled={uploadedFiles.length === 0 || isUploading}
                    className={`w-full h-12 text-lg ${
                      uploadedFiles.length > 0 && !isUploading
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Mengirim Bukti Transfer...
                      </>
                    ) : uploadedFiles.length > 0 ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Kirim Bukti Transfer ({uploadedFiles.length} file)
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Upload Bukti Transfer Dulu
                      </>
                    )}
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={() => router.push(`/payment-instructions?assetId=${assetId}`)}
                    className="w-full"
                    disabled={isUploading}
                  >
                    Kembali ke Instruksi Pembayaran
                  </Button>
                </div>

                {/* Expected Processing Time */}
                <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-center">
                    <div className="font-semibold text-amber-800 dark:text-amber-400 mb-1">
                      ⏱️ Waktu Verifikasi: 5-10 Menit
                    </div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      Tim kami akan memverifikasi pembayaran dan mengirim notifikasi saat selesai.
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
