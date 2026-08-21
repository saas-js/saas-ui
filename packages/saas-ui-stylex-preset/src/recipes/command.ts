/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const commandStyles = stylex.create({
  base: {
    display: 'inline-flex',
    gap: spacing._1,
    color: semanticColors.fgMuted,
  },
})

export const commandSizes = stylex.create({
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

export type CommandSize = keyof typeof commandSizes

export const commandRecipe = {
  styles: commandStyles,
  sizes: commandSizes,
  defaultVariants: {
    size: 'sm',
  },
} as const

export function commandRecipeStyles(variants?: {
  size?: CommandSize
  colorPalette?: string
}) {
  const size = variants?.size ?? commandRecipe.defaultVariants.size

  return [commandStyles.base, commandSizes[size]]
}

export type CommandVariantProps = Parameters<typeof commandRecipeStyles>[0]
