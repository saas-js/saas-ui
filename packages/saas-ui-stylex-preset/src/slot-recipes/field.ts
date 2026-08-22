/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const fieldRequiredIndicator = stylex.create({
  base: {
    color: semanticColors.fgError,
    lineHeight: 1,
  },
})

export const fieldRoot = stylex.create({
  base: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    gap: spacing._1_5,
  },
})

export const fieldRootOrientations = stylex.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  horizontal: {
    display: 'grid',
    gridTemplateColumns: 'var(--field-label-width, 8rem) 1fr',
    alignItems: 'center',
  },
})

export const fieldLabel = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'start',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
    gap: spacing._1,
    userSelect: 'none',
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const fieldErrorText = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: fontWeights.medium,
    gap: spacing._1,
    color: semanticColors.fgError,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export const fieldErrorTextOrientations = stylex.create({
  horizontal: {
    gridColumn: 2,
  },
})

export const fieldHelperText = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export const fieldHelperTextOrientations = stylex.create({
  horizontal: {
    gridColumn: 2,
  },
})

export type FieldOrientation = keyof typeof fieldRootOrientations

export const fieldSlotRecipe = {
  slots: {
    requiredIndicator: {
      styles: fieldRequiredIndicator,
    },
    root: {
      styles: fieldRoot,
      orientation: fieldRootOrientations,
    },
    label: {
      styles: fieldLabel,
    },
    errorText: {
      styles: fieldErrorText,
      orientation: fieldErrorTextOrientations,
    },
    helperText: {
      styles: fieldHelperText,
      orientation: fieldHelperTextOrientations,
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
} as const

export function fieldSlotStyles(
  slot: keyof typeof fieldSlotRecipe.slots,
  variants?: {
    orientation?: FieldOrientation
  },
) {
  const orientation =
    variants?.orientation ?? fieldSlotRecipe.defaultVariants.orientation
  const def = fieldSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'orientation' in def
      ? def.orientation[orientation as keyof typeof def.orientation]
      : false,
  ]
}
