"use client"

import { useOnboarding } from '@/contexts/OnboardingContext'
import { useRouter } from 'next/navigation'

export function useAuthGuard() {
  const { onboardingStatus, triggerOnboarding, isReturningUser } = useOnboarding()
  const router = useRouter()

  const requireAuth = (action?: () => void, redirectPath?: string) => {
    const isAuthenticated = onboardingStatus.isOnboardingComplete && 
                           localStorage.getItem('walletConnected') === 'true'

    if (isAuthenticated) {
      // User is authenticated, proceed with action
      if (action) {
        action()
      }
      if (redirectPath) {
        router.push(redirectPath)
      }
    } else {
      // User needs to authenticate, trigger onboarding
      triggerOnboarding()
    }
  }

  const requireAuthWithPrompt = (
    actionName: string, 
    action?: () => void, 
    redirectPath?: string
  ) => {
    const isAuthenticated = onboardingStatus.isOnboardingComplete && 
                           localStorage.getItem('walletConnected') === 'true'

    if (isAuthenticated) {
      // User is authenticated, proceed with action
      if (action) {
        action()
      }
      if (redirectPath) {
        router.push(redirectPath)
      }
    } else {
      // Show prompt message before triggering auth
      if (window.confirm(`Untuk ${actionName}, Anda perlu login terlebih dahulu. Lanjutkan ke proses login?`)) {
        triggerOnboarding()
      }
    }
  }

  const isAuthenticated = () => {
    return onboardingStatus.isOnboardingComplete && 
           localStorage.getItem('walletConnected') === 'true'
  }

  const isLoggedIn = () => {
    return isAuthenticated()
  }

  return {
    requireAuth,
    requireAuthWithPrompt,
    isAuthenticated,
    isLoggedIn,
    triggerOnboarding
  }
}
