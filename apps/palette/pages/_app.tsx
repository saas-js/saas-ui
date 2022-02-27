import * as React from 'react'
import type { AppProps } from 'next/app'
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import PaletteProvider, { usePalette } from '@/providers/palette'
import { SaasProvider } from '@saas-ui/react'

import '@fontsource/inter/variable.css'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors }] = usePalette()

  const theme = React.useMemo(() => {
    return extendTheme(
      {
        colors,
        components: {
          Button: {
            defaultProps: {
              size: 'sm',
            },
          },
        },
      },
      baseTheme
    )
  }, [colors])

  return <SaasProvider theme={theme}>{children}</SaasProvider>
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
