/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fonts } from '../tokens/fonts.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const codeStyles = stylex.create({
  base: {
    fontFamily: fonts.mono,
    alignItems: 'center',
    display: 'inline-flex',
    borderRadius: semanticRadii.indicatorMd,
  },
})

export const codeVariants = stylex.create({
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  outline: {
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  surface: {
    backgroundColor: colorPalette.muted,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  plain: {
    color: colorPalette.fg,
  },
})

export const codeSizes = stylex.create({
  xs: {
    paddingInline: spacing._1,
    minHeight: sizes._4,
  },
  sm: {
    paddingInline: spacing._1_5,
    minHeight: sizes._5,
  },
  md: {
    paddingInline: spacing._2,
    minHeight: sizes._6,
  },
  lg: {
    paddingInline: spacing._2_5,
    minHeight: sizes._7,
  },
})

export const codeTextStyles = {
  xs: textStyles._2xs,
  sm: textStyles.xs,
  md: textStyles.sm,
  lg: textStyles.sm,
} as const

export type CodeVariant = keyof typeof codeVariants

export type CodeSize = keyof typeof codeSizes

export const codeRecipe = {
  styles: codeStyles,
  variants: codeVariants,
  sizes: codeSizes,
  textStyles: codeTextStyles,
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
  },
} as const

export function codeRecipeStyles(variants?: {
  variant?: CodeVariant
  size?: CodeSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? codeRecipe.defaultVariants.variant
  const size = variants?.size ?? codeRecipe.defaultVariants.size

  return [
    codeStyles.base,
    codeTextStyles[size],
    codeVariants[variant],
    codeSizes[size],
  ]
}

export type CodeVariantProps = Parameters<typeof codeRecipeStyles>[0]
