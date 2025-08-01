"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Server, Database, Cpu, HardDrive, Network, Wifi,
  Activity, Zap, Globe, Monitor, AlertTriangle, CheckCircle,
  Clock, TrendingUp, TrendingDown, RefreshCw, Settings,
  Terminal, Eye, Download, Upload, BarChart3, LineChart,
  Gauge, Target, Shield, Lock, Unlock, Bug, Wrench,
  Layers, Hash, QrCode, Link, Share2, Copy, Save
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// System Monitoring Types
interface SystemMetric {
  id: string
  name: string
  category: "server" | "database" | "network" | "storage" | "application"
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  threshold: {
    warning: number
    critical: number
  }
  trend: "up" | "down" | "stable"
  lastUpdated: string
  description: string
}

interface ServiceStatus {
  id: string
  name: string
  type: "api" | "database" | "cache" | "queue" | "cdn" | "monitoring"
  status: "online" | "degraded" | "offline" | "maintenance"
  uptime: number
  responseTime: number
  lastCheck: string
  endpoints: {
    url: string
    status: "healthy" | "error"
    responseTime: number
  }[]
  dependencies: string[]
}

interface PerformanceLog {
  id: string
  timestamp: string
  type: "info" | "warning" | "error" | "critical"
  service: string
  message: string
  details?: any
  resolved: boolean
}

// Sample Data
const systemMetrics: SystemMetric[] = [
  {
    id: "cpu-usage",
    name: "CPU Usage",
    category: "server",
    value: 35.2,
    unit: "%",
    status: "healthy",
    threshold: { warning: 70, critical: 90 },
    trend: "stable",
    lastUpdated: "1 min ago",
    description: "Average CPU utilization across all cores"
  },
  {
    id: "memory-usage",
    name: "Memory Usage", 
    category: "server",
    value: 68.5,
    unit: "%",
    status: "warning",
    threshold: { warning: 70, critical: 85 },
    trend: "up",
    lastUpdated: "1 min ago",
    description: "RAM utilization percentage"
  },
  {
    id: "disk-usage",
    name: "Disk Usage",
    category: "storage",
    value: 45.8,
    unit: "%",
    status: "healthy",
    threshold: { warning: 80, critical: 95 },
    trend: "stable",
    lastUpdated: "2 min ago",
    description: "Primary storage utilization"
  },
  {
    id: "network-throughput",
    name: "Network I/O",
    category: "network",
    value: 1247.5,
    unit: "MB/s",
    status: "healthy",
    threshold: { warning: 8000, critical: 9500 },
    trend: "up",
    lastUpdated: "30 sec ago",
    description: "Combined inbound/outbound traffic"
  },
  {
    id: "db-connections",
    name: "DB Connections",
    category: "database",
    value: 156,
    unit: "connections",
    status: "healthy",
    threshold: { warning: 800, critical: 950 },
    trend: "stable",
    lastUpdated: "1 min ago",
    description: "Active database connections"
  },
  {
    id: "api-response-time",
    name: "API Response Time",
    category: "application",
    value: 125,
    unit: "ms",
    status: "healthy",
    threshold: { warning: 500, critical: 1000 },
    trend: "down",
    lastUpdated: "15 sec ago",
    description: "Average API endpoint response time"
  }
]

const serviceStatuses: ServiceStatus[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    type: "api",
    status: "online",
    uptime: 99.97,
    responseTime: 125,
    lastCheck: "30 sec ago",
    endpoints: [
      { url: "/api/v1/health", status: "healthy", responseTime: 45 },
      { url: "/api/v1/auth", status: "healthy", responseTime: 89 },
      { url: "/api/v1/marketplace", status: "healthy", responseTime: 156 }
    ],
    dependencies: ["database-primary", "redis-cache"]
  },
  {
    id: "database-primary",
    name: "Primary Database",
    type: "database",
    status: "online",
    uptime: 99.99,
    responseTime: 12,
    lastCheck: "1 min ago",
    endpoints: [
      { url: "postgres://primary:5432", status: "healthy", responseTime: 12 }
    ],
    dependencies: []
  },
  {
    id: "redis-cache",
    name: "Redis Cache",
    type: "cache",
    status: "online",
    uptime: 99.95,
    responseTime: 8,
    lastCheck: "45 sec ago",
    endpoints: [
      { url: "redis://cache:6379", status: "healthy", responseTime: 8 }
    ],
    dependencies: []
  },
  {
    id: "payment-service",
    name: "Payment Gateway",
    type: "api",
    status: "degraded",
    uptime: 99.2,
    responseTime: 456,
    lastCheck: "2 min ago",
    endpoints: [
      { url: "/payments/health", status: "error", responseTime: 456 },
      { url: "/payments/webhook", status: "healthy", responseTime: 234 }
    ],
    dependencies: ["database-primary"]
  },
  {
    id: "cdn-service",
    name: "CDN Network",
    type: "cdn",
    status: "online",
    uptime: 99.8,
    responseTime: 67,
    lastCheck: "20 sec ago",
    endpoints: [
      { url: "https://cdn.puyok.com/health", status: "healthy", responseTime: 67 }
    ],
    dependencies: []
  }
]

