import type { ReactNode } from 'react'

import * as stylex from '@stylexjs/stylex'

import {
  buttonIcon,
  buttonSizes,
  buttonStyles,
  buttonTextStyles,
  buttonVariants,
  buttonWhenVariantSurface,
  type ButtonSize,
  type ButtonVariant,
} from '../recipes/button.ts'
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
  icon?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  colorPalette?: keyof typeof palettes
}

/**
 * Example of the StyleX variants pattern: one `create()` per axis, then
 * `styles.base`, `sizes[size]`, `variants[variant]`.
 *
 * @see https://stylexjs.com/docs/learn/recipes/variants
 */
export function Button({
  children,
  icon,
  variant = 'surface',
  size = 'md',
  colorPalette: palette = 'gray',
}: ButtonProps) {
  return (
    <button
      type="button"
      {...stylex.props(
        palettes[palette],
        buttonStyles.base,
        buttonTextStyles[size],
        buttonSizes[size],
        buttonVariants[variant],
        variant === 'surface' &&
          buttonWhenVariantSurface[size as keyof typeof buttonWhenVariantSurface],
      )}
    >
      {icon ? <span {...stylex.props(buttonIcon.base)}>{icon}</span> : null}
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
