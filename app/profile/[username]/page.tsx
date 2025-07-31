"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/Footer"
import ProfileChart from "@/components/ProfileChart"
import PortfolioGallery from "@/components/PortfolioGallery"
import AnimatedBackground from "@/components/AnimatedBackground"
import ProfileLoadingScreen from "@/components/ProfileLoadingScreen"
import "./profile-animations.css"
import {
  ArrowLeft,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  Twitter,
  Instagram,
  Globe,
  MessageCircle,
  Share2,
  Flag,
  Heart,
  Eye,
  Clock,
  Award,
  Trophy,
  Medal,
  Crown,
  Zap,
  Verified,
  DollarSign,
  Target,
  Users,
  ShoppingCart,
  Camera,
  Palette,
  Music,
  Video,
  Image as ImageIcon,
  ArrowRight,
  TrendingDown,
  MoreHorizontal,
  Filter,
  Download,
  Bookmark,
  Bell,
  BellOff,
  UserPlus,
  MapPin,
  Sparkles,
  BarChart3,
  PieChart,
  Activity,
  Flame,
  Gem,
  Lightning,
  Send,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  MessageSquare,
  ThumbsUp,
  Quote,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Grid3x3,
  List,
  SlidersHorizontal,
} from "lucide-react"

// Enhanced creator data with more professional information
const creatorsData: Record<string, any> = {
  rafly_art: {
  username: "rafly_art",
  displayName: "Rafly Ananda",
  title: "Senior Digital Artist & NFT Creator",
  bio: "Award-winning digital artist specializing in Indonesian cultural fusion with contemporary digital art. Creating unique pieces that bridge traditional aesthetics with modern blockchain technology. Featured in major galleries and collected by over 500+ collectors worldwide.",
  avatar: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c",
  coverImage: "https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4488572ffd624bb7af4151eecfb6e239",
  joinDate: "Juli 2023",
  location: "Jakarta, Indonesia",
  verified: true,
  isPremium: true,
  isOnline: true,
  lastSeen: "2 menit yang lalu",
  
  // Professional stats
  totalTransactions: 247,
  successfulTransactions: 245,
  averageRating: 4.9,
  totalRatings: 142,
  completionRate: 99,
  responseTime: "< 1 jam",
  totalEarnings: "Rp 1.285.750.000",
  totalFollowers: 2847,
  totalFollowing: 432,
  totalViews: 45230,
  portfolioValue: "Rp 2.450.000.000",
  
  // Analytics data
  monthlyEarnings: [
    { month: "Jan", amount: 45000000 },
    { month: "Feb", amount: 62000000 },
    { month: "Mar", amount: 78000000 },
    { month: "Apr", amount: 95000000 },
    { month: "May", amount: 110000000 },
    { month: "Jun", amount: 125000000 },
  ],
  
  // Professional skills
  skills: [
    { name: "Digital Art", level: 95 },
    { name: "3D Modeling", level: 88 },
    { name: "NFT Creation", level: 92 },
    { name: "Animation", level: 76 },
    { name: "Illustration", level: 89 },
    { name: "Concept Art", level: 83 },
  ],
  
  // Social links
  socialLinks: {
    twitter: "https://twitter.com/rafly_art",
    instagram: "https://instagram.com/rafly.art",
    website: "https://raflyart.com",
    discord: "https://discord.gg/raflyart",
    youtube: "https://youtube.com/@raflyart",
    behance: "https://behance.net/raflyart",
  },
  
  // Professional services
  services: [
    {
      id: "service-1",
      title: "Custom NFT Commission",
      description: "Personalized digital art pieces for your collection",
      price: "Mulai dari Rp 5.000.000",
      duration: "7-14 hari",
      rating: 4.9,
      orders: 45,
    },
    {
      id: "service-2",
      title: "3D Avatar Creation",
      description: "Professional 3D avatars for metaverse platforms",
      price: "Mulai dari Rp 8.000.000",
      duration: "10-21 hari",
      rating: 4.8,
      orders: 28,
    },
    {
      id: "service-3",
      title: "Art Direction Consultation",
      description: "Creative guidance for your digital art projects",
      price: "Rp 2.500.000/jam",
      duration: "Fleksibel",
      rating: 5.0,
      orders: 12,
    },
  ],
  
  // Enhanced assets for sale
  assetsForSale: [
    {
      id: "nft-001",
      title: "Batik Genesis Collection #001",
      price: "Rp 12.500.000",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      category: "Art",
      views: 3250,
      likes: 189,
      timeLeft: "5 hari",
      rarity: "Legendary",
      isHot: true,
      priceHistory: [
        { date: "1 Jan", price: 8000000 },
        { date: "15 Jan", price: 10000000 },
        { date: "1 Feb", price: 12500000 },
      ],
    },
    {
      id: "nft-002", 
      title: "Indonesian Landscape Metaverse",
      price: "Rp 8.800.000",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F4d48e732c2184f348acf167a154cbbd0?alt=media&token=ce55693d-d12f-4983-850f-b6e6d6ea07ea&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      category: "3D Art",
      views: 1820,
      likes: 167,
      timeLeft: "12 hari",
      rarity: "Epic",
      isHot: false,
      priceHistory: [
        { date: "1 Jan", price: 6000000 },
        { date: "15 Jan", price: 7500000 },
        { date: "1 Feb", price: 8800000 },
      ],
    },
    {
      id: "nft-003",
      title: "Wayang Digital Revolution",
      price: "Rp 15.200.000",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F303039bbe9b14053b6448b9670d45c31?alt=media&token=28cfd4fc-437b-470b-98fe-119e2ca22caf&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      category: "Animation",
      views: 4100,
      likes: 256,
      timeLeft: "8 hari",
      rarity: "Legendary",
      isHot: true,
      priceHistory: [
        { date: "1 Jan", price: 10000000 },
        { date: "15 Jan", price: 12000000 },
        { date: "1 Feb", price: 15200000 },
      ],
    },
    {
      id: "nft-004",
      title: "Nusantara Chronicles Series",
      price: "Rp 6.500.000",
      image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fab665b45d8764a2fb6cd2c8e85e8ad32?alt=media&token=83abe558-74b7-4439-b13d-28210f1a5caa&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
      category: "Illustration",
      views: 2945,
      likes: 173,
      timeLeft: "15 hari",
      rarity: "Rare",
      isHot: false,
      priceHistory: [
        { date: "1 Jan", price: 5000000 },
        { date: "15 Jan", price: 5800000 },
        { date: "1 Feb", price: 6500000 },
      ],
    },
  ],
  
  // Recent activity
  recentActivity: [
    {
      id: "activity-1",
      type: "sale",
      title: "Jakarta Skyline NFT terjual",
      description: "Terjual seharga Rp 4.500.000 kepada @crypto_collector99",
      timestamp: "2 jam yang lalu",
      icon: "💰",
    },
    {
      id: "activity-2", 
      type: "listing",
      title: "Karya baru dipublikasikan",
      description: "Batik Genesis Collection #001 ditambahkan ke marketplace",
      timestamp: "1 hari yang lalu",
      icon: "🎨",
    },
    {
      id: "activity-3",
      type: "achievement",
      title: "Achievement baru diraih",
      description: "Top Creator Q4 2024 - Top 10 creators by volume",
      timestamp: "3 hari yang lalu", 
      icon: "🏆",
    },
    {
      id: "activity-4",
      type: "collaboration",
      title: "Kolaborasi dengan @heritage_museum",
      description: "Proyek Borobudur Digital Heritage dimulai",
      timestamp: "1 minggu yang lalu",
      icon: "🤝",
    },
  ],
  
  // Testimonials
  testimonials: [
    {
      id: "testimonial-1",
      author: "crypto_collector99",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "Rafly adalah artist luar biasa! Kualitas karya dan profesionalisme sangat tinggi. Highly recommended!",
      date: "15 Des 2024",
      verified: true,
    },
    {
      id: "testimonial-2", 
      author: "art_enthusiast",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      text: "Pemahaman budaya Indonesia yang mendalam tercermin dalam setiap karya. Investasi yang sangat berharga!",
      date: "8 Des 2024",
      verified: true,
    },
    {
      id: "testimonial-3",
      author: "heritage_collector",
      avatar: "/placeholder.svg?height=50&width=50", 
      rating: 5,
      text: "Kolaborasi yang fantastis! Rafly mampu menggabungkan tradisi dengan teknologi modern dengan sempurna.",
      date: "22 Nov 2024",
      verified: false,
    },
  ],
  
  // Enhanced awards
  awards: [
    {
      id: "award-001",
      title: "Indonesian Digital Art Pioneer",
      description: "Penghargaan khusus untuk kontribusi dalam mengangkat budaya Indonesia melalui seni digital",
      image: "/placeholder.svg?height=100&width=100&text=Pioneer+Award",
      earnedDate: "31 Des 2024",
      rarity: "Legendary",
      type: "Achievement",
      issuer: "Ministry of Culture Indonesia",
    },
    {
      id: "award-002", 
      title: "Top Creator Q4 2024",
      description: "Awarded to top 10 creators by transaction volume and community impact in Q4 2024",
      image: "/placeholder.svg?height=100&width=100&text=Top+Creator",
      earnedDate: "31 Des 2024",
      rarity: "Legendary",
      type: "Achievement",
      issuer: "PUYOK Platform",
    },
    {
      id: "award-003",
      title: "Blockchain Innovation Award",
      description: "Recognition for innovative use of blockchain technology in digital art preservation",
      image: "/placeholder.svg?height=100&width=100&text=Innovation+Award",
      earnedDate: "15 Nov 2024",
      rarity: "Epic",
      type: "Innovation",
      issuer: "Indonesia Blockchain Association",
    },
  ]
  },

  crypto_master: {
    username: "crypto_master",
    displayName: "Crypto Master",
    title: "Professional Crypto Trader",
    bio: "Expert cryptocurrency trader with 5+ years experience. Specialized in algorithmic trading and DeFi strategies. Helping investors maximize returns while minimizing risks.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Crypto+Trading+Cover",
    joinDate: "Januari 2022",
    location: "Singapore",
    verified: true,
    isPremium: true,
    isOnline: true,
    lastSeen: "5 menit yang lalu",
    totalTransactions: 456,
    successfulTransactions: 449,
    averageRating: 4.8,
    totalRatings: 89,
    completionRate: 98.5,
    responseTime: "< 30 menit",
    totalEarnings: "Rp 890.250.000",
    totalFollowers: 1289,
    totalFollowing: 234,
    totalViews: 23450,
    portfolioValue: "Rp 1.200.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 120000000 },
      { month: "Feb", amount: 135000000 },
      { month: "Mar", amount: 145000000 },
      { month: "Apr", amount: 158000000 },
      { month: "May", amount: 162000000 },
      { month: "Jun", amount: 170000000 },
    ],
    skills: [
      { name: "Crypto Trading", level: 98 },
      { name: "Risk Management", level: 95 },
      { name: "Technical Analysis", level: 92 },
      { name: "DeFi Strategy", level: 88 },
      { name: "Portfolio Management", level: 90 },
    ],
    socialLinks: {
      twitter: "https://twitter.com/crypto_master",
      telegram: "https://t.me/cryptomaster",
      website: "https://cryptomaster.pro",
    },
    services: [
      {
        id: "service-1",
        title: "Crypto Trading Signal",
        description: "Daily trading signals with 85%+ accuracy rate",
        price: "Mulai dari Rp 500.000/bulan",
        duration: "30 hari",
        rating: 4.9,
        orders: 156,
      },
    ],
    assetsForSale: [],
    recentActivity: [
      {
        id: "activity-1",
        type: "trade",
        title: "Successful Bitcoin trade",
        description: "Completed BTC trade with 12% profit",
        timestamp: "1 jam yang lalu",
        icon: "💰",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        author: "trader_123",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        text: "Amazing signals! Helped me increase my portfolio by 45% this month.",
        date: "10 Des 2024",
        verified: true,
      },
    ],
    awards: [
      {
        id: "award-001",
        title: "Top Trader 2024",
        description: "Recognized as one of the top crypto traders on PUYOK platform",
        image: "/placeholder.svg?height=100&width=100&text=Top+Trader",
        earnedDate: "15 Des 2024",
        rarity: "Epic",
        type: "Achievement",
        issuer: "PUYOK Platform",
      },
    ]
  },

  eth_trader: {
    username: "eth_trader",
    displayName: "Ethereum Trader",
    title: "DeFi & Ethereum Specialist",
    bio: "Specialized in Ethereum ecosystem trading and DeFi protocols. 3+ years experience with consistently profitable strategies.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Ethereum+Trading",
    joinDate: "Maret 2023",
    location: "Jakarta, Indonesia",
    verified: true,
    isPremium: false,
    isOnline: false,
    lastSeen: "2 jam yang lalu",
    totalTransactions: 234,
    successfulTransactions: 227,
    averageRating: 4.7,
    totalRatings: 67,
    completionRate: 97.2,
    responseTime: "< 1 jam",
    totalEarnings: "Rp 456.780.000",
    totalFollowers: 789,
    totalFollowing: 145,
    totalViews: 12340,
    portfolioValue: "Rp 650.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 60000000 },
      { month: "Feb", amount: 72000000 },
      { month: "Mar", amount: 68000000 },
      { month: "Apr", amount: 81000000 },
      { month: "May", amount: 89000000 },
      { month: "Jun", amount: 86780000 },
    ],
    skills: [
      { name: "Ethereum Trading", level: 95 },
      { name: "DeFi Protocols", level: 92 },
      { name: "Smart Contracts", level: 85 },
      { name: "Yield Farming", level: 88 },
    ],
    socialLinks: {
      twitter: "https://twitter.com/eth_trader",
      discord: "https://discord.gg/ethtrader",
    },
    services: [
      {
        id: "service-1",
        title: "DeFi Strategy Consultation",
        description: "Personal DeFi investment strategy consultation",
        price: "Rp 1.500.000/sesi",
        duration: "2 jam",
        rating: 4.8,
        orders: 45,
      },
    ],
    assetsForSale: [],
    recentActivity: [
      {
        id: "activity-1",
        type: "defi",
        title: "Successful yield farming",
        description: "Harvested rewards from Uniswap LP",
        timestamp: "3 jam yang lalu",
        icon: "🌾",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        author: "defi_lover",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        text: "Great DeFi strategies! Very knowledgeable about Ethereum ecosystem.",
        date: "5 Des 2024",
        verified: true,
      },
    ],
    awards: [
      {
        id: "award-001",
        title: "DeFi Expert",
        description: "Recognized expertise in DeFi protocols and strategies",
        image: "/placeholder.svg?height=100&width=100&text=DeFi+Expert",
        earnedDate: "20 Nov 2024",
        rarity: "Rare",
        type: "Recognition",
        issuer: "DeFi Community",
      },
    ]
  },

  stable_pro: {
    username: "stable_pro",
    displayName: "Stable Pro",
    title: "Stablecoin & Low-Risk Trading Expert",
    bio: "Conservative trading specialist focused on stablecoins and low-risk strategies. Consistent profits with minimal volatility exposure.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Stable+Trading",
    joinDate: "Juni 2023",
    location: "Surabaya, Indonesia",
    verified: true,
    isPremium: true,
    isOnline: true,
    lastSeen: "30 menit yang lalu",
    totalTransactions: 567,
    successfulTransactions: 562,
    averageRating: 4.9,
    totalRatings: 134,
    completionRate: 99.1,
    responseTime: "< 15 menit",
    totalEarnings: "Rp 234.560.000",
    totalFollowers: 456,
    totalFollowing: 89,
    totalViews: 8940,
    portfolioValue: "Rp 800.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 35000000 },
      { month: "Feb", amount: 38000000 },
      { month: "Mar", amount: 41000000 },
      { month: "Apr", amount: 39000000 },
      { month: "May", amount: 42000000 },
      { month: "Jun", amount: 39560000 },
    ],
    skills: [
      { name: "Stablecoin Trading", level: 99 },
      { name: "Risk Management", level: 98 },
      { name: "Arbitrage", level: 94 },
      { name: "Portfolio Stability", level: 96 },
    ],
    socialLinks: {
      twitter: "https://twitter.com/stable_pro",
      linkedin: "https://linkedin.com/in/stablepro",
    },
    services: [
      {
        id: "service-1",
        title: "Stable Investment Strategy",
        description: "Low-risk, stable return investment strategies",
        price: "Rp 750.000/konsultasi",
        duration: "1.5 jam",
        rating: 4.9,
        orders: 234,
      },
    ],
    assetsForSale: [],
    recentActivity: [
      {
        id: "activity-1",
        type: "arbitrage",
        title: "USDC arbitrage completed",
        description: "Successful arbitrage trade with 0.5% profit",
        timestamp: "45 menit yang lalu",
        icon: "💱",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        author: "conservative_investor",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        text: "Perfect for risk-averse investors. Consistent small profits add up!",
        date: "1 Des 2024",
        verified: true,
      },
    ],
    awards: [
      {
        id: "award-001",
        title: "Consistency Champion",
        description: "Most consistent trader with highest success rate",
        image: "/placeholder.svg?height=100&width=100&text=Consistency",
        earnedDate: "30 Nov 2024",
        rarity: "Legendary",
        type: "Achievement",
        issuer: "PUYOK Platform",
      },
    ]
  },

  // Add creator data for NFT creators
  MythArt_ID: {
    username: "MythArt_ID",
    displayName: "Myth Art Indonesia",
    title: "Mythological Digital Artist",
    bio: "Creating stunning digital art inspired by Indonesian mythology and folklore. Bringing ancient stories to the modern digital world.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Mythology+Art",
    joinDate: "Agustus 2023",
    location: "Yogyakarta, Indonesia",
    verified: true,
    isPremium: true,
    isOnline: true,
    lastSeen: "1 jam yang lalu",
    totalTransactions: 89,
    successfulTransactions: 87,
    averageRating: 4.8,
    totalRatings: 45,
    completionRate: 97.8,
    responseTime: "< 2 jam",
    totalEarnings: "Rp 156.750.000",
    totalFollowers: 1245,
    totalFollowing: 234,
    totalViews: 15630,
    portfolioValue: "Rp 450.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 20000000 },
      { month: "Feb", amount: 25000000 },
      { month: "Mar", amount: 28000000 },
      { month: "Apr", amount: 32000000 },
      { month: "May", amount: 29000000 },
      { month: "Jun", amount: 22750000 },
    ],
    skills: [
      { name: "Digital Art", level: 95 },
      { name: "Indonesian Mythology", level: 98 },
      { name: "Character Design", level: 92 },
      { name: "NFT Creation", level: 89 },
    ],
    socialLinks: {
      instagram: "https://instagram.com/mythart_id",
      behance: "https://behance.net/mythart_id",
      website: "https://mythart.id",
    },
    services: [
      {
        id: "service-1",
        title: "Custom Mythology NFT",
        description: "Custom digital art based on Indonesian mythology",
        price: "Mulai dari Rp 3.500.000",
        duration: "14 hari",
        rating: 4.9,
        orders: 23,
      },
    ],
    assetsForSale: [
      {
        id: "nft-myth-001",
        title: "Garuda Nusantara Collection",
        price: "Rp 8.500.000",
        image: "/placeholder.svg?height=400&width=400&text=Garuda+Art",
        category: "Art",
        views: 2340,
        likes: 156,
        timeLeft: "7 hari",
        rarity: "Epic",
        isHot: true,
        priceHistory: [],
      },
    ],
    recentActivity: [
      {
        id: "activity-1",
        type: "sale",
        title: "Barong NFT terjual",
        description: "Barong Mythology NFT terjual seharga Rp 5.200.000",
        timestamp: "2 hari yang lalu",
        icon: "🎨",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        author: "culture_lover",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        text: "Beautiful artwork that perfectly captures Indonesian mythology!",
        date: "28 Nov 2024",
        verified: true,
      },
    ],
    awards: [
      {
        id: "award-001",
        title: "Cultural Heritage Artist",
        description: "Recognition for preserving Indonesian culture through digital art",
        image: "/placeholder.svg?height=100&width=100&text=Cultural+Award",
        earnedDate: "25 Nov 2024",
        rarity: "Legendary",
        type: "Recognition",
        issuer: "Ministry of Culture Indonesia",
      },
    ]
  },

  BatikMaster: {
    username: "BatikMaster",
    displayName: "Batik Master",
    title: "Traditional Batik Digital Artist",
    bio: "Master craftsman bringing traditional Indonesian Batik patterns into the digital NFT world. 15+ years experience in traditional batik.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Batik+Digital",
    joinDate: "September 2023",
    location: "Solo, Indonesia",
    verified: true,
    isPremium: true,
    isOnline: false,
    lastSeen: "5 jam yang lalu",
    totalTransactions: 67,
    successfulTransactions: 66,
    averageRating: 4.9,
    totalRatings: 34,
    completionRate: 98.5,
    responseTime: "< 4 jam",
    totalEarnings: "Rp 234.500.000",
    totalFollowers: 2340,
    totalFollowing: 156,
    totalViews: 23450,
    portfolioValue: "Rp 890.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 35000000 },
      { month: "Feb", amount: 42000000 },
      { month: "Mar", amount: 38000000 },
      { month: "Apr", amount: 45000000 },
      { month: "May", amount: 41000000 },
      { month: "Jun", amount: 33500000 },
    ],
    skills: [
      { name: "Traditional Batik", level: 99 },
      { name: "Digital Art", level: 87 },
      { name: "Pattern Design", level: 96 },
      { name: "Cultural Heritage", level: 98 },
    ],
    socialLinks: {
      instagram: "https://instagram.com/batikmaster",
      website: "https://batikmaster.art",
    },
    services: [],
    assetsForSale: [],
    recentActivity: [],
    testimonials: [],
    awards: []
  },

  PixelIndo: {
    username: "PixelIndo",
    displayName: "Pixel Indonesia",
    title: "Pixel Art Specialist",
    bio: "Creating nostalgic pixel art with Indonesian cultural themes. Bringing retro gaming aesthetics to modern NFT collections.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Pixel+Art+Indo",
    joinDate: "Oktober 2023",
    location: "Bandung, Indonesia",
    verified: false,
    isPremium: false,
    isOnline: true,
    lastSeen: "15 menit yang lalu",
    totalTransactions: 34,
    successfulTransactions: 33,
    averageRating: 4.6,
    totalRatings: 18,
    completionRate: 97.1,
    responseTime: "< 3 jam",
    totalEarnings: "Rp 89.250.000",
    totalFollowers: 567,
    totalFollowing: 123,
    totalViews: 7890,
    portfolioValue: "Rp 156.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 12000000 },
      { month: "Feb", amount: 15000000 },
      { month: "Mar", amount: 18000000 },
      { month: "Apr", amount: 16000000 },
      { month: "May", amount: 14000000 },
      { month: "Jun", amount: 14250000 },
    ],
    skills: [
      { name: "Pixel Art", level: 94 },
      { name: "8-bit Design", level: 91 },
      { name: "Retro Gaming Art", level: 89 },
      { name: "Animation", level: 76 },
    ],
    socialLinks: {
      twitter: "https://twitter.com/pixelindo",
      instagram: "https://instagram.com/pixel.indo",
    },
    services: [],
    assetsForSale: [],
    recentActivity: [],
    testimonials: [],
    awards: []
  },

  WayangPunk: {
    username: "WayangPunk",
    displayName: "Wayang Punk",
    title: "Modern Wayang Artist",
    bio: "Revolutionizing traditional Wayang puppetry with punk and cyberpunk aesthetics. Creating unique fusion art that bridges past and future.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Wayang+Punk",
    joinDate: "November 2023",
    location: "Jakarta, Indonesia",
    verified: true,
    isPremium: false,
    isOnline: true,
    lastSeen: "2 jam yang lalu",
    totalTransactions: 45,
    successfulTransactions: 44,
    averageRating: 4.7,
    totalRatings: 26,
    completionRate: 97.8,
    responseTime: "< 2 jam",
    totalEarnings: "Rp 145.670.000",
    totalFollowers: 1890,
    totalFollowing: 345,
    totalViews: 12340,
    portfolioValue: "Rp 234.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 18000000 },
      { month: "Feb", amount: 22000000 },
      { month: "Mar", amount: 26000000 },
      { month: "Apr", amount: 24000000 },
      { month: "May", amount: 28000000 },
      { month: "Jun", amount: 27670000 },
    ],
    skills: [
      { name: "Wayang Art", level: 96 },
      { name: "Punk Aesthetics", level: 92 },
      { name: "Character Design", level: 88 },
      { name: "Cultural Fusion", level: 94 },
    ],
    socialLinks: {
      instagram: "https://instagram.com/wayangpunk",
      behance: "https://behance.net/wayangpunk",
    },
    services: [],
    assetsForSale: [],
    recentActivity: [],
    testimonials: [],
    awards: []
  },

  PhoenixArt: {
    username: "PhoenixArt",
    displayName: "Phoenix Art Studio",
    title: "Fantasy Digital Artist",
    bio: "Specializing in fantasy and mythical creature digital art. Creating majestic creatures and magical worlds in stunning detail.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Phoenix+Fantasy",
    joinDate: "Desember 2023",
    location: "Bali, Indonesia",
    verified: true,
    isPremium: true,
    isOnline: false,
    lastSeen: "8 jam yang lalu",
    totalTransactions: 78,
    successfulTransactions: 76,
    averageRating: 4.8,
    totalRatings: 42,
    completionRate: 97.4,
    responseTime: "< 3 jam",
    totalEarnings: "Rp 298.450.000",
    totalFollowers: 3456,
    totalFollowing: 567,
    totalViews: 34560,
    portfolioValue: "Rp 567.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 42000000 },
      { month: "Feb", amount: 48000000 },
      { month: "Mar", amount: 52000000 },
      { month: "Apr", amount: 56000000 },
      { month: "May", amount: 51000000 },
      { month: "Jun", amount: 49450000 },
    ],
    skills: [
      { name: "Fantasy Art", level: 97 },
      { name: "Creature Design", level: 95 },
      { name: "Digital Painting", level: 93 },
      { name: "Concept Art", level: 90 },
    ],
    socialLinks: {
      artstation: "https://artstation.com/phoenixart",
      instagram: "https://instagram.com/phoenix.art.studio",
      website: "https://phoenixart.studio",
    },
    services: [],
    assetsForSale: [],
    recentActivity: [],
    testimonials: [],
    awards: []
  },

  TempleKeeper: {
    username: "TempleKeeper",
    displayName: "Temple Keeper",
    title: "Ancient Architecture Artist",
    bio: "Dedicated to preserving and reimagining Indonesia's ancient temple architecture through digital art. Bringing historical monuments to the NFT space.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=500&width=1400&text=Ancient+Temples",
    joinDate: "Januari 2024",
    location: "Yogyakarta, Indonesia",
    verified: true,
    isPremium: true,
    isOnline: true,
    lastSeen: "45 menit yang lalu",
    totalTransactions: 23,
    successfulTransactions: 23,
    averageRating: 5.0,
    totalRatings: 12,
    completionRate: 100,
    responseTime: "< 1 jam",
    totalEarnings: "Rp 167.890.000",
    totalFollowers: 890,
    totalFollowing: 67,
    totalViews: 8920,
    portfolioValue: "Rp 345.000.000",
    monthlyEarnings: [
      { month: "Jan", amount: 25000000 },
      { month: "Feb", amount: 28000000 },
      { month: "Mar", amount: 31000000 },
      { month: "Apr", amount: 29000000 },
      { month: "May", amount: 27000000 },
      { month: "Jun", amount: 27890000 },
    ],
    skills: [
      { name: "Architecture Art", level: 98 },
      { name: "Historical Research", level: 96 },
      { name: "3D Modeling", level: 87 },
      { name: "Cultural Preservation", level: 99 },
    ],
    socialLinks: {
      website: "https://templekeeper.heritage",
      instagram: "https://instagram.com/templekeeper",
    },
    services: [],
    assetsForSale: [],
    recentActivity: [],
    testimonials: [],
    awards: []
  }
}

