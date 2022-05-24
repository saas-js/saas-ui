import * as React from 'react'

import { renderHook, invoke } from '@saas-ui/test-utils'

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
  let user: User
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
    onGetToken: async () => {
      return token
    },
    onLoadUser: async () => {
      return user
    },
  }
}

test('should set isAuthenticated to false', async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await invoke(async () => {
    return result.current.logIn({}).catch(() => null)
  })

  expect(result.current.isAuthenticated).toBe(false)
})

test('should set isAuthenticated to true', async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await invoke(async () => {
    return result.current.logIn({
      email: 'hello@saas-ui.dev',
      password: 'test123',
    })
  })

  expect(result.current.isAuthenticated).toBe(true)
})

test('should set isAuthenticated to false after log out', async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => (
      <AuthProvider {...createAuthService()}>{children}</AuthProvider>
    ),
  })

  await invoke(async () => {
    result.current.logIn({
      email: 'hello@saas-ui.dev',
      password: 'test123',
    })
  })

  expect(result.current.isAuthenticated).toBe(true)

  await invoke(async () => {
    result.current.logOut()
  })

  expect(result.current.isAuthenticated).toBe(false)
})
