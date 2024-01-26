import type { AuthOptions, AuthProviderProps } from '@saas-ui/auth'

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
    params: RedirectLoginOptions,
    options?: AuthOptions
  ) => {
    await auth0Client.loginWithRedirect({
      ...params,
      authorizationParams: {
        redirect_uri: options?.redirectTo,
      },
    })
    return null
  }

  const onSignup = async (
    params: RedirectLoginOptions,
    options?: AuthOptions
  ) => {
    await auth0Client.loginWithRedirect({
      ...params,
      authorizationParams: {
        screen_hint: 'signup',
        prompt: 'login',
        redirect_uri: options?.redirectTo,
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
