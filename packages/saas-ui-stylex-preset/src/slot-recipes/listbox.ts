/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { listboxItemIndicatorIconVars } from './listbox.stylex.ts'

import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { listboxItemIndicatorIconVars }

export const listboxRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const listboxContent = stylex.create({
  base: {
    display: 'flex',
    maxHeight: sizes._96,
    padding: spacing._1,
    gap: spacing._1,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    outline: 'none',
    scrollPadding: 1,
    '--listbox-item-padding-x': spacing._2,
    '--listbox-item-padding-y': spacing._1_5,
  },
})

export const listboxContentVariants = stylex.create({
  subtle: {
    backgroundColor: semanticColors.bgPanel,
    borderWidth: '1px',
    borderRadius: semanticRadii.panelMd,
  },
  solid: {
    backgroundColor: semanticColors.bgPanel,
    borderWidth: '1px',
    borderRadius: semanticRadii.panelMd,
  },
})

export const listboxItem = stylex.create({
  base: {
    position: 'relative',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    cursor: cursor.option,
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'start',
    borderRadius: semanticRadii.controlMd,
    paddingBlock: 'var(--listbox-item-padding-y)',
    paddingInline: 'var(--listbox-item-padding-x)',
    ':disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
})

export const listboxItemVariants = stylex.create({
  subtle: {
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${semanticColors.bgEmphasized} 60%, transparent)`,
    },
  },
  solid: {},
})

export const listboxEmpty = stylex.create({
  base: {
    paddingBlock: 'var(--listbox-item-padding-y)',
    paddingInline: 'var(--listbox-item-padding-x)',
  },
})

export const listboxItemText = stylex.create({
  base: {
    flex: 1,
  },
})

export const listboxItemGroup = stylex.create({
  base: {
    marginTop: spacing._1_5,
    ':first-child': {
      marginTop: 0,
    },
  },
})

export const listboxItemGroupLabel = stylex.create({
  base: {
    paddingBlock: spacing._1_5,
    paddingInline: spacing._2,
    fontWeight: fontWeights.medium,
  },
})

export const listboxLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    userSelect: 'none',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const listboxValueText = stylex.create({
  base: {
    lineClamp: 1,
    maxWidth: '80%',
  },
})

export const listboxItemIndicator = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [listboxItemIndicatorIconVars.width]: sizes._4,
    [listboxItemIndicatorIconVars.height]: sizes._4,
  },
})

export const listboxItemIndicatorIcon = stylex.create({
  base: {
    width: listboxItemIndicatorIconVars.width,
    height: listboxItemIndicatorIconVars.height,
  },
})

export type ListboxVariant = keyof typeof listboxContentVariants

export const listboxSlotRecipe = {
  slots: {
    root: {
      styles: listboxRoot,
    },
    content: {
      styles: listboxContent,
      variants: listboxContentVariants,
    },
    item: {
      styles: listboxItem,
      variants: listboxItemVariants,
    },
    empty: {
      styles: listboxEmpty,
    },
    itemText: {
      styles: listboxItemText,
    },
    itemGroup: {
      styles: listboxItemGroup,
    },
    itemGroupLabel: {
      styles: listboxItemGroupLabel,
    },
    label: {
      styles: listboxLabel,
    },
    valueText: {
      styles: listboxValueText,
    },
    itemIndicator: {
      styles: listboxItemIndicator,
      icon: {
        vars: listboxItemIndicatorIconVars,
        styles: listboxItemIndicatorIcon,
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
} as const

export function listboxSlotStyles(
  slot: keyof typeof listboxSlotRecipe.slots,
  variants?: {
    variant?: ListboxVariant
  },
) {
  const variant = variants?.variant ?? listboxSlotRecipe.defaultVariants.variant
  const def = listboxSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
