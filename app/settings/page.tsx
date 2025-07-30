"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Globe,
  Plus,
  Edit,
  Trash2,
  Building2,
  Smartphone,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useSearchParams } from "next/navigation"

interface PaymentAccount {
  id: string
  type: "bank" | "ewallet"
  name: string
  accountName: string
  accountNumber: string
  logo: string
  isVerified: boolean
  isDefault: boolean
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams?.get("tab") || "profile"

  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([
    {
      id: "1",
      type: "bank",
      name: "BCA",
      accountName: "Rafly Rizky",
      accountNumber: "1234567890",
      logo: "🏦",
      isVerified: true,
      isDefault: true
    },
    {
      id: "2",
      type: "ewallet",
      name: "DANA",
      accountName: "0812-3456-7890",
      accountNumber: "0812-3456-7890",
      logo: "💳",
      isVerified: true,
      isDefault: false
    }
  ])

  const [showAddPayment, setShowAddPayment] = useState(false)
  const [newAccount, setNewAccount] = useState({
    type: "bank" as "bank" | "ewallet",
    name: "",
    accountName: "",
    accountNumber: ""
  })

  const bankOptions = [
    { value: "BCA", label: "BCA", logo: "🏦" },
    { value: "BRI", label: "BRI", logo: "🏛️" },
    { value: "BNI", label: "BNI", logo: "🏛️" },
    { value: "Mandiri", label: "Mandiri", logo: "🏦" },
    { value: "CIMB", label: "CIMB Niaga", logo: "🏛️" }
  ]

  const ewalletOptions = [
    { value: "DANA", label: "DANA", logo: "💳" },
    { value: "OVO", label: "OVO", logo: "💰" },
    { value: "GoPay", label: "GoPay", logo: "📱" },
    { value: "ShopeePay", label: "ShopeePay", logo: "🛒" }
  ]

  const addPaymentAccount = () => {
    if (!newAccount.name || !newAccount.accountName || !newAccount.accountNumber) return

    const selectedOption = newAccount.type === "bank" 
      ? bankOptions.find(b => b.value === newAccount.name)
      : ewalletOptions.find(e => e.value === newAccount.name)

    const account: PaymentAccount = {
      id: Date.now().toString(),
      type: newAccount.type,
      name: newAccount.name,
      accountName: newAccount.accountName,
      accountNumber: newAccount.accountNumber,
      logo: selectedOption?.logo || "💳",
      isVerified: false,
      isDefault: paymentAccounts.length === 0
    }

    setPaymentAccounts([...paymentAccounts, account])
    setNewAccount({ type: "bank", name: "", accountName: "", accountNumber: "" })
    setShowAddPayment(false)
  }

  const setDefaultAccount = (id: string) => {
    setPaymentAccounts(accounts =>
      accounts.map(account => ({
        ...account,
        isDefault: account.id === id
      }))
    )
  }

