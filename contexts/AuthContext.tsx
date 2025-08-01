"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth, AuthUser } from '@/lib/auth'
import { toast } from 'sonner'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  signInWithWallet: (params: {
    walletAddress: string
    signature: string
    message: string
    username?: string
  }) => Promise<boolean>
  signInWithEmail: (params: {
    email: string
    password: string
  }) => Promise<boolean>
  signUpWithEmail: (params: {
    email: string
    password: string
    username: string
  }) => Promise<boolean>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<AuthUser>) => Promise<boolean>
  requireAuth: (action?: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const authService = useAuth()

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Sign in with wallet
  const signInWithWallet = async (params: {
    walletAddress: string
    signature: string
    message: string
    username?: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const user = await authService.signInWithWallet(params)
      if (user) {
        setUser(user)
        toast.success('Login berhasil!')
        return true
      } else {
        toast.error('Login gagal. Periksa wallet dan signature.')
        return false
      }
    } catch (error: any) {
      toast.error('Error: ' + error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with email
  const signInWithEmail = async (params: {
    email: string
    password: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const user = await authService.signInWithEmail(params)
      if (user) {
        setUser(user)
        toast.success('Login berhasil!')
        return true
      } else {
        toast.error('Login gagal. Periksa email dan password.')
        return false
      }
    } catch (error: any) {
      toast.error('Error: ' + error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Sign up with email
  const signUpWithEmail = async (params: {
    email: string
    password: string
    username: string
  }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const user = await authService.signUpWithEmail(params)
      if (user) {
        setUser(user)
        toast.success('Registrasi berhasil!')
        return true
      } else {
        toast.error('Registrasi gagal.')
        return false
      }
    } catch (error: any) {
      toast.error('Error: ' + error.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out
  const signOut = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await authService.signOut()
      setUser(null)
      toast.success('Logout berhasil!')
    } catch (error: any) {
      toast.error('Error: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Update profile
  const updateProfile = async (updates: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = await authService.updateUser(user.id, updates)
      if (updatedUser) {
        setUser(updatedUser)
        toast.success('Profile berhasil diupdate!')
        return true
      } else {
        toast.error('Gagal update profile.')
        return false
      }
    } catch (error: any) {
      toast.error('Error: ' + error.message)
      return false
    }
  }

  // Require authentication
  const requireAuth = (action?: string): boolean => {
    if (!user) {
      toast.error(`Anda harus login untuk ${action || 'melakukan aksi ini'}.`)
      return false
    }
    return true
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithWallet,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile,
    requireAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuthContext()

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p>Please sign in to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
