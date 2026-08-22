/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '../semantic-tokens/colors.stylex.ts'

export const separatorStyles = stylex.create({
  base: {
    display: 'block',
    borderColor: semanticColors.border,
  },
})

export const separatorVariants = stylex.create({
  solid: {
    borderStyle: 'solid',
  },
  dashed: {
    borderStyle: 'dashed',
  },
  dotted: {
    borderStyle: 'dotted',
  },
})

export const separatorOrientations = stylex.create({
  vertical: {
    height: '100%',
    borderInlineStartWidth: 'var(--separator-thickness)',
  },
  horizontal: {
    width: '100%',
    borderTopWidth: 'var(--separator-thickness)',
  },
})

export const separatorSizes = stylex.create({
  xs: {
    '--separator-thickness': '0.5px',
  },
  sm: {
    '--separator-thickness': '1px',
  },
  md: {
    '--separator-thickness': '2px',
  },
  lg: {
    '--separator-thickness': '3px',
  },
})

export type SeparatorVariant = keyof typeof separatorVariants

export type SeparatorOrientation = keyof typeof separatorOrientations

export type SeparatorSize = keyof typeof separatorSizes

export const separatorRecipe = {
  styles: separatorStyles,
  variants: separatorVariants,
  orientation: separatorOrientations,
  sizes: separatorSizes,
  defaultVariants: {
    size: 'sm',
    variant: 'solid',
    orientation: 'horizontal',
  },
} as const

export function separatorRecipeStyles(variants?: {
  variant?: SeparatorVariant
  orientation?: SeparatorOrientation
  size?: SeparatorSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? separatorRecipe.defaultVariants.variant
  const orientation =
    variants?.orientation ?? separatorRecipe.defaultVariants.orientation
  const size = variants?.size ?? separatorRecipe.defaultVariants.size

  return [
    separatorStyles.base,
    separatorVariants[variant],
    separatorOrientations[orientation],
    separatorSizes[size],
  ]
}

export type SeparatorVariantProps = Parameters<typeof separatorRecipeStyles>[0]
