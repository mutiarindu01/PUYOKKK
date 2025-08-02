"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Eye,
  CheckCircle,
  X,
  AlertTriangle,
  Clock,
  FileText,
  TrendingUp,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Filter,
  Search,
  Star,
  Zap,
  Shield,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface VerificationRecord {
  id: string
  orderId: string
  status: 'verified' | 'rejected' | 'manual_review' | 'pending'
  confidenceScore: number
  imageUrl: string
  processedBy: string
  processingTimeMs: number
  createdAt: string
  verificationResult: {
    isValid: boolean
    confidence: number
    details: any
    errors: string[]
    warnings: string[]
    overallScore: number
  }
}

// Mock data for demonstration
const mockVerifications: VerificationRecord[] = [
  {
    id: "1",
    orderId: "ORDER-001",
    status: "verified",
    confidenceScore: 0.95,
    imageUrl: "/api/placeholder/400/300",
    processedBy: "ai_system",
    processingTimeMs: 2500,
    createdAt: "2024-01-15T10:30:00Z",
    verificationResult: {
      isValid: true,
      confidence: 0.95,
      details: {},
      errors: [],
      warnings: [],
      overallScore: 0.95
    }
  },
  {
    id: "2", 
    orderId: "ORDER-002",
    status: "rejected",
    confidenceScore: 0.45,
    imageUrl: "/api/placeholder/400/300",
    processedBy: "ai_system",
    processingTimeMs: 1800,
    createdAt: "2024-01-15T09:15:00Z",
    verificationResult: {
      isValid: false,
      confidence: 0.45,
      details: {},
      errors: ["Nominal tidak sesuai", "Kode referensi tidak ditemukan"],
      warnings: ["Kualitas gambar rendah"],
      overallScore: 0.45
    }
  },
  {
    id: "3",
    orderId: "ORDER-003", 
    status: "manual_review",
    confidenceScore: 0.65,
    imageUrl: "/api/placeholder/400/300",
    processedBy: "ai_system",
    processingTimeMs: 3200,
    createdAt: "2024-01-15T08:45:00Z",
    verificationResult: {
      isValid: false,
      confidence: 0.65,
      details: {},
      errors: [],
      warnings: ["Memerlukan review manual"],
      overallScore: 0.65
    }
  }
]

