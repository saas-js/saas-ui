import type { AuthParams, AuthOptions, AuthProviderProps } from '@saas-ui/auth'

import type {
  Auth0Client,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js'

export const createAuthService = <Client extends Auth0Client>(
  auth0Client: Client
): AuthProviderProps<User> => {
  const onRestoreAuthState = async () => {
    if (
      global?.location?.search?.includes('code=') &&
      global?.location?.search?.includes('state=')
    ) {
      const { appState } = await auth0Client.handleRedirectCallback()
      const url =
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      global?.location?.assign(url)
    }
  }

  const onLogin = async (
    params: AuthParams,
    options?: AuthOptions<RedirectLoginOptions>
  ) => {
    await auth0Client.loginWithRedirect(options)
    return null
  }

  const onSignup = async (
    params: AuthParams,
    options?: AuthOptions<RedirectLoginOptions>
  ) => {
    await auth0Client.loginWithRedirect({
      ...options,
      authorizationParams: {
        screen_hint: 'signup',
        prompt: 'login',
      },
    })
    return null
  }

  const onLogout = async () => {
    return await auth0Client.logout()
  }

  const onLoadUser = async () => {
    const user = await auth0Client.getUser()
    return user || null
  }

  const onGetToken = async () => {
    return await auth0Client.getTokenSilently()
  }

  return {
    onRestoreAuthState,
    onLogin,
    onSignup,
    onLogout,
    onLoadUser,
    onGetToken,
  }
}
