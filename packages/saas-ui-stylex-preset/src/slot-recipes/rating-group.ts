/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { ratingGroupItemIndicatorIconVars } from './rating-group.stylex.ts'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'

export { ratingGroupItemIndicatorIconVars }

export const ratingGroupRoot = stylex.create({
  base: {
    display: 'inline-flex',
  },
})

export const ratingGroupControl = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
  },
})

export const ratingGroupItem = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
})

export const ratingGroupItemSizes = stylex.create({
  xs: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  sm: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  md: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
  lg: {
    fontSize: fontSizes._2xl,
    lineHeight: lineHeights._2xl,
  },
})

export const ratingGroupItemIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    position: 'relative',
    [ratingGroupItemIndicatorIconVars.stroke]: 'currentColor',
    [ratingGroupItemIndicatorIconVars.width]: '100%',
    [ratingGroupItemIndicatorIconVars.height]: '100%',
    [ratingGroupItemIndicatorIconVars.display]: 'inline-block',
    [ratingGroupItemIndicatorIconVars.flexShrink]: 0,
    [ratingGroupItemIndicatorIconVars.position]: 'absolute',
    [ratingGroupItemIndicatorIconVars.left]: 0,
    [ratingGroupItemIndicatorIconVars.top]: 0,
  },
})

export const ratingGroupItemIndicatorIcon = stylex.create({
  base: {
    stroke: ratingGroupItemIndicatorIconVars.stroke,
    width: ratingGroupItemIndicatorIconVars.width,
    height: ratingGroupItemIndicatorIconVars.height,
    display: ratingGroupItemIndicatorIconVars.display,
    flexShrink: ratingGroupItemIndicatorIconVars.flexShrink,
    position: ratingGroupItemIndicatorIconVars.position,
    left: ratingGroupItemIndicatorIconVars.left,
    top: ratingGroupItemIndicatorIconVars.top,
  },
})

export type RatingGroupSize = keyof typeof ratingGroupItemSizes

export const ratingGroupSlotRecipe = {
  slots: {
    root: {
      styles: ratingGroupRoot,
    },
    control: {
      styles: ratingGroupControl,
    },
    item: {
      styles: ratingGroupItem,
      sizes: ratingGroupItemSizes,
    },
    itemIndicator: {
      styles: ratingGroupItemIndicator,
      icon: {
        vars: ratingGroupItemIndicatorIconVars,
        styles: ratingGroupItemIndicatorIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function ratingGroupSlotStyles(
  slot: keyof typeof ratingGroupSlotRecipe.slots,
  variants?: {
    size?: RatingGroupSize
  },
) {
  const size = variants?.size ?? ratingGroupSlotRecipe.defaultVariants.size
  const def = ratingGroupSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
