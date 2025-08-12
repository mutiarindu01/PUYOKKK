"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Camera,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Key,
  AlertTriangle
} from "lucide-react"

const currentUser = {
  username: "crypto_trader88",
  displayName: "Crypto Trader Pro",
  email: "trader@example.com",
  phone: "+62 812-3456-7890",
  bio: "Professional crypto trader with 5+ years experience. Specializing in NFT and DeFi investments.",
  avatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
  joinDate: "Januari 2023",
  isVerified: true,
  level: "Gold Trader",
  location: "Jakarta, Indonesia",
  website: "https://cryptotrader.pro"
}

export default function SettingsPage() {
  const [profileData, setProfileData] = useState(currentUser)
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    security: true,
    marketing: false
  })
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEarnings: false,
    showOrders: true,
    allowMessages: true
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pengaturan
              </h1>
              <p className="text-slate-400 mt-1">Kelola akun dan preferensi Anda</p>
            </div>
          </div>
          
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-slate-800/50 border-slate-700 grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-red-600">
                <Shield className="w-4 h-4 mr-2" />
                Keamanan
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-yellow-600">
                <Bell className="w-4 h-4 mr-2" />
                Notifikasi
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-green-600">
                <Globe className="w-4 h-4 mr-2" />
                Privasi
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Informasi Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profileData.avatar} alt={profileData.username} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                          {profileData.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold text-lg">{profileData.displayName}</h3>
                          {profileData.isVerified && (
                            <Badge className="bg-blue-500/20 text-blue-400">Verified</Badge>
                          )}
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            {profileData.level}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">@{profileData.username}</p>
                        <Button size="sm" variant="outline" className="mt-3 border-slate-600 text-slate-400 hover:text-white">
                          <Camera className="w-4 h-4 mr-2" />
                          Ubah Foto
                        </Button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="displayName" className="text-slate-300">Nama Tampilan</Label>
                        <Input
                          id="displayName"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="username" className="text-slate-300">Username</Label>
                        <Input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-slate-300">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-slate-300">Lokasi</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website" className="text-slate-300">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                        className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                        placeholder="Ceritakan tentang diri Anda..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Keamanan Akun</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Password Change */}
                    <div>
                      <h3 className="text-white font-semibold mb-4">Ubah Password</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword" className="text-slate-300">Password Saat Ini</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 pr-10"
                              placeholder="Masukkan password saat ini"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="newPassword" className="text-slate-300">Password Baru</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                            placeholder="Masukkan password baru"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-slate-300">Konfirmasi Password Baru</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                            placeholder="Konfirmasi password baru"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Two Factor Authentication */}
                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="text-white font-semibold mb-4">Autentikasi Dua Faktor</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-green-400" />
                            <div>
                              <p className="text-white font-medium">SMS Authentication</p>
                              <p className="text-slate-400 text-sm">Terima kode verifikasi via SMS</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className="text-white font-medium">Email Authentication</p>
                              <p className="text-slate-400 text-sm">Terima kode verifikasi via email</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-purple-400" />
                            <div>
                              <p className="text-white font-medium">Authenticator App</p>
                              <p className="text-slate-400 text-sm">Gunakan Google Authenticator atau similar</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    {/* Login Sessions */}
                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="text-white font-semibold mb-4">Sesi Login Aktif</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div>
                            <p className="text-white font-medium">Current Session</p>
                            <p className="text-slate-400 text-sm">Chrome on Windows • Jakarta, Indonesia</p>
                            <p className="text-slate-400 text-sm">Last active: Just now</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                          <div>
                            <p className="text-white font-medium">Mobile App</p>
                            <p className="text-slate-400 text-sm">iOS App • Jakarta, Indonesia</p>
                            <p className="text-slate-400 text-sm">Last active: 2 hours ago</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Preferensi Notifikasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-4">Metode Notifikasi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-slate-400 text-sm">Terima notifikasi via email</p>
                          </div>
                          <Switch 
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-slate-400 text-sm">Terima notifikasi push di browser</p>
                          </div>
                          <Switch 
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">SMS Notifications</p>
                            <p className="text-slate-400 text-sm">Terima notifikasi via SMS</p>
                          </div>
                          <Switch 
                            checked={notifications.sms}
                            onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="text-white font-semibold mb-4">Jenis Notifikasi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Trading Activities</p>
                            <p className="text-slate-400 text-sm">Order updates, payment received, etc.</p>
                          </div>
                          <Switch 
                            checked={notifications.trading}
                            onCheckedChange={(checked) => setNotifications({...notifications, trading: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Security Alerts</p>
                            <p className="text-slate-400 text-sm">Login attempts, password changes, etc.</p>
                          </div>
                          <Switch 
                            checked={notifications.security}
                            onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Marketing & Promotions</p>
                            <p className="text-slate-400 text-sm">New features, special offers, etc.</p>
                          </div>
                          <Switch 
                            checked={notifications.marketing}
                            onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Pengaturan Privasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-4">Visibilitas Profile</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Public Profile</p>
                            <p className="text-slate-400 text-sm">Profile Anda dapat dilihat oleh semua orang</p>
                          </div>
                          <Switch 
                            checked={privacy.profilePublic}
                            onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Show Earnings</p>
                            <p className="text-slate-400 text-sm">Tampilkan total earnings di profile public</p>
                          </div>
                          <Switch 
                            checked={privacy.showEarnings}
                            onCheckedChange={(checked) => setPrivacy({...privacy, showEarnings: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Show Order History</p>
                            <p className="text-slate-400 text-sm">Tampilkan riwayat order di profile public</p>
                          </div>
                          <Switch 
                            checked={privacy.showOrders}
                            onCheckedChange={(checked) => setPrivacy({...privacy, showOrders: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Allow Direct Messages</p>
                            <p className="text-slate-400 text-sm">User lain dapat mengirim pesan langsung</p>
                          </div>
                          <Switch 
                            checked={privacy.allowMessages}
                            onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-slate-700 pt-6">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                            <p className="text-slate-300 text-sm mb-4">
                              Tindakan di bawah ini tidak dapat dibatalkan. Harap berhati-hati.
                            </p>
                            <div className="space-y-3">
                              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                                Deactivate Account
                              </Button>
                              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
