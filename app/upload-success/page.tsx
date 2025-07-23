"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  ArrowRight,
  Bell,
  Eye,
  Users,
  Zap,
  Star,
  MessageCircle,
  Home
} from "lucide-react"
import Link from "next/link"

// Sample order data
const orderData = {
  id: "ORD-12345",
  asset: {
    name: "Bored Ape #1234",
    image: "/placeholder.svg?height=80&width=80&text=Bored+Ape",
    price: "Rp 15.000.134",
    seller: "cryptoking88"
  },
  estimatedVerificationTime: "5-15 menit",
  uploadTime: new Date()
}

export default function UploadSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Simulate verification progress
  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
      setTimeElapsed(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Bukti Transfer Berhasil Dikirim</h1>
              <p className="text-sm text-muted-foreground">Order #{orderData.id}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Success Banner */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
                Bukti Transfer Berhasil Dikirim!
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Terima kasih! Kami sedang memverifikasi pembayaran Anda
              </p>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Detail Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <img 
                  src={orderData.asset.image} 
                  alt={orderData.asset.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{orderData.asset.name}</h3>
                  <p className="text-muted-foreground">Penjual: {orderData.asset.seller}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{orderData.asset.price}</div>
                  <Badge variant="secondary" className="mt-1">Verifikasi Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Status Verifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Memverifikasi pembayaran...</span>
                  <span className="text-sm text-muted-foreground">{Math.round(verificationProgress)}%</span>
                </div>
                <Progress value={verificationProgress} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Waktu berjalan: {formatTime(timeElapsed)}</span>
                  <span>Estimasi: {orderData.estimatedVerificationTime}</span>
                </div>
              </div>

              {/* Verification Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold">Proses Verifikasi:</h4>
                <div className="space-y-2">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${verificationProgress > 20 ? 'bg-green-50 dark:bg-green-950/20 border border-green-200' : 'bg-muted/50'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${verificationProgress > 20 ? 'bg-green-600' : 'bg-muted-foreground'}`}>
                      {verificationProgress > 20 ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white text-xs">1</span>}
                    </div>
                    <span className={verificationProgress > 20 ? 'text-green-800 dark:text-green-400 font-medium' : ''}>
                      Menerima bukti transfer
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${verificationProgress > 50 ? 'bg-green-50 dark:bg-green-950/20 border border-green-200' : 'bg-muted/50'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${verificationProgress > 50 ? 'bg-green-600' : 'bg-muted-foreground'}`}>
                      {verificationProgress > 50 ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white text-xs">2</span>}
                    </div>
                    <span className={verificationProgress > 50 ? 'text-green-800 dark:text-green-400 font-medium' : ''}>
                      Memverifikasi nominal dan kode transfer
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${verificationProgress > 80 ? 'bg-green-50 dark:bg-green-950/20 border border-green-200' : 'bg-muted/50'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${verificationProgress > 80 ? 'bg-green-600' : 'bg-muted-foreground'}`}>
                      {verificationProgress > 80 ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white text-xs">3</span>}
                    </div>
                    <span className={verificationProgress > 80 ? 'text-green-800 dark:text-green-400 font-medium' : ''}>
                      Menghubungi penjual untuk transfer aset
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${verificationProgress >= 100 ? 'bg-green-50 dark:bg-green-950/20 border border-green-200' : 'bg-muted/50'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${verificationProgress >= 100 ? 'bg-green-600' : 'bg-muted-foreground'}`}>
                      {verificationProgress >= 100 ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-white text-xs">4</span>}
                    </div>
                    <span className={verificationProgress >= 100 ? 'text-green-800 dark:text-green-400 font-medium' : ''}>
                      Transaksi selesai - aset diterima
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Apa yang Terjadi Selanjutnya?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400">Notifikasi Real-time</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Anda akan mendapat notifikasi push saat verifikasi selesai dan aset telah ditransfer ke wallet Anda.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold text-purple-800 dark:text-purple-400">Tim Support</h4>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Jika ada masalah dengan verifikasi, tim support akan menghubungi Anda dalam 30 menit.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-green-800 dark:text-green-400">Jaminan Keamanan</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Dana Anda dilindungi sistem escrow. Jika ada masalah, uang akan dikembalikan 100%.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-orange-600" />
                    <h4 className="font-semibold text-orange-800 dark:text-orange-400">Rating & Review</h4>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Setelah transaksi selesai, Anda bisa memberikan rating dan review untuk penjual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="/dashboard">
                <Home className="w-5 h-5" />
                Kembali ke Dashboard
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="/marketplace">
                <ArrowRight className="w-5 h-5" />
                Lanjut Belanja
              </Link>
            </Button>
          </div>

          {/* Contact Support */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-amber-600" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-400">
                      Butuh Bantuan?
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Tim support kami siap membantu 24/7
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                  Hubungi Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
