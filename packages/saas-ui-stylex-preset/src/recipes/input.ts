/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export const inputStyles = stylex.create({
  base: {
    width: '100%',
    minWidth: 'var(--input-height)',
    outline: 0,
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    height: 'var(--input-height)',
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const inputSizes = stylex.create({
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

export const inputVariants = stylex.create({
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
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
      ':focus-visible': {
        borderColor: 'var(--focus-ring-color)',
      },
    },
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

export const inputTextStyles = {
  xs: textStyles.xs,
  sm: textStyles.sm,
  md: textStyles.sm,
  lg: textStyles.md,
  xl: textStyles.md,
} as const

export type InputSize = keyof typeof inputSizes

export type InputVariant = keyof typeof inputVariants

export const inputRecipe = {
  styles: inputStyles,
  sizes: inputSizes,
  variants: inputVariants,
  textStyles: inputTextStyles,
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function inputRecipeStyles(variants?: {
  size?: InputSize
  variant?: InputVariant
  colorPalette?: string
}) {
  const size = variants?.size ?? inputRecipe.defaultVariants.size
  const variant = variants?.variant ?? inputRecipe.defaultVariants.variant

  return [
    inputStyles.base,
    inputTextStyles[size],
    inputSizes[size],
    inputVariants[variant],
  ]
}

export type InputVariantProps = Parameters<typeof inputRecipeStyles>[0]
