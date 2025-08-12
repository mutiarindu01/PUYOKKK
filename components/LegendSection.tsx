"use client"

import { Star, Trophy, Flame, Crown, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const LegendSection = () => {
  const achievements = [
    {
      title: "Pioneer Explorer",
      description: "Pembeli pertama di PUYOK",
      rarity: "1/1",
      icon: <Star className="h-8 w-8 text-yellow-400" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Volume King",
      description: "Mencapai Rp 1M transaksi",
      rarity: "1/10",
      icon: <Trophy className="h-8 w-8 text-blue-400" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Community Star",
      description: "Membantu 50+ pengguna",
      rarity: "1/25",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      color: "from-orange-500 to-red-500"
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
        
        {/* Header */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-slate-800/30 border border-slate-600/30 rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-semibold">EKOSISTEM LEGENDA</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-yellow-500 rounded-full"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Jadilah
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Legenda PUYOK</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Setiap aksi luar biasa Anda diabadikan sebagai NFT eksklusif yang tidak bisa dibeli, 
            hanya bisa diraih dengan pencapaian istimewa
          </p>
        </motion.div>
        
        {/* Main Showcase */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                
                {/* NFT Showcase */}
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                    
                    {/* NFT Card */}
                    <div className="relative bg-slate-900 rounded-2xl p-6 border border-slate-600/50 w-80 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div 
                          className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-full mb-6"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <div className="bg-slate-900 rounded-full p-4">
                            <Star className="h-16 w-16 text-white" />
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pioneer Explorer</h3>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-2">
                          NFT 1/1 Eksklusif
                        </Badge>
                        <p className="text-slate-400 text-sm">
                          Tidak bisa dibeli • Hanya bisa diraih
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-6">
                      🏆 Perburuan Harta Karun Digital
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-300 leading-relaxed">
                        Di PUYOK, setiap pencapaian unik Anda diabadikan sebagai <span className="text-yellow-400 font-semibold">NFT eksklusif 1-of-1</span>. 
                        Seperti pembelian pertama, volume transaksi tertinggi, atau kontribusi ke komunitas - 
                        semua menjadi bukti kelegendarisan Anda.
                      </p>
                      
                      <p className="text-gray-300 leading-relaxed">
                        NFT Legenda ini bukan sekadar koleksi, tetapi <span className="text-green-400 font-semibold">kunci akses</span> ke 
                        fitur premium, event eksklusif, dan privilege khusus dalam ekosistem PUYOK.
                      </p>
                    </div>
                    
                    {/* Benefits */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-500/10 p-2 rounded-lg">
                          <Zap className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Akses Fitur Premium</h4>
                          <p className="text-gray-400 text-sm">Trading tools advanced, analytics, dan priority support</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500/10 p-2 rounded-lg">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Event Eksklusif</h4>
                          <p className="text-gray-400 text-sm">Private sales, meet & greet dengan creator, workshop khusus</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500/10 p-2 rounded-lg">
                          <Crown className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Status Prestige</h4>
                          <p className="text-gray-400 text-sm">Badge khusus, profil highlight, dan pengakuan komunitas</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Achievements Gallery */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            🎯 Pencapaian yang Bisa Anda Raih
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-600/30 hover:border-green-500/50 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      
                      {/* Icon with Gradient Background */}
                      <motion.div 
                        className={`bg-gradient-to-r ${achievement.color} p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <div className="bg-slate-900 rounded-full p-3">
                          {achievement.icon}
                        </div>
                      </motion.div>
                      
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {achievement.description}
                      </p>
                      <Badge className={`bg-gradient-to-r ${achievement.color} text-white border-none`}>
                        Rarity: {achievement.rarity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-slate-800/30 to-gray-800/30 border border-slate-600/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 Siap Memulai Perjalanan Legenda?
              </h3>
              <p className="text-gray-300 mb-6">
                Bergabunglah dengan komunitas elite PUYOK dan raih NFT eksklusif pertama Anda hari ini
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-yellow-500/25 transition-all"
                  asChild
                >
                  <Link href="/marketplace">
                    🏆 Mulai Perjalanan Legenda
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/help">
                    📚 Pelajari Lebih Lanjut
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LegendSection
