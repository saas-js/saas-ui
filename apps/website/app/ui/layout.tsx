import { websiteConfig } from '@/website.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(websiteConfig.url),
  title: {
    default: websiteConfig.title,
    template: websiteConfig.titleTemplate,
  },
  description: websiteConfig.description,
  openGraph: {
    siteName: websiteConfig.title,
    images: [
      {
        url: `/og?site=sui`,
        width: 1200,
        height: 630,
        alt: websiteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: websiteConfig.xHandle,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
