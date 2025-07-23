"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Copy,
  Share2,
  Users,
  Gift,
  Coins,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Trophy,
  Target,
  Zap,
  Heart,
  DollarSign,
  UserPlus,
  CreditCard,
} from "lucide-react"
import { toast } from "sonner"

// Sample data
const userStats = {
  referralCode: "PUYOK-RAFLY123",
  totalInvited: 8,
  totalJoined: 6,
  totalTransacted: 4,
  totalCredits: "Rp 2.450.000",
  monthlyCredits: "Rp 850.000",
  nextTierReferrals: 15,
  currentTier: "Silver",
}

const referralHistory = [
  {
    id: "1",
    name: "Ahmad Rizky",
    username: "@ahmadrizky",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "15 Jul 2024",
    status: "transacted",
    firstTransaction: "Rp 5.000.000",
    creditEarned: "Rp 750.000",
    isActive: true,
  },
  {
    id: "2",
    name: "Sari Dewi",
    username: "@saridewi",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "12 Jul 2024",
    status: "transacted",
    firstTransaction: "Rp 3.200.000",
    creditEarned: "Rp 480.000",
    isActive: true,
  },
  {
    id: "3",
    name: "Budi Santoso",
    username: "@budisantoso",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "8 Jul 2024",
    status: "joined",
    firstTransaction: null,
    creditEarned: "Rp 0",
    isActive: false,
  },
  {
    id: "4",
    name: "Maya Putri",
    username: "@mayaputri",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "5 Jul 2024",
    status: "transacted",
    firstTransaction: "Rp 8.500.000",
    creditEarned: "Rp 1.275.000",
    isActive: true,
  },
  {
    id: "5",
    name: "Andi Kurniawan",
    username: "@andikurniawan",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2 Jul 2024",
    status: "transacted",
    firstTransaction: "Rp 1.800.000",
    creditEarned: "Rp 270.000",
    isActive: false,
  },
  {
    id: "6",
    name: "Lisa Anggraini",
    username: "@lisaanggraini",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "28 Jun 2024",
    status: "joined",
    firstTransaction: null,
    creditEarned: "Rp 0",
    isActive: false,
  },
]

