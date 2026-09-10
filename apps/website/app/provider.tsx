'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'

import {
  GlobalAppearance,
  ThemeStoreHydrator,
} from '#components/theme/theme-provider'
import type { ThemeState } from '#components/theme/theme-state'
import { Toaster } from '#components/ui/toaster'

import { sjsSystem, system } from './theme'

export const Provider = (props: {
  children: React.ReactNode
  site: 'sui' | 'sjs'
  theme?: ThemeState | null
}) => {
  const { site, theme } = props

  return (
    <ChakraProvider value={site === 'sui' ? system : sjsSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeStoreHydrator initial={theme}>
          <GlobalAppearance />
          {props.children}
          <Toaster />
        </ThemeStoreHydrator>
      </ThemeProvider>
    </ChakraProvider>
  )
}
