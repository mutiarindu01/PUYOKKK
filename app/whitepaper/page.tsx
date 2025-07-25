"use client"

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Footer from "@/components/Footer"
import {
  ArrowLeft,
  Download,
  FileText,
  Target,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Rocket,
  Building2,
  CreditCard,
  Smartphone,
  BarChart3,
  Network,
  Lock,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Handshake,
  Award,
} from "lucide-react"

export default function WhitepaperPage() {
  const handleDownloadPDF = () => {
    // In real implementation, this would download the actual PDF
    const link = document.createElement("a")
    link.href = "/whitepaper-puyok-2024.pdf" // This would be the actual PDF path
    link.download = "PUYOK-Whitepaper-2024.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Platform Global Kompleks",
      description: "Interface rumit, fee tinggi (10-15%), dan KYC yang memakan waktu lama membuat barrier to entry tinggi bagi kreator Indonesia.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: "Pembayaran Tidak Lokal",
      description: "Kebanyakan platform hanya support cryptocurrency atau USD, sulit untuk menerima pembayaran dalam Rupiah dari pembeli lokal.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Gap Adopsi Mainstream",
      description: "Masyarakat umum masih kesulitan memahami dan menggunakan platform Web3 yang memerlukan pengetahuan teknis tinggi.",
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Kurangnya Konteks Lokal",
      description: "Platform global tidak memahami kebutuhan, budaya, dan preferensi pasar Indonesia dalam bertransaksi aset digital.",
    },
  ]

  const solutions = [
    {
      icon: <Smartphone className="w-8 h-8 text-green-500" />,
      title: "Interface Familiar",
      description: "Desain seperti e-commerce lokal yang sudah familiar, dengan proses yang sederhana dan intuitif untuk semua kalangan.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Pembayaran Lokal",
      description: "DANA, GoPay, OVO, dan transfer bank langsung dalam Rupiah. Tidak perlu konversi atau fees tersembunyi.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Sistem Escrow Aman",
      description: "Teknologi blockchain dikemas dalam sistem escrow otomatis yang melindungi pembeli dan penjual tanpa kompleksitas teknis.",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Fokus Indonesia",
      description: "Dibangun khusus untuk pasar Indonesia dengan customer support 24/7 dalam Bahasa Indonesia dan compliance lokal.",
    },
  ]

  const roadmapPhases = [
    {
      phase: "Fase 1",
      title: "Foundation & Launch",
      period: "Q1-Q2 2024",
      status: "completed",
      progress: 100,
      milestones: [
        "Platform MVP dengan basic trading",
        "Integrasi pembayaran lokal (DANA, GoPay, OVO)",
        "Sistem escrow otomatis",
        "User onboarding yang mudah",
        "Community building 1,000+ users",
      ],
      color: "bg-green-500",
    },
    {
      phase: "Fase 2", 
      title: "Scale & Optimize",
      period: "Q3-Q4 2024",
      status: "in-progress",
      progress: 65,
      milestones: [
        "Advanced trading features",
        "Mobile app launch (iOS & Android)",
        "Verified seller program",
        "Referral & loyalty program",
        "Partnership dengan exchanges lokal",
      ],
      color: "bg-blue-500",
    },
    {
      phase: "Fase 3",
      title: "Expansion & Innovation",
      period: "Q1-Q2 2025",
      status: "planned",
      progress: 0,
      milestones: [
        "Cross-chain NFT support",
        "Creator monetization tools",
        "Institutional partnerships",
        "Southeast Asia expansion",
        "DeFi integration & yield farming",
      ],
      color: "bg-purple-500",
    },
  ]

  const metrics = [
    { label: "Target Users 2024", value: "50,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Projected Volume", value: "Rp 100M+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Platform Fee", value: "2.5%", icon: <DollarSign className="w-5 h-5" /> },
    { label: "Transaction Speed", value: "<30 min", icon: <Clock className="w-5 h-5" /> },
  ]

  const keyFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Settlement",
      description: "Pembayaran langsung ke rekening penjual dengan verifikasi otomatis dalam hitungan menit.",
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      title: "Escrow Protection", 
      description: "Sistem escrow blockchain yang melindungi aset hingga pembayaran dikonfirmasi.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Low Fees",
      description: "Fee platform hanya 2.5%, jauh lebih rendah dari kompetitor global yang mencapai 10-15%.",
    },
    {
      icon: <Network className="w-6 h-6 text-purple-500" />,
      title: "Multi-Chain",
      description: "Support berbagai blockchain (Ethereum, BSC, Polygon) untuk maksimal compatibility.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Whitepaper PUYOK</h1>
                <p className="text-sm text-muted-foreground">Dokumen Teknis & Visi Platform</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Version 2.0 - 2024
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700 mb-6">
            <FileText className="w-4 h-4" />
            Official PUYOK Whitepaper
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Whitepaper PUYOK:
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Menjembatani Ekonomi Digital & Riil
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Dokumen komprehensif yang menguraikan visi, teknologi, dan strategi PUYOK dalam mentransformasi 
            ekosistem aset digital Indonesia melalui pendekatan yang user-friendly dan terintegrasi dengan sistem pembayaran lokal.
          </p>
          
          {/* Primary CTA */}
          <Button
            size="lg"
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Whitepaper Lengkap (PDF)
          </Button>
          
          <div className="flex items-center justify-center gap-8 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>32 Halaman</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Bahasa Indonesia & English</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Update Januari 2024</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((metric) => (
            <Card key={metric.label} className="text-center p-6 border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2 text-primary">
                {metric.icon}
                <span className="text-2xl font-bold">{metric.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </div>

        {/* Abstract Section */}
        <Card className="mb-16 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
              Abstrak Eksekutif
            </CardTitle>
            <CardDescription>Ringkasan visi dan misi PUYOK dalam mentransformasi ekonomi digital Indonesia</CardDescription>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed">
            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">PUYOK</strong> adalah marketplace peer-to-peer (P2P) yang dirancang khusus untuk 
              mengatasi hambatan adopsi aset digital di Indonesia. Melalui integrasi mendalam dengan sistem pembayaran lokal 
              seperti DANA, GoPay, OVO, dan transfer bank, PUYOK menjembatani kesenjangan antara ekonomi digital dan riil.
            </p>
            <p className="text-muted-foreground mb-6">
              Platform ini menggabungkan teknologi blockchain yang canggih dengan user experience yang familiar bagi masyarakat 
              Indonesia, memungkinkan perdagangan NFT dan cryptocurrency dengan cara yang aman, mudah, dan cost-effective. 
              Sistem escrow otomatis memastikan keamanan transaksi tanpa memerlukan pengetahuan teknis yang mendalam dari pengguna.
            </p>
            <p className="text-muted-foreground">
              Dengan visi menjadi "Tokopedia-nya aset digital Indonesia", PUYOK menargetkan penetrasi pasar mainstream melalui 
              pendekatan yang mengutamakan <strong className="text-foreground">kemudahan, keamanan, dan keterjangkauan</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Problems & Solutions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Masalah & Solusi</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mengidentifikasi tantangan utama dalam adopsi aset digital dan bagaimana PUYOK memberikan solusi inovatif
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problems Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Masalah yang Dihadapi</h3>
              </div>
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <Card key={index} className="p-6 border border-red-200 bg-red-50/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {problem.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{problem.title}</h4>
                        <p className="text-muted-foreground text-sm">{problem.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Solusi PUYOK</h3>
              </div>
              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <Card key={index} className="p-6 border border-green-200 bg-green-50/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {solution.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{solution.title}</h4>
                        <p className="text-muted-foreground text-sm">{solution.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Teknologi dan fitur yang membedakan PUYOK dari platform kompetitor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Roadmap Visualization */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Roadmap Pengembangan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Perjalanan strategis PUYOK dari MVP hingga menjadi platform aset digital terdepan di Asia Tenggara
            </p>
          </div>

          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => (
              <Card key={index} className={`border-l-4 ${phase.color === 'bg-green-500' ? 'border-green-500' : phase.color === 'bg-blue-500' ? 'border-blue-500' : 'border-purple-500'} p-6`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className={`w-12 h-12 ${phase.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{phase.phase}: {phase.title}</h3>
                      <p className="text-muted-foreground">{phase.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {phase.status === 'completed' ? '✅ Selesai' :
                       phase.status === 'in-progress' ? '🚧 Dalam Progres' :
                       '📋 Direncanakan'}
                    </Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {phase.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' && idx < 3 ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                      <span className="text-muted-foreground">{milestone}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Opportunity */}
        <Card className="mb-16 border border-purple-200 bg-gradient-to-br from-purple-50 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Peluang Pasar
            </CardTitle>
            <CardDescription>Analisis potensi pasar aset digital Indonesia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">270 Juta</div>
                <p className="text-sm text-muted-foreground">Populasi Indonesia</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Rp 2.3T</div>
                <p className="text-sm text-muted-foreground">Market Cap Crypto Indonesia</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">150 Juta</div>
                <p className="text-sm text-muted-foreground">Pengguna E-wallet Aktif</p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground text-center">
              Dengan tingkat adopsi digital yang tinggi dan ekosistem fintech yang matang, Indonesia memiliki potensi besar 
              untuk menjadi hub aset digital Asia Tenggara. PUYOK diposisikan untuk menangkap peluang ini melalui pendekatan yang sesuai dengan kondisi lokal.
            </p>
          </CardContent>
        </Card>

        {/* Team & Partners */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tim & Partner</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Didukung oleh tim berpengalaman dan ekosistem partner strategis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Core Team
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• 10+ tahun pengalaman gabungan di fintech dan blockchain</p>
                <p>• Ex-engineers dari Tokopedia, Gojek, dan Binance</p>
                <p>• Strong background di product, engineering, dan business development</p>
                <p>• Deep understanding tentang pasar Indonesia</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                Strategic Partners
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Partnership dengan payment gateways utama Indonesia</p>
                <p>• Kolaborasi dengan exchanges crypto terkemuka</p>
                <p>• Advisory dari praktisi blockchain dan fintech senior</p>
                <p>• Support dari komunitas developer dan creator lokal</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center p-12 border border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Bergabunglah dalam Revolusi Digital Indonesia
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Download whitepaper lengkap untuk memahami visi teknis, analisis pasar mendalam, 
              tokenomics, dan strategi go-to-market PUYOK secara komprehensif.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={handleDownloadPDF}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Whitepaper Lengkap (PDF)
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/help">
                  <FileText className="w-5 h-5 mr-2" />
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>32 Halaman Komprehensif</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Untuk Investor & Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Gratis & No Registration</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