const tiers = [
  {
    name: "Bronze",
    minReferrals: 0,
    bonus: "Standar",
    color: "bg-orange-500",
    benefits: ["Kredit 50% dari biaya transaksi teman"],
  },
  {
    name: "Silver",
    minReferrals: 10,
    bonus: "+10%",
    color: "bg-gray-400",
    benefits: ["Kredit 55% dari biaya transaksi teman", "Bonus bulanan Rp 100.000"],
  },
  {
    name: "Gold",
    minReferrals: 25,
    bonus: "+25%",
    color: "bg-yellow-500",
    benefits: ["Kredit 60% dari biaya transaksi teman", "Bonus bulanan Rp 250.000", "Priority support"],
  },
  {
    name: "Platinum",
    minReferrals: 50,
    bonus: "+50%",
    color: "bg-purple-500",
    benefits: [
      "Kredit 70% dari biaya transaksi teman",
      "Bonus bulanan Rp 500.000",
      "Priority support",
      "Custom referral page",
    ],
  },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const referralLinkRef = useRef<HTMLInputElement>(null)

  const referralLink = `https://puyok.id/daftar?ref=${userStats.referralCode}`

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userStats.referralCode)
    setCopied(true)
    toast.success("Kode referral berhasil disalin!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setLinkCopied(true)
    toast.success("Link referral berhasil disalin!")
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    setIsSharing(true)
    const message = `Halo! 👋

Aku mau ajak kamu join di PUYOK - marketplace aset digital terpercaya!

🎁 Pakai kode referral aku: ${userStats.referralCode}
✨ Kamu dapat potongan 50% biaya transaksi untuk penjualan pertama!

Daftar sekarang: ${referralLink}

PUYOK bikin jual-beli NFT & crypto jadi mudah dengan pembayaran DANA, GoPay, OVO! 💰`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    toast.success("WhatsApp dibuka! Silakan pilih kontak untuk berbagi")
    setTimeout(() => setIsSharing(false), 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "transacted":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sudah Bertransaksi
          </Badge>
        )
      case "joined":
        return (
          <Badge variant="outline" className="border-orange-300 text-orange-600">
            <Clock className="w-3 h-3 mr-1" />
            Baru Bergabung
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const currentTierIndex = tiers.findIndex((tier) => tier.name === userStats.currentTier)
  const nextTier = tiers[currentTierIndex + 1]
  const progressToNextTier = nextTier
    ? (userStats.totalJoined / nextTier.minReferrals) * 100
    : 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Program Referral</h1>
                <p className="text-sm text-muted-foreground">Ajak Teman, Dapat Untung Bersama!</p>
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            {userStats.currentTier} Tier
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 rounded-full px-4 py-2 text-sm text-purple-700 mb-4">
            <Gift className="w-4 h-4" />
            Program Referral PUYOK
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ajak Teman,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dapat Untung Bersama!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah sebagai duta brand PUYOK dan raih keuntungan dari setiap teman yang kamu ajak. Semakin banyak
            teman yang aktif, semakin besar keuntunganmu!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6 text-center">
              <UserPlus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalInvited}</div>
              <div className="text-sm text-muted-foreground">Total Diundang</div>
            </CardContent>
          </Card>
          <Card className="border border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalJoined}</div>
              <div className="text-sm text-muted-foreground">Berhasil Bergabung</div>
            </CardContent>
          </Card>
          <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalTransacted}</div>
              <div className="text-sm text-muted-foreground">Sudah Bertransaksi</div>
            </CardContent>
          </Card>
          <Card className="border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="p-6 text-center">
              <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.totalCredits}</div>
              <div className="text-sm text-muted-foreground">Total Kredit</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Referral Code & Sharing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Code Section */}
            <Card className="border border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Kode Referral Kamu
                </CardTitle>
                <CardDescription>
                  Bagikan kode unik ini kepada teman-temanmu untuk mendapatkan bonus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Kode Referral</div>
                    <div className="text-2xl font-bold text-primary font-mono">{userStats.referralCode}</div>
                  </div>
                  <Button onClick={handleCopyCode} className="shrink-0">
                    {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Tersalin!" : "Salin Kode"}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">Link Referral:</div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <input
                      ref={referralLinkRef}
                      readOnly
                      value={referralLink}
                      className="flex-1 bg-transparent text-sm text-foreground"
                    />
                    <Button variant="outline" size="sm" onClick={handleCopyLink}>
                      {linkCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleShareWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Bagikan via WhatsApp
                  </Button>
                  <Button variant="outline" onClick={handleCopyLink} className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Cara Kerja Program Referral
                </CardTitle>
                <CardDescription>Keuntungan yang adil untuk semua pihak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* For Friend */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Gift className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Untuk Temanmu</h3>
                        <p className="text-sm text-green-600">Bonus Selamat Datang!</p>
                      </div>
                    </div>
                    <div className="pl-15">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">🎁 Potongan 50% Biaya Transaksi</h4>
                        <p className="text-sm text-green-700">
                          Teman yang kamu undang akan mendapatkan potongan 50% biaya transaksi untuk penjualan pertama
                          mereka. Bonus selamat datang yang hebat untuk memulai perjalanan digital mereka!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* For You */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Coins className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Untuk Kamu</h3>
                        <p className="text-sm text-purple-600">Kredit Referral!</p>
                      </div>
                    </div>
                    <div className="pl-15">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 mb-2">💰 Kredit 50% dari Biaya Transaksi</h4>
                        <p className="text-sm text-purple-700">
                          Kamu akan mendapatkan kredit sebesar 50% dari nilai biaya transaksi pertama temanmu. Kredit
                          ini bisa digunakan untuk memotong biaya transaksimu di masa depan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="mt-6 border-blue-200 bg-blue-50">
                  <Star className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Pro Tip:</strong> Semakin banyak teman yang aktif bertransaksi, semakin besar kredit yang
                    kamu dapatkan. Ajak teman yang benar-benar tertarik dengan dunia digital asset!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-foreground" />
                  Riwayat Referral
                </CardTitle>
                <CardDescription>Teman-teman yang sudah kamu undang ke PUYOK</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralHistory.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{friend.name}</h3>
                            {friend.isActive && <Heart className="w-4 h-4 text-red-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{friend.username}</p>
                          <p className="text-xs text-muted-foreground">Bergabung: {friend.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        {getStatusBadge(friend.status)}
                        {friend.firstTransaction && (
                          <div className="text-sm text-muted-foreground">
                            Transaksi: {friend.firstTransaction}
                          </div>
                        )}
                        <div className="text-sm font-medium text-green-600">
                          Kredit: {friend.creditEarned}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {referralHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada teman yang kamu undang</p>
                    <p className="text-sm">Ayo mulai berbagi kode referralmu!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tier Progress & Benefits */}
          <div className="space-y-6">
            {/* Current Tier & Progress */}
            <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  Tier Progress
                </CardTitle>
                <CardDescription>Tingkatkan tier untuk mendapatkan bonus lebih besar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{userStats.currentTier}</div>
                  <div className="text-sm text-muted-foreground">Tier Saat Ini</div>
                </div>

                {nextTier && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Menuju {nextTier.name}</span>
                        <span className="font-medium">
                          {userStats.totalJoined}/{nextTier.minReferrals}
                        </span>
                      </div>
                      <Progress value={progressToNextTier} className="h-2" />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {nextTier.minReferrals - userStats.totalJoined} referral lagi untuk naik ke {nextTier.name}
                    </div>
                  </>
                )}

                <Alert className="border-purple-200 bg-purple-50">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    Bulan ini kamu sudah meraih{" "}
                    <span className="font-bold">{userStats.monthlyCredits}</span> kredit!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Tier Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Benefit Tier
                </CardTitle>
                <CardDescription>Keuntungan di setiap tingkatan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tiers.map((tier, index) => (
                    <div
                      key={tier.name}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        tier.name === userStats.currentTier
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                          <span className="font-medium">{tier.name}</span>
                          {tier.name === userStats.currentTier && (
                            <Badge variant="default" className="text-xs">
                              Aktif
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{tier.minReferrals}+ referral</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {tier.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleShareWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Bagikan via WhatsApp
                </Button>
                <Button variant="outline" className="w-full" onClick={handleCopyLink}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Salin Link Referral
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Lihat Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
