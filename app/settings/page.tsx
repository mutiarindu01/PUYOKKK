"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Camera,
  CreditCard,
  Shield,
  Bell,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Settings,
  Lock,
  Smartphone,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: "John Doe",
    username: "johndoe",
    bio: "Digital art collector and NFT enthusiast",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    socialLinks: {
      twitter: "@johndoe",
      instagram: "@johndoe_art",
      website: "johndoe.art",
    },
  })
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "DANA",
      name: "John Doe",
      account: "081234567890",
      verified: true,
      isPrimary: true,
    },
    {
      id: "2",
      type: "GoPay",
      name: "John Doe",
      account: "081234567890",
      verified: true,
      isPrimary: false,
    },
    {
      id: "3",
      type: "Bank BCA",
      name: "John Doe",
      account: "1234567890",
      verified: false,
      isPrimary: false,
    },
  ])
  const [notifications, setNotifications] = useState({
    newOffers: true,
    priceAlerts: true,
    transactionUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
    pushNotifications: true,
  })
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    passwordLastChanged: "2024-01-15",
  })

  const paymentIcons = {
    DANA: "💳",
    GoPay: "🟢",
    OVO: "🟣",
    "Bank BCA": "🏦",
    "Bank BRI": "🏦",
    "Bank Mandiri": "🏦",
  }

  const handleSaveProfile = () => {
    // Save profile logic
    console.log("Saving profile:", profileData)
  }

  const handleAddPaymentMethod = () => {
    // Add payment method logic
    console.log("Adding payment method")
  }

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleSetPrimary = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      })),
    )
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value })
  }

  const handleEnable2FA = () => {
    setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })
  }

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
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Pengaturan</h1>
                <p className="text-sm text-muted-foreground">Kelola profil dan preferensi Anda</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profil Publik</span>
              <span className="sm:hidden">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Akun Pembayaran</span>
              <span className="sm:hidden">Pembayaran</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Keamanan & Notifikasi</span>
              <span className="sm:hidden">Keamanan</span>
            </TabsTrigger>
          </TabsList>

          {/* Profil Publik Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Profil
                </CardTitle>
                <CardDescription>
                  Informasi ini akan ditampilkan secara publik di profil Anda dan membantu membangun kepercayaan dengan
                  pengguna lain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} alt="Profile picture" />
                    <AvatarFallback className="text-2xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Ubah Foto
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Disarankan ukuran 400x400px. Maksimal 2MB dalam format JPG atau PNG.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nama Lengkap</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      placeholder="username_unik"
                    />
                    <p className="text-xs text-muted-foreground">
                      Username akan menjadi URL profil publik Anda: puyok.id/@{profileData.username}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Ceritakan tentang diri Anda dan karya yang Anda jual..."
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">Maksimal 160 karakter</p>
                </div>

                <Separator />

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Link Media Sosial</h3>
                  <p className="text-sm text-muted-foreground">
                    Tambahkan link media sosial untuk meningkatkan kredibilitas profil Anda.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.socialLinks.twitter}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialLinks: { ...profileData.socialLinks, twitter: e.target.value },
                          })
                        }
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={profileData.socialLinks.instagram}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialLinks: { ...profileData.socialLinks, instagram: e.target.value },
                          })
                        }
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={profileData.socialLinks.website}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            socialLinks: { ...profileData.socialLinks, website: e.target.value },
                          })
                        }
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Akun Pembayaran Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Metode Pembayaran
                    </CardTitle>
                    <CardDescription>
                      Kelola rekening e-wallet dan bank untuk menerima pembayaran dengan aman.
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddPaymentMethod} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Akun
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Penting:</strong> Pastikan nama pemilik akun sesuai dengan nama profil Anda untuk
                    mempermudah verifikasi pembayaran.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className="relative">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                              {paymentIcons[method.type as keyof typeof paymentIcons]}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-foreground">{method.type}</h3>
                                {method.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                                {method.isPrimary && (
                                  <Badge variant="default" className="text-xs">
                                    Utama
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{method.name}</p>
                              <p className="text-sm text-muted-foreground font-mono">{method.account}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!method.isPrimary && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetPrimary(method.id)}
                                className="text-xs"
                              >
                                Jadikan Utama
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemovePaymentMethod(method.id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {!method.verified && (
                          <Alert className="mt-4 border-orange-200 bg-orange-50">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <AlertDescription className="text-orange-700">
                              Akun belum diverifikasi. Klik{" "}
                              <Button variant="link" className="p-0 h-auto text-orange-600 font-medium">
                                di sini
                              </Button>{" "}
                              untuk memulai verifikasi.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {paymentMethods.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada metode pembayaran</p>
                    <p className="text-sm">Tambahkan akun e-wallet atau bank untuk menerima pembayaran</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Verifikasi Identitas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verifikasi Identitas
                </CardTitle>
                <CardDescription>
                  Tingkatkan kepercayaan dengan verifikasi identitas untuk transaksi yang lebih aman.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Verifikasi KTP</h3>
                      <p className="text-sm text-muted-foreground">Status: Belum Diverifikasi</p>
                    </div>
                  </div>
                  <Button variant="outline">Mulai Verifikasi</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keamanan & Notifikasi Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Keamanan Akun */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Keamanan Akun
                </CardTitle>
                <CardDescription>Lindungi akun Anda dengan fitur keamanan tambahan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Two Factor Authentication */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-muted-foreground">
                        {security.twoFactorEnabled
                          ? "Aktif - Akun Anda dilindungi dengan 2FA"
                          : "Tambahkan lapisan keamanan ekstra dengan aplikasi authenticator"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={security.twoFactorEnabled} onCheckedChange={handleEnable2FA} />
                    {security.twoFactorEnabled && (
                      <Badge variant="default" className="bg-green-100 text-green-700">
                        Aktif
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Login Alerts */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Notifikasi Login</h3>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan notifikasi saat ada login dari perangkat baru
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                  />
                </div>

                {/* Password */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Terakhir diubah: {new Date(security.passwordLastChanged).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Ubah Password</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifikasi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferensi Notifikasi
                </CardTitle>
                <CardDescription>Kelola notifikasi yang ingin Anda terima dari platform kami.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Penawaran Baru</h3>
                      <p className="text-sm text-muted-foreground">Notifikasi saat ada penawaran untuk aset Anda</p>
                    </div>
                    <Switch
                      checked={notifications.newOffers}
                      onCheckedChange={(checked) => handleNotificationChange("newOffers", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Alert Harga</h3>
                      <p className="text-sm text-muted-foreground">
                        Pemberitahuan perubahan harga aset yang Anda ikuti
                      </p>
                    </div>
                    <Switch
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Update Transaksi</h3>
                      <p className="text-sm text-muted-foreground">Status pembayaran dan transfer aset</p>
                    </div>
                    <Switch
                      checked={notifications.transactionUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("transactionUpdates", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">Notifikasi push di browser</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">Notifikasi penting via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Email Marketing</h3>
                      <p className="text-sm text-muted-foreground">Tips, berita, dan update produk</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Simpan Preferensi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
