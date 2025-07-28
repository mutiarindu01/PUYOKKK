"use client"

import { Upload, CreditCard, CheckCircle, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const SafeTransactionSteps = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Jual & Escrow",
      description: "List aset Anda. Sistem escrow otomatis mengamankan aset hingga pembayaran dikonfirmasi."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Bayar & Verifikasi", 
      description: "Pembeli transfer via DANA/GoPay/OVO. Verifikasi instan dengan AI kami dalam 2 menit."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Aset Terkirim",
      description: "Setelah pembayaran diverifikasi, aset otomatis dikirim ke pembeli. Dana masuk ke penjual."
    }
  ]

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
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-semibold">KEAMANAN TERJAMIN</span>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Transaksi Aman dalam
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500"> 3 Langkah</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Sistem escrow kami menjamin keamanan bagi penjual dan pembeli dengan teknologi blockchain terdepan
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 hover:border-green-500/50 transition-all duration-300 h-full group">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="bg-slate-700/50 rounded-full p-4 border border-slate-600/30 group-hover:border-green-500/50 transition-all duration-300">
                        <div className="text-green-500 group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                        </div>
                      </div>
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 bg-green-500 text-gray-900 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold border-2 border-background">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-green-900/20 to-slate-800/30 border border-green-500/30 p-8">
            <div className="flex items-start gap-4">
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3">
                  🛡️ Garansi 100% Uang Kembali
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Jika terjadi masalah dalam transaksi, dana akan dikembalikan ke pembeli atau diselesaikan melalui 
                  mekanisme dispute yang diawasi oleh tim independen PUYOK dalam waktu maksimal 24 jam.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-white border border-slate-600/30">
                    ✅ Dispute Resolution 24/7
                  </div>
                  <div className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-white border border-slate-600/30">
                    🔐 Smart Contract Protection
                  </div>
                  <div className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-white border border-slate-600/30">
                    ⚡ Instant Refund System
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SafeTransactionSteps
