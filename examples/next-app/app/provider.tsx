'use client'

import { SuiProvider, defaultSystem } from '@saas-ui/react'
import { ThemeProvider } from 'next-themes'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <SuiProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </SuiProvider>
  )
}
