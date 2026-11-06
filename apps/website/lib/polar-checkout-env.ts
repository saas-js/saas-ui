export const POLAR_ACCESS_TOKEN_KEY = 'POLAR_ACCESS_TOKEN'
export const POLAR_SUCCESS_URL_KEY = 'POLAR_SUCCESS_URL'

export type PolarCheckoutEnv = {
  accessToken?: string
  successUrl?: string
}

function readEnvString(source: object | undefined, key: string) {
  if (!source) return undefined
  const value = (source as Record<string, unknown>)[key]
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * Polar requires an absolute URL. Production checkouts must use https;
 * http is only accepted for local development hosts.
 */
export function isPolarSuccessUrl(value: string) {
  try {
    const url = new URL(value)
    if (url.protocol === 'https:') return true
    return (
      url.protocol === 'http:' &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
    )
  } catch {
    return false
  }
}

/**
 * Prefer Cloudflare Worker bindings (request-time) over `process.env`.
 * Next.js may inline `process.env.POLAR_*` as undefined when the secret is
 * only a Worker runtime binding, not a build-time variable.
 */
export function resolvePolarCheckoutEnv(sources: {
  cloudflareEnv?: object
  processEnv?: object
}): PolarCheckoutEnv {
  const accessToken =
    readEnvString(sources.cloudflareEnv, POLAR_ACCESS_TOKEN_KEY) ??
    readEnvString(sources.processEnv, POLAR_ACCESS_TOKEN_KEY)
  const successUrl =
    readEnvString(sources.cloudflareEnv, POLAR_SUCCESS_URL_KEY) ??
    readEnvString(sources.processEnv, POLAR_SUCCESS_URL_KEY)

  return { accessToken, successUrl }
}

async function loadCloudflareEnv(): Promise<object | undefined> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    if (!env || typeof env !== 'object') return undefined
    return env
  } catch {
    return undefined
  }
}

export async function loadPolarCheckoutEnv(): Promise<PolarCheckoutEnv> {
  return resolvePolarCheckoutEnv({
    cloudflareEnv: await loadCloudflareEnv(),
    processEnv: process.env,
  })
}
