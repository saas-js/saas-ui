'use client'

import { useMemo } from 'react'

import { SuiProvider } from '@saas-ui/react'
import { Toaster } from '@saas-ui/react/toaster'
import { ThemeProvider } from 'next-themes'

import { sjsSystem, system } from './theme'

export const Provider = (props: { children: React.ReactNode }) => {
  const theme = useMemo(() => {
    if (typeof window === 'undefined') return system

    const hostname = window.location.hostname

    const isSaasUi = hostname.includes('saas-ui')

    if (isSaasUi) {
      return system
    }

    return sjsSystem
  }, [])

  return (
    <SuiProvider value={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
        <Toaster />
      </ThemeProvider>
    </SuiProvider>
  )
}
