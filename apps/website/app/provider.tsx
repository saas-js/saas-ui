'use client'

import { SuiProvider } from '@saas-ui/react'
import { Toaster } from '@saas-ui/react/toaster'
import { ThemeProvider } from 'next-themes'

import { sjsSystem, system } from './theme'

export const Provider = (props: {
  children: React.ReactNode
  site: 'sui' | 'sjs'
}) => {
  const { site } = props

  return (
    <SuiProvider value={site === 'sui' ? system : sjsSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
        <Toaster />
      </ThemeProvider>
    </SuiProvider>
  )
}
