'use client'

import React from 'react'
import { AuthProvider as AuthProviderBase } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/auth0'
import { Auth0Client } from '@auth0/auth0-spa-js'

const auth0client = new Auth0Client({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
})

const authService = createAuthService(auth0client)

export const AuthProvider: React.FC<React.PropsWithChildren> = (props) => {
  return <AuthProviderBase {...authService}>{props.children}</AuthProviderBase>
}
