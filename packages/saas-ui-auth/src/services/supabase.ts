import { AuthParams, AuthOptions, User, AuthStateChangeCallback } from '../'

export const createAuthService = (supabase: any) => {
  const onLogin = async (
    params: AuthParams,
    options?: AuthOptions,
  ): Promise<User | undefined> => {
    const { user, error } = await supabase.auth.signIn(
      params as unknown,
      options,
    )

    if (user) {
      return user as User
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
      },
    )

    return () => data?.unsubscribe()
  }

  const onLoadUser = () => {
    return supabase.auth.user()
  }

  const onCheckAuth = () => {
    return !!supabase.auth.session()
  }

  return {
    onLogin,
    onLogout,
    onAuthStateChange,
    onLoadUser,
    onCheckAuth,
  }
}
