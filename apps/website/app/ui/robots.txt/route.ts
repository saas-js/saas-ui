/**
 * saas-ui.dev rewrites every request into `/ui/*` (see proxy.ts), which made
 * the shared `public/robots.txt` unreachable on this host.
 */
export function GET() {
  const body = `User-Agent: *
Allow: /

Sitemap: https://saas-ui.dev/sitemap.xml
`

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
