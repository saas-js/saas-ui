import type { ReactNode } from 'react'

import * as stylex from '@stylexjs/stylex'

import { type ColorPaletteName, paletteThemes } from './themes/palettes.ts'

const styles = stylex.create({
  root: {
    colorScheme: 'light',
  },
  dark: {
    colorScheme: 'dark',
  },
})

export interface ThemeProviderProps {
  colorMode?: 'light' | 'dark'
  colorPalette?: ColorPaletteName
  children?: ReactNode
  className?: string
}

/**
 * Applies `color-scheme` so `light-dark()` semantic tokens follow the
 * active mode, and optionally scopes a `colorPalette` theme to the tree.
 */
export function ThemeProvider({
  colorMode = 'light',
  colorPalette = 'gray',
  children,
  className,
}: ThemeProviderProps) {
  const props = stylex.props(
    styles.root,
    colorMode === 'dark' && styles.dark,
    paletteThemes[colorPalette],
  )

  return (
    <div
      {...props}
      className={['sui-theme', props.className, className]
        .filter(Boolean)
        .join(' ')}
      data-color-mode={colorMode}
    >
      {children}
    </div>
  )
}
