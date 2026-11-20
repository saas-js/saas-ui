import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const title = 'Color palette generator for Chakra UI and Saas UI'
const description =
  'Turn one brand color into OKLCH color scales, semantic palettes and a ready-to-use Saas UI or Chakra UI theme.'

export const metadata: Metadata = {
  metadataBase: new URL('https://palette.saas-ui.dev'),
  title: { default: title, template: '%s · Saas UI Palette' },
  description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://palette.saas-ui.dev',
    siteName: 'Saas UI Palette',
    title,
    description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saas UI: Color Palette Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@saas_js',
    images: ['/twitter-og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>{props.children}</body>
    </html>
  )
}
