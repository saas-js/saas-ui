export type AccessTokenVerifier = (token: string) => Promise<boolean>

export interface SupabaseAccessTokenVerifierOptions {
  supabaseUrl?: string
  supabaseAnonKey?: string
  fetch?: typeof globalThis.fetch
}

export function parseBearerToken(authorization?: string | null) {
  return authorization?.match(/^Bearer\s+(\S+)$/i)?.[1] ?? null
}

export async function isRegistryRequestAuthorized(
  authorization: string | null | undefined,
  verifyAccessToken: AccessTokenVerifier,
) {
  const token = parseBearerToken(authorization)

  if (!token) {
    return false
  }

  try {
    return await verifyAccessToken(token)
  } catch {
    return false
  }
}

export function createSupabaseAccessTokenVerifier(
  options: SupabaseAccessTokenVerifierOptions,
): AccessTokenVerifier {
  const supabaseUrl = options.supabaseUrl?.trim().replace(/\/+$/, '')
  const supabaseAnonKey = options.supabaseAnonKey?.trim()
  const fetchImplementation = options.fetch ?? globalThis.fetch

  return async (token) => {
    if (!supabaseUrl || !supabaseAnonKey || !fetchImplementation) {
      return false
    }

    try {
      const response = await fetchImplementation(
        `${supabaseUrl}/auth/v1/user`,
        {
          method: 'GET',
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
          redirect: 'error',
        },
      )

      return response.ok
    } catch {
      return false
    }
  }
}
