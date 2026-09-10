/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { accordionItemIndicatorIconVars } from './accordion.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { accordionItemIndicatorIconVars }

export const accordionRoot = stylex.create({
  base: {
    width: sizes.full,
    '--accordion-radius': semanticRadii.panel,
  },
})

export const accordionRootSizes = stylex.create({
  sm: {
    '--accordion-padding-x': spacing._3,
    '--accordion-padding-y': spacing._2,
  },
  md: {
    '--accordion-padding-x': spacing._4,
    '--accordion-padding-y': spacing._2,
  },
  lg: {
    '--accordion-padding-x': spacing._4_5,
    '--accordion-padding-y': spacing._2_5,
  },
})

export const accordionRootVariants = stylex.create({
  enclosed: {
    borderWidth: '1px',
    borderRadius: 'var(--accordion-radius)',
    overflow: 'hidden',
  },
})

export const accordionItem = stylex.create({
  base: {
    overflowAnchor: 'none',
  },
})

export const accordionItemVariants = stylex.create({
  outline: {
    borderBottomWidth: '1px',
  },
  subtle: {
    borderRadius: 'var(--accordion-radius)',
  },
  enclosed: {},
})

export const accordionItemTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: sizes.full,
    outline: 0,
    gap: spacing._3,
    fontWeight: fontWeights.medium,
    borderRadius: 'var(--accordion-radius)',
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: colorPalette.focusRing,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const accordionItemTriggerSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: 'var(--accordion-padding-y)',
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingBlock: 'var(--accordion-padding-y)',
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    paddingBlock: 'var(--accordion-padding-y)',
  },
})

export const accordionItemTriggerVariants = stylex.create({
  subtle: {
    paddingInline: 'var(--accordion-padding-x)',
  },
  enclosed: {
    paddingInline: 'var(--accordion-padding-x)',
  },
})

export const accordionItemBody = stylex.create({
  base: {
    paddingTop: 'var(--accordion-padding-y)',
    paddingBottom: 'calc(var(--accordion-padding-y) * 2)',
  },
})

export const accordionItemContent = stylex.create({
  base: {
    overflow: 'hidden',
    borderRadius: 'var(--accordion-radius)',
  },
})

export const accordionItemContentSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
})

export const accordionItemContentVariants = stylex.create({
  subtle: {
    paddingInline: 'var(--accordion-padding-x)',
  },
  enclosed: {
    paddingInline: 'var(--accordion-padding-x)',
  },
})

export const accordionItemIndicator = stylex.create({
  base: {
    ms: 'auto',
    transition: 'rotate 0.2s',
    transformOrigin: 'center',
    color: semanticColors.fgSubtle,
    [accordionItemIndicatorIconVars.width]: '1.2em',
    [accordionItemIndicatorIconVars.height]: '1.2em',
  },
})

export const accordionItemIndicatorIcon = stylex.create({
  base: {
    width: accordionItemIndicatorIconVars.width,
    height: accordionItemIndicatorIconVars.height,
  },
})

export type AccordionVariant = keyof typeof accordionRootVariants

export type AccordionSize = keyof typeof accordionRootSizes

export const accordionSlotRecipe = {
  slots: {
    root: {
      styles: accordionRoot,
      sizes: accordionRootSizes,
      variants: accordionRootVariants,
    },
    item: {
      styles: accordionItem,
      variants: accordionItemVariants,
    },
    itemTrigger: {
      styles: accordionItemTrigger,
      sizes: accordionItemTriggerSizes,
      variants: accordionItemTriggerVariants,
    },
    itemBody: {
      styles: accordionItemBody,
    },
    itemContent: {
      styles: accordionItemContent,
      sizes: accordionItemContentSizes,
      variants: accordionItemContentVariants,
    },
    itemIndicator: {
      styles: accordionItemIndicator,
      icon: {
        vars: accordionItemIndicatorIconVars,
        styles: accordionItemIndicatorIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function accordionSlotStyles(
  slot: keyof typeof accordionSlotRecipe.slots,
  variants?: {
    size?: AccordionSize
    variant?: AccordionVariant
  },
) {
  const size = variants?.size ?? accordionSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? accordionSlotRecipe.defaultVariants.variant
  const def = accordionSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
