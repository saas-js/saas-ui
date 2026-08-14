import * as React from 'react'

import { Toaster } from '@/components/ui/toaster'
import PaletteProvider, { usePalette } from '@/providers/palette'
import {
  ChakraProvider,
  defaultConfig as chakraDefaultConfig,
  createSystem,
  defineConfig,
} from '@chakra-ui/react'
import '@fontsource/inter/variable.css'
import { defaultConfig as saasDefaultConfig } from '@saas-ui/chakra-preset'
import { ThemeProvider as ColorModeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

interface ThemeProviderProps {
  children: React.ReactNode
}

function tokenValue(value: any): any {
  if (typeof value === 'string') return { value }
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, tokenValue(entry)]),
  )
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors, options }] = usePalette()
  const system = React.useMemo(() => {
    const baseConfig =
      options.theme === 'Chakra UI' ? chakraDefaultConfig : saasDefaultConfig
    return createSystem(
      baseConfig,
      defineConfig({
        theme: {
          tokens: {
            colors: tokenValue(colors),
          },
        },
      }),
    )
  }, [colors, options.theme])

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider attribute="class" disableTransitionOnChange>
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  )
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
