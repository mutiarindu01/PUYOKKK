"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Wallet, 
  Check, 
  ArrowRight, 
  User, 
  Mail, 
  Camera,
  FileText,
  Shield,
  Sparkles,
  ChevronLeft,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useOnboarding } from '@/contexts/OnboardingContext'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const {
    onboardingStatus,
    setOnboardingStep,
    completeWalletConnection,
    completeTermsAgreement,
    completeProfileCreation,
    completeLogin,
    isReturningUser,
    quickLogin
  } = useOnboarding()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    acceptTerms: false,
    acceptPrivacy: false
  })

  const handleWalletConnection = (walletType: string) => {
    // Simulate wallet connection
    const mockWalletAddress = `0x${Math.random().toString(16).substr(2, 40)}`
    completeWalletConnection(mockWalletAddress)
  }

  const handleTermsAgreement = () => {
    if (formData.acceptTerms && formData.acceptPrivacy) {
      completeTermsAgreement()
    }
  }

  const handleProfileCreation = () => {
    if (formData.name && formData.email) {
      completeProfileCreation({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar
      })
    }
  }

  const handleLoginCompletion = () => {
    completeLogin()
    onClose()
  }

  const renderWelcomeStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Selamat Datang di Ꭾuyok!</h2>
        <p className="text-gray-300 text-lg max-w-md mx-auto">
          Marketplace NFT & Token P2P pertama di Indonesia. Mari mulai perjalanan digital Anda!
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">Yang akan Anda lakukan:</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
            <span className="text-gray-300">Hubungkan dompet digital Anda</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
            <span className="text-gray-300">Setujui syarat dan ketentuan</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
            <span className="text-gray-300">Buat profil Anda</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
            <span className="text-gray-300">Mulai trading!</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={() => setOnboardingStep('wallet-connection')}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg"
      >
        Mulai Sekarang
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  )

  const renderWalletConnectionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Hubungkan Dompet Digital</h2>
        <p className="text-gray-300">
          Pilih dompet digital Anda untuk mulai bertransaksi dengan aman
        </p>
      </div>

      <div className="space-y-3">
        <Card 
          className="cursor-pointer hover:bg-slate-700/50 transition-colors border-slate-600 bg-slate-800/50"
          onClick={() => handleWalletConnection('metamask')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl">
                🦊
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">MetaMask</h3>
                <p className="text-sm text-gray-400">Browser wallet terpopuler</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-slate-700/50 transition-colors border-slate-600 bg-slate-800/50"
          onClick={() => handleWalletConnection('walletconnect')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl">
                🔗
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">WalletConnect</h3>
                <p className="text-sm text-gray-400">Untuk dompet mobile</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-slate-700/50 transition-colors border-slate-600 bg-slate-800/50"
          onClick={() => handleWalletConnection('coinbase')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl">
                🏦
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Coinbase Wallet</h3>
                <p className="text-sm text-gray-400">Dompet Coinbase</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setOnboardingStep('welcome')}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    </motion.div>
  )

  const renderTermsAgreementStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Syarat & Ketentuan</h2>
        <p className="text-gray-300">
          Dompet berhasil terhubung! Sekarang baca dan setujui syarat & ketentuan kami
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">Dompet terhubung: {onboardingStatus.walletAddress?.slice(0, 6)}...{onboardingStatus.walletAddress?.slice(-4)}</span>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-6 max-h-60 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Ringkasan Ketentuan Layanan</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            <strong className="text-white">1. Keamanan Transaksi:</strong> Semua transaksi menggunakan teknologi blockchain dan smart contract untuk memastikan keamanan maksimal.
          </p>
          <p>
            <strong className="text-white">2. Biaya Platform:</strong> Kami mengenakan biaya 2-3% untuk setiap transaksi yang berhasil.
          </p>
          <p>
            <strong className="text-white">3. KYC & Verifikasi:</strong> Untuk transaksi di atas Rp 50 juta, diperlukan verifikasi identitas.
          </p>
          <p>
            <strong className="text-white">4. Perlindungan Escrow:</strong> Dana Anda dilindungi sistem escrow hingga transaksi selesai.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id="accept-terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
          />
          <label htmlFor="accept-terms" className="text-sm text-gray-300 cursor-pointer">
            Saya telah membaca dan menyetujui{' '}
            <a href="/terms" className="text-blue-400 hover:underline">Syarat & Ketentuan</a>
          </label>
        </div>
        
        <div className="flex items-start gap-3">
          <Checkbox 
            id="accept-privacy"
            checked={formData.acceptPrivacy}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptPrivacy: checked as boolean }))}
          />
          <label htmlFor="accept-privacy" className="text-sm text-gray-300 cursor-pointer">
            Saya menyetujui{' '}
            <a href="/privacy" className="text-blue-400 hover:underline">Kebijakan Privasi</a>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setOnboardingStep('wallet-connection')}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button 
          onClick={handleTermsAgreement}
          disabled={!formData.acceptTerms || !formData.acceptPrivacy}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          Setuju & Lanjutkan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )

  const renderProfileCreationStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Buat Profil Anda</h2>
        <p className="text-gray-300">
          Lengkapi profil untuk mendapatkan pengalaman trading yang lebih personal
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-purple-500">
              <AvatarImage src={formData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-2xl">
                {formData.name.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full bg-purple-600 hover:bg-purple-700"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Nama Lengkap</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Masukkan nama lengkap Anda"
              className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="nama@email.com"
              className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 mt-2"
            />
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-medium">Pioneer NFT Gratis!</h4>
              <p className="text-sm text-gray-300 mt-1">
                Sebagai pengguna baru, Anda akan mendapatkan NFT eksklusif Pioneer secara gratis!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setOnboardingStep('terms-agreement')}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button 
          onClick={handleProfileCreation}
          disabled={!formData.name || !formData.email}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Buat Profil
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )

  const renderLoginCompletionStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Selamat!</h2>
        <p className="text-gray-300 text-lg">
          Akun Anda berhasil dibuat. Selamat datang di komunitas Ꭾuyok!
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">Yang bisa Anda lakukan sekarang:</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">✓</Badge>
            <span className="text-gray-300">Jelajahi marketplace NFT & Token</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">✓</Badge>
            <span className="text-gray-300">Mulai trading dengan biaya rendah</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">✓</Badge>
            <span className="text-gray-300">Dapatkan Pioneer NFT gratis Anda</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500 text-white">✓</Badge>
            <span className="text-gray-300">Akses dashboard pribadi</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleLoginCompletion}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg"
      >
        Mulai Trading
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (onboardingStatus.currentStep) {
      case 'welcome':
        return renderWelcomeStep()
      case 'wallet-connection':
        return renderWalletConnectionStep()
      case 'terms-agreement':
        return renderTermsAgreementStep()
      case 'profile-creation':
        return renderProfileCreationStep()
      case 'login-completion':
        return renderLoginCompletionStep()
      default:
        return renderWelcomeStep()
    }
  }

  const getStepNumber = () => {
    const steps = ['welcome', 'wallet-connection', 'terms-agreement', 'profile-creation', 'login-completion']
    return steps.indexOf(onboardingStatus.currentStep) + 1
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Ffa8faf3c486a40418d8ebcd83d93a67b%2F1f8a70592f3b4d0baa8ff7eddaf3b5b3?format=webp&width=800"
              alt="Ꭾuyok Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-white">Ꭾuyok</span>
          </div>
          {onboardingStatus.currentStep !== 'welcome' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        {onboardingStatus.currentStep !== 'welcome' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Langkah {getStepNumber()} dari 4</span>
              <span className="text-sm text-gray-400">{Math.round((getStepNumber() / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getStepNumber() / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
