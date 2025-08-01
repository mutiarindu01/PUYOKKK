"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Eye, EyeOff, Lock, Mail, Shield, Crown, 
  AlertCircle, CheckCircle, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample admin credentials (in production, this should be in a secure database)
const ADMIN_CREDENTIALS = [
  {
    email: "admin@puyok.com",
    password: "admin123",
    name: "Bude Putuk",
    role: "super_admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64"
  },
  {
    email: "rafli@puyok.com", 
    password: "rafli123",
    name: "Rafli Admin",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64"
  },
  {
    email: "moderator@puyok.com",
    password: "mod123", 
    name: "Moderator",
    role: "moderator",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64"
  }
]

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) {
      setError("Account temporarily locked. Please try again later.")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    const admin = ADMIN_CREDENTIALS.find(
      cred => cred.email === formData.email && cred.password === formData.password
    )

    if (admin) {
      // Store admin session
      localStorage.setItem('admin_session', JSON.stringify({
        ...admin,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substr(2, 9)
      }))
      
      // Reset attempts
      setAttempts(0)
      
      // Success - redirect to admin dashboard
      router.push('/rafli/admin')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      if (newAttempts >= 3) {
        setIsLocked(true)
        setError("Too many failed attempts. Account locked for 5 minutes.")
        // In production, implement proper account locking
        setTimeout(() => {
          setIsLocked(false)
          setAttempts(0)
        }, 5 * 60 * 1000) // 5 minutes
      } else {
        setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`)
      }
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError("") // Clear error when user types
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rotate-12 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rotate-12 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              PUYOK Admin Portal
            </CardTitle>
            <p className="text-slate-400 text-sm">
              Secure administrative access
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Credentials Info */}
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <Shield className="w-4 h-4 text-blue-400" />
              <AlertDescription className="text-blue-300 text-sm">
                <strong>Demo Credentials:</strong><br />
                Email: admin@puyok.com | Password: admin123<br />
                Email: rafli@puyok.com | Password: rafli123
              </AlertDescription>
            </Alert>

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    required
                    disabled={isLoading || isLocked}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    required
                    disabled={isLoading || isLocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    disabled={isLoading || isLocked}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 disabled:opacity-50"
                disabled={isLoading || isLocked}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In to Admin Panel
                  </>
                )}
              </Button>
            </form>

            {/* Security Features */}
            <div className="pt-4 border-t border-slate-700/50">
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>2FA Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Session Timeout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Audit Logging</span>
                </div>
              </div>
            </div>

            {/* Attempt Counter */}
            {attempts > 0 && (
              <div className="text-center">
                <p className="text-slate-400 text-xs">
                  Login attempts: {attempts}/3
                </p>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-red-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(attempts / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs">
            Protected by PUYOK Security Systems
          </p>
          <p className="text-slate-600 text-xs mt-1">
            © 2024 PUYOK Platform. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
