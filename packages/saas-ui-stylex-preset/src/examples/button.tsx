import type { ReactNode } from 'react'

import * as stylex from '@stylexjs/stylex'

import { buttonRecipeStyles } from '../recipes/button.ts'
import { ThemeProvider } from '../theme.tsx'
import { bluePalette, greenPalette, redPalette } from '../themes/palettes.ts'

const palettes = {
  gray: null,
  blue: bluePalette,
  red: redPalette,
  green: greenPalette,
} as const

export interface ButtonProps {
  children?: ReactNode
  variant?:
    | 'solid'
    | 'subtle'
    | 'surface'
    | 'outline'
    | 'ghost'
    | 'plain'
    | 'glass'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorPalette?: keyof typeof palettes
}

/**
 * Minimal example of a Chakra button recipe compiled to StyleX.
 */
export function Button({
  children,
  variant = 'surface',
  size = 'md',
  colorPalette: palette = 'gray',
}: ButtonProps) {
  return (
    <button
      type="button"
      {...stylex.props(
        palettes[palette],
        ...buttonRecipeStyles({ variant, size }),
      )}
    >
      {children}
    </button>
  )
}

export function ButtonPreview() {
  return (
    <ThemeProvider colorPalette="gray">
      <Button variant="solid" colorPalette="blue">
        Save
      </Button>
    </ThemeProvider>
  )
}
