"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ModernTabsProps {
  items: Array<{ label: string; icon?: React.ReactNode }>
  onTabChange?: (index: number) => void
  initialActiveIndex?: number
}

export default function ModernTabs({ 
  items, 
  onTabChange, 
  initialActiveIndex = 0 
}: ModernTabsProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    onTabChange?.(index)
  }

  return (
    <div className="relative">
      <div className="flex bg-slate-900/50 backdrop-blur-md rounded-xl p-1 border border-slate-700/50">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`
              relative flex-1 px-6 py-3 text-sm font-medium rounded-lg
              transition-all duration-300 ease-out
              ${activeIndex === index 
                ? 'text-white' 
                : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            {/* Background highlight */}
            {activeIndex === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {item.icon}
              {item.label}
            </span>
            
            {/* Glow effect */}
            {activeIndex === index && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Bottom accent line */}
      <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
    </div>
  )
}
