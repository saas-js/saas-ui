import ColorsPage from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color palette generator',
  description: 'Quickly generate custom color palettes for Chakra UI.',
  openGraph: {
    title: 'Saas UI: Color Palette Generator',
    description: 'Quickly generate custom color palettes for Chakra UI.',
    url: 'https://palette.saas-ui.dev',
    siteName: 'Saas UI: Color Palette Generator for Chakra UI.',
    images: [
      {
        url: 'https://palette.saas-ui.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saas UI: Color Palette Generator for Chakra UI.',
      },
      {
        url: 'https://palette.saas-ui.dev/twitter-og-image.jpg',
        width: 1012,
        height: 506,
        alt: 'Saas UI: Color Palette Generator for Chakra UI.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Home() {
  return <ColorsPage />
}
