"use client"

import { useState } from "react"

interface ElegantTabsProps {
  items: Array<{ label: string; icon?: React.ReactNode }>
  onTabChange?: (index: number) => void
  initialActiveIndex?: number
}

export default function ElegantTabs({ 
  items, 
  onTabChange, 
  initialActiveIndex = 0 
}: ElegantTabsProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    onTabChange?.(index)
  }

  return (
    <div className="relative">
      {/* Main tab container */}
      <div className="flex relative bg-slate-950/50 backdrop-blur-xl rounded-2xl p-2 border border-slate-700/30 shadow-2xl">
        {/* Active tab background */}
        <div 
          className="absolute top-2 bottom-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-xl shadow-lg transition-all duration-500 ease-out"
          style={{
            left: `${2 + (activeIndex * (100 / items.length))}%`,
            width: `${(100 / items.length) - 4}%`
          }}
        />
        
        {/* Active tab glow */}
        <div 
          className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-xl transition-all duration-500 ease-out"
          style={{
            left: `${activeIndex * (100 / items.length)}%`,
            width: `${100 / items.length}%`
          }}
        />

        {/* Tab buttons */}
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`
              relative flex-1 px-6 py-4 text-sm font-semibold rounded-xl
              transition-all duration-300 ease-out z-10
              flex items-center justify-center gap-2
              ${activeIndex === index 
                ? 'text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }
            `}
          >
            {/* Icon with subtle animation */}
            <span className={`transition-transform duration-300 ${
              activeIndex === index ? 'scale-110' : 'scale-100'
            }`}>
              {item.icon}
            </span>
            
            {/* Label */}
            <span className="font-medium tracking-wide">
              {item.label}
            </span>
            
            {/* Active indicator dot */}
            {activeIndex === index && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg" />
            )}
          </button>
        ))}
      </div>
      
      {/* Subtle bottom accent */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
    </div>
  )
}
