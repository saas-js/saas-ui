import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getAuthUser() {
  try {
    const cookieStore = await cookies()
    const supabaseUrl =
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) return null

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Route handlers and OpenNext may expose a read-only store.
          }
        },
      },
    })

    const { data } = await supabase.auth.getUser()
    const user = data.user
    if (!user?.email) return null

    const metadata = user.user_metadata ?? {}
    const name =
      (typeof metadata.full_name === 'string' && metadata.full_name) ||
      (typeof metadata.name === 'string' && metadata.name) ||
      user.email

    return {
      id: user.id,
      email: user.email,
      name,
    }
  } catch {
    return null
  }
}
