"use client"

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Wallet, Shield, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'

interface WalletAuthProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
  mode: 'signin' | 'signup'
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function WalletAuth({ isOpen, onClose, onSuccess, mode }: WalletAuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [authStep, setAuthStep] = useState<'connect' | 'sign' | 'register'>('connect')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authMode, setAuthMode] = useState<'wallet' | 'email'>(mode === 'signin' ? 'wallet' : 'email')
  
  const { signInWithWallet, signInWithEmail, signUpWithEmail } = useAuth()

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum?.isMetaMask
  }

  // Connect Wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast.error('MetaMask tidak terdeteksi. Silakan install MetaMask terlebih dahulu.')
      return
    }

    setIsLoading(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        setIsConnected(true)
        setAuthStep('sign')
        toast.success('Wallet berhasil terhubung!')
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error)
      toast.error('Gagal menghubungkan wallet: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Sign Message for Authentication
  const signMessage = async () => {
    if (!walletAddress || !window.ethereum) return

    setIsLoading(true)
    try {
      // Use ethers v6 syntax
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const message = `Sign this message to authenticate with PUYOK NFT Marketplace.

Address: ${walletAddress}
Timestamp: ${new Date().toISOString()}
Nonce: ${Date.now()}`

      const signature = await signer.signMessage(message)
      
      // Authenticate with backend
      const user = await signInWithWallet({
        walletAddress,
        signature,
        message,
        username: mode === 'signup' ? username : undefined
      })

      if (user) {
        toast.success('Autentikasi berhasil!')
        onSuccess(user)
        onClose()
      } else {
        if (mode === 'signin') {
          toast.error('Wallet tidak terdaftar. Silakan daftar terlebih dahulu.')
          setAuthStep('register')
        } else {
          toast.error('Gagal mendaftarkan wallet.')
        }
      }
    } catch (error: any) {
      console.error('Message signing failed:', error)
      if (error.message?.includes('Wallet not registered')) {
        if (mode === 'signin') {
          toast.error('Wallet tidak terdaftar. Silakan daftar terlebih dahulu.')
          setAuthStep('register')
        } else {
          toast.error('Wallet belum terdaftar')
        }
      } else if (error.message?.includes('Username is required')) {
        toast.error('Username diperlukan untuk registrasi')
      } else {
        toast.error('Gagal menandatangani pesan: ' + (error.message || 'Unknown error'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Register with wallet
  const registerWallet = async () => {
    if (!username.trim()) {
      toast.error('Username diperlukan untuk registrasi')
      return
    }

    setIsLoading(true)
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      const message = `Register new account with PUYOK NFT Marketplace.

Address: ${walletAddress}
Username: ${username}
Timestamp: ${new Date().toISOString()}
Nonce: ${Date.now()}`

      const signature = await signer.signMessage(message)
      
      const user = await signInWithWallet({
        walletAddress,
        signature,
        message,
        username
      })

      if (user) {
        toast.success('Registrasi berhasil!')
        onSuccess(user)
        onClose()
      } else {
        toast.error('Gagal mendaftarkan akun.')
      }
    } catch (error: any) {
      console.error('Registration failed:', error)
      toast.error('Gagal mendaftar: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Email Authentication
  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Email dan password diperlukan')
      return
    }

    setIsLoading(true)
    try {
      let user
      if (mode === 'signin') {
        user = await signInWithEmail({ email, password })
      } else {
        if (!username.trim()) {
          toast.error('Username diperlukan untuk registrasi')
          setIsLoading(false)
          return
        }
        user = await signUpWithEmail({ email, password, username })
      }

      if (user) {
        toast.success(mode === 'signin' ? 'Login berhasil!' : 'Registrasi berhasil!')
        onSuccess(user)
        onClose()
      } else {
        toast.error(mode === 'signin' ? 'Login gagal. Periksa email dan password.' : 'Registrasi gagal.')
      }
    } catch (error: any) {
      console.error('Email auth failed:', error)
      toast.error('Gagal: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setAuthStep('connect')
      setWalletAddress('')
      setIsConnected(false)
      setUsername('')
      setEmail('')
      setPassword('')
      setIsLoading(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            {mode === 'signin' ? 'Masuk ke PUYOK' : 'Daftar di PUYOK'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === 'signin' 
              ? 'Gunakan wallet atau email untuk masuk' 
              : 'Buat akun baru dengan wallet atau email'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Authentication Method Selector */}
          <div className="flex gap-2">
            <Button
              variant={authMode === 'wallet' ? 'default' : 'outline'}
              onClick={() => setAuthMode('wallet')}
              className="flex-1"
              size="sm"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Button>
            <Button
              variant={authMode === 'email' ? 'default' : 'outline'}
              onClick={() => setAuthMode('email')}
              className="flex-1"
              size="sm"
            >
              📧 Email
            </Button>
          </div>

          {authMode === 'wallet' ? (
            <div className="space-y-4">
              {/* Wallet Connection Status */}
              {authStep === 'connect' && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-blue-400" />
                      Hubungkan Wallet
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {isMetaMaskInstalled() 
                        ? 'Klik tombol di bawah untuk menghubungkan MetaMask'
                        : 'MetaMask diperlukan untuk menggunakan wallet authentication'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {!isMetaMaskInstalled() ? (
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">MetaMask tidak terdeteksi</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                          onClick={() => window.open('https://metamask.io/download/', '_blank')}
                        >
                          Install MetaMask
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menghubungkan...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-4 h-4 mr-2" />
                            Hubungkan MetaMask
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Signature Step */}
              {authStep === 'sign' && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Wallet Terhubung
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Tandatangani pesan untuk melanjutkan autentikasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-sm text-slate-400 mb-1">Alamat Wallet:</div>
                      <div className="font-mono text-xs text-white break-all">{walletAddress}</div>
                    </div>
                    <Button
                      onClick={signMessage}
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menandatangani...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Tandatangani Pesan
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Registration Step */}
              {authStep === 'register' && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Daftar Akun Baru</CardTitle>
                    <CardDescription className="text-slate-400">
                      Wallet belum terdaftar. Buat akun baru dengan username.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Username</label>
                      <Input
                        placeholder="Masukkan username unik"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button
                      onClick={registerWallet}
                      disabled={isLoading || !username.trim()}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Mendaftar...
                        </>
                      ) : (
                        'Daftar & Tandatangani'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Email Authentication Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {mode === 'signin' ? 'Masuk dengan Email' : 'Daftar dengan Email'}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {mode === 'signin' 
                      ? 'Gunakan email dan password yang sudah terdaftar' 
                      : 'Buat akun baru dengan email dan password'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mode === 'signup' && (
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">Username</label>
                      <Input
                        placeholder="Masukkan username unik"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Email</label>
                    <Input
                      type="email"
                      placeholder="alamat@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleEmailAuth}
                    disabled={isLoading || !email.trim() || !password.trim() || (mode === 'signup' && !username.trim())}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {mode === 'signin' ? 'Masuk...' : 'Mendaftar...'}
                      </>
                    ) : (
                      mode === 'signin' ? 'Masuk' : 'Daftar'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Shield className="w-3 h-3" />
            <span>Dilindungi oleh enkripsi end-to-end</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
