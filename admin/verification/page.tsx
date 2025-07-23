"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Clock } from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

interface VerificationRequest {
  id: string
  type: "payment" | "asset" | "user"
  status: "pending" | "approved" | "rejected"
  submittedBy: {
    id: string
    username: string
    avatar: string
  }
  submissionDate: string
  details: {
    paymentId?: string
    amount?: string
    method?: string
    proofImage?: string
    assetId?: string
    assetName?: string
    userId?: string
    documentType?: string
    documentImage?: string
  }
}

const dummyRequests: VerificationRequest[] = [
  {
    id: "req001",
    type: "payment",
    status: "pending",
    submittedBy: { id: "user123", username: "buyer_crypto", avatar: "/placeholder.svg?height=40&width=40" },
    submissionDate: "2024-07-15 10:00 AM",
    details: {
      paymentId: "PAY12345",
      amount: "Rp 15.000.000",
      method: "DANA",
      proofImage: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    id: "req002",
    type: "asset",
    status: "pending",
    submittedBy: { id: "user124", username: "nft_artist", avatar: "/placeholder.svg?height=40&width=40" },
    submissionDate: "2024-07-14 03:30 PM",
    details: {
      assetId: "NFT9876",
      assetName: "Digital Dreamscape",
      proofImage: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    id: "req003",
    type: "user",
    status: "pending",
    submittedBy: { id: "user125", username: "new_trader", avatar: "/placeholder.svg?height=40&width=40" },
    submissionDate: "2024-07-13 11:45 AM",
    details: {
      userId: "user125",
      documentType: "KTP",
      documentImage: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    id: "req004",
    type: "payment",
    status: "approved",
    submittedBy: { id: "user126", username: "happy_buyer", avatar: "/placeholder.svg?height=40&width=40" },
    submissionDate: "2024-07-12 09:15 AM",
    details: {
      paymentId: "PAY67890",
      amount: "Rp 5.000.000",
      method: "GoPay",
      proofImage: "/placeholder.svg?height=400&width=600",
    },
  },
]

export default function AdminVerificationPage() {
  const [requests, setRequests] = useState(dummyRequests)
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
    toast({
      title: "Request Approved",
      description: `Verification request ${id} has been approved.`,
    })
    setSelectedRequest(null)
  }

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Failed",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
    toast({
      title: "Request Rejected",
      description: `Verification request ${id} has been rejected. Reason: ${rejectionReason}`,
    })
    setSelectedRequest(null)
    setRejectionReason("")
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getBadgeColorClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "approved":
        return "bg-green-500/20 text-green-500"
      case "rejected":
        return "bg-red-500/20 text-red-500"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Verification Requests</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {requests.map((request) => (
          <Card key={request.id} className="bg-card border border-border p-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
              <CardTitle className="text-xl font-semibold">
                {request.type === "payment"
                  ? "Payment Verification"
                  : request.type === "asset"
                    ? "Asset Verification"
                    : "User Verification"}
              </CardTitle>
              <Badge className={getBadgeColorClass(request.status)}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={request.submittedBy.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">Submitted by: {request.submittedBy.username}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>{request.submissionDate}</span>
              </div>

              <Separator className="my-4" />

              {request.type === "payment" && (
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">Amount:</span> {request.details.amount}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Method:</span> {request.details.method}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Payment ID:</span> {request.details.paymentId}
                  </p>
                </div>
              )}
              {request.type === "asset" && (
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">Asset Name:</span> {request.details.assetName}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Asset ID:</span> {request.details.assetId}
                  </p>
                </div>
              )}
              {request.type === "user" && (
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">User ID:</span> {request.details.userId}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Document Type:</span> {request.details.documentType}
                  </p>
                </div>
              )}

              <Dialog
                open={selectedRequest?.id === request.id}
                onOpenChange={(open) => {
                  if (!open) {
                    setSelectedRequest(null)
                    setRejectionReason("")
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setSelectedRequest(request)}
                    disabled={request.status !== "pending"}
                  >
                    View Details & Act
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Verification Request Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedRequest?.submittedBy.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedRequest?.submittedBy.username}</p>
                        <p className="text-sm text-muted-foreground">Submitted on: {selectedRequest?.submissionDate}</p>
                      </div>
                    </div>

                    <Separator />

                    {selectedRequest?.type === "payment" && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Payment Details</h3>
                        <p>
                          <span className="font-medium">Amount:</span> {selectedRequest.details.amount}
                        </p>
                        <p>
                          <span className="font-medium">Method:</span> {selectedRequest.details.method}
                        </p>
                        <p>
                          <span className="font-medium">Payment ID:</span> {selectedRequest.details.paymentId}
                        </p>
                        {selectedRequest.details.proofImage && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Proof of Payment:</h4>
                            <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden">
                              <Image
                                src={selectedRequest.details.proofImage || "/placeholder.svg"}
                                alt="Payment Proof"
                                layout="fill"
                                objectFit="contain"
                                className="object-center"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedRequest?.type === "asset" && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Asset Details</h3>
                        <p>
                          <span className="font-medium">Asset Name:</span> {selectedRequest.details.assetName}
                        </p>
                        <p>
                          <span className="font-medium">Asset ID:</span> {selectedRequest.details.assetId}
                        </p>
                        {selectedRequest.details.proofImage && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Asset Proof:</h4>
                            <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden">
                              <Image
                                src={selectedRequest.details.proofImage || "/placeholder.svg"}
                                alt="Asset Proof"
                                layout="fill"
                                objectFit="contain"
                                className="object-center"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedRequest?.type === "user" && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">User Verification Details</h3>
                        <p>
                          <span className="font-medium">User ID:</span> {selectedRequest.details.userId}
                        </p>
                        <p>
                          <span className="font-medium">Document Type:</span> {selectedRequest.details.documentType}
                        </p>
                        {selectedRequest.details.documentImage && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Document Image:</h4>
                            <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden">
                              <Image
                                src={selectedRequest.details.documentImage || "/placeholder.svg"}
                                alt="Document Image"
                                layout="fill"
                                objectFit="contain"
                                className="object-center"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedRequest?.status === "pending" && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="rejection-reason">Rejection Reason (Optional)</Label>
                        <Textarea
                          id="rejection-reason"
                          placeholder="Enter reason for rejection..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    {selectedRequest?.status === "pending" && (
                      <>
                        <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => handleReject(selectedRequest.id)}>
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(selectedRequest.id)}>Approve</Button>
                      </>
                    )}
                    {selectedRequest?.status !== "pending" && (
                      <Button onClick={() => setSelectedRequest(null)}>Close</Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
