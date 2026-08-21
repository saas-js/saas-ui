/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

export const collapsibleContent = stylex.create({
  base: {},
})

export const collapsibleSlotRecipe = {
  slots: {
    content: {
      styles: collapsibleContent,
    },
  },
  defaultVariants: {},
} as const

export function collapsibleSlotStyles(
  slot: keyof typeof collapsibleSlotRecipe.slots,
  variants?: {},
) {
  const def = collapsibleSlotRecipe.slots[slot]

  return [def.styles.base]
}
