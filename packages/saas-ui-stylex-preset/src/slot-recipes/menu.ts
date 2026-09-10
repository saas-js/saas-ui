/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { letterSpacings } from '../tokens/letter-spacings.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const menuContent = stylex.create({
  base: {
    outline: 0,
    color: semanticColors.fg,
    maxHeight: 'var(--available-height)',
    '--menu-z-index': zIndices.layer3,
    zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
    overflowY: 'auto',
    scrollbar: 'thin',
  },
})

export const menuContentSizes = stylex.create({
  sm: {
    minWidth: '8rem',
    padding: spacing._1,
    borderRadius: semanticRadii.panel,
  },
  md: {
    minWidth: '8rem',
    padding: spacing._1,
  },
})

export const menuItem = stylex.create({
  base: {
    textDecoration: 'none',
    color: semanticColors.fg,
    userSelect: 'none',
    borderRadius: semanticRadii.control,
    width: '100%',
    display: 'flex',
    cursor: cursor.menuitem,
    alignItems: 'center',
    textAlign: 'start',
    position: 'relative',
    flex: '0 0 auto',
    outline: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const menuItemSizes = stylex.create({
  sm: {
    gap: spacing._1,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    minHeight: sizes._6,
    paddingInline: spacing._1_5,
    ps: 'var(--menu-item-inset, {sizes.1.5})',
  },
  md: {
    gap: spacing._2,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minHeight: sizes._7,
    paddingInline: spacing._2,
    ps: 'var(--menu-item-inset, {sizes.2})',
  },
})

export const menuItemVariants = stylex.create({
  subtle: {},
  solid: {},
})

export const menuItemText = stylex.create({
  base: {
    flex: 1,
  },
})

export const menuItemGroupLabel = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    color: semanticColors.fgSubtle,
  },
})

export const menuItemGroupLabelSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    minHeight: sizes._6,
    paddingInline: spacing._1_5,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minHeight: sizes._7,
    paddingInline: spacing._2,
  },
})

export const menuIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})

export const menuItemCommand = stylex.create({
  base: {
    opacity: 0.6,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    ms: 'auto',
    ps: 4,
    letterSpacing: letterSpacings.widest,
  },
})

export const menuSeparator = stylex.create({
  base: {
    height: '1px',
    backgroundColor: semanticColors.bgMuted,
    marginBlock: spacing._1,
    marginInline: spacing._1,
  },
})

export type MenuVariant = keyof typeof menuItemVariants

export type MenuSize = keyof typeof menuContentSizes

export const menuSlotRecipe = {
  slots: {
    content: {
      styles: menuContent,
      sizes: menuContentSizes,
    },
    item: {
      styles: menuItem,
      sizes: menuItemSizes,
      variants: menuItemVariants,
    },
    itemText: {
      styles: menuItemText,
    },
    itemGroupLabel: {
      styles: menuItemGroupLabel,
      sizes: menuItemGroupLabelSizes,
    },
    indicator: {
      styles: menuIndicator,
    },
    itemCommand: {
      styles: menuItemCommand,
    },
    separator: {
      styles: menuSeparator,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
} as const

export function menuSlotStyles(
  slot: keyof typeof menuSlotRecipe.slots,
  variants?: {
    size?: MenuSize
    variant?: MenuVariant
  },
) {
  const size = variants?.size ?? menuSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? menuSlotRecipe.defaultVariants.variant
  const def = menuSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
