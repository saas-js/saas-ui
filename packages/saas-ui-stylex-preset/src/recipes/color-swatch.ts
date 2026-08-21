/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const colorSwatchStyles = stylex.create({
  base: {
    width: 'var(--swatch-size)',
    height: 'var(--swatch-size)',
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    '--checker-size': '8px',
    '--checker-bg': semanticColors.bg,
    '--checker-fg': semanticColors.bgEmphasized,
    backgroundImage:
      'linear-gradient(var(--color), var(--color)), repeating-conic-gradient(var(--checker-fg) 0%, var(--checker-fg) 25%, var(--checker-bg) 0%, var(--checker-bg) 50%) 0% 50% / var(--checker-size) var(--checker-size) !important',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})

export const colorSwatchSizes = stylex.create({
  '2xs': {
    '--swatch-size': sizes._3_5,
  },
  xs: {
    '--swatch-size': sizes._4,
  },
  sm: {
    '--swatch-size': sizes._4_5,
  },
  md: {
    '--swatch-size': sizes._5,
  },
  lg: {
    '--swatch-size': sizes._6,
  },
  xl: {
    '--swatch-size': sizes._7,
  },
  '2xl': {
    '--swatch-size': sizes._8,
  },
  inherit: {
    '--swatch-size': 'inherit',
  },
  full: {
    '--swatch-size': '100%',
  },
})

export const colorSwatchShapes = stylex.create({
  square: {
    borderRadius: 'none',
  },
  circle: {
    borderRadius: radii.full,
  },
  rounded: {
    borderRadius: semanticRadii.l1,
  },
})

export type ColorSwatchSize = keyof typeof colorSwatchSizes

export type ColorSwatchShape = keyof typeof colorSwatchShapes

export const colorSwatchRecipe = {
  styles: colorSwatchStyles,
  sizes: colorSwatchSizes,
  shape: colorSwatchShapes,
  defaultVariants: {
    size: 'md',
    shape: 'rounded',
  },
} as const

export function colorSwatchRecipeStyles(variants?: {
  size?: ColorSwatchSize
  shape?: ColorSwatchShape
  colorPalette?: string
}) {
  const size = variants?.size ?? colorSwatchRecipe.defaultVariants.size
  const shape = variants?.shape ?? colorSwatchRecipe.defaultVariants.shape

  return [
    colorSwatchStyles.base,
    colorSwatchSizes[size],
    colorSwatchShapes[shape],
  ]
}

export type ColorSwatchVariantProps = Parameters<
  typeof colorSwatchRecipeStyles
>[0]
