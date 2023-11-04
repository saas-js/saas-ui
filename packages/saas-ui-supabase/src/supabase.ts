import type {
  AuthParams,
  AuthOptions,
  AuthStateChangeCallback,
  AuthProviderProps,
} from '@saas-ui/auth'

import type {
  AuthChangeEvent,
  AuthResponse,
  OAuthResponse,
  Provider,
  Session,
  User,
  SupabaseClient,
  VerifyEmailOtpParams,
  VerifyMobileOtpParams,
} from '@supabase/supabase-js'

interface RecoveryParams {
  access_token?: string
  refresh_token?: string
  expires_in?: string
  token_type?: string
  type?: string
}

interface OtpParams extends AuthParams {
  otp: string
}

const getParams = (): RecoveryParams => {
  const hash = window.location.hash.replace('#', '')
  return hash.split('&').reduce<any>((memo, part) => {
    const [key, value] = part.split('=')
    memo[key] = value
    return memo
  }, {})
}

interface SupabaseServiceAuthOptions {
  loginOptions?: {
    data?: object
    /** A URL to send the user to after they are confirmed. */
    redirectTo?: string
    /** A space-separated list of scopes granted to the OAuth application. */
    scopes?: string
    /** An object of query params */
    queryParams?: { [key: string]: string }

    /** Verification token received when the user completes the captcha on the site. */
    captchaToken?: string
    /** The redirect url embedded in the email link */
    emailRedirectTo?: string
    /** If set to false, this method will not create a new user. Defaults to true. */
    shouldCreateUser?: boolean
  }
  signupOptions?: {
    emailRedirectTo?: string
    /**
     * A custom data object to store the user's metadata. This maps to the `auth.users.user_metadata` column.
     *
     * The `data` should be a JSON object that includes user-specific info, such as their first and last name.
     */
    data?: object
    /** Verification token received when the user completes the captcha on the site. */
    captchaToken?: string
  }
  verifyOptions?: {
    /** A URL to send the user to after they are confirmed. */
    redirectTo?: string
    /** Verification token received when the user completes the captcha on the site. */
    captchaToken?: string
  }
  resetPasswordOptions?: {
    redirectTo?: string
    captchaToken?: string
  }
}

export const createAuthService = <Client extends SupabaseClient>(
  supabase: Client,
  serviceOptions?: SupabaseServiceAuthOptions
): AuthProviderProps<User> => {
  const onLogin = async (
    params: AuthParams,
    authOptions?: AuthOptions<{ data?: object; captchaToken?: string }>
  ) => {
    const options = {
      ...serviceOptions?.loginOptions,
      ...authOptions,
      emailRedirectTo: authOptions?.redirectTo,
    }

    function authenticate() {
      const { email, password, provider, phone } = params
      if (email && password) {
        return supabase.auth.signInWithPassword({
          email,
          password,
          options,
        })
      } else if (email) {
        return supabase.auth.signInWithOtp({ email, options })
      } else if (provider) {
        return supabase.auth.signInWithOAuth({
          provider: provider as Provider,
          options,
        })
      } else if (phone && password) {
        return supabase.auth.signInWithPassword({ phone, password, options })
      } else if (phone) {
        return supabase.auth.signInWithOtp({ phone, options })
      }
      throw new Error('Could not find correct authentication method')
    }
    const resp = await authenticate()

    if (resp.error) {
      throw resp.error
    }

    if (isOauthResponse(resp)) {
      // do nothing, supabase will redirect
      return
    }

    return resp.data.user
  }

  const onSignup = async (
    params: AuthParams,
    authOptions?: AuthOptions<{
      captchaToken?: string
      emailRedirectTo?: string
      data?: object
    }>
  ) => {
    async function signup() {
      const { email, phone, password } = params
      const options = {
        ...serviceOptions?.signupOptions,
        ...authOptions,
        emailRedirectTo: authOptions?.redirectTo,
      }
      if (email && password) {
        return await supabase.auth.signUp({
          email,
          password,
          options,
        })
      } else if (phone && password) {
        return await supabase.auth.signUp({
          phone,
          password,
          options,
        })
      } else if (email) {
        return supabase.auth.signInWithOtp({ email, options })
      } else if (phone) {
        return supabase.auth.signInWithOtp({ phone, options })
      }
    }

    const resp = await signup()

    if (resp?.error) {
      throw resp.error
    }

    return resp?.data.user
  }

  const onVerifyOtp = async (
    params: OtpParams,
    options?: AuthOptions<{ captchaToken?: string }>
  ) => {
    const { email, phone, otp, type } = params

    if (email) {
      const verify: VerifyEmailOtpParams = {
        email,
        token: otp,
        type: type || 'signup',
        options: {
          ...serviceOptions?.verifyOptions,
          ...options,
        },
      }
      const resp = await supabase.auth.verifyOtp(verify)
      if (resp.error) {
        throw resp.error
      }
      return Boolean(resp.data.session)
    }

    if (phone) {
      const verify: VerifyMobileOtpParams = {
        phone,
        token: otp,
        type: type || 'sms',
        options: {
          ...serviceOptions?.verifyOptions,
          ...options,
        },
      }
      const resp = await supabase.auth.verifyOtp(verify)
      if (resp.error) {
        throw resp.error
      }
      return Boolean(resp.data.session)
    }

    throw new Error('You need to provide either email or phone')
  }

  const onLogout = async () => {
    return await supabase.auth.signOut()
  }

  const onAuthStateChange = (callback: AuthStateChangeCallback<User>) => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        callback(session?.user)
      }
    )

    return () => data?.subscription.unsubscribe()
  }

  const onLoadUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      throw error
    }
    return data.user
  }

  const onGetToken = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw error
    }
    return data.session?.access_token || null
  }

  const onResetPassword = async (
    { email }: Required<Pick<AuthParams, 'email'>>,
    options?: AuthOptions
  ) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      ...serviceOptions?.resetPasswordOptions,
      ...options,
    })
    if (error) {
      throw error
    }
  }

  const onUpdatePassword = async ({
    password,
  }: Required<Pick<AuthParams, 'password'>>) => {
    const params = getParams()

    if (params?.type === 'recovery') {
      const { error } = await supabase.auth.updateUser({
        password,
      })
      if (error) {
        throw error
      }
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

function isOauthResponse(
  response: AuthResponse | OAuthResponse
): response is OAuthResponse {
  return Boolean((response as OAuthResponse).data?.provider)
}
