"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TokenPriceChartProps {
  data: number[]
  trend: "up" | "down"
  change: string
  size?: "sm" | "md" | "lg"
  showTrend?: boolean
  animated?: boolean
}

export default function TokenPriceChart({ 
  data, 
  trend, 
  change, 
  size = "md",
  showTrend = true,
  animated = false
}: TokenPriceChartProps) {
  const [animatedData, setAnimatedData] = useState(data)
  
  const dimensions = {
    sm: { width: 60, height: 24 },
    md: { width: 80, height: 32 },
    lg: { width: 120, height: 48 }
  }
  
  const { width, height } = dimensions[size]
  
  // Simulate real-time price updates
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setAnimatedData(prev => {
        const newData = [...prev]
        const lastPrice = newData[newData.length - 1]
        const variation = (Math.random() - 0.5) * (lastPrice * 0.02) // 2% max variation
        const newPrice = Math.max(0, lastPrice + variation)
        
        // Shift array and add new price
        newData.shift()
        newData.push(newPrice)
        
        return newData
      })
    }, 2000) // Update every 2 seconds
    
    return () => clearInterval(interval)
  }, [animated])
  
  const currentData = animated ? animatedData : data
  const max = Math.max(...currentData)
  const min = Math.min(...currentData)
  const range = max - min || 1
  
  // Generate SVG path
  const pathData = currentData.map((value, index) => {
    const x = (index / (currentData.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  // Generate area path for gradient fill
  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`
  
  const strokeColor = trend === "up" ? "#10B981" : "#EF4444"
  const fillColor = trend === "up" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <defs>
            <linearGradient id={`gradient-${trend}-${size}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={areaPath}
            fill={`url(#gradient-${trend}-${size})`}
            className={animated ? "transition-all duration-500" : ""}
          />
          
          {/* Price line */}
          <path
            d={pathData}
            stroke={strokeColor}
            strokeWidth={size === "sm" ? "1.5" : size === "md" ? "2" : "2.5"}
            fill="none"
            className={`drop-shadow-sm ${animated ? "transition-all duration-500" : ""}`}
          />
          
          {/* Current price dot */}
          {animated && (
            <circle
              cx={width}
              cy={height - ((currentData[currentData.length - 1] - min) / range) * height}
              r={size === "sm" ? "2" : size === "md" ? "3" : "4"}
              fill={strokeColor}
              className="animate-pulse"
            />
          )}
        </svg>
        
        {animated && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
      
      {showTrend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{change}</span>
        </div>
      )}
    </div>
  )
}

// Component untuk chart yang lebih besar dengan lebih banyak detail
export function DetailedTokenChart({ 
  data, 
  trend, 
  change, 
  volume, 
  high24h, 
  low24h 
}: {
  data: number[]
  trend: "up" | "down"
  change: string
  volume: string
  high24h: string
  low24h: string
}) {
  return (
    <div className="bg-[#1F2937] border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
            Price Chart (24h)
          </h3>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      
      <div className="mb-4">
        <TokenPriceChart 
          data={data} 
          trend={trend} 
          change={change} 
          size="lg" 
          showTrend={false}
          animated={true}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Volume 24h</p>
          <p className="text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{volume}</p>
        </div>
        <div>
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>High 24h</p>
          <p className="text-green-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{high24h}</p>
        </div>
        <div>
          <p className="text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>Low 24h</p>
          <p className="text-red-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{low24h}</p>
        </div>
      </div>
    </div>
  )
}
