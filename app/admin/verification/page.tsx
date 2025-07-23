"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye,
  ArrowLeft,
  Copy,
  DollarSign,
  CreditCard,
  MessageSquare,
  Calendar,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

interface OrderVerification {
  id: string
  orderId: string
  status: "pending" | "approved" | "rejected"
  priority: "low" | "medium" | "high" | "urgent"
  submittedBy: {
    id: string
    username: string
    avatar: string
    email: string
    joinDate: string
  }
  submissionDate: string
  orderDetails: {
    assetName: string
    assetId: string
    baseAmount: number
    uniqueAmount: number
    uniqueCode: number
    paymentMethod: string
    expectedMessage: string
    deadline: string
  }
  submittedProof: {
    amount: number
    message: string
    timestamp: string
    proofImage: string
    senderName: string
    receiverName: string
  }
}

const verificationRequests: OrderVerification[] = [
  {
    id: "ver001",
    orderId: "ORD-789456",
    status: "pending",
    priority: "urgent",
    submittedBy: {
      id: "user123",
      username: "crypto_king_88",
      avatar: "/placeholder.svg",
      email: "cryptoking@email.com",
      joinDate: "15 Jan 2024"
    },
    submissionDate: "2024-07-15 10:45 AM",
    orderDetails: {
      assetName: "Legendary Dragon Sword NFT",
      assetId: "NFT-DRG-001",
      baseAmount: 15000000,
      uniqueAmount: 15000327,
      uniqueCode: 327,
      paymentMethod: "DANA",
      expectedMessage: "PUYOK-ORD789456-CRYPTOKING88",
      deadline: "2024-07-15 11:45 AM"
    },
    submittedProof: {
      amount: 15000327,
      message: "PUYOK-ORD789456-CRYPTOKING88",
      timestamp: "2024-07-15 10:43 AM",
      proofImage: "/placeholder.svg",
      senderName: "Ahmad Crypto King",
      receiverName: "PUYOK Marketplace"
    }
  },
  {
    id: "ver002",
    orderId: "ORD-789457",
    status: "pending",
    priority: "high",
    submittedBy: {
      id: "user124",
      username: "nft_collector",
      avatar: "/placeholder.svg",
      email: "collector@email.com",
      joinDate: "03 Feb 2024"
    },
    submissionDate: "2024-07-15 09:32 AM",
    orderDetails: {
      assetName: "Mystic Crystal Token",
      assetId: "TKN-CRY-002",
      baseAmount: 8750000,
      uniqueAmount: 8750142,
      uniqueCode: 142,
      paymentMethod: "GoPay",
      expectedMessage: "PUYOK-ORD789457-NFTCOLLECTOR",
      deadline: "2024-07-15 10:32 AM"
    },
    submittedProof: {
      amount: 8750142,
      message: "PUYOK-ORD789457-NFTCOLLECTOR",
      timestamp: "2024-07-15 09:30 AM",
      proofImage: "/placeholder.svg",
      senderName: "Budi Collector",
      receiverName: "PUYOK Marketplace"
    }
  },
  {
    id: "ver003",
    orderId: "ORD-789458",
    status: "pending", 
    priority: "medium",
    submittedBy: {
      id: "user125",
      username: "digital_artist",
      avatar: "/placeholder.svg",
      email: "artist@email.com",
      joinDate: "28 Dec 2023"
    },
    submissionDate: "2024-07-15 08:15 AM",
    orderDetails: {
      assetName: "Cyberpunk City Collection",
      assetId: "NFT-CYB-003",
      baseAmount: 25000000,
      uniqueAmount: 25000891,
      uniqueCode: 891,
      paymentMethod: "OVO",
      expectedMessage: "PUYOK-ORD789458-DIGITALARTIST",
      deadline: "2024-07-15 09:15 AM"
    },
    submittedProof: {
      amount: 25000892, // Incorrect amount
      message: "PUYOK-ORD789458-DIGITALARTIST",
      timestamp: "2024-07-15 08:13 AM",
      proofImage: "/placeholder.svg",
      senderName: "Sari Digital Artist",
      receiverName: "PUYOK Marketplace"
    }
  }
]

