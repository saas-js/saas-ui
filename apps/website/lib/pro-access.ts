import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function metadataValues(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(metadataValues)
  return []
}

export async function getProAccess() {
  try {
    const cookieStore = await cookies()
    const supabaseUrl =
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return { entitled: false, authorization: undefined }
    }

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
    const [{ data: userData }, { data: sessionData }] = await Promise.all([
      supabase.auth.getUser(),
      supabase.auth.getSession(),
    ])
    const metadata = userData.user?.app_metadata
    const entitlement = process.env.PRO_ENTITLEMENT ?? 'saas-ui-pro'
    const values = [
      metadata?.entitlement,
      metadata?.entitlements,
      metadata?.license,
      metadata?.licenses,
      metadata?.role,
      metadata?.roles,
    ].flatMap(metadataValues)
    const entitled = values.includes(entitlement) || values.includes('pro')
    const token =
      process.env.PRO_REGISTRY_TOKEN ?? sessionData.session?.access_token

    return {
      entitled,
      authorization: entitled && token ? `Bearer ${token}` : undefined,
    }
  } catch {
    // cookies() / Supabase under OpenNext must not 500 public block routes.
    return { entitled: false, authorization: undefined }
  }
}
