"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Footer from "@/components/Footer"
import {
  ArrowLeft,
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Shield,
  CreditCard,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Lock,
  Smartphone,
  Globe,
  Star,
  BookOpen,
  FileText,
  Lightbulb,
  Target,
} from "lucide-react"

// FAQ Data struktur berdasarkan kategori
const faqData = [
  {
    category: "Memulai di PUYOK",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-500",
    description: "Panduan untuk pengguna baru",
    questions: [
      {
        id: "getting-started-1",
        question: "Apa itu PUYOK dan bagaimana cara kerjanya?",
        answer: `PUYOK adalah marketplace P2P (peer-to-peer) pertama di Indonesia yang memungkinkan Anda menjual dan membeli aset digital seperti NFT dan cryptocurrency dengan pembayaran lokal seperti DANA, GoPay, OVO, dan transfer bank.

**Cara Kerja:**
1. **Penjual** listing aset dengan harga dalam Rupiah
2. **Pembeli** transfer uang ke rekening penjual
3. **Sistem escrow** mengamankan aset hingga pembayaran dikonfirmasi
4. **Aset otomatis** ditransfer ke wallet pembeli setelah verifikasi

Semua proses diamankan dengan sistem escrow otomatis yang melindungi kedua belah pihak.`,
        tags: ["pemula", "cara kerja", "escrow"],
      },
      {
        id: "getting-started-2",
        question: "Bagaimana cara mendaftar akun di PUYOK?",
        answer: `Mendaftar di PUYOK sangat mudah:

**Langkah Pendaftaran:**
1. Klik tombol "Masuk" di halaman utama
2. Pilih "Daftar Akun Baru"
3. Masukkan nomor HP dan email
4. Verifikasi dengan kode OTP
5. Lengkapi profil dasar Anda

**Yang Dibutuhkan:**
- Nomor HP aktif untuk verifikasi
- Email yang valid
- Foto profil (opsional)

Tidak ada KYC rumit seperti platform global. Anda bisa langsung mulai bertransaksi!`,
        tags: ["daftar", "registrasi", "akun"],
      },
      {
        id: "getting-started-3", 
        question: "Bisakah saya langsung jual aset tanpa verifikasi KYC?",
        answer: `Ya! Untuk transaksi di bawah Rp 50 juta per bulan, Anda tidak perlu KYC. Cukup:

**Verifikasi Dasar:**
- Nomor HP terverifikasi
- Email aktif
- Nama di rekening bank/e-wallet sesuai dengan nama profil

**Verifikasi KTP** hanya diperlukan jika:
- Transaksi bulanan > Rp 50 juta
- Ingin akses fitur premium
- Menjadi verified seller

Ini salah satu keunggulan PUYOK dibanding platform global yang mengharuskan KYC dari awal.`,
        tags: ["kyc", "verifikasi", "limit"],
      },
    ],
  },
  {
    category: "Jual Beli & Transaksi", 
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-green-500",
    description: "Panduan transaksi aman",
    questions: [
      {
        id: "trading-1",
        question: "Bagaimana cara menjual NFT atau token di PUYOK?",
        answer: `**Langkah Menjual Aset:**

1. **Persiapan:**
   - Pastikan aset ada di wallet Anda
   - Tambahkan metode pembayaran (DANA/GoPay/Bank)

2. **Listing:**
   - Klik "Jual Aset" di dashboard
   - Upload gambar NFT atau pilih token
   - Set harga dalam Rupiah
   - Pilih metode pembayaran yang diterima

3. **Proses Penjualan:**
   - Aset dikunci di sistem escrow
   - Pembeli transfer ke rekening Anda
   - Upload bukti pembayaran untuk verifikasi
   - Aset otomatis dikirim setelah konfirmasi

**Tips Sukses:**
- Set harga kompetitif sesuai market
- Tambahkan deskripsi menarik
- Respon cepat untuk pertanyaan pembeli`,
        tags: ["jual", "listing", "nft", "token"],
      },
      {
        id: "trading-2",
        question: "Apa itu sistem escrow dan bagaimana melindungi saya?",
        answer: `**Sistem Escrow PUYOK** adalah fitur keamanan utama yang melindungi semua transaksi:

**Untuk Penjual:**
- Aset Anda dikunci aman hingga pembayaran masuk
- Tidak bisa dicuri atau dirugikan
- Otomatis dapat uang setelah konfirmasi

**Untuk Pembeli:**
- Uang tidak hilang jika penjual tidak kirim aset
- Aset dijamin masuk ke wallet setelah bayar
- Bisa komplain jika ada masalah

**Proses Escrow:**
1. Penjual listing → aset dikunci sistem
2. Pembeli bayar → upload bukti transfer  
3. Sistem verifikasi → maksimal 30 menit
4. Aset otomatis kirim → penjual dapat uang

Jika ada dispute, tim support PUYOK akan mediasi dalam 24 jam.`,
        tags: ["escrow", "keamanan", "perlindungan"],
      },
      {
        id: "trading-3",
        question: "Berapa fee transaksi di PUYOK?",
        answer: `**Struktur Fee PUYOK:**

**Fee Penjual:**
- Fee platform: 2.5% dari nilai transaksi
- Fee payment gateway: 0.5% (untuk transfer bank)
- **Total maksimal: 3%**

**Fee Pembeli:**
- Gratis! Tidak ada fee untuk pembeli

**Dibanding Platform Global:**
- OpenSea: 2.5% + gas fee ETH (bisa Rp 500rb-2jt)
- Binance NFT: 1% + withdrawal fee
- **PUYOK: Hanya 2.5-3% total, no hidden fee**

**Bonus Referral:**
- Ajak teman dapat potongan 50% fee pertama
- Program tier bisa dapat cashback hingga 70%

Fee transparan, no hidden cost, lebih murah dari platform manapun!`,
        tags: ["fee", "biaya", "harga"],
      },
      {
        id: "trading-4",
        question: "Metode pembayaran apa saja yang didukung?",
        answer: `**E-Wallet (Instant):**
- DANA - Transfer langsung, verifikasi 5 menit
- GoPay - Scan QR atau transfer, verifikasi 5 menit  
- OVO - Transfer ke nomor, verifikasi 10 menit

**Bank Transfer (30 menit):**
- BCA, BRI, BNI, Mandiri
- Bank digital: Jenius, TMRW, Digibank
- Transfer antar bank 24/7

**Cryptocurrency (Advanced):**
- USDT (TRC20/ERC20) - untuk trader berpengalaman
- Bitcoin - untuk high-value transaction

**Tips Pembayaran:**
- E-wallet paling cepat dan mudah
- Pastikan nama rekening sesuai profil
- Screenshot bukti transfer untuk verifikasi cepat

Semua metode bebas biaya untuk pembeli!`,
        tags: ["pembayaran", "dana", "gopay", "bank"],
      },
    ],
  },
  {
    category: "Keamanan & Akun",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-red-500", 
    description: "Keamanan dan pengaturan akun",
    questions: [
      {
        id: "security-1",
        question: "Bagaimana PUYOK melindungi akun dan dana saya?",
        answer: `**Sistem Keamanan Berlapis:**

**1. Keamanan Akun:**
- 2FA dengan Google Authenticator
- SMS OTP untuk login mencurigakan
- Email notifikasi setiap aktivitas
- IP whitelist untuk akses aman

**2. Keamanan Transaksi:**
- Sistem escrow yang tidak bisa dimanipulasi
- Multi-signature wallet untuk aset besar
- Enkripsi end-to-end semua data
- Audit keamanan berkala

**3. Perlindungan Dana:**
- Rekening terpisah untuk setiap transaksi
- Tidak ada akses langsung ke wallet user
- Insurance coverage untuk kerugian sistem
- Garansi 100% uang kembali jika error platform

**4. Monitoring 24/7:**
- AI detection untuk aktivitas mencurigakan
- Human review untuk transaksi besar
- Instant freeze jika detect fraud

Lebih aman dari dompet fisik Anda!`,
        tags: ["keamanan", "2fa", "perlindungan"],
      },
      {
        id: "security-2",
        question: "Bagaimana jika lupa password atau kehilangan akses 2FA?",
        answer: `**Recovery Password:**

1. **Lupa Password:**
   - Klik "Lupa Password" di halaman login
   - Masukkan email terdaftar
   - Cek email untuk link reset
   - Buat password baru yang kuat

2. **Kehilangan 2FA:**
   - Login dengan backup codes yang disimpan
   - Atau hubungi support dengan foto KTP
   - Verifikasi identitas via video call
   - 2FA akan direset dalam 24 jam

3. **Akun Terkunci:**
   - Terjadi setelah 5x salah password
   - Auto unlock setelah 30 menit
   - Atau hubungi support untuk unlock manual

**Prevention Tips:**
- Simpan backup codes 2FA di tempat aman
- Gunakan password manager
- Update nomor HP jika ganti
- Backup recovery email

Support kami siap bantu 24/7 via WhatsApp!`,
        tags: ["password", "recovery", "2fa"],
      },
      {
        id: "security-3",
        question: "Apakah legal memperjualbelikan NFT di Indonesia?",
        answer: `**Status Legal NFT di Indonesia:**

**✅ Legal untuk:**
- Jual beli NFT sebagai koleksi digital
- Trading antar individu (P2P)
- Kepemilikan aset digital
- Transaksi dengan Rupiah

**⚠️ Perhatian:**
- Bukan instrumen investasi resmi OJK
- Tidak dijamin oleh LPS
- Risiko fluktuasi harga tinggi
- Pahami sebelum trading

**Compliance PUYOK:**
- Registered di Kemkominfo
- Patuh pajak sesuai aturan
- KYC sesuai standar PPATK
- Laporan transaksi berkala ke authorities

**Tips Legal:**
- Laporkan keuntungan untuk pajak
- Simpan record semua transaksi
- Jangan trading untuk money laundering
- Edukasi diri tentang risiko

PUYOK beroperasi sesuai koridor hukum Indonesia.`,
        tags: ["legal", "pajak", "compliance"],
      },
    ],
  },
  {
    category: "Troubleshooting",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "bg-orange-500",
    description: "Solusi masalah umum",
    questions: [
      {
        id: "trouble-1",
        question: "Transaksi saya pending lama, bagaimana solusinya?",
        answer: `**Penyebab & Solusi Transaksi Pending:**

**1. Pending Verifikasi Pembayaran (5-30 menit):**
- **Normal:** E-wallet 5 menit, bank 30 menit
- **Solusi:** Upload bukti transfer yang jelas
- **Tips:** Screenshot langsung setelah transfer

**2. Pending Review Manual (2-24 jam):**
- Terjadi untuk transaksi > Rp 10 juta
- Tim security review untuk keamanan
- **Solusi:** Tunggu atau hubungi support

**3. Masalah Teknis:**
- Server maintenance (jarang terjadi)
- Network blockchain congestion
- **Solusi:** Coba lagi atau hubungi support

**Cara Cek Status:**
1. Masuk ke dashboard → "Order Saya"
2. Lihat status detail dan estimasi waktu
3. Klik "Lihat Detail" untuk info lebih lanjut

**Kapan Harus Khawatir:**
- Pending > 24 jam tanpa update
- Status error atau gagal
- Tidak ada respon dari penjual/pembeli

Hubungi support jika pending > 24 jam!`,
        tags: ["pending", "lambat", "troubleshooting"],
      },
      {
        id: "trouble-2", 
        question: "Transfer sudah dikirim tapi tidak terdeteksi sistem?",
        answer: `**Langkah Troubleshooting Transfer:**

**1. Verifikasi Transfer:**
- Cek nama penerima sudah benar
- Pastikan nominal sesuai exact amount
- Screenshot bukti transfer harus jelas

**2. Upload Bukti yang Benar:**
- Format: JPG, PNG (maksimal 5MB)
- Harus terlihat: nama, nominal, waktu, status sukses
- Jangan crop berlebihan

**3. Waktu Verifikasi Normal:**
- DANA/GoPay: 5-15 menit
- OVO: 10-20 menit  
- Bank Transfer: 30-60 menit
- Weekend/holiday: bisa lebih lama

**4. Jika Masih Belum Terdeteksi:**
- Hubungi support via WhatsApp
- Kirim screenshot transfer + order ID
- Tim akan manual verifikasi dalam 2 jam

**5. Pencegahan:**
- Double check detail rekening
- Transfer exact amount (jangan lebih/kurang)
- Simpan bukti transfer sampai selesai

**Jangan panic!** 99% kasus bisa diselesaikan dengan upload bukti yang proper.`,
        tags: ["transfer", "tidak terdeteksi", "bukti"],
      },
      {
        id: "trouble-3",
        question: "NFT tidak masuk ke wallet setelah beli?",
        answer: `**Troubleshooting NFT Tidak Masuk:**

**1. Cek Status Transaksi:**
- Buka dashboard → "Order Saya"
- Status harus "Completed" baru NFT kirim
- Jika masih "Processing", tunggu verifikasi

**2. Cek Wallet Address:**
- Pastikan alamat wallet yang diberikan benar
- Support network yang sama (BSC, ETH, Polygon)
- Refresh wallet atau cek di block explorer

**3. Waktu Transfer Normal:**
- Instant setelah status "Completed"
- Blockchain confirmation: 5-15 menit
- Peak hours bisa lebih lama

**4. Network Congestion:**
- Ethereum gas fees tinggi = lambat
- BSC/Polygon biasanya lebih cepat
- Cek status di block explorer

**5. Jika 2 Jam Belum Masuk:**
- Screenshot order completed
- Berikan wallet address
- Hubungi support untuk tracking manual

**Tips:**
- Gunakan wallet yang support network NFT
- Jangan berikan private key ke siapapun
- Add custom token jika perlu

Tim teknis kami bisa track setiap transaksi blockchain!`,
        tags: ["nft", "wallet", "tidak masuk"],
      },
    ],
  },
  {
    category: "Program & Fitur",
    icon: <Star className="w-5 h-5" />,
    color: "bg-purple-500",
    description: "Referral dan fitur khusus",
    questions: [
      {
        id: "features-1",
        question: "Bagaimana cara kerja program referral PUYOK?",
        answer: `**Program Referral PUYOK - Win-Win Solution:**

**Untuk Teman yang Diundang:**
- Potongan 50% fee transaksi pertama
- Bonus welcome gift Rp 50.000
- Priority support selama 30 hari

**Untuk Anda (Pengundang):**
- Dapat 50% dari fee transaksi pertama teman
- Bonus tier sesuai jumlah referral aktif
- Cashback bulanan hingga Rp 500.000

**Cara Kerja:**
1. Dapatkan kode referral unik di dashboard
2. Bagikan ke teman via WhatsApp/sosmed
3. Teman daftar dengan kode Anda
4. Ketika teman bertransaksi pertama = Anda dapat bonus

**Tier System:**
- Bronze (0-9): Bonus standar
- Silver (10-24): +10% bonus  
- Gold (25-49): +25% bonus
- Platinum (50+): +50% bonus + benefits eksklusif

**Tips Sukses:**
- Target teman yang interested crypto/NFT
- Berikan edukasi tentang PUYOK
- Share pengalaman positif Anda

Program paling generous di Indonesia!`,
        tags: ["referral", "bonus", "tier"],
      },
      {
        id: "features-2",
        question: "Apa benefit menjadi verified seller di PUYOK?",
        answer: `**Benefit Verified Seller:**

**🔵 Badge Verification:**
- Centang biru di profil
- Prioritas di search results
- Increased buyer trust

**💰 Financial Benefits:**
- Fee lebih rendah (2% vs 2.5%)
- Withdrawal limit lebih tinggi
- Priority payment processing

**🚀 Marketing Support:**
- Featured di homepage
- Newsletter mention
- Social media promotion

**⚡ Exclusive Features:**
- Advanced analytics dashboard
- Custom referral page
- Bulk listing tools
- API access untuk automation

**🎯 Requirements:**
- Minimum 10 transaksi sukses
- Rating 4.5+ dari buyer
- KYC verification complete
- Consistent activity 30 hari

**🏆 Perks Tambahan:**
- Dedicated account manager
- Beta access fitur baru
- Exclusive seller community
- Monthly seller meetup

**Cara Apply:**
1. Lengkapi requirements di atas
2. Apply via dashboard → "Become Verified"
3. Review process 3-5 hari kerja
4. Interview dengan team (opsional)

Investment yang worth it untuk serious seller!`,
        tags: ["verified", "seller", "benefits"],
      },
    ],
  },
]

