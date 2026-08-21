/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const statusRoot = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._2,
  },
})

export const statusRootSizes = stylex.create({
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

export const statusIndicator = stylex.create({
  base: {
    width: '0.64em',
    height: '0.64em',
    flexShrink: 0,
    borderRadius: radii.full,
    forcedColorAdjust: 'none',
    backgroundColor: colorPalette.solid,
  },
})

export type StatusSize = keyof typeof statusRootSizes

export const statusSlotRecipe = {
  slots: {
    root: {
      styles: statusRoot,
      sizes: statusRootSizes,
    },
    indicator: {
      styles: statusIndicator,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function statusSlotStyles(
  slot: keyof typeof statusSlotRecipe.slots,
  variants?: {
    size?: StatusSize
  },
) {
  const size = variants?.size ?? statusSlotRecipe.defaultVariants.size
  const def = statusSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
