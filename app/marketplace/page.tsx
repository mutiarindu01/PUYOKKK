"use client"

import React, { useState, useEffect } from "react"
import UnifiedMarketplace from "@/components/UnifiedMarketplace"
import { EscrowService } from "@/lib/escrow"
import { ethers } from "ethers"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Grid3x3,
  List,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Heart,
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Star,
  Zap,
  Trophy,
  Flame,
  Sparkles,
  CheckCircle,
  X,
  ArrowUpDown,
  MoreHorizontal,
  ShoppingCart,
  Bookmark,
  Share2,
  ExternalLink,
  Palette,
  Music,
  Camera,
  Gamepad2,
  ImageIcon,
  Video,
  Code,
  Globe,
  BarChart3,
  LineChart,
  TrendingDown,
  Activity,
  Shield,
  Lock,
  UserCheck,
  AlertTriangle,
  MessageCircle,
  Bell,
  PlayCircle,
  Coffee,
  Rocket,
  Gavel,
  Timer,
  Layers,
  PieChart,
  Tag,
  Plus,
  Check,
  Coins,
  Minus,
  ArrowLeft,
  ArrowRight,
  Info,
  Send,
  CreditCard,
  Calculator,
  RefreshCw,
  Fuel,
  Building2,
  Smartphone,
  QrCode,
  Headphones,
  AlertCircle,
  Gift,
  Crown,
  Calendar,
  Settings,
  ChevronRight,
  MapPin,
  Verified,
  Award,
  FileText,
  Phone,
  Mail,
  Upload,
  Fingerprint,
  Key,
  Wifi,
  WifiOff,
  Circle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Progress,
} from "@/components/ui/progress"

// NFT Data Type
interface NFT {
  id: string
  name: string
  collection: string
  creator: string
  creatorAvatar: string
  price: number
  currency: string
  image: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  category: string
  verified: boolean
  likes: number
  views: number
  isLive: boolean
  timeLeft?: string
  lastSale?: number
  floorPrice?: number
  volume24h?: number
  traits?: { trait_type: string; value: string }[]
}

// Order Book Types
interface OrderBookEntry {
  price: number
  quantity: number
  total: number
  percentage: number
}

interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  spread: number
  lastPrice: number
}

// Analytics Types
interface PricePoint {
  timestamp: number
  price: number
  volume: number
}

interface AnalyticsData {
  priceHistory: PricePoint[]
  volumeHistory: PricePoint[]
  marketCap: number
  totalSupply: number
  holders: number
  floorPrice: number
  avgPrice: number
  change24h: number
  volume24h: number
}

// Live Activity Types
interface LiveActivity {
  id: string
  type: "sale" | "bid" | "listing" | "transfer"
  nft: string
  user: string
  price?: number
  timestamp: number
  avatar?: string
}

// Sample NFT Data
const sampleNFTs: NFT[] = [
  {
    id: "1",
    name: "Golden Dragon Legendary",
    collection: "Mythical Creatures",
    creator: "@dragons_master",
    creatorAvatar: "",
    price: 125000000,
    currency: "IDR",
    image: "https://cdn.builder.io/api/v1/file/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Ff68d04f7302e4504a1b068fc78cb436e",
    rarity: "Legendary",
    category: "Digital Art",
    verified: true,
    likes: 234,
    views: 1205,
    isLive: true,
    timeLeft: "2h 15m",
    lastSale: 120000000,
    floorPrice: 118000000,
    volume24h: 350000000,
    traits: [
      { trait_type: "Background", value: "Cosmic" },
      { trait_type: "Element", value: "Fire" },
      { trait_type: "Rarity", value: "1/1" }
    ]
  },
  {
    id: "2",
    name: "Epic Phoenix Crown",
    collection: "Royal Collection",
    creator: "@phoenix_arts",
    creatorAvatar: "",
    price: 89500000,
    currency: "IDR",
    image: "https://cdn.builder.io/api/v1/file/assets%2F03926d6811f44e269a1540ca97bdfc0d%2Fb5534d3c4897482fabbf004398457c71",
    rarity: "Epic",
    category: "Digital Art",
    verified: true,
    likes: 189,
    views: 892,
    isLive: false,
    lastSale: 85000000,
    floorPrice: 80000000,
    volume24h: 180000000,
    traits: [
      { trait_type: "Background", value: "Royal" },
      { trait_type: "Element", value: "Lightning" },
      { trait_type: "Rarity", value: "1/10" }
    ]
  },
  {
    id: "3",
    name: "Cyber Punk Warrior",
    collection: "Future Fighters",
    creator: "@cyber_studio",
    creatorAvatar: "",
    price: 45000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Rare",
    category: "Gaming",
    verified: false,
    likes: 156,
    views: 634,
    isLive: true,
    timeLeft: "1d 5h",
    lastSale: 42000000,
    floorPrice: 40000000,
    volume24h: 120000000,
  },
  {
    id: "4",
    name: "Mystic Forest Spirit",
    collection: "Nature Elementals",
    creator: "@forest_keeper",
    creatorAvatar: "",
    price: 32000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Rare",
    category: "Digital Art",
    verified: true,
    likes: 98,
    views: 445,
    isLive: false,
    lastSale: 30000000,
    floorPrice: 28000000,
    volume24h: 85000000,
  },
  {
    id: "5",
    name: "Quantum Music Box",
    collection: "Sound Waves",
    creator: "@music_verse",
    creatorAvatar: "",
    price: 18000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Common",
    category: "Music",
    verified: true,
    likes: 67,
    views: 289,
    isLive: true,
    timeLeft: "8h 30m",
    lastSale: 16000000,
    floorPrice: 15000000,
    volume24h: 45000000,
  },
  {
    id: "6",
    name: "Digital Dreamscape",
    collection: "Abstract Visions",
    creator: "@dream_artist",
    creatorAvatar: "",
    price: 75000000,
    currency: "IDR",
    image: "/api/placeholder/400/400",
    rarity: "Epic",
    category: "Photography",
    verified: true,
    likes: 203,
    views: 967,
    isLive: false,
    lastSale: 72000000,
    floorPrice: 70000000,
    volume24h: 210000000,
  }
]

// Sample Order Book Data
const sampleOrderBook: OrderBook = {
  bids: [
    { price: 125000000, quantity: 3, total: 375000000, percentage: 100 },
    { price: 124000000, quantity: 5, total: 620000000, percentage: 85 },
    { price: 123000000, quantity: 2, total: 246000000, percentage: 70 },
    { price: 122000000, quantity: 8, total: 976000000, percentage: 55 },
    { price: 121000000, quantity: 4, total: 484000000, percentage: 40 },
    { price: 120000000, quantity: 6, total: 720000000, percentage: 25 },
    { price: 119000000, quantity: 3, total: 357000000, percentage: 15 },
  ],
  asks: [
    { price: 126000000, quantity: 2, total: 252000000, percentage: 20 },
    { price: 127000000, quantity: 4, total: 508000000, percentage: 35 },
    { price: 128000000, quantity: 3, total: 384000000, percentage: 50 },
    { price: 129000000, quantity: 6, total: 774000000, percentage: 65 },
    { price: 130000000, quantity: 5, total: 650000000, percentage: 80 },
    { price: 131000000, quantity: 7, total: 917000000, percentage: 95 },
    { price: 132000000, quantity: 2, total: 264000000, percentage: 100 },
  ],
  spread: 1000000,
  lastPrice: 125500000
}

// Sample Analytics Data
const sampleAnalytics: AnalyticsData = {
  priceHistory: Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    price: 125000000 + Math.random() * 20000000 - 10000000,
    volume: Math.random() * 1000000000
  })),
  volumeHistory: Array.from({ length: 7 }, (_, i) => ({
    timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
    price: 0,
    volume: Math.random() * 5000000000
  })),
  marketCap: 15600000000,
  totalSupply: 10000,
  holders: 2847,
  floorPrice: 115000000,
  avgPrice: 125000000,
  change24h: 5.7,
  volume24h: 2300000000
}

// Sample Live Activities
const sampleActivities: LiveActivity[] = [
  { id: "1", type: "sale", nft: "Golden Dragon #1", user: "@crypto_whale", price: 125000000, timestamp: Date.now() - 2 * 60 * 1000, avatar: "" },
  { id: "2", type: "bid", nft: "Epic Phoenix #23", user: "@nft_collector", price: 89000000, timestamp: Date.now() - 5 * 60 * 1000, avatar: "" },
  { id: "3", type: "listing", nft: "Cyber Warrior #456", user: "@gaming_pro", price: 45000000, timestamp: Date.now() - 8 * 60 * 1000, avatar: "" },
  { id: "4", type: "transfer", nft: "Mystic Spirit #789", user: "@forest_lover", timestamp: Date.now() - 12 * 60 * 1000, avatar: "" },
  { id: "5", type: "sale", nft: "Digital Dream #12", user: "@art_enthusiast", price: 75000000, timestamp: Date.now() - 15 * 60 * 1000, avatar: "" },
]

