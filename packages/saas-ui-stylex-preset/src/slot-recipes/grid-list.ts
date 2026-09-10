/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { cursor } from '../tokens/cursor.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const gridListRoot = stylex.create({
  base: {
    position: 'relative',
  },
})

export const gridListRootSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing._0_5,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingBlock: spacing._1,
  },
})

export const gridListItem = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    userSelect: 'none',
    borderRadius: 'inherit',
    outline: 'none',
    ':focus-visible': {
      boxShadow: semanticShadows.outline,
    },
    ':disabled': {
      cursor: cursor.disabled,
      opacity: 0.5,
      ':hover': {
        backgroundColor: 'transparent',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'transparent',
        },
      },
      ':active': {
        backgroundColor: 'transparent',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
})

export const gridListItemSizes = stylex.create({
  sm: {
    paddingBlock: spacing._1,
    paddingInline: spacing._2,
    gap: spacing._1,
  },
  md: {
    paddingBlock: spacing._2,
    paddingInline: spacing._3,
    gap: spacing._2,
  },
})

export const gridListItemVariants = stylex.create({
  rounded: {
    borderRadius: radii.md,
    marginBottom: spacing._0_5,
  },
})

export const gridListItemInteractives = stylex.create({
  true: {
    cursor: cursor.button,
    transitionProperty: 'bg',
    transitionDuration: durations.fast,
    ':hover': {
      backgroundColor: semanticColors.bgSubtle,
    },
    ':active': {
      backgroundColor: semanticColors.bgSubtle,
    },
  },
})

export const gridListHeader = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    position: 'sticky',
    fontWeight: fontWeights.medium,
    color: semanticColors.fgSubtle,
  },
})

export const gridListHeaderSizes = stylex.create({
  sm: {
    paddingBlock: spacing._0_5,
    paddingInline: spacing._2,
  },
  md: {
    paddingBlock: spacing._1,
    paddingInline: spacing._3,
  },
})

export const gridListCell = stylex.create({
  base: {
    flexShrink: 0,
  },
})

export type GridListInteractive = keyof typeof gridListItemInteractives

export type GridListVariant = keyof typeof gridListItemVariants

export type GridListSize = keyof typeof gridListRootSizes

export const gridListSlotRecipe = {
  slots: {
    root: {
      styles: gridListRoot,
      sizes: gridListRootSizes,
    },
    item: {
      styles: gridListItem,
      sizes: gridListItemSizes,
      variants: gridListItemVariants,
      interactive: gridListItemInteractives,
    },
    header: {
      styles: gridListHeader,
      sizes: gridListHeaderSizes,
    },
    cell: {
      styles: gridListCell,
    },
  },
  defaultVariants: {
    variant: 'simple',
    size: 'md',
  },
} as const

export function gridListSlotStyles(
  slot: keyof typeof gridListSlotRecipe.slots,
  variants?: {
    variant?: GridListVariant
    size?: GridListSize
  },
) {
  const variant =
    variants?.variant ?? gridListSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? gridListSlotRecipe.defaultVariants.size
  const def = gridListSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
