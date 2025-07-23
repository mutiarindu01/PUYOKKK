"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  User, 
  Search, 
  Filter, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Calendar,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Award,
  AlertTriangle,
  UserPlus,
  UserCheck,
  UserX
} from "lucide-react"

interface UserData {
  id: string
  username: string
  email: string
  fullName: string
  avatar: string
  status: "active" | "suspended" | "pending"
  verificationStatus: "verified" | "unverified" | "pending"
  joinDate: string
  lastActive: string
  totalSpent: number
  totalEarned: number
  transactionCount: number
  reputationScore: number
  accountType: "buyer" | "seller" | "both"
  phone?: string
  location?: string
  kycDocuments: {
    idCard: boolean
    selfie: boolean
    addressProof: boolean
  }
}

const userData: UserData[] = [
  {
    id: "user001",
    username: "crypto_king_88",
    email: "cryptoking@email.com",
    fullName: "Ahmad Crypto King",
    avatar: "/placeholder.svg",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2024-01-15",
    lastActive: "2 menit lalu",
    totalSpent: 125000000,
    totalEarned: 89000000,
    transactionCount: 45,
    reputationScore: 4.8,
    accountType: "both",
    phone: "+62812-3456-7890",
    location: "Jakarta, Indonesia",
    kycDocuments: {
      idCard: true,
      selfie: true,
      addressProof: true
    }
  },
  {
    id: "user002",
    username: "nft_collector",
    email: "collector@email.com",
    fullName: "Budi NFT Collector",
    avatar: "/placeholder.svg",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2024-02-03",
    lastActive: "1 jam lalu",
    totalSpent: 67500000,
    totalEarned: 12000000,
    transactionCount: 23,
    reputationScore: 4.5,
    accountType: "buyer",
    phone: "+62813-9876-5432",
    location: "Bandung, Indonesia",
    kycDocuments: {
      idCard: true,
      selfie: true,
      addressProof: false
    }
  },
  {
    id: "user003",
    username: "digital_artist",
    email: "artist@email.com",
    fullName: "Sari Digital Artist",
    avatar: "/placeholder.svg",
    status: "suspended",
    verificationStatus: "pending",
    joinDate: "2023-12-28",
    lastActive: "3 hari lalu",
    totalSpent: 15000000,
    totalEarned: 156000000,
    transactionCount: 78,
    reputationScore: 3.2,
    accountType: "seller",
    phone: "+62814-5555-1234",
    location: "Surabaya, Indonesia",
    kycDocuments: {
      idCard: true,
      selfie: false,
      addressProof: false
    }
  },
  {
    id: "user004",
    username: "new_trader_99",
    email: "newtrader@email.com",
    fullName: "Indra New Trader",
    avatar: "/placeholder.svg",
    status: "pending",
    verificationStatus: "unverified",
    joinDate: "2024-07-14",
    lastActive: "30 menit lalu",
    totalSpent: 0,
    totalEarned: 0,
    transactionCount: 0,
    reputationScore: 0,
    accountType: "buyer",
    phone: "+62815-7777-8888",
    location: "Yogyakarta, Indonesia",
    kycDocuments: {
      idCard: false,
      selfie: false,
      addressProof: false
    }
  }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(userData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesVerification = verificationFilter === "all" || user.verificationStatus === verificationFilter
    
    return matchesSearch && matchesStatus && matchesVerification
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500">✅ Aktif</Badge>
      case "suspended":
        return <Badge className="bg-red-500/20 text-red-500">🚫 Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500">⏳ Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-blue-500/20 text-blue-500"><ShieldCheck className="w-3 h-3 mr-1" />Terverifikasi</Badge>
      case "unverified":
        return <Badge className="bg-gray-500/20 text-gray-500"><Shield className="w-3 h-3 mr-1" />Belum Verifikasi</Badge>
      case "pending":
        return <Badge className="bg-orange-500/20 text-orange-500"><ShieldAlert className="w-3 h-3 mr-1" />Menunggu Verifikasi</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAccountTypeBadge = (type: string) => {
    switch (type) {
      case "buyer":
        return <Badge className="bg-purple-500/20 text-purple-500">🛒 Buyer</Badge>
      case "seller":
        return <Badge className="bg-green-500/20 text-green-500">💰 Seller</Badge>
      case "both":
        return <Badge className="bg-blue-500/20 text-blue-500">🔄 Buyer & Seller</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        switch (action) {
          case "activate":
            return { ...user, status: "active" }
          case "suspend":
            return { ...user, status: "suspended" }
          case "verify":
            return { ...user, verificationStatus: "verified" }
          case "unverify":
            return { ...user, verificationStatus: "unverified" }
          default:
            return user
        }
      }
      return user
    }))
  }

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    suspended: users.filter(u => u.status === "suspended").length,
    pending: users.filter(u => u.status === "pending").length,
    verified: users.filter(u => u.verificationStatus === "verified").length,
    newToday: users.filter(u => u.joinDate === "2024-07-15").length
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          👥 User Management
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Kelola pengguna, verifikasi, dan monitoring aktivitas platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.total}</p>
            <p className="text-xs text-blue-100">Total Users</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <UserCheck className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.active}</p>
            <p className="text-xs text-green-100">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4 text-center">
            <UserX className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.suspended}</p>
            <p className="text-xs text-red-100">Suspended</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4 text-center">
            <UserPlus className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.pending}</p>
            <p className="text-xs text-yellow-100">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <ShieldCheck className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.verified}</p>
            <p className="text-xs text-purple-100">Verified</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userStats.newToday}</p>
            <p className="text-xs text-orange-100">New Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white dark:bg-slate-800 shadow-lg border-0 mb-8">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">🔍 Filter & Pencarian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari username, email, atau nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Verifikasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Verifikasi</SelectItem>
                <SelectItem value="verified">Terverifikasi</SelectItem>
                <SelectItem value="unverified">Belum Verifikasi</SelectItem>
                <SelectItem value="pending">Menunggu Verifikasi</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              {filteredUsers.length} dari {users.length} pengguna
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {user.username}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {user.fullName}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {getVerificationBadge(user.verificationStatus)}
                {getAccountTypeBadge(user.accountType)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-300">Total Spent</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(user.totalSpent)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-300">Total Earned</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(user.totalEarned)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-300">Transactions</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user.transactionCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-300">Reputation</p>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {user.reputationScore}/5.0
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                <p>Bergabung: {new Date(user.joinDate).toLocaleDateString('id-ID')}</p>
                <p>Terakhir aktif: {user.lastActive}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Detail
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Detail Pengguna: {selectedUser?.username}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {selectedUser && (
                    <Tabs defaultValue="profile" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">👤 Profil</TabsTrigger>
                        <TabsTrigger value="transactions">💳 Transaksi</TabsTrigger>
                        <TabsTrigger value="verification">🔐 Verifikasi</TabsTrigger>
                      </TabsList>

                      <TabsContent value="profile" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Informasi Pribadi</CardTitle>
                          </CardHeader>
                          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={selectedUser.avatar} />
                                  <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-bold">{selectedUser.fullName}</h3>
                                  <p className="text-slate-600">@{selectedUser.username}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-slate-500" />
                                  <span>{selectedUser.email}</span>
                                </div>
                                {selectedUser.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-500" />
                                    <span>{selectedUser.phone}</span>
                                  </div>
                                )}
                                {selectedUser.location && (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-500" />
                                    <span>{selectedUser.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-slate-600">Status Akun</p>
                                {getStatusBadge(selectedUser.status)}
                              </div>
                              <div>
                                <p className="text-sm text-slate-600">Status Verifikasi</p>
                                {getVerificationBadge(selectedUser.verificationStatus)}
                              </div>
                              <div>
                                <p className="text-sm text-slate-600">Tipe Akun</p>
                                {getAccountTypeBadge(selectedUser.accountType)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="transactions" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-6 text-center">
                              <DollarSign className="w-8 h-8 mx-auto text-green-500 mb-2" />
                              <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(selectedUser.totalEarned)}
                              </p>
                              <p className="text-sm text-slate-600">Total Penghasilan</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6 text-center">
                              <CreditCard className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                              <p className="text-2xl font-bold text-blue-600">
                                {formatCurrency(selectedUser.totalSpent)}
                              </p>
                              <p className="text-sm text-slate-600">Total Pengeluaran</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6 text-center">
                              <ShoppingCart className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                              <p className="text-2xl font-bold text-purple-600">
                                {selectedUser.transactionCount}
                              </p>
                              <p className="text-sm text-slate-600">Total Transaksi</p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="verification" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Status Dokumen KYC</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className={`p-4 rounded-lg border ${
                                selectedUser.kycDocuments.idCard 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-red-50 border-red-200"
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {selectedUser.kycDocuments.idCard ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                  )}
                                  <span className="font-medium">KTP/ID Card</span>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {selectedUser.kycDocuments.idCard ? "Terupload" : "Belum upload"}
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg border ${
                                selectedUser.kycDocuments.selfie 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-red-50 border-red-200"
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {selectedUser.kycDocuments.selfie ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                  )}
                                  <span className="font-medium">Foto Selfie</span>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {selectedUser.kycDocuments.selfie ? "Terupload" : "Belum upload"}
                                </p>
                              </div>
                              <div className={`p-4 rounded-lg border ${
                                selectedUser.kycDocuments.addressProof 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-red-50 border-red-200"
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {selectedUser.kycDocuments.addressProof ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                  )}
                                  <span className="font-medium">Bukti Alamat</span>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {selectedUser.kycDocuments.addressProof ? "Terupload" : "Belum upload"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => handleUserAction(selectedUser.id, "activate")}
                          disabled={selectedUser.status === "active"}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aktifkan
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleUserAction(selectedUser.id, "suspend")}
                          disabled={selectedUser.status === "suspended"}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend
                        </Button>
                        <Button
                          onClick={() => handleUserAction(selectedUser.id, "verify")}
                          disabled={selectedUser.verificationStatus === "verified"}
                        >
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Verifikasi
                        </Button>
                      </div>
                    </Tabs>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
