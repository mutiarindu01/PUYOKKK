import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getServerUser } from '@/lib/auth'

// GET /api/orders - Fetch orders with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'buy' or 'sell'
    const assetType = searchParams.get('assetType') // 'NFT' or 'TOKEN'
    const status = searchParams.get('status')
    const paymentMethod = searchParams.get('paymentMethod')
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const supabase = createServerSupabaseClient()
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        maker:maker_id(id, username, avatar_url, reputation_score, total_trades, success_rate, escrow_rating, is_verified),
        taker:taker_id(id, username, avatar_url),
        nft:nft_id(id, name, image_url, collection_id),
        escrow:escrow_id(id, status, milestones)
      `)

    // Apply filters
    if (type) {
      query = query.eq('type', type)
    }

    if (assetType) {
      query = query.eq('asset_type', assetType)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (paymentMethod) {
      query = query.eq('payment_method', paymentMethod)
    }

    if (userId) {
      query = query.or(`maker_id.eq.${userId},taker_id.eq.${userId}`)
    }

    // Apply pagination and sorting
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query
      .order('created_at', { ascending: false })
      .range(from, to)

    const { data: orders, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch orders: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error: any) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const {
      type,
      assetType,
      nftId,
      tokenContract,
      amount,
      price,
      currency,
      paymentMethod,
      paymentDetails,
      expirationDays,
      notes,
      feeStructure
    } = await request.json()

    // Validate required fields
    if (!type || !assetType || !amount || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate asset reference
    if (assetType === 'NFT' && !nftId) {
      return NextResponse.json(
        { error: 'NFT ID is required for NFT orders' },
        { status: 400 }
      )
    }

    if (assetType === 'TOKEN' && !tokenContract) {
      return NextResponse.json(
        { error: 'Token contract is required for token orders' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Check transaction limits
    const today = new Date().toISOString().split('T')[0]
    const { data: dailyOrders } = await supabase
      .from('orders')
      .select('total_value')
      .eq('maker_id', user.id)
      .gte('created_at', today + 'T00:00:00.000Z')

    const dailyVolume = dailyOrders?.reduce((sum, order) => sum + order.total_value, 0) || 0
    const totalValue = amount * price

    if (dailyVolume + totalValue > user.transactionLimits.daily) {
      return NextResponse.json(
        { error: 'Daily transaction limit exceeded' },
        { status: 400 }
      )
    }

    // Calculate expiration date
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + (expirationDays || 7))

    const orderData = {
      type,
      asset_type: assetType,
      nft_id: nftId,
      token_contract: tokenContract,
      amount: parseFloat(amount),
      price: parseFloat(price),
      total_value: totalValue,
      currency: currency || 'IDR',
      maker_id: user.id,
      status: 'active',
      payment_method: paymentMethod || 'gasless',
      payment_details: paymentDetails || {},
      expires_at: expiresAt.toISOString(),
      notes,
      fee_structure: feeStructure || {
        makerFee: 0.1,
        takerFee: 0.15,
        gasFee: paymentMethod === 'onchain' ? 0.02 : 0
      }
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select(`
        *,
        maker:maker_id(id, username, avatar_url, reputation_score, total_trades, success_rate, escrow_rating),
        nft:nft_id(id, name, image_url, collection_id)
      `)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create order: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error: any) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
