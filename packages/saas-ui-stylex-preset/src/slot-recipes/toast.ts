/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const toastRoot = stylex.create({
  base: {
    width: sizes.full,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    gap: spacing._2,
    paddingBlock: spacing._3,
    ps: 3,
    pe: 6,
    borderRadius: radii.md,
    borderWidth: '1px',
    translate: 'var(--x) var(--y)',
    scale: 'var(--scale)',
    zIndex: 'var(--z-index)',
    height: 'var(--height, var(--toast-height))',
    opacity: 'var(--opacity)',
    willChange: 'translate, opacity, scale, height',
    transition:
      'translate 400ms, scale 400ms, opacity 400ms, height 200ms, box-shadow 200ms',
    transitionTimingFunction: 'bounce-in',
    backgroundColor: semanticColors.bgPanel,
    color: semanticColors.fg,
    boxShadow: semanticShadows.lg,
    overflow: 'hidden',
    '--toast-indicated-color': semanticColors.fgMuted,
  },
})

export const toastTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    marginEnd: 2,
  },
})

export const toastDescription = stylex.create({
  base: {
    display: 'inline',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    opacity: 0.8,
  },
})

export const toastIndicator = stylex.create({
  base: {
    flexShrink: 0,
    width: sizes._5,
    height: sizes._5,
    color: 'var(--toast-indicated-color)',
  },
})

export const toastActionTrigger = stylex.create({
  base: {
    cursor: cursor.button,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
    height: sizes._6,
    paddingInline: spacing._3,
    ms: -3,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
    transition: 'background 200ms',
    color: `color-mix(in oklch, ${colorPalette.solid} 80%, transparent)`,
    ':hover': {
      backgroundColor: semanticColors.bgSubtle,
      color: colorPalette.solid,
    },
  },
})

export const toastCloseTrigger = stylex.create({
  base: {
    position: 'absolute',
    top: spacing._2,
    insetEnd: 2,
  },
})

export const toastSlotRecipe = {
  slots: {
    root: {
      styles: toastRoot,
    },
    title: {
      styles: toastTitle,
    },
    description: {
      styles: toastDescription,
    },
    indicator: {
      styles: toastIndicator,
    },
    actionTrigger: {
      styles: toastActionTrigger,
    },
    closeTrigger: {
      styles: toastCloseTrigger,
    },
  },
  defaultVariants: {},
} as const

export function toastSlotStyles(
  slot: keyof typeof toastSlotRecipe.slots,
  variants?: {},
) {
  const def = toastSlotRecipe.slots[slot]

  return [def.styles.base]
}
