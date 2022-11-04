import {
  AuthParams,
  AuthOptions,
  AuthStateChangeCallback,
  AuthProviderProps,
} from '../'

import type {
  AuthChangeEvent,
  AuthResponse,
  OAuthResponse,
  Provider,
  Session,
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

const getParams = (): RecoveryParams => {
  const hash = window.location.hash.replace('#', '')
  return hash.split('&').reduce<any>((memo, part) => {
    const [key, value] = part.split('=')
    memo[key] = value
    return memo
  }, {})
}

export const createAuthService = (
  supabase: SupabaseClient<any, 'public', any>
): AuthProviderProps => {
  const onLogin = async (params: AuthParams, options?: AuthOptions) => {
    function authenticate() {
      const { email, password, provider, phone } = params
      if (email && password) {
        return supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            captchaToken: options?.captchaToken,
            data: options?.data,
          },
        })
      } else if (email) {
        return supabase.auth.signInWithOtp({ email })
      } else if (provider) {
        return supabase.auth.signInWithOAuth({
          provider: provider as Provider,
        })
      } else if (phone && password) {
        return supabase.auth.signInWithPassword({ phone, password })
      } else if (phone) {
        return supabase.auth.signInWithOtp({ phone })
      }
      throw new Error('Could not find correct authentication method')
    }
    const resp = await authenticate()

    if (resp.error) {
      throw resp.error
    }
    if (isOauthResponse(resp)) {
      const userResp = await supabase.auth.getUser()
      if (userResp.error) {
        throw userResp.error
      }
      return userResp.data.user
    }
    return resp.data.user
  }

  const onSignup = async (params: AuthParams, options?: AuthOptions) => {
    const { email, password, phone } = params
    if (!password) {
      throw new Error('Need to provide password to signUp')
    }

    const resp = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        captchaToken: options?.captchaToken,
        emailRedirectTo: options?.redirectTo,
        data: options?.data,
      },
    })

    if (resp.error) {
      throw resp.error
    }
    return resp.data.user
  }

  const onVerifyOtp = async (params: AuthParams, options?: AuthOptions) => {
    // redirectTo & captcha are part of the options, but not for AuthParams, maybe add there?
    const { email, phone, otp, type, redirectTo, captchaToken } = params
    if (!otp) {
      throw new Error(`Need otp to verify`)
    }

    if (email) {
      const verify: VerifyEmailOtpParams = {
        email,
        token: otp,
        type: type || 'signup',
        options: {
          captchaToken: options?.captchaToken,
          redirectTo: options?.redirectTo,
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
          captchaToken: options?.captchaToken,
          redirectTo: options?.redirectTo,
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

  const onAuthStateChange = (callback: AuthStateChangeCallback) => {
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

  const onResetPassword = async ({ email }: AuthParams) => {
    if (!email) {
      throw new Error('Need to provide email')
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      throw error
    }
  }

  const onUpdatePassword = async ({ password }: AuthParams) => {
    const params = getParams()

    if (params?.type === 'recovery') {
      // I just changed to fit the Types, but the logic might be wrong
      await supabase.auth.updateUser({
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

function isOauthResponse(
  response: AuthResponse | OAuthResponse
): response is OAuthResponse {
  return Boolean((response as OAuthResponse).data?.provider)
}
