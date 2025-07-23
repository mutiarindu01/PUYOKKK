"use client"

import { motion } from "framer-motion"

// Base skeleton component with shimmer animation
const SkeletonBase = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-md ${className}`}
  />
)

// NFT Card Skeleton for marketplace
export const NFTCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700"
  >
    {/* Image skeleton */}
    <SkeletonBase className="w-full h-48 mb-4" />
    
    {/* Title skeleton */}
    <SkeletonBase className="h-6 w-3/4 mb-3" />
    
    {/* Creator info skeleton */}
    <div className="flex items-center gap-3 mb-4">
      <SkeletonBase className="w-8 h-8 rounded-full" />
      <SkeletonBase className="h-4 w-24" />
    </div>
    
    {/* Price section skeleton */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <SkeletonBase className="h-3 w-16 mb-2" />
        <SkeletonBase className="h-5 w-20" />
      </div>
      <SkeletonBase className="h-6 w-16 rounded-full" />
    </div>
    
    {/* Button skeleton */}
    <SkeletonBase className="h-10 w-full rounded-lg" />
  </motion.div>
)

// Grid of NFT cards skeleton
export const NFTGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <NFTCardSkeleton key={i} />
    ))}
  </div>
)

// Profile skeleton
export const ProfileSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    {/* Cover image skeleton */}
    <SkeletonBase className="w-full h-48 lg:h-64" />
    
    {/* Profile info skeleton */}
    <div className="flex items-center gap-6 px-4">
      <SkeletonBase className="w-24 h-24 rounded-full" />
      <div className="space-y-3 flex-1">
        <SkeletonBase className="h-8 w-48" />
        <SkeletonBase className="h-4 w-32" />
        <div className="flex gap-4">
          <SkeletonBase className="h-5 w-16" />
          <SkeletonBase className="h-5 w-16" />
          <SkeletonBase className="h-5 w-16" />
        </div>
      </div>
    </div>
    
    {/* Stats skeleton */}
    <div className="grid grid-cols-3 gap-4 px-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="text-center space-y-2">
          <SkeletonBase className="h-6 w-16 mx-auto" />
          <SkeletonBase className="h-4 w-12 mx-auto" />
        </div>
      ))}
    </div>
  </motion.div>
)

// Dashboard stats skeleton
export const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <SkeletonBase className="h-4 w-24" />
          <SkeletonBase className="w-8 h-8 rounded-lg" />
        </div>
        <SkeletonBase className="h-8 w-20 mb-2" />
        <SkeletonBase className="h-3 w-32" />
      </motion.div>
    ))}
  </div>
)

// List item skeleton for activities/transactions
export const ListItemSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
  >
    <SkeletonBase className="w-12 h-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-4 w-48" />
      <SkeletonBase className="h-3 w-32" />
    </div>
    <div className="text-right space-y-2">
      <SkeletonBase className="h-4 w-20" />
      <SkeletonBase className="h-3 w-16" />
    </div>
  </motion.div>
)

// Activity feed skeleton
export const ActivityFeedSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <ListItemSkeleton key={i} />
    ))}
  </div>
)

// Table skeleton for admin pages
export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-4"
  >
    {/* Table header skeleton */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }, (_, i) => (
        <SkeletonBase key={i} className="h-5 w-full" />
      ))}
    </div>
    
    {/* Table rows skeleton */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }, (_, colIndex) => (
          <SkeletonBase key={colIndex} className="h-4 w-full" />
        ))}
      </div>
    ))}
  </motion.div>
)

// Chart skeleton
export const ChartSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
  >
    <SkeletonBase className="h-6 w-48 mb-6" />
    <div className="flex items-end justify-between h-64 gap-2">
      {Array.from({ length: 7 }, (_, i) => (
        <SkeletonBase 
          key={i} 
          className="w-full rounded-t-md"
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  </motion.div>
)

// Notification skeleton
export const NotificationSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-3 p-4 border-b border-slate-200 dark:border-slate-700"
  >
    <SkeletonBase className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-3 w-3/4" />
      <SkeletonBase className="h-3 w-20" />
    </div>
  </motion.div>
)

// Loading spinner component for buttons
export const LoadingSpinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full`}
    />
  )
}

// Full page loading component
export const PageLoadingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6"
  >
    <div className="container mx-auto">
      {/* Header skeleton */}
      <div className="mb-8">
        <SkeletonBase className="h-10 w-64 mb-4" />
        <SkeletonBase className="h-4 w-96" />
      </div>
      
      {/* Stats grid skeleton */}
      <DashboardStatsSkeleton />
      
      {/* Content area skeleton */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div className="space-y-4">
          <SkeletonBase className="h-6 w-32 mb-4" />
          <ActivityFeedSkeleton />
        </div>
      </div>
    </div>
  </motion.div>
)
