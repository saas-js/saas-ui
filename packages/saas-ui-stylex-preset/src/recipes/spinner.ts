/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { animations } from '../tokens/animations.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const spinnerStyles = stylex.create({
  base: {
    display: 'inline-block',
    borderColor: 'currentColor',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: radii.full,
    width: 'var(--spinner-size)',
    height: 'var(--spinner-size)',
    animation: animations.spin,
    animationDuration: 'slowest',
    '--spinner-track-color': 'transparent',
    borderBottomColor: 'var(--spinner-track-color)',
    borderInlineStartColor: 'var(--spinner-track-color)',
  },
})

export const spinnerSizes = stylex.create({
  inherit: {
    '--spinner-size': '1em',
  },
  xs: {
    '--spinner-size': sizes._3,
  },
  sm: {
    '--spinner-size': sizes._4,
  },
  md: {
    '--spinner-size': sizes._5,
  },
  lg: {
    '--spinner-size': sizes._8,
  },
  xl: {
    '--spinner-size': sizes._10,
  },
})

export type SpinnerSize = keyof typeof spinnerSizes

export const spinnerRecipe = {
  styles: spinnerStyles,
  sizes: spinnerSizes,
  defaultVariants: {
    size: 'md',
  },
} as const

export function spinnerRecipeStyles(variants?: {
  size?: SpinnerSize
  colorPalette?: string
}) {
  const size = variants?.size ?? spinnerRecipe.defaultVariants.size

  return [spinnerStyles.base, spinnerSizes[size]]
}

export type SpinnerVariantProps = Parameters<typeof spinnerRecipeStyles>[0]
