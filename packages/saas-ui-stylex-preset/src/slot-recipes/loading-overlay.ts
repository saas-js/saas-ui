/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colors } from '../tokens/colors.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const loadingOverlayRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing._4,
    transitionProperty: 'opacity',
    transitionDuration: durations.slower,
  },
})

export const loadingOverlayRootVariants = stylex.create({
  fill: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.currentBg,
  },
  fullscreen: {
    position: 'fixed',
    inset: 0,
    zIndex: zIndices.modal,
    backgroundColor: semanticColors.bg,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: colors.currentBgon50,
  },
})

export type LoadingOverlayVariant = keyof typeof loadingOverlayRootVariants

export const loadingOverlaySlotRecipe = {
  slots: {
    root: {
      styles: loadingOverlayRoot,
      variants: loadingOverlayRootVariants,
    },
  },
  defaultVariants: {
    variant: 'fill',
  },
} as const

export function loadingOverlaySlotStyles(
  slot: keyof typeof loadingOverlaySlotRecipe.slots,
  variants?: {
    variant?: LoadingOverlayVariant
  },
) {
  const variant =
    variants?.variant ?? loadingOverlaySlotRecipe.defaultVariants.variant
  const def = loadingOverlaySlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
