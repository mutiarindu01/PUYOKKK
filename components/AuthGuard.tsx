"use client"

import React, { ReactNode } from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'

interface AuthGuardProps {
  children: ReactNode
  actionName?: string
  requirePrompt?: boolean
  fallbackComponent?: ReactNode
  onAuthRequired?: () => void
  redirectPath?: string
}

export default function AuthGuard({ 
  children, 
  actionName = "melakukan aksi ini",
  requirePrompt = false,
  fallbackComponent = null,
  onAuthRequired,
  redirectPath
}: AuthGuardProps) {
  const { requireAuth, requireAuthWithPrompt, isAuthenticated } = useAuthGuard()

  const handleClick = (originalOnClick?: () => void) => {
    if (isAuthenticated()) {
      // User is authenticated, proceed with original action
      if (originalOnClick) {
        originalOnClick()
      }
    } else {
      // User needs auth
      if (onAuthRequired) {
        onAuthRequired()
      } else if (requirePrompt) {
        requireAuthWithPrompt(actionName, originalOnClick, redirectPath)
      } else {
        requireAuth(originalOnClick, redirectPath)
      }
    }
  }

  // If user is not authenticated and we have a fallback, show fallback
  if (!isAuthenticated() && fallbackComponent) {
    return <>{fallbackComponent}</>
  }

  // Clone children and add auth guard to onClick handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const originalOnClick = child.props.onClick
      return React.cloneElement(child as React.ReactElement<any>, {
        onClick: () => handleClick(originalOnClick)
      })
    }
    return child
  })

  return <>{enhancedChildren}</>
}