export default function AIVerificationDashboard() {
  const [verifications, setVerifications] = useState<VerificationRecord[]>(mockVerifications)
  const [filteredVerifications, setFilteredVerifications] = useState<VerificationRecord[]>(mockVerifications)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVerification, setSelectedVerification] = useState<VerificationRecord | null>(null)
  const [showImageDialog, setShowImageDialog] = useState(false)

  // AI Statistics
  const aiStats = {
    totalProcessed: 1247,
    accuracyRate: 94.2,
    avgProcessingTime: 2.3,
    manualReviewRate: 8.5,
    todayProcessed: 89,
    pendingReview: 12
  }

  useEffect(() => {
    let filtered = verifications

    if (statusFilter !== "all") {
      filtered = filtered.filter(v => v.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredVerifications(filtered)
  }, [statusFilter, searchTerm, verifications])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'rejected':
        return <X className="w-4 h-4 text-red-400" />
      case 'manual_review':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/20 text-green-400'
      case 'rejected':
        return 'bg-red-500/20 text-red-400'
      case 'manual_review':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'pending':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleManualReview = (verificationId: string, decision: 'approved' | 'rejected', notes: string) => {
    setVerifications(prev => prev.map(v => {
      if (v.id === verificationId) {
        return {
          ...v,
          status: decision === 'approved' ? 'verified' : 'rejected'
        }
      }
      return v
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                AI Verification Center
              </h1>
              <p className="text-slate-400 mt-2">
                Monitor dan kelola sistem verifikasi otomatis dengan AI canggih
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-600">
                <Settings className="w-4 h-4 mr-2" />
                Settings AI
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Diproses</p>
                  <p className="text-2xl font-bold text-white">{aiStats.totalProcessed.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Akurasi AI</p>
                  <p className="text-2xl font-bold text-green-400">{aiStats.accuracyRate}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg Processing</p>
                  <p className="text-2xl font-bold text-purple-400">{aiStats.avgProcessingTime}s</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Manual Review</p>
                  <p className="text-2xl font-bold text-yellow-400">{aiStats.manualReviewRate}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Hari Ini</p>
                  <p className="text-2xl font-bold text-blue-400">{aiStats.todayProcessed}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending Review</p>
                  <p className="text-2xl font-bold text-orange-400">{aiStats.pendingReview}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="verifications" className="data-[state=active]:bg-purple-600">
              Verifikasi Terbaru
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              Analytics AI
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-purple-600">
              Training Data
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              AI Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verifications">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Riwayat Verifikasi AI</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-48 bg-slate-700 border-slate-600"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="manual_review">Manual Review</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="border-slate-600">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVerifications.map((verification) => (
                    <motion.div
                      key={verification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-600 rounded-lg overflow-hidden cursor-pointer"
                               onClick={() => {
                                 setSelectedVerification(verification)
                                 setShowImageDialog(true)
                               }}>
                            <img 
                              src={verification.imageUrl} 
                              alt="Bukti transfer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{verification.orderId}</span>
                              <Badge className={getStatusColor(verification.status)}>
                                {getStatusIcon(verification.status)}
                                <span className="ml-1 capitalize">{verification.status.replace('_', ' ')}</span>
                              </Badge>
                            </div>
                            <div className="text-slate-400 text-sm mt-1">
                              Processed in {verification.processingTimeMs}ms • {new Date(verification.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-yellow-400 font-mono">
                                {(verification.confidenceScore * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="text-slate-400 text-sm">Confidence</div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedVerification(verification)}
                              className="border-slate-600"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Detail
                            </Button>
                            
                            {verification.status === 'manual_review' && (
                              <ManualReviewDialog 
                                verification={verification}
                                onReview={handleManualReview}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Show errors/warnings */}
                      {(verification.verificationResult.errors.length > 0 || verification.verificationResult.warnings.length > 0) && (
                        <div className="mt-3 pt-3 border-t border-slate-600">
                          {verification.verificationResult.errors.length > 0 && (
                            <div className="flex items-start gap-2 text-red-400 text-sm">
                              <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{verification.verificationResult.errors.join(', ')}</span>
                            </div>
                          )}
                          {verification.verificationResult.warnings.length > 0 && (
                            <div className="flex items-start gap-2 text-yellow-400 text-sm mt-1">
                              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{verification.verificationResult.warnings.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Akurasi AI Per Hari</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    Chart akurasi AI akan ditampilkan di sini
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Waktu Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    Chart waktu processing akan ditampilkan di sini
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Training Data Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Training Data Manager</h3>
                  <p className="text-slate-400 mb-6">
                    Upload dan kelola data training untuk meningkatkan akurasi AI
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Training Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white font-medium block mb-2">
                    Minimum Confidence Threshold
                  </label>
                  <div className="flex items-center gap-4">
                    <Progress value={75} className="flex-1" />
                    <span className="text-white font-mono">75%</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    Verifikasi dengan confidence di bawah threshold akan masuk manual review
                  </p>
                </div>
                
                <div>
                  <label className="text-white font-medium block mb-2">
                    Auto-approval Threshold
                  </label>
                  <div className="flex items-center gap-4">
                    <Progress value={90} className="flex-1" />
                    <span className="text-white font-mono">90%</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    Verifikasi dengan confidence di atas threshold akan otomatis disetujui
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Bukti Transfer - {selectedVerification?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedVerification && (
            <div className="space-y-4">
              <img 
                src={selectedVerification.imageUrl}
                alt="Bukti transfer"
                className="w-full rounded-lg"
              />
              <div className="text-slate-400 text-sm">
                Confidence: {(selectedVerification.confidenceScore * 100).toFixed(1)}% • 
                Processed: {selectedVerification.processingTimeMs}ms
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Manual Review Dialog Component
function ManualReviewDialog({ 
  verification, 
  onReview 
}: { 
  verification: VerificationRecord
  onReview: (id: string, decision: 'approved' | 'rejected', notes: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [decision, setDecision] = useState<'approved' | 'rejected'>('approved')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    onReview(verification.id, decision, notes)
    setIsOpen(false)
    setNotes('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
          <FileText className="w-4 h-4 mr-2" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Manual Review - {verification.orderId}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Review hasil verifikasi AI dan berikan keputusan manual
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-white font-medium block mb-2">Keputusan</label>
            <Select value={decision} onValueChange={(value: 'approved' | 'rejected') => setDecision(value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approve</SelectItem>
                <SelectItem value="rejected">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-white font-medium block mb-2">Catatan</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan review..."
              className="bg-slate-700 border-slate-600"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Submit Review
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-slate-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
