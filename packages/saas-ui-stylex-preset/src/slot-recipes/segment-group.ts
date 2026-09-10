/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colors } from '../tokens/colors.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const segmentGroupRoot = stylex.create({
  base: {
    borderRadius: 'var(--segment-radius)',
    display: 'inline-flex',
    boxShadow: semanticShadows.inset,
    minWidth: 'max-content',
    textAlign: 'center',
    position: 'relative',
    isolation: 'isolate',
    backgroundColor: semanticColors.bgMuted,
    borderWidth: '1px',
  },
})

export const segmentGroupRootSizes = stylex.create({
  xs: {
    '--segment-radius': semanticRadii.control,
    height: sizes.controlXs,
  },
  sm: {
    '--segment-radius': semanticRadii.control,
    height: sizes.controlSm,
  },
  md: {
    '--segment-radius': semanticRadii.control,
    height: sizes.controlMd,
  },
  lg: {
    '--segment-radius': semanticRadii.control,
    height: sizes.controlLg,
  },
})

export const segmentGroupItem = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: fontSizes.sm,
    position: 'relative',
    color: semanticColors.fgSubtle,
    cursor: cursor.button,
    borderRadius: 'var(--segment-radius)',
    ':disabled': {
      opacity: 0.5,
    },
    ':hover': {
      color: semanticColors.fg,
    },
    '::before': {
      content: '""',
      position: 'absolute',
      insetInlineStart: 0,
      insetBlock: 0,
      backgroundColor: semanticColors.border,
      width: '1px',
      transition: 'opacity 0.2s',
    },
    ':checked': {
      color: semanticColors.fg,
    },
  },
})

export const segmentGroupItemSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingInline: spacing._3,
    gap: spacing._1,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._4,
    gap: spacing._2,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._4,
    gap: spacing._2,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._5,
    gap: spacing._3,
  },
})

export const segmentGroupIndicator = stylex.create({
  base: {
    pos: 'absolute',
    backgroundColor:
      'light-dark(semanticColors.bg, semanticColors.bgEmphasized)',
    width: 'var(--width)',
    height: 'var(--height)',
    top: 'var(--top)',
    left: 'var(--left)',
    zIndex: -1,
    borderRadius: 'var(--segment-radius)',
    boxShadow: '0 0 0 1px {colors.border.emphasized}',
  },
})

export type SegmentGroupSize = keyof typeof segmentGroupRootSizes

export const segmentGroupSlotRecipe = {
  slots: {
    root: {
      styles: segmentGroupRoot,
      sizes: segmentGroupRootSizes,
    },
    item: {
      styles: segmentGroupItem,
      sizes: segmentGroupItemSizes,
    },
    indicator: {
      styles: segmentGroupIndicator,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function segmentGroupSlotStyles(
  slot: keyof typeof segmentGroupSlotRecipe.slots,
  variants?: {
    size?: SegmentGroupSize
  },
) {
  const size = variants?.size ?? segmentGroupSlotRecipe.defaultVariants.size
  const def = segmentGroupSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
