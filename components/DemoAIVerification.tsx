"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Zap,
  Shield,
  CheckCircle,
  X,
  AlertTriangle,
  Upload,
  Eye,
  Star,
  TrendingUp,
  Clock,
  FileText,
  Camera
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DemoAIVerificationProps {
  onClose?: () => void
}

export default function DemoAIVerification({ onClose }: DemoAIVerificationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const demoSteps = [
    {
      title: "🤖 AI Detection",
      description: "Sistem AI mendeteksi dan mengekstrak teks dari gambar",
      duration: 2000,
      details: "OCR Engine mengidentifikasi area teks dengan akurasi 99.2%"
    },
    {
      title: "💰 Amount Validation",
      description: "Memverifikasi nominal transfer sesuai dengan yang diharapkan",
      duration: 1500,
      details: "Mencocokkan nominal Rp 1.515.134 dengan database order"
    },
    {
      title: "🔍 Reference Check",
      description: "Memeriksa kode referensi dalam bukti transfer",
      duration: 1000,
      details: "Kode PUYOK-123456 berhasil ditemukan dan divalidasi"
    },
    {
      title: "📅 Date Verification",
      description: "Memastikan transfer dilakukan hari ini",
      duration: 1000,
      details: "Tanggal 15 Jan 2024 dikonfirmasi sesuai dengan persyaratan"
    },
    {
      title: "🎯 Final Validation",
      description: "Menghitung skor kepercayaan dan membuat keputusan",
      duration: 500,
      details: "Skor kepercayaan 94.5% - Verifikasi otomatis berhasil!"
    }
  ]

  const mockResults = {
    isValid: true,
    confidence: 0.945,
    processingTime: "2.3s",
    details: {
      amountDetected: { found: true, match: true, confidence: 0.98 },
      referenceCodeDetected: { found: true, match: true, confidence: 0.95 },
      dateDetected: { found: true, isToday: true, confidence: 0.92 },
      accountNumberDetected: { found: true, match: true, confidence: 0.89 },
      imageQuality: "high" as const,
      isScreenshot: false
    }
  }

  const startDemo = async () => {
    setIsAnalyzing(true)
    setShowResults(false)
    setCurrentStep(0)

    for (let i = 0; i < demoSteps.length; i++) {
      setCurrentStep(i)
      await new Promise(resolve => setTimeout(resolve, demoSteps[i].duration))
    }

    setIsAnalyzing(false)
    setShowResults(true)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsAnalyzing(false)
    setShowResults(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-10 h-10 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          🤖 AI Verification System Demo
        </h2>
        <p className="text-slate-400 text-lg">
          Lihat bagaimana AI kami memverifikasi bukti transfer secara otomatis
        </p>
      </div>

      {/* AI Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Verifikasi Instan</h3>
            <p className="text-slate-400 text-sm">Proses dalam 2-3 detik</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">99.2% Akurat</h3>
            <p className="text-slate-400 text-sm">Tingkat kesalahan rendah</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">OCR Canggih</h3>
            <p className="text-slate-400 text-sm">Ekstraksi teks presisi</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Anti-Fraud</h3>
            <p className="text-slate-400 text-sm">Deteksi manipulasi gambar</p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Image */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Sample Payment Proof</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-slate-900 rounded-lg p-6 border-2 border-dashed border-slate-600">
            <div className="text-center">
              <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6 text-black">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-blue-600">Bank BCA</h3>
                  <p className="text-sm text-gray-600">Transfer Berhasil</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal:</span>
                    <span className="font-medium">15 Jan 2024, 14:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ke Rekening:</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama Penerima:</span>
                    <span className="font-medium">PUYOK Marketplace</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal:</span>
                    <span className="font-bold text-green-600">Rp 1.515.134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Berita:</span>
                    <span className="font-medium">PUYOK-123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-bold text-green-600">BERHASIL</span>
                  </div>
                </div>
              </div>
              
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center"
                >
                  <div className="bg-slate-900/90 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>AI sedang menganalisis...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Steps */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Processing Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {demoSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: currentStep >= index ? 1 : 0.3,
                      scale: currentStep === index ? 1.02 : 1
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                      currentStep >= index 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-slate-700/30 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep > index 
                          ? 'bg-green-500/20 text-green-400' 
                          : currentStep === index 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-slate-600/20 text-slate-500'
                      }`}>
                        {currentStep > index ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : currentStep === index ? (
                          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{step.title}</h4>
                        <p className="text-slate-400 text-sm">{step.description}</p>
                        {currentStep === index && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-blue-400 text-xs mt-1"
                          >
                            {step.details}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  ✅ Verification Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div>
                    <h4 className="text-green-400 font-bold text-lg">Verifikasi Berhasil</h4>
                    <p className="text-slate-300">Bukti transfer telah divalidasi oleh AI</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xl">
                        {(mockResults.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">Confidence Score</p>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Nominal terdeteksi (98%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Kode referensi valid (95%)</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Tanggal sesuai (92%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Rekening cocok (89%)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm pt-4 border-t border-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Processed in {mockResults.processingTime}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!isAnalyzing && !showResults && (
          <Button 
            onClick={startDemo}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            <Brain className="w-5 h-5 mr-2" />
            Mulai Demo AI
          </Button>
        )}
        
        {showResults && (
          <div className="flex gap-3">
            <Button 
              onClick={resetDemo}
              variant="outline"
              className="border-slate-600 px-6"
            >
              <Camera className="w-4 h-4 mr-2" />
              Demo Ulang
            </Button>
            {onClose && (
              <Button 
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 px-6"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Features Info */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Keunggulan AI Verification System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Verifikasi otomatis 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Mengurangi waktu tunggu manual</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Deteksi fraud dan manipulasi</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Akurasi tinggi dengan machine learning</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Integrasi dengan semua metode pembayaran</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Continuous learning dan improvement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
