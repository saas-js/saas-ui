/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const checkmarkStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: semanticRadii.control,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':invalid': {
      borderColor: semanticColors.borderError,
    },
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkmarkSizes = stylex.create({
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
    padding: spacing._0_5,
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
    padding: spacing._0_5,
  },
})

export const checkmarkVariants = stylex.create({
  solid: {
    borderColor: semanticColors.borderEmphasized,
  },
  outline: {
    borderColor: semanticColors.borderEmphasized,
  },
  subtle: {
    backgroundColor: colorPalette.muted,
    borderColor: colorPalette.emphasized,
  },
  plain: {},
  inverted: {
    borderColor: semanticColors.border,
    color: colorPalette.fg,
  },
})

export type CheckmarkSize = keyof typeof checkmarkSizes

export type CheckmarkVariant = keyof typeof checkmarkVariants

export const checkmarkRecipe = {
  styles: checkmarkStyles,
  sizes: checkmarkSizes,
  variants: checkmarkVariants,
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
} as const

export function checkmarkRecipeStyles(variants?: {
  size?: CheckmarkSize
  variant?: CheckmarkVariant
  colorPalette?: string
}) {
  const size = variants?.size ?? checkmarkRecipe.defaultVariants.size
  const variant = variants?.variant ?? checkmarkRecipe.defaultVariants.variant

  return [
    checkmarkStyles.base,
    checkmarkSizes[size],
    checkmarkVariants[variant],
  ]
}

export type CheckmarkVariantProps = Parameters<typeof checkmarkRecipeStyles>[0]