// Contact methods
const contactMethods = [
  {
    title: "WhatsApp Support",
    description: "Chat langsung dengan tim support 24/7",
    icon: <MessageCircle className="w-6 h-6" />,
    contact: "+62 811-1234-5678",
    action: "Chat Sekarang",
    link: "https://wa.me/6281112345678",
    color: "bg-green-500",
    available: "24/7",
  },
  {
    title: "Email Support", 
    description: "Untuk pertanyaan detail dan complaint",
    icon: <Mail className="w-6 h-6" />,
    contact: "support@puyok.id",
    action: "Kirim Email",
    link: "mailto:support@puyok.id",
    color: "bg-blue-500",
    available: "Respon 2-4 jam",
  },
  {
    title: "Telegram Channel",
    description: "Update dan pengumuman terbaru",
    icon: <Users className="w-6 h-6" />,
    contact: "@PuyokOfficial",
    action: "Join Channel",
    link: "https://t.me/PuyokOfficial",
    color: "bg-sky-500",
    available: "Real-time updates",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter FAQ berdasarkan search query dan kategori
  const filteredFAQ = useMemo(() => {
    let filtered = faqData

    // Filter berdasarkan kategori
    if (selectedCategory) {
      filtered = filtered.filter((category) => category.category === selectedCategory)
    }

    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query) ||
            q.tags.some((tag) => tag.toLowerCase().includes(query)),
        ),
      })).filter((category) => category.questions.length > 0)
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const totalQuestions = faqData.reduce((total, category) => total + category.questions.length, 0)
  const filteredQuestionsCount = filteredFAQ.reduce((total, category) => total + category.questions.length, 0)

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
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Pusat Bantuan</h1>
                <p className="text-sm text-muted-foreground">Temukan jawaban atas pertanyaan Anda</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            {totalQuestions} Artikel Bantuan
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700 mb-4">
            <BookOpen className="w-4 h-4" />
            Pusat Bantuan PUYOK
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ada yang bisa kami bantu?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban cepat untuk pertanyaan umum, atau hubungi tim support kami yang siap membantu 24/7.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari pertanyaan, kata kunci, atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg bg-white border-2 border-border focus:border-primary rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              Semua Kategori
            </Button>
            {faqData.map((category) => (
              <Button
                key={category.category}
                variant={selectedCategory === category.category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.category)}
                className="rounded-full"
              >
                {category.icon}
                <span className="ml-2">{category.category}</span>
              </Button>
            ))}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center text-muted-foreground">
              Menampilkan {filteredQuestionsCount} hasil untuk "{searchQuery}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - FAQ */}
          <div className="lg:col-span-3 space-y-8">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((category) => (
                <Card key={category.category} className="border border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{category.category}</h2>
                        <p className="text-sm text-muted-foreground font-normal">{category.description}</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {category.questions.length} artikel
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-start gap-3">
                              <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="font-medium">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            <div className="pl-8">
                              <div 
                                className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                              />
                              <div className="mt-4 flex flex-wrap gap-2">
                                {faq.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border border-border">
                <CardContent className="text-center py-12">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Tidak ditemukan hasil</h3>
                  <p className="text-muted-foreground mb-6">
                    Coba kata kunci lain atau hubungi support untuk bantuan lebih lanjut.
                  </p>
                  <Button onClick={() => setSearchQuery("")} variant="outline">
                    Lihat Semua FAQ
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Contact & Quick Links */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Butuh Bantuan Langsung?
                </CardTitle>
                <CardDescription>
                  Tim support kami siap membantu 24/7 untuk menyelesaikan masalah Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method) => (
                  <div key={method.title} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border hover:shadow-md transition-all">
                    <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center text-white`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{method.title}</h3>
                      <p className="text-xs text-muted-foreground">{method.available}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={method.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Link Berguna
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard">
                    <Globe className="w-4 h-4 mr-2" />
                    Dashboard Saya
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/settings">
                    <Users className="w-4 h-4 mr-2" />
                    Pengaturan Akun
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/referral">
                    <Star className="w-4 h-4 mr-2" />
                    Program Referral
                  </Link>
                </Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#" target="_blank">
                    <FileText className="w-4 h-4 mr-2" />
                    Syarat & Ketentuan
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#" target="_blank">
                    <Lock className="w-4 h-4 mr-2" />
                    Kebijakan Privasi
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Status System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Status Sistem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Normal
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pembayaran</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Normal
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Normal
                  </Badge>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#" target="_blank">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Lihat Status Detail
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 text-center">
          <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Masih Ada Pertanyaan?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim support kami. 
              Kami siap membantu menyelesaikan masalah Anda dengan cepat dan profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://wa.me/6281112345678" target="_blank">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:support@puyok.id">
                  <Mail className="w-5 h-5 mr-2" />
                  Kirim Email
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
