import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getServerUser } from '@/lib/auth'
import { EscrowService } from '@/lib/escrow'

interface RouteParams {
  escrowId: string
}

// GET /api/escrow/[escrowId] - Get specific escrow details
export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const user = await getServerUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const escrowService = new EscrowService()
    const escrow = await escrowService.getEscrowDetails(params.escrowId)

    if (!escrow) {
      return NextResponse.json(
        { error: 'Escrow not found' },
        { status: 404 }
      )
    }

    // Check if user is authorized to view this escrow
    if (escrow.buyerId !== user.id && escrow.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to view this escrow' },
        { status: 403 }
      )
    }

    return NextResponse.json({ escrow })
  } catch (error: any) {
    console.error('Get escrow error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/escrow/[escrowId] - Update escrow milestone or status
export async function PATCH(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const user = await getServerUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { action, milestoneId, completed } = await request.json()

    const escrowService = new EscrowService()
    const escrow = await escrowService.getEscrowDetails(params.escrowId)

    if (!escrow) {
      return NextResponse.json(
        { error: 'Escrow not found' },
        { status: 404 }
      )
    }

    // Check authorization
    if (escrow.buyerId !== user.id && escrow.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to modify this escrow' },
        { status: 403 }
      )
    }

    if (action === 'update_milestone') {
      const success = await escrowService.updateMilestone(
        params.escrowId,
        milestoneId,
        completed
      )

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to update milestone' },
          { status: 500 }
        )
      }

      // Check if auto-release conditions are met
      await escrowService.checkAndAutoRelease(params.escrowId)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Update escrow error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
