"use client"

import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavBackgroundSwitcherProps {
  backgroundType: "gradient" | "particles" | "spline" | "mesh"
  setBackgroundType: (type: "gradient" | "particles" | "spline" | "mesh") => void
}

export default function NavBackgroundSwitcher({
  backgroundType,
  setBackgroundType
}: NavBackgroundSwitcherProps) {
  const backgroundOptions = [
    { id: "gradient", icon: "🎨", name: "Gradient Animasi", description: "Background gradient yang bergerak" },
    { id: "particles", icon: "✨", name: "Partikel Interaktif", description: "Titik-titik yang saling terhubung" },
    { id: "spline", icon: "🎲", name: "3D Mengambang", description: "Elemen 3D yang bergerak" },
    { id: "mesh", icon: "🌐", name: "Mesh Pattern", description: "Pattern grid dengan glow effect" },
  ] as const

  const currentOption = backgroundOptions.find(opt => opt.id === backgroundType)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-foreground hover:bg-accent gap-2 hidden md:inline-flex"
        >
          <Palette className="w-4 h-4" />
          <span className="text-sm">{currentOption?.icon}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-card border-border text-foreground w-64" 
        align="end"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Background Style
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {backgroundOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => setBackgroundType(option.id)}
            className={`cursor-pointer p-3 ${
              backgroundType === option.id 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent"
            }`}
          >
            <div className="flex items-start gap-3 w-full">
              <span className="text-lg mt-0.5">{option.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{option.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </div>
              </div>
              {backgroundType === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-primary rounded-full mt-2"
                />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
