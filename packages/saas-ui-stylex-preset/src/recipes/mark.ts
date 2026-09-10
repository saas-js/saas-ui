/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'

export const markStyles = stylex.create({
  base: {
    backgroundColor: 'transparent',
    color: 'inherit',
    whiteSpace: 'nowrap',
  },
})

export const markVariants = stylex.create({
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: 'inherit',
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  text: {
    fontWeight: fontWeights.medium,
  },
  plain: {},
})

export type MarkVariant = keyof typeof markVariants

export const markRecipe = {
  styles: markStyles,
  variants: markVariants,
  defaultVariants: {},
} as const

export function markRecipeStyles(variants?: {
  variant?: MarkVariant
  colorPalette?: string
}) {
  const variant = variants?.variant ?? 'subtle'

  return [markStyles.base, markVariants[variant]]
}

export type MarkVariantProps = Parameters<typeof markRecipeStyles>[0]
