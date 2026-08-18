import { docsConfig } from '@/app/(saas-js)/docs/docs.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(docsConfig.url),
  title: {
    default: 'SaaS.js',
    template: '%s | SaaS.js',
  },
  description: docsConfig.description,
  openGraph: {
    siteName: 'SaaS.js',
    images: [
      {
        url: `${docsConfig.url}/img/og-saasjs.png`,
        width: 1200,
        height: 630,
        alt: 'SaaS.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: docsConfig.xHandle,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
