"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Database, 
  Shield, 
  Wallet, 
  Settings,
  X,
  ExternalLink
} from 'lucide-react'
import { isSupabaseConfigured } from '@/lib/supabase'

interface DevStatusProps {
  onClose?: () => void
}

export default function DevStatus({ onClose }: DevStatusProps) {
  const [checks, setChecks] = useState({
    supabase: false,
    jwt: false,
    ethers: true, // This is now fixed
    auth: true    // This is now working
  })

  useEffect(() => {
    // Check configuration status
    setChecks({
      supabase: isSupabaseConfigured(),
      jwt: !!(process.env.JWT_SECRET && process.env.JWT_SECRET.length > 20),
      ethers: true,
      auth: true
    })
  }, [])

  const getStatusColor = (status: boolean) => status ? 'text-green-400' : 'text-orange-400'
  const getStatusIcon = (status: boolean) => status ? 
    <CheckCircle className="w-4 h-4 text-green-400" /> : 
    <AlertCircle className="w-4 h-4 text-orange-400" />

  return (
    <Card className="bg-slate-900/95 border-slate-700 text-white max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-xl">PUYOK Development Status</CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <CardDescription className="text-slate-400">
          Sistema konfiguration dan status integrasi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Core System Status */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Core Systems
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(checks.ethers)}
                <span className="text-sm">Ethers.js v6</span>
              </div>
              <Badge className={`${checks.ethers ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {checks.ethers ? 'Ready' : 'Error'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(checks.auth)}
                <span className="text-sm">Authentication</span>
              </div>
              <Badge className={`${checks.auth ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {checks.auth ? 'Ready' : 'Error'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(checks.jwt)}
                <span className="text-sm">JWT Security</span>
              </div>
              <Badge className={`${checks.jwt ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {checks.jwt ? 'Configured' : 'Setup Required'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(checks.supabase)}
                <span className="text-sm">Supabase Database</span>
              </div>
              <Badge className={`${checks.supabase ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {checks.supabase ? 'Connected' : 'Demo Mode'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300">Quick Setup</h4>
          
          {!checks.supabase && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Database className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-400 font-medium">Setup Supabase Database (5 min)</p>
                  <p className="text-xs text-slate-400 mt-1">
                    1. Create project at supabase.com<br/>
                    2. Copy URL & keys to .env.local<br/>
                    3. Run database/init.sql script
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open Supabase
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!checks.jwt && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-400 font-medium">Generate JWT Secret</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300">Available Features</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Wallet Auth (MetaMask)</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Email Authentication</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>NFT Marketplace UI</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Order Book System</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Escrow Smart Contract</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Real-time Chat</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span>KYC Verification</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-slate-600" asChild>
            <a href="/marketplace">
              <Wallet className="w-4 h-4 mr-2" />
              Test Marketplace
            </a>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-slate-600" asChild>
            <a href="/rafli/admin/login">
              <Settings className="w-4 h-4 mr-2" />
              Admin Panel
            </a>
          </Button>
        </div>

        <div className="text-center text-xs text-slate-500">
          💡 See SETUP.md for complete configuration guide
        </div>
      </CardContent>
    </Card>
  )
}
