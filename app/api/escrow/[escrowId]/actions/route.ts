import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getServerUser } from '@/lib/auth'
import { EscrowService } from '@/lib/escrow'

interface RouteParams {
  escrowId: string
}

// POST /api/escrow/[escrowId]/actions - Perform escrow actions (release, dispute, cancel)
export async function POST(
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

    const { action, reason, evidence } = await request.json()

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
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

    // Check authorization based on action
    let authorized = false
    switch (action) {
      case 'release':
        // Only buyer can release funds
        authorized = escrow.buyerId === user.id
        break
      case 'dispute':
        // Both buyer and seller can dispute
        authorized = escrow.buyerId === user.id || escrow.sellerId === user.id
        break
      case 'cancel':
        // Both parties can cancel if escrow is not funded yet
        authorized = (escrow.buyerId === user.id || escrow.sellerId === user.id) && 
                    escrow.status === 'created'
        break
      default:
        authorized = false
    }

    if (!authorized) {
      return NextResponse.json(
        { error: 'Not authorized to perform this action' },
        { status: 403 }
      )
    }

    let result = false
    let message = ''

    switch (action) {
      case 'release':
        if (escrow.status !== 'funded') {
          return NextResponse.json(
            { error: 'Escrow must be funded to release' },
            { status: 400 }
          )
        }
        
        result = await escrowService.releaseEscrow(
          params.escrowId,
          process.env.PRIVATE_KEY!
        )
        message = result ? 'Escrow released successfully' : 'Failed to release escrow'
        break

      case 'dispute':
        if (!reason) {
          return NextResponse.json(
            { error: 'Dispute reason is required' },
            { status: 400 }
          )
        }

        if (escrow.status === 'disputed') {
          return NextResponse.json(
            { error: 'Escrow is already disputed' },
            { status: 400 }
          )
        }

        result = await escrowService.disputeEscrow(
          params.escrowId,
          reason,
          evidence || [],
          process.env.PRIVATE_KEY!
        )
        message = result ? 'Dispute created successfully' : 'Failed to create dispute'
        break

      case 'cancel':
        if (escrow.status !== 'created') {
          return NextResponse.json(
            { error: 'Only unfunded escrows can be cancelled' },
            { status: 400 }
          )
        }

        result = await escrowService.cancelEscrow(
          params.escrowId,
          process.env.PRIVATE_KEY!
        )
        message = result ? 'Escrow cancelled successfully' : 'Failed to cancel escrow'
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    if (result) {
      // Log the action for audit trail
      const supabase = createServerSupabaseClient()
      await supabase
        .from('transactions')
        .insert({
          type: action as any,
          from_user_id: user.id,
          amount: escrow.paymentAmount,
          currency: escrow.currency,
          platform_fee: escrow.escrowFee + escrow.insuranceFee,
          status: 'confirmed',
          metadata: {
            escrow_id: params.escrowId,
            action,
            reason: reason || null,
            evidence: evidence || null
          }
        })

      return NextResponse.json({
        success: true,
        message,
        escrow: await escrowService.getEscrowDetails(params.escrowId)
      })
    } else {
      return NextResponse.json(
        { error: message },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Escrow action error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}
