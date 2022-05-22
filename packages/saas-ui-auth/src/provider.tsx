import * as React from 'react'

const { createContext, useState, useContext, useEffect, useCallback } = React

import { usePromise } from '@saas-ui/hooks'

export type AuthTypeEnum = 'magiclink' | 'password'

export type AuthActionEnum = 'logIn' | 'signUp'

export type AuthToken = string | null | undefined

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
   * Request to reset a password.
   */
  onResetPassword?: (
    params: Pick<AuthParams, 'email'>,
    options?: AuthOptions
  ) => Promise<void>
  /**
   * Update the password.
   */
  onUpdatePassword?: (
    params: Pick<AuthParams, 'password'>,
    options?: AuthOptions
  ) => Promise<void>
  /**
   * Verify an one time password (2fa)
   */
  onVerifyOtp?: (
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
   * Return the session token
   */
  onGetToken?: () => Promise<AuthToken>

  children?: React.ReactNode
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
  signUp: AuthFunction
  logIn: AuthFunction
  verifyOtp: AuthFunction
  resetPassword: AuthFunction
  updatePassword: AuthFunction
  logOut: (options?: AuthOptions) => Promise<unknown>
  loadUser: () => void
  getToken: () => Promise<AuthToken>
}

const AuthContext = createContext<any>(null)

export const AuthProvider: React.FC<AuthProviderProps> = ({
  onLoadUser = () => Promise.resolve(),
  onSignup = () => Promise.resolve(),
  onLogin = () => Promise.resolve(),
  onVerifyOtp = () => Promise.resolve(),
  onLogout = () => Promise.resolve(),
  onAuthStateChange,
  onGetToken,
  onResetPassword,
  onUpdatePassword,
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
        unsubscribe?.()
      }
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [isAuthenticated])

  const checkAuth = useCallback(async () => {
    try {
      if (onGetToken) {
        setAuthenticated(!!(await onGetToken()))
      }
    } catch (e) {
      setAuthenticated(false)
    }
  }, [onGetToken])

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

  const signUp = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onSignup(params, options)
      checkAuth() // In case the auth service authenticates the user directly.
      return result
    },
    [onSignup]
  )

  const logIn = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onLogin(params, options)
      checkAuth() // In case the auth service authenticates the user directly.
      return result
    },
    [onLogin]
  )

  const logOut = useCallback(async () => {
    await onLogout()
    setUser(null)
    setAuthenticated(false)
  }, [onLogout])

  const verifyOtp = useCallback(
    async (params: AuthParams, options?: AuthOptions) => {
      const result = await onVerifyOtp(params, options)
      return result
    },
    [onVerifyOtp]
  )

  const resetPassword = useCallback(
    async (params: Pick<AuthParams, 'email'>, options?: AuthOptions) => {
      await onResetPassword?.(params, options)
    },
    [onResetPassword]
  )

  const updatePassword = useCallback(
    async (params: Pick<AuthParams, 'password'>, options?: AuthOptions) => {
      await onUpdatePassword?.(params, options)
    },
    [onUpdatePassword]
  )

  const getToken = useCallback(async () => {
    return onGetToken?.()
  }, [onGetToken])

  const value: AuthContextValue = {
    isAuthenticated,
    isLoggingIn: isAuthenticated && !user,
    isLoading,
    user,
    signUp,
    logIn,
    logOut,
    verifyOtp,
    loadUser,
    getToken,
    resetPassword,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => useContext(AuthContext)

export const useCurrentUser = (): User | null | undefined => {
  return useAuth().user
}

export interface UseLoginProps {
  action?: AuthActionEnum
}

export const useLogin = ({ action = 'logIn' }: UseLoginProps = {}) => {
  const auth = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => auth[action]?.(args))
}

export const useSignUp = () => {
  const { signUp } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => signUp(args))
}

export const useOtp = () => {
  const { verifyOtp } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => verifyOtp(args))
}

export const useResetPassword = () => {
  const { resetPassword } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => resetPassword(args))
}

export const useUpdatePassword = () => {
  const { updatePassword } = useAuth()

  return usePromise<AuthFunction>((args: AuthParams) => updatePassword(args))
}
