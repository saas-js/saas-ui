import { createAuth } from '@saas-ui/auth'
import { supabase } from './supabase'

// export const authService = createAuthService(supabase, {
//   loginOptions: {
//     redirectTo: '/blocks',
//   },
// })

export const { AuthProvider, useAuth } = createAuth(supabase)
