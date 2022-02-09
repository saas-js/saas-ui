import {
  AuthParams,
  AuthOptions,
  User,
  AuthStateChangeCallback,
  AuthProviderProps,
} from '../'

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

  return {
    onLogin,
    onSignup,
    onVerifyOtp,
    onLogout,
    onAuthStateChange,
    onLoadUser,
    onGetToken,
  }
}
