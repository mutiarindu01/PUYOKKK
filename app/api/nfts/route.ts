import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getServerUser } from '@/lib/auth'

// GET /api/nfts - Fetch NFTs with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const rarity = searchParams.get('rarity')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const search = searchParams.get('search')
    const verified = searchParams.get('verified')
    const isListed = searchParams.get('isListed')

    const supabase = createServerSupabaseClient()
    
    let query = supabase
      .from('nfts')
      .select(`
        *,
        creator:creator_id(id, username, avatar_url, is_verified),
        owner:owner_id(id, username, avatar_url),
        collection:collection_id(id, name, is_verified)
      `)

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (rarity) {
      query = query.eq('rarity', rarity)
    }

    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice))
    }

    if (verified === 'true') {
      query = query.eq('is_verified', true)
    }

    if (isListed === 'true') {
      query = query.eq('is_listed', true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: nfts, error, count } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch NFTs: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      nfts,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error: any) {
    console.error('Fetch NFTs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/nfts - Create new NFT listing
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
      name,
      description,
      imageUrl,
      collectionId,
      price,
      currency,
      rarity,
      category,
      traits,
      contractAddress,
      tokenId,
      tokenStandard,
      isAuction,
      auctionEndTime
    } = await request.json()

    // Validate required fields
    if (!name || !imageUrl || !collectionId || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const nftData = {
      name,
      description,
      image_url: imageUrl,
      collection_id: collectionId,
      creator_id: user.id,
      owner_id: user.id,
      price: parseFloat(price),
      currency: currency || 'IDR',
      rarity: rarity || 'Common',
      category,
      traits: traits || {},
      contract_address: contractAddress,
      token_id: tokenId,
      token_standard: tokenStandard || 'ERC721',
      is_verified: false,
      is_listed: true,
      is_auction: isAuction || false,
      auction_end_time: auctionEndTime,
      likes_count: 0,
      views_count: 0
    }

    const { data: nft, error } = await supabase
      .from('nfts')
      .insert(nftData)
      .select(`
        *,
        creator:creator_id(id, username, avatar_url),
        owner:owner_id(id, username, avatar_url),
        collection:collection_id(id, name, is_verified)
      `)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create NFT: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ nft }, { status: 201 })
  } catch (error: any) {
    console.error('Create NFT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