// Get creator data by username, fallback to rafly_art if not found
function getCreatorData(username: string) {
  return creatorsData[username] || creatorsData.rafly_art
}

interface CreatorProfilePageProps {
  params: Promise<{
    username: string
  }>
}

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  const resolvedParams = use(params)
  const creatorData = getCreatorData(resolvedParams.username)
  const [activeTab, setActiveTab] = useState("portfolio")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [notifications, setNotifications] = useState(true)
  const [activeService, setActiveService] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Auto-rotate services showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % creatorData.services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleNotificationToggle = () => {
    setNotifications(!notifications)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Profil ${creatorData.displayName} di PUYOK`,
        text: `Lihat karya amazing dari ${creatorData.displayName} di PUYOK!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-gradient-to-r from-amber-200 to-yellow-300"
      case "Epic": return "bg-gradient-to-r from-purple-200 to-indigo-300"
      case "Rare": return "bg-gradient-to-r from-blue-200 to-cyan-300"
      case "Common": return "bg-gradient-to-r from-gray-200 to-gray-300"
      default: return "bg-gradient-to-r from-gray-200 to-gray-300"
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredAssets = creatorData.assetsForSale.filter(asset => {
    if (filterCategory === "all") return true
    return asset.category === filterCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-high": return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''))
      case "price-low": return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))
      case "popular": return b.likes - a.likes
      case "newest": 
      default: return 0
    }
  })

  return (
    <>
      <ProfileLoadingScreen
        isLoading={isLoading}
        onLoadingComplete={() => setIsLoading(false)}
      />

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground className="opacity-30" particleCount={30} />
      {/* Enhanced Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-accent">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{creatorData.displayName}</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">@{resolvedParams.username}</p>
                {creatorData.isOnline && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNotificationToggle}
              className="hidden md:flex"
            >
              {notifications ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
              {notifications ? "Unsubscribe" : "Subscribe"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Cover Photo & Profile Header */}
      <div className="relative overflow-hidden">
        {/* Dynamic Cover Image with Parallax Effect */}
        <div className="h-80 md:h-96 bg-gradient-to-br from-slate-200/20 via-slate-300/10 to-slate-400/20 relative">
          <img
            src={creatorData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Floating Elements with Particles */}
          <div className="absolute top-10 right-10 hidden lg:flex flex-col gap-4">
            <div className="particles-bg">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="particle" />
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white animate-float glass-effect hover-glow">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-200" />
                <span className="text-sm font-medium">{creatorData.totalViews.toLocaleString()} Views</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white animate-float glass-effect hover-glow" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-slate-200" />
                <span className="text-sm font-medium">{creatorData.awards.length} Awards</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white animate-float glass-effect hover-glow" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-slate-200" />
                <span className="text-sm font-medium">{creatorData.completionRate}% Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Profile Info Overlay */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative -mt-24 md:-mt-28">
            <div className="flex flex-col lg:flex-row lg:items-end gap-8">
              {/* Enhanced Avatar Section */}
              <div className="relative flex-shrink-0">
                <div className="relative status-online">
                  <Avatar className="w-40 h-40 md:w-48 md:h-48 border-6 border-background shadow-2xl ring-4 ring-primary/20 hover-lift">
                    <AvatarImage src={creatorData.avatar} alt={creatorData.displayName} />
                    <AvatarFallback className="text-5xl bg-gradient-to-br from-primary to-purple-600 text-white">
                      {creatorData.displayName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Status Indicators */}
                  {creatorData.verified && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                      <Verified className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {creatorData.isPremium && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {creatorData.isOnline && (
                    <div className="absolute bottom-4 -right-4 w-6 h-6 bg-emerald-400 rounded-full border-4 border-background animate-pulse" />
                  )}
                </div>
                
                {/* Quick Stats Below Avatar */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">{creatorData.totalFollowers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{creatorData.assetsForSale.length}</div>
                    <div className="text-xs text-muted-foreground">Assets</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{creatorData.awards.length}</div>
                    <div className="text-xs text-muted-foreground">Awards</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Name & Bio Section */}
              <div className="flex-1 pb-8">
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                  <div className="flex-1">
                    {/* Name and Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        {creatorData.displayName}
                      </h1>
                      <div className="flex items-center gap-2">
                        {creatorData.verified && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <Verified className="w-4 h-4 mr-1" />
                            Verified Creator
                          </Badge>
                        )}
                        {creatorData.isPremium && (
                          <Badge className="bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-800 border-0">
                            <Crown className="w-4 h-4 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xl text-primary font-semibold mb-3">{creatorData.title}</p>
                    <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-4">{creatorData.bio}</p>
                    
                    {/* Location and Join Date */}
                    <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{creatorData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>Bergabung {creatorData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>Terakhir dilihat {creatorData.lastSeen}</span>
                      </div>
                    </div>

                    {/* Enhanced Rating */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${
                                star <= creatorData.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-foreground">{creatorData.averageRating}</span>
                        <span className="text-muted-foreground">({creatorData.totalRatings} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">{creatorData.completionRate}% completion rate</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                    <Button
                      onClick={handleFollow}
                      size="lg"
                      className={`${isFollowing 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      } font-semibold px-8`}
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-2" />
                          Follow
                        </>
                      )}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="lg">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Message
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={handleBookmark}
                        className={isBookmarked ? "bg-accent" : ""}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Left Sidebar */}
          <div className="xl:col-span-1 space-y-8">
            {/* Interactive Charts Dashboard */}
            <ProfileChart data={{
              monthlyEarnings: creatorData.monthlyEarnings,
              totalEarnings: creatorData.totalEarnings,
              totalViews: creatorData.totalViews,
              totalFollowers: creatorData.totalFollowers,
              averageRating: creatorData.averageRating,
              completionRate: creatorData.completionRate,
              responseTime: creatorData.responseTime,
              successfulTransactions: creatorData.successfulTransactions,
            }} />

            {/* Professional Stats Dashboard */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-lg hover-lift">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Professional Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{formatPrice(parseInt(creatorData.totalEarnings.replace(/\D/g, '')))}</div>
                    <div className="text-sm text-muted-foreground">Total Sales</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{creatorData.successfulTransactions}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="font-semibold text-blue-600">{creatorData.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">{creatorData.completionRate}%</span>
                      <Progress value={creatorData.completionRate} className="w-16 h-2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Portfolio Value</span>
                    <span className="font-semibold text-purple-600">{creatorData.portfolioValue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card className="shadow-lg hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creatorData.skills.map((skill, index) => (
                  <div key={skill.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 progress-bar" style={{ animationDelay: `${index * 0.2}s` }} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Social Links */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Connect & Follow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(creatorData.socialLinks).map(([platform, url]) => {
                  const getIcon = (platform: string) => {
                    switch (platform) {
                      case "twitter": return <Twitter className="w-5 h-5 text-slate-500" />
                      case "instagram": return <Instagram className="w-5 h-5 text-slate-500" />
                      case "website": return <Globe className="w-5 h-5 text-slate-500" />
                      case "discord": return <MessageSquare className="w-5 h-5 text-slate-500" />
                      case "youtube": return <Video className="w-5 h-5 text-slate-500" />
                      case "behance": return <Palette className="w-5 h-5 text-slate-500" />
                      default: return <ExternalLink className="w-5 h-5 text-slate-500" />
                    }
                  }
                  
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all duration-200 group"
                    >
                      {getIcon(platform)}
                      <span className="font-medium capitalize group-hover:text-primary transition-colors">
                        {platform}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )
                })}
              </CardContent>
            </Card>

            {/* Services Showcase */}
            <Card className="shadow-lg overflow-hidden hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary animate-pulse-glow" />
                  Professional Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-64">
                  {creatorData.services.map((service, index) => (
                    <div
                      key={service.id}
                      className={`absolute inset-0 p-6 transition-all duration-500 ${
                        index === activeService ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                    >
                      <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price</span>
                          <span className="font-bold text-primary">{service.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Delivery</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{service.rating}</span>
                            <span className="text-muted-foreground text-sm">({service.orders})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 p-4 bg-accent/30">
                  {creatorData.services.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all animate-scale-pulse ${
                        index === activeService ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Content */}
          <div className="xl:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <TabsList className="grid w-full lg:w-auto grid-cols-4 lg:grid-cols-4 h-12">
                  <TabsTrigger value="portfolio" className="flex items-center gap-2 text-sm">
                    <Grid3x3 className="w-4 h-4" />
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="awards" className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4" />
                    Awards
                  </TabsTrigger>
                </TabsList>

                {/* Filters and View Options */}
                {activeTab === "portfolio" && (
                  <div className="flex items-center gap-3">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="3D Art">3D Art</SelectItem>
                        <SelectItem value="Animation">Animation</SelectItem>
                        <SelectItem value="Illustration">Illustration</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex rounded-lg border border-border overflow-hidden">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-none border-r"
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="mt-0">
                <PortfolioGallery
                  assets={filteredAssets}
                  viewMode={viewMode}
                  filterCategory={filterCategory}
                  sortBy={sortBy}
                  onLike={(assetId) => {
                    // Handle like logic
                    console.log('Liked asset:', assetId)
                  }}
                  onShare={(asset) => {
                    // Handle share logic
                    if (navigator.share) {
                      navigator.share({
                        title: asset.title,
                        text: `Check out this amazing artwork: ${asset.title}`,
                        url: window.location.href,
                      })
                    }
                  }}
                  onBookmark={(assetId) => {
                    // Handle bookmark logic
                    console.log('Bookmarked asset:', assetId)
                  }}
                />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-0">
                <div className="space-y-6 stagger-children">
                  <Card className="shadow-lg hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {creatorData.recentActivity.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-all duration-300 interactive-card"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="text-2xl animate-bounce-subtle">{activity.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{activity.title}</h4>
                            <p className="text-muted-foreground text-sm">{activity.description}</p>
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-primary mb-2">{creatorData.averageRating}</div>
                          <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-6 h-6 ${
                                  star <= creatorData.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">Based on {creatorData.totalRatings} reviews</p>
                        </div>
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = Math.floor(Math.random() * 50) + 10
                            const percentage = (count / creatorData.totalRatings) * 100
                            return (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="text-sm w-8">{rating}★</span>
                                <Progress value={percentage} className="flex-1 h-2" />
                                <span className="text-sm text-muted-foreground w-12">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className="space-y-4 stagger-children">
                    {creatorData.testimonials.map((testimonial, index) => (
                      <Card key={testimonial.id} className="shadow-lg hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12 hover-glow">
                              <AvatarImage src={testimonial.avatar} />
                              <AvatarFallback>{testimonial.author[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">@{testimonial.author}</h4>
                                {testimonial.verified && (
                                  <Badge variant="secondary" className="text-xs badge-glow">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified Purchase
                                  </Badge>
                                )}
                                <div className="flex ml-auto">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 transition-all duration-300 ${
                                        star <= testimonial.rating ? 'text-yellow-400 fill-current animate-bounce-subtle' : 'text-gray-300'
                                      }`}
                                      style={{ animationDelay: `${star * 0.1}s` }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <blockquote className="text-muted-foreground italic mb-2">
                                <Quote className="w-4 h-4 inline mr-1" />
                                {testimonial.text}
                              </blockquote>
                              <time className="text-xs text-muted-foreground">{testimonial.date}</time>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Awards Tab */}
              <TabsContent value="awards" className="mt-0">
                <div className="space-y-8">
                  {/* Awards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {creatorData.awards.map((award) => (
                      <Card key={award.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 right-0 h-2 ${getRarityColor(award.rarity)}`} />
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className={`w-24 h-24 rounded-xl ${getRarityColor(award.rarity)} p-1`}>
                                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                                  <img
                                    src={award.image}
                                    alt={award.title}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-bold text-foreground text-xl">{award.title}</h3>
                                <Badge className={`${getRarityColor(award.rarity)} text-white border-0`}>
                                  {award.rarity}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                {award.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {award.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">by {award.issuer}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {award.earnedDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Awards Summary */}
                  <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-yellow-200 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-2xl">Trophy Collection</h3>
                            <p className="text-muted-foreground">Professional achievements and community recognition</p>
                          </div>
                        </div>
                        <Button variant="outline" asChild className="bg-white/50">
                          <Link href="/awards-marketplace">
                            <Trophy className="w-4 h-4 mr-2" />
                            Explore Awards
                          </Link>
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Legendary", "Epic", "Rare", "Common"].map((rarity) => {
                          const count = creatorData.awards.filter(a => a.rarity === rarity).length
                          const colors = {
                            "Legendary": "text-yellow-600",
                            "Epic": "text-purple-600", 
                            "Rare": "text-blue-600",
                            "Common": "text-gray-600"
                          }
                          return (
                            <div key={rarity} className="text-center">
                              <div className={`text-3xl font-bold ${colors[rarity as keyof typeof colors]}`}>
                                {count}
                              </div>
                              <div className="text-sm text-muted-foreground">{rarity}</div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </>
  )
}
