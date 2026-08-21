/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { zIndices } from '../tokens/z-indices.stylex.ts'

export const splitPageRoot = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
  },
})

export const splitPageContent = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
})

export const splitPageContentMobiles = stylex.create({
  true: {
    transitionProperty: 'right',
    position: 'absolute',
    zIndex: zIndices.layer1,
    top: 0,
    bottom: 0,
    width: '100vw',
  },
})

export type SplitPageMobile = keyof typeof splitPageContentMobiles

export const splitPageSlotRecipe = {
  slots: {
    root: {
      styles: splitPageRoot,
    },
    content: {
      styles: splitPageContent,
      mobile: splitPageContentMobiles,
    },
  },
  defaultVariants: {},
} as const

export function splitPageSlotStyles(
  slot: keyof typeof splitPageSlotRecipe.slots,
  variants?: {},
) {
  const def = splitPageSlotRecipe.slots[slot]

  return [def.styles.base]
}
