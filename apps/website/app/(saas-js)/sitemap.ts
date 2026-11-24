import { source } from '@/app/(saas-js)/docs/lib/source'
import { getBlogPosts } from '@/lib/blog'
import { allBlogs, allChangelogs } from 'content-collections'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // The apex 308s to www, so listing apex URLs points crawlers at a redirect
  // chain instead of the canonical page.
  const baseUrl = 'https://www.saas-js.com'

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
        url: `${baseUrl}/changelog/${changelog.slug}`,
        lastModified: new Date(changelog.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 1,
      }) as const,
  )

  const marketing = [
    '/',
    '/packages',
    '/packages/drizzle-secrets',
    '/packages/conditions',
    '/packages/slingshot',
    '/packages/better-auth-react-query',
    '/packages/iconx',
    '/nextjs',
    '/tanstack-start-saas-boilerplate',
    '/nextjs-saas-boilerplate',
    '/pricing',
    '/showcase',
    '/docs',
    '/blog',
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
    ...getBlogPosts(allBlogs, 'saas-js').map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
