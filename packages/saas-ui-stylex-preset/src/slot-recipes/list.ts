/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

export const listRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--list-gap)',
  },
})

export const listRootVariants = stylex.create({
  marker: {
    listStyle: 'revert',
    listStylePosition: 'inside',
  },
})

export const listItem = stylex.create({
  base: {
    whiteSpace: 'normal',
    display: 'list-item',
  },
})

export const listItemVariants = stylex.create({
  marker: {},
  plain: {
    alignItems: 'flex-start',
    display: 'inline-flex',
  },
})

export const listItemAligns = stylex.create({
  center: {
    alignItems: 'center',
  },
  start: {
    alignItems: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
  },
})

export const listIndicator = stylex.create({
  base: {
    marginEnd: 2,
    minHeight: '1lh',
    flexShrink: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
})

export type ListVariant = keyof typeof listRootVariants

export type ListAlign = keyof typeof listItemAligns

export const listSlotRecipe = {
  slots: {
    root: {
      styles: listRoot,
      variants: listRootVariants,
    },
    item: {
      styles: listItem,
      variants: listItemVariants,
      align: listItemAligns,
    },
    indicator: {
      styles: listIndicator,
    },
  },
  defaultVariants: {
    variant: 'marker',
  },
} as const

export function listSlotStyles(
  slot: keyof typeof listSlotRecipe.slots,
  variants?: {
    variant?: ListVariant
  },
) {
  const variant = variants?.variant ?? listSlotRecipe.defaultVariants.variant
  const def = listSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