export default function AdminOrderVerificationPage() {
  const [requests, setRequests] = useState(verificationRequests)
  const [selectedRequest, setSelectedRequest] = useState<OrderVerification | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
    toast({
      title: "✅ Order Disetujui",
      description: `Order ${selectedRequest?.orderId} telah disetujui dan aset akan dirilis.`,
    })
    setSelectedRequest(null)
  }

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "❌ Penolakan Gagal",
        description: "Mohon berikan alasan penolakan.",
        variant: "destructive",
      })
      return
    }
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
    toast({
      title: "❌ Order Ditolak",
      description: `Order ${selectedRequest?.orderId} ditolak. Alasan: ${rejectionReason}`,
      variant: "destructive",
    })
    setSelectedRequest(null)
    setRejectionReason("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "📋 Disalin",
      description: "Teks berhasil disalin ke clipboard",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500/20 text-red-500 animate-pulse">🚨 Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-500/20 text-orange-500">🔥 High</Badge>
      case "medium":
        return <Badge className="bg-blue-500/20 text-blue-500">⚡ Medium</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500">➖ Low</Badge>
    }
  }

  const validateProof = (request: OrderVerification) => {
    const isAmountCorrect = request.submittedProof.amount === request.orderDetails.uniqueAmount
    const isMessageCorrect = request.submittedProof.message === request.orderDetails.expectedMessage
    return { isAmountCorrect, isMessageCorrect }
  }

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            ✅ Verifikasi Order
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Panel verifikasi pembayaran dengan sistem perbandingan dua kolom untuk akurasi maksimal
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending</p>
                  <p className="text-3xl font-bold">{requests.filter(r => r.status === "pending").length}</p>
                </div>
                <Clock className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Urgent</p>
                  <p className="text-3xl font-bold">{requests.filter(r => r.priority === "urgent").length}</p>
                </div>
                <AlertTriangle className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved</p>
                  <p className="text-3xl font-bold">{requests.filter(r => r.status === "approved").length}</p>
                </div>
                <CheckCircle className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate-500 to-slate-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-100">Total</p>
                  <p className="text-3xl font-bold">{requests.length}</p>
                </div>
                <FileText className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.filter(req => req.status === "pending").map((request) => {
            const validation = validateProof(request)
            const isValid = validation.isAmountCorrect && validation.isMessageCorrect
            
            return (
              <Card key={request.id} className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                      {request.orderId}
                    </CardTitle>
                    {getPriorityBadge(request.priority)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={request.submittedBy.avatar} />
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {request.submittedBy.username}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Asset:</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{request.orderDetails.assetName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Nominal Unik:</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(request.orderDetails.uniqueAmount)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isValid ? (
                      <Badge className="bg-green-500/20 text-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-500">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Invalid
                      </Badge>
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {request.submissionDate}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review Detail
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Verification Modal */}
        <Dialog open={selectedRequest !== null} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                🔍 Detail Verifikasi Order: {selectedRequest?.orderId}
              </DialogTitle>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6">
                {/* User Info */}
                <Card className="bg-slate-50 dark:bg-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={selectedRequest.submittedBy.avatar} />
                        <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {selectedRequest.submittedBy.username}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">{selectedRequest.submittedBy.email}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            Bergabung: {selectedRequest.submittedBy.joinDate}
                          </Badge>
                          {getPriorityBadge(selectedRequest.priority)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Submitted</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {selectedRequest.submissionDate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Two Column Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Expected Details (Left Column) */}
                  <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                      <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        📋 Detail Order (Yang Diharapkan)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">Asset Name</Label>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {selectedRequest.orderDetails.assetName}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          ID: {selectedRequest.orderDetails.assetId}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-900 dark:text-green-100">Nominal Dasar</span>
                          </div>
                          <span className="font-bold text-green-900 dark:text-green-100">
                            {formatCurrency(selectedRequest.orderDetails.baseAmount)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-900 dark:text-blue-100">Nominal Unik</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-900 dark:text-blue-100">
                              {formatCurrency(selectedRequest.orderDetails.uniqueAmount)}
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                              Kode: +{selectedRequest.orderDetails.uniqueCode}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-900 dark:text-purple-100">Metode Pembayaran</span>
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-600">
                            {selectedRequest.orderDetails.paymentMethod}
                          </Badge>
                        </div>

                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-5 h-5 text-yellow-600" />
                            <span className="font-medium text-yellow-900 dark:text-yellow-100">Berita Transfer</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(selectedRequest.orderDetails.expectedMessage)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="font-mono text-sm bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded border">
                            {selectedRequest.orderDetails.expectedMessage}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submitted Proof (Right Column) */}
                  <Card className="border-2 border-orange-200 dark:border-orange-800">
                    <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
                      <CardTitle className="text-orange-900 dark:text-orange-100 flex items-center gap-2">
                        📸 Bukti dari Pembeli
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nama Pengirim</Label>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {selectedRequest.submittedProof.senderName}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Ke: {selectedRequest.submittedProof.receiverName}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className={`flex items-center justify-between p-3 rounded-lg ${
                          selectedRequest.submittedProof.amount === selectedRequest.orderDetails.uniqueAmount
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "bg-red-50 dark:bg-red-900/20"
                        }`}>
                          <div className="flex items-center gap-2">
                            <DollarSign className={`w-5 h-5 ${
                              selectedRequest.submittedProof.amount === selectedRequest.orderDetails.uniqueAmount
                                ? "text-green-600"
                                : "text-red-600"
                            }`} />
                            <span className={`font-medium ${
                              selectedRequest.submittedProof.amount === selectedRequest.orderDetails.uniqueAmount
                                ? "text-green-900 dark:text-green-100"
                                : "text-red-900 dark:text-red-100"
                            }`}>
                              Nominal Dikirim
                            </span>
                            {selectedRequest.submittedProof.amount === selectedRequest.orderDetails.uniqueAmount ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <span className={`font-bold ${
                            selectedRequest.submittedProof.amount === selectedRequest.orderDetails.uniqueAmount
                              ? "text-green-900 dark:text-green-100"
                              : "text-red-900 dark:text-red-100"
                          }`}>
                            {formatCurrency(selectedRequest.submittedProof.amount)}
                          </span>
                        </div>

                        <div className={`p-3 rounded-lg ${
                          selectedRequest.submittedProof.message === selectedRequest.orderDetails.expectedMessage
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "bg-red-50 dark:bg-red-900/20"
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className={`w-5 h-5 ${
                              selectedRequest.submittedProof.message === selectedRequest.orderDetails.expectedMessage
                                ? "text-green-600"
                                : "text-red-600"
                            }`} />
                            <span className={`font-medium ${
                              selectedRequest.submittedProof.message === selectedRequest.orderDetails.expectedMessage
                                ? "text-green-900 dark:text-green-100"
                                : "text-red-900 dark:text-red-100"
                            }`}>
                              Berita Transfer
                            </span>
                            {selectedRequest.submittedProof.message === selectedRequest.orderDetails.expectedMessage ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <p className={`font-mono text-sm p-2 rounded border ${
                            selectedRequest.submittedProof.message === selectedRequest.orderDetails.expectedMessage
                              ? "bg-green-100 dark:bg-green-900/40"
                              : "bg-red-100 dark:bg-red-900/40"
                          }`}>
                            {selectedRequest.submittedProof.message}
                          </p>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-slate-600" />
                            <span className="font-medium text-slate-900 dark:text-slate-100">Waktu Transfer</span>
                          </div>
                          <p className="text-slate-900 dark:text-slate-100">
                            {selectedRequest.submittedProof.timestamp}
                          </p>
                        </div>
                      </div>

                      {/* Proof Image */}
                      <div className="mt-4">
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          Bukti Pembayaran
                        </Label>
                        <div className="mt-2 relative w-full h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border">
                          <Image
                            src={selectedRequest.submittedProof.proofImage}
                            alt="Bukti Pembayaran"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Validation Summary */}
                <Card className="border-2 border-slate-200 dark:border-slate-600">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎯 Ringkasan Validasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${
                        validateProof(selectedRequest).isAmountCorrect
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {validateProof(selectedRequest).isAmountCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className="font-semibold">Validasi Nominal</span>
                        </div>
                        <p className={`text-sm ${
                          validateProof(selectedRequest).isAmountCorrect
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}>
                          {validateProof(selectedRequest).isAmountCorrect
                            ? "✅ Nominal yang dikirim sesuai dengan nominal unik"
                            : "❌ Nominal yang dikirim tidak sesuai"
                          }
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${
                        validateProof(selectedRequest).isMessageCorrect
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {validateProof(selectedRequest).isMessageCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                          <span className="font-semibold">Validasi Berita Transfer</span>
                        </div>
                        <p className={`text-sm ${
                          validateProof(selectedRequest).isMessageCorrect
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}>
                          {validateProof(selectedRequest).isMessageCorrect
                            ? "✅ Berita transfer sesuai format yang diharapkan"
                            : "❌ Berita transfer tidak sesuai format"
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rejection Reason */}
                {!validateProof(selectedRequest).isAmountCorrect || !validateProof(selectedRequest).isMessageCorrect ? (
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <CardHeader>
                      <CardTitle className="text-yellow-900 dark:text-yellow-100">
                        💬 Alasan Penolakan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Jelaskan alasan penolakan untuk pembeli..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="bg-white dark:bg-slate-800"
                      />
                    </CardContent>
                  </Card>
                ) : null}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedRequest(null)}
                  >
                    Batal
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleReject(selectedRequest.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    ❌ Tolak Pembayaran
                  </Button>
                  <Button 
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!validateProof(selectedRequest).isAmountCorrect || !validateProof(selectedRequest).isMessageCorrect}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    ✅ Setujui & Lepaskan Aset
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
