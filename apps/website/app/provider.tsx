'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'

import { GlobalAppearance } from '#components/theme/theme-provider'
import { Toaster } from '#components/ui/toaster'

import { sjsSystem, system } from './theme'

export const Provider = (props: {
  children: React.ReactNode
  site: 'sui' | 'sjs'
}) => {
  const { site } = props

  return (
    <ChakraProvider value={site === 'sui' ? system : sjsSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <GlobalAppearance />
        {props.children}
        <Toaster />
      </ThemeProvider>
    </ChakraProvider>
  )
}
