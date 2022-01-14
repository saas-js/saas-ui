import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Layout from '@/components/layout'

import '@fontsource/inter/variable.css'

import theme from '../styles/theme'

import { SaasProvider } from '@saas-ui/react'
import { NProgressNextRouter } from '@saas-ui/nprogress'

import Footer from '@/components/footer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SaasProvider theme={theme}>
      <Layout
        header={pageProps.header}
        footer={pageProps.footer !== false ? <Footer /> : null}
      >
        <NProgressNextRouter />
        <Component {...pageProps} />
      </Layout>
    </SaasProvider>
  )
}

export default MyApp
