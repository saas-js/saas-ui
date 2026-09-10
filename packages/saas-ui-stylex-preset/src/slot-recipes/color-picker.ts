/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const colorPickerRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
  },
})

export const colorPickerLabel = stylex.create({
  base: {
    color: semanticColors.fg,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const colorPickerValueText = stylex.create({
  base: {
    textAlign: 'start',
  },
})

export const colorPickerControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing._2,
    position: 'relative',
  },
})

export const colorPickerSwatchTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const colorPickerTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexShrink: 0,
    gap: spacing._2,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minHeight: 'var(--input-height)',
    minWidth: 'var(--input-height)',
    paddingInline: spacing._1,
    borderRadius: semanticRadii.controlMd,
    ':disabled': {
      opacity: 0.5,
    },
    '--focus-color': colorPalette.focusRing,
  },
})

export const colorPickerTriggerSizes = stylex.create({
  '2xs': {
    '--input-height': sizes._5,
  },
  xs: {
    '--input-height': sizes._6,
  },
  sm: {
    '--input-height': sizes._7,
  },
  md: {
    '--input-height': sizes._8,
  },
  lg: {
    '--input-height': sizes._10,
  },
  xl: {
    '--input-height': sizes._12,
  },
  '2xl': {
    '--input-height': sizes._16,
  },
})

export const colorPickerTriggerVariants = stylex.create({
  outline: {
    borderWidth: '1px',
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
  },
})

export const colorPickerContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: sizes._64,
    padding: spacing._4,
    gap: spacing._3,
    '--color-picker-z-index': zIndices.layer3,
    zIndex: 'calc(var(--color-picker-z-index) + var(--layer-index, 0))',
  },
})

export const colorPickerArea = stylex.create({
  base: {
    height: '180px',
    borderRadius: semanticRadii.controlMd,
    overflow: 'hidden',
  },
})

export const colorPickerAreaSizes = stylex.create({
  '2xs': {
    '--thumb-size': sizes._3,
  },
  xs: {
    '--thumb-size': sizes._3_5,
  },
  sm: {
    '--thumb-size': sizes._3_5,
  },
  md: {
    '--thumb-size': sizes._3_5,
  },
  lg: {
    '--thumb-size': sizes._3_5,
  },
  xl: {
    '--thumb-size': sizes._3_5,
  },
  '2xl': {
    '--thumb-size': sizes._3_5,
  },
})

export const colorPickerAreaThumb = stylex.create({
  base: {
    borderRadius: radii.full,
    height: 'var(--thumb-size)',
    width: 'var(--thumb-size)',
    borderWidth: '2px',
    borderColor: colors.white,
    boxShadow: semanticShadows.sm,
    '--focus-ring-color': colors.white,
  },
})

export const colorPickerAreaBackground = stylex.create({
  base: {
    height: sizes.full,
  },
})

export const colorPickerChannelSlider = stylex.create({
  base: {
    borderRadius: semanticRadii.controlMd,
    flex: 1,
  },
})

