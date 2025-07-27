"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Users, 
  Shield, 
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  Calculator,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

// Data perbandingan kompetitor
const comparisonData = {
  categories: [
    {
      title: "Biaya Transaksi",
      icon: DollarSign,
      competitor: {
        value: "10-15%",
        status: "bad",
        description: "Fee tinggi menggerus keuntungan"
      },
      puyok: {
        value: "2-3%",
        status: "good", 
        description: "Fee terendah di Indonesia",
        highlight: "Hemat 80%"
      }
    },
    {
      title: "Waktu Pendaftaran",
      icon: Clock,
      competitor: {
        value: "3-7 hari",
        status: "bad",
        description: "KYC rumit & verifikasi lama"
      },
      puyok: {
        value: "2 menit",
        status: "good",
        description: "Daftar dengan nomor HP",
        highlight: "98% lebih cepat"
      }
    },
    {
      title: "Metode Pembayaran",
      icon: Shield,
      competitor: {
        value: "Kripto saja",
        status: "bad", 
        description: "Harus beli kripto dulu"
      },
      puyok: {
        value: "DANA, GoPay, OVO",
        status: "good",
        description: "Pembayaran lokal familiar",
        highlight: "0% friction"
      }
    },
    {
      title: "Dukungan Pelanggan",
      icon: Users,
      competitor: {
        value: "English only",
        status: "bad",
        description: "Chat bot otomatis"
      },
      puyok: {
        value: "24/7 Bahasa ID",
        status: "good",
        description: "Tim support lokal",
        highlight: "Human first"
      }
    },
    {
      title: "Keamanan Transaksi",
      icon: Shield,
      competitor: {
        value: "Manual escrow",
        status: "neutral",
        description: "Proses manual berisiko"
      },
      puyok: {
        value: "Smart Contract",
        status: "good",
        description: "Otomatis & teraudit",
        highlight: "100% aman"
      }
    }
  ],
  testimonials: [
    {
      name: "Budi Santoso",
      role: "NFT Creator",
      avatar: "/api/placeholder/50/50",
      text: "Berhasil hemat Rp 12 juta dalam 3 bulan dengan fee rendah PUYOK!",
      savings: "Rp 12.000.000",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Digital Collector", 
      avatar: "/api/placeholder/50/50",
      text: "Daftar cuma 2 menit, langsung bisa transaksi. Amazing!",
      savings: "Rp 8.500.000",
      rating: 5
    },
    {
      name: "Ahmad Rizki",
      role: "Crypto Trader",
      avatar: "/api/placeholder/50/50", 
      text: "Support 24/7 dalam bahasa Indonesia. Game changer!",
      savings: "Rp 15.200.000",
      rating: 5
    }
  ]
};

