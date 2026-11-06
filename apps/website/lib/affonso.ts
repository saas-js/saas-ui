export const AFFONSO_PROGRAM_ID = 'cmgdfoad90006ib7qt4poawok'
export const AFFONSO_PORTAL_URL = 'https://saas-ui.affonso.io'
// `/r` is the public registry (`REGISTRY_BASE_PATH`), so Affonso uses `/a`.
export const AFFONSO_PROXY_PREFIX = '/a'
export const AFFONSO_PIXEL_SRC = `${AFFONSO_PROXY_PREFIX}/pixel.js`
export const AFFONSO_API_BASE = AFFONSO_PROXY_PREFIX
export const AFFONSO_COOKIE_DURATION_DAYS = '180'
export const AFFONSO_REFERRAL_COOKIE = 'affonso_referral'

export function applyAffonsoCheckoutMetadata(
  search: URLSearchParams,
  cookieValue?: string | null,
) {
  if (search.has('metadata') || !cookieValue) return search
  search.set('metadata', JSON.stringify({ affonso_referral: cookieValue }))
  return search
}

export function affonsoEmbedSrc(publicToken: string) {
  const url = new URL(
    `${AFFONSO_PROXY_PREFIX}/embed/referrals`,
    'http://saas-ui.local',
  )
  url.searchParams.set('token', publicToken)
  url.searchParams.set('theme', 'light')
  url.searchParams.set('lang', 'en')
  return `${url.pathname}${url.search}`
}

export async function createAffonsoEmbedToken(partner: {
  email: string
  name?: string
  externalUserId?: string
}) {
  const apiKey = process.env.AFFONSO_API_KEY
  if (!apiKey) return null

  const response = await fetch('https://api.affonso.io/v1/embed/token', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      programId: AFFONSO_PROGRAM_ID,
      partner: {
        email: partner.email,
        name: partner.name,
      },
      externalUserId: partner.externalUserId,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Affonso embed token request failed', response.status)
    return null
  }

  const payload = (await response.json()) as {
    data?: { publicToken?: string; expiresAt?: string }
  }
  const publicToken = payload.data?.publicToken
  if (!publicToken) return null

  return {
    publicToken,
    expiresAt: payload.data?.expiresAt,
  }
}
