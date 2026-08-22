/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const hoverCardContent = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    '--hovercard-bg': semanticColors.bgPanel,
    backgroundColor: 'var(--hovercard-bg)',
    maxWidth: sizes._80,
    '--hover-card-z-index': zIndices.layer2,
    zIndex: 'calc(var(--hover-card-z-index) + var(--layer-index, 0))',
    transformOrigin: 'var(--transform-origin)',
    outline: 0,
    '--hover-card-radius': semanticRadii.panel,
    '--hover-card-concentric-radius':
      'max(0px, calc(var(--hover-card-radius) - var(--hover-card-padding)))',
  },
})

export const hoverCardContentSizes = stylex.create({
  xs: {
    '--hover-card-padding': spacing._3,
    padding: 'var(--hover-card-padding)',
  },
  sm: {
    '--hover-card-padding': spacing._4,
    padding: 'var(--hover-card-padding)',
  },
  md: {
    '--hover-card-padding': spacing._5,
    padding: 'var(--hover-card-padding)',
  },
  lg: {
    '--hover-card-padding': spacing._6,
    padding: 'var(--hover-card-padding)',
  },
})

export const hoverCardArrow = stylex.create({
  base: {
    '--arrow-size': sizes._3,
    '--arrow-background': 'var(--hovercard-bg)',
  },
})

export const hoverCardArrowTip = stylex.create({
  base: {
    borderTopWidth: '0.5px',
    borderInlineStartWidth: '0.5px',
  },
})

export type HoverCardSize = keyof typeof hoverCardContentSizes

export const hoverCardSlotRecipe = {
  slots: {
    content: {
      styles: hoverCardContent,
      sizes: hoverCardContentSizes,
    },
    arrow: {
      styles: hoverCardArrow,
    },
    arrowTip: {
      styles: hoverCardArrowTip,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function hoverCardSlotStyles(
  slot: keyof typeof hoverCardSlotRecipe.slots,
  variants?: {
    size?: HoverCardSize
  },
) {
  const size = variants?.size ?? hoverCardSlotRecipe.defaultVariants.size
  const def = hoverCardSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
