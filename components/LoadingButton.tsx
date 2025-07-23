"use client"

import { motion } from "framer-motion"
import { Button, ButtonProps } from "@/components/ui/button"
import { LoadingSpinner } from "./LoadingSkeletons"
import { ReactNode } from "react"

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  children: ReactNode
}

export default function LoadingButton({ 
  loading = false, 
  loadingText, 
  children, 
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  const buttonText = loading ? (loadingText || "Memproses...") : children

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className={`relative overflow-hidden transition-all duration-200 ${className}`}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={{
          opacity: loading ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {loading && <LoadingSpinner size="sm" />}
        <span>{buttonText}</span>
      </motion.div>
      
      {/* Shimmer effect when loading */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </Button>
  )
}

// Specialized button for blockchain transactions
export function BlockchainTransactionButton({ 
  loading, 
  children, 
  ...props 
}: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      loadingText="Memproses Transaksi..."
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
      {...props}
    >
      {children}
    </LoadingButton>
  )
}

// Specialized button for buy actions
export function BuyButton({ 
  loading, 
  children, 
  ...props 
}: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      loadingText="Memproses Pembelian..."
      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
      {...props}
    >
      {children}
    </LoadingButton>
  )
}

// Specialized button for sell/list actions
export function SellButton({ 
  loading, 
  children, 
  ...props 
}: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      loadingText="Menayangkan Order..."
      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold"
      {...props}
    >
      {children}
    </LoadingButton>
  )
}

// Specialized button for verification actions
export function VerifyButton({ 
  loading, 
  children, 
  ...props 
}: LoadingButtonProps) {
  return (
    <LoadingButton
      loading={loading}
      loadingText="Memverifikasi..."
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
      {...props}
    >
      {children}
    </LoadingButton>
  )
}
