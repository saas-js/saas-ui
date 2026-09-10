/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const carouselRoot = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    gap: spacing._2,
  },
})

export const carouselItem = stylex.create({
  base: {},
})

export const carouselControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
})

export const carouselIndicatorGroup = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing._3,
  },
})

export const carouselIndicator = stylex.create({
  base: {
    width: sizes._2_5,
    height: sizes._2_5,
    borderRadius: radii.full,
    backgroundColor: colorPalette.subtle,
    cursor: cursor.button,
  },
})

export const carouselSlotRecipe = {
  slots: {
    root: {
      styles: carouselRoot,
    },
    item: {
      styles: carouselItem,
    },
    control: {
      styles: carouselControl,
    },
    indicatorGroup: {
      styles: carouselIndicatorGroup,
    },
    indicator: {
      styles: carouselIndicator,
    },
  },
  defaultVariants: {},
} as const

export function carouselSlotStyles(
  slot: keyof typeof carouselSlotRecipe.slots,
  variants?: {},
) {
  const def = carouselSlotRecipe.slots[slot]

  return [def.styles.base]
}
