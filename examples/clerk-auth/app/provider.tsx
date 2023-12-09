'use client'

import { SaasProvider } from '@saas-ui/react'
import { ClerkAuthProvider } from '@saas-ui/clerk/src'
import { AuthProvider } from '@saas-ui/auth'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkAuthProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {({ authService }) => (
        <SaasProvider>
          <AuthProvider {...authService}>{children}</AuthProvider>
        </SaasProvider>
      )}
    </ClerkAuthProvider>
  )
}