// Komponen untuk status indicator
const StatusIcon = ({ status }: { status: string }) => {
  const configs = {
    good: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/20" },
    bad: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/20" },
    neutral: { icon: CheckCircle, color: "text-yellow-400", bg: "bg-yellow-400/20" }
  };
  
  const config = configs[status as keyof typeof configs];
  const Icon = config.icon;
  
  return (
    <div className={`w-8 h-8 ${config.bg} rounded-full flex items-center justify-center`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
    </div>
  );
};

// Komponen untuk comparison row
const ComparisonRow = ({ category, index }: { category: any, index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = category.icon;
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#10B981]/30 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Category */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10B981]/20 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{category.title}</h3>
            </div>
          </div>
          
          {/* Competitor */}
          <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <StatusIcon status={category.competitor.status} />
                <span className="text-white font-medium">{category.competitor.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{category.competitor.description}</p>
            </div>
          </div>
          
          {/* PUYOK */}
          <div className="relative">
            <div className="flex items-center justify-between p-4 bg-[#10B981]/10 rounded-xl border border-[#10B981]/30">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusIcon status={category.puyok.status} />
                  <span className="text-white font-medium">{category.puyok.value}</span>
                  {category.puyok.highlight && (
                    <span className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {category.puyok.highlight}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{category.puyok.description}</p>
              </div>
            </div>
            {/* Winner indicator */}
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen animated savings calculator
const SavingsCalculator = () => {
  const [amount, setAmount] = useState(50000000); // Default 50 juta
  const [isCalculating, setIsCalculating] = useState(false);
  
  const calculations = useMemo(() => {
    const competitorFee = amount * 0.125; // 12.5% average
    const puyokFee = amount * 0.025; // 2.5%
    const savings = competitorFee - puyokFee;
    const savingsPercent = ((savings / competitorFee) * 100).toFixed(0);
    
    return {
      competitorFee,
      puyokFee, 
      savings,
      savingsPercent
    };
  }, [amount]);
  
  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 1000);
  };
  
  useEffect(() => {
    handleCalculate();
  }, [amount]);
  
  return (
    <div className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 backdrop-blur-lg rounded-3xl border border-[#10B981]/30 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Calculator className="w-6 h-6 text-[#10B981]" />
          <h3 className="text-2xl font-bold text-white">Kalkulator Penghematan</h3>
        </div>
        <p className="text-gray-300">Lihat berapa banyak yang bisa Anda hemat dengan PUYOK</p>
      </div>
      
      {/* Input Amount */}
      <div className="mb-8">
        <label className="block text-white font-medium mb-3">Nilai Transaksi NFT</label>
        <div className="relative">
          <input
            type="range"
            min="1000000"
            max="500000000"
            step="1000000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Rp 1 juta</span>
            <span className="text-[#10B981] font-bold">
              Rp {amount.toLocaleString('id-ID')}
            </span>
            <span>Rp 500 juta</span>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Competitor Cost */}
        <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Platform Lain</p>
            <p className="text-2xl font-bold text-red-400">
              Rp {calculations.competitorFee.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500 mt-1">Fee 12.5%</p>
          </div>
        </div>
        
        {/* PUYOK Cost */ 
        <div className="bg-[#10B981]/10 rounded-2xl p-6 border border-[#10B981]/30">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">PUYOK</p>
            <p className="text-2xl font-bold text-[#10B981]">
              Rp {calculations.puyokFee.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500 mt-1">Fee 2.5%</p>
          </div>
        </div>
        
        {/* Savings */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/30 relative overflow-hidden">
          <div className="text-center relative z-10">
            <p className="text-gray-400 text-sm mb-2">Penghematan Anda</p>
            <p className="text-2xl font-bold text-yellow-400">
              Rp {calculations.savings.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-yellow-500 mt-1">Hemat {calculations.savingsPercent}%</p>
          </div>
          <div className="absolute top-2 right-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/25 flex items-center gap-2 mx-auto">
          <span>Mulai Hemat Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Komponen testimonial card
const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 300);
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/20 transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full bg-white/20"
          />
          <div className="flex-1">
            <h4 className="text-white font-semibold">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
            <div className="flex gap-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
        
        <blockquote className="text-gray-300 mb-4 italic">
          &quot;{testimonial.text}&quot;
        </blockquote>
        
        <div className="bg-[#10B981]/10 rounded-lg p-3 border border-[#10B981]/20">
          <p className="text-[#10B981] font-bold text-center">
            Hemat: {testimonial.savings}
          </p>
        </div>
      </div>
    </div>
  );
};

// Komponen utama
const ModernCompetitorComparison = () => {
  const [activeTab, setActiveTab] = useState('comparison');
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 backdrop-blur-lg rounded-full px-6 py-2 border border-[#10B981]/20 mb-6">
            <Globe className="w-4 h-4 text-[#10B981]" />
            <span className="text-[#10B981] font-medium">Platform Comparison</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6">
            Mengapa PUYOK 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">
              {" "}Berbeda?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Perbandingan jujur antara PUYOK dengan platform global lainnya.
            Lihat sendiri mengapa ribuan pengguna beralih ke PUYOK.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'comparison' 
                  ? 'bg-[#10B981] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Perbandingan Fitur
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'calculator' 
                  ? 'bg-[#10B981] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kalkulator Hemat
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'testimonials' 
                  ? 'bg-[#10B981] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Testimoni Pengguna
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[800px]">
          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div>
              {/* Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div></div>
                <div className="text-center">
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <h3 className="text-white font-bold text-lg">Platform Global</h3>
                    <p className="text-gray-400 text-sm">OpenSea, Rarible, dll</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-[#10B981]/10 rounded-xl p-4 border border-[#10B981]/30 relative">
                    <h3 className="text-white font-bold text-lg">PUYOK</h3>
                    <p className="text-gray-300 text-sm">Made for Indonesia</p>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        WINNER
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comparison Rows */}
              <div className="space-y-6">
                {comparisonData.categories.map((category, index) => (
                  <ComparisonRow key={index} category={category} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Calculator Tab */}
          {activeTab === 'calculator' && <SavingsCalculator />}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Apa Kata Pengguna PUYOK?
                </h3>
                <p className="text-gray-300">
                  Ribuan pengguna sudah merasakan manfaatnya
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {comparisonData.testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 backdrop-blur-lg rounded-3xl border border-[#10B981]/30 p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Siap Bergabung dengan PUYOK?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Daftar sekarang dan rasakan perbedaannya. Fee rendah, proses cepat, support 24/7 dalam bahasa Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/25 flex items-center gap-2 justify-center">
                <Users className="w-5 h-5" />
                <span>Daftar Gratis</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40">
                Lihat Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10B981, #059669);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10B981, #059669);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </section>
  );
};

export default ModernCompetitorComparison;