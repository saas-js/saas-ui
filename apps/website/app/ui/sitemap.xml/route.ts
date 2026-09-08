import { CATEGORIES_SLUGS } from '@/blocks'
import { source } from '@/lib/source'
import { allChangelogs } from 'content-collections'

const BASE_URL = 'https://saas-ui.dev'

interface Entry {
  path: string
  lastModified?: Date
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

/**
 * saas-ui.dev is served by rewriting every request into `/ui/*` (see proxy.ts),
 * so the root `sitemap.ts` — which belongs to saas-js.com — is unreachable on
 * this host and the domain was serving a 404 for `/sitemap.xml`.
 */
function entries(): Entry[] {
  const marketing: Entry[] = [
    '/',
    '/pricing',
    '/figma',
    '/blocks',
    '/showcase',
    '/changelog',
  ].map((path) => ({
    path,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.9,
  }))

  const blocks: Entry[] = CATEGORIES_SLUGS.map((slug) => ({
    path: `/blocks/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const docs: Entry[] = source.getPages().map((page) => ({
    path: page.url,
    lastModified: page.data.updatedAt
      ? new Date(page.data.updatedAt)
      : undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const changelogs: Entry[] = allChangelogs
    .filter((entry) => entry.products?.includes('saas-ui') !== false)
    .map((entry) => ({
      path: `/${entry.slug}`,
      lastModified: new Date(entry.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

  return [...marketing, ...blocks, ...docs, ...changelogs]
}

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries()
  .map(({ path, lastModified, changeFrequency, priority }) =>
    [
      '  <url>',
      `    <loc>${BASE_URL}${path === '/' ? '' : path}</loc>`,
      lastModified
        ? `    <lastmod>${lastModified.toISOString()}</lastmod>`
        : undefined,
      `    <changefreq>${changeFrequency}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>
`

  return new Response(body, {
    headers: {
      'content-type': 'application/xml',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
