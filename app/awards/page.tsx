"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trophy,
  Star,
  Award,
  Crown,
  Target,
  Zap,
  Flame,
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Lock,
  Gift
} from "lucide-react"

// Awards data
const achievementsData = {
  earned: [
    {
      id: "ach_001",
      title: "First Sale",
      description: "Complete your first successful sale",
      icon: Trophy,
      rarity: "Common",
      points: 100,
      earnedDate: "15 Juli 2024",
      progress: 100,
      maxProgress: 1,
      reward: "Rp 50.000 bonus"
    },
    {
      id: "ach_002", 
      title: "Top Trader",
      description: "Achieve 10 successful trades",
      icon: Star,
      rarity: "Rare",
      points: 500,
      earnedDate: "20 Juli 2024",
      progress: 10,
      maxProgress: 10,
      reward: "Exclusive badge + Rp 250.000"
    },
    {
      id: "ach_003",
      title: "Speed Demon",
      description: "Complete 5 orders within 24 hours",
      icon: Zap,
      rarity: "Epic",
      points: 750,
      earnedDate: "22 Juli 2024", 
      progress: 5,
      maxProgress: 5,
      reward: "Priority listing feature"
    },
    {
      id: "ach_004",
      title: "Community Favorite",
      description: "Get 100+ likes on your assets",
      icon: Users,
      rarity: "Rare",
      points: 300,
      earnedDate: "25 Juli 2024",
      progress: 156,
      maxProgress: 100,
      reward: "Featured profile status"
    }
  ],
  available: [
    {
      id: "ach_005",
      title: "Platinum Seller",
      description: "Complete 50 successful sales",
      icon: Crown,
      rarity: "Legendary",
      points: 2000,
      progress: 21,
      maxProgress: 50,
      reward: "VIP status + Rp 1.000.000"
    },
    {
      id: "ach_006",
      title: "NFT Master",
      description: "Sell NFTs worth over Rp 100.000.000",
      icon: Award,
      rarity: "Epic",
      points: 1500,
      progress: 45250000,
      maxProgress: 100000000,
      reward: "Custom profile theme"
    },
    {
      id: "ach_007",
      title: "Consistency King",
      description: "Make at least 1 sale every day for 30 days",
      icon: Target,
      rarity: "Epic", 
      points: 1200,
      progress: 12,
      maxProgress: 30,
      reward: "Auto-boost for listings"
    },
    {
      id: "ach_008",
      title: "Social Butterfly",
      description: "Get 1000 followers on your profile",
      icon: Users,
      rarity: "Rare",
      points: 600,
      progress: 234,
      maxProgress: 1000,
      reward: "Influencer badge"
    },
    {
      id: "ach_009",
      title: "Guardian",
      description: "Report 10 fake/scam listings",
      icon: Shield,
      rarity: "Common",
      points: 200,
      progress: 3,
      maxProgress: 10,
      reward: "Community guardian badge"
    }
  ],
  locked: [
    {
      id: "ach_010",
      title: "Legendary Trader",
      description: "Reach the highest trader tier",
      icon: Crown,
      rarity: "Legendary",
      points: 5000,
      requirement: "Requires Platinum Seller achievement",
      reward: "Ultimate trader status"
    },
    {
      id: "ach_011",
      title: "Whale Hunter",
      description: "Complete a single sale worth over Rp 50.000.000",
      icon: Flame,
      rarity: "Legendary",
      points: 3000,
      requirement: "Requires Gold Trader level",
      reward: "Exclusive whale badge"
    }
  ]
}

const badgesData = [
  {
    id: "badge_001",
    name: "Verified Trader",
    description: "Verified account with completed KYC",
    icon: CheckCircle,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    id: "badge_002", 
    name: "Fast Response",
    description: "Average response time under 2 hours",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20"
  },
  {
    id: "badge_003",
    name: "Top Rated",
    description: "Maintaining 4.8+ star rating",
    icon: Star,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  }
]

