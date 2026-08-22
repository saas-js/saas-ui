/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const tooltipContent = stylex.create({
  base: {
    '--tooltip-bg': semanticColors.bg,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--tooltip-bg)',
    color: semanticColors.fg,
    paddingInline: spacing._2_5,
    paddingBlock: spacing._1,
    borderRadius: semanticRadii.panel,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    boxShadow: semanticShadows.overlay,
    maxWidth: sizes.xs,
    zIndex: zIndices.tooltip,
    transformOrigin: 'var(--transform-origin)',
  },
})

export const tooltipContentVariants = stylex.create({
  inverted: {
    '--tooltip-bg': semanticColors.bgInverted,
    color: semanticColors.fgInverted,
  },
})

export const tooltipArrow = stylex.create({
  base: {
    '--arrow-size': sizes._2,
    '--arrow-background': 'var(--tooltip-bg)',
    zIndex: -1,
  },
})

export const tooltipArrowTip = stylex.create({
  base: {
    borderTopWidth: '1px',
    borderInlineStartWidth: '1px',
    borderColor: 'var(--tooltip-bg)',
  },
})

export type TooltipVariant = keyof typeof tooltipContentVariants

export const tooltipSlotRecipe = {
  slots: {
    content: {
      styles: tooltipContent,
      variants: tooltipContentVariants,
    },
    arrow: {
      styles: tooltipArrow,
    },
    arrowTip: {
      styles: tooltipArrowTip,
    },
  },
  defaultVariants: {},
} as const

export function tooltipSlotStyles(
  slot: keyof typeof tooltipSlotRecipe.slots,
  variants?: {},
) {
  const def = tooltipSlotRecipe.slots[slot]

  return [def.styles.base]
}
