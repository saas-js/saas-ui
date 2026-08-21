/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const timelineRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: sizes.full,
    '--timeline-thickness': '1px',
    '--timeline-gutter': '4px',
  },
})

export const timelineRootSizes = stylex.create({
  sm: {
    '--timeline-indicator-size': sizes._4,
    '--timeline-font-size': fontSizes._2xs,
  },
  md: {
    '--timeline-indicator-size': sizes._5,
    '--timeline-font-size': fontSizes.xs,
  },
  lg: {
    '--timeline-indicator-size': sizes._6,
    '--timeline-font-size': fontSizes.xs,
  },
  xl: {
    '--timeline-indicator-size': sizes._8,
    '--timeline-font-size': fontSizes.sm,
  },
})

export const timelineItem = stylex.create({
  base: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-start',
    flexShrink: 0,
    gap: spacing._4,
    ':last-child': {},
  },
})

export const timelineSeparator = stylex.create({
  base: {
    position: 'absolute',
    borderStartWidth: 'var(--timeline-thickness)',
    ms: 'calc(-1 * var(--timeline-thickness) / 2)',
    insetInlineStart: 'calc(var(--timeline-indicator-size) / 2)',
    insetBlock: 0,
    borderColor: semanticColors.border,
  },
})

export const timelineIndicator = stylex.create({
  base: {
    outline: '2px solid {colors.bg}',
    position: 'relative',
    flexShrink: 0,
    width: 'var(--timeline-indicator-size)',
    height: 'var(--timeline-indicator-size)',
    fontSize: 'var(--timeline-font-size)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    fontWeight: fontWeights.medium,
  },
})

export const timelineIndicatorVariants = stylex.create({
  subtle: {
    backgroundColor: semanticColors.bgMuted,
  },
  solid: {
    backgroundColor: semanticColors.bgInverted,
    color: semanticColors.fgInverted,
  },
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '2px',
  },
})

export const timelineConnector = stylex.create({
  base: {
    alignSelf: 'stretch',
    position: 'relative',
  },
})

export const timelineContent = stylex.create({
  base: {
    paddingBottom: spacing._6,
    display: 'flex',
    flexDirection: 'column',
    width: sizes.full,
    gap: spacing._2,
  },
})

export const timelineTitle = stylex.create({
  base: {
    display: 'flex',
    fontWeight: fontWeights.medium,
    flexWrap: 'wrap',
    gap: spacing._1_5,
    alignItems: 'center',
    marginTop: 'var(--timeline-margin)',
  },
})

export const timelineTitleSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    marginTop: spacing._0_5,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  xl: {
    marginTop: spacing._1_5,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const timelineDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export type TimelineVariant = keyof typeof timelineIndicatorVariants

export type TimelineSize = keyof typeof timelineRootSizes

export const timelineSlotRecipe = {
  slots: {
    root: {
      styles: timelineRoot,
      sizes: timelineRootSizes,
    },
    item: {
      styles: timelineItem,
    },
    separator: {
      styles: timelineSeparator,
    },
    indicator: {
      styles: timelineIndicator,
      variants: timelineIndicatorVariants,
    },
    connector: {
      styles: timelineConnector,
    },
    content: {
      styles: timelineContent,
    },
    title: {
      styles: timelineTitle,
      sizes: timelineTitleSizes,
    },
    description: {
      styles: timelineDescription,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
} as const

export function timelineSlotStyles(
  slot: keyof typeof timelineSlotRecipe.slots,
  variants?: {
    size?: TimelineSize
    variant?: TimelineVariant
  },
) {
  const size = variants?.size ?? timelineSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? timelineSlotRecipe.defaultVariants.variant
  const def = timelineSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
