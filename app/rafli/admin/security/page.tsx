"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield, AlertTriangle, Eye, Lock, Unlock, Ban, UserX,
  Activity, Wifi, Globe, Smartphone, MapPin, Clock,
  Flag, Search, Filter, RefreshCw, Download, Settings,
  Terminal, Bug, Database, Server, Network, Zap,
  CheckCircle, XCircle, AlertCircle, Info, HelpCircle,
  Users, DollarSign, TrendingUp, Target, Award,
  Mail, Phone, Key, Fingerprint, QrCode, Hash
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
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

// Security Event Types
interface SecurityEvent {
  id: string
  type: "login_attempt" | "transaction_fraud" | "account_takeover" | "data_breach" | "ddos_attack" | "suspicious_activity"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  userAgent: string
  ipAddress: string
  location: string
  description: string
  status: "active" | "investigating" | "resolved" | "false_positive"
  userId?: string
  username?: string
  affectedSystems: string[]
  mitigationSteps: string[]
}

interface ThreatIntelligence {
  id: string
  threatType: "malware" | "phishing" | "brute_force" | "bot_attack" | "social_engineering"
  severity: "low" | "medium" | "high" | "critical"
  firstSeen: string
  lastSeen: string
  occurences: number
  sourceCountries: string[]
  targetedAssets: string[]
  indicators: string[]
  mitigation: string
}

interface SecurityMetrics {
  totalThreats: number
  resolvedThreats: number
  activeIncidents: number
  falsePositives: number
  avgResponseTime: number
  securityScore: number
  threatTrend: "increasing" | "decreasing" | "stable"
  lastScan: string
}

// Sample Security Data
const securityMetrics: SecurityMetrics = {
  totalThreats: 1247,
  resolvedThreats: 1198,
  activeIncidents: 23,
  falsePositives: 26,
  avgResponseTime: 4.2,
  securityScore: 94.5,
  threatTrend: "decreasing",
  lastScan: "2 minutes ago"
}

const securityEvents: SecurityEvent[] = [
  {
    id: "event-001",
    type: "login_attempt",
    severity: "high",
    timestamp: "2024-01-20T10:15:00Z",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    ipAddress: "192.168.1.100",
    location: "Jakarta, Indonesia",
    description: "Multiple failed login attempts detected from suspicious IP",
    status: "investigating",
    userId: "user-001",
    username: "crypto_whale_88",
    affectedSystems: ["Authentication Service", "User Database"],
    mitigationSteps: ["IP temporarily blocked", "Account locked", "User notified"]
  },
  {
    id: "event-002",
    type: "transaction_fraud",
    severity: "critical",
    timestamp: "2024-01-20T09:30:00Z",
    userAgent: "curl/7.68.0",
    ipAddress: "203.0.113.5",
    location: "Unknown VPN",
    description: "Suspicious high-value transaction pattern detected",
    status: "active",
    userId: "user-456",
    username: "suspicious_trader",
    affectedSystems: ["Payment Gateway", "Transaction Engine", "Escrow Service"],
    mitigationSteps: ["Transaction held", "Manual review initiated", "User verification required"]
  },
  {
    id: "event-003",
    type: "ddos_attack",
    severity: "medium",
    timestamp: "2024-01-20T08:45:00Z",
    userAgent: "Various",
    ipAddress: "Multiple IPs",
    location: "Distributed",
    description: "Distributed denial of service attack on API endpoints",
    status: "resolved",
    affectedSystems: ["API Gateway", "Load Balancer", "CDN"],
    mitigationSteps: ["Rate limiting applied", "Malicious IPs blocked", "CDN filtering enabled"]
  }
]

const threatIntelligence: ThreatIntelligence[] = [
  {
    id: "threat-001",
    threatType: "brute_force",
    severity: "high",
    firstSeen: "2024-01-19T14:00:00Z",
    lastSeen: "2024-01-20T10:15:00Z",
    occurences: 156,
    sourceCountries: ["Russia", "China", "Brazil"],
    targetedAssets: ["Login Page", "API Endpoints"],
    indicators: ["192.168.1.100", "203.0.113.5", "198.51.100.42"],
    mitigation: "IP blocking and rate limiting implemented"
  },
  {
    id: "threat-002",
    threatType: "phishing",
    severity: "critical",
    firstSeen: "2024-01-18T09:30:00Z",
    lastSeen: "2024-01-20T08:20:00Z",
    occurences: 23,
    sourceCountries: ["Unknown", "Tor Network"],
    targetedAssets: ["User Emails", "Login Credentials"],
    indicators: ["fake-puyok-domain.com", "puyok-security-alert.info"],
    mitigation: "Domains reported and blocked, users warned"
  }
]

