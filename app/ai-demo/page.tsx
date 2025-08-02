"use client"

import React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DemoAIVerification from "@/components/DemoAIVerification"

export default function AIVerificationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/marketplace" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Marketplace
              </Link>
            </Button>
            <div className="text-slate-400">/</div>
            <div className="text-white">AI Verification Demo</div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="py-8">
        <DemoAIVerification />
      </div>
    </div>
  )
}
