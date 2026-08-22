/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const textareaStyles = stylex.create({
  base: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const textareaSizes = stylex.create({
  xs: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2,
    paddingBlock: spacing._1,
    scrollPaddingBottom: 1,
  },
  sm: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2_5,
    paddingBlock: spacing._1_5,
    scrollPaddingBottom: 1.5,
  },
  md: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._3,
    paddingBlock: spacing._1_5,
    scrollPaddingBottom: 1.5,
  },
  lg: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._4,
    paddingBlock: spacing._2,
    scrollPaddingBottom: 2,
  },
  xl: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._4_5,
    paddingBlock: spacing._3_5,
    scrollPaddingBottom: 3.5,
  },
})

export const textareaVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: 0,
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
  flushed: {
    backgroundColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomColor: semanticColors.border,
    borderRadius: 0,
    paddingInline: 0,
    ':focus-visible': {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
    },
  },
})

export const textareaTextStyles = {
  xs: textStyles.xs,
  sm: textStyles.sm,
  md: textStyles.sm,
  lg: textStyles.md,
  xl: textStyles.md,
} as const

export type TextareaSize = keyof typeof textareaSizes

export type TextareaVariant = keyof typeof textareaVariants

export const textareaRecipe = {
  styles: textareaStyles,
  sizes: textareaSizes,
  variants: textareaVariants,
  textStyles: textareaTextStyles,
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function textareaRecipeStyles(variants?: {
  size?: TextareaSize
  variant?: TextareaVariant
  colorPalette?: string
}) {
  const size = variants?.size ?? textareaRecipe.defaultVariants.size
  const variant = variants?.variant ?? textareaRecipe.defaultVariants.variant

  return [
    textareaStyles.base,
    textareaTextStyles[size],
    textareaSizes[size],
    textareaVariants[variant],
  ]
}

export type TextareaVariantProps = Parameters<typeof textareaRecipeStyles>[0]
