import { docsConfig } from '@/app/(saas-js)/docs/docs.config'
import type { Metadata } from 'next'

export function createSjsMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${docsConfig.url}${path === '/' ? '' : path}`
  const ogImage = `${docsConfig.url}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&site=sjs`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Saas.js',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: docsConfig.xHandle,
    },
  }
}
