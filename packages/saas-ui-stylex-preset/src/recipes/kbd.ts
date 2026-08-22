/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { fonts } from '../tokens/fonts.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const kbdStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: fontWeights.medium,
    fontFamily: fonts.body,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    wordSpacing: '-0.5em',
    userSelect: 'none',
    paddingInline: spacing._1,
    borderRadius: semanticRadii.indicatorMd,
  },
})

export const kbdVariants = stylex.create({
  raised: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
    borderWidth: '1px',
    borderBottomWidth: '2px',
    borderColor: colorPalette.muted,
  },
  outline: {
    borderWidth: '1px',
    color: colorPalette.fg,
  },
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
  },
  plain: {
    color: colorPalette.fg,
  },
})

export const kbdSizes = stylex.create({
  xs: {
    height: 'calc(3.75 * 0.25rem * var(--scale-factor, 1))',
  },
  sm: {
    height: sizes._4,
  },
  md: {
    height: sizes._4_5,
  },
  lg: {
    height: sizes._5,
  },
})

export const kbdTextStyles = {
  xs: textStyles._2xs,
  sm: textStyles.xs,
  md: textStyles.sm,
  lg: textStyles.sm,
} as const

export type KbdVariant = keyof typeof kbdVariants

export type KbdSize = keyof typeof kbdSizes

export const kbdRecipe = {
  styles: kbdStyles,
  variants: kbdVariants,
  sizes: kbdSizes,
  textStyles: kbdTextStyles,
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
} as const

export function kbdRecipeStyles(variants?: {
  variant?: KbdVariant
  size?: KbdSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? kbdRecipe.defaultVariants.variant
  const size = variants?.size ?? kbdRecipe.defaultVariants.size

  return [
    kbdStyles.base,
    kbdTextStyles[size],
    kbdVariants[variant],
    kbdSizes[size],
  ]
}

export type KbdVariantProps = Parameters<typeof kbdRecipeStyles>[0]
