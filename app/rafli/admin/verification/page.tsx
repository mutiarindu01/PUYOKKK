"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield, Eye, CheckCircle, XCircle, Flag, AlertTriangle,
  Clock, Search, Filter, MoreHorizontal, Image, FileText,
  User, MessageSquare, Star, Heart, Download, Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContentItem {
  id: string
  type: "nft" | "collection" | "user_profile" | "chat_message" | "comment"
  title: string
  creator: string
  creatorAvatar?: string
  reportCount: number
  status: "pending" | "approved" | "rejected" | "flagged"
  reportReasons: string[]
  submittedDate: string
  reviewedBy?: string
  thumbnailUrl?: string
  description?: string
  content?: string
  priority: "low" | "medium" | "high" | "urgent"
  category?: string
  views?: number
  likes?: number
}

const contentItems: ContentItem[] = [
  {
    id: "content-001",
    type: "nft",
    title: "Suspicious NFT Collection - Stolen Artwork",
    creator: "fake_artist_123",
    creatorAvatar: "",
    reportCount: 8,
    status: "pending",
    reportReasons: ["copyright_violation", "fake_artwork", "misleading_description"],
    submittedDate: "2024-01-20T09:00:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200",
    description: "NFT appears to use copyrighted artwork without permission",
    priority: "high",
    category: "Digital Art",
    views: 1234,
    likes: 45
  },
  {
    id: "content-002",
    type: "user_profile",
    title: "Inappropriate Profile Content",
    creator: "bad_user_456",
    reportCount: 3,
    status: "flagged",
    reportReasons: ["inappropriate_content", "spam"],
    submittedDate: "2024-01-19T15:30:00Z",
    reviewedBy: "mod-001",
    description: "Profile contains inappropriate content and spam links",
    priority: "medium"
  },
  {
    id: "content-003",
    type: "collection",
    title: "Fake Brand Collection",
    creator: "brand_faker",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64",
    reportCount: 12,
    status: "pending",
    reportReasons: ["trademark_violation", "fraud", "impersonation"],
    submittedDate: "2024-01-20T11:15:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200",
    description: "Collection falsely claims to be official brand merchandise",
    priority: "urgent",
    category: "Collectibles",
    views: 5678,
    likes: 123
  },
  {
    id: "content-004",
    type: "chat_message",
    title: "Harassment in Chat",
    creator: "toxic_user_789",
    reportCount: 5,
    status: "pending",
    reportReasons: ["harassment", "hate_speech"],
    submittedDate: "2024-01-20T08:30:00Z",
    content: "Multiple reports of harassment and hate speech in chat messages",
    priority: "high"
  },
  {
    id: "content-005",
    type: "nft",
    title: "Legitimate Art Piece",
    creator: "verified_artist",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64",
    reportCount: 1,
    status: "approved",
    reportReasons: ["false_report"],
    submittedDate: "2024-01-19T14:20:00Z",
    reviewedBy: "mod-002",
    thumbnailUrl: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=200",
    description: "High-quality original artwork, false report dismissed",
    priority: "low",
    category: "Digital Art",
    views: 2341,
    likes: 189
  }
]

