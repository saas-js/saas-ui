import * as React from 'react'
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import PaletteProvider, { usePalette } from '@/providers/palette'

import '@fontsource/inter/variable.css'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors }] = usePalette()

  const theme = React.useMemo(() => {
    return extendTheme({
      colors,
      components: {
        Button: {
          defaultProps: {
            size: 'sm',
          },
        },
      },
    })
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
