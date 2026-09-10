/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const progressRoot = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    position: 'relative',
  },
})

export const progressTrack = stylex.create({
  base: {
    overflow: 'hidden',
    position: 'relative',
  },
})

export const progressTrackSizes = stylex.create({
  xs: {
    height: sizes._1_5,
  },
  sm: {
    height: sizes._2,
  },
  md: {
    height: sizes._2_5,
  },
  lg: {
    height: sizes._3,
  },
  xl: {
    height: sizes._4,
  },
})

export const progressTrackVariants = stylex.create({
  outline: {
    boxShadow: semanticShadows.inset,
    backgroundColor: semanticColors.bgSubtle,
  },
  subtle: {
    backgroundColor: colorPalette.muted,
  },
})

export const progressTrackShapes = stylex.create({
  rounded: {
    borderRadius: semanticRadii.control,
  },
  full: {
    borderRadius: radii.full,
  },
})

export const progressRange = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'width, height',
    transitionDuration: durations.slow,
    height: '100%',
    backgroundColor: 'var(--track-color)',
  },
})

export const progressRangeVariants = stylex.create({
  outline: {
    backgroundColor: colorPalette.solid,
  },
  subtle: {
    backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 72%, transparent)`,
  },
})

export const progressRangeStripeds = stylex.create({
  true: {
    backgroundImage:
      'linear-gradient(45deg, var(--stripe-color) 25%, transparent 25%, transparent 50%, var(--stripe-color) 50%, var(--stripe-color) 75%, transparent 75%, transparent)',
    backgroundSize: 'var(--stripe-size) var(--stripe-size)',
    '--stripe-size': '1rem',
    '--stripe-color': '[object Object]',
  },
})

export const progressRangeAnimateds = stylex.create({
  true: {
    '--animate-from': 'var(--stripe-size)',
    animation: 'bg-position 1s linear infinite',
  },
})

export const progressLabel = stylex.create({
  base: {
    display: 'inline-flex',
    fontWeight: fontWeights.medium,
  },
})

export const progressValueText = stylex.create({
  base: {
    fontSize: fontSizes.xs,
    lineHeight: 1,
    fontWeight: fontWeights.medium,
  },
})

export type ProgressVariant = keyof typeof progressTrackVariants

export type ProgressShape = keyof typeof progressTrackShapes

export type ProgressStriped = keyof typeof progressRangeStripeds

export type ProgressAnimated = keyof typeof progressRangeAnimateds

export type ProgressSize = keyof typeof progressTrackSizes

export const progressSlotRecipe = {
  slots: {
    root: {
      styles: progressRoot,
    },
    track: {
      styles: progressTrack,
      sizes: progressTrackSizes,
      variants: progressTrackVariants,
      shape: progressTrackShapes,
    },
    range: {
      styles: progressRange,
      variants: progressRangeVariants,
      striped: progressRangeStripeds,
      animated: progressRangeAnimateds,
    },
    label: {
      styles: progressLabel,
    },
    valueText: {
      styles: progressValueText,
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    shape: 'rounded',
  },
} as const

export function progressSlotStyles(
  slot: keyof typeof progressSlotRecipe.slots,
  variants?: {
    variant?: ProgressVariant
    size?: ProgressSize
    shape?: ProgressShape
  },
) {
  const variant =
    variants?.variant ?? progressSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? progressSlotRecipe.defaultVariants.size
  const shape = variants?.shape ?? progressSlotRecipe.defaultVariants.shape
  const def = progressSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'shape' in def ? def.shape[shape as keyof typeof def.shape] : false,
  ]
}
