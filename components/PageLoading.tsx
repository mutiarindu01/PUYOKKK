"use client"

import { motion } from "framer-motion"
import { LoadingSpinner } from "./LoadingSkeletons"

interface PageLoadingProps {
  message?: string
  fullScreen?: boolean
}

export default function PageLoading({ 
  message = "Memuat halaman...", 
  fullScreen = true 
}: PageLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${fullScreen ? 'min-h-screen' : 'h-64'} flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
    >
      <div className="text-center space-y-4">
        {/* Animated logo placeholder */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-white">P</span>
        </motion.div>

        {/* Loading spinner and text */}
        <div className="flex items-center justify-center gap-3">
          <LoadingSpinner size="md" />
          <motion.p
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-lg font-medium text-slate-700 dark:text-slate-300"
          >
            {message}
          </motion.p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Minimal loading for small components
export function MiniLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <LoadingSpinner size="sm" />
      <span className="text-sm text-slate-600 dark:text-slate-400">{message}</span>
    </div>
  )
}

// Loading overlay for modals/dialogs
export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-2xl max-w-sm w-full mx-4"
      >
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            Memproses transaksi...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mohon tunggu, jangan tutup halaman ini
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
