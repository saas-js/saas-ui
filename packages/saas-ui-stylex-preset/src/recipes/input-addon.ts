/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const inputAddonStyles = stylex.create({
  base: {
    flex: '0 0 auto',
    width: 'auto',
    height: 'var(--input-height)',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
})

export const inputAddonSizes = stylex.create({
  xs: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2,
    '--input-height': sizes.controlXs,
  },
  sm: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2_5,
    '--input-height': sizes.controlSm,
  },
  md: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._3,
    '--input-height': sizes.controlMd,
  },
  lg: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._4_5,
    '--input-height': sizes.controlLg,
  },
  xl: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._6,
    '--input-height': sizes.controlXl,
  },
})

export const inputAddonVariants = stylex.create({
  outline: {
    border: '1px solid',
    borderColor: semanticColors.border,
    backgroundColor: semanticColors.bgMuted,
  },
  subtle: {
    border: '2px solid',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
  },
  flushed: {
    borderBottom: '1px solid',
    borderColor: 'inherit',
    borderRadius: 0,
    paddingInline: 0,
    backgroundColor: 'transparent',
  },
})

export const inputAddonTextStyles = {
  xs: textStyles.xs,
  sm: textStyles.sm,
  md: textStyles.sm,
  lg: textStyles.md,
  xl: textStyles.md,
} as const

export type InputAddonSize = keyof typeof inputAddonSizes

export type InputAddonVariant = keyof typeof inputAddonVariants

export const inputAddonRecipe = {
  styles: inputAddonStyles,
  sizes: inputAddonSizes,
  variants: inputAddonVariants,
  textStyles: inputAddonTextStyles,
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function inputAddonRecipeStyles(variants?: {
  size?: InputAddonSize
  variant?: InputAddonVariant
  colorPalette?: string
}) {
  const size = variants?.size ?? inputAddonRecipe.defaultVariants.size
  const variant = variants?.variant ?? inputAddonRecipe.defaultVariants.variant

  return [
    inputAddonStyles.base,
    inputAddonTextStyles[size],
    inputAddonSizes[size],
    inputAddonVariants[variant],
  ]
}

export type InputAddonVariantProps = Parameters<
  typeof inputAddonRecipeStyles
>[0]
