import * as React from 'react'

import PaletteProvider, { usePalette } from '@/providers/palette'
// import '@fontsource/inter/variable.css'
import type { SystemContext } from '@chakra-ui/react'
import {
  SuiProvider,
  Toaster,
  createSystem,
  defaultSystem,
  defineConfig,
} from '@saas-ui/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

interface ThemeProviderProps {
  children: React.ReactNode
}

// const themes: Record<string, any> = {
//   'Chakra UI': baseTheme,
//   'Saas UI': saasTheme,
//   Glass: glassTheme,
// }

const SystemContext = React.createContext<SystemContext>(defaultSystem)

export function useSystem() {
  return React.useContext(SystemContext)
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ colors, options }] = usePalette()

  const system = React.useMemo(() => {
    const config = defineConfig({
      theme: {
        tokens: {
          colors,
        },
      },
    })

    return createSystem(defaultSystem, config)
  }, [colors, options.theme])

  return (
    <SuiProvider value={system}>
      <SystemContext.Provider value={system}>{children}</SystemContext.Provider>
    </SuiProvider>
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
      <NextThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeProvider>
          <Toaster />
          {/* <Component {...pageProps} /> */}
        </ThemeProvider>
      </NextThemeProvider>
    </PaletteProvider>
  )
}

export default MyApp
