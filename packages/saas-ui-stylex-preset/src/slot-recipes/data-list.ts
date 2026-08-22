/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const dataListItemLabel = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    display: 'flex',
    alignItems: 'center',
    gap: spacing._1,
  },
})

export const dataListItemLabelVariants = stylex.create({
  subtle: {
    color: semanticColors.fgMuted,
  },
  bold: {
    fontWeight: fontWeights.medium,
  },
})

export const dataListItemLabelOrientations = stylex.create({
  horizontal: {
    minWidth: 'var(--label-width, 120px)',
  },
})

export const dataListItemValue = stylex.create({
  base: {
    display: 'flex',
    minWidth: 0,
    flex: 1,
  },
})

export const dataListItemValueVariants = stylex.create({
  bold: {
    color: semanticColors.fgMuted,
  },
})

export const dataListRoot = stylex.create({
  base: {},
})

export const dataListRootSizes = stylex.create({
  sm: {
    gap: spacing._3,
  },
  md: {
    gap: spacing._4,
  },
  lg: {
    gap: spacing._5,
  },
})

export const dataListRootOrientations = stylex.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'column',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const dataListItem = stylex.create({
  base: {},
})

export const dataListItemSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
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

export const dataListItemOrientations = stylex.create({
  horizontal: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._4,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1,
  },
})

export type DataListOrientation = keyof typeof dataListItemLabelOrientations

export type DataListSize = keyof typeof dataListRootSizes

export type DataListVariant = keyof typeof dataListItemLabelVariants

export const dataListSlotRecipe = {
  slots: {
    itemLabel: {
      styles: dataListItemLabel,
      variants: dataListItemLabelVariants,
      orientation: dataListItemLabelOrientations,
    },
    itemValue: {
      styles: dataListItemValue,
      variants: dataListItemValueVariants,
    },
    root: {
      styles: dataListRoot,
      sizes: dataListRootSizes,
      orientation: dataListRootOrientations,
    },
    item: {
      styles: dataListItem,
      sizes: dataListItemSizes,
      orientation: dataListItemOrientations,
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    variant: 'subtle',
  },
} as const

export function dataListSlotStyles(
  slot: keyof typeof dataListSlotRecipe.slots,
  variants?: {
    size?: DataListSize
    orientation?: DataListOrientation
    variant?: DataListVariant
  },
) {
  const size = variants?.size ?? dataListSlotRecipe.defaultVariants.size
  const orientation =
    variants?.orientation ?? dataListSlotRecipe.defaultVariants.orientation
  const variant =
    variants?.variant ?? dataListSlotRecipe.defaultVariants.variant
  const def = dataListSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'orientation' in def
      ? def.orientation[orientation as keyof typeof def.orientation]
      : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
