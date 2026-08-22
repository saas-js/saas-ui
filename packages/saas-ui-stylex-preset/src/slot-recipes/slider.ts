/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const sliderRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1,
    fontSize: fontSizes.sm,
    position: 'relative',
    isolation: 'isolate',
    touchAction: 'none',
  },
})

export const sliderRootSizes = stylex.create({
  sm: {
    '--slider-thumb-size': sizes._4,
    '--slider-track-size': sizes._1_5,
    '--slider-marker-top': '6px',
    '--slider-marker-size': sizes._1,
    '--slider-marker-inset': '3px',
  },
  md: {
    '--slider-thumb-size': sizes._5,
    '--slider-track-size': sizes._2,
    '--slider-marker-top': '8px',
    '--slider-marker-size': sizes._1,
    '--slider-marker-inset': '4px',
  },
  lg: {
    '--slider-thumb-size': sizes._6,
    '--slider-track-size': sizes._2_5,
    '--slider-marker-top': '9px',
    '--slider-marker-size': sizes._1_5,
    '--slider-marker-inset': '5px',
  },
})

export const sliderRootOrientations = stylex.create({
  vertical: {
    display: 'inline-flex',
  },
})

export const sliderControl = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
  },
})

export const sliderControlOrientations = stylex.create({
  vertical: {
    flexDirection: 'column',
    height: '100%',
    minWidth: 'var(--slider-thumb-size)',
  },
  horizontal: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 'var(--slider-thumb-size)',
  },
})

export const sliderTrack = stylex.create({
  base: {
    overflow: 'hidden',
    borderRadius: radii.full,
    flex: 1,
  },
})

export const sliderTrackVariants = stylex.create({
  outline: {
    boxShadow: semanticShadows.inset,
    backgroundColor: `color-mix(in oklch, ${semanticColors.bgEmphasized} 72%, transparent)`,
  },
  solid: {
    backgroundColor: colorPalette.subtle,
    ':disabled': {
      backgroundColor: semanticColors.bgMuted,
    },
  },
})

export const sliderTrackOrientations = stylex.create({
  vertical: {
    width: 'var(--slider-track-size)',
  },
  horizontal: {
    height: 'var(--slider-track-size)',
  },
})

export const sliderRange = stylex.create({
  base: {
    width: 'inherit',
    height: 'inherit',
    ':disabled': {
      backgroundColor: 'semanticColors.borderEmphasized!',
    },
  },
})

export const sliderRangeVariants = stylex.create({
  outline: {
    backgroundColor: colorPalette.solid,
  },
  solid: {
    backgroundColor: colorPalette.solid,
  },
})

export const sliderMarkerGroup = stylex.create({
  base: {
    position: 'absolute!',
    top: 'var(--slider-marker-top)',
    insetInline: 'var(--slider-marker-inset)',
    zIndex: 1,
  },
})

export const sliderMarker = stylex.create({
  base: {
    '--marker-bg': '[object Object]',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing._1_5,
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
  },
})

export const sliderMarkerIndicator = stylex.create({
  base: {
    width: 'var(--slider-marker-size)',
    height: 'var(--slider-marker-size)',
    borderRadius: radii.full,
    backgroundColor: 'var(--marker-bg)',
  },
})

export const sliderThumb = stylex.create({
  base: {
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    zIndex: 2,
    borderRadius: radii.full,
    ':focus-visible': {
      ring: '2px',
      ringColor: colorPalette.focusRing,
      ringOffset: '2px',
      ringOffsetColor: semanticColors.bg,
    },
  },
})

export const sliderThumbVariants = stylex.create({
  outline: {
    borderWidth: '2px',
    borderColor: colorPalette.solid,
    backgroundColor: semanticColors.bg,
    ':disabled': {
      backgroundColor: semanticColors.borderEmphasized,
      borderColor: semanticColors.borderEmphasized,
    },
  },
  solid: {
    backgroundColor: colorPalette.solid,
    ':disabled': {
      backgroundColor: semanticColors.borderEmphasized,
    },
  },
})

export const sliderThumbOrientations = stylex.create({
  vertical: {
    left: '50%',
    translate: '-50% 0',
  },
  horizontal: {
    top: '50%',
    translate: '0 -50%',
  },
})

export type SliderSize = keyof typeof sliderRootSizes

export type SliderVariant = keyof typeof sliderTrackVariants

export type SliderOrientation = keyof typeof sliderRootOrientations

export const sliderSlotRecipe = {
  slots: {
    root: {
      styles: sliderRoot,
      sizes: sliderRootSizes,
      orientation: sliderRootOrientations,
    },
    control: {
      styles: sliderControl,
      orientation: sliderControlOrientations,
    },
    track: {
      styles: sliderTrack,
      variants: sliderTrackVariants,
      orientation: sliderTrackOrientations,
    },
    range: {
      styles: sliderRange,
      variants: sliderRangeVariants,
    },
    markerGroup: {
      styles: sliderMarkerGroup,
    },
    marker: {
      styles: sliderMarker,
    },
    markerIndicator: {
      styles: sliderMarkerIndicator,
    },
    thumb: {
      styles: sliderThumb,
      variants: sliderThumbVariants,
      orientation: sliderThumbOrientations,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    orientation: 'horizontal',
  },
} as const

export function sliderSlotStyles(
  slot: keyof typeof sliderSlotRecipe.slots,
  variants?: {
    size?: SliderSize
    variant?: SliderVariant
    orientation?: SliderOrientation
  },
) {
  const size = variants?.size ?? sliderSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? sliderSlotRecipe.defaultVariants.variant
  const orientation =
    variants?.orientation ?? sliderSlotRecipe.defaultVariants.orientation
  const def = sliderSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'orientation' in def
      ? def.orientation[orientation as keyof typeof def.orientation]
      : false,
  ]
}