// Sample Wallet Assets
const sampleWalletAssets = {
  ERC20: [
    { id: "1", name: "PUYOK Token", symbol: "PUYOK", balance: "1,000.50", value: 50000000, image: "/api/placeholder/64/64", type: "ERC20" },
    { id: "2", name: "Ethereum", symbol: "ETH", balance: "2.5", value: 120000000, image: "/api/placeholder/64/64", type: "ERC20" },
    { id: "3", name: "USDT", symbol: "USDT", balance: "500.00", value: 7500000, image: "/api/placeholder/64/64", type: "ERC20" },
  ],
  ERC721: [
    { id: "1", name: "Bored Ape #1234", collection: "BAYC", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", value: 125000000, type: "ERC721", rarity: "Rare", isPioneerNFT: false },
    { id: "2", name: "CryptoPunk #5678", collection: "CryptoPunks", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400", value: 280000000, type: "ERC721", rarity: "Epic", isPioneerNFT: false },
    { id: "3", name: "PUYOK Pioneer Badge", collection: "PUYOK Awards", image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400", value: 45000000, type: "ERC721", rarity: "Legendary", isPioneerNFT: true },
  ],
  ERC1155: [
    { id: "1", name: "Gaming Pack #1", collection: "MetaGame", balance: 5, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400", value: 15000000, type: "ERC1155" },
    { id: "2", name: "Music NFT #42", collection: "SoundWave", balance: 3, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", value: 8000000, type: "ERC1155" },
  ]
}

// Sample Payment Accounts
const samplePaymentAccounts = [
  { id: "1", type: "bank", name: "Bank BCA", accountName: "Rafly Rizky", accountNumber: "1234567890", alias: "BCA Utama", logo: "🏦" },
  { id: "2", type: "ewallet", name: "DANA", accountName: "0812-3456-7890", accountNumber: "0812-3456-7890", alias: "DANA Pribadi", logo: "💳" },
  { id: "3", type: "ewallet", name: "OVO", accountName: "0856-7890-1234", accountNumber: "0856-7890-1234", alias: "OVO Business", logo: "💰" },
  { id: "4", type: "bank", name: "Bank Mandiri", accountName: "Rafly Rizky", accountNumber: "9876543210", alias: "Mandiri Saving", logo: "🏛️" },
]

// Token Order Book Types and Data
interface TokenOrder {
  id: string
  token: {
    id: string
    name: string
    symbol: string
    contractAddress: string
    decimals: number
    logo: string
    description?: string
    totalSupply: string
    verified: boolean
  }
  side: "buy" | "sell"
  price: number
  amount: number
  filled: number
  total: number
  maker: {
    address: string
    username?: string
    reputation: number
    completedTrades: number
    isVerified: boolean
    avatar?: string
    joinedAt: string
    responseTime: string
    escrowRating: number
  }
  paymentMethod: "gasless" | "onchain"
  paymentDetails?: {
    methods: string[]
    accountInfo?: any
  }
  createdAt: string
  expiresAt: string
  status: "active" | "filled" | "cancelled" | "expired"
  feeStructure: {
    makerFee: number
    takerFee: number
    gasFee?: number
  }
  notes?: string
  tradingPairs?: string[]
}

interface TokenInfo {
  id: string
  name: string
  symbol: string
  contractAddress: string
  decimals: number
  logo: string
  currentPrice: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  totalSupply: string
  verified: boolean
  description: string
  website?: string
  twitter?: string
  telegram?: string
}

// Enhanced User Profile with KYC and Security Features
interface UserProfile {
  id: string
  username: string
  email: string
  phone: string
  avatar: string
  kycLevel: "none" | "basic" | "advanced" | "premium"
  kycStatus: "pending" | "verified" | "rejected"
  membershipTier: "basic" | "silver" | "gold" | "platinum"
  reputation: number
  totalTrades: number
  successRate: number
  responseTime: string
  joinedAt: string
  lastActive: string
  escrowRating: number
  disputeCount: number
  warningCount: number
  is2FAEnabled: boolean
  isPhoneVerified: boolean
  isEmailVerified: boolean
  transactionLimits: {
    daily: number
    monthly: number
    used: {
      daily: number
      monthly: number
    }
  }
  loyaltyPoints: number
  referralCode: string
  referredBy?: string
  languages: string[]
  preferredPayments: string[]
  location: {
    country: string
    city: string
  }
}

// Smart Contract Escrow Data
interface EscrowContract {
  id: string
  contractAddress: string
  status: "created" | "funded" | "released" | "disputed" | "cancelled"
  buyer: string
  seller: string
  asset: {
    type: "ERC20" | "ERC721" | "ERC1155"
    contractAddress: string
    tokenId?: string
    amount: number
  }
  paymentAmount: number
  currency: string
  escrowFee: number
  insuranceFee: number
  createdAt: string
  expiresAt: string
  milestones: {
    id: string
    name: string
    completed: boolean
    timestamp?: string
  }[]
  disputeId?: string
}

// Chat Message Interface
interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  orderId: string
  message: string
  timestamp: string
  type: "text" | "image" | "file" | "payment_proof" | "system"
  fileUrl?: string
  fileName?: string
  isRead: boolean
  reactions?: { emoji: string; userId: string }[]
}

// Dispute System
interface Dispute {
  id: string
  orderId: string
  escrowId: string
  complainant: string
  respondent: string
  reason: string
  status: "open" | "investigating" | "mediation" | "resolved" | "escalated"
  priority: "low" | "medium" | "high" | "urgent"
  evidence: {
    id: string
    type: "text" | "image" | "document"
    content: string
    uploadedBy: string
    timestamp: string
  }[]
  mediatorId?: string
  resolution?: string
  createdAt: string
  resolvedAt?: string
  compensationAmount?: number
}

// Sample Enhanced User Data
const sampleUser: UserProfile = {
  id: "user-123",
  username: "bude_putuk",
  email: "bude.putuk@puyok.com",
  phone: "+62812-3456-7890",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64",
  kycLevel: "premium",
  kycStatus: "verified",
  membershipTier: "platinum",
  reputation: 4.9,
  totalTrades: 1247,
  successRate: 99.2,
  responseTime: "< 2 menit",
  joinedAt: "2023-01-15",
  lastActive: "2024-01-20T15:30:00Z",
  escrowRating: 5.0,
  disputeCount: 0,
  warningCount: 0,
  is2FAEnabled: true,
  isPhoneVerified: true,
  isEmailVerified: true,
  transactionLimits: {
    daily: 1000000000, // 1B IDR for platinum
    monthly: 25000000000, // 25B IDR
    used: {
      daily: 245000000,
      monthly: 3200000000
    }
  },
  loyaltyPoints: 15420,
  referralCode: "BUDEPT2024",
  referredBy: "pioneer_user",
  languages: ["Bahasa Indonesia", "English"],
  preferredPayments: ["DANA", "BCA", "OVO"],
  location: {
    country: "Indonesia",
    city: "Jakarta"
  }
}

// Sample Escrow Contracts
const sampleEscrowContracts: EscrowContract[] = [
  {
    id: "escrow-001",
    contractAddress: "0xabc123...def456",
    status: "funded",
    buyer: "crypto_whale_id",
    seller: "nft_creator_pro",
    asset: {
      type: "ERC721",
      contractAddress: "0x123...456",
      tokenId: "1234",
      amount: 1
    },
    paymentAmount: 125000000,
    currency: "IDR",
    escrowFee: 1250000, // 1%
    insuranceFee: 625000, // 0.5%
    createdAt: "2024-01-20T10:00:00Z",
    expiresAt: "2024-01-22T10:00:00Z",
    milestones: [
      { id: "1", name: "Payment Confirmed", completed: true, timestamp: "2024-01-20T10:15:00Z" },
      { id: "2", name: "Asset Transferred to Escrow", completed: true, timestamp: "2024-01-20T10:30:00Z" },
      { id: "3", name: "Buyer Confirmation", completed: false },
      { id: "4", name: "Asset Release", completed: false }
    ]
  }
]

// Sample Chat Messages
const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "crypto_whale_id",
    receiverId: "nft_creator_pro",
    orderId: "order-1",
    message: "Halo! Saya tertarik dengan NFT Anda. Apakah masih available?",
    timestamp: "2024-01-20T10:00:00Z",
    type: "text",
    isRead: true
  },
  {
    id: "msg-2",
    senderId: "nft_creator_pro",
    receiverId: "crypto_whale_id",
    message: "Halo! Ya masih available. Harga fixed atau bisa nego?",
    timestamp: "2024-01-20T10:02:00Z",
    type: "text",
    isRead: true
  },
  {
    id: "msg-3",
    senderId: "crypto_whale_id",
    receiverId: "nft_creator_pro",
    message: "Saya sudah transfer pembayaran. Ini bukti transfernya.",
    timestamp: "2024-01-20T10:15:00Z",
    type: "payment_proof",
    fileUrl: "/api/placeholder/400/300",
    fileName: "transfer_proof.jpg",
    isRead: true
  }
]

// Sample tokens with more data
const sampleTokens: TokenInfo[] = [
  {
    id: "puyok-token",
    name: "PUYOK Token",
    symbol: "PUYOK",
    contractAddress: "0x123...abc",
    decimals: 18,
    logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100",
    currentPrice: 50000,
    priceChange24h: 12.5,
    volume24h: 1250000000,
    marketCap: 25000000000,
    totalSupply: "100000000",
    verified: true,
    description: "Native utility token of the PUYOK ecosystem",
    website: "https://puyok.com",
    twitter: "@puyok_official"
  },
  {
    id: "dragon-coin",
    name: "Dragon Coin",
    symbol: "DRG",
    contractAddress: "0x456...def",
    decimals: 18,
    logo: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100",
    currentPrice: 87500,
    priceChange24h: -5.2,
    volume24h: 850000000,
    marketCap: 15750000000,
    totalSupply: "9000000",
    verified: true,
    description: "Gaming token for Dragon NFT ecosystem"
  },
  {
    id: "stellar-token",
    name: "Stellar Coin",
    symbol: "STR",
    contractAddress: "0x789...ghi",
    decimals: 18,
    logo: "https://images.unsplash.com/photo-1552242718-3db51684dd23?w=100",
    currentPrice: 125000,
    priceChange24h: 8.7,
    volume24h: 650000000,
    marketCap: 18750000000,
    totalSupply: "15000000",
    verified: true,
    description: "Decentralized finance token for space exploration"
  }
]

// Enhanced sample orders with diverse users
const sampleTokenOrders: TokenOrder[] = [
  {
    id: "order-1",
    token: sampleTokens[0],
    side: "buy",
    price: 48000,
    amount: 10000,
    filled: 0,
    total: 480000000,
    maker: {
      address: "0x789...123",
      username: "crypto_whale_id",
      reputation: 4.9,
      completedTrades: 256,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64",
      joinedAt: "2023-01-15",
      responseTime: "< 5 menit",
      escrowRating: 4.8
    },
    paymentMethod: "gasless",
    paymentDetails: {
      methods: ["DANA", "OVO", "Bank BCA"]
    },
    createdAt: "2024-01-20T10:00:00Z",
    expiresAt: "2024-01-27T10:00:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.1,
      takerFee: 0.15
    },
    notes: "Hanya untuk trader berpengalaman. Payment dalam 15 menit.",
    tradingPairs: ["PUYOK/USDT", "PUYOK/IDR"]
  },
  {
    id: "order-2",
    token: sampleTokens[0],
    side: "sell",
    price: 52000,
    amount: 5000,
    filled: 1000,
    total: 260000000,
    maker: {
      address: "0xabc...789",
      username: "hodler_pro",
      reputation: 4.7,
      completedTrades: 189,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64",
      joinedAt: "2023-03-20",
      responseTime: "< 10 menit",
      escrowRating: 4.9
    },
    paymentMethod: "onchain",
    createdAt: "2024-01-20T11:00:00Z",
    expiresAt: "2024-01-25T11:00:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.05,
      takerFee: 0.1,
      gasFee: 0.02
    },
    notes: "Token berkualitas untuk long-term holding. Fast execution.",
    tradingPairs: ["PUYOK/ETH"]
  },
  {
    id: "order-3",
    token: sampleTokens[1],
    side: "buy",
    price: 85000,
    amount: 2500,
    filled: 0,
    total: 212500000,
    maker: {
      address: "0xdef...456",
      username: "dragon_collector",
      reputation: 4.8,
      completedTrades: 92,
      isVerified: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64",
      joinedAt: "2023-07-10",
      responseTime: "< 20 menit",
      escrowRating: 4.6
    },
    paymentMethod: "gasless",
    paymentDetails: {
      methods: ["GoPay", "Bank Mandiri"]
    },
    createdAt: "2024-01-20T12:30:00Z",
    expiresAt: "2024-01-23T12:30:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.15,
      takerFee: 0.20
    },
    notes: "Looking for bulk purchase. Serious buyers only.",
    tradingPairs: ["DRG/IDR"]
  },
  {
    id: "order-4",
    token: sampleTokens[1],
    side: "sell",
    price: 90000,
    amount: 1200,
    filled: 300,
    total: 108000000,
    maker: {
      address: "0x321...987",
      username: "gaming_maven",
      reputation: 4.5,
      completedTrades: 67,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64",
      joinedAt: "2023-09-05",
      responseTime: "< 15 menit",
      escrowRating: 4.7
    },
    paymentMethod: "gasless",
    paymentDetails: {
      methods: ["DANA", "OVO", "SeaBank"]
    },
    createdAt: "2024-01-20T09:15:00Z",
    expiresAt: "2024-01-24T09:15:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.12,
      takerFee: 0.18
    },
    notes: "Premium gaming tokens from verified collection. Quick settlement.",
    tradingPairs: ["DRG/USDT", "DRG/PUYOK"]
  },
  {
    id: "order-5",
    token: sampleTokens[2],
    side: "buy",
    price: 120000,
    amount: 800,
    filled: 0,
    total: 96000000,
    maker: {
      address: "0x654...321",
      username: "stellar_investor",
      reputation: 4.9,
      completedTrades: 445,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64",
      joinedAt: "2022-11-12",
      responseTime: "< 5 menit",
      escrowRating: 5.0
    },
    paymentMethod: "onchain",
    createdAt: "2024-01-20T14:20:00Z",
    expiresAt: "2024-01-26T14:20:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.05,
      takerFee: 0.10,
      gasFee: 0.01
    },
    notes: "High-volume trader. Instant execution preferred.",
    tradingPairs: ["STR/ETH", "STR/USDC"]
  },
  {
    id: "order-6",
    token: sampleTokens[2],
    side: "sell",
    price: 128000,
    amount: 1500,
    filled: 500,
    total: 192000000,
    maker: {
      address: "0x987...654",
      username: "defi_pioneer",
      reputation: 4.6,
      completedTrades: 156,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64",
      joinedAt: "2023-02-28",
      responseTime: "< 30 menit",
      escrowRating: 4.8
    },
    paymentMethod: "gasless",
    paymentDetails: {
      methods: ["Bank BCA", "Bank Mandiri", "DANA"]
    },
    createdAt: "2024-01-20T08:45:00Z",
    expiresAt: "2024-01-28T08:45:00Z",
    status: "active",
    feeStructure: {
      makerFee: 0.10,
      takerFee: 0.15
    },
    notes: "DeFi specialist. Flexible payment terms for bulk orders.",
    tradingPairs: ["STR/IDR"]
  }
]

