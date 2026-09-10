/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const asideRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    position: 'relative',
    transitionProperty: 'margin-right',
  },
})

export const asideHeader = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    minHeight: sizes._12,
    borderBottomWidth: '1px',
  },
})

export const asideHeaderSizes = stylex.create({
  md: {
    padding: spacing._4,
  },
  lg: {
    padding: spacing._6,
  },
})

export const asideTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const asideTitleSizes = stylex.create({
  md: {
    fontSize: fontSizes.md,
  },
  lg: {
    fontSize: fontSizes.lg,
  },
})

export const asideBody = stylex.create({
  base: {
    flex: 1,
    overflow: 'auto',
  },
})

export const asideBodySizes = stylex.create({
  md: {
    padding: spacing._4,
  },
  lg: {
    padding: spacing._6,
  },
})

export type AsideSize = keyof typeof asideHeaderSizes

export const asideSlotRecipe = {
  slots: {
    root: {
      styles: asideRoot,
    },
    header: {
      styles: asideHeader,
      sizes: asideHeaderSizes,
    },
    title: {
      styles: asideTitle,
      sizes: asideTitleSizes,
    },
    body: {
      styles: asideBody,
      sizes: asideBodySizes,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function asideSlotStyles(
  slot: keyof typeof asideSlotRecipe.slots,
  variants?: {
    size?: AsideSize
  },
) {
  const size = variants?.size ?? asideSlotRecipe.defaultVariants.size
  const def = asideSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
