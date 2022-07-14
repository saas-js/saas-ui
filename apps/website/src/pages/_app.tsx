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
              id="woopra-js"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `!function(){var t,o,c,e=window,n=document,r=arguments,a="script",i=["call","cancelAction","config","identify","push","track","trackClick","trackForm","update","visit"],s=function(){var t,o=this,c=function(t){o[t]=function(){return o._e.push([t].concat(Array.prototype.slice.call(arguments,0))),o}};for(o._e=[],t=0;t<i.length;t++)c(i[t])};for(e.__woo=e.__woo||{},t=0;t<r.length;t++)e.__woo[r[t]]=e[r[t]]=e[r[t]]||new s;(o=n.createElement(a)).async=1,o.src="https://static.woopra.com/js/w.js",(c=n.getElementsByTagName(a)[0]).parentNode.insertBefore(o,c)}("woopra");

  woopra.config({
    domain: "saas-ui.dev",
    outgoing_tracking: true,
    download_tracking: true,
    click_tracking: true
  });

  woopra.track();`,
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
