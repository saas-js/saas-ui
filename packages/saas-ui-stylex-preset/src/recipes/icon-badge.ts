/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const iconBadgeStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const iconBadgeVariants = stylex.create({
  outline: {
    borderWidth: '1px',
    borderColor: colorPalette.subtle,
    color: colorPalette.fg,
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colors.white,
  },
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
  },
})

export const iconBadgeSizes = stylex.create({
  sm: {
    borderRadius: semanticRadii.control,
    fontSize: '0.9em',
    width: sizes.controlXs,
    height: sizes.controlXs,
  },
  md: {
    borderRadius: semanticRadii.control,
    fontSize: '1.1em',
    width: sizes.controlMd,
    height: sizes.controlMd,
  },
  lg: {
    borderRadius: semanticRadii.control,
    fontSize: '1.3em',
    width: sizes.controlLg,
    height: sizes.controlLg,
  },
  xl: {
    borderRadius: semanticRadii.control,
    fontSize: '1.5em',
    width: sizes.controlXl,
    height: sizes.controlXl,
  },
})

export type IconBadgeVariant = keyof typeof iconBadgeVariants

export type IconBadgeSize = keyof typeof iconBadgeSizes

export const iconBadgeRecipe = {
  styles: iconBadgeStyles,
  variants: iconBadgeVariants,
  sizes: iconBadgeSizes,
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
} as const

export function iconBadgeRecipeStyles(variants?: {
  variant?: IconBadgeVariant
  size?: IconBadgeSize
  colorPalette?: string
}) {
  const variant = variants?.variant ?? iconBadgeRecipe.defaultVariants.variant
  const size = variants?.size ?? iconBadgeRecipe.defaultVariants.size

  return [
    iconBadgeStyles.base,
    iconBadgeVariants[variant],
    iconBadgeSizes[size],
  ]
}

export type IconBadgeVariantProps = Parameters<typeof iconBadgeRecipeStyles>[0]
