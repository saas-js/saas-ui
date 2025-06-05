'use client'

import React, { type PropsWithChildren } from 'react'

import {
  SuiProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@saas-ui/react'

import { usePalette } from './palette'

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [{ colors }] = usePalette()

  const system = React.useMemo(() => {
    const config = defineConfig({
      theme: {
        tokens: {
          colors,
        },
      },
    })

    return createSystem(defaultConfig, config)
  }, [colors])

  return <SuiProvider value={system}>{children}</SuiProvider>
}
