import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient(token: string) {
  return createClient(
    /* @ts-ignore */
    process.env.SUPABASE_URL!,
    /* @ts-ignore */
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  )
}
