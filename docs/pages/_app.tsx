import React, { useState, useEffect, useContext } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import PaletteProvider from '@/providers/PaletteProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaletteProvider color="#6d28d9">
      {({ colors }) => {
        const [theme, setTheme] = useState(
          extendTheme({
            colors,
          })
        )

        useEffect(() => {
          setTheme(
            extendTheme({
              colors,
            })
          )
        }, [colors])

        return (
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        )
      }}
    </PaletteProvider>
  )
  return
}

export default MyApp
