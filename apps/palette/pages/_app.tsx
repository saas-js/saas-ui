import * as React from 'react'
import type { AppProps } from 'next/app'
import { extendTheme } from '@chakra-ui/react'
import PaletteProvider, { usePalette } from '@/providers/palette'
import { SaasProvider, baseTheme, theme as saasTheme } from '@saas-ui/react'

import '@fontsource/inter/variable.css'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors, options }] = usePalette()
  console.log(options)
  const theme = React.useMemo(() => {
    console.log('options', options.theme)
    return extendTheme(
      {
        colors,
      },
      options.theme === 'Chakra UI' ? baseTheme : saasTheme
    )
  }, [colors, options.theme])

  return <SaasProvider theme={theme}>{children}</SaasProvider>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaletteProvider
      color="#6d28d9"
      options={{
        blackLuminance: 0.005,
        colors: { gray: '#1f2937' },
        theme: 'Saas UI',
      }}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </PaletteProvider>
  )
}

export default MyApp
