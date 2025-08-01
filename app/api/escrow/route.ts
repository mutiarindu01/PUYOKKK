import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getServerUser } from '@/lib/auth'
import { EscrowService } from '@/lib/escrow'

// GET /api/escrow - Fetch user's escrow contracts
export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const supabase = createServerSupabaseClient()
    
    let query = supabase
      .from('escrow_contracts')
      .select(`
        *,
        buyer:buyer_id(id, username, avatar_url, reputation_score),
        seller:seller_id(id, username, avatar_url, reputation_score),
        dispute:dispute_id(id, status, reason, created_at)
      `)
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)

    if (status) {
      query = query.eq('status', status)
    }

    // Apply pagination and sorting
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query
      .order('created_at', { ascending: false })
      .range(from, to)

    const { data: escrows, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch escrows: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      escrows,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error: any) {
    console.error('Fetch escrows error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/escrow - Create new escrow contract
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
      orderId,
      buyerAddress,
      sellerAddress,
      assetDetails,
      paymentAmount,
      currency,
      expirationDays
    } = await request.json()

    // Validate required fields
    if (!orderId || !buyerAddress || !sellerAddress || !assetDetails || !paymentAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user is authorized to create escrow for this order
    const supabase = createServerSupabaseClient()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('maker_id, taker_id')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.maker_id !== user.id && order.taker_id !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to create escrow for this order' },
        { status: 403 }
      )
    }

    // Create escrow using the service
    const escrowService = new EscrowService()
    const escrow = await escrowService.createEscrow({
      orderId,
      buyerAddress,
      sellerAddress,
      assetDetails,
      paymentAmount: parseFloat(paymentAmount),
      currency: currency || 'IDR',
      expirationDays: expirationDays || 7
    }, process.env.PRIVATE_KEY!)

    if (!escrow) {
      return NextResponse.json(
        { error: 'Failed to create escrow contract' },
        { status: 500 }
      )
    }

    // Update order with escrow ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({ escrow_id: escrow.id })
      .eq('id', orderId)

    if (updateError) {
      console.error('Failed to update order with escrow ID:', updateError)
    }

    return NextResponse.json({ escrow }, { status: 201 })
  } catch (error: any) {
    console.error('Create escrow error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}
