"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  ArrowRight,
  FileImage,
  X,
  Eye,
  Clock,
  Shield,
  Zap
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Sample order data
const orderData = {
  id: "ORD-12345",
  asset: {
    name: "Bored Ape #1234",
    image: "/placeholder.svg?height=80&width=80&text=Bored+Ape",
    price: "Rp 15.000.134"
  },
  transferCode: "PUYOK-12345",
  paymentMethod: "DANA"
}

interface UploadedFile {
  file: File
  preview: string
  id: string
}

export default function UploadProofPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [notes, setNotes] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length === 0) {
      toast({
        title: "File tidak valid",
        description: "Hanya file gambar yang diperbolehkan",
        variant: "destructive"
      })
      return
    }

    imageFiles.slice(0, 3 - uploadedFiles.length).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File terlalu besar",
          description: `${file.name} melebihi batas 10MB`,
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
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Bukti transfer diperlukan",
        description: "Mohon upload setidaknya satu foto bukti transfer",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    toast({
      title: "Bukti transfer berhasil dikirim!",
      description: "Kami akan memverifikasi pembayaran Anda dalam 5-15 menit",
    })
    
    router.push(`/upload-success?orderId=${orderData.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Upload Bukti Transfer</h1>
              <p className="text-sm text-muted-foreground">Order #{orderData.id}</p>
            </div>
            <Link href={`/payment-instructions?orderId=${orderData.id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Instruksi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Order Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={orderData.asset.image} 
                  alt={orderData.asset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{orderData.asset.name}</h3>
                  <p className="text-2xl font-bold text-primary">{orderData.asset.price}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">Transfer Selesai</Badge>
                  <p className="text-sm text-muted-foreground">via {orderData.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-5 h-5" />
                Upload Bukti Transfer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : uploadedFiles.length > 0 
                      ? 'border-green-300 bg-green-50 dark:bg-green-950/20' 
                      : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {uploadedFiles.length > 0 ? 'Upload Foto Tambahan' : 'Upload Foto Bukti Transfer'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Seret dan lepas file di sini, atau klik untuk memilih
                    </p>
                    
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer gap-2">
                        <Upload className="w-4 h-4" />
                        Pilih File
                      </Button>
                    </label>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Max 3 foto • Format: JPG, PNG • Ukuran max: 10MB per file
                  </div>
                </div>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    File yang diupload ({uploadedFiles.length})
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
                          <img 
                            src={file.preview} 
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">{file.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.file.size / (1024 * 1024)).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Catatan Tambahan (Opsional)
                </label>
                <Textarea
                  placeholder="Jika ada hal khusus yang ingin Anda sampaikan tentang transfer ini..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Requirements Checklist */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-3">
                  ✅ Pastikan foto bukti transfer menampilkan:
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Nominal transfer: <strong>Rp 15.000.134</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Kode transfer: <strong>{orderData.transferCode}</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Nomor tujuan dan status "Berhasil"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Waktu transfer yang jelas terbaca
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="space-y-4">
            <Button 
              onClick={handleSubmit}
              disabled={uploadedFiles.length === 0 || isSubmitting}
              size="lg" 
              className="w-full h-14 text-lg font-semibold gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim Bukti Transfer...
                </>
              ) : (
                <>
                  <ArrowRight className="w-6 h-6" />
                  Kirim Bukti Transfer
                </>
              )}
            </Button>

            {uploadedFiles.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                Upload setidaknya 1 foto bukti transfer untuk melanjutkan
              </p>
            )}
          </div>

          {/* Processing Info */}
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                    ⚡ Proses Verifikasi Otomatis
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>🤖 AI kami akan memverifikasi bukti transfer secara otomatis</li>
                    <li>⏱️ Biasanya selesai dalam 5-15 menit</li>
                    <li>📱 Anda akan mendapat notifikasi saat verifikasi selesai</li>
                    <li>🔄 Jika ada masalah, tim support akan menghubungi Anda</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
