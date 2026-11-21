import { type LlmsPage, markdownResponse, renderPage } from '@/lib/llms'
import { source } from '@/lib/source'

import { BASE_URL, renderLlmsTxt } from '../../shared'

const DOC_ALIASES: Record<string, string[]> = {
  '/docs': ['getting-started', 'introduction'],
  '/docs/getting-started': ['getting-started', 'introduction'],
  '/docs/charts': ['charts', 'overview'],
}

function notFound() {
  return new Response('Not found\n', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await ctx.params
  const pathname = slug?.length ? `/${slug.join('/')}` : '/'

  if (pathname === '/') {
    return markdownResponse(renderLlmsTxt())
  }

  const docSlug =
    DOC_ALIASES[pathname] ??
    (pathname.startsWith('/docs/')
      ? pathname.slice('/docs/'.length).split('/').filter(Boolean)
      : null)

  if (!docSlug?.length) return notFound()

  const page = source.getPage(docSlug) as unknown as LlmsPage | undefined
  if (!page?.data?.title) return notFound()

  return markdownResponse(renderPage(page, BASE_URL))
}
