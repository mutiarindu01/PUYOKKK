"use client"

import { useState } from 'react'
import { ArrowLeftRight, Calculator, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatRupiah, formatNumber } from "@/lib/formatters"

const ValuePropositionSection = () => {
  const [activeTab, setActiveTab] = useState('comparison')
  
  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-slate-900/20 via-background to-gray-900/20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        
        {/* Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-slate-600/30 rounded-full px-6 py-3 mb-6">
            <ArrowLeftRight className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-semibold">MENGAPA Ꭾuyok BERBEDA</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Platform
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500"> Revolusioner</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Dirancang khusus untuk kebutuhan pasar Indonesia dengan teknologi terdepan
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-8 border-b border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className={`flex items-center px-6 py-3 border-b-2 font-medium transition-all ${
              activeTab === 'comparison'
                ? 'border-green-500 text-green-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('comparison')}
          >
            <ArrowLeftRight className="h-5 w-5 mr-2" />
            Perbandingan Fitur
          </button>
          <button
            className={`flex items-center px-6 py-3 border-b-2 font-medium transition-all ${
              activeTab === 'calculator'
                ? 'border-green-500 text-green-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Kalkulator Hemat
          </button>
          <button
            className={`flex items-center px-6 py-3 border-b-2 font-medium transition-all ${
              activeTab === 'testimonials'
                ? 'border-green-500 text-green-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('testimonials')}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Testimoni Pengguna
          </button>
        </motion.div>
        
        {/* Tab Content */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 overflow-hidden">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'comparison' && <FeatureComparison />}
                  {activeTab === 'calculator' && <SavingsCalculator />}
                  {activeTab === 'testimonials' && <TestimonialsCarousel />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Subkomponen Perbandingan Fitur
const FeatureComparison = () => {
  const featureComparison = [
    {
      feature: 'Biaya Gas',
      ꭾuyok: 'Gratis (Ditanggung Platform)',
      others: `${formatRupiah(50000)} - ${formatRupiah(500000)} per transaksi`
    },
    {
      feature: 'Metode Pembayaran',
      ꭾuyok: 'DANA, GoPay, OVO, QRIS',
      others: 'Transfer Bank, Crypto'
    },
    {
      feature: 'Keamanan',
      ꭾuyok: 'Escrow Smart Contract + Verifikasi AI',
      others: 'Escrow Dasar'
    },
    {
      feature: 'Komunitas',
      ꭾuyok: 'Forum Edukasi & Dukungan 24/7',
      others: 'Dukungan Terbatas'
    },
    {
      feature: 'Biaya Platform',
      ꭾuyok: '2-3%',
      others: '5-15%'
    }
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        🏆 Ꭾuyok vs Platform Lain
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="py-4 px-6 text-left text-gray-400 font-semibold">Fitur</th>
              <th className="py-4 px-6 text-center text-green-500 font-semibold">🚀 Ꭾuyok</th>
              <th className="py-4 px-6 text-center text-gray-400 font-semibold">Platform Lain</th>
            </tr>
          </thead>
          <tbody>
            {featureComparison.map((item, index) => (
              <motion.tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-slate-800/20' : ''} hover:bg-slate-700/20 transition-colors`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <td className="py-4 px-6 text-white font-medium">{item.feature}</td>
                <td className="py-4 px-6 text-center text-green-400 font-semibold">{item.ꭾuyok}</td>
                <td className="py-4 px-6 text-center text-gray-400">{item.others}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/30">
          📊 Perbandingan berdasarkan rata-rata platform NFT global dan lokal
        </Badge>
      </div>
    </div>
  )
}

// Subkomponen Kalkulator Hemat
const SavingsCalculator = () => {
  const [amount, setAmount] = useState(1000000)
  
  // Hitung penghematan
  const ꭾuyokFee = amount * 0.03
  const othersFee = amount * 0.1 // Rata-rata 10%
  const gasFee = 250000 // Rata-rata biaya gas
  const savings = (othersFee + gasFee) - puyokFee
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        💰 Hitung Penghematan Anda
      </h3>
      
      <div className="mb-8">
        <label className="block text-gray-300 mb-4 font-medium">
          Nilai Transaksi (Rp)
        </label>
        <input
          type="range"
          min="50000"
          max="100000000"
          step="50000"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-gray-400 text-sm mt-2">
          <span>{formatRupiah(50000)}</span>
          <span>{formatRupiah(100000000)}</span>
        </div>
        <div className="mt-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">Rp</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              className="w-full p-4 pl-12 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-center text-xl font-bold focus:border-green-500 transition-colors"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div 
          className="bg-slate-800/30 p-6 rounded-xl border border-red-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4 className="text-gray-400 font-medium mb-3 flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            Di Platform Lain
          </h4>
          <div className="text-3xl font-bold text-red-400 mb-2">
            {formatRupiah(amount - othersFee - gasFee)}
          </div>
          <div className="text-sm text-gray-400">
            Termasuk biaya platform 10% + biaya gas {formatRupiah(250000)}
          </div>
        </motion.div>

        <motion.div
          className="bg-slate-800/30 p-6 rounded-xl border border-green-500/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4 className="text-gray-400 font-medium mb-3 flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            Di PUYOK
          </h4>
          <div className="text-3xl font-bold text-green-500 mb-2">
            {formatRupiah(amount - puyokFee)}
          </div>
          <div className="text-sm text-gray-400">
            Biaya platform 3% + biaya gas gratis
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-center">
          <div className="text-green-400 font-bold text-2xl mb-2">
            🎉 Hemat {formatRupiah(savings)}!
          </div>
          <div className="text-gray-300 text-lg">
            Itu <span className="text-green-400 font-bold">{((savings / amount) * 100).toFixed(1)}%</span> lebih banyak di kantong Anda
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Subkomponen Testimoni Carousel
const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Kreator NFT",
      content: "Sejak pindah ke PUYOK, penjualan saya naik 40%! Biaya rendah dan pembayaran langsung ke DANA bikin cash flow lancar.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
      rating: 5
    },
    {
      name: "Siti Rahayu",
      role: "Kolektor",
      content: "Verifikasi AI-nya keren banget. Transaksi 5 menit selesai, ga perlu nunggu berjam-jam seperti di platform lain.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
      rating: 5
    },
    {
      name: "Agus Wijaya",
      role: "Investor",
      content: "Sistem escrow smart contractnya bikin tenang. Saya bisa transaksi besar tanpa khawatir penipuan.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus",
      rating: 5
    }
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        💬 Apa Kata Pengguna PUYOK
      </h3>
      
      <motion.div 
        className="relative bg-slate-800/30 rounded-xl p-8 border border-slate-600/30"
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-2 border-green-500/50 rounded-full w-20 h-20 overflow-hidden mx-auto">
              <img 
                src={testimonials[currentIndex].avatar} 
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-2">
              {testimonials[currentIndex].name}
            </h4>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {testimonials[currentIndex].role}
            </Badge>
          </div>
          
          <blockquote className="text-gray-300 italic text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            "{testimonials[currentIndex].content}"
          </blockquote>

          {/* Rating Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">⭐</span>
            ))}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={prevTestimonial}
            size="icon"
            variant="outline"
            className="border-slate-600/50 text-slate-400 hover:bg-slate-700/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            onClick={nextTestimonial}
            size="icon"
            variant="outline"
            className="border-slate-600/50 text-slate-400 hover:bg-slate-700/50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-green-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ValuePropositionSection
