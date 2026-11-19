/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const dateInputRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const dateInputLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    userSelect: 'none',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const dateInputControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    width: sizes.full,
  },
})

export const dateInputSegmentGroup = stylex.create({
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
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: spacing._0_5,
    cursor: 'text',
    fontVariantNumeric: 'tabular-nums',
  },
})

export const dateInputSegmentGroupSizes = stylex.create({
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
})

export const dateInputSegmentGroupVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
    focusVisibleRing: 'undefined',
    focusRingWidth: 0,
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
      ':focus-visible': {
        borderColor: 'var(--focus-ring-color)',
      },
    },
    ':focus': {
      borderColor: 'var(--focus-ring-color)',
    },
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
    focusVisibleRing: 'undefined',
    ':focus': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
  flushed: {
    backgroundColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomColor: semanticColors.border,
    borderRadius: 0,
    paddingInline: 0,
    ':focus': {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
      ':invalid': {
        borderColor: 'var(--error-color)',
        boxShadow: '0px 1px 0px 0px var(--error-color)',
      },
    },
  },
})

export const dateInputSegment = stylex.create({
  base: {
    borderRadius: semanticRadii.controlSm,
    paddingInline: spacing._0_5,
    outline: 'none',
  },
})

export const dateInputSegmentVariants = stylex.create({
  outline: {
    ':focus': {
      backgroundColor: colorPalette.subtle,
      color: colorPalette.fg,
    },
  },
  subtle: {
    ':focus': {
      backgroundColor: colorPalette.subtle,
      color: colorPalette.fg,
    },
  },
  flushed: {
    ':focus': {
      backgroundColor: colorPalette.subtle,
      color: colorPalette.fg,
    },
  },
})

export type DateInputSize = keyof typeof dateInputSegmentGroupSizes

export type DateInputVariant = keyof typeof dateInputSegmentGroupVariants

export const dateInputSlotRecipe = {
  slots: {
    root: {
      styles: dateInputRoot,
    },
    label: {
      styles: dateInputLabel,
    },
    control: {
      styles: dateInputControl,
    },
    segmentGroup: {
      styles: dateInputSegmentGroup,
      sizes: dateInputSegmentGroupSizes,
      variants: dateInputSegmentGroupVariants,
    },
    segment: {
      styles: dateInputSegment,
      variants: dateInputSegmentVariants,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function dateInputSlotStyles(
  slot: keyof typeof dateInputSlotRecipe.slots,
  variants?: {
    size?: DateInputSize
    variant?: DateInputVariant
  },
) {
  const size = variants?.size ?? dateInputSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? dateInputSlotRecipe.defaultVariants.variant
  const def = dateInputSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
