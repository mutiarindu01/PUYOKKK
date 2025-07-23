"use client"

import { motion } from "framer-motion"
import { NFTGridSkeleton, SkeletonBase } from "./LoadingSkeletons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "./LoadingSkeletons"

// Hero section skeleton
const HeroSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden"
  >
    <div className="container mx-auto px-4 h-full flex items-center">
      <div className="max-w-2xl space-y-6">
        <SkeletonBase className="h-16 w-3/4" />
        <SkeletonBase className="h-6 w-full" />
        <SkeletonBase className="h-6 w-2/3" />
        <div className="flex gap-4 pt-4">
          <SkeletonBase className="h-12 w-32" />
          <SkeletonBase className="h-12 w-40" />
        </div>
      </div>
    </div>
    
    {/* Floating elements animation */}
    {Array.from({ length: 3 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-20 h-20 rounded-full bg-slate-300/30 dark:bg-slate-600/30"
        style={{
          right: `${20 + i * 15}%`,
          top: `${30 + i * 20}%`,
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.div>
)

// Search and filters skeleton
const FiltersSeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-slate-800 shadow-sm border-b py-6"
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <SkeletonBase className="h-10 w-full rounded-lg" />
        </div>
        <div className="flex gap-2">
          <SkeletonBase className="h-10 w-24 rounded-lg" />
          <SkeletonBase className="h-10 w-24 rounded-lg" />
          <SkeletonBase className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      
      {/* Categories tabs skeleton */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonBase key={i} className="h-8 w-20 rounded-full flex-shrink-0" />
        ))}
      </div>
    </div>
  </motion.div>
)

// Stats section skeleton
const StatsSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-50 dark:bg-slate-900 py-12"
  >
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <SkeletonBase className="h-12 w-24 mx-auto mb-3" />
            <SkeletonBase className="h-4 w-20 mx-auto" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Trending section skeleton
const TrendingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="py-16"
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <SkeletonBase className="h-10 w-64 mx-auto mb-4" />
        <SkeletonBase className="h-6 w-96 mx-auto" />
      </div>
      
      {/* Featured trending items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
          >
            <SkeletonBase className="w-full h-48 rounded-xl mb-4" />
            <SkeletonBase className="h-6 w-3/4 mb-3" />
            <div className="flex items-center gap-3 mb-4">
              <SkeletonBase className="w-8 h-8 rounded-full" />
              <SkeletonBase className="h-4 w-24" />
            </div>
            <div className="flex items-center justify-between">
              <SkeletonBase className="h-8 w-32" />
              <SkeletonBase className="h-8 w-20 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Main marketplace loading component
export default function MarketplaceLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* Header skeleton */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SkeletonBase className="h-8 w-32" />
            <div className="flex items-center gap-4">
              <SkeletonBase className="h-8 w-8 rounded-full" />
              <SkeletonBase className="h-8 w-24" />
            </div>
          </div>
        </div>
      </motion.div>

      <HeroSkeleton />
      <FiltersSeleton />
      <StatsSkeleton />
      <TrendingSkeleton />
      
      {/* Main marketplace grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <SkeletonBase className="h-10 w-48 mx-auto mb-4" />
          <SkeletonBase className="h-6 w-72 mx-auto" />
        </div>
        
        <NFTGridSkeleton count={12} />
        
        {/* Load more button skeleton */}
        <div className="text-center mt-12">
          <SkeletonBase className="h-12 w-40 mx-auto rounded-lg" />
        </div>
      </div>
      
      {/* Loading overlay for user feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center gap-3 z-50"
      >
        <LoadingSpinner size="sm" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Memuat marketplace...
        </span>
      </motion.div>
    </motion.div>
  )
}

// Loading state for specific sections
export function MarketplaceSectionLoading({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <LoadingSpinner size="sm" />
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Memuat {title}...
          </h2>
        </div>
        <NFTGridSkeleton count={4} />
      </div>
    </motion.div>
  )
}
