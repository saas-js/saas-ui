/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const blockquoteRoot = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._2,
  },
})

export const blockquoteRootVariants = stylex.create({
  subtle: {
    paddingInline: spacing._5,
    borderStartWidth: '4px',
    borderStartColor: colorPalette.muted,
  },
  solid: {
    paddingInline: spacing._5,
    borderStartWidth: '4px',
    borderStartColor: colorPalette.solid,
  },
  plain: {
    paddingInline: spacing._5,
  },
})

export const blockquoteRootJustifys = stylex.create({
  start: {
    alignItems: 'flex-start',
    textAlign: 'start',
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  end: {
    alignItems: 'flex-end',
    textAlign: 'end',
  },
})

export const blockquoteCaption = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    color: semanticColors.fgMuted,
  },
})

export const blockquoteIcon = stylex.create({
  base: {
    width: sizes._5,
    height: sizes._5,
  },
})

export const blockquoteIconVariants = stylex.create({
  subtle: {
    color: colorPalette.fg,
  },
  solid: {
    color: colorPalette.solid,
  },
  plain: {
    color: colorPalette.solid,
  },
})

export type BlockquoteJustify = keyof typeof blockquoteRootJustifys

export type BlockquoteVariant = keyof typeof blockquoteRootVariants

export const blockquoteSlotRecipe = {
  slots: {
    root: {
      styles: blockquoteRoot,
      variants: blockquoteRootVariants,
      justify: blockquoteRootJustifys,
    },
    caption: {
      styles: blockquoteCaption,
    },
    icon: {
      styles: blockquoteIcon,
      variants: blockquoteIconVariants,
    },
  },
  defaultVariants: {
    variant: 'subtle',
    justify: 'start',
  },
} as const

export function blockquoteSlotStyles(
  slot: keyof typeof blockquoteSlotRecipe.slots,
  variants?: {
    variant?: BlockquoteVariant
    justify?: BlockquoteJustify
  },
) {
  const variant =
    variants?.variant ?? blockquoteSlotRecipe.defaultVariants.variant
  const justify =
    variants?.justify ?? blockquoteSlotRecipe.defaultVariants.justify
  const def = blockquoteSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'justify' in def ? def.justify[justify as keyof typeof def.justify] : false,
  ]
}
