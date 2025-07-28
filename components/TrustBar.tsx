"use client"

import { Shield, FileText, Lock, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface TrustItemProps {
  icon: React.ReactNode
  text: string
  href?: string
}

const TrustItem = ({ icon, text, href }: TrustItemProps) => (
  <motion.div 
    className="flex items-center space-x-2 group"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-green-500 transition-transform group-hover:scale-110">
      {icon}
    </div>
    {href ? (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/80 hover:text-green-400 transition-colors text-sm md:text-base font-medium"
      >
        {text}
      </a>
    ) : (
      <span className="text-white/80 text-sm md:text-base font-medium">
        {text}
      </span>
    )}
  </motion.div>
)

const TrustBar = () => {
  const trustItems = [
    {
      icon: <Shield className="h-6 w-6" />,
      text: "Escrow Terverifikasi Etherscan",
      href: "https://etherscan.io/address/0x86391db0f7614e31cbaefb0b881f2fb3dbffbffb"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      text: "Kontrak Open Source",
      href: "https://github.com/puyok/puyok-contracts"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      text: "SSL & Enkripsi Data",
      href: "#security"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      text: "Terdaftar BAPPEBTI",
      href: "#compliance"
    }
  ]

  return (
    <motion.div 
      className="bg-gray-900/80 backdrop-blur-sm py-6 border-t border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div 
            className="text-white font-bold text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            🔐 Platform Terpercaya oleh 15.000+ Pengguna
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                <TrustItem {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TrustBar
