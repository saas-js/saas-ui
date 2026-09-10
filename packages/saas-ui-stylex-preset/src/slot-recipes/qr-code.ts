/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const qrCodeRoot = stylex.create({
  base: {
    position: 'relative',
    width: 'fit-content',
    '--qr-code-overlay-size': 'calc(var(--qr-code-size) / 3)',
  },
})

export const qrCodeRootSizes = stylex.create({
  '2xs': {
    '--qr-code-size': '40px',
  },
  xs: {
    '--qr-code-size': '64px',
  },
  sm: {
    '--qr-code-size': '80px',
  },
  md: {
    '--qr-code-size': '120px',
  },
  lg: {
    '--qr-code-size': '160px',
  },
  xl: {
    '--qr-code-size': '200px',
  },
  '2xl': {
    '--qr-code-size': '240px',
  },
  full: {
    '--qr-code-size': '100%',
  },
})

export const qrCodeFrame = stylex.create({
  base: {
    width: 'var(--qr-code-size)',
    height: 'var(--qr-code-size)',
    fill: 'currentColor',
  },
})

export const qrCodeOverlay = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--qr-code-overlay-size)',
    height: 'var(--qr-code-overlay-size)',
    padding: spacing._1,
    backgroundColor: semanticColors.bg,
    borderRadius: semanticRadii.indicatorSm,
  },
})

export type QrCodeSize = keyof typeof qrCodeRootSizes

export const qrCodeSlotRecipe = {
  slots: {
    root: {
      styles: qrCodeRoot,
      sizes: qrCodeRootSizes,
    },
    frame: {
      styles: qrCodeFrame,
    },
    overlay: {
      styles: qrCodeOverlay,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function qrCodeSlotStyles(
  slot: keyof typeof qrCodeSlotRecipe.slots,
  variants?: {
    size?: QrCodeSize
  },
) {
  const size = variants?.size ?? qrCodeSlotRecipe.defaultVariants.size
  const def = qrCodeSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
