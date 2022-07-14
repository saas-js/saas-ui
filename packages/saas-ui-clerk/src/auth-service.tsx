import {
  LoadedClerk,
  AuthenticateWithRedirectParams,
  SignInCreateParams,
} from '@clerk/types'
import {
  AuthParams,
  AuthOptions,
  User,
  AuthProviderProps,
  AuthStateChangeCallback,
} from '@saas-ui/auth'

interface ClerkParams {
  identifier?: string
  email?: string
  password?: string
}

/**
 * Clerk auth service
 *
 *
 * @param client Clerk
 * @returns {AuthProviderProps}
 */
export const createAuthService = (clerk: LoadedClerk): AuthProviderProps => {
  const client = clerk.client

  if (!client) {
    throw new Error('Clerk client not available.')
  }

  let authCallback: AuthStateChangeCallback | null

  const onLogin = async (
    params: AuthParams,
    options?: AuthOptions
  ): Promise<User | null | undefined> => {
    if (params.provider) {
      await client.signIn.authenticateWithRedirect({
        strategy: `oauth_${params.provider}`,
        redirectUrl: '/#sso_callback',
        redirectUrlComplete: options?.redirectTo || '/',
      } as AuthenticateWithRedirectParams)
      return
    }

    let clerkParams: SignInCreateParams

    if (!params.email) {
      return
    } else if (params.password) {
      clerkParams = {
        identifier: params.email,
        password: params.password,
      }
    } else {
      clerkParams = {
        identifier: params.email,
      }
    }

    const signIn = await client.signIn.create(clerkParams)

    if (signIn.status === 'complete') {
      await clerk.setSession(signIn.createdSessionId)

      return onLoadUser()
    }

    /* @ts-ignore */
    const { emailAddressId } = signIn.supportedFirstFactors.find(
      (ff) => ff.strategy === 'email_link' && ff.safeIdentifier === params.email
    )

    const { startMagicLinkFlow } = client.signIn.createMagicLinkFlow()

    startMagicLinkFlow({
      emailAddressId: emailAddressId,
      redirectUrl: window.location.href + '/#ml_callback',
    }).then(async (result) => {
      if (result.status === 'complete') {
        await clerk.setSession(result.createdSessionId)

        authCallback?.(await onLoadUser())
      }
    })
  }

  const onAuthStateChange = (callback: AuthStateChangeCallback) => {
    authCallback = callback // we set a reference to the callback here, so the magiclink flow can call it when finished.
    return () => (authCallback = null)
  }

  const onSignup = async (
    params: AuthParams,
    options?: AuthOptions
  ): Promise<any> => {
    try {
      const clerkParams: any = {}

      if (params.email) {
        clerkParams.emailAddress = params.email
      }

      if (params.password) {
        clerkParams.password = params.password
      }

      const signUpAttempt = await client.signUp.create(clerkParams)

      const result = await signUpAttempt.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl: options?.redirectTo || window.location.href,
      })

      return result
    } catch (e) {
      console.error(e)

      throw e
    }
  }

  const onLogout = async () => {
    return await clerk.signOut()
  }

  const onLoadUser = async () => {
    return clerk.user
      ? ({
          email: clerk.user.primaryEmailAddress?.emailAddress,
          ...clerk.user,
        } as User)
      : null
  }

  const onGetToken = async () => {
    return clerk.session?.id || null
  }

  return {
    onLogin,
    onAuthStateChange,
    onSignup,
    onLogout,
    onLoadUser,
    onGetToken,
  }
}

export type ClerkAuthService = ReturnType<typeof createAuthService>
