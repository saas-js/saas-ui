import { source } from '@/app/(saas-js)/docs/lib/source'
import { allChangelogs } from 'content-collections'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saas-js.com'

  const docUrls = source.getPages().map(
    (page) =>
      ({
        url: `${baseUrl}${page.url}`,
        lastModified: page.data.updatedAt
          ? new Date(page.data.updatedAt)
          : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }) as const,
  )

  const changelogs = allChangelogs.filter((changelog) =>
    changelog.products?.some(
      (product) => product === 'tanstack' || product === 'nextjs',
    ),
  )

  const changelogUrls = changelogs.map(
    (changelog) =>
      ({
        url: `${baseUrl}/${changelog.slug}`,
        lastModified: new Date(changelog.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 1,
      }) as const,
  )

  const marketing = [
    '/',
    '/packages',
    '/packages/drizzle-crud',
    '/packages/conditions',
    '/packages/slingshot',
    '/packages/better-auth-react-query',
    '/packages/iconx',
    '/tanstack-start',
    '/nextjs',
    '/pricing',
    '/showcase',
    '/docs',
  ].map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' || path === '/packages' ? 1 : 0.9,
  }))

  return [
    ...marketing,
    ...docUrls,
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...changelogUrls,
  ]
}
