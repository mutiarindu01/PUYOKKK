"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
    period?: string
  }
  icon: React.ComponentType<any>
  color: "blue" | "green" | "purple" | "yellow" | "red" | "orange"
  description?: string
  trend?: "up" | "down" | "stable"
  index?: number
}

interface ProgressStatProps {
  label: string
  current: number
  target: number
  unit?: string
  color?: "blue" | "green" | "purple" | "yellow" | "red"
}

interface MetricGridProps {
  metrics: {
    label: string
    value: string | number
    change?: number
    status: "good" | "warning" | "danger"
  }[]
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    gradient: "from-blue-500 to-blue-600"
  },
  green: {
    bg: "bg-green-500/20", 
    text: "text-green-400",
    gradient: "from-green-500 to-green-600"
  },
  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-400", 
    gradient: "from-purple-500 to-purple-600"
  },
  yellow: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    gradient: "from-yellow-500 to-yellow-600"
  },
  red: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    gradient: "from-red-500 to-red-600"
  },
  orange: {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    gradient: "from-orange-500 to-orange-600"
  }
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  description, 
  trend,
  index = 0 
}: StatCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`
      return val.toLocaleString()
    }
    return val
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden border-slate-700/50 bg-slate-900/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClasses[color].bg} shadow-lg`}>
              <Icon className={`w-6 h-6 ${colorClasses[color].text}`} />
            </div>
            
            {change && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                change.type === "increase" ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {change.type === "increase" ? 
                  <ArrowUp className="w-3 h-3" /> : 
                  <ArrowDown className="w-3 h-3" />
                }
                {Math.abs(change.value)}%
              </div>
            )}
            
            {trend && !change && (
              <div className="flex items-center">
                {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                {trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                {trend === "stable" && <div className="w-4 h-0.5 bg-blue-400 rounded" />}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white mb-2">{formatValue(value)}</p>
            {description && (
              <p className="text-slate-500 text-xs">{description}</p>
            )}
            {change?.period && (
              <p className="text-slate-500 text-xs">vs {change.period}</p>
            )}
          </div>
          
          <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${colorClasses[color].gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ProgressStat({ 
  label, 
  current, 
  target, 
  unit = "", 
  color = "blue" 
}: ProgressStatProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const isOverTarget = current > target

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className={`text-sm font-medium ${
          isOverTarget ? 'text-yellow-400' : percentage > 80 ? 'text-green-400' : 'text-white'
        }`}>
          {current.toLocaleString()}{unit} / {target.toLocaleString()}{unit}
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-2"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0{unit}</span>
          <span className={percentage > 90 ? 'text-yellow-400' : ''}>
            {percentage.toFixed(1)}%
          </span>
          <span>{target.toLocaleString()}{unit}</span>
        </div>
      </div>
    </div>
  )
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center p-4 bg-slate-800/30 rounded-lg">
          <div className={`text-lg font-bold ${
            metric.status === "good" ? 'text-green-400' :
            metric.status === "warning" ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {metric.value}
          </div>
          <div className="text-slate-400 text-sm">{metric.label}</div>
          {metric.change !== undefined && (
            <div className={`text-xs flex items-center justify-center gap-1 mt-1 ${
              metric.change > 0 ? 'text-green-400' : metric.change < 0 ? 'text-red-400' : 'text-slate-400'
            }`}>
              {metric.change > 0 && <ArrowUp className="w-3 h-3" />}
              {metric.change < 0 && <ArrowDown className="w-3 h-3" />}
              {Math.abs(metric.change)}%
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function QuickStat({ 
  label, 
  value, 
  icon: Icon, 
  color = "blue" 
}: {
  label: string
  value: string | number
  icon: React.ComponentType<any>
  color?: "blue" | "green" | "purple" | "yellow" | "red" | "orange"
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
      <div className={`p-2 rounded-lg ${colorClasses[color].bg}`}>
        <Icon className={`w-4 h-4 ${colorClasses[color].text}`} />
      </div>
      <div>
        <div className="text-white font-medium">{value}</div>
        <div className="text-slate-400 text-sm">{label}</div>
      </div>
    </div>
  )
}

export function StatusIndicator({ 
  status, 
  label 
}: { 
  status: "online" | "offline" | "warning" | "maintenance"
  label: string 
}) {
  const statusConfig = {
    online: { color: "bg-green-400", text: "text-green-400", label: "Online" },
    offline: { color: "bg-red-400", text: "text-red-400", label: "Offline" },
    warning: { color: "bg-yellow-400", text: "text-yellow-400", label: "Warning" },
    maintenance: { color: "bg-blue-400", text: "text-blue-400", label: "Maintenance" }
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-slate-300 text-sm">{label}</span>
      <Badge className={`${config.text} bg-transparent border-current text-xs`}>
        {config.label}
      </Badge>
    </div>
  )
}
