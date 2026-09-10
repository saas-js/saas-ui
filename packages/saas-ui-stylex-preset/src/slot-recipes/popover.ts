/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const popoverContent = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    '--popover-bg': semanticColors.bgPanel,
    backgroundColor: 'var(--popover-bg)',
    '--popover-size': sizes.xs,
    '--popover-mobile-size': 'calc(100dvw - 1rem)',
    '--popover-z-index': zIndices.layer2,
    zIndex: 'calc(var(--popover-z-index) + var(--layer-index, 0))',
    outline: 0,
    '--popover-radius': semanticRadii.panel,
    '--popover-concentric-radius':
      'max(0px, calc(var(--popover-radius) - var(--popover-padding)))',
    transformOrigin: 'var(--transform-origin)',
  },
})

export const popoverContentSizes = stylex.create({
  xs: {
    '--popover-padding': spacing._3,
  },
  sm: {
    '--popover-padding': spacing._4,
  },
  md: {
    '--popover-padding': spacing._5,
  },
  lg: {
    '--popover-padding': spacing._6,
  },
})

export const popoverHeader = stylex.create({
  base: {
    paddingInline: 'var(--popover-padding)',
    paddingTop: 'var(--popover-padding)',
  },
})

export const popoverBody = stylex.create({
  base: {
    padding: 'var(--popover-padding)',
    flex: 1,
  },
})

export const popoverFooter = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: 'var(--popover-padding)',
    paddingBottom: 'var(--popover-padding)',
  },
})

export const popoverArrow = stylex.create({
  base: {
    '--arrow-size': sizes._3,
    '--arrow-background': 'var(--popover-bg)',
  },
})

export const popoverArrowTip = stylex.create({
  base: {
    borderTopWidth: '1px',
    borderInlineStartWidth: '1px',
  },
})

export type PopoverSize = keyof typeof popoverContentSizes

export const popoverSlotRecipe = {
  slots: {
    content: {
      styles: popoverContent,
      sizes: popoverContentSizes,
    },
    header: {
      styles: popoverHeader,
    },
    body: {
      styles: popoverBody,
    },
    footer: {
      styles: popoverFooter,
    },
    arrow: {
      styles: popoverArrow,
    },
    arrowTip: {
      styles: popoverArrowTip,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function popoverSlotStyles(
  slot: keyof typeof popoverSlotRecipe.slots,
  variants?: {
    size?: PopoverSize
  },
) {
  const size = variants?.size ?? popoverSlotRecipe.defaultVariants.size
  const def = popoverSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
