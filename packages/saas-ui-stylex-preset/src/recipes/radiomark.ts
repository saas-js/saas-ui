/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { radiomarkDotVars } from './radiomark.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export { radiomarkDotVars }

export const radiomarkStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    verticalAlign: 'top',
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: radii.full,
    cursor: cursor.radio,
    ':focus-visible': {
      ':focus-visible': {
        outlineWidth: '1px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineColor: colorPalette.focusRing,
      },
    },
    ':invalid': {
      borderColor: semanticColors.borderDestructive,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: cursor.disabled,
    },
    [radiomarkDotVars.height]: '100%',
    [radiomarkDotVars.width]: '100%',
    [radiomarkDotVars.borderRadius]: radii.full,
    [radiomarkDotVars.backgroundColor]: 'currentColor',
    [radiomarkDotVars.scale]: 0.4,
  },
})

export const radiomarkVariants = stylex.create({
  solid: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':checked': {
      backgroundColor: colorPalette.solid,
      color: colorPalette.contrast,
      borderColor: colorPalette.solid,
    },
  },
  subtle: {
    borderWidth: '1px',
    backgroundColor: colorPalette.muted,
    borderColor: colorPalette.muted,
    color: 'transparent',
    ':checked': {
      color: colorPalette.fg,
    },
  },
  outline: {
    borderWidth: '1px',
    borderColor: 'inherit',
    ':checked': {
      color: colorPalette.fg,
      borderColor: colorPalette.solid,
    },
    [radiomarkDotVars.scale]: 0.6,
  },
  inverted: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: 'inherit',
    ':checked': {
      color: colorPalette.solid,
      borderColor: 'currentcolor',
    },
  },
})

export const radiomarkSizes = stylex.create({
  xs: {
    width: sizes._3,
    height: sizes._3,
  },
  sm: {
    width: sizes._3_5,
    height: sizes._3_5,
  },
  md: {
    width: sizes._4,
    height: sizes._4,
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
  },
})

export const radiomarkDot = stylex.create({
  base: {
    height: radiomarkDotVars.height,
    width: radiomarkDotVars.width,
    borderRadius: radiomarkDotVars.borderRadius,
    backgroundColor: radiomarkDotVars.backgroundColor,
    scale: radiomarkDotVars.scale,
  },
})

export type RadiomarkVariant = keyof typeof radiomarkVariants

export type RadiomarkSize = keyof typeof radiomarkSizes

export const radiomarkRecipe = {
  styles: radiomarkStyles,
  variants: radiomarkVariants,
  sizes: radiomarkSizes,
  dot: {
    vars: radiomarkDotVars,
    styles: radiomarkDot,
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
} as const

export function radiomarkRecipeStyles(variants?: {
  variant?: RadiomarkVariant
  size?: RadiomarkSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? radiomarkRecipe.defaultVariants.variant
  const size = variants?.size ?? radiomarkRecipe.defaultVariants.size

  return [
    radiomarkStyles.base,
    radiomarkVariants[variant],
    radiomarkSizes[size],
  ]
}

export type RadiomarkVariantProps = Parameters<typeof radiomarkRecipeStyles>[0]

export function radiomarkDotStyles() {
  return [radiomarkDot.base]
}
