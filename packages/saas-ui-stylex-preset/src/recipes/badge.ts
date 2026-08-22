/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const badgeStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radii.full,
    gap: spacing._1,
    fontWeight: fontWeights.medium,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
})

export const badgeVariants = stylex.create({
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

export const badgeSizes = stylex.create({
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

export const badgeTextStyles = {
  xs: textStyles._2xs,
  sm: textStyles.xs,
  md: textStyles.sm,
  lg: textStyles.sm,
} as const

export type BadgeVariant = keyof typeof badgeVariants

export type BadgeSize = keyof typeof badgeSizes

export const badgeRecipe = {
  styles: badgeStyles,
  variants: badgeVariants,
  sizes: badgeSizes,
  textStyles: badgeTextStyles,
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
  },
} as const

export function badgeRecipeStyles(variants?: {
  variant?: BadgeVariant
  size?: BadgeSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? badgeRecipe.defaultVariants.variant
  const size = variants?.size ?? badgeRecipe.defaultVariants.size

  return [
    badgeStyles.base,
    badgeTextStyles[size],
    badgeVariants[variant],
    badgeSizes[size],
  ]
}

export type BadgeVariantProps = Parameters<typeof badgeRecipeStyles>[0]
