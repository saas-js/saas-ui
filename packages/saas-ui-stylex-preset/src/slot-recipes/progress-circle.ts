/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { letterSpacings } from '../tokens/letter-spacings.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const progressCircleRoot = stylex.create({
  base: {
    display: 'inline-flex',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    position: 'relative',
  },
})

export const progressCircleCircle = stylex.create({
  base: {},
})

export const progressCircleCircleSizes = stylex.create({
  xs: {
    '--size': sizes._4,
    '--thickness': '3px',
  },
  sm: {
    '--size': sizes._6,
    '--thickness': '5px',
  },
  md: {
    '--size': sizes._10,
    '--thickness': '6px',
  },
  lg: {
    '--size': sizes._14,
    '--thickness': '7px',
  },
  xl: {
    '--size': sizes._16,
    '--thickness': '8px',
  },
})

export const progressCircleCircleTrack = stylex.create({
  base: {
    '--track-color': colorPalette.muted,
    stroke: 'var(--track-color)',
  },
})

export const progressCircleCircleRange = stylex.create({
  base: {
    stroke: colorPalette.solid,
    transitionProperty: 'stroke-dasharray',
    transitionDuration: '0.6s',
  },
})

export const progressCircleLabel = stylex.create({
  base: {
    display: 'inline-flex',
  },
})

export const progressCircleValueText = stylex.create({
  base: {
    lineHeight: 1,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacings.tight,
    fontVariantNumeric: 'tabular-nums',
  },
})

export const progressCircleValueTextSizes = stylex.create({
  xs: {
    fontSize: fontSizes._2xs,
    lineHeight: lineHeights._2xs,
  },
  sm: {
    fontSize: fontSizes._2xs,
    lineHeight: lineHeights._2xs,
  },
  md: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  lg: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  xl: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export type ProgressCircleSize = keyof typeof progressCircleCircleSizes

export const progressCircleSlotRecipe = {
  slots: {
    root: {
      styles: progressCircleRoot,
    },
    circle: {
      styles: progressCircleCircle,
      sizes: progressCircleCircleSizes,
    },
    circleTrack: {
      styles: progressCircleCircleTrack,
    },
    circleRange: {
      styles: progressCircleCircleRange,
    },
    label: {
      styles: progressCircleLabel,
    },
    valueText: {
      styles: progressCircleValueText,
      sizes: progressCircleValueTextSizes,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function progressCircleSlotStyles(
  slot: keyof typeof progressCircleSlotRecipe.slots,
  variants?: {
    size?: ProgressCircleSize
  },
) {
  const size = variants?.size ?? progressCircleSlotRecipe.defaultVariants.size
  const def = progressCircleSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
