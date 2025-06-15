import type {
  Auth0Client,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js'
import type { AuthOptions, AuthProviderProps } from '@saas-ui/auth-provider'

export const createAuthService = <Client extends Auth0Client>(
  auth0Client: Client,
): AuthProviderProps<User> => {
  return {
    onRestoreAuthState: async () => {
      if (
        typeof window !== 'undefined' &&
        window.location?.search?.includes('code=') &&
        window.location?.search?.includes('state=')
      ) {
        const { appState } = await auth0Client.handleRedirectCallback(
          window.location.href,
        )

        if (appState && appState.targetUrl) {
          window.location?.assign(appState.targetUrl)
        } else {
          history.replaceState({}, document.title, window.location.pathname)
        }
      }
    },
    onLogin: async (
      _params?: object,
      options: AuthOptions<RedirectLoginOptions> = {},
    ) => {
      const { redirectTo, ...loginOptions } = options

      await auth0Client.loginWithRedirect({
        ...loginOptions,
        authorizationParams: {
          redirect_uri: redirectTo ?? window.location.href,
        },
      })
      return null
    },
    onSignup: async (
      _params?: object,
      options: AuthOptions<RedirectLoginOptions> = {},
    ) => {
      const { redirectTo, ...loginOptions } = options

      await auth0Client.loginWithRedirect({
        ...loginOptions,
        authorizationParams: {
          screen_hint: 'signup',
          prompt: 'login',
          redirect_uri: options?.redirectTo ?? window.location.href,
        },
      })
      return null
    },
    onLogout: async () => {
      return await auth0Client.logout({
        logoutParams: { returnTo: window.location.origin },
      })
    },
    onLoadUser: async () => {
      const user = await auth0Client.getUser()
      return user || null
    },
    onGetToken: async () => {
      return auth0Client.getTokenSilently({
        timeoutInSeconds: 2,
      })
    },
  } satisfies AuthProviderProps<User>
}
