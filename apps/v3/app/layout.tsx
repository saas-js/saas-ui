import { docsConfig } from '@/docs.config'
import type { Metadata } from 'next'
import { Figtree, Inter, Outfit, Roboto } from 'next/font/google'
import localFont from 'next/font/local'

import { Provider } from './provider'
import './scrollbar.css'
import './shiki.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const figTree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const guton = localFont({
  variable: '--font-guton',
  src: [
    {
      path: '../public/fonts/guton/Guton-Regular.woff',
      weight: '400',
    },
    {
      path: '../public/fonts/guton/Guton-Medium.woff',
      weight: '500',
    },
    {
      path: '../public/fonts/guton/Guton-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../public/fonts/guton/Guton-Bold.woff',
      weight: '700',
    },
    {
      path: '../public/fonts/guton/Guton-ExtraBold.woff',
      weight: '800',
    },
  ],
})

export const metadata: Metadata = {
  title: {
    template: docsConfig.titleTemplate,
    default: docsConfig.title,
  },
  description: docsConfig.description,
  openGraph: {
    images: '/og-image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figTree.variable} ${roboto.variable} ${outfit.variable} ${guton.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
