import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Layout from '@/components/layout'

import '@fontsource/inter/variable.css'

import theme from '../styles/theme'

import Footer from '@/components/footer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout header={pageProps.header} footer={<Footer />}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
