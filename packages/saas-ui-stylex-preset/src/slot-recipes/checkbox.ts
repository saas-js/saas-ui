/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const checkboxRoot = stylex.create({
  base: {
    display: 'inline-flex',
    gap: spacing._2,
    alignItems: 'center',
    verticalAlign: 'top',
    position: 'relative',
  },
})

export const checkboxRootSizes = stylex.create({
  xs: {
    gap: spacing._1_5,
  },
  sm: {
    gap: spacing._2,
  },
  md: {
    gap: spacing._2_5,
  },
  lg: {
    gap: spacing._3,
  },
})

export const checkboxControl = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: semanticRadii.control,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':invalid': {
      borderColor: semanticColors.borderError,
    },
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkboxControlSizes = stylex.create({
  xs: {
    width: sizes._3,
    height: sizes._3,
  },
  sm: {
    width: sizes._3_5,
    height: sizes._3_5,
  },
  md: {
    width: sizes._4,
    height: sizes._4,
    padding: spacing._0_5,
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
    padding: spacing._0_5,
  },
})

export const checkboxControlVariants = stylex.create({
  outline: {
    borderColor: semanticColors.borderEmphasized,
  },
  solid: {
    borderColor: semanticColors.borderEmphasized,
  },
  subtle: {
    backgroundColor: colorPalette.muted,
    borderColor: colorPalette.emphasized,
  },
})

export const checkboxLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    userSelect: 'none',
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkboxLabelSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export type CheckboxSize = keyof typeof checkboxRootSizes

export type CheckboxVariant = keyof typeof checkboxControlVariants

export const checkboxSlotRecipe = {
  slots: {
    root: {
      styles: checkboxRoot,
      sizes: checkboxRootSizes,
    },
    control: {
      styles: checkboxControl,
      sizes: checkboxControlSizes,
      variants: checkboxControlVariants,
    },
    label: {
      styles: checkboxLabel,
      sizes: checkboxLabelSizes,
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
} as const

export function checkboxSlotStyles(
  slot: keyof typeof checkboxSlotRecipe.slots,
  variants?: {
    variant?: CheckboxVariant
    size?: CheckboxSize
  },
) {
  const variant =
    variants?.variant ?? checkboxSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? checkboxSlotRecipe.defaultVariants.size
  const def = checkboxSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
