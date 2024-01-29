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

  return {
    onAuthStateChange(callback) {
      // we need to use a broadcast channel here to make sure that the
      // auth state is updated across all tabs
      const unsubscribe = channel.receive(async (message) => {
        console.log('message', message)
        const session = await getSession()
        callback((session?.user as User) ?? null)
      })

      return unsubscribe
    },
    onLogin: async ({ provider, email }, options) => {
      const type = provider ?? 'email'

      let params: Record<string, any> = {
        callbackUrl: options?.redirectTo,
      }

      if (email) {
        params = {
          email,
          redirect: false, // do not redirect to NextAuth login page
          ...params,
        }
      }

      const result = await signIn(type, params)

      if (result?.ok) {
        //
      }

      return undefined
    },
    onLogout: () => signOut(),
    onLoadUser: async () => {
      return getUser()
    },
    onGetToken: async () => {
      const user = await getUser()
      // we don't have access to any token, so just returning the user email here.
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
    if (typeof data === 'undefined') {
      return
    }

    return createAuthService({
      async getUser() {
        return data?.user
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
