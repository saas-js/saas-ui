/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const kbdGroupStyles = stylex.create({
  base: {
    display: 'inline-flex',
    gap: spacing._1,
    color: semanticColors.fgMuted,
  },
})

export const kbdGroupSizes = stylex.create({
  xs: {
    fontSize: '2xs',
  },
  sm: {
    fontSize: fontSizes.xs,
  },
  md: {
    fontSize: fontSizes.sm,
  },
  lg: {
    fontSize: fontSizes.md,
  },
})

export type KbdGroupSize = keyof typeof kbdGroupSizes

export const kbdGroupRecipe = {
  styles: kbdGroupStyles,
  sizes: kbdGroupSizes,
  defaultVariants: {
    size: 'sm',
  },
} as const

export function kbdGroupRecipeStyles(variants?: {
  size?: KbdGroupSize
  colorPalette?: string
}) {
  const size = variants?.size ?? kbdGroupRecipe.defaultVariants.size

  return [kbdGroupStyles.base, kbdGroupSizes[size]]
}

export type KbdGroupVariantProps = Parameters<typeof kbdGroupRecipeStyles>[0]
