/**
 * First-party Affonso proxy under `/a`.
 *
 * Affonso's default prefix is `/r`, but that path is already the public
 * component registry (`REGISTRY_BASE_PATH=/r`, also rewritten to `/ui/r` on
 * saas-ui.dev). `/a` (Affonso) keeps the documented suffixes:
 * `/pixel.js`, `/psl.min.js`, `/track`, `/signups`, `/embed/:path*`.
 *
 * @see https://affonso.io/help/installation-guides/proxy-setup/pixel-tracking-proxy
 * @see https://affonso.io/help/installation-guides/proxy-setup/embedded-dashboard-proxy
 */
import { AFFONSO_PROXY_PREFIX } from './affonso'

const PIXEL_UPSTREAM: Record<string, string> = {
  '/pixel.js': 'https://cdn.affonso.io/js/pixel.min.js',
  '/psl.min.js': 'https://cdn.affonso.io/js/psl.min.js',
  '/track': 'https://api.affonso.io/v1/track',
  '/signups': 'https://api.affonso.io/v1/signups',
}

const HOP_BY_HOP = new Set([
  'authorization',
  'connection',
  'content-length',
  'cookie',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

export function isAffonsoProxyPath(pathname: string) {
  return (
    pathname === AFFONSO_PROXY_PREFIX ||
    pathname.startsWith(`${AFFONSO_PROXY_PREFIX}/`)
  )
}

export function resolveAffonsoUpstream(
  pathname: string,
  search = '',
): URL | null {
  if (!isAffonsoProxyPath(pathname)) return null

  const rest = pathname.slice(AFFONSO_PROXY_PREFIX.length) || '/'
  const query = search.startsWith('?') ? search.slice(1) : search

  const direct = PIXEL_UPSTREAM[rest]
  if (direct) {
    const url = new URL(direct)
    url.search = query
    return url
  }

  if (rest.startsWith('/embed/')) {
    const url = new URL(`https://affonso.io${rest}`)
    url.search = query
    return url
  }

  return null
}

export function visitorIp(headers: Headers) {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('true-client-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    null
  )
}

export function affonsoProxyHeaders(request: Request, upstream: URL) {
  const outgoing = new Headers()
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      outgoing.set(key, value)
    }
  })

  outgoing.set('host', upstream.host)

  const requestUrl = new URL(request.url)
  outgoing.set('x-forwarded-host', requestUrl.host)
  outgoing.set('x-forwarded-proto', requestUrl.protocol.replace(':', ''))

  const ip = visitorIp(request.headers)
  if (ip) {
    outgoing.set('cf-connecting-ip', ip)
    outgoing.set('true-client-ip', ip)
    outgoing.set('x-real-ip', ip)
    outgoing.set(
      'x-forwarded-for',
      request.headers.get('x-forwarded-for') || ip,
    )
  }

  return outgoing
}

export function rewriteAffonsoLocation(location: string) {
  try {
    const url = new URL(location, 'https://affonso.io')
    if (url.pathname.startsWith('/embed/')) {
      return `${AFFONSO_PROXY_PREFIX}${url.pathname}${url.search}`
    }
  } catch {
    return null
  }
  return null
}

export async function proxyAffonsoRequest(request: Request, upstream: URL) {
  const method = request.method.toUpperCase()
  const init: RequestInit & { duplex?: 'half' } = {
    method,
    headers: affonsoProxyHeaders(request, upstream),
    redirect: 'manual',
  }

  if (method !== 'GET' && method !== 'HEAD') {
    init.body = request.body
    init.duplex = 'half'
  }

  const upstreamResponse = await fetch(upstream, init)
  const headers = new Headers(upstreamResponse.headers)
  const location = headers.get('location')
  if (location) {
    const rewritten = rewriteAffonsoLocation(location)
    if (rewritten) headers.set('location', rewritten)
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  })
}
