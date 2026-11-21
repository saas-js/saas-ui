/**
 * Agent discovery for saas-ui.dev and saas-js.com.
 *
 * Link targets are root-relative so the same header is correct on both hosts.
 * Relations follow RFC 8288 (`describedby`, `service-doc`) and RFC 9727
 * (`api-catalog`).
 */
export const AGENT_LINK_HEADER = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</docs>; rel="service-doc"',
].join(', ')

/** HTML-ish paths that should advertise the discovery links. */
export function isAgentDocument(pathname: string) {
  if (pathname.startsWith('/.well-known')) return false
  if (pathname === '/a' || pathname.startsWith('/a/')) return false
  const leaf = pathname.split('/').pop() ?? ''
  return !leaf.includes('.')
}

/** Pages that can answer `Accept: text/markdown`. */
export function isNegotiableDocument(pathname: string) {
  if (pathname === '/') return true
  if (pathname === '/docs' || pathname.startsWith('/docs/')) return true
  return /^\/packages\/[^/]+\/docs(?:\/|$)/.test(pathname)
}

export function markdownInternalPath(pathname: string, saasUi: boolean) {
  const base = saasUi ? '/ui/md' : '/md'
  return pathname === '/' ? base : `${base}${pathname}`
}

/**
 * True when the client lists `text/markdown` at a quality at least as high as
 * `text/html`. A wildcard range does not count. HTML stays the default when
 * markdown is absent or has a lower quality.
 */
export function prefersMarkdown(accept: string | null | undefined) {
  if (!accept) return false
  const markdown = explicitQuality(accept, 'text/markdown')
  if (markdown <= 0) return false
  return markdown >= explicitQuality(accept, 'text/html')
}

function explicitQuality(header: string, type: string) {
  let best = 0
  let seen = false
  for (const part of header.split(',')) {
    const [range, ...params] = part.trim().split(';')
    if (!range || range.trim().toLowerCase() !== type) continue
    seen = true
    let quality = 1
    for (const param of params) {
      const match = param.trim().match(/^q\s*=\s*([0-9]*\.?[0-9]+)/i)
      if (!match) continue
      const value = Number(match[1])
      if (!Number.isNaN(value)) quality = value
    }
    if (quality > best) best = quality
  }
  return seen ? best : 0
}
