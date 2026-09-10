/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const fieldsetRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: sizes.full,
  },
})

export const fieldsetRootSizes = stylex.create({
  sm: {},
  md: {},
  lg: {},
})

export const fieldsetContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: sizes.full,
  },
})

export const fieldsetContentSizes = stylex.create({
  sm: {
    gap: spacing._1_5,
  },
  md: {
    gap: spacing._4,
  },
  lg: {
    gap: spacing._4,
  },
})

export const fieldsetLegend = stylex.create({
  base: {
    color: semanticColors.fg,
    fontWeight: fontWeights.medium,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const fieldsetLegendSizes = stylex.create({
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

export const fieldsetHelperText = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const fieldsetErrorText = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: semanticColors.fgError,
    gap: spacing._2,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export type FieldsetSize = keyof typeof fieldsetRootSizes

export const fieldsetSlotRecipe = {
  slots: {
    root: {
      styles: fieldsetRoot,
      sizes: fieldsetRootSizes,
    },
    content: {
      styles: fieldsetContent,
      sizes: fieldsetContentSizes,
    },
    legend: {
      styles: fieldsetLegend,
      sizes: fieldsetLegendSizes,
    },
    helperText: {
      styles: fieldsetHelperText,
    },
    errorText: {
      styles: fieldsetErrorText,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function fieldsetSlotStyles(
  slot: keyof typeof fieldsetSlotRecipe.slots,
  variants?: {
    size?: FieldsetSize
  },
) {
  const size = variants?.size ?? fieldsetSlotRecipe.defaultVariants.size
  const def = fieldsetSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