const systemHealth = [
  { system: "Authentication Service", status: "healthy", uptime: 99.9, lastCheck: "1 min ago" },
  { system: "Payment Gateway", status: "warning", uptime: 98.5, lastCheck: "2 min ago" },
  { system: "API Gateway", status: "healthy", uptime: 99.7, lastCheck: "30 sec ago" },
  { system: "Database Cluster", status: "healthy", uptime: 99.8, lastCheck: "1 min ago" },
  { system: "CDN Network", status: "healthy", uptime: 99.6, lastCheck: "45 sec ago" },
  { system: "Monitoring System", status: "healthy", uptime: 100.0, lastCheck: "15 sec ago" }
]

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400 bg-red-500/20"
      case "high": return "text-orange-400 bg-orange-500/20"
      case "medium": return "text-yellow-400 bg-yellow-500/20"
      case "low": return "text-blue-400 bg-blue-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "resolved": return "text-green-400 bg-green-500/20"
      case "warning":
      case "investigating": return "text-yellow-400 bg-yellow-500/20"
      case "active":
      case "critical": return "text-red-400 bg-red-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getThreatIcon = (type: string) => {
    switch (type) {
      case "login_attempt": return <Key className="w-4 h-4" />
      case "transaction_fraud": return <DollarSign className="w-4 h-4" />
      case "account_takeover": return <UserX className="w-4 h-4" />
      case "data_breach": return <Database className="w-4 h-4" />
      case "ddos_attack": return <Zap className="w-4 h-4" />
      case "suspicious_activity": return <Flag className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            Security Center
          </h1>
          <p className="text-slate-400">Advanced threat detection and security monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Mode
          </Button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Security Score</p>
                <p className="text-2xl font-bold text-white">{securityMetrics.securityScore}%</p>
                <p className="text-green-400 text-sm">Excellent</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Incidents</p>
                <p className="text-2xl font-bold text-white">{securityMetrics.activeIncidents}</p>
                <p className="text-yellow-400 text-sm">Under Investigation</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Threats Blocked</p>
                <p className="text-2xl font-bold text-white">{securityMetrics.resolvedThreats}</p>
                <p className="text-blue-400 text-sm">Last 30 days</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Ban className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-white">{securityMetrics.avgResponseTime}m</p>
                <p className="text-purple-400 text-sm">Average</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            <Activity className="w-4 h-4 mr-2" />
            Security Events
          </TabsTrigger>
          <TabsTrigger value="threats" className="data-[state=active]:bg-red-600">
            <Flag className="w-4 h-4 mr-2" />
            Threat Intelligence
          </TabsTrigger>
          <TabsTrigger value="systems" className="data-[state=active]:bg-green-600">
            <Server className="w-4 h-4 mr-2" />
            System Health
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-purple-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Security Events Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search security events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${getSeverityColor(event.severity)}`}>
                      {getThreatIcon(event.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white capitalize">{event.type.replace('_', ' ')}</h4>
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>📍 {event.location}</span>
                        <span>🌐 {event.ipAddress}</span>
                        <span>👤 {event.username || 'Unknown'}</span>
                        <span>⏰ {formatTimeAgo(event.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowEventModal(true)
                      }}
                      className="border-slate-600 text-slate-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {event.status === "active" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Investigate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threat Intelligence Tab */}
        <TabsContent value="threats" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-400" />
                Threat Intelligence Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {threatIntelligence.map((threat) => (
                <div key={threat.id} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white capitalize">{threat.threatType.replace('_', ' ')}</h4>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                    </div>
                    <span className="text-slate-400 text-sm">{threat.occurences} occurrences</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">First Seen:</p>
                      <p className="text-white">{formatTimeAgo(threat.firstSeen)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Last Seen:</p>
                      <p className="text-white">{formatTimeAgo(threat.lastSeen)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Source Countries:</p>
                      <p className="text-white">{threat.sourceCountries.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Targeted Assets:</p>
                      <p className="text-white">{threat.targetedAssets.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-slate-400 text-sm">Mitigation:</p>
                    <p className="text-green-400 text-sm">{threat.mitigation}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="systems" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-green-400" />
                System Health Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      system.status === "healthy" ? "bg-green-400" :
                      system.status === "warning" ? "bg-yellow-400" :
                      "bg-red-400"
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-white">{system.system}</h4>
                      <p className="text-slate-400 text-sm">Last check: {system.lastCheck}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{system.uptime}%</p>
                      <p className="text-slate-400 text-sm">Uptime</p>
                    </div>
                    <Badge className={getStatusColor(system.status)}>
                      {system.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { standard: "ISO 27001", status: "compliant", score: 98 },
                  { standard: "GDPR", status: "compliant", score: 95 },
                  { standard: "PCI DSS", status: "compliant", score: 92 },
                  { standard: "SOX", status: "review_needed", score: 87 }
                ].map((compliance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{compliance.standard}</h4>
                      <Badge className={compliance.status === "compliant" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {compliance.status === "compliant" ? "Compliant" : "Review Needed"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{compliance.score}%</p>
                      <Progress value={compliance.score} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  Security Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { cert: "SSL/TLS Certificate", expires: "2024-12-31", status: "valid" },
                  { cert: "Code Signing Certificate", expires: "2024-08-15", status: "valid" },
                  { cert: "Security Audit Report", expires: "2024-06-30", status: "expiring_soon" },
                  { cert: "Penetration Test Report", expires: "2024-04-15", status: "expiring_soon" }
                ].map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white text-sm">{cert.cert}</h4>
                      <p className="text-slate-400 text-xs">Expires: {cert.expires}</p>
                    </div>
                    <Badge className={cert.status === "valid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                      {cert.status === "valid" ? "Valid" : "Expiring Soon"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Event Detail Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getThreatIcon(selectedEvent.type)}
                  Security Event Details
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Event ID: {selectedEvent.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Type</p>
                    <p className="text-white capitalize">{selectedEvent.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Severity</p>
                    <Badge className={getSeverityColor(selectedEvent.severity)}>
                      {selectedEvent.severity}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Time</p>
                    <p className="text-white">{formatTimeAgo(selectedEvent.timestamp)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Description</p>
                  <p className="text-white">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">IP Address</p>
                    <p className="text-white font-mono">{selectedEvent.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white">{selectedEvent.location}</p>
                  </div>
                </div>

                {selectedEvent.affectedSystems.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Affected Systems</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.affectedSystems.map((system, index) => (
                        <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.mitigationSteps.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Mitigation Steps</p>
                    <ul className="space-y-1">
                      {selectedEvent.mitigationSteps.map((step, index) => (
                        <li key={index} className="text-green-400 text-sm flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
