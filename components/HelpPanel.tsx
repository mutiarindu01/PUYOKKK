"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HelpCircle,
  X,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Eye,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HelpTip {
  id: string
  title: string
  content: string
  icon: React.ReactNode
  category: "pricing" | "marketing" | "security" | "general"
}

const helpTips: HelpTip[] = [
  {
    id: "optimal-pricing",
    title: "Strategi Harga Optimal",
    content: "Harga 5-10% di bawah rata-rata pasar cenderung terjual 3x lebih cepat. Gunakan fitur rekomendasi AI kami untuk mendapatkan harga terbaik.",
    icon: <DollarSign className="w-4 h-4" />,
    category: "pricing"
  },
  {
    id: "best-time",
    title: "Waktu Terbaik untuk Listing",
    content: "Listing yang dipublikasi pada hari Jumat-Minggu pukul 19:00-22:00 WIB mendapat 40% lebih banyak viewer dibanding waktu lain.",
    icon: <Clock className="w-4 h-4" />,
    category: "marketing"
  },
  {
    id: "description-boost",
    title: "Deskripsi yang Menjual",
    content: "Tambahkan cerita di balik NFT, utilitas, atau keunikan collection. Deskripsi emosional meningkatkan konversi hingga 35%.",
    icon: <Eye className="w-4 h-4" />,
    category: "marketing"
  },
  {
    id: "security-first",
    title: "Keamanan Transaksi",
    content: "Selalu gunakan PUYOK Escrow Protection. Dana pembeli diamankan hingga NFT berhasil ditransfer. 100% aman untuk seller dan buyer.",
    icon: <Shield className="w-4 h-4" />,
    category: "security"
  },
  {
    id: "market-trends",
    title: "Ikuti Tren Pasar",
    content: "Gaming NFT dan PFP collection sedang trending. Harga asset pada kategori ini naik 25% dalam 30 hari terakhir.",
    icon: <TrendingUp className="w-4 h-4" />,
    category: "general"
  }
]

interface HelpPanelProps {
  currentStep?: number
  selectedCategory?: string
}

export default function HelpPanel({ currentStep = 1, selectedCategory }: HelpPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pricing": return <DollarSign className="w-4 h-4" />
      case "marketing": return <Eye className="w-4 h-4" />
      case "security": return <Shield className="w-4 h-4" />
      case "general": return <Lightbulb className="w-4 h-4" />
      default: return <HelpCircle className="w-4 h-4" />
    }
  }

  const getStepSpecificTips = (step: number) => {
    switch (step) {
      case 1:
        return helpTips.filter(tip => tip.category === "general")
      case 2:
        return helpTips.filter(tip => tip.category === "pricing")
      case 3:
        return helpTips.filter(tip => tip.category === "security")
      case 4:
        return helpTips.filter(tip => tip.category === "marketing")
      default:
        return helpTips
    }
  }

  const filteredTips = activeCategory === "all" 
    ? getStepSpecificTips(currentStep)
    : helpTips.filter(tip => tip.category === activeCategory)

  return (
    <>
      {/* Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50"
        size="icon"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>

      {/* Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">💡 Panduan Cerdas</h2>
                    <p className="text-slate-400 text-sm">Tips untuk listing yang sukses</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Step Indicator */}
                <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">
                      Langkah {currentStep} dari 4
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {currentStep === 1 && "Pilih asset terbaik dengan bantuan analisis AI"}
                    {currentStep === 2 && "Tentukan harga optimal berdasarkan data pasar"}
                    {currentStep === 3 && "Konfigurasi pembayaran yang aman dan nyaman"}
                    {currentStep === 4 && "Review final dan publikasi listing Anda"}
                  </p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  <Button
                    variant={activeCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory("all")}
                    className={activeCategory === "all" ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300"}
                  >
                    Semua
                  </Button>
                  {["pricing", "marketing", "security", "general"].map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={activeCategory === category ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300"}
                    >
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(category)}
                        {category === "pricing" && "Harga"}
                        {category === "marketing" && "Marketing"}
                        {category === "security" && "Keamanan"}
                        {category === "general" && "Umum"}
                      </span>
                    </Button>
                  ))}
                </div>

                {/* Tips List */}
                <div className="space-y-4">
                  {filteredTips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                              {tip.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-white mb-1 text-sm">
                                {tip.title}
                              </h3>
                              <p className="text-slate-300 text-xs leading-relaxed">
                                {tip.content}
                              </p>
                              <Badge 
                                variant="outline" 
                                className="mt-2 text-xs border-slate-600 text-slate-400"
                              >
                                {tip.category === "pricing" && "💰 Pricing"}
                                {tip.category === "marketing" && "📈 Marketing"}
                                {tip.category === "security" && "🛡️ Security"}
                                {tip.category === "general" && "💡 General"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-white font-medium mb-3 text-sm">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <span className="text-xs">📊 Lihat Tren Pasar</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <span className="text-xs">🤖 Chat dengan AI Assistant</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <span className="text-xs">📖 Baca Documentation</span>
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
