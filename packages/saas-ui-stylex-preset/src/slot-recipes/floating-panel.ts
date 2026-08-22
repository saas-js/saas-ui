/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const floatingPanelPositioner = stylex.create({
  base: {
    '--floating-panel-z-index': zIndices.layer4,
    zIndex: 'calc(var(--floating-panel-z-index) + var(--layer-index, 0))',
  },
})

export const floatingPanelContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    outline: 0,
    position: 'relative',
  },
})

export const floatingPanelDragTrigger = stylex.create({
  base: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    minWidth: 0,
  },
})

export const floatingPanelHeader = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    paddingInline: spacing._3,
    paddingBlock: spacing._2,
    borderBottomWidth: '1px',
    backgroundColor: semanticColors.bgSubtle,
    flex: 'none',
  },
})

export const floatingPanelTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    flex: 1,
    truncate: 'true',
  },
})

export const floatingPanelBody = stylex.create({
  base: {
    flex: 1,
    overflow: 'auto',
    padding: spacing._3,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const floatingPanelResizeTrigger = stylex.create({
  base: {
    zIndex: 1,
    '--size': sizes._2_5,
  },
})

export const floatingPanelSlotRecipe = {
  slots: {
    positioner: {
      styles: floatingPanelPositioner,
    },
    content: {
      styles: floatingPanelContent,
    },
    dragTrigger: {
      styles: floatingPanelDragTrigger,
    },
    header: {
      styles: floatingPanelHeader,
    },
    title: {
      styles: floatingPanelTitle,
    },
    body: {
      styles: floatingPanelBody,
    },
    resizeTrigger: {
      styles: floatingPanelResizeTrigger,
    },
  },
  defaultVariants: {},
} as const

export function floatingPanelSlotStyles(
  slot: keyof typeof floatingPanelSlotRecipe.slots,
  variants?: {},
) {
  const def = floatingPanelSlotRecipe.slots[slot]

  return [def.styles.base]
}
