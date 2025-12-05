import { websiteConfig } from '@/website.config'
import type { Metadata } from 'next'
import { Figtree, Inter, Outfit, Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import Script from 'next/script'

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
    default: websiteConfig.title,
  },
  description: websiteConfig.description,
  openGraph: {
    images: '/og-image.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const head = await headers()

  const host = head.get('host')

  const site = host?.includes('saas-ui') ? 'sui' : 'sjs'

  const pirschCode =
    site === 'sui'
      ? '6VI7VAQoe3eG33JAw0giyqequwucCiou'
      : '0wmOd91WUKqHhN2foO6rJdvW4Ak2Wscq'

  return (
    <html
      lang="en"
      className={`${inter.variable} ${figTree.variable} ${roboto.variable} ${outfit.variable} ${guton.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider site={site}>{children}</Provider>

        <Script
          id="productlane-script"
          dangerouslySetInnerHTML={{
            __html: `
              ;((w)=>{const P=(w.Productlane={queue:{}});["set","open","close","toggle","on","off","init"].forEach(m=>{P[m]=(n=>function(){P.queue[n]={args:arguments}})(m)})})(window);

              Productlane.init({
                widgetKey: "3f1be0cf-0681-439d-86b6-5826ed5dea8b",
                theme: {
                  "--text-color-primary": "#111827",
                  "--text-color-primary-dark": "#FFFFFF",
                  "--text-color-secondary": "#9CA3AF",
                  "--text-color-secondary-dark": "#9CA3AF",
                  "--text-color-highlight": "#1692A4",
                  "--text-color-highlight-dark": "#1692A4",
                  "--background-color-primary": "#FFFFFF",
                  "--background-color-primary-dark": "#111827",
                  "--background-color-secondary": "#F3F4F6",
                  "--background-color-secondary-dark": "#1F2937",
                  "--border-color-primary": "#E5E7EB",
                  "--border-color-primary-dark": "#1F2937",
                }
              })
            `,
          }}
        />

        <Script
          defer
          crossOrigin="anonymous"
          src="https://widget.productlane.com/latest.productlane-widget.min.js"
        />

        <Script
          id="pirschjs"
          strategy="afterInteractive"
          src="https://api.pirsch.io/pirsch.js"
          data-code={pirschCode}
        />
        <Script
          id="pirscheventsjs"
          strategy="afterInteractive"
          src="https://api.pirsch.io/pirsch-events.js"
          data-code={pirschCode}
        />
        <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
        <Script
          id="lemon-squeezy-affiliate-config"
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "saas-ui" };`,
          }}
        />
        <Script src="https://lmsqueezy.com/affiliate.js" defer />
      </body>
    </html>
  )
}