function AchievementCard({ achievement, type }: { achievement: any; type: 'earned' | 'available' | 'locked' }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-500/30'
      case 'Rare': return 'text-blue-400 border-blue-500/30'
      case 'Epic': return 'text-purple-400 border-purple-500/30'
      case 'Legendary': return 'text-yellow-400 border-yellow-500/30'
      default: return 'text-gray-400 border-gray-500/30'
    }
  }

  const isLocked = type === 'locked'
  const isEarned = type === 'earned'
  const progressPercentage = achievement.maxProgress ? (achievement.progress / achievement.maxProgress) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105
        ${isLocked 
          ? 'bg-slate-800/20 border-slate-700/30 opacity-60' 
          : isEarned
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30'
          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
        }
        ${getRarityColor(achievement.rarity)}
      `}
    >
      {/* Rarity Glow Effect */}
      {!isLocked && (
        <div className={`absolute inset-0 opacity-20 ${
          achievement.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
          achievement.rarity === 'Epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
          achievement.rarity === 'Rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
          'bg-gradient-to-r from-gray-500 to-slate-500'
        }`} />
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${
            isLocked ? 'bg-slate-700/50' : 
            isEarned ? 'bg-green-500/20' :
            'bg-slate-700/30'
          }`}>
            {isLocked ? (
              <Lock className="w-8 h-8 text-slate-500" />
            ) : (
              <achievement.icon className={`w-8 h-8 ${
                isEarned ? 'text-green-400' : 'text-slate-300'
              }`} />
            )}
          </div>
          
          <div className="text-right">
            <Badge className={`mb-2 ${getRarityColor(achievement.rarity)}`}>
              {achievement.rarity}
            </Badge>
            {achievement.points && (
              <p className="text-slate-400 text-sm">{achievement.points} pts</p>
            )}
          </div>
        </div>

        <h3 className="text-white font-semibold text-lg mb-2">{achievement.title}</h3>
        <p className="text-slate-400 text-sm mb-4">{achievement.description}</p>

        {/* Progress Bar for Available Achievements */}
        {type === 'available' && achievement.maxProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Progress</span>
              <span>{achievement.progress}/{achievement.maxProgress}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Earned Date */}
        {isEarned && achievement.earnedDate && (
          <div className="flex items-center gap-2 mb-3 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            Earned on {achievement.earnedDate}
          </div>
        )}

        {/* Lock Requirement */}
        {isLocked && achievement.requirement && (
          <div className="flex items-center gap-2 mb-3 text-sm text-slate-500">
            <Lock className="w-4 h-4" />
            {achievement.requirement}
          </div>
        )}

        {/* Reward */}
        <div className="flex items-center gap-2 text-sm">
          <Gift className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400">{achievement.reward}</span>
        </div>

        {/* Claim Button for Completed Available Achievements */}
        {type === 'available' && progressPercentage >= 100 && (
          <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <Trophy className="w-4 h-4 mr-2" />
            Claim Reward
          </Button>
        )}
      </div>
    </motion.div>
  )
}

function BadgeCard({ badge }: { badge: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${badge.bgColor} rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300`}
    >
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
          <badge.icon className={`w-8 h-8 ${badge.color}`} />
        </div>
        <h3 className="text-white font-semibold mb-2">{badge.name}</h3>
        <p className="text-slate-400 text-sm">{badge.description}</p>
      </div>
    </motion.div>
  )
}

export default function AwardsPage() {
  const [activeTab, setActiveTab] = useState("achievements")

  const earnedCount = achievementsData.earned.length
  const availableCount = achievementsData.available.length
  const totalPoints = achievementsData.earned.reduce((sum, ach) => sum + ach.points, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Awards & Achievements
              </h1>
              <p className="text-slate-400 mt-1">Raih pencapaian dan kumpulkan reward</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Achievements Earned</p>
                  <p className="text-3xl font-bold text-white">{earnedCount}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Available Achievements</p>
                  <p className="text-3xl font-bold text-white">{availableCount}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Points</p>
                  <p className="text-3xl font-bold text-white">{totalPoints.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-yellow-600">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-blue-600">
              <Award className="w-4 h-4 mr-2" />
              Badges
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8 mt-8">
            {/* Earned Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Earned Achievements ({earnedCount})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievementsData.earned.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} type="earned" />
                ))}
              </div>
            </div>

            {/* Available Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Available Achievements ({availableCount})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievementsData.available.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} type="available" />
                ))}
              </div>
            </div>

            {/* Locked Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-slate-500" />
                Locked Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievementsData.locked.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} type="locked" />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-8">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badgesData.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
