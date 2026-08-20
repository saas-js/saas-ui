import { docsConfig } from '@/app/(saas-js)/docs/docs.config'
import type { Metadata } from 'next'

export function createSjsMetadata({
  title,
  description,
  path,
  ogLabel,
}: {
  title: string
  description: string
  path: string
  ogLabel?: string
}): Metadata {
  const url = `${docsConfig.url}${path === '/' ? '' : path}`
  const ogSearchParams = new URLSearchParams({
    title,
    description,
    site: 'sjs',
  })
  if (ogLabel) {
    ogSearchParams.set('label', ogLabel)
  }
  const ogImage = `${docsConfig.url}/og?${ogSearchParams.toString()}`

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