  const removeAccount = (id: string) => {
    setPaymentAccounts(accounts => accounts.filter(account => account.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Pengaturan
            </h1>
            <p className="text-slate-400">
              Kelola profil, pembayaran, dan preferensi akun Anda
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-blue-600">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Pembayaran</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              <Bell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600">
              <Palette className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Tampilan</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600">
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Privasi</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">MR</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Memet Toping</h3>
                    <p className="text-slate-400">@memet_toping</p>
                    <Badge className="bg-green-500/20 text-green-400 mt-2">Verified Creator</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Nama Lengkap</Label>
                    <Input 
                      defaultValue="Memet Toping"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input 
                      defaultValue="memet@example.com"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Username</Label>
                    <Input 
                      defaultValue="memet_toping"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">No. Telepon</Label>
                    <Input 
                      defaultValue="+62 812-3456-7890"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Akun Pembayaran</CardTitle>
                    <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Tambah Akun
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Tambah Akun Pembayaran</DialogTitle>
                          <DialogDescription className="text-slate-300">
                            Tambahkan akun bank atau e-wallet untuk menerima pembayaran
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Tipe Akun</Label>
                            <Select 
                              value={newAccount.type} 
                              onValueChange={(value: "bank" | "ewallet") => 
                                setNewAccount({...newAccount, type: value, name: ""})
                              }
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="bank">
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Bank
                                  </div>
                                </SelectItem>
                                <SelectItem value="ewallet">
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="w-4 h-4" />
                                    E-Wallet
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-white">
                              {newAccount.type === "bank" ? "Bank" : "E-Wallet"}
                            </Label>
                            <Select 
                              value={newAccount.name} 
                              onValueChange={(value) => setNewAccount({...newAccount, name: value})}
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder={`Pilih ${newAccount.type === "bank" ? "bank" : "e-wallet"}`} />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                {(newAccount.type === "bank" ? bankOptions : ewalletOptions).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                      <span>{option.logo}</span>
                                      {option.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-white">Nama Pemilik</Label>
                            <Input
                              placeholder="Nama sesuai rekening/akun"
                              value={newAccount.accountName}
                              onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                              className="bg-slate-700 border-slate-600 text-white"
                            />
                          </div>

                          <div>
                            <Label className="text-white">
                              {newAccount.type === "bank" ? "Nomor Rekening" : "Nomor HP/ID"}
                            </Label>
                            <Input
                              placeholder={newAccount.type === "bank" ? "1234567890" : "0812-3456-7890"}
                              value={newAccount.accountNumber}
                              onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                              className="bg-slate-700 border-slate-600 text-white"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAddPayment(false)}
                              className="flex-1 border-slate-600"
                            >
                              Batal
                            </Button>
                            <Button
                              onClick={addPaymentAccount}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              disabled={!newAccount.name || !newAccount.accountName || !newAccount.accountNumber}
                            >
                              Tambah Akun
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {paymentAccounts.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Belum ada akun pembayaran
                      </h3>
                      <p className="text-slate-400 mb-6">
                        Tambahkan akun bank atau e-wallet untuk menerima pembayaran
                      </p>
                      <Button onClick={() => setShowAddPayment(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Akun Pertama
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paymentAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl">{account.logo}</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-white">
                                    {account.name} - {account.accountName}
                                  </h4>
                                  {account.isDefault && (
                                    <Badge className="bg-blue-500/20 text-blue-400">
                                      Default
                                    </Badge>
                                  )}
                                  {account.isVerified ? (
                                    <Badge className="bg-green-500/20 text-green-400">
                                      <Check className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-yellow-500/20 text-yellow-400">
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                      Pending
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-slate-400 text-sm">
                                  •••• {account.accountNumber.slice(-4)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {!account.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDefaultAccount(account.id)}
                                  className="border-slate-600 text-slate-400 hover:bg-slate-700"
                                >
                                  Set Default
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-600 text-slate-400 hover:bg-slate-700"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeAccount(account.id)}
                                className="border-red-600 text-red-400 hover:bg-red-600/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Insights */}
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-3">💡 Tips Pembayaran</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>• Listings dengan DANA memiliki 15% lebih banyak penyelesaian</p>
                    <p>• Akun terverifikasi mendapat prioritas di search results</p>
                    <p>• Multiple payment options meningkatkan conversion rate hingga 23%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Keamanan Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Password Saat Ini</Label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Password Baru</Label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-400">Tambah lapisan keamanan ekstra</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Email Notifications</h4>
                      <p className="text-sm text-slate-400">Dapatkan notifikasi aktivitas mencurigakan</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Order Baru", desc: "Notifikasi saat ada yang beli aset Anda", defaultChecked: true },
                  { title: "Offer Diterima", desc: "Notifikasi saat offer Anda diterima", defaultChecked: true },
                  { title: "Price Alerts", desc: "Notifikasi perubahan harga aset favorit", defaultChecked: false },
                  { title: "Weekly Summary", desc: "Ringkasan aktivitas mingguan", defaultChecked: true },
                  { title: "Marketing Updates", desc: "Info promo dan fitur baru", defaultChecked: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Tampilan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Theme</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "dark", label: "Dark", active: true },
                      { value: "light", label: "Light", active: false },
                      { value: "auto", label: "Auto", active: false }
                    ].map((theme) => (
                      <div
                        key={theme.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          theme.active 
                            ? "border-blue-500 bg-blue-500/10" 
                            : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
                        }`}
                      >
                        <div className="font-medium text-white">{theme.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Language</Label>
                  <Select defaultValue="id">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Privasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Profile Visibility", desc: "Profil Anda dapat dilihat publik", defaultChecked: true },
                  { title: "Show Holdings", desc: "Tampilkan koleksi NFT di profil", defaultChecked: true },
                  { title: "Activity History", desc: "Riwayat transaksi dapat dilihat publik", defaultChecked: false },
                  { title: "Analytics Tracking", desc: "Izinkan pengumpulan data untuk insights", defaultChecked: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
