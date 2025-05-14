import { createAuthService } from '@saas-ui/supabase'
import { supabase } from './supabase'

export const authService = createAuthService(supabase, {
  loginOptions: {
    redirectTo: '/blocks',
  },
})
