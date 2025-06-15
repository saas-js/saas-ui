import * as React from 'react'

import { hooks } from '@saas-ui/test-utils'

import {
  AuthProvider,
  AuthProviderProps,
  useAuth,
  AuthParams,
  User,
  AuthToken,
} from '../src'

const createAuthService = (): AuthProviderProps => {
  let token: AuthToken = null
  let user: User | null = null
  return {
    onLogin: async (params: AuthParams) => {
      const { email, password, provider } = params
      // email and provider login may return an empty object on success
      let response = {}
      if (email && password) {
        response = { id: 1, email }
      } else if (email) {
        return null
      } else if (provider) {
        return null
      } else if (!email && !password && !provider) {
        throw new Error('Login failed')
      }

      token = 'authtoken'

      user = {
        id: 1,
        email,
      } as unknown as User

      return user
    },
    onSignup: async (params: AuthParams) => {
      const { email, password } = params

      if (email && password) {
        return { id: 1, email } as unknown as User
      } else if (email) {
        return null
      }

      throw new Error('Sign up failed')
    },
<<<<<<< HEAD
=======
    onResetPassword: async (params) => {
      const { email } = params
      return { email }
    },
    onUpdatePassword: async (params) => {
      const { password, token } = params
      return { password, token }
    },
>>>>>>> main
    onGetToken: async () => {
      return token
    },
    onLoadUser: async () => {
      return user
    },
    onLogout: async () => {
      token = null
      user = null
    },
  }
}

test('should set isAuthenticated to false', async () => {
  const { result } = hooks.render(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await hooks.act(async () => {
    return result.current.logIn({}).catch(() => null)
  })

  expect(result.current.isAuthenticated).toBe(false)
})

test('should set isAuthenticated to true', async () => {
  const { result } = hooks.render(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await hooks.act(async () => {
    return result.current.logIn({
      email: 'hello@saas-ui.dev',
      password: 'test123',
    })
  })

  expect(result.current.isAuthenticated).toBe(true)
})

test('should set isAuthenticated to false after log out', async () => {
  const { result } = hooks.render(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await hooks.act(async () => {
    result.current.logIn({
      email: 'hello@saas-ui.dev',
      password: 'test123',
    })
  })

  expect(result.current.isAuthenticated).toBe(true)

  await hooks.act(async () => {
    result.current.logOut()
  })

  expect(result.current.isAuthenticated).toBe(false)
})
