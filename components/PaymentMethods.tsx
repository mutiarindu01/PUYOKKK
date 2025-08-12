"use client"

import { Badge } from "@/components/ui/badge"

interface PaymentMethodsProps {
  methods: string[]
  size?: "sm" | "md" | "lg"
  showLabels?: boolean
}

const paymentMethodsConfig = {
  dana: {
    icon: "💳",
    color: "bg-blue-600 text-white",
    label: "DANA"
  },
  gopay: {
    icon: "🟢", 
    color: "bg-green-600 text-white",
    label: "GoPay"
  },
  ovo: {
    icon: "🟣",
    color: "bg-purple-600 text-white", 
    label: "OVO"
  },
  bank: {
    icon: "🏦",
    color: "bg-gray-600 text-white",
    label: "Bank Transfer"
  },
  shopeepay: {
    icon: "🧡",
    color: "bg-orange-600 text-white",
    label: "ShopeePay"
  }
}

export default function PaymentMethods({ 
  methods, 
  size = "md", 
  showLabels = false 
}: PaymentMethodsProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5", 
    lg: "text-base px-4 py-2"
  }

  if (methods.length === 0) {
    return (
      <Badge variant="outline" className="text-gray-400 border-gray-600">
        Belum ada metode
      </Badge>
    )
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {methods.slice(0, 3).map((method) => {
        const config = paymentMethodsConfig[method as keyof typeof paymentMethodsConfig]
        if (!config) return null
        
        return (
          <Badge
            key={method}
            className={`${config.color} ${sizeClasses[size]} font-medium border-none`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="mr-1">{config.icon}</span>
            {showLabels ? config.label : config.label.split(' ')[0]}
          </Badge>
        )
      })}
      
      {methods.length > 3 && (
        <Badge 
          variant="outline" 
          className={`border-gray-600 text-gray-400 ${sizeClasses[size]}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          +{methods.length - 3}
        </Badge>
      )}
    </div>
  )
}

// Component untuk menampilkan semua metode dengan detail
export function PaymentMethodsDetailed({ methods }: { methods: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
        Metode Pembayaran yang Diterima:
      </p>
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => {
          const config = paymentMethodsConfig[method as keyof typeof paymentMethodsConfig]
          if (!config) return null
          
          return (
            <div
              key={method}
              className="flex items-center gap-2 bg-[#1F2937] border border-white/10 rounded-lg px-3 py-2"
            >
              <span className="text-lg">{config.icon}</span>
              <span className="text-white text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {config.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
