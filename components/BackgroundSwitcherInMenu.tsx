"use client"

import { motion } from 'framer-motion'
import { DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'

interface BackgroundSwitcherInMenuProps {
  backgroundType: "gradient" | "particles" | "spline" | "mesh"
  setBackgroundType: (type: "gradient" | "particles" | "spline" | "mesh") => void
  onClose: () => void
}

export default function BackgroundSwitcherInMenu({
  backgroundType,
  setBackgroundType,
  onClose
}: BackgroundSwitcherInMenuProps) {
  const backgroundOptions = [
    { id: "gradient", icon: "🎨", name: "Gradient" },
    { id: "particles", icon: "✨", name: "Partikel" },
    { id: "spline", icon: "🎲", name: "3D Demo" },
    { id: "mesh", icon: "🌐", name: "Mesh" },
  ] as const

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-2">
        <span className="text-base">🎨</span>
        Background Style
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="bg-card border-border text-foreground">
        {backgroundOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onSelect={() => {
              setBackgroundType(option.id)
              onClose()
            }}
            className={`cursor-pointer ${
              backgroundType === option.id 
                ? "bg-primary/10 text-primary" 
                : ""
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <span>{option.icon}</span>
              <span>{option.name}</span>
              {backgroundType === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-primary rounded-full ml-auto"
                />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
