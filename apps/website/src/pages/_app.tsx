import { AppProps } from 'next/app'
import Script from 'next/script'
import Layout from '@/components/layout'

import theme from '../styles/theme'

import { SaasProvider, ModalsProvider, AuthProvider } from '@saas-ui/react'
import { NProgressNextRouter } from '@saas-ui/nprogress'

import Footer from '@/components/footer'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
        <ModalsProvider>
          <Layout
            announcement={pageProps.announcement}
            header={pageProps.header}
            footer={pageProps.footer !== false ? <Footer /> : null}
          >
            <Script
              id="plausible"
              strategy="afterInteractive"
              data-domain="saas-ui.dev"
              src="https://plausible.io/js/plausible.js"
            />
            <Script
              id="plausible-snippet"
              dangerouslySetInnerHTML={{
                __html:
                  'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
              }}
            />
            <Script
              id="crisp-js"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="65e4ab93-1a03-40da-ae73-7a327854e2f7";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
              }}
            />
            <NProgressNextRouter router={router} />
            <Component {...pageProps} />
          </Layout>
        </ModalsProvider>
      </AuthProvider>
    </SaasProvider>
  )
}

export default MyApp

export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}
