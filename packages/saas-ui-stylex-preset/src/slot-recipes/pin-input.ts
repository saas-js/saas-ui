/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const pinInputInput = stylex.create({
  base: {
    width: 'var(--input-height)',
    minWidth: 'var(--input-height)',
    outline: 0,
    position: 'relative',
    appearance: 'none',
    textAlign: 'center',
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

export const pinInputInputSizes = stylex.create({
  xs: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingInline: 0,
    '--input-height': sizes.controlXs,
  },
  sm: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: 0,
    '--input-height': sizes.controlSm,
  },
  md: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: 0,
    '--input-height': sizes.controlMd,
  },
  lg: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: 0,
    '--input-height': sizes.controlLg,
  },
  xl: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: 0,
    '--input-height': sizes.controlXl,
  },
})

export const pinInputInputVariants = stylex.create({
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

export type PinInputSize = keyof typeof pinInputInputSizes

export type PinInputVariant = keyof typeof pinInputInputVariants

export const pinInputSlotRecipe = {
  slots: {
    input: {
      styles: pinInputInput,
      sizes: pinInputInputSizes,
      variants: pinInputInputVariants,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function pinInputSlotStyles(
  slot: keyof typeof pinInputSlotRecipe.slots,
  variants?: {
    size?: PinInputSize
    variant?: PinInputVariant
  },
) {
  const size = variants?.size ?? pinInputSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? pinInputSlotRecipe.defaultVariants.variant
  const def = pinInputSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
