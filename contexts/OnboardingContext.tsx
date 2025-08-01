"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type OnboardingStep = 'welcome' | 'wallet-connection' | 'terms-agreement' | 'profile-creation' | 'login-completion' | 'completed'

export type UserOnboardingStatus = {
  isNewUser: boolean
  currentStep: OnboardingStep
  hasConnectedWallet: boolean
  hasAgreedToTerms: boolean
  hasCreatedProfile: boolean
  hasCompletedLogin: boolean
  isOnboardingComplete: boolean
  walletAddress?: string
  userProfile?: {
    name: string
    email: string
    avatar?: string
  }
}

interface OnboardingContextType {
  onboardingStatus: UserOnboardingStatus
  setOnboardingStep: (step: OnboardingStep) => void
  completeWalletConnection: (walletAddress: string) => void
  completeTermsAgreement: () => void
  completeProfileCreation: (profile: { name: string; email: string; avatar?: string }) => void
  completeLogin: () => void
  resetOnboarding: () => void
  showOnboardingModal: boolean
  setShowOnboardingModal: (show: boolean) => void
  triggerOnboarding: () => void
  isReturningUser: () => boolean
  quickLogin: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const defaultOnboardingStatus: UserOnboardingStatus = {
  isNewUser: true,
  currentStep: 'welcome',
  hasConnectedWallet: false,
  hasAgreedToTerms: false,
  hasCreatedProfile: false,
  hasCompletedLogin: false,
  isOnboardingComplete: false
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingStatus, setOnboardingStatus] = useState<UserOnboardingStatus>(defaultOnboardingStatus)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)

  // Load onboarding status from localStorage on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('puyok-onboarding-status')
    if (savedStatus) {
      const parsedStatus = JSON.parse(savedStatus)
      setOnboardingStatus(parsedStatus)
      // Never auto-show modal - only show when triggered
      setShowOnboardingModal(false)
    } else {
      // First time user - don't auto-show onboarding, wait for trigger
      setShowOnboardingModal(false)
    }
  }, [])

  // Save onboarding status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('puyok-onboarding-status', JSON.stringify(onboardingStatus))
  }, [onboardingStatus])

  const setOnboardingStep = (step: OnboardingStep) => {
    setOnboardingStatus(prev => ({
      ...prev,
      currentStep: step
    }))
  }

  const completeWalletConnection = (walletAddress: string) => {
    setOnboardingStatus(prev => ({
      ...prev,
      hasConnectedWallet: true,
      walletAddress,
      currentStep: 'terms-agreement'
    }))
  }

  const completeTermsAgreement = () => {
    setOnboardingStatus(prev => ({
      ...prev,
      hasAgreedToTerms: true,
      currentStep: 'profile-creation'
    }))
  }

  const completeProfileCreation = (profile: { name: string; email: string; avatar?: string }) => {
    setOnboardingStatus(prev => ({
      ...prev,
      hasCreatedProfile: true,
      userProfile: profile,
      currentStep: 'login-completion'
    }))
  }

  const completeLogin = () => {
    setOnboardingStatus(prev => ({
      ...prev,
      hasCompletedLogin: true,
      isOnboardingComplete: true,
      isNewUser: false,
      currentStep: 'completed'
    }))
    setShowOnboardingModal(false)
  }

  const resetOnboarding = () => {
    setOnboardingStatus(defaultOnboardingStatus)
    localStorage.removeItem('puyok-onboarding-status')
    setShowOnboardingModal(true)
  }

  return (
    <OnboardingContext.Provider value={{
      onboardingStatus,
      setOnboardingStep,
      completeWalletConnection,
      completeTermsAgreement,
      completeProfileCreation,
      completeLogin,
      resetOnboarding,
      showOnboardingModal,
      setShowOnboardingModal
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
