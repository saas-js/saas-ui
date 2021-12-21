import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import PaletteProvider, { usePalette } from '@/providers/palette'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors }] = usePalette()

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
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaletteProvider
      color="#6d28d9"
      options={{ blackLuminance: 0.005, colors: { gray: '#1f2937' } }}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </PaletteProvider>
  )
}

export default MyApp
