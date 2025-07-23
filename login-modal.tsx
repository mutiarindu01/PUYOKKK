"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  const handleAuth = (event: React.FormEvent) => {
    event.preventDefault()
    if (isRegister) {
      // Handle registration logic
      console.log("Registering with:", { email, password })
      toast({
        title: "Registration Attempt",
        description: `Attempting to register with ${email}. (This is a demo)`,
      })
    } else {
      // Handle login logic
      console.log("Logging in with:", { email, password })
      toast({
        title: "Login Attempt",
        description: `Attempting to log in with ${email}. (This is a demo)`,
      })
    }
    onClose() // Close modal after attempt
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`)
    toast({
      title: `${provider} Login`,
      description: `Attempting to log in with ${provider}. (This is a demo)`,
    })
    onClose() // Close modal after attempt
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            {isRegister ? "Create an Account" : "Log In to AssetHub"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {isRegister
              ? "Enter your email below to create your account"
              : "Enter your email and password to access your account"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isRegister ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              OR
            </span>
          </div>

          <div className="space-y-3">
            {/* Social login buttons removed as per request */}
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 bg-transparent"
              onClick={() => handleSocialLogin("Google")}
            >
              Sign In with Google (Demo)
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 bg-transparent"
              onClick={() => handleSocialLogin("MetaMask")}
            >
              Sign In with MetaMask (Demo)
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => setIsRegister(false)}>
                  Sign In
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => setIsRegister(true)}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
