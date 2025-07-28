"use client"

import { Zap, DollarSign, Wallet, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const GaslessSection = () => {
  const benefits = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      text: "Tanpa biaya tersembunyi"
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      text: "Tidak perlu crypto wallet"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      text: "Transaksi lebih cepat"
    }
  ]

  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-slate-900/30 via-background to-gray-900/30 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  
                  {/* Icon Section */}
                  <motion.div 
                    className="flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30">
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Zap className="h-20 w-20 text-green-500" />
                        </motion.div>
                      </div>
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-2xl bg-green-500/20 animate-ping" />
                    </div>
                  </motion.div>
                  
                  {/* Content Section */}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                        ⚡ GASLESS TECHNOLOGY
                      </Badge>
                      
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Transaksi Tanpa Biaya Gas
                      </h2>
                      
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          💌 <strong className="text-white">Bayangkan mengirim paket tanpa perlu repot membeli perangko.</strong> 
                          Itulah yang kami lakukan untuk transaksi blockchain Anda!
                        </p>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500/10 p-2 rounded-lg mt-1">
                            <DollarSign className="h-5 w-5 text-green-500" />
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            <span className="text-green-400 font-bold">PUYOK menanggung semua biaya gas</span> sehingga Anda bisa bertransaksi 
                            dengan nyaman menggunakan mata uang Rupiah, tanpa perlu memahami kompleksitas blockchain.
                          </p>
                        </div>
                      </div>
                      
                      {/* Benefits Tags */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600/30 px-4 py-2 rounded-full text-sm text-white hover:border-green-500/50 transition-colors">
                              <div className="text-green-500">
                                {benefit.icon}
                              </div>
                              {benefit.text}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">0%</div>
                          <div className="text-sm text-gray-400">Biaya Gas</div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">2 min</div>
                          <div className="text-sm text-gray-400">Verifikasi</div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4 text-center col-span-2 md:col-span-1">
                          <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                          <div className="text-sm text-gray-400">Gas Sponsored</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default GaslessSection
