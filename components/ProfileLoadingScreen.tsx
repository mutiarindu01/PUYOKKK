"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Star,
  Palette,
  Zap,
  Crown,
  Gem
} from "lucide-react"

interface ProfileLoadingScreenProps {
  isLoading: boolean
  onLoadingComplete?: () => void
}

export default function ProfileLoadingScreen({ isLoading, onLoadingComplete }: ProfileLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { icon: Palette, label: "Loading profile...", color: "text-blue-500" },
    { icon: Trophy, label: "Fetching achievements...", color: "text-yellow-500" },
    { icon: Sparkles, label: "Loading portfolio...", color: "text-purple-500" },
    { icon: TrendingUp, label: "Calculating stats...", color: "text-green-500" },
    { icon: Star, label: "Almost ready...", color: "text-pink-500" },
  ]

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete?.()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length)
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [isLoading, onLoadingComplete])

  if (!isLoading) return null

  const CurrentIcon = loadingSteps[currentStep]?.icon || Sparkles

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-yellow-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-card/90 backdrop-blur-md">
        <CardContent className="p-8 text-center">
          {/* Loading Avatar */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <CurrentIcon className={`w-10 h-10 ${loadingSteps[currentStep]?.color} animate-bounce`} />
              </div>
            </div>
            
            {/* Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Crown className="w-4 h-4 text-white m-1" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}>
              <Gem className="w-4 h-4 text-white m-1" />
            </div>
          </div>

          {/* Progress Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Loading Profile</h2>
            <p className="text-muted-foreground">Preparing your professional showcase</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              <span className="text-sm font-medium text-primary">
                {loadingSteps[currentStep]?.label}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Loading Steps */}
          <div className="flex justify-center gap-3">
            {loadingSteps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep 
                      ? `bg-primary/20 ${step.color}` 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                </div>
              )
            })}
          </div>

          {/* Fun Loading Messages */}
          <div className="mt-6 text-xs text-muted-foreground">
            <p className="animate-pulse">
              {progress < 25 && "Assembling your digital masterpiece..."}
              {progress >= 25 && progress < 50 && "Polishing your achievements..."}
              {progress >= 50 && progress < 75 && "Optimizing portfolio display..."}
              {progress >= 75 && progress < 90 && "Adding final touches..."}
              {progress >= 90 && "Welcome to your professional showcase!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
