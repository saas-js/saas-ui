import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'
import Layout from 'components/layout'

import '@fontsource/inter/variable.css'

import theme from 'styles/theme'

import Footer from 'components/Footer'

import { prismLightTheme, prismDarkTheme } from '../styles/prism'

const GlobalStyle = ({ children }: { children: React.ReactElement }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
        `}
      />
      {children}
    </>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout header={pageProps.header} footer={<Footer />}>
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
