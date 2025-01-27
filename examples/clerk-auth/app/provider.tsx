'use client'

import { SaasProvider } from '@saas-ui/react'
import { createAuthService } from '@saas-ui/clerk'
import { AuthProvider } from '@saas-ui/auth'
import { useClerk, ClerkProvider } from '@clerk/nextjs'
import { useMemo } from 'react'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <SaasProvider>
        <AuthServiceProvider>{children}</AuthServiceProvider>
      </SaasProvider>
    </ClerkProvider>
  )
}

function AuthServiceProvider({ children }: { children: React.ReactNode }) {
  const clerk = useClerk()

  const authService = useMemo(() => {
    if (clerk.loaded) {
      return createAuthService(clerk)
    }
  }, [clerk.loaded])

  if (!clerk.loaded) {
    return null
  }

  return <AuthProvider {...authService}>{children}</AuthProvider>
}
