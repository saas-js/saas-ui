const SAAS_UI_SITEMAP = 'https://saas-ui.dev/sitemap.xml'
const SAAS_JS_SITEMAP = 'https://www.saas-js.com/sitemap.xml'

export function isSaasUiHost(host: string | null | undefined) {
  const hostname = (host ?? '').split(':')[0]?.toLowerCase() ?? ''
  return hostname.includes('saas-ui')
}

export function robotsTxtForHost(host: string | null | undefined) {
  const sitemap = isSaasUiHost(host) ? SAAS_UI_SITEMAP : SAAS_JS_SITEMAP
  return `User-Agent: *
Allow: /

Sitemap: ${sitemap}
`
}

export function robotsTxtResponse(host: string | null | undefined) {
  return new Response(robotsTxtForHost(host), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
