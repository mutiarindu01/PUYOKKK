"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingBackgroundSwitcherProps {
  backgroundType: "gradient" | "particles" | "spline" | "mesh"
  setBackgroundType: (type: "gradient" | "particles" | "spline" | "mesh") => void
}

export default function FloatingBackgroundSwitcher({
  backgroundType,
  setBackgroundType
}: FloatingBackgroundSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const backgroundOptions = [
    { id: "gradient", icon: "🎨", name: "Gradient", description: "Smooth gradients" },
    { id: "particles", icon: "✨", name: "Particles", description: "Interactive dots" },
    { id: "spline", icon: "🎲", name: "3D Demo", description: "Floating shapes" },
    { id: "mesh", icon: "🌐", name: "Mesh", description: "Grid pattern" },
  ] as const

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="mb-4"
          >
            <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-xl shadow-black/10 min-w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Background Style</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {backgroundOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setBackgroundType(option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative p-3 rounded-xl transition-all duration-200 text-left ${
                      backgroundType === option.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium text-sm">{option.name}</span>
                    </div>
                    <p className="text-xs opacity-70">{option.description}</p>
                    
                    {backgroundType === option.id && (
                      <motion.div
                        layoutId="floating-active"
                        className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <Palette className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
