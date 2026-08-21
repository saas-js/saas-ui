/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { nativeSelectIndicatorIconVars } from './native-select.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export { nativeSelectIndicatorIconVars }

export const nativeSelectRoot = stylex.create({
  base: {
    height: 'fit-content',
    display: 'flex',
    width: '100%',
    position: 'relative',
  },
})

export const nativeSelectField = stylex.create({
  base: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    appearance: 'none',
    borderRadius: semanticRadii.control,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ':invalid': {
      borderColor: semanticColors.borderError,
    },
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    lineHeight: lineHeights.normal,
  },
})

export const nativeSelectFieldSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    ps: 2,
    pe: 6,
    height: sizes.controlXs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ps: 2.5,
    pe: 8,
    height: sizes.controlSm,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ps: 3,
    pe: 8,
    height: sizes.controlMd,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    ps: 4,
    pe: 8,
    height: sizes.controlLg,
  },
  xl: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    ps: 4.5,
    pe: 10,
    height: sizes.controlXl,
  },
})

export const nativeSelectFieldVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
  },
  plain: {
    backgroundColor: 'transparent',
    color: semanticColors.fg,
    focusRingWidth: '2px',
  },
})

export const nativeSelectIndicator = stylex.create({
  base: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '100%',
    color: semanticColors.fgMuted,
    ':disabled': {
      opacity: 0.5,
    },
    ':invalid': {
      color: semanticColors.fgError,
    },
    [nativeSelectIndicatorIconVars.width]: '1em',
    [nativeSelectIndicatorIconVars.height]: '1em',
  },
})

export const nativeSelectIndicatorSizes = stylex.create({
  xs: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    insetEnd: 1.5,
  },
  sm: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    insetEnd: 2,
  },
  md: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    insetEnd: 2,
  },
  lg: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    insetEnd: 3,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    insetEnd: 3,
  },
})

export const nativeSelectIndicatorIcon = stylex.create({
  base: {
    width: nativeSelectIndicatorIconVars.width,
    height: nativeSelectIndicatorIconVars.height,
  },
})

export type NativeSelectVariant = keyof typeof nativeSelectFieldVariants

export type NativeSelectSize = keyof typeof nativeSelectFieldSizes

export const nativeSelectSlotRecipe = {
  slots: {
    root: {
      styles: nativeSelectRoot,
    },
    field: {
      styles: nativeSelectField,
      sizes: nativeSelectFieldSizes,
      variants: nativeSelectFieldVariants,
    },
    indicator: {
      styles: nativeSelectIndicator,
      sizes: nativeSelectIndicatorSizes,
      icon: {
        vars: nativeSelectIndicatorIconVars,
        styles: nativeSelectIndicatorIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function nativeSelectSlotStyles(
  slot: keyof typeof nativeSelectSlotRecipe.slots,
  variants?: {
    size?: NativeSelectSize
    variant?: NativeSelectVariant
  },
) {
  const size = variants?.size ?? nativeSelectSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? nativeSelectSlotRecipe.defaultVariants.variant
  const def = nativeSelectSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
