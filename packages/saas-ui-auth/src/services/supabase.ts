import {
  AuthParams,
  AuthOptions,
  User,
  AuthStateChangeCallback,
  AuthProviderProps,
} from '../'

interface RecoveryParams {
  access_token?: string
  refresh_token?: string
  expires_in?: string
  token_type?: string
  type?: string
}

const getParams = (): RecoveryParams => {
  const hash = window.location.hash.replace('#', '')
  return hash.split('&').reduce<any>((memo, part) => {
    const [key, value] = part.split('=')
    memo[key] = value
    return memo
  }, {})
}

export const createAuthService = (supabase: any): AuthProviderProps => {
  const onLogin = async (params: AuthParams, options?: AuthOptions) => {
    const { user, error } = await supabase.auth.signIn(
      params as unknown,
      options
    )

    if (user) {
      return user as User
    } else if (error) {
      throw error
    }
  }

  const onSignup = async (params: AuthParams, options?: AuthOptions) => {
    const { email, password, ...data } = params
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data,
        ...options,
      }
    )

    if (user) {
      return user as User
    } else if (error) {
      throw error
    }
  }

  const onVerifyOtp = async (params: AuthParams) => {
    const { session, error } = await supabase.auth.verifyOTP(params)

    if (session) {
      return !!session
    } else if (error) {
      throw error
    }
  }

  const onLogout = async () => {
    return await supabase.auth.signOut()
  }

  const onAuthStateChange = (callback: AuthStateChangeCallback) => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        callback(session?.user as User)
      }
    )

    return () => data?.unsubscribe()
  }

  const onLoadUser = async () => {
    return await supabase.auth.user()
  }

  const onGetToken = async () => {
    const session = supabase.auth.session()
    return session?.access_token || null
  }

  const onResetPassword = async ({ email }: AuthParams) => {
    return await supabase.auth.api.resetPasswordForEmail(email)
  }

  const onUpdatePassword = async ({ password }: AuthParams) => {
    const params = getParams()

    if (params?.type === 'recovery') {
      return await supabase.auth.api.updateUser(params.access_token, {
        password,
      })
    }
  }

  return {
    onLogin,
    onSignup,
    onVerifyOtp,
    onLogout,
    onAuthStateChange,
    onLoadUser,
    onGetToken,
    onResetPassword,
    onUpdatePassword,
  }
}