const performanceLogs: PerformanceLog[] = [
  {
    id: "log-001",
    timestamp: "2024-01-20T10:30:00Z",
    type: "warning",
    service: "Payment Gateway",
    message: "High response time detected",
    details: { responseTime: 456, threshold: 200 },
    resolved: false
  },
  {
    id: "log-002",
    timestamp: "2024-01-20T10:25:00Z",
    type: "info",
    service: "API Gateway",
    message: "Health check passed",
    resolved: true
  },
  {
    id: "log-003",
    timestamp: "2024-01-20T10:20:00Z",
    type: "error",
    service: "Redis Cache",
    message: "Connection timeout",
    details: { timeout: 5000, retries: 3 },
    resolved: true
  },
  {
    id: "log-004",
    timestamp: "2024-01-20T10:15:00Z",
    type: "critical",
    service: "Database Primary",
    message: "High connection count",
    details: { connections: 892, limit: 1000 },
    resolved: true
  }
]

export default function SystemMonitoring() {
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshInterval, setRefreshInterval] = useState("30s")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // Auto refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const intervals = {
      "10s": 10000,
      "30s": 30000,
      "1m": 60000,
      "5m": 300000
    }

    const interval = setInterval(() => {
      setLastRefresh(new Date())
    }, intervals[refreshInterval as keyof typeof intervals] || 30000)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online": return "text-green-400 bg-green-500/20"
      case "warning":
      case "degraded": return "text-yellow-400 bg-yellow-500/20"
      case "critical":
      case "error":
      case "offline": return "text-red-400 bg-red-500/20"
      case "maintenance": return "text-blue-400 bg-blue-500/20"
      default: return "text-slate-400 bg-slate-500/20"
    }
  }

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "server": return <Server className="w-4 h-4" />
      case "database": return <Database className="w-4 h-4" />
      case "network": return <Network className="w-4 h-4" />
      case "storage": return <HardDrive className="w-4 h-4" />
      case "application": return <Monitor className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "api": return <Globe className="w-4 h-4" />
      case "database": return <Database className="w-4 h-4" />
      case "cache": return <Zap className="w-4 h-4" />
      case "queue": return <Layers className="w-4 h-4" />
      case "cdn": return <Wifi className="w-4 h-4" />
      case "monitoring": return <Eye className="w-4 h-4" />
      default: return <Server className="w-4 h-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3 text-red-400" />
      case "down": return <TrendingDown className="w-3 h-3 text-green-400" />
      case "stable": return <Activity className="w-3 h-3 text-blue-400" />
      default: return null
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    return `${hours}h ago`
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">System Health Monitor</h1>
          <p className="text-slate-400">Real-time infrastructure monitoring and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Auto-refresh:</span>
            <Select value={refreshInterval} onValueChange={setRefreshInterval}>
              <SelectTrigger className="w-20 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">10s</SelectItem>
                <SelectItem value="30s">30s</SelectItem>
                <SelectItem value="1m">1m</SelectItem>
                <SelectItem value="5m">5m</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLastRefresh(new Date())}
            className="border-slate-600 text-slate-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric) => (
          <Card key={metric.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                    {getMetricIcon(metric.category)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{metric.name}</h3>
                    <p className="text-xs text-slate-400">{metric.description}</p>
                  </div>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {metric.value.toLocaleString()}{metric.unit}
                  </span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Warning: {metric.threshold.warning}{metric.unit}</span>
                    <span className="text-slate-400">Critical: {metric.threshold.critical}{metric.unit}</span>
                  </div>
                  <Progress 
                    value={(metric.value / metric.threshold.critical) * 100} 
                    className="h-2"
                  />
                </div>
                
                <p className="text-xs text-slate-500">Last updated: {metric.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Monitoring Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            <Gauge className="w-4 h-4 mr-2" />
            Service Status
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-green-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-purple-600">
            <Terminal className="w-4 h-4 mr-2" />
            System Logs
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="data-[state=active]:bg-orange-600">
            <Server className="w-4 h-4 mr-2" />
            Infrastructure
          </TabsTrigger>
        </TabsList>

        {/* Service Status Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Service Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceStatuses.map((service) => (
                <div key={service.id} className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                        {getServiceIcon(service.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{service.name}</h4>
                        <p className="text-sm text-slate-400 capitalize">{service.type} service</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                      <span className="text-sm text-slate-400">{service.lastCheck}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Uptime</p>
                      <p className="text-white font-medium">{service.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Response Time</p>
                      <p className="text-white font-medium">{service.responseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Endpoints</p>
                      <div className="flex gap-1 mt-1">
                        {service.endpoints.map((endpoint, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              endpoint.status === "healthy" ? "bg-green-400" : "bg-red-400"
                            }`}
                            title={`${endpoint.url}: ${endpoint.responseTime}ms`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {service.dependencies.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <p className="text-xs text-slate-400 mb-2">Dependencies:</p>
                      <div className="flex gap-2">
                        {service.dependencies.map((dep, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-green-400" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400">Performance Chart</p>
                    <p className="text-slate-500 text-sm">Real-time metrics visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  SLA Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metric: "API Availability", target: 99.9, current: 99.97, status: "meeting" },
                  { metric: "Response Time", target: 200, current: 125, status: "meeting" },
                  { metric: "Error Rate", target: 0.1, current: 0.05, status: "meeting" },
                  { metric: "Throughput", target: 1000, current: 1247, status: "exceeding" }
                ].map((sla, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{sla.metric}</p>
                      <p className="text-slate-400 text-sm">Target: {sla.target}{sla.metric.includes('Rate') ? '%' : sla.metric.includes('Time') ? 'ms' : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{sla.current}{sla.metric.includes('Rate') ? '%' : sla.metric.includes('Time') ? 'ms' : ''}</p>
                      <Badge className={sla.status === "meeting" || sla.status === "exceeding" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {sla.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                System Event Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {performanceLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      log.type === "critical" ? "bg-red-400" :
                      log.type === "error" ? "bg-orange-400" :
                      log.type === "warning" ? "bg-yellow-400" :
                      "bg-blue-400"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-xs ${
                          log.type === "critical" ? "bg-red-500/20 text-red-400" :
                          log.type === "error" ? "bg-orange-500/20 text-orange-400" :
                          log.type === "warning" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {log.type}
                        </Badge>
                        <span className="text-white font-medium">{log.service}</span>
                        {log.resolved && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm">{log.message}</p>
                      {log.details && (
                        <p className="text-slate-500 text-xs mt-1 font-mono">
                          {JSON.stringify(log.details)}
                        </p>
                      )}
                      <p className="text-slate-500 text-xs mt-1">{formatTimeAgo(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Infrastructure Tab */}
        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-orange-400" />
                  Server Cluster
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Web Server 01", status: "online", load: 35 },
                  { name: "Web Server 02", status: "online", load: 42 },
                  { name: "Web Server 03", status: "maintenance", load: 0 },
                  { name: "API Server 01", status: "online", load: 28 }
                ].map((server, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        server.status === "online" ? "bg-green-400" :
                        server.status === "maintenance" ? "bg-blue-400" :
                        "bg-red-400"
                      }`}></div>
                      <span className="text-white text-sm">{server.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{server.load}%</span>
                      <div className="w-16 h-1 bg-slate-600 rounded">
                        <div 
                          className="h-1 bg-blue-400 rounded" 
                          style={{ width: `${server.load}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-400" />
                  Database Cluster
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Primary DB", status: "online", connections: 156 },
                  { name: "Replica DB 1", status: "online", connections: 89 },
                  { name: "Replica DB 2", status: "online", connections: 67 },
                  { name: "Analytics DB", status: "online", connections: 34 }
                ].map((db, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-white text-sm">{db.name}</span>
                    </div>
                    <span className="text-slate-400 text-xs">{db.connections} conn</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-400" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Load Balancer", status: "online", traffic: "1.2 GB/s" },
                  { name: "CDN Primary", status: "online", traffic: "850 MB/s" },
                  { name: "CDN Secondary", status: "online", traffic: "620 MB/s" },
                  { name: "VPN Gateway", status: "online", traffic: "45 MB/s" }
                ].map((network, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-white text-sm">{network.name}</span>
                    </div>
                    <span className="text-slate-400 text-xs">{network.traffic}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
