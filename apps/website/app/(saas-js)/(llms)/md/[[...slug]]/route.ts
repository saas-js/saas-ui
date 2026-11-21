import { source } from '@/app/(saas-js)/docs/lib/source'
import { type LlmsPage, markdownResponse, renderPage } from '@/lib/llms'

import { BASE_URL, renderDocsHub, renderLlmsTxt } from '../../shared'

function notFound() {
  return new Response('Not found\n', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

/** Public docs path → fumadocs slugs. Package docs live under /packages. */
function docSlug(pathname: string) {
  if (pathname.startsWith('/docs/')) {
    return pathname.slice('/docs/'.length).split('/').filter(Boolean)
  }

  const match = pathname.match(/^\/packages\/([^/]+)\/docs(?:\/(.*))?$/)
  if (!match) return null
  const rest = match[2]?.split('/').filter(Boolean) ?? []
  return [match[1], ...rest]
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await ctx.params
  const pathname = slug?.length ? `/${slug.join('/')}` : '/'

  if (pathname === '/') return markdownResponse(renderLlmsTxt())
  if (pathname === '/docs') return markdownResponse(renderDocsHub())

  const slugs = docSlug(pathname)
  if (!slugs?.length) return notFound()

  const page = source.getPage(slugs) as unknown as LlmsPage | undefined
  if (!page?.data?.title) return notFound()

  return markdownResponse(renderPage(page, BASE_URL))
}
