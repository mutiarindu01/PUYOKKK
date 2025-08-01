import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, signature, message, username } = await request.json()

    // Verify signature
    const recoveredAddress = ethers.utils.verifyMessage(message, signature)
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    let user

    if (existingUser) {
      // Update last active
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ last_active: new Date().toISOString() })
        .eq('id', existingUser.id)
        .select()
        .single()

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 500 }
        )
      }
      user = updatedUser
    } else {
      // Create new user
      if (!username) {
        return NextResponse.json(
          { error: 'Username is required for new wallet registration' },
          { status: 400 }
        )
      }

      const generateReferralCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase()
      }

      const newUserData = {
        wallet_address: walletAddress.toLowerCase(),
        username,
        kyc_level: 'none',
        kyc_status: 'pending',
        membership_tier: 'basic',
        reputation_score: 0,
        total_trades: 0,
        success_rate: 0,
        response_time: 'Not available',
        escrow_rating: 0,
        dispute_count: 0,
        warning_count: 0,
        is_2fa_enabled: false,
        is_phone_verified: false,
        is_email_verified: false,
        transaction_limits: {
          daily: 50000000, // 50M IDR for basic users
          monthly: 1000000000, // 1B IDR
          used: { daily: 0, monthly: 0 }
        },
        loyalty_points: 0,
        referral_code: generateReferralCode(),
        languages: ['Bahasa Indonesia'],
        preferred_payments: [],
        location: { country: 'Indonesia', city: '' },
        last_active: new Date().toISOString()
      }

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert(newUserData)
        .select()
        .single()

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create user: ' + createError.message },
          { status: 500 }
        )
      }
      user = createdUser
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        walletAddress: user.wallet_address,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      process.env.JWT_SECRET!
    )

    return NextResponse.json({
      user: {
        id: user.id,
        walletAddress: user.wallet_address,
        username: user.username,
        avatarUrl: user.avatar_url,
        kycLevel: user.kyc_level,
        kycStatus: user.kyc_status,
        membershipTier: user.membership_tier,
        reputationScore: user.reputation_score,
        totalTrades: user.total_trades,
        successRate: user.success_rate,
        escrowRating: user.escrow_rating,
        is2FAEnabled: user.is_2fa_enabled,
        isPhoneVerified: user.is_phone_verified,
        isEmailVerified: user.is_email_verified,
        transactionLimits: user.transaction_limits,
        loyaltyPoints: user.loyalty_points,
        location: user.location
      },
      token
    })
  } catch (error: any) {
    console.error('Wallet auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed: ' + error.message },
      { status: 500 }
    )
  }
}
