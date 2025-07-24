import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Twitter,
  Instagram,
  MessageCircle,
  Youtube,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Shield,
  CheckCircle,
  Globe,
  Heart,
  TrendingUp,
  Users,
  Star,
  Clock,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { label: "Marketplace NFT", href: "/#marketplace" },
    { label: "Trading Token", href: "/#marketplace" },
    { label: "Wallet Integration", href: "/help" },
    { label: "Mobile App", href: "#", badge: "Soon" },
    { label: "API Developer", href: "#", badge: "Beta" },
  ]

  const companyLinks = [
    { label: "Tentang Kami", href: "/about" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Tim", href: "/team" },
    { label: "Karir", href: "/careers", badge: "We're Hiring!" },
    { label: "Blog & News", href: "/blog" },
    { label: "Press Kit", href: "/press" },
  ]

  const supportLinks = [
    { label: "Pusat Bantuan", href: "/help" },
    { label: "Status Sistem", href: "/status", external: true },
    { label: "Hubungi Kami", href: "/contact" },
    { label: "Community Forum", href: "/community", external: true },
    { label: "Bug Report", href: "/bug-report" },
  ]

  const legalLinks = [
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Kebijakan Cookie", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "AML & KYC Policy", href: "/aml-policy" },
  ]

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/PuyokOfficial",
      icon: <Twitter className="w-5 h-5" />,
      color: "hover:bg-blue-400 hover:text-white",
    },
    {
      name: "Instagram", 
      href: "https://instagram.com/puyok.official",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/6281112345678",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "hover:bg-green-500 hover:text-white",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@PuyokOfficial",
      icon: <Youtube className="w-5 h-5" />,
      color: "hover:bg-red-500 hover:text-white",
    },
    {
      name: "Telegram",
      href: "https://t.me/PuyokOfficial",
      icon: <Globe className="w-5 h-5" />,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/puyok",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:bg-blue-600 hover:text-white",
    },
  ]

  const trustIndicators = [
    {
      icon: <Shield className="w-4 h-4 text-green-600" />,
      text: "SSL Encrypted",
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-blue-600" />,
      text: "Registered Business",
    },
    {
      icon: <Users className="w-4 h-4 text-purple-600" />,
      text: "10,000+ Users",
    },
    {
      icon: <Star className="w-4 h-4 text-yellow-600" />,
      text: "4.8/5 Rating",
    },
  ]

  const stats = [
    { label: "Total Transaksi", value: "Rp 12.5M+", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Pengguna Aktif", value: "10,000+", icon: <Users className="w-4 h-4" /> },
    { label: "Uptime", value: "99.9%", icon: <Clock className="w-4 h-4" /> },
  ]

  return (
    <footer className="bg-gradient-to-br from-card/80 to-muted/30 border-t border-border">
      {/* Stats Section */}
      <div className="border-b border-border bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">PUYOK dalam Angka</h3>
            <p className="text-sm text-muted-foreground">Platform terpercaya untuk aset digital Indonesia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-primary">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F78dd0b4d06b0470ca31749b6b150d462?format=webp&width=800"
                alt="PUYOK Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="text-2xl font-bold text-foreground">PUYOK</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  v2.0
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Marketplace P2P terpercaya untuk aset digital Indonesia. Tukar NFT & Token dengan Rupiah secara aman dan 
              mudah menggunakan DANA, GoPay, OVO, dan transfer bank.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@puyok.id" className="hover:text-foreground transition-colors">
                  support@puyok.id
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+6281112345678" className="hover:text-foreground transition-colors">
                  +62 811-1234-5678
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Ikuti Kami</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`transition-all duration-200 ${social.color}`}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}>
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produk</h3>
            <div className="space-y-3">
              {productLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                  {link.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {link.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Perusahaan</h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                  {link.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {link.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Bantuan</h3>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                {indicator.icon}
                <span className="text-sm text-muted-foreground">{indicator.text}</span>
              </div>
            ))}
          </div>

          <Separator className="mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                &copy; {currentYear} PUYOK. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                PT. Puyok Digital Indonesia | Terdaftar di Kementerian Komunikasi dan Informatika
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistem Online</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span>🇮🇩</span>
                <span>Made in Indonesia</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                <span>Powered by Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
