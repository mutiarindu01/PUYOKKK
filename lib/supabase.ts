import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

// Service role client for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Client component client
export const createClientSupabaseClient = () => createClientComponentClient()

// Database types (will be generated from Supabase)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address?: string
          email?: string
          username: string
          avatar_url?: string
          kyc_level: 'none' | 'basic' | 'advanced' | 'premium'
          kyc_status: 'pending' | 'verified' | 'rejected'
          membership_tier: 'basic' | 'silver' | 'gold' | 'platinum'
          reputation_score: number
          total_trades: number
          success_rate: number
          response_time: string
          escrow_rating: number
          dispute_count: number
          warning_count: number
          is_2fa_enabled: boolean
          is_phone_verified: boolean
          is_email_verified: boolean
          transaction_limits: any
          loyalty_points: number
          referral_code: string
          referred_by?: string
          languages: string[]
          preferred_payments: string[]
          location: any
          created_at: string
          updated_at: string
          last_active: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      nfts: {
        Row: {
          id: string
          name: string
          description?: string
          image_url: string
          collection_id: string
          creator_id: string
          owner_id: string
          price: number
          currency: string
          rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
          category: string
          traits: any
          contract_address?: string
          token_id?: string
          token_standard: 'ERC721' | 'ERC1155'
          is_verified: boolean
          is_listed: boolean
          is_auction: boolean
          auction_end_time?: string
          likes_count: number
          views_count: number
          last_sale_price?: number
          floor_price?: number
          volume_24h?: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['nfts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['nfts']['Insert']>
      }
      collections: {
        Row: {
          id: string
          name: string
          description?: string
          image_url?: string
          banner_url?: string
          creator_id: string
          contract_address?: string
          total_supply?: number
          floor_price?: number
          volume_total: number
          volume_24h: number
          holders_count: number
          is_verified: boolean
          category: string
          social_links: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['collections']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['collections']['Insert']>
      }
      orders: {
        Row: {
          id: string
          type: 'buy' | 'sell'
          asset_type: 'NFT' | 'TOKEN'
          nft_id?: string
          token_contract?: string
          amount: number
          price: number
          total_value: number
          currency: string
          maker_id: string
          taker_id?: string
          status: 'active' | 'filled' | 'cancelled' | 'expired'
          payment_method: 'onchain' | 'gasless'
          payment_details: any
          escrow_id?: string
          expires_at: string
          filled_at?: string
          notes?: string
          fee_structure: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      escrow_contracts: {
        Row: {
          id: string
          contract_address: string
          order_id: string
          buyer_id: string
          seller_id: string
          asset_details: any
          payment_amount: number
          currency: string
          escrow_fee: number
          insurance_fee: number
          status: 'created' | 'funded' | 'released' | 'disputed' | 'cancelled'
          milestones: any
          dispute_id?: string
          created_at: string
          updated_at: string
          expires_at: string
        }
        Insert: Omit<Database['public']['Tables']['escrow_contracts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['escrow_contracts']['Insert']>
      }
      transactions: {
        Row: {
          id: string
          type: 'sale' | 'bid' | 'listing' | 'transfer' | 'mint'
          from_user_id?: string
          to_user_id?: string
          nft_id?: string
          amount: number
          currency: string
          transaction_hash?: string
          gas_fee?: number
          platform_fee: number
          status: 'pending' | 'confirmed' | 'failed'
          metadata: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>
      }
      chats: {
        Row: {
          id: string
          order_id: string
          sender_id: string
          receiver_id: string
          message: string
          message_type: 'text' | 'image' | 'file' | 'payment_proof' | 'system'
          file_url?: string
          file_name?: string
          is_read: boolean
          reactions: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['chats']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['chats']['Insert']>
      }
      disputes: {
        Row: {
          id: string
          order_id: string
          escrow_id: string
          complainant_id: string
          respondent_id: string
          reason: string
          status: 'open' | 'investigating' | 'mediation' | 'resolved' | 'escalated'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          evidence: any
          mediator_id?: string
          resolution?: string
          compensation_amount?: number
          created_at: string
          updated_at: string
          resolved_at?: string
        }
        Insert: Omit<Database['public']['Tables']['disputes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['disputes']['Insert']>
      }
      payment_accounts: {
        Row: {
          id: string
          user_id: string
          type: 'bank' | 'ewallet' | 'crypto'
          provider_name: string
          account_name: string
          account_number: string
          alias: string
          is_verified: boolean
          metadata: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['payment_accounts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payment_accounts']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
