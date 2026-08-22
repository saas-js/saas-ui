/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const pageRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  },
})

export const pageRootVariants = stylex.create({
  panel: {
    '--page-bg-color': semanticColors.bg,
    backgroundColor: 'var(--page-bg-color)',
    zIndex: 1,
  },
  settings: {
    overflowY: 'auto',
    paddingInline: spacing._4,
  },
})

export const pageHeader = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
})

export const pageHeaderVariants = stylex.create({
  panel: {
    '--page-header-row-height': '40px',
    '--page-header-padding-x': spacing._4,
    borderBottomWidth: '1px',
  },
  settings: {},
})

export const pageHeaderContent = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    gap: spacing._2,
    minWidth: 0,
  },
})

export const pageHeaderContentVariants = stylex.create({
  panel: {
    minHeight: 'var(--page-header-row-height)',
    paddingInline: 'var(--page-header-padding-x)',
  },
  settings: {
    minHeight: sizes._24,
  },
})

export const pageHeading = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
  },
})

export const pageHeadingVariants = stylex.create({
  settings: {},
})

export const pageHeaderFooter = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: sizes.full,
  },
})

export const pageTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const pageTitleVariants = stylex.create({
  panel: {
    me: 4,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  settings: {
    fontSize: fontSizes._2xl,
    lineHeight: lineHeights._2xl,
  },
})

export const pageDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
  },
})

export const pageDescriptionVariants = stylex.create({
  panel: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  settings: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const pageBody = stylex.create({
  base: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing._4,
  },
})

export const pageBodyVariants = stylex.create({
  settings: {
    overflow: 'visible',
    padding: 0,
  },
})

export type PageVariant = keyof typeof pageRootVariants

export const pageSlotRecipe = {
  slots: {
    root: {
      styles: pageRoot,
      variants: pageRootVariants,
    },
    header: {
      styles: pageHeader,
      variants: pageHeaderVariants,
    },
    headerContent: {
      styles: pageHeaderContent,
      variants: pageHeaderContentVariants,
    },
    heading: {
      styles: pageHeading,
      variants: pageHeadingVariants,
    },
    headerFooter: {
      styles: pageHeaderFooter,
    },
    title: {
      styles: pageTitle,
      variants: pageTitleVariants,
    },
    description: {
      styles: pageDescription,
      variants: pageDescriptionVariants,
    },
    body: {
      styles: pageBody,
      variants: pageBodyVariants,
    },
  },
  defaultVariants: {
    variant: 'panel',
  },
} as const

export function pageSlotStyles(
  slot: keyof typeof pageSlotRecipe.slots,
  variants?: {
    variant?: PageVariant
  },
) {
  const variant = variants?.variant ?? pageSlotRecipe.defaultVariants.variant
  const def = pageSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
