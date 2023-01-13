import * as React from 'react'
import type { AppProps } from 'next/app'
import { extendTheme } from '@chakra-ui/react'
import PaletteProvider, { usePalette } from '@/providers/palette'
import { SaasProvider, baseTheme, theme as saasTheme } from '@saas-ui/react'
import { theme as glassTheme } from '@saas-ui/theme-glass'

import '@fontsource/inter/variable.css'

interface ThemeProviderProps {
  children: React.ReactNode
}

const themes: Record<string, any> = {
  'Chakra UI': baseTheme,
  'Saas UI': saasTheme,
  Glass: glassTheme,
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors, options }] = usePalette()
  const theme = React.useMemo(() => {
    return extendTheme(
      {
        colors,
      },
      themes[options.theme]
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
