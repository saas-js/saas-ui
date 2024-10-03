import * as React from 'react'

import {
  ClerkProvider,
  WithClerk,
  AuthenticateWithRedirectCallback,
  WithClerkProp,
  type IsomorphicClerkOptions,
} from '@clerk/clerk-react'
import type { PublishableKeyOrFrontendApi } from '@clerk/types'

import { createAuthService, ClerkAuthService } from './auth-service'

export type ClerkAuthProviderProps = {
  children(
    props: WithClerkProp<{
      authService: ClerkAuthService
    }>
  ): React.ReactNode
} & Omit<IsomorphicClerkOptions, keyof PublishableKeyOrFrontendApi> &
  Partial<PublishableKeyOrFrontendApi>

export const ClerkAuthProvider = (props: ClerkAuthProviderProps) => {
  const {
    children,
    frontendApi,
    publishableKey,
    proxyUrl,
    domain,
    isSatellite,
    clerkJSUrl,
    ...rest
  } = props
  const isSSOCallback =
    typeof window !== 'undefined' && window.location.hash === '#sso_callback'
  return (
    /* @ts-expect-error */
    <ClerkProvider
      frontendApi={frontendApi}
      publishableKey={publishableKey}
      clerkJSUrl={clerkJSUrl}
      proxyUrl={proxyUrl}
      domain={domain}
      isSatellite={isSatellite}
      {...rest}
    >
      {isSSOCallback && <AuthenticateWithRedirectCallback />}
      <WithClerk>
        {(clerk) => {
          return children({ authService: createAuthService(clerk), clerk })
        }}
      </WithClerk>
    </ClerkProvider>
  )
}
