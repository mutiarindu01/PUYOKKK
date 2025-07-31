"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Twitter,
  Instagram, 
  MessageCircle,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Shield,
  CheckCircle,
  Globe,
  ChevronUp,
  Download,
  Smartphone,
  Users,
  Clock,
  TrendingUp,
  Star,
  Award,
  Lock,
  Zap,
  CreditCard,
  HeadphonesIcon,
  ArrowUp,
  Play,
  FileText,
  HelpCircle,
  Settings,
  Eye,
  ShieldCheck,
  Gavel,
  Building2,
  Code,
  ChatBubbleIcon
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(true)

  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigationLinks = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "NFT", href: "/nft" },
    { label: "Token", href: "/tokens" },
    { label: "Pioneer NFT", href: "/pioneer" },
    { label: "Koleksi", href: "/collections" },
    { label: "Aktivitas", href: "/activity" }
  ]

  const serviceLinks = [
    { label: "Pusat Bantuan", href: "/help", icon: <HelpCircle className="w-4 h-4" /> },
    { label: "Biaya Layanan", href: "/fees", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Cara Kerja Escrow", href: "/escrow", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Transaksi Gasless", href: "/gasless", icon: <Zap className="w-4 h-4" /> },
    { label: "Keamanan", href: "/security", icon: <Shield className="w-4 h-4" /> },
    { label: "API Developer", href: "/api", icon: <Code className="w-4 h-4" /> }
  ]

  const legalLinks = [
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Kebijakan KYC", href: "/kyc" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Pengaturan Cookie", href: "/cookies" }
  ]

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/PuyokOfficial",
      icon: <Twitter className="w-4 h-4" />,
      color: "hover:bg-blue-400"
    },
    {
      name: "Discord",
      href: "https://discord.gg/puyok",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "hover:bg-indigo-500"
    },
    {
      name: "Telegram",
      href: "https://t.me/PuyokOfficial",
      icon: <Send className="w-4 h-4" />,
      color: "hover:bg-sky-500"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/puyok.official",
      icon: <Instagram className="w-4 h-4" />,
      color: "hover:bg-pink-500"
    }
  ]

  const paymentPartners = [
    { name: "DANA", logo: "/dana-logo.png" },
    { name: "GoPay", logo: "/gopay-logo.png" },
    { name: "OVO", logo: "/ovo-logo.png" },
    { name: "BCA", logo: "/bca-logo.png" }
  ]

  const regulatoryBadges = [
    { name: "BAPPEBTI", logo: "/bappebti-logo.png", alt: "BAPPEBTI Registered" },
    { name: "Kominfo", logo: "/kominfo-logo.png", alt: "Kominfo Certified" },
    { name: "ISO 27001", logo: "/iso-logo.png", alt: "ISO 27001 Certified" }
  ]

  const securityBadges = [
    { name: "SSL Secured", icon: <Lock className="w-4 h-4" /> },
    { name: "Smart Contract Audited", icon: <Code className="w-4 h-4" /> },
    { name: "KYC Verified", icon: <CheckCircle className="w-4 h-4" /> }
  ]



  return (
    <footer className="bg-gray-900 text-gray-100 relative">


      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Social - Column 1 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F78dd0b4d06b0470ca31749b6b150d462?format=webp&width=800"
                alt="PUYOK Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="text-3xl font-bold text-white">
                PUYOK
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Marketplace P2P pertama di Indonesia untuk NFT & Token. 
              Tukar aset digital dengan Rupiah secara aman dan mudah.
            </p>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Ikuti Kami
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`border-gray-600 hover:border-emerald-500 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}>
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                Download Aplikasi
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-black hover:bg-gray-800 text-white border border-gray-600 justify-start" disabled>
                  <Play className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">Soon</Badge>
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white border border-gray-600 justify-start" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">Soon</Badge>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation - Column 2 */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Navigasi</h4>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Column 3 */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Layanan</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-base"
                  >
                    <span className="text-emerald-400">{link.icon}</span>
                    {link.label}
                  </Link>
                  {link.badge && (
                    <Badge variant="secondary" className="text-xs bg-emerald-600 text-white">
                      {link.badge}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter - Column 4 */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Tetap Terhubung</h4>
            
            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-gray-300 mb-4 text-sm">
                Dapatkan update fitur baru & promo eksklusif
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Berhasil!
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Berlangganan
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                * Kami menghormati privasi Anda
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:support@puyok.io" className="hover:text-emerald-400 transition-colors">
                  support@puyok.io
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:+622112345678" className="hover:text-emerald-400 transition-colors">
                  +62 21 1234 5678
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Jakarta Digital Hub, SCBD Lot 9</span>
              </div>
              
              {/* Live Support Status */}
              <div className="flex items-center gap-2 mt-4 p-3 bg-emerald-600/10 rounded-lg border border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 text-sm font-medium">Tim Support online 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Partners */}

      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Security & Trust Badges */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {securityBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-emerald-400">
                  {badge.icon}
                  <span className="text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mb-6 bg-gray-600" />

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-300 font-medium mb-2">
                © {currentYear} PT PUYOK INOVASI DIGITAL. Seluruh hak cipta dilindungi.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
                {legalLinks.map((link, index) => (
                  <span key={link.label}>
                    <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                      {link.label}
                    </Link>
                    {index < legalLinks.length - 1 && <span className="ml-4">•</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Regulatory Badges */}
            <div className="flex items-center gap-4">
              {regulatoryBadges.map((badge) => (
                <div key={badge.name} className="bg-white rounded-lg p-2 w-16 h-12 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-gray-800">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Links */}
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400 mb-2">Kontrak Smart Contract:</p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="https://etherscan.io/address/0x863...bffb" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                Kontrak Escrow <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-gray-600">|</span>
              <a href="https://polygonscan.com/address/0x92a...d4e" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                Kontrak Gasless <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-12 h-12 p-0 shadow-lg z-50 transition-all duration-300"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  )
}