export const colorPickerChannelSliderSizes = stylex.create({
  '2xs': {
    '--slider-height': sizes._3,
    '--thumb-size': sizes._3,
  },
  xs: {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
  sm: {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
  md: {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
  lg: {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
  xl: {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
  '2xl': {
    '--slider-height': sizes._3_5,
    '--thumb-size': sizes._3_5,
  },
})

export const colorPickerChannelSliderTrack = stylex.create({
  base: {
    height: 'var(--slider-height)',
    borderRadius: 'inherit',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
  },
})

export const colorPickerChannelText = stylex.create({
  base: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    color: semanticColors.fgMuted,
    fontWeight: fontWeights.medium,
    textTransform: 'capitalize',
  },
})

export const colorPickerSwatchGroup = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing._2,
  },
})

export const colorPickerSwatch = stylex.create({
  base: {
    width: 'var(--swatch-size)',
    height: 'var(--swatch-size)',
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    '--checker-size': '8px',
    '--checker-bg': semanticColors.bg,
    '--checker-fg': semanticColors.bgEmphasized,
    backgroundImage:
      'linear-gradient(var(--color), var(--color)), repeating-conic-gradient(var(--checker-fg) 0%, var(--checker-fg) 25%, var(--checker-bg) 0%, var(--checker-bg) 50%) 0% 50% / var(--checker-size) var(--checker-size) !important',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: semanticRadii.controlSm,
  },
})

export const colorPickerSwatchSizes = stylex.create({
  '2xs': {
    '--swatch-size': sizes._4_5,
  },
  xs: {
    '--swatch-size': sizes._5,
  },
  sm: {
    '--swatch-size': sizes._6,
  },
  md: {
    '--swatch-size': sizes._7,
  },
  lg: {
    '--swatch-size': sizes._7,
  },
  xl: {
    '--swatch-size': sizes._8,
  },
  '2xl': {
    '--swatch-size': sizes._10,
  },
})

export const colorPickerSwatchIndicator = stylex.create({
  base: {
    color: colors.white,
    borderRadius: radii.full,
  },
})

export const colorPickerChannelSliderThumb = stylex.create({
  base: {
    borderRadius: radii.full,
    height: 'var(--thumb-size)',
    width: 'var(--thumb-size)',
    borderWidth: '2px',
    borderColor: colors.white,
    boxShadow: semanticShadows.sm,
    transform: 'translate(-50%, -50%)',
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingOffset: '1px',
  },
})

export const colorPickerChannelInput = stylex.create({
  base: {
    width: '100%',
    minWidth: 'var(--input-height)',
    outline: 0,
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    height: 'var(--input-height)',
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const colorPickerChannelInputSizes = stylex.create({
  '2xs': {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingInline: spacing._2,
    '--input-height': sizes.controlXs,
  },
  xs: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingInline: spacing._2,
    '--input-height': sizes.controlXs,
  },
  sm: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._2_5,
    '--input-height': sizes.controlSm,
  },
  md: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._3,
    '--input-height': sizes.controlMd,
  },
  lg: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._4_5,
    '--input-height': sizes.controlLg,
  },
  xl: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._6,
    '--input-height': sizes.controlXl,
  },
  '2xl': {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._6,
    '--input-height': sizes.controlXl,
  },
})

export const colorPickerChannelInputVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: 0,
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
      ':focus-visible': {
        borderColor: 'var(--focus-ring-color)',
      },
    },
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export const colorPickerFormatSelect = stylex.create({
  base: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    textTransform: 'uppercase',
    borderWidth: '1px',
    minHeight: sizes._6,
    ':focus': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    borderRadius: semanticRadii.controlMd,
  },
})

export const colorPickerTransparencyGrid = stylex.create({
  base: {
    borderRadius: semanticRadii.controlMd,
  },
})

export const colorPickerView = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._2,
  },
})

export type ColorPickerSize = keyof typeof colorPickerTriggerSizes

export type ColorPickerVariant = keyof typeof colorPickerTriggerVariants

export const colorPickerSlotRecipe = {
  slots: {
    root: {
      styles: colorPickerRoot,
    },
    label: {
      styles: colorPickerLabel,
    },
    valueText: {
      styles: colorPickerValueText,
    },
    control: {
      styles: colorPickerControl,
    },
    swatchTrigger: {
      styles: colorPickerSwatchTrigger,
    },
    trigger: {
      styles: colorPickerTrigger,
      sizes: colorPickerTriggerSizes,
      variants: colorPickerTriggerVariants,
    },
    content: {
      styles: colorPickerContent,
    },
    area: {
      styles: colorPickerArea,
      sizes: colorPickerAreaSizes,
    },
    areaThumb: {
      styles: colorPickerAreaThumb,
    },
    areaBackground: {
      styles: colorPickerAreaBackground,
    },
    channelSlider: {
      styles: colorPickerChannelSlider,
      sizes: colorPickerChannelSliderSizes,
    },
    channelSliderTrack: {
      styles: colorPickerChannelSliderTrack,
    },
    channelText: {
      styles: colorPickerChannelText,
    },
    swatchGroup: {
      styles: colorPickerSwatchGroup,
    },
    swatch: {
      styles: colorPickerSwatch,
      sizes: colorPickerSwatchSizes,
    },
    swatchIndicator: {
      styles: colorPickerSwatchIndicator,
    },
    channelSliderThumb: {
      styles: colorPickerChannelSliderThumb,
    },
    channelInput: {
      styles: colorPickerChannelInput,
      sizes: colorPickerChannelInputSizes,
      variants: colorPickerChannelInputVariants,
    },
    formatSelect: {
      styles: colorPickerFormatSelect,
    },
    transparencyGrid: {
      styles: colorPickerTransparencyGrid,
    },
    view: {
      styles: colorPickerView,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function colorPickerSlotStyles(
  slot: keyof typeof colorPickerSlotRecipe.slots,
  variants?: {
    size?: ColorPickerSize
    variant?: ColorPickerVariant
  },
) {
  const size = variants?.size ?? colorPickerSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? colorPickerSlotRecipe.defaultVariants.variant
  const def = colorPickerSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