export default function ContentModerationPage() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [showContentModal, setShowContentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("pending")

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-400 bg-green-500/20"
      case "pending": return "text-yellow-400 bg-yellow-500/20"
      case "rejected": return "text-red-400 bg-red-500/20"
      case "flagged": return "text-orange-400 bg-orange-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-400 bg-red-500/20"
      case "high": return "text-orange-400 bg-orange-500/20"
      case "medium": return "text-yellow-400 bg-yellow-500/20"
      case "low": return "text-blue-400 bg-blue-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "nft": return <Image className="w-4 h-4" />
      case "collection": return <FileText className="w-4 h-4" />
      case "user_profile": return <User className="w-4 h-4" />
      case "chat_message": return <MessageSquare className="w-4 h-4" />
      case "comment": return <MessageSquare className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const filteredContent = contentItems.filter(item => {
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.creator.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (statusFilter !== "all" && item.status !== statusFilter) return false
    if (typeFilter !== "all" && item.type !== typeFilter) return false
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false
    return true
  })

  const handleAction = (id: string, action: "approve" | "reject" | "flag") => {
    // In a real app, this would make an API call
    console.log(`${action} content ${id}`)
  }

  const pendingItems = filteredContent.filter(item => item.status === "pending")
  const reviewedItems = filteredContent.filter(item => ["approved", "rejected", "flagged"].includes(item.status))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            Content Moderation
          </h1>
          <p className="text-slate-400">Review and moderate user-generated content</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-white">{pendingItems.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Approved Today</p>
                <p className="text-2xl font-bold text-white">
                  {contentItems.filter(i => i.status === "approved").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Rejected Today</p>
                <p className="text-2xl font-bold text-white">
                  {contentItems.filter(i => i.status === "rejected").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-white">
                  {contentItems.filter(i => ["high", "urgent"].includes(i.priority)).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search content by title or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nft">NFTs</SelectItem>
                <SelectItem value="collection">Collections</SelectItem>
                <SelectItem value="user_profile">User Profiles</SelectItem>
                <SelectItem value="chat_message">Chat Messages</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-600">
            <Clock className="w-4 h-4 mr-2" />
            Pending ({pendingItems.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="data-[state=active]:bg-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Reviewed ({reviewedItems.length})
          </TabsTrigger>
          <TabsTrigger value="urgent" className="data-[state=active]:bg-red-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Urgent ({contentItems.filter(i => i.priority === "urgent").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Pending Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {item.thumbnailUrl ? (
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <Badge className={`${
                          item.type === "nft" ? "bg-purple-500/20 text-purple-400" :
                          item.type === "collection" ? "bg-blue-500/20 text-blue-400" :
                          item.type === "user_profile" ? "bg-green-500/20 text-green-400" :
                          "bg-slate-500/20 text-slate-400"
                        }`}>
                          {item.type}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">by {item.creator}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>{item.reportCount} reports</span>
                        <span>{formatTimeAgo(item.submittedDate)}</span>
                        {item.views && <span>{item.views} views</span>}
                        {item.likes && <span>{item.likes} likes</span>}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {item.reportReasons.slice(0, 3).map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {reason.replace('_', ' ')}
                          </Badge>
                        ))}
                        {item.reportReasons.length > 3 && (
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            +{item.reportReasons.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedContent(item)
                        setShowContentModal(true)
                      }}
                      className="border-slate-600 text-slate-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAction(item.id, "approve")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      onClick={() => handleAction(item.id, "reject")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recently Reviewed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    {item.thumbnailUrl ? (
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">by {item.creator}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>Reviewed by {item.reviewedBy || 'System'}</span>
                        <span>{formatTimeAgo(item.submittedDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedContent(item)
                      setShowContentModal(true)
                    }}
                    className="border-slate-600 text-slate-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Urgent Review Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentItems.filter(item => item.priority === "urgent").map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    {item.thumbnailUrl && (
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <Badge className="bg-red-500/20 text-red-400">URGENT</Badge>
                      </div>
                      <p className="text-slate-400 text-sm">by {item.creator}</p>
                      <p className="text-red-400 text-sm">{item.reportCount} reports - Immediate action required</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleAction(item.id, "reject")}
                    >
                      Immediate Action
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Content Detail Modal */}
      <Dialog open={showContentModal} onOpenChange={setShowContentModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getTypeIcon(selectedContent.type)}
                  Content Review - {selectedContent.title}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Detailed content information and moderation actions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Content Preview */}
                {selectedContent.thumbnailUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={selectedContent.thumbnailUrl} 
                      alt={selectedContent.title}
                      className="max-w-md rounded-lg"
                    />
                  </div>
                )}

                {/* Content Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400">Title</Label>
                    <p className="text-white">{selectedContent.title}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">Creator</Label>
                    <p className="text-white">{selectedContent.creator}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">Type</Label>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {selectedContent.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-400">Priority</Label>
                    <Badge className={getPriorityColor(selectedContent.priority)}>
                      {selectedContent.priority}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-400">Reports</Label>
                    <p className="text-white">{selectedContent.reportCount}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400">Status</Label>
                    <Badge className={getStatusColor(selectedContent.status)}>
                      {selectedContent.status}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                {selectedContent.description && (
                  <div>
                    <Label className="text-slate-400">Description</Label>
                    <p className="text-white mt-1">{selectedContent.description}</p>
                  </div>
                )}

                {/* Report Reasons */}
                <div>
                  <Label className="text-slate-400">Report Reasons</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedContent.reportReasons.map((reason, index) => (
                      <Badge key={index} variant="outline" className="border-red-500/30 text-red-400">
                        {reason.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleAction(selectedContent.id, "approve")
                      setShowContentModal(false)
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Content
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-yellow-600 text-yellow-400"
                    onClick={() => {
                      handleAction(selectedContent.id, "flag")
                      setShowContentModal(false)
                    }}
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Flag for Review
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400"
                    onClick={() => {
                      handleAction(selectedContent.id, "reject")
                      setShowContentModal(false)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Content
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
