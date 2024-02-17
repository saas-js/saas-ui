'use client'

import { AuthProvider, AuthProviderProps, User } from '@saas-ui/auth'
import {
  SessionProvider,
  signIn,
  signOut,
  useSession,
  getSession,
} from 'next-auth/react'
import { Session } from 'next-auth'
import React from 'react'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { BroadcastChannel } from 'next-auth/client/_utils'

const createAuthService = ({
  getUser,
}: {
  getUser: () => User | null
}): AuthProviderProps => {
  const channel = BroadcastChannel()

  let user: User | null = getUser()

  return {
    onAuthStateChange(callback) {
      // we need to use a broadcast channel here to make sure that the
      // auth state is updated across all tabs
      return channel.receive(async (message) => {
        if (
          message.event === 'session' &&
          message.data?.trigger === 'getSession'
        ) {
          const session = await getSession()
          callback((session?.user as User) ?? null)
        }
      })
    },
    onLogin: async ({ provider, email, password }, options) => {
      let type = 'email'
      let params: Record<string, any> = {
        callbackUrl: options?.redirectTo,
      }

      if (provider) {
        type = provider
      } else if (email && password) {
        type = 'credentials'
        params = {
          email,
          password,
          redirect: false,
          ...params,
        }
      } else if (email) {
        params = {
          email,
          redirect: false, // do not redirect to NextAuth login page
          ...params,
        }
      } else {
        throw new Error('Unknown login method')
      }

      const result = await signIn(type, params)

      if (result && !result?.ok) {
        throw new Error(result?.error ?? 'Unknown error')
      }

      if (type === 'credentials') {
        // result doesn't return the user data, so fetch the session here.
        // this will fetch the session twice though.
        const session = await getSession()
        user = session?.user as User
        return user
      }

      return undefined
    },
    onLogout: async () => {
      await signOut({
        redirect: false,
      })
      user = null
    },
    onLoadUser: async () => {
      user = getUser()
      return user
    },
    onGetToken: async () => {
      // we don't have access to the token here, so returning the user email instead.
      if (!user) {
        user = getUser()
      }
      return user?.email
    },
  }
}

export interface NextAuthProviderProps {
  /**
   * Optionally get this with getInitialProps or getServerSideProps
   */
  session: Session | null
  children: React.ReactNode
}

/**
 * Next Auth Provider for Saas UI
 * Supports oauth providers and magic link login.
 */
export const NextAuthProvider: React.FC<NextAuthProviderProps> = (props) => {
  const { children, session } = props
  return (
    <SessionProvider session={session}>
      <Provider>{children}</Provider>
    </SessionProvider>
  )
}

/**
 * Wrap the AuthProvider here so we can get access to the NextAuth context
 */
const Provider: React.FC<React.PropsWithChildren> = (props) => {
  const { data, status } = useSession()

  const authService = React.useMemo(() => {
    // when data is undefined the session is still loading
    if (typeof data === 'undefined') {
      return
    }

    return createAuthService({
      getUser() {
        return data?.user ?? null
      },
    })
  }, [data, status])

  // if we don't have access to the session yet, show a loading spinner
  if (!authService) {
    return (
      <LoadingOverlay variant="fullscreen">
        <LoadingSpinner />
      </LoadingOverlay>
    )
  }

  return <AuthProvider {...authService}>{props.children}</AuthProvider>
}
