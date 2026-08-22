/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const actionBarPositioner = stylex.create({
  base: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
    insetInline: 0,
    top: 'unset',
    bottom: 'calc(env(safe-area-inset-bottom) + 20px)',
  },
})

export const actionBarContent = stylex.create({
  base: {
    backgroundColor: semanticColors.bgPanel,
    boxShadow: semanticShadows.md,
    display: 'flex',
    alignItems: 'center',
    gap: spacing._3,
    borderRadius: semanticRadii.panel,
    paddingBlock: spacing._2_5,
    paddingInline: spacing._3,
    pointerEvents: 'auto',
    translate: 'calc(-1 * var(--scrollbar-width) / 2) 0px',
  },
})

export const actionBarSeparator = stylex.create({
  base: {
    width: '1px',
    height: sizes._5,
    backgroundColor: semanticColors.border,
  },
})

export const actionBarSelectionTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._2,
    alignSelf: 'stretch',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._4,
    paddingBlock: spacing._1,
    borderRadius: semanticRadii.control,
    borderWidth: '1px',
    borderStyle: 'dashed',
  },
})

export const actionBarSlotRecipe = {
  slots: {
    positioner: {
      styles: actionBarPositioner,
    },
    content: {
      styles: actionBarContent,
    },
    separator: {
      styles: actionBarSeparator,
    },
    selectionTrigger: {
      styles: actionBarSelectionTrigger,
    },
  },
  defaultVariants: {},
} as const

export function actionBarSlotStyles(
  slot: keyof typeof actionBarSlotRecipe.slots,
  variants?: {},
) {
  const def = actionBarSlotRecipe.slots[slot]

  return [def.styles.base]
}
