"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { useAuthGuard } from '@/hooks/useAuthGuard'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuthGuard()
  const { onboardingStatus } = useOnboarding()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        // User is not authenticated, redirect to home
        router.push(redirectTo)
      } else {
        setIsChecking(false)
      }
    }

    // Small delay to allow context to initialize
    const timeoutId = setTimeout(checkAuth, 100)
    
    return () => clearTimeout(timeoutId)
  }, [isAuthenticated, router, redirectTo])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold text-white">Akses Terbatas</h2>
          <p className="text-gray-400">Anda perlu login untuk mengakses halaman ini.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
