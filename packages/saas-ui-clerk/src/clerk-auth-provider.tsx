import * as React from 'react'
import { LoadedClerk } from '@clerk/types'

import {
  ClerkProvider,
  WithClerk,
  AuthenticateWithRedirectCallback,
} from '@clerk/clerk-react'

import { createAuthService, ClerkAuthService } from './auth-service'

interface ClerkAuthProviderProps {
  frontendApi?: string
  children(props: {
    authService: ClerkAuthService
    clerk: LoadedClerk
  }): React.ReactNode
}

export const ClerkAuthProvider = ({
  frontendApi,
  children,
}: ClerkAuthProviderProps) => {
  const isSSOCallback =
    typeof window !== 'undefined' && window.location.hash === '#sso_callback'
  return (
    <ClerkProvider frontendApi={frontendApi}>
      {isSSOCallback && <AuthenticateWithRedirectCallback />}
      <WithClerk>
        {(clerk) => {
          return children({ authService: createAuthService(clerk), clerk })
        }}
      </WithClerk>
    </ClerkProvider>
  )
}
