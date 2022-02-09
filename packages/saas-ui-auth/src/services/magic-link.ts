import { AuthParams, User, AuthProviderProps, AuthToken } from '../'

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
  let token: AuthToken
  let expireTime = 0

  const onLogin = async (params: AuthParams): Promise<User | undefined> => {
    return await client.auth.loginWithMagicLink(params)
  }

  const onLogout = async () => {
    token = null
    expireTime = 0
    return await client.auth.signOut()
  }

  const onLoadUser = async () => {
    if (await client.user.isLoggedIn()) {
      return await client.user.getMetadata()
    }
  }

  const onGetToken = async () => {
    if (!token || Date.now() <= expireTime) {
      expireTime = Date.now() + 600 // now + 10 min
      token = await client.user.getIdToken()
    }

    return token
  }

  return {
    onLogin,
    onLogout,
    onLoadUser,
    onGetToken,
  }
}
