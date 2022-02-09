import { AuthParams, User, AuthProviderProps } from '../'

/**
 * MagicLink auth service
 *
 * Only supports magic link at the moment.
 * `checkAuth` will refresh the id token after 10 minute.
 *
 * @param client MagicLink
 * @returns {AuthProviderProps}
 */
export const createAuthService = (client: any): AuthProviderProps => {
  let token: string | null
  let expireTime = 0

  const onLogin = async (params: AuthParams): Promise<User | undefined> => {
    return await client.auth.loginWithMagicLink(params)
  }

  const onLogout = async () => {
    token = null
    expireTime = 0
    return await client.auth.signOut()
  }

  // This will return the user meta data with the token id.
  // @todo, refactor the AuthProvider to support auth tokens.
  const onLoadUser = async () => {
    if (await client.user.isLoggedIn()) {
      const meta = await client.user.getMetadata()

      return {
        token,
        ...meta,
      }
    }
  }

  const onCheckAuth = async () => {
    if (!token || Date.now() <= expireTime) {
      expireTime = Date.now() + 600 // now + 10 min
      token = await client.user.getIdToken()
      return true
    } else {
      return true
    }
  }

  return {
    onLogin,
    onLogout,
    onLoadUser,
    onCheckAuth,
  }
}
