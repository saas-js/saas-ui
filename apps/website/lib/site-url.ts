function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

/**
 * Canonical site URL for server-rendered absolute links.
 *
 * Prefer `NEXT_PUBLIC_URL` / `SITE_URL`. `VERCEL_URL` remains a fallback so
 * the existing Vercel deployment keeps working until cutover.
 */
export function getSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_URL ??
    process.env.SITE_URL ??
    process.env.HOST ??
    process.env.VERCEL_URL

  if (fromEnv) return withProtocol(fromEnv)
  return 'http://localhost:3020'
}

/** Checkout links should target the host the visitor is on. */
export function getCheckoutBaseUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return getSiteUrl()
}
