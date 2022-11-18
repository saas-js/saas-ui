import { AuthProvider, AuthProviderProps, User } from '@saas-ui/react'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import React from 'react'

const createAuthService = (session: Session | null): AuthProviderProps => {
  return {
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
    onLoadUser: async () => (session?.user as User) || null,
    onGetToken: async () => {
      // we don't have access to any token, so just returning the user email here.
      //
      return session?.user?.email
    },
  }
}

export interface NextAuthProviderProps {
  /**
   * Optionally get this with getInitialProps or getServerSideProps
   */
  session: Session
  children: React.ReactNode
}

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
  const { data } = useSession()
  return (
    <AuthProvider {...createAuthService(data)}>{props.children}</AuthProvider>
  )
}
