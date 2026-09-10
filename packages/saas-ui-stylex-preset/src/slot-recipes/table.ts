/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const tableRoot = stylex.create({
  base: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: sizes.full,
    textAlign: 'start',
    verticalAlign: 'top',
  },
})

export const tableRootSizes = stylex.create({
  sm: {
    '--table-cell-padding-x': spacing._1,
    '--control-height': sizes.controlSm,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    '--table-cell-padding-x': spacing._2,
    '--control-height': sizes.controlMd,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    '--table-cell-padding-x': spacing._4,
    '--control-height': sizes.controlLg,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const tableRootVariants = stylex.create({
  inset: {
    marginInline: 'calc(0px - var(--table-cell-padding-x))',
    width:
      'calc(100% + var(--table-cell-padding-x) + var(--table-cell-padding-x))',
  },
  outline: {
    boxShadow: '0 0 0 1px {colors.border}',
    overflow: 'hidden',
  },
})

export const tableRow = stylex.create({
  base: {},
})

export const tableRowVariants = stylex.create({
  line: {
    backgroundColor: 'transparent',
  },
  inset: {
    backgroundColor: 'transparent',
  },
  outline: {},
})

export const tableRowStripeds = stylex.create({
  true: {},
})

export const tableCell = stylex.create({
  base: {
    textAlign: 'start',
    alignItems: 'center',
  },
})

export const tableCellSizes = stylex.create({
  sm: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._1,
  },
  md: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._2,
  },
  lg: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._3,
  },
})

export const tableCellVariants = stylex.create({
  line: {
    borderBottomWidth: '1px',
  },
  inset: {
    borderBottomWidth: '1px',
  },
})

export const tableCellShowColumnBorders = stylex.create({
  true: {},
})

export const tableColumnHeader = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    textAlign: 'start',
    color: semanticColors.fg,
  },
})

export const tableColumnHeaderSizes = stylex.create({
  sm: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._1,
  },
  md: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._2,
  },
  lg: {
    paddingInline: 'var(--table-cell-padding-x)',
    paddingBlock: spacing._3,
  },
})

export const tableColumnHeaderVariants = stylex.create({
  line: {
    borderBottomWidth: '1px',
  },
  inset: {
    borderBottomWidth: '1px',
  },
  outline: {
    borderBottomWidth: '1px',
  },
})

export const tableColumnHeaderShowColumnBorders = stylex.create({
  true: {},
})

export const tableCaption = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export const tableFooter = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const tableFooterVariants = stylex.create({
  outline: {
    borderTopWidth: '1px',
  },
})

export const tableBody = stylex.create({
  base: {},
})

export const tableBodyInteractives = stylex.create({
  true: {},
})

export const tableHeader = stylex.create({
  base: {},
})

export const tableHeaderVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bgMuted,
  },
})

export const tableHeaderStickyHeaders = stylex.create({
  true: {},
})

export type TableInteractive = keyof typeof tableBodyInteractives

export type TableStickyHeader = keyof typeof tableHeaderStickyHeaders

export type TableStriped = keyof typeof tableRowStripeds

export type TableShowColumnBorder = keyof typeof tableCellShowColumnBorders

export type TableVariant = keyof typeof tableRootVariants

export type TableSize = keyof typeof tableRootSizes

export const tableSlotRecipe = {
  slots: {
    root: {
      styles: tableRoot,
      sizes: tableRootSizes,
      variants: tableRootVariants,
    },
    row: {
      styles: tableRow,
      variants: tableRowVariants,
      striped: tableRowStripeds,
    },
    cell: {
      styles: tableCell,
      sizes: tableCellSizes,
      variants: tableCellVariants,
      showColumnBorder: tableCellShowColumnBorders,
    },
    columnHeader: {
      styles: tableColumnHeader,
      sizes: tableColumnHeaderSizes,
      variants: tableColumnHeaderVariants,
      showColumnBorder: tableColumnHeaderShowColumnBorders,
    },
    caption: {
      styles: tableCaption,
    },
    footer: {
      styles: tableFooter,
      variants: tableFooterVariants,
    },
    body: {
      styles: tableBody,
      interactive: tableBodyInteractives,
    },
    header: {
      styles: tableHeader,
      variants: tableHeaderVariants,
      stickyHeader: tableHeaderStickyHeaders,
    },
  },
  defaultVariants: {
    variant: 'line',
    size: 'md',
  },
} as const

export function tableSlotStyles(
  slot: keyof typeof tableSlotRecipe.slots,
  variants?: {
    variant?: TableVariant
    size?: TableSize
  },
) {
  const variant = variants?.variant ?? tableSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? tableSlotRecipe.defaultVariants.size
  const def = tableSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