// Smart Price Recommendations
const generatePriceRecommendation = (asset: any) => {
  // Local formatPrice function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const marketData = {
    averagePrice: asset.value,
    floorPrice: asset.value * 0.8,
    ceilingPrice: asset.value * 1.3,
    salesVolume24h: Math.floor(Math.random() * 20) + 5,
    avgSaleDays: Math.floor(Math.random() * 5) + 1,
    successRate: Math.floor(Math.random() * 30) + 70
  }

  return {
    ...marketData,
    tips: [
      `💡 NFT dengan gaya '${asset.collection}' di kisaran harga ini biasanya terjual dalam ${marketData.avgSaleDays * 24} jam`,
      `💡 Pengguna yang menerima pembayaran via DANA memiliki tingkat penyelesaian 15% lebih tinggi`,
      `���� Kolektor cenderung membayar lebih untuk NFT yang dijual oleh kreator dengan rating sempurna`,
      `💡 Harga antara ${formatPrice(marketData.floorPrice)} - ${formatPrice(marketData.averagePrice)} memiliki konversi tertinggi`
    ]
  }
}

// Categories with icons
const categories = [
  { id: "all", name: "Semua", icon: Globe, count: 1247 },
  { id: "digital-art", name: "Digital Art", icon: Palette, count: 456 },
  { id: "gaming", name: "Gaming", icon: Gamepad2, count: 234 },
  { id: "music", name: "Music", icon: Music, count: 189 },
  { id: "photography", name: "Photography", icon: Camera, count: 167 },
  { id: "video", name: "Video", icon: Video, count: 123 },
  { id: "code", name: "Code", icon: Code, count: 78 },
]

// Filter options
const rarityOptions = ["Common", "Rare", "Epic", "Legendary"]
const statusOptions = ["For Sale", "Live Auction", "Recently Sold", "Not for Sale"]
const priceRanges = [
  { label: "Under 10M IDR", min: 0, max: 10000000 },
  { label: "10M - 50M IDR", min: 10000000, max: 50000000 },
  { label: "50M - 100M IDR", min: 50000000, max: 100000000 },
  { label: "Over 100M IDR", min: 100000000, max: 1000000000 },
]

