import { AppProps } from 'next/app'
import Script from 'next/script'
import Layout from '@/components/layout'

import theme from '../styles/theme'

import { SaasProvider, ModalsProvider } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { NProgressNextRouter } from '@saas-ui/nprogress'

import Footer from '@/components/footer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { authService } from '@/lib/auth'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps<any>) => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady && router.query.aff) {
      localStorage.setItem('aff', router.query.aff as string)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SaasProvider theme={theme} linkComponent={Link}>
        <AuthProvider {...authService}>
          <ModalsProvider>
            <Layout
              announcement={pageProps.announcement}
              header={pageProps.header}
              footer={pageProps.footer !== false ? <Footer /> : null}
            >
              <NProgressNextRouter router={router} />
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </AuthProvider>
      </SaasProvider>
      <Script
        id="pirschjs"
        strategy="afterInteractive"
        src="https://api.pirsch.io/pirsch.js"
        data-code="6VI7VAQoe3eG33JAw0giyqequwucCiou"
      />
      <Script
        id="pirscheventsjs"
        strategy="afterInteractive"
        src="https://api.pirsch.io/pirsch-events.js"
        data-code="6VI7VAQoe3eG33JAw0giyqequwucCiou"
      />
      <Script
        id="crisp-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="65e4ab93-1a03-40da-ae73-7a327854e2f7";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.lemonSqueezyAffiliateConfig = { store: "saas-ui" };`,
        }}
      />
      <script src="https://lmsqueezy.com/affiliate.js" defer></script>
    </>
  )
}

export default MyApp
