import { LoadedClerk, SignInCreateParams, OAuthProvider } from '@clerk/types'

import {} from '@clerk/clerk-react'

import {
  AuthParams,
  AuthOptions,
  User,
  AuthProviderProps,
  AuthStateChangeCallback,
} from '@saas-ui/auth'

/**
 * Clerk auth service
 *
 *
 * @param client Clerk
 * @returns {AuthProviderProps}
 */
export const createAuthService = (clerk: LoadedClerk): AuthProviderProps => {
  if (!clerk?.client) {
    throw new Error('Clerk client not available.')
  }

  const client = clerk.client

  let authCallback: AuthStateChangeCallback | null

  const onLogin = async (
    params: AuthParams,
    options?: AuthOptions
  ): Promise<User | null | undefined> => {
    if (params.provider) {
      await client.signIn.authenticateWithRedirect({
        strategy: `oauth_${params.provider}` as `oauth_${OAuthProvider}`,
        redirectUrl: '/#sso_callback',
        redirectUrlComplete: options?.redirectTo || '/',
      })
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

    if (signIn.status === 'complete' && signIn.createdSessionId) {
      await clerk.setActive({
        session: signIn.createdSessionId,
      })

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
        await clerk.setActive({
          session: result.createdSessionId,
        })

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
