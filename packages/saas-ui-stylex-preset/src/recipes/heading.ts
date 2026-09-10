/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { fonts } from '../tokens/fonts.stylex.ts'
import { letterSpacings } from '../tokens/letter-spacings.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'

export const headingStyles = stylex.create({
  base: {
    fontFamily: fonts.heading,
    fontWeight: fontWeights.medium,
  },
})

export const headingSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.heading_xs,
    letterSpacing: letterSpacings.heading_xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.heading_sm,
    letterSpacing: letterSpacings.heading_sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.heading_md,
    letterSpacing: letterSpacings.heading_md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.heading_lg,
    letterSpacing: letterSpacings.heading_lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.heading_xl,
    letterSpacing: letterSpacings.heading_xl,
  },
  '2xl': {
    fontSize: '2xl',
    lineHeight: lineHeights.heading_2xl,
    letterSpacing: letterSpacings.heading_2xl,
  },
  '3xl': {
    fontSize: '3xl',
    lineHeight: lineHeights.heading_3xl,
    letterSpacing: letterSpacings.heading_3xl,
  },
  '4xl': {
    fontSize: '4xl',
    lineHeight: lineHeights.heading_4xl,
    letterSpacing: letterSpacings.heading_4xl,
  },
  '5xl': {
    fontSize: '5xl',
    lineHeight: lineHeights.heading_5xl,
    letterSpacing: letterSpacings.heading_5xl,
  },
  '6xl': {
    fontSize: '6xl',
    lineHeight: lineHeights.heading_6xl,
    letterSpacing: letterSpacings.heading_6xl,
  },
  '7xl': {
    fontSize: '7xl',
    lineHeight: lineHeights.heading_7xl,
    letterSpacing: letterSpacings.heading_7xl,
  },
})

export type HeadingSize = keyof typeof headingSizes

export const headingRecipe = {
  styles: headingStyles,
  sizes: headingSizes,
  defaultVariants: {
    size: 'xl',
  },
} as const

export function headingRecipeStyles(variants?: {
  size?: HeadingSize
  colorPalette?: string
}) {
  const size = variants?.size ?? headingRecipe.defaultVariants.size

  return [headingStyles.base, headingSizes[size]]
}

export type HeadingVariantProps = Parameters<typeof headingRecipeStyles>[0]
