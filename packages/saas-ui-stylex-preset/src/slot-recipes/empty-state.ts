/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { emptyStateIndicatorIconVars } from './empty-state.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { emptyStateIndicatorIconVars }

export const emptyStateRoot = stylex.create({
  base: {
    width: sizes.full,
    height: sizes.full,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const emptyStateRootSizes = stylex.create({
  sm: {
    paddingInline: spacing._4,
    paddingBlock: spacing._6,
  },
  md: {
    paddingInline: spacing._8,
    paddingBlock: spacing._12,
  },
  lg: {
    paddingInline: spacing._12,
    paddingBlock: spacing._16,
  },
})

export const emptyStateContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
  },
})

export const emptyStateContentSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const emptyStateContentAligns = stylex.create({
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
})

export const emptyStateIndicator = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colorPalette.solid,
    [emptyStateIndicatorIconVars.width]: '1em',
    [emptyStateIndicatorIconVars.height]: '1em',
  },
})

export const emptyStateIndicatorSizes = stylex.create({
  sm: {
    marginBottom: spacing._2,
  },
  md: {
    marginBottom: spacing._3,
  },
  lg: {
    marginBottom: spacing._4,
  },
})

export const emptyStateIndicatorIcon = stylex.create({
  base: {
    width: emptyStateIndicatorIconVars.width,
    height: emptyStateIndicatorIconVars.height,
  },
})

export const emptyStateTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const emptyStateTitleSizes = stylex.create({
  sm: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  md: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  lg: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
})

export const emptyStateDescription = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    color: semanticColors.fgMuted,
  },
})

export const emptyStateDescriptionSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const emptyStateActions = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing._2,
  },
})

export const emptyStateActionsSizes = stylex.create({
  sm: {
    marginTop: spacing._2,
  },
  md: {
    marginTop: spacing._3,
  },
  lg: {
    marginTop: spacing._4,
  },
})

export type EmptyStateSize = keyof typeof emptyStateRootSizes

export type EmptyStateAlign = keyof typeof emptyStateContentAligns

export const emptyStateSlotRecipe = {
  slots: {
    root: {
      styles: emptyStateRoot,
      sizes: emptyStateRootSizes,
    },
    content: {
      styles: emptyStateContent,
      sizes: emptyStateContentSizes,
      align: emptyStateContentAligns,
    },
    indicator: {
      styles: emptyStateIndicator,
      sizes: emptyStateIndicatorSizes,
      icon: {
        vars: emptyStateIndicatorIconVars,
        styles: emptyStateIndicatorIcon,
      },
    },
    title: {
      styles: emptyStateTitle,
      sizes: emptyStateTitleSizes,
    },
    description: {
      styles: emptyStateDescription,
      sizes: emptyStateDescriptionSizes,
    },
    actions: {
      styles: emptyStateActions,
      sizes: emptyStateActionsSizes,
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'center',
  },
} as const

export function emptyStateSlotStyles(
  slot: keyof typeof emptyStateSlotRecipe.slots,
  variants?: {
    size?: EmptyStateSize
    align?: EmptyStateAlign
  },
) {
  const size = variants?.size ?? emptyStateSlotRecipe.defaultVariants.size
  const align = variants?.align ?? emptyStateSlotRecipe.defaultVariants.align
  const def = emptyStateSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'align' in def ? def.align[align as keyof typeof def.align] : false,
  ]
}
