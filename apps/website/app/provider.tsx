'use client'

import { SuiProvider } from '@saas-ui/react'
import { Toaster } from '@saas-ui/react/toaster'
import { ThemeProvider } from 'next-themes'

import { system } from './theme'

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <SuiProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
        <Toaster />
      </ThemeProvider>
    </SuiProvider>
  )
}
