import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  )
}
