/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { radioGroupItemControlDotVars } from './radio-group.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { radioGroupItemControlDotVars }

export const radioGroupItem = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    fontWeight: fontWeights.medium,
    ':disabled': {
      cursor: cursor.disabled,
    },
  },
})

export const radioGroupItemSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    gap: spacing._1_5,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    gap: spacing._2,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    gap: spacing._2_5,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    gap: spacing._3,
  },
})

export const radioGroupItemControl = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    verticalAlign: 'top',
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: radii.full,
    cursor: cursor.radio,
    ':focus-visible': {
      ':focus-visible': {
        outlineWidth: '1px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineColor: colorPalette.focusRing,
      },
    },
    ':invalid': {
      borderColor: semanticColors.borderDestructive,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: cursor.disabled,
    },
    [radioGroupItemControlDotVars.height]: '100%',
    [radioGroupItemControlDotVars.width]: '100%',
    [radioGroupItemControlDotVars.borderRadius]: radii.full,
    [radioGroupItemControlDotVars.backgroundColor]: 'currentColor',
    [radioGroupItemControlDotVars.scale]: 0.4,
  },
})

export const radioGroupItemControlSizes = stylex.create({
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
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
  },
})

export const radioGroupItemControlVariants = stylex.create({
  outline: {
    borderWidth: '1px',
    borderColor: 'inherit',
    ':checked': {
      color: colorPalette.fg,
      borderColor: colorPalette.solid,
    },
    [radioGroupItemControlDotVars.scale]: 0.6,
  },
  subtle: {
    borderWidth: '1px',
    backgroundColor: colorPalette.muted,
    borderColor: colorPalette.muted,
    color: 'transparent',
    ':checked': {
      color: colorPalette.fg,
    },
  },
  solid: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':checked': {
      backgroundColor: colorPalette.solid,
      color: colorPalette.contrast,
      borderColor: colorPalette.solid,
    },
  },
})

export const radioGroupItemControlDot = stylex.create({
  base: {
    height: radioGroupItemControlDotVars.height,
    width: radioGroupItemControlDotVars.width,
    borderRadius: radioGroupItemControlDotVars.borderRadius,
    backgroundColor: radioGroupItemControlDotVars.backgroundColor,
    scale: radioGroupItemControlDotVars.scale,
  },
})

export const radioGroupLabel = stylex.create({
  base: {
    userSelect: 'none',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export type RadioGroupVariant = keyof typeof radioGroupItemControlVariants

export type RadioGroupSize = keyof typeof radioGroupItemSizes

export const radioGroupSlotRecipe = {
  slots: {
    item: {
      styles: radioGroupItem,
      sizes: radioGroupItemSizes,
    },
    itemControl: {
      styles: radioGroupItemControl,
      sizes: radioGroupItemControlSizes,
      variants: radioGroupItemControlVariants,
      dot: {
        vars: radioGroupItemControlDotVars,
        styles: radioGroupItemControlDot,
      },
    },
    label: {
      styles: radioGroupLabel,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
} as const

export function radioGroupSlotStyles(
  slot: keyof typeof radioGroupSlotRecipe.slots,
  variants?: {
    size?: RadioGroupSize
    variant?: RadioGroupVariant
  },
) {
  const size = variants?.size ?? radioGroupSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? radioGroupSlotRecipe.defaultVariants.variant
  const def = radioGroupSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
