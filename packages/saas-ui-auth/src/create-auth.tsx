import React, { useCallback, useContext } from 'react'

export interface AuthService<
  User = unknown,
  RestoreAuthStateResult = unknown,
  LogInOptions = unknown,
  LogInResult = unknown,
  LogOutOptions = unknown,
  LogOutResult = unknown,
  SignUpOptions = unknown,
  SignUpResult = unknown,
  ForgotPasswordOptions = unknown,
  ForgotPasswordResult = unknown,
  ResetPasswordOptions = unknown,
  ResetPasswordResult = unknown,
  ValidateToken = unknown,
  Client = unknown,
> {
  type: string
  client?: Client

  restoreAuthState?: () => Promise<RestoreAuthStateResult>
  getUser: () => Promise<User>

  logIn: (options?: LogInOptions) => Promise<LogInResult>
  logOut: (options?: LogOutOptions) => Promise<LogOutResult>
  signUp: (options?: SignUpOptions) => Promise<SignUpResult>
  getToken: () => Promise<string | null>
  forgotPassword?: (
    options?: ForgotPasswordOptions
  ) => Promise<ForgotPasswordResult>
  resetPassword?: (
    options?: ResetPasswordOptions
  ) => Promise<ResetPasswordResult>
  validateToken?: (options?: ValidateToken) => Promise<boolean>
}

export interface AuthContextValue<
  User,
  LogInOptions,
  LogInResult,
  LogOutOptions,
  LogOutResult,
  SignUpOptions,
  SignUpResult,
  ForgotPasswordOptions,
  ForgotPasswordResult,
  ResetPasswordOptions,
  ResetPasswordResult,
  ValidateToken,
  Client,
> {
  user: User | null
  logIn: (options?: LogInOptions) => Promise<LogInResult>
  logOut: (options?: LogOutOptions) => Promise<LogOutResult>
  signUp: (options?: SignUpOptions) => Promise<SignUpResult>
  forgotPassword: (
    options?: ForgotPasswordOptions
  ) => Promise<ForgotPasswordResult>
  resetPassword: (
    options?: ResetPasswordOptions
  ) => Promise<ResetPasswordResult>
  validateToken: (options?: ValidateToken) => Promise<boolean>
  getToken: () => Promise<string | null>
  client?: Client
  type: string
  isAuthenticated: boolean
  isLoggingIn: boolean
  isLoading: boolean
}

function createAuthContext<
  User,
  LogInOptions,
  LogInResult,
  LogOutOptions,
  LogOutResult,
  SignUpOptions,
  SignUpResult,
  ForgotPasswordOptions,
  ForgotPasswordResult,
  ResetPasswordOptions,
  ResetPasswordResult,
  ValidateToken,
  Client,
>() {
  return React.createContext<
    | AuthContextValue<
        User,
        LogInOptions,
        LogInResult,
        LogOutOptions,
        LogOutResult,
        SignUpOptions,
        SignUpResult,
        ForgotPasswordOptions,
        ForgotPasswordResult,
        ResetPasswordOptions,
        ResetPasswordResult,
        ValidateToken,
        Client
      >
    | undefined
  >(undefined)
}

export interface AuthProviderProps {
  children: React.ReactNode
}

const createAuthProvider = <
  User,
  RestoreAuthStateResult,
  LogInOptions,
  LogInResult,
  LogOutOptions,
  LogOutResult,
  SignUpOptions,
  SignUpResult,
  ForgotPasswordOptions,
  ForgotPasswordResult,
  ResetPasswordOptions,
  ResetPasswordResult,
  ValidateToken,
  Client,
>(
  AuthContext: React.Context<
    | AuthContextValue<
        User,
        LogInOptions,
        LogInResult,
        LogOutOptions,
        LogOutResult,
        SignUpOptions,
        SignUpResult,
        ForgotPasswordOptions,
        ForgotPasswordResult,
        ResetPasswordOptions,
        ResetPasswordResult,
        ValidateToken,
        Client
      >
    | undefined
  >,
  authService: AuthService<
    User,
    RestoreAuthStateResult,
    LogInOptions,
    LogInResult,
    LogOutOptions,
    LogOutResult,
    SignUpOptions,
    SignUpResult,
    ForgotPasswordOptions,
    ForgotPasswordResult,
    ResetPasswordOptions,
    ResetPasswordResult,
    ValidateToken,
    Client
  >
) => {
  const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props

    const [authState, setAuthState] = React.useState({
      isAuthenticated: false,
      isLoggingIn: false,
      isLoading: true,
      user: undefined,
    })

    const checkAuth = useCallback(async () => {
      try {
        if (authService.getToken) {
          const isAuthenticated = !!(await authService.getToken())

          setAuthState((prevState) => ({
            ...prevState,
            isAuthenticated,
          }))

          return isAuthenticated
        }
      } catch (e) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthenticated: false,
        }))
      }
    }, [authService])

    const logIn = useCallback(
      async (options?: LogInOptions) => {
        const result = await authService.logIn(options)
        await checkAuth()
        return result
      },
      [authService]
    )

    return (
      <AuthContext.Provider
        value={{
          logIn,
          ...authState,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  return AuthProvider
}

export const createAuthIntegration = <
  User,
  RestoreAuthStateResult,
  LogInOptions,
  LogInResult,
  LogOutOptions,
  LogOutResult,
  SignUpOptions,
  SignUpResult,
  ForgotPasswordOptions,
  ForgotPasswordResult,
  ResetPasswordOptions,
  ResetPasswordResult,
  ValidateToken,
  Client,
>(
  authService: AuthService<
    User,
    RestoreAuthStateResult,
    LogInOptions,
    LogInResult,
    LogOutOptions,
    LogOutResult,
    SignUpOptions,
    SignUpResult,
    ForgotPasswordOptions,
    ForgotPasswordResult,
    ResetPasswordOptions,
    ResetPasswordResult,
    ValidateToken,
    Client
  >
) => {
  const AuthContext = createAuthContext<
    User,
    LogInOptions,
    LogInResult,
    LogOutOptions,
    LogOutResult,
    SignUpOptions,
    SignUpResult,
    ForgotPasswordOptions,
    ForgotPasswordResult,
    ResetPasswordOptions,
    ResetPasswordResult,
    ValidateToken,
    Client
  >()

  const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === null) {
      throw new Error(
        'Auth context missing, did you forget to wrap your app in AuthProvider?'
      )
    }

    return context
  }

  const AuthProvider = createAuthProvider(AuthContext, authService)

  return {
    AuthContext,
    AuthProvider,
    useAuth,
  }
}