// Token Order Book Section Component
function TokenOrderBookSection() {
  // States for token order book
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(sampleTokens[0])
  const [selectedTokenOrder, setSelectedTokenOrder] = useState<TokenOrder | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showCreateTokenOrder, setShowCreateTokenOrder] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [showTutorialModal, setShowTutorialModal] = useState(false)
  const [currentChatOrder, setCurrentChatOrder] = useState<TokenOrder | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(sampleChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [currentUser] = useState(sampleUser)
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowContract | null>(null)
  const [showPriceAlerts, setShowPriceAlerts] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(1)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatToken = (amount: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Baru saja"
    if (minutes < 60) return `${minutes} menit lalu`
    if (hours < 24) return `${hours} jam lalu`
    return `${days} hari lalu`
  }

  function TokenSelector() {
    return (
      <div className="mb-6">
        <Label className="text-white font-medium mb-3 block">Pilih Token</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => setSelectedToken(token)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedToken?.id === token.id
                  ? "border-green-500 bg-green-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={token.logo} alt={token.symbol} className="w-12 h-12 rounded-full" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">{token.symbol}</h4>
                  <p className="text-sm text-slate-400">{token.name}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{formatCurrency(token.currentPrice)}</div>
                <div className={`text-sm ${
                  token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  function OrderBookTable() {
    const filteredOrders = sampleTokenOrders.filter(order =>
      !selectedToken || order.token.id === selectedToken.id
    )

    const buyOrders = filteredOrders.filter(order => order.side === "buy").sort((a, b) => b.price - a.price)
    const sellOrders = filteredOrders.filter(order => order.side === "sell").sort((a, b) => a.price - b.price)

    const OrderCard = ({ order }: { order: TokenOrder }) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 rounded-lg border cursor-pointer transition-all ${
          order.side === "buy"
            ? "border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
            : "border-red-500/30 bg-red-500/5 hover:bg-red-500/10"
        }`}
        onClick={() => {
          setSelectedTokenOrder(order)
          setShowOrderDetails(true)
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={order.maker.avatar} alt={order.maker.username} className="w-8 h-8 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{order.maker.username}</span>
                {order.maker.isVerified && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>⭐ {order.maker.reputation.toFixed(1)}</span>
                <span>•</span>
                <span>{order.maker.completedTrades} trades</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${
              order.side === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}>
              {order.side.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-xs text-slate-400">Harga</div>
            <div className={`font-semibold ${
              order.side === "buy" ? "text-green-400" : "text-red-400"
            }`}>
              {formatCurrency(order.price)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Jumlah</div>
            <div className="text-white font-medium">
              {formatToken(order.amount - order.filled)} {order.token.symbol}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm">
            <span className="text-slate-400">Total: </span>
            <span className="text-white font-medium">{formatCurrency(order.total - (order.filled * order.price))}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {order.paymentMethod === "gasless" ? (
              <>
                <CreditCard className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400">Gasless</span>
              </>
            ) : (
              <>
                <Fuel className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400">On-chain</span>
              </>
            )}
          </div>
        </div>

        {order.paymentMethod === "gasless" && order.paymentDetails && (
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
            <span>Payment:</span>
            {order.paymentDetails.methods.slice(0, 2).map((method, index) => (
              <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                {method}
              </Badge>
            ))}
            {order.paymentDetails.methods.length > 2 && (
              <span className="text-slate-500">+{order.paymentDetails.methods.length - 2}</span>
            )}
          </div>
        )}

        <div className="text-xs text-slate-500">
          {formatTimeAgo(order.createdAt)}
        </div>
      </motion.div>
    )

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buy Orders */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Buy Orders ({buyOrders.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {buyOrders.length > 0 ? buyOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            )) : (
              <div className="text-center py-8 text-slate-400">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Tidak ada buy order untuk token ini</p>
              </div>
            )}
          </div>
        </div>

        {/* Sell Orders */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            Sell Orders ({sellOrders.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sellOrders.length > 0 ? sellOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            )) : (
              <div className="text-center py-8 text-slate-400">
                <TrendingDown className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Tidak ada sell order untuk token ini</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Token Selector */}
      <TokenSelector />

      {/* Selected Token Info */}
      {selectedToken && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={selectedToken.logo} alt={selectedToken.symbol} className="w-16 h-16 rounded-full" />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{selectedToken.name}</h2>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-slate-400">{selectedToken.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span>Vol 24h: {formatCurrency(selectedToken.volume24h)}</span>
                    <span>•</span>
                    <span>Market Cap: {formatCurrency(selectedToken.marketCap)}</span>
                    <span>•</span>
                    <span>Supply: {selectedToken.totalSupply} {selectedToken.symbol}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{formatCurrency(selectedToken.currentPrice)}</div>
                <div className={`text-lg ${
                  selectedToken.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedToken.priceChange24h >= 0 ? '+' : ''}{selectedToken.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="border-slate-600 text-slate-300">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Order Book */}
      <OrderBookTable />

      {/* KYC Verification Modal */}
      <Dialog open={showKYCModal} onOpenChange={setShowKYCModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Verified className="w-6 h-6 text-blue-400" />
              Verifikasi KYC - Level {currentUser.kycLevel}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Tingkatkan limit transaksi dan kepercayaan dengan verifikasi identitas
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-3">Level Verifikasi</h4>
              <div className="space-y-3">
                {[
                  { level: "basic", name: "Basic", limit: "50 Juta/hari", completed: currentUser.kycLevel !== "none" },
                  { level: "advanced", name: "Advanced", limit: "200 Juta/hari", completed: ["advanced", "premium"].includes(currentUser.kycLevel) },
                  { level: "premium", name: "Premium", limit: "1 Miliar/hari", completed: currentUser.kycLevel === "premium" }
                ].map((tier, index) => (
                  <div key={tier.level} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tier.completed ? "bg-green-500" : "bg-slate-700"
                    }`}>
                      {tier.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="text-white text-sm">{index + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{tier.name} KYC</div>
                      <div className="text-slate-400 text-sm">Limit: {tier.limit}</div>
                    </div>
                    {tier.completed && <Badge className="bg-green-500/20 text-green-400">Verified</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowKYCModal(false)} className="flex-1 border-slate-600">
                Tutup
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Lanjutkan Verifikasi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Real-Time Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Chat dengan {currentChatOrder?.maker.username}
              <div className="flex items-center gap-1 ml-auto">
                <Circle className="w-2 h-2 fill-green-400 text-green-400" />
                <span className="text-xs text-green-400">Online</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-96">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-800/30 rounded-lg">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === currentUser.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <div className="text-sm">{message.message}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-600"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Modal */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTokenOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <img src={selectedTokenOrder.token.logo} alt={selectedTokenOrder.token.symbol} className="w-8 h-8 rounded-full" />
                  {selectedTokenOrder.side === "buy" ? "Buy" : "Sell"} Order - {selectedTokenOrder.token.symbol}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Order details dari {selectedTokenOrder.maker.username}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Trader Info */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Trader Information
                  </h4>
                  <div className="flex items-center gap-4">
                    <img src={selectedTokenOrder.maker.avatar} alt={selectedTokenOrder.maker.username} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold text-white">{selectedTokenOrder.maker.username}</span>
                        {selectedTokenOrder.maker.isVerified && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Reputation: </span>
                          <span className="text-yellow-400">⭐ {selectedTokenOrder.maker.reputation.toFixed(1)}/5.0</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Completed: </span>
                          <span className="text-green-400">{selectedTokenOrder.maker.completedTrades} trades</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Response: </span>
                          <span className="text-blue-400">{selectedTokenOrder.maker.responseTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Escrow: </span>
                          <span className="text-purple-400">⚡ {selectedTokenOrder.maker.escrowRating.toFixed(1)}/5.0</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Joined: </span>
                          <span className="text-slate-300">{selectedTokenOrder.maker.joinedAt}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Address: </span>
                          <span className="text-slate-300 font-mono text-xs">{shortenAddress(selectedTokenOrder.maker.address)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Order Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <Badge className={`${
                          selectedTokenOrder.side === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}>
                          {selectedTokenOrder.side.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price:</span>
                        <span className="text-white font-medium">{formatCurrency(selectedTokenOrder.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount:</span>
                        <span className="text-white">{formatToken(selectedTokenOrder.amount)} {selectedTokenOrder.token.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Filled:</span>
                        <span className="text-yellow-400">{formatToken(selectedTokenOrder.filled)} {selectedTokenOrder.token.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Remaining:</span>
                        <span className="text-green-400">{formatToken(selectedTokenOrder.amount - selectedTokenOrder.filled)} {selectedTokenOrder.token.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Value:</span>
                        <span className="text-white font-bold">{formatCurrency(selectedTokenOrder.total - (selectedTokenOrder.filled * selectedTokenOrder.price))}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Payment Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {selectedTokenOrder.paymentMethod === "gasless" ? (
                          <>
                            <CreditCard className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-medium">Gasless P2P</span>
                          </>
                        ) : (
                          <>
                            <Fuel className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-medium">On-chain Direct</span>
                          </>
                        )}
                      </div>

                      {selectedTokenOrder.paymentMethod === "gasless" && selectedTokenOrder.paymentDetails && (
                        <div>
                          <div className="text-sm text-slate-400 mb-2">Accepted Methods:</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedTokenOrder.paymentDetails.methods.map((method, index) => (
                              <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-400">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-slate-500">
                        <div>Maker Fee: {selectedTokenOrder.feeStructure.makerFee}%</div>
                        <div>Taker Fee: {selectedTokenOrder.feeStructure.takerFee}%</div>
                        {selectedTokenOrder.feeStructure.gasFee && (
                          <div>Gas Fee: ~{selectedTokenOrder.feeStructure.gasFee}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trading Pairs */}
                {selectedTokenOrder.tradingPairs && (
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      Available Trading Pairs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTokenOrder.tradingPairs.map((pair, index) => (
                        <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                          {pair}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedTokenOrder.notes && (
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Trader Notes
                    </h4>
                    <p className="text-slate-300 text-sm">{selectedTokenOrder.notes}</p>
                  </div>
                )}

                {/* Time Info */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Created: </span>
                      <span className="text-slate-300">{formatTimeAgo(selectedTokenOrder.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Expires: </span>
                      <span className="text-orange-400">{formatTimeAgo(selectedTokenOrder.expiresAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className={`flex-1 ${
                      selectedTokenOrder.side === "buy"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {selectedTokenOrder.side === "buy" ? "Sell to this buyer" : "Buy from this seller"}
                  </Button>
                  <Button variant="outline" className="border-slate-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" className="border-slate-600">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function MarketplacePage() {
  // Add scrollbar hiding styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  // State Management
  const [activeTab, setActiveTab] = useState<"nfts" | "tokens" | "collections">("nfts")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [gridSize, setGridSize] = useState<"compact" | "comfortable" | "spacious">("comfortable")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000000])
  const [selectedRarity, setSelectedRarity] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [filteredNFTs, setFilteredNFTs] = useState(sampleNFTs)
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showOrderBook, setShowOrderBook] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showLiveActivity, setShowLiveActivity] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [isPlayingLive, setIsPlayingLive] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<NFT[]>([])
  const [aiSearchSuggestions, setAiSearchSuggestions] = useState<string[]>([])
  const [showAiFeatures, setShowAiFeatures] = useState(false)
  const [aiAnalysisResults, setAiAnalysisResults] = useState<string>("")
  const [showCreateOrder, setShowCreateOrder] = useState(false)
  const [createOrderStep, setCreateOrderStep] = useState(1)
  const [selectedAssetType, setSelectedAssetType] = useState<"ERC20" | "ERC721" | "ERC1155" | null>(null)
  const [walletAssets, setWalletAssets] = useState<any[]>([])
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [orderQuantity, setOrderQuantity] = useState(1)
  const [desiredAsset, setDesiredAsset] = useState("")
  const [exchangeRate, setExchangeRate] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"onchain" | "hybrid">("hybrid")
  const [feeModel, setFeeModel] = useState<"gasless" | "self_gas">("gasless")
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState("")
  const [listingDescription, setListingDescription] = useState("")
  const [priceRecommendation, setPriceRecommendation] = useState<any>(null)
  const [showSmartTips, setShowSmartTips] = useState(true)
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false)
  const [userAddress, setUserAddress] = useState("")

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale": return <ShoppingCart className="w-4 h-4 text-green-400" />
      case "bid": return <Gavel className="w-4 h-4 text-blue-400" />
      case "listing": return <Tag className="w-4 h-4 text-yellow-400" />
      case "transfer": return <ArrowUpDown className="w-4 h-4 text-purple-400" />
      default: return <Activity className="w-4 h-4 text-slate-400" />
    }
  }

  // Handle Create Escrow Order using EscrowPUYOK contract
  const handleCreateEscrowOrder = async () => {
    try {
      if (!selectedAsset || !exchangeRate || !selectedPaymentAccount) {
        alert("Mohon lengkapi semua data order")
        return
      }

      // Check if MetaMask is available
      if (typeof window.ethereum === 'undefined') {
        alert("MetaMask tidak terdeteksi. Silakan install MetaMask terlebih dahulu.")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const userAddress = await signer.getAddress()

      // Prepare order input based on contract structure
      const orderInput = {
        assetAddress: selectedAsset.contract_address || selectedAsset.address,
        assetId: selectedAsset.token_id || 0,
        assetAmount: orderQuantity,
        priceInIDR: ethers.parseUnits(exchangeRate, 18), // Convert to wei
        deadline: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days from now
        paymentMethod: selectedPaymentAccount?.provider_name || "Bank Transfer",
        notes: listingDescription || "NFT listing via PUYOK marketplace",
        metadataURI: selectedAsset.image || "",
        paymentChannel: feeModel === "gasless" ? 0 : 1, // 0 = gasless, 1 = self_gas
        orderFeePercent: 250, // 2.5% fee
        orderType: 0, // 0 = SELL order
        isSpecialBehavior: false,
        assetType: selectedAssetType === "ERC721" ? 0 : selectedAssetType === "ERC1155" ? 1 : 2 // 0=ERC721, 1=ERC1155, 2=ERC20
      }

      // Initialize EscrowService
      const escrowService = new EscrowService()

      // Check if escrow service is properly initialized
      if (!escrowService.isInitialized()) {
        alert("Escrow service belum terinisialisasi. Silakan coba lagi.")
        return
      }

      // Create contract instance with signer
      const contractWithSigner = new ethers.Contract(
        escrowService.getContractAddress(),
        escrowService.contract!.interface,
        signer
      )

      console.log("🚀 Creating order with data:", orderInput)

      // Call the appropriate contract function based on asset type
      let tx
      if (selectedAssetType === "ERC721") {
        tx = await contractWithSigner.createOrderERC721(orderInput)
      } else if (selectedAssetType === "ERC1155") {
        tx = await contractWithSigner.createOrderERC1155(orderInput)
      } else if (selectedAssetType === "ERC20") {
        tx = await contractWithSigner.createOrderERC20(orderInput)
      } else {
        throw new Error("Tipe asset tidak valid")
      }

      console.log("📝 Transaction sent:", tx.hash)

      // Wait for confirmation
      const receipt = await tx.wait()
      console.log("✅ Transaction confirmed:", receipt)

      // Success notification
      alert("🎉 Order berhasil dibuat di EscrowPUYOK! Pembeli dapat melihat order Anda sekarang.")

      // Reset form
      setShowCreateOrder(false)
      setCreateOrderStep(1)
      setSelectedAssetType(null)
      setSelectedAsset(null)
      setExchangeRate("")
      setListingDescription("")

    } catch (error: any) {
      console.error("Error creating escrow order:", error)

      if (error.code === 4001) {
        alert("Transaksi dibatalkan oleh user")
      } else if (error.message?.includes("insufficient funds")) {
        alert("Saldo tidak cukup untuk gas fee")
      } else {
        alert(`Error membuat order: ${error.message || "Unknown error"}`)
      }
    }
  }

  // Load wallet assets for selected type
  const loadWalletAssets = async (assetType: "ERC20" | "ERC721" | "ERC1155") => {
    try {
      setLoadingWalletAssets(true)

      if (typeof window.ethereum === 'undefined') {
        alert("MetaMask tidak terdeteksi")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setUserAddress(address)

      // For demo, create mock wallet assets based on asset type
      let mockAssets: any[] = []

      if (assetType === "ERC721") {
        mockAssets = [
          {
            id: "nft-1",
            name: "Indonesian Heritage #001",
            collection: "Indonesian NFT Collection",
            image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2F621f7614b36148e9b3e41ac80f97eb07?alt=media&token=9dfccc14-99eb-403d-9c27-83c57aecf064&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
            contract_address: "0x1234567890123456789012345678901234567890",
            token_id: "1",
            token_standard: "ERC721"
          },
          {
            id: "nft-2",
            name: "Batik Digital #05",
            collection: "Cultural Arts",
            image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Ff1234567890abcdef1234567890abcdef?alt=media&token=sample-token&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
            contract_address: "0x0987654321098765432109876543210987654321",
            token_id: "5",
            token_standard: "ERC721"
          }
        ]
      } else if (assetType === "ERC1155") {
        mockAssets = [
          {
            id: "nft1155-1",
            name: "Gaming Token Pack",
            collection: "GameFi Assets",
            image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fgaming-pack?alt=media&token=sample&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
            contract_address: "0xaabbccddaabbccddaabbccddaabbccddaabbccdd",
            token_id: "10",
            balance: "25",
            token_standard: "ERC1155"
          }
        ]
      } else if (assetType === "ERC20") {
        mockAssets = [
          {
            id: "token-1",
            name: "USDT",
            symbol: "USDT",
            image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fusdt-logo?alt=media&token=sample&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
            contract_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            balance: "1000.50",
            decimals: 6,
            token_standard: "ERC20"
          },
          {
            id: "token-2",
            name: "Indonesian Rupiah Token",
            symbol: "IDRT",
            image: "https://cdn.builder.io/o/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fidrt-logo?alt=media&token=sample&apiKey=e1dcaf7f92ea487e93771f915bcf348b",
            contract_address: "0x998b3c5c8e3c5c8e3c5c8e3c5c8e3c5c8e3c5c8e",
            balance: "5000000",
            decimals: 18,
            token_standard: "ERC20"
          }
        ]
      }

      setWalletAssets(mockAssets)
    } catch (error) {
      console.error("Error loading wallet assets:", error)
      alert("Error memuat asset wallet: " + (error as Error).message)
    } finally {
      setLoadingWalletAssets(false)
    }
  }

  // AI-Powered Features
  const generateAiRecommendations = () => {
    // Simulate AI recommendation algorithm
    const userInterests = favorites.length > 0 ? sampleNFTs.filter(nft => favorites.includes(nft.id)) : []
    const recommended = sampleNFTs
      .filter(nft => !favorites.includes(nft.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    setAiRecommendations(recommended)
  }

  const generateSearchSuggestions = (query: string) => {
    if (query.length < 2) {
      setAiSearchSuggestions([])
      return
    }

    const suggestions = [
      `${query} - trending`,
      `${query} - by verified artists`,
      `${query} - under 50M IDR`,
      `${query} - rare items`,
      `similar to ${query}`
    ]
    setAiSearchSuggestions(suggestions)
  }

  const performAiAnalysis = () => {
    const analysis = `
AI Market Analysis:
• Current trend: Gaming NFTs showing 23% growth
• Optimal price range: 45M-125M IDR
���� Best selling time: Weekends 7-9 PM
• Similar collections performing 15% above average
• Recommendation: Consider listing during peak hours
    `.trim()
    setAiAnalysisResults(analysis)
  }

  // Toggle favorite
  const toggleFavorite = (nftId: string) => {
    setFavorites(prev => 
      prev.includes(nftId) 
        ? prev.filter(id => id !== nftId)
        : [...prev, nftId]
    )
  }

  // Filter NFTs based on criteria
  useEffect(() => {
    let filtered = sampleNFTs.filter(nft => {
      // Search filter
      if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !nft.collection.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !nft.creator.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategory !== "all") {
        const categoryMap: { [key: string]: string } = {
          "digital-art": "Digital Art",
          "gaming": "Gaming",
          "music": "Music",
          "photography": "Photography",
          "video": "Video",
          "code": "Code"
        }
        if (nft.category !== categoryMap[selectedCategory]) return false
      }

      // Price filter
      if (nft.price < priceRange[0] || nft.price > priceRange[1]) return false

      // Rarity filter
      if (selectedRarity.length > 0 && !selectedRarity.includes(nft.rarity)) return false

      // Status filter
      if (selectedStatus.length > 0) {
        if (selectedStatus.includes("For Sale") && !nft.isLive) return false
        if (selectedStatus.includes("Live Auction") && !nft.isLive) return false
        // Add more status logic as needed
      }

      // Verified filter
      if (verifiedOnly && !nft.verified) return false

      return true
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "likes": return b.likes - a.likes
        case "recent": return new Date().getTime() - new Date().getTime() // Mock recent
        default: return 0
      }
    })

    setFilteredNFTs(filtered)
  }, [searchTerm, selectedCategory, priceRange, selectedRarity, selectedStatus, verifiedOnly, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Marketplace Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Marketplace</span>
          </div>

          {/* Title & Stats */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  NFT Marketplace
                </h1>
                <p className="text-sm sm:text-base text-slate-400">
                  Discover, collect, and trade extraordinary NFTs
                </p>
              </div>

              {/* Universal Create Swap Button */}
              <div className="flex justify-center md:justify-end">
                <Button
                  onClick={() => setShowCreateOrder(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  size="lg"
                >
                  <Shield className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="flex flex-col items-center">
                    <span className="font-bold">Buat Order Escrow</span>
                    <span className="text-xs opacity-90">NFT • Token • Aman dengan Smart Contract</span>
                  </span>
                </Button>
              </div>
            </div>

            {/* Mobile-Optimized Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:flex lg:items-center lg:justify-end">
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">1.2K</div>
                <div className="text-xs text-slate-400">Items</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">89</div>
                <div className="text-xs text-slate-400">Collections</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-lg p-3 lg:bg-transparent lg:p-0">
                <div className="text-lg sm:text-xl font-bold text-white">2.3K</div>
                <div className="text-xs text-slate-400">Owners</div>
              </div>
            </div>
          </div>

          {/* AI-Enhanced Search Bar */}
          <div className="relative w-full lg:max-w-2xl">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <Input
              placeholder="Search NFTs, collections... (AI-powered)"
              className="pl-10 sm:pl-12 pr-12 sm:pr-16 py-2.5 sm:py-3 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-xl text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                generateSearchSuggestions(e.target.value)
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              onClick={() => setShowAiFeatures(!showAiFeatures)}
            >
              <Sparkles className="w-4 h-4" />
            </Button>

            {/* AI Search Suggestions */}
            {aiSearchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                {aiSearchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion)
                      setAiSearchSuggestions([])
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white first:rounded-t-lg last:rounded-b-lg"
                  >
                    <Sparkles className="w-3 h-3 inline mr-2 text-purple-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Marketplace Tabs */}
      <div className="border-b border-slate-700/30 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("nfts")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "nfts"
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>NFTs</span>
                <span className="hidden sm:inline text-xs bg-slate-700 px-2 py-0.5 rounded-full">1.2K</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("tokens")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "tokens"
                  ? "border-green-500 text-green-400 bg-green-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>Token Order Book</span>
                <span className="hidden sm:inline text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">NEW</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "collections"
                  ? "border-purple-500 text-purple-400 bg-purple-500/5"
                  : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Collections</span>
                <span className="hidden sm:inline text-xs bg-slate-700 px-2 py-0.5 rounded-full">156</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Order Book & Analytics Dashboard */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile-First Dashboard Controls */}
          <div className="mb-6">
            {/* Mobile: Horizontal scroll with indicators */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
              <Button
                variant={showOrderBook ? "default" : "outline"}
                onClick={() => setShowOrderBook(!showOrderBook)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showOrderBook ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Order Book</span>
                <span className="sm:hidden">Orders</span>
              </Button>
              <Button
                variant={showAnalytics ? "default" : "outline"}
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showAnalytics ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <LineChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </Button>
              <Button
                variant={showLiveActivity ? "default" : "outline"}
                onClick={() => setShowLiveActivity(!showLiveActivity)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showLiveActivity ? "bg-blue-600 text-white" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
                size="sm"
              >
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Live Activity</span>
                <span className="sm:hidden">Live</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPlayingLive(!isPlayingLive)}
                className="flex-shrink-0 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm"
                size="sm"
              >
                {isPlayingLive ? (
                  <>
                    <Coffee className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Pause Live</span>
                    <span className="sm:hidden">Pause</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Play Live</span>
                    <span className="sm:hidden">Play</span>
                  </>
                )}
              </Button>
            </div>

            {/* Mobile indicators */}
            <div className="flex justify-center gap-1 mt-2 md:hidden">
              <div className={`w-2 h-1 rounded-full ${showOrderBook ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${showAnalytics ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${showLiveActivity ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
              <div className={`w-2 h-1 rounded-full ${isPlayingLive ? 'bg-green-500' : 'bg-slate-600'}`}></div>
            </div>
          </div>

          {/* Dashboard Content */}
          <AnimatePresence>
            {(showOrderBook || showAnalytics || showLiveActivity) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 mb-6"
              >
                {/* Order Book */}
                {showOrderBook && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4"
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Order Book</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-green-500/50 text-green-400">
                              Spread: {formatPrice(sampleOrderBook.spread)}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Asks (Sell Orders) */}
                          <div>
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                              <span>Price (IDR)</span>
                              <span>Quantity</span>
                              <span>Total (IDR)</span>
                            </div>
                            <div className="space-y-1">
                              {sampleOrderBook.asks.slice().reverse().map((ask, index) => (
                                <div key={index} className="relative">
                                  <div
                                    className="absolute inset-0 bg-red-500/10 rounded"
                                    style={{ width: `${ask.percentage}%` }}
                                  />
                                  <div className="relative flex items-center justify-between text-xs py-1 px-2">
                                    <span className="text-red-400 font-mono">
                                      {(ask.price / 1000000).toFixed(1)}M
                                    </span>
                                    <span className="text-slate-300">{ask.quantity}</span>
                                    <span className="text-slate-400">
                                      {(ask.total / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Current Price */}
                          <div className="text-center py-2 border-y border-slate-700">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleOrderBook.lastPrice)}
                            </div>
                            <div className="text-xs text-slate-400">Last Price</div>
                          </div>

                          {/* Bids (Buy Orders) */}
                          <div>
                            <div className="space-y-1">
                              {sampleOrderBook.bids.map((bid, index) => (
                                <div key={index} className="relative">
                                  <div
                                    className="absolute inset-0 bg-green-500/10 rounded"
                                    style={{ width: `${bid.percentage}%` }}
                                  />
                                  <div className="relative flex items-center justify-between text-xs py-1 px-2">
                                    <span className="text-green-400 font-mono">
                                      {(bid.price / 1000000).toFixed(1)}M
                                    </span>
                                    <span className="text-slate-300">{bid.quantity}</span>
                                    <span className="text-slate-400">
                                      {(bid.total / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Analytics */}
                {showAnalytics && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={showOrderBook && showLiveActivity ? "lg:col-span-4" : showOrderBook || showLiveActivity ? "lg:col-span-8" : "lg:col-span-12"}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Market Analytics</h3>
                          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                            <SelectTrigger className="w-20 bg-slate-700 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="1h">1H</SelectItem>
                              <SelectItem value="24h">24H</SelectItem>
                              <SelectItem value="7d">7D</SelectItem>
                              <SelectItem value="30d">30D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleAnalytics.floorPrice)}
                            </div>
                            <div className="text-xs text-slate-400">Floor Price</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(sampleAnalytics.volume24h)}
                            </div>
                            <div className="text-xs text-slate-400">24h Volume</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-green-400">
                              +{sampleAnalytics.change24h}%
                            </div>
                            <div className="text-xs text-slate-400">24h Change</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                            <div className="text-lg font-bold text-white">
                              {formatNumber(sampleAnalytics.holders)}
                            </div>
                            <div className="text-xs text-slate-400">Holders</div>
                          </div>
                        </div>

                        {/* Price Chart Placeholder */}
                        <div className="h-32 bg-slate-700/20 rounded-lg flex items-center justify-center border border-slate-700/50">
                          <div className="text-center">
                            <PieChart className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <div className="text-sm text-slate-400">Price Chart</div>
                            <div className="text-xs text-slate-500">Real-time data visualization</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Live Activity */}
                {showLiveActivity && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={showOrderBook && showAnalytics ? "lg:col-span-4" : showOrderBook || showAnalytics ? "lg:col-span-8" : "lg:col-span-12"}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Live Activity</h3>
                          <div className="flex items-center gap-2">
                            {isPlayingLive && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                              Live
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {sampleActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                              <div className="flex-shrink-0">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate">
                                  {activity.nft}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <span>{activity.user}</span>
                                  <span>•</span>
                                  <span>{formatTimeAgo(activity.timestamp)}</span>
                                </div>
                              </div>
                              {activity.price && (
                                <div className="text-right">
                                  <div className="text-sm font-bold text-white">
                                    {formatPrice(activity.price)}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Trust & Security Indicators */}
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <h4 className="text-sm font-medium text-white mb-3">Security Status</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              <Shield className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">SSL Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Lock className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <UserCheck className="w-3 h-3 text-green-400" />
                              <span className="text-slate-400">KYC Verified</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <AlertTriangle className="w-3 h-3 text-yellow-400" />
                              <span className="text-slate-400">Risk Monitored</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>



          {/* AI Features Panel */}
          <AnimatePresence>
            {showAiFeatures && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* AI Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      AI Recommendations
                    </h3>
                    <div className="space-y-3">
                      {aiRecommendations.length > 0 ? aiRecommendations.map((nft) => (
                        <div key={nft.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                          <img src={nft.image} alt={nft.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{nft.name}</div>
                            <div className="text-xs text-slate-400">{formatPrice(nft.price)}</div>
                          </div>
                          <div className="text-xs text-purple-400">92% match</div>
                        </div>
                      )) : (
                        <div className="text-center py-6 text-slate-400">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Like some NFTs to get personalized recommendations</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Market Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      Market Analysis
                    </h3>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {aiAnalysisResults || "Analyzing market trends..."}
                      </pre>
                    </div>
                  </div>

                  {/* AI Trading Assistant */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-green-400" />
                      Trading Assistant
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-green-500">
                        <div className="text-sm font-medium text-green-400">Buy Signal</div>
                        <div className="text-xs text-slate-400">Gaming NFTs showing strong momentum</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-yellow-500">
                        <div className="text-sm font-medium text-yellow-400">Hold Signal</div>
                        <div className="text-xs text-slate-400">Art collections in consolidation phase</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
                        <div className="text-sm font-medium text-blue-400">Watch Signal</div>
                        <div className="text-xs text-slate-400">Music NFTs gaining popularity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Content */}
        {activeTab === "nfts" && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-slate-800/50 border-slate-700 sticky top-32">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange([0, 200000000])
                      setSelectedRarity([])
                      setSelectedStatus([])
                      setVerifiedOnly(false)
                      setSearchTerm("")
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${ 
                              selectedCategory === category.id
                                ? "bg-blue-600/20 border border-blue-500/50 text-blue-400"
                                : "bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="bg-slate-600 text-slate-300 text-xs">
                              {category.count}
                            </Badge>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={200000000}
                        step={1000000}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {priceRanges.map((range, index) => (
                          <button
                            key={index}
                            onClick={() => setPriceRange([range.min, range.max])}
                            className="text-left p-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/30 rounded transition-colors"
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rarity */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Rarity</h4>
                    <div className="space-y-2">
                      {rarityOptions.map((rarity) => (
                        <div key={rarity} className="flex items-center space-x-2">
                          <Checkbox
                            id={rarity}
                            checked={selectedRarity.includes(rarity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRarity([...selectedRarity, rarity])
                              } else {
                                setSelectedRarity(selectedRarity.filter(r => r !== rarity))
                              }
                            }}
                          />
                          <label
                            htmlFor={rarity}
                            className="text-sm text-slate-300 cursor-pointer flex items-center gap-2"
                          >
                            {rarity === "Legendary" && <Sparkles className="w-4 h-4 text-yellow-400" />}
                            {rarity === "Epic" && <Flame className="w-4 h-4 text-purple-400" />}
                            {rarity === "Rare" && <Star className="w-4 h-4 text-blue-400" />}
                            {rarity === "Common" && <CheckCircle className="w-4 h-4 text-slate-400" />}
                            {rarity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Status</h4>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={selectedStatus.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStatus([...selectedStatus, status])
                              } else {
                                setSelectedStatus(selectedStatus.filter(s => s !== status))
                              }
                            }}
                          />
                          <label
                            htmlFor={status}
                            className="text-sm text-slate-300 cursor-pointer"
                          >
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm text-slate-300 cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Verified Creators Only
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Results Count */}
                <span className="text-sm text-slate-400">
                  {filteredNFTs.length} of {sampleNFTs.length} items
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Grid Size */}
                {viewMode === "grid" && (
                  <Select value={gridSize} onValueChange={setGridSize}>
                    <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* NFT Grid/List */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`grid gap-6 ${
                    gridSize === "compact" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" :
                    gridSize === "comfortable" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" :
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {filteredNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                        <Link href={`/marketplace/${nft.id}`} className="block">
                          <div className="relative">
                          {/* NFT Image */}
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={nft.image}
                              alt={nft.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Live Badge */}
                            {nft.isLive && (
                              <Badge className="absolute top-3 left-3 bg-red-500/90 text-white animate-pulse">
                                🔴 LIVE
                              </Badge>
                            )}
                            
                            {/* Rarity Badge */}
                            <Badge 
                              className={`absolute top-3 right-3 ${
                                nft.rarity === "Legendary" ? "bg-yellow-500/90 text-black" :
                                nft.rarity === "Epic" ? "bg-purple-500/90 text-white" :
                                nft.rarity === "Rare" ? "bg-blue-500/90 text-white" :
                                "bg-slate-500/90 text-white"
                              }`}
                            >
                              {nft.rarity}
                            </Badge>

                            {/* Quick Actions */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                                onClick={() => toggleFavorite(nft.id)}
                              >
                                <Heart className={`w-4 h-4 ${favorites.includes(nft.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Bottom Quick Actions */}
                            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Buy Now
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                                >
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  Bid
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <CardContent className="p-4">
                            {/* Collection & Verified */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">{nft.collection}</span>
                              {nft.verified && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                            </div>

                            {/* NFT Name */}
                            <h3 className="font-semibold text-white mb-2 truncate">
                              {nft.name}
                            </h3>

                            {/* Creator */}
                            <div className="flex items-center gap-2 mb-3">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={nft.creatorAvatar} />
                                <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600">
                                  {nft.creator.slice(1, 3).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-400">{nft.creator}</span>
                            </div>

                            {/* Price & Stats */}
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="text-lg font-bold text-white">
                                  {formatPrice(nft.price)}
                                </div>
                                {nft.lastSale && (
                                  <div className="text-xs text-slate-400">
                                    Last: {formatPrice(nft.lastSale)}
                                  </div>
                                )}
                              </div>
                              {nft.timeLeft && (
                                <div className="text-right">
                                  <div className="text-sm text-orange-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {nft.timeLeft}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Engagement Stats */}
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {formatNumber(nft.likes)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {formatNumber(nft.views)}
                                </span>
                              </div>
                              {nft.volume24h && (
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {formatPrice(nft.volume24h)}
                                </span>
                              )}
                            </div>
                          </CardContent>
                          </div>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {filteredNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-slate-600 transition-all duration-300">
                        <Link href={`/marketplace/${nft.id}`} className="block">
                          <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 relative overflow-hidden rounded-lg flex-shrink-0">
                              <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-full object-cover"
                              />
                              {nft.isLive && (
                                <Badge className="absolute top-1 left-1 bg-red-500/90 text-white text-xs animate-pulse">
                                  LIVE
                                </Badge>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-white truncate">{nft.name}</h3>
                                    {nft.verified && (
                                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    )}
                                    <Badge 
                                      className={`text-xs ${
                                        nft.rarity === "Legendary" ? "bg-yellow-500/20 text-yellow-400" :
                                        nft.rarity === "Epic" ? "bg-purple-500/20 text-purple-400" :
                                        nft.rarity === "Rare" ? "bg-blue-500/20 text-blue-400" :
                                        "bg-slate-500/20 text-slate-400"
                                      }`}
                                    >
                                      {nft.rarity}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-slate-400">{nft.collection}</span>
                                    <span className="text-slate-500">•</span>
                                    <span className="text-sm text-slate-400">{nft.creator}</span>
                                  </div>

                                  <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <Heart className="w-3 h-3" />
                                      {formatNumber(nft.likes)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      {formatNumber(nft.views)}
                                    </span>
                                    {nft.volume24h && (
                                      <span className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        {formatPrice(nft.volume24h)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right ml-4">
                                  <div className="text-lg font-bold text-white mb-1">
                                    {formatPrice(nft.price)}
                                  </div>
                                  {nft.timeLeft && (
                                    <div className="text-sm text-orange-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {nft.timeLeft}
                                    </div>
                                  )}
                                  <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                      Buy
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                                      Bid
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More NFTs"}
              </Button>
            </div>
          </div>
        </div>
        )}

        {/* Tokens Tab Content */}
        {activeTab === "tokens" && (
          <TokenOrderBookSection />
        )}

        {/* Collections Tab Content */}
        {activeTab === "collections" && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Globe className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">NFT Collections</h3>
              <p className="text-slate-400 mb-6">Browse and discover amazing NFT collections</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Coming Soon
              </Button>
            </div>
          </div>
        )}
      </div>



      {/* Create Order Modal */}
      <Dialog open={showCreateOrder} onOpenChange={setShowCreateOrder}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🔒 Escrow Order Creator
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-center">
              Buat order NFT/Token yang aman dengan smart contract escrow otomatis
            </DialogDescription>
            <div className="flex justify-center gap-2 mt-2">
              <Badge className="bg-green-500/20 text-green-400">Smart Contract</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">Auto Escrow</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Dispute Protection</Badge>
            </div>
          </DialogHeader>

          <div className="mt-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                      step === createOrderStep ? "bg-blue-600 border-blue-600 text-white" :
                      step < createOrderStep ? "bg-green-600 border-green-600 text-white" :
                      "bg-slate-800 border-slate-600 text-slate-400"
                    }`}>
                      {step < createOrderStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        step < createOrderStep ? "bg-green-600" : "bg-slate-600"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Asset Type Selection */}
              {createOrderStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Pilih Jenis Aset
                    </h3>
                    <p className="text-slate-400">
                      Apa yang ingin Anda tukar hari ini?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        type: "ERC20" as const,
                        title: "Token Trading",
                        desc: "PUYOK, ETH, USDT, custom tokens",
                        icon: <Coins className="w-8 h-8" />,
                        gradient: "from-green-500 to-emerald-500",
                        badge: "Populer"
                      },
                      {
                        type: "ERC721" as const,
                        title: "NFT 1/1 Sale",
                        desc: "Art, collectibles, unique items",
                        icon: <ImageIcon className="w-8 h-8" />,
                        gradient: "from-blue-500 to-cyan-500",
                        badge: "Premium"
                      },
                      {
                        type: "ERC1155" as const,
                        title: "Multi-Edition NFT",
                        desc: "Gaming items, limited editions",
                        icon: <Layers className="w-8 h-8" />,
                        gradient: "from-purple-500 to-pink-500",
                        badge: "Gaming"
                      },
                      {
                        type: "MINT" as const,
                        title: "NFT Minting",
                        desc: "Create & sell new NFTs",
                        icon: <Sparkles className="w-8 h-8" />,
                        gradient: "from-yellow-500 to-orange-500",
                        badge: "Baru"
                      },
                    ].map((option) => (
                      <button
                        key={option.type}
                        onClick={async () => {
                          const assetType = option.type as "ERC20" | "ERC721" | "ERC1155"
                          setSelectedAssetType(assetType)
                          if (option.type !== "MINT") {
                            await loadWalletAssets(assetType)
                          }
                        }}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 group ${
                          selectedAssetType === option.type
                            ? "border-blue-500 bg-blue-500/10 scale-105"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800 hover:scale-102"
                        }`}
                      >
                        {option.badge && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold">
                            {option.badge}
                          </Badge>
                        )}
                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${option.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {option.icon}
                        </div>
                        <h4 className="font-semibold text-white mb-2">{option.title}</h4>
                        <p className="text-sm text-slate-400">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Asset Selection */}
              {createOrderStep === 2 && selectedAssetType && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Pilih Aset dari Wallet
                    </h3>
                    <p className="text-slate-400">
                      Pilih {selectedAssetType === "ERC20" ? "token" : "NFT"} yang ingin Anda tukar
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {walletAssets.map((asset) => (
                      <button
                        key={asset.id}
                        onClick={() => {
                          setSelectedAsset(asset)
                          // Generate price recommendation when asset is selected
                          const recommendation = generatePriceRecommendation(asset)
                          setPriceRecommendation(recommendation)
                        }}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          selectedAsset?.id === asset.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 text-left">
                            <h4 className="font-medium text-white truncate">{asset.name}</h4>
                            {asset.symbol && (
                              <p className="text-sm text-slate-400">{asset.symbol}</p>
                            )}
                            {asset.collection && (
                              <p className="text-sm text-slate-400">{asset.collection}</p>
                            )}
                            {asset.balance && (
                              <p className="text-xs text-green-400">Balance: {asset.balance}</p>
                            )}
                            <p className="text-xs text-blue-400">
                              ~{formatPrice(asset.value)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedAsset && (selectedAssetType === "ERC20" || selectedAssetType === "ERC1155") && (
                    <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                      <Label className="text-white mb-2 block">Jumlah</Label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                          className="border-slate-600"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 text-center bg-slate-800 border-slate-600 text-white"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOrderQuantity(orderQuantity + 1)}
                          className="border-slate-600"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="text-slate-400 text-sm">
                          dari {selectedAsset.balance || "∞"} tersedia
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Smart Pricing & Exchange Details */}
              {createOrderStep === 3 && selectedAsset && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                  onFocus={() => {
                    // Generate price recommendation when step is focused
                    const recommendation = generatePriceRecommendation(selectedAsset)
                    setPriceRecommendation(recommendation)
                  }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      💰 Pricing & Payment Setup
                    </h3>
                    <p className="text-slate-400">
                      Set your price and choose Indonesian payment methods for P2P trading
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge className="bg-green-500/20 text-green-400">E-Wallet Ready</Badge>
                      <Badge className="bg-blue-500/20 text-blue-400">Bank Transfer</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400">Instant Settlement</Badge>
                    </div>
                  </div>

                  {/* Smart Price Recommendations */}
                  {priceRecommendation && (
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Rekomendasi Harga Cerdas
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-slate-800/30 rounded">
                          <div className="text-xs text-slate-400 mb-1">Floor Price</div>
                          <div className="text-white font-semibold">{formatPrice(priceRecommendation.floorPrice)}</div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded cursor-pointer hover:bg-green-500/20 transition-colors"
                           onClick={() => setExchangeRate(priceRecommendation.averagePrice.toString())}>
                          <div className="text-xs text-green-400 mb-1">💸 Harga Pasar (Klik)</div>
                          <div className="text-white font-bold">{formatPrice(priceRecommendation.averagePrice)}</div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/30 rounded">
                          <div className="text-xs text-slate-400 mb-1">Ceiling Price</div>
                          <div className="text-white font-semibold">{formatPrice(priceRecommendation.ceilingPrice)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-300">
                        <span>���� Volume 24h: {priceRecommendation.salesVolume24h}</span>
                        <span>⏱️ Avg Sale: {priceRecommendation.avgSaleDays} hari</span>
                        <span>✅ Success Rate: {priceRecommendation.successRate}%</span>
                      </div>
                    </div>
                  )}

                  {/* Smart Tips */}
                  {showSmartTips && priceRecommendation && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-yellow-400 font-medium mb-2">Tips Cerdas Berbasis Data</h4>
                          <div className="space-y-1 text-xs text-slate-300">
                            {priceRecommendation.tips.slice(0, 2).map((tip: string, index: number) => (
                              <p key={index}>{tip}</p>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowSmartTips(false)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comprehensive Payment Methods Selection */}
                  <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-6">
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                      Metode Pembayaran P2P (Pilih Multiple)
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      Semakin banyak metode pembayaran, semakin cepat transaksi Anda selesai
                    </p>

                    {/* E-Wallet Section */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-green-400" />
                        E-Wallet Indonesia
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { name: "DANA", icon: "💙", fee: "0%", popular: true },
                          { name: "OVO", icon: "💜", fee: "0%", popular: true },
                          { name: "GoPay", icon: "💚", fee: "0%", popular: true },
                          { name: "ShopeePay", icon: "🧡", fee: "0%", popular: false },
                          { name: "LinkAja", icon: "❤️", fee: "0%", popular: false },
                          { name: "QRIS", icon: "📱", fee: "0%", popular: true },
                          { name: "SeaBank", icon: "���", fee: "0%", popular: false },
                          { name: "Jenius", icon: "⚡", fee: "0%", popular: false },
                        ].map((method) => (
                          <button
                            key={method.name}
                            onClick={() => {
                              const currentMethods = selectedPaymentAccount ? selectedPaymentAccount.split(',').filter(Boolean) : []
                              if (currentMethods.includes(method.name)) {
                                setSelectedPaymentAccount(currentMethods.filter(m => m !== method.name).join(','))
                              } else {
                                setSelectedPaymentAccount([...currentMethods, method.name].join(','))
                              }
                            }}
                            className={`relative p-3 border rounded-lg transition-all text-center group ${
                              selectedPaymentAccount.includes(method.name)
                                ? "border-green-500 bg-green-500/10"
                                : "border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                            }`}
                          >
                            {method.popular && (
                              <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">HOT</Badge>
                            )}
                            <div className="text-2xl mb-1">{method.icon}</div>
                            <div className="text-sm font-medium text-white">{method.name}</div>
                            <div className="text-xs text-green-400">{method.fee} fee</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bank Transfer Section */}
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        Bank Transfer Indonesia
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { name: "BCA", fullName: "Bank Central Asia", icon: "🏦", fee: "Free" },
                          { name: "Mandiri", fullName: "Bank Mandiri", icon: "🏛️", fee: "Free" },
                          { name: "BRI", fullName: "Bank Rakyat Indonesia", icon: "🏦", fee: "Free" },
                          { name: "BNI", fullName: "Bank Negara Indonesia", icon: "🏛️", fee: "Free" },
                          { name: "CIMB Niaga", fullName: "CIMB Niaga", icon: "🏦", fee: "Free" },
                          { name: "Permata", fullName: "Bank Permata", icon: "💎", fee: "Free" },
                        ].map((bank) => (
                          <button
                            key={bank.name}
                            onClick={() => {
                              const currentMethods = selectedPaymentAccount ? selectedPaymentAccount.split(',').filter(Boolean) : []
                              if (currentMethods.includes(bank.name)) {
                                setSelectedPaymentAccount(currentMethods.filter(m => m !== bank.name).join(','))
                              } else {
                                setSelectedPaymentAccount([...currentMethods, bank.name].join(','))
                              }
                            }}
                            className={`p-3 border rounded-lg transition-all text-left ${
                              selectedPaymentAccount.includes(bank.name)
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-slate-700 hover:border-slate-600 hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{bank.icon}</span>
                              <div>
                                <div className="text-sm font-medium text-white">{bank.name}</div>
                                <div className="text-xs text-slate-400">{bank.fullName}</div>
                                <div className="text-xs text-green-400">{bank.fee}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Payment Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                        <h6 className="text-white font-medium mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          Escrow Protection
                        </h6>
                        <p className="text-xs text-slate-400 mb-2">Aset Anda diamankan sampai pembayaran dikonfirmasi</p>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked />
                          <span className="text-sm text-green-400">Aktif</span>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                        <h6 className="text-white font-medium mb-2 flex items-center gap-2">
                          <Timer className="w-4 h-4 text-yellow-400" />
                          Auto-Release
                        </h6>
                        <p className="text-xs text-slate-400 mb-2">Otomatis release setelah konfirmasi payment</p>
                        <div className="flex items-center gap-2">
                          <Switch defaultChecked />
                          <span className="text-sm text-green-400">15 menit</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* What You Give */}
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Yang Anda Jual</h4>
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={selectedAsset.image}
                          alt={selectedAsset.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-white">{selectedAsset.name}</p>
                          <p className="text-sm text-slate-400">
                            {orderQuantity > 1 ? `${orderQuantity}x ` : ""}
                            {selectedAsset.collection || selectedAsset.symbol}
                          </p>
                          {selectedAsset.isPioneerNFT && (
                            <div className="mt-1">
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                🏆 Pioneer NFT
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Price Actions */}
                      {priceRecommendation && (
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400 mb-2">Quick Price Set:</p>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExchangeRate(priceRecommendation.floorPrice.toString())}
                              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-xs"
                            >
                              Floor ({formatPrice(priceRecommendation.floorPrice)})
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExchangeRate(priceRecommendation.averagePrice.toString())}
                              className="border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs"
                            >
                              Market ({formatPrice(priceRecommendation.averagePrice)})
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pricing Input */}
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Harga Jual</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-white mb-2 block">Harga dalam IDR</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                              type="number"
                              placeholder="Masukkan harga jual"
                              value={exchangeRate}
                              onChange={(e) => setExchangeRate(e.target.value)}
                              className="pl-10 bg-slate-800 border-slate-600 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">Deskripsi (Opsional)</Label>
                          <Textarea
                            placeholder="Tambahkan deskripsi untuk menarik pembeli..."
                            value={listingDescription}
                            onChange={(e) => setListingDescription(e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                            rows={2}
                          />
                          <p className="text-xs text-slate-400 mt-1">
                            💡 Deskripsi menarik meningkatkan konversi hingga 40%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hybrid Fee Model */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-4">🔧 Model Biaya (Pilih yang Sesuai)</h4>

                    <RadioGroup
                      value={feeModel}
                      onValueChange={(value: "gasless" | "self_gas") => setFeeModel(value)}
                      className="space-y-3 mb-4"
                    >
                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                        feeModel === "gasless" ? "border-green-500 bg-green-500/10" : "border-slate-700"
                      }`}>
                        <RadioGroupItem value="gasless" id="gasless" />
                        <Label htmlFor="gasless" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                              <Shield className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">PUYOK Tanggung Gas Fee</p>
                              <p className="text-sm text-slate-400">Pengalaman Web2 - tanpa ribet gas fee</p>
                              <div className="mt-1 flex items-center gap-2">
                                <Badge className="bg-green-500/20 text-green-400 text-xs">Biaya: 3%</Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">Recommended</Badge>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                        feeModel === "self_gas" ? "border-blue-500 bg-blue-500/10" : "border-slate-700"
                      }`}>
                        <RadioGroupItem value="self_gas" id="self_gas" />
                        <Label htmlFor="self_gas" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <Zap className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">Saya Tanggung Gas Fee Sendiri</p>
                              <p className="text-sm text-slate-400">Untuk user berpengalaman - biaya lebih murah</p>
                              <div className="mt-1 flex items-center gap-2">
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">Biaya: 1.5%</Badge>
                                <Badge className="bg-purple-500/20 text-purple-400 text-xs">Advanced</Badge>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Fee Explanation */}
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-xs text-slate-300">
                        {feeModel === "gasless"
                          ? "🛡️ PUYOK menanggung biaya gas transaksi Anda, membuat proses jual beli semudah aplikasi Web2."
                          : "⚡ Anda bertanggung jawab atas biaya gas on-chain. Model ini cocok untuk pengguna berpengalaman yang ingin biaya layanan lebih rendah."
                        }
                      </p>
                    </div>
                  </div>

                  {/* Payment Account Selection */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-4">💳 Akun Penerima Dana</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-white mb-2 block">Pilih Akun Pembayaran</Label>
                        <Select value={selectedPaymentAccount} onValueChange={setSelectedPaymentAccount}>
                          <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                            <SelectValue placeholder="Pilih akun untuk menerima pembayaran" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            {samplePaymentAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{account.logo}</span>
                                  <div>
                                    <p className="font-medium">{account.name} - {account.alias}</p>
                                    <p className="text-xs text-slate-400">
                                      {account.accountName} •••• {account.accountNumber.slice(-4)}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-600 text-slate-400 hover:bg-slate-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Akun Pembayaran Baru
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Preview & Fee Transparency */}
              {createOrderStep === 4 && selectedAsset && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      📋 Preview Listing & Transparansi Biaya
                    </h3>
                    <p className="text-slate-400">
                      Lihat bagaimana listing Anda akan tampil di marketplace
                    </p>
                  </div>

                  {/* Marketplace Preview */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Pratinjau di Marketplace
                    </h4>

                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden max-w-sm mx-auto">
                      <div className="aspect-square relative">
                        <img
                          src={selectedAsset.image}
                          alt={selectedAsset.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedAsset.isPioneerNFT && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                            🏆 Pioneer NFT
                          </Badge>
                        )}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                            <p className="text-white text-xs font-medium">{selectedAsset.name}</p>
                            <p className="text-slate-300 text-xs">{selectedAsset.collection}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-green-400 font-bold text-lg">
                              {exchangeRate ? formatPrice(parseInt(exchangeRate)) : "Rp 0"}
                            </p>
                            <p className="text-slate-400 text-xs">Harga Jual</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                              <Eye className="w-3 h-3" />
                              <span>0 views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Fee Transparency */}
                  <div className="bg-slate-800/50 rounded-lg p-6">
                    <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      ���� Transparansi Biaya Lengkap
                    </h4>

                    <div className="space-y-4">
                      {/* Fee Breakdown */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">💵 Harga Jual Aset:</span>
                            <span className="text-white font-medium">
                              {exchangeRate ? formatPrice(parseInt(exchangeRate)) : "Rp 0"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">
                              🔧 Biaya Layanan PUYOK ({feeModel === "gasless" ? "3%" : "1.5%"}):
                            </span>
                            <span className="text-red-300">
                              -{exchangeRate ? formatPrice(parseInt(exchangeRate) * (feeModel === "gasless" ? 0.03 : 0.015)) : "Rp 0"}
                            </span>
                          </div>

                          {feeModel === "gasless" && (
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">⛽ Biaya Gas (ditanggung PUYOK):</span>
                              <span className="text-green-400">GRATIS</span>
                            </div>
                          )}

                          {feeModel === "self_gas" && (
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">⛽ Biaya Gas (Anda tanggung):</span>
                              <span className="text-yellow-400">~Rp 2,000 - 10,000</span>
                            </div>
                          )}

                          {/* Special fee for Pioneer NFT */}
                          {selectedAsset.isPioneerNFT && (
                            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                              <p className="text-yellow-400 text-xs">
                                🏆 Pioneer NFT: Biaya layanan 0% untuk penjualan pertama!
                              </p>
                            </div>
                          )}

                          <div className="border-t border-slate-600 pt-3 flex justify-between items-center font-medium">
                            <span className="text-white">���� Anda Akan Menerima:</span>
                            <span className="text-green-400 font-bold text-lg">
                              {exchangeRate ? formatPrice(
                                selectedAsset.isPioneerNFT
                                  ? parseInt(exchangeRate)
                                  : parseInt(exchangeRate) * (feeModel === "gasless" ? 0.97 : 0.985)
                              ) : "Rp 0"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selected Payment Account */}
                      {selectedPaymentAccount && (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-blue-400 text-sm font-medium mb-1">Akun Penerima:</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {samplePaymentAccounts.find(acc => acc.id === selectedPaymentAccount)?.logo}
                            </span>
                            <span className="text-white text-sm">
                              {samplePaymentAccounts.find(acc => acc.id === selectedPaymentAccount)?.name} - {samplePaymentAccounts.find(acc => acc.id === selectedPaymentAccount)?.alias}
                            </span>
                            <span className="text-slate-400 text-xs">
                              •••• {samplePaymentAccounts.find(acc => acc.id === selectedPaymentAccount)?.accountNumber.slice(-4)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3">📊 Ringkasan Order</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Aset:</p>
                        <p className="text-white font-medium">{selectedAsset.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Model Biaya:</p>
                        <p className="text-white font-medium">
                          {feeModel === "gasless" ? "PUYOK Gasless" : "Self Gas"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Harga:</p>
                        <p className="text-white font-medium">
                          {exchangeRate ? formatPrice(parseInt(exchangeRate)) : "Belum diisi"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Fee Rate:</p>
                        <p className="text-white font-medium">
                          {selectedAsset.isPioneerNFT ? "0%" : (feeModel === "gasless" ? "3%" : "1.5%")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-blue-400 font-medium mb-1">Informasi Penting</p>
                        <ul className="text-slate-300 space-y-1">
                          <li>• Order akan masuk ke marketplace public</li>
                          <li>• {paymentMethod === "onchain" ? "Aset akan di-lock di smart contract escrow" : "Order akan pending hingga pembayaran selesai"}</li>
                          <li>• Anda akan menerima notifikasi real-time untuk setiap update</li>
                          <li>• PUYOK Escrow Protection melindungi kedua belah pihak</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={() => {
                  if (createOrderStep > 1) {
                    setCreateOrderStep(createOrderStep - 1)
                  } else {
                    setShowCreateOrder(false)
                  }
                }}
                className="border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {createOrderStep === 1 ? "Batal" : "Sebelumnya"}
              </Button>

              <div className="flex items-center gap-3">
                {createOrderStep === 4 ? (
                  <Button
                    onClick={handleCreateEscrowOrder}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedAsset || !exchangeRate || !selectedPaymentAccount}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Buat Order Escrow
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCreateOrderStep(createOrderStep + 1)}
                    disabled={
                      (createOrderStep === 1 && !selectedAssetType) ||
                      (createOrderStep === 2 && !selectedAsset) ||
                      (createOrderStep === 3 && (!exchangeRate || !selectedPaymentAccount))
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Lanjutkan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
