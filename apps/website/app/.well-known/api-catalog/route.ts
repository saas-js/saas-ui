import { isSaasUiHost } from '@/lib/robots-txt'

const SAAS_UI_ORIGIN = 'https://saas-ui.dev'
const SAAS_JS_ORIGIN = 'https://www.saas-js.com'

/**
 * RFC 9727 API catalog. These sites are documentation, not HTTP APIs, so the
 * linkset only points at the docs, llms.txt, and (on saas-ui.dev) the public
 * component registry. No OpenAPI or status URL is invented.
 */
export function GET(request: Request) {
  const saasUi = isSaasUiHost(request.headers.get('host'))
  const origin = saasUi ? SAAS_UI_ORIGIN : SAAS_JS_ORIGIN

  const entry: Record<string, unknown> = {
    anchor: `${origin}/`,
    'service-doc': [{ href: `${origin}/docs`, type: 'text/html' }],
    describedby: [{ href: `${origin}/llms.txt`, type: 'text/plain' }],
  }

  if (saasUi) {
    entry.related = [
      {
        href: `${origin}/r/index.json`,
        type: 'application/json',
        title: 'Public component registry',
      },
    ]
  }

  return new Response(JSON.stringify({ linkset: [entry] }), {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
