import type { AuthProviderProps, AuthToken } from '@saas-ui/auth'

import type { Magic, MagicUserMetadata } from 'magic-sdk'

export interface MagicLinkServiceOptions {
  redirectURI?: string
  showUI?: boolean
}

/**
 * MagicLink auth service
 *
 * Only supports magic link at the moment.
 * `checkAuth` will refresh the id token after 10 minute.
 *
 * @param client MagicLink
 * @returns {AuthProviderProps}
 */
export const createAuthService = (
  client: Magic,
  serviceOptions?: MagicLinkServiceOptions
): AuthProviderProps<Partial<MagicUserMetadata>> => {
  let token: AuthToken
  let expireTime = 0

  return {
    onLogin: async (params) => {
      if (!params.email) {
        throw new Error('Email is required')
      }

      token = await client.auth.loginWithMagicLink({
        email: params.email,
        redirectURI: serviceOptions?.redirectURI,
        showUI: serviceOptions?.showUI,
        ...params,
      })

      return await client.user.getMetadata()
    },
    onLogout: async () => {
      token = null
      expireTime = 0
      return await client.user.logout()
    },
    onLoadUser: async () => {
      if (await client.user.isLoggedIn()) {
        return await client.user.getMetadata()
      }
      return null
    },
    onGetToken: async () => {
      if (!token || Date.now() <= expireTime) {
        expireTime = Date.now() + 600 // now + 10 min
        token = await client.user.getIdToken()
      }

      return token
    },
  }
}
