import * as React from 'react'

const { createContext, useState, useContext, useEffect, useCallback } = React

import { usePromise } from '@saas-ui/hooks'

export interface AuthParams {
  email?: string
  password?: string
  provider?: string
  refreshToken?: string
  otp?: string
  [key: string]: any
}

export interface AuthOptions {
  /**
   * The url to redirect to after social or magic link login.
   */
  redirectTo?: string
}

/**
 * The user object, id and email are required values
 */
export interface User {
  id: string
  email: string
  [key: string]: any
}

type UnsubscribeHandler = () => void

export type AuthStateChangeCallback = (user?: User | null) => void

export interface AuthProviderProps {
  /**
   * Loads user data after authentication
   */
  onLoadUser?: () => Promise<User | null>
  /**
   * The signup method
   */
  onSignup?: (
    params: AuthParams,
    options?: AuthOptions
  ) => Promise<User | undefined | null>
  /**
   * The login method
   */
  onLogin?: (
    params: AuthParams,
    options?: AuthOptions
  ) => Promise<User | undefined | null>
  /**
   * Verify an one time password (2fa)
   */
  onVerify?: (
    params: AuthParams,
    options?: AuthOptions
  ) => Promise<boolean | undefined | null>
  /**
   * The logout method
   */
  onLogout?: (options?: AuthOptions) => Promise<unknown>
  /**
   * Should trigger whenever the authentication state changes
   */
  onAuthStateChange?: (callback: AuthStateChangeCallback) => UnsubscribeHandler
  /**
   * Check if the user is still authenticated
   * Called on page load and window focus
   */
  onCheckAuth?: () => Promise<boolean>
}

export type AuthFunction = (
  params: AuthParams,
  options?: AuthOptions
) => Promise<any>

export interface AuthContextValue {
  isAuthenticated: boolean
  isLoggingIn: boolean
  isLoading: boolean
  user?: User | null
  signup: AuthFunction
  login: AuthFunction
  verify: AuthFunction
  logout: (options?: AuthOptions) => Promise<unknown>
  loadUser: () => void
  checkAuth: () => void
}

const AuthContext = createContext<any>(null)

export const AuthProvider: React.FC<AuthProviderProps> = ({
  onLoadUser = () => Promise.resolve(),
  onSignup = () => Promise.resolve(),
  onLogin = () => Promise.resolve(),
  onVerify = () => Promise.resolve(),
  onLogout = () => Promise.resolve(),
  onAuthStateChange,
  onCheckAuth,
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (onAuthStateChange) {
      const unsubscribe = onAuthStateChange((user) => {
        setAuthenticated(!!user)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [isAuthenticated])

  const checkAuth = useCallback(async () => {
    if (onCheckAuth) {
      setAuthenticated(await onCheckAuth())
    }
  }, [onCheckAuth])

  useEffect(() => {
    window.addEventListener('focus', checkAuth)

    checkAuth()

    return () => {
      window.removeEventListener('focus', checkAuth)
    }
  }, [checkAuth])

  const loadUser = useCallback(async () => {
    if (isAuthenticated) {
      const user = await onLoadUser()

      if (user) {
        setUser(user)
      } else {
        setAuthenticated(false)
      }
    }

    setLoading(false)
  }, [onLoadUser, isAuthenticated])

  const signup = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onSignup(params, options)
      return result
    },
    [onSignup]
  )

  const verify = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onVerify(params, options)
      return result
    },
    [onSignup]
  )

  const login = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onLogin(params, options)
      if (result) {
        setUser(result)
      }
      return result
    },
    [onLogin]
  )

  const logout = useCallback(() => {
    setUser(null)
    return onLogout()
  }, [onLogout])

  const value: AuthContextValue = {
    isAuthenticated,
    isLoggingIn: isAuthenticated && !user,
    isLoading,
    user,
    signup,
    login,
    logout,
    verify,
    loadUser,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => useContext(AuthContext)

export const useCurrentUser = (): User | null | undefined => {
  return useAuth().user
}

export const useLogin = ({ action = 'login' }) => {
  const auth = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => auth[action]?.(args))
}

export const useSignup = () => {
  const { signup } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => signup(args))
}

export const useOtp = () => {
  const { verify } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => verify(args))
}
