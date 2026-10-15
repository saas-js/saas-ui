import type { AuthProviderProps } from '@saas-ui/auth'

/**
 * This archive does not run licensing, payments, or Supabase auth.
 * Keep a no-op provider so existing `useAuth()` call sites still render.
 */
export const authService: AuthProviderProps = {
  onLogin: async () => {
    throw new Error('Authentication is not available on this v2 docs archive.')
  },
  onSignup: async () => {
    throw new Error('Authentication is not available on this v2 docs archive.')
  },
  onVerifyOtp: async () => false,
  onLogout: async () => {},
  onAuthStateChange: () => () => {},
  onLoadUser: async () => null,
  onResetPassword: async () => {},
  onUpdatePassword: async () => {},
}
