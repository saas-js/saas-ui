'use client'

import * as React from 'react'

import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react'
import { defaultConfig } from '@saas-ui/chakra-preset'
import { ThemeProvider } from 'next-themes'

import {
  type GeneratedPalette,
  type PaletteState,
  defaultState,
  generatePalette,
  stateToSearch,
} from '#/lib/palette'

import { EmotionRegistry } from './emotion-registry'
import { Toaster } from './toaster'

interface PaletteContextValue {
  state: PaletteState
  setState: React.Dispatch<React.SetStateAction<PaletteState>>
  update: (patch: Partial<PaletteState>) => void
  reset: () => void
  /** Lags slightly behind `state` while the system is regenerated. */
  palette: GeneratedPalette
}

const PaletteContext = React.createContext<PaletteContextValue | null>(null)

export function usePalette() {
  const context = React.useContext(PaletteContext)
  if (!context) throw new Error('usePalette must be used inside <Provider>')
  return context
}

function createPaletteSystem(palette: GeneratedPalette) {
  return createSystem(
    defaultConfig,
    defineConfig({
      theme: {
        tokens: { colors: palette.scales },
        semanticTokens: {
          colors: { ...palette.semanticTokens, ...palette.palettes },
        },
      },
    }),
  )
}

/** Keep the address bar shareable without adding history entries. */
function useSyncUrl(state: PaletteState) {
  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      const url = `${window.location.pathname}${stateToSearch(state)}`
      window.history.replaceState(window.history.state, '', url)
    }, 300)
    return () => window.clearTimeout(timeout)
  }, [state])
}

export function Provider(props: {
  initialState?: PaletteState
  children: React.ReactNode
}) {
  const [state, setState] = React.useState(
    props.initialState ?? defaultState,
  )

  const deferredState = React.useDeferredValue(state)
  const palette = React.useMemo(
    () => generatePalette(deferredState),
    [deferredState],
  )
  const system = React.useMemo(() => createPaletteSystem(palette), [palette])

  useSyncUrl(state)

  const update = React.useCallback(
    (patch: Partial<PaletteState>) =>
      setState((current) => ({ ...current, ...patch })),
    [],
  )
  const reset = React.useCallback(() => setState(defaultState), [])

  const value = React.useMemo(
    () => ({ state, setState, update, reset, palette }),
    [state, update, reset, palette],
  )

  return (
    <PaletteContext.Provider value={value}>
      <EmotionRegistry>
        <ChakraProvider value={system}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            {props.children}
            <Toaster />
          </ThemeProvider>
        </ChakraProvider>
      </EmotionRegistry>
    </PaletteContext.Provider>
  )
}
