import { allChangelogs, allSJSDocs } from 'content-collections'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_URL || 'https://saas-js.com'

  const docUrls = allSJSDocs.map(
    (doc) =>
      ({
        url: `${baseUrl}/docs/${doc.slug.replaceAll(/\([^)]*\)\/?/g, '')}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 1,
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
        changeFrequency: 'monthly',
        priority: 1,
      }) as const,
  )

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tanstack-start`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/nextjs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      changeFrequency: 'monthly',
      priority: 1,
    },
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
