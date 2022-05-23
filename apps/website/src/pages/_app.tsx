import { AppProps } from 'next/app'
import Layout from '@/components/layout'

import '@fontsource/inter/variable.css'

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
            header={pageProps.header}
            footer={pageProps.footer !== false ? <Footer /> : null}
          >
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
