/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { sidebarNavItemButtonSvgVars } from './sidebar-nav-item.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { sidebarNavItemButtonSvgVars }

export const sidebarNavItemItem = stylex.create({
  base: {
    position: 'relative',
    fontSize: fontSizes.sm,
    paddingBlock: '1px',
  },
})

export const sidebarNavItemItemSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const sidebarNavItemButton = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    isolation: 'isolate',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: cursor.button,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.fast,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '1px',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    [sidebarNavItemButtonSvgVars.width]: sizes._4,
    [sidebarNavItemButtonSvgVars.height]: sizes._4,
    [sidebarNavItemButtonSvgVars.color]: 'var(--sidebar-item-icon-color)',
  },
})

export const sidebarNavItemButtonSizes = stylex.create({
  sm: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2,
    height: sizes.controlXs,
  },
  md: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2_5,
    height: sizes.controlSm,
  },
  lg: {
    borderRadius: semanticRadii.control,
    paddingInline: spacing._3,
    height: sizes.controlMd,
  },
})

export const sidebarNavItemButtonVariants = stylex.create({
  muted: {
    backgroundColor: 'transparent',
    color: `color-mix(in oklch, ${semanticColors.sidebarAccentFg} 85%, transparent)`,
    '--sidebar-item-icon-color': `color-mix(in oklch, ${semanticColors.sidebarAccentFg} 85%, transparent)`,
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${semanticColors.sidebarAccentBg} 90%, transparent)`,
      color: semanticColors.sidebarAccentFg,
      '--sidebar-item-icon-color': semanticColors.sidebarAccentFg,
    },
    ':active': {
      backgroundColor: semanticColors.sidebarAccentBg,
      color: semanticColors.sidebarAccentFg,
      '--sidebar-item-icon-color': semanticColors.sidebarAccentFg,
    },
  },
})

export const sidebarNavItemButtonSvg = stylex.create({
  base: {
    width: sidebarNavItemButtonSvgVars.width,
    height: sidebarNavItemButtonSvgVars.height,
    color: sidebarNavItemButtonSvgVars.color,
  },
})

export const sidebarNavItemEndElement = stylex.create({
  base: {
    display: 'flex',
    gap: '1px',
    ms: 'auto',
  },
})

export const sidebarNavItemEndElementSizes = stylex.create({
  sm: {
    pe: 1,
  },
  md: {
    pe: 1,
  },
  lg: {
    pe: 1,
  },
})

export type SidebarNavItemVariant = keyof typeof sidebarNavItemButtonVariants

export type SidebarNavItemSize = keyof typeof sidebarNavItemItemSizes

export const sidebarNavItemSlotRecipe = {
  slots: {
    item: {
      styles: sidebarNavItemItem,
      sizes: sidebarNavItemItemSizes,
    },
    button: {
      styles: sidebarNavItemButton,
      sizes: sidebarNavItemButtonSizes,
      variants: sidebarNavItemButtonVariants,
      svg: {
        vars: sidebarNavItemButtonSvgVars,
        styles: sidebarNavItemButtonSvg,
      },
    },
    endElement: {
      styles: sidebarNavItemEndElement,
      sizes: sidebarNavItemEndElementSizes,
    },
  },
  defaultVariants: {
    variant: 'muted',
    size: 'md',
  },
} as const

export function sidebarNavItemSlotStyles(
  slot: keyof typeof sidebarNavItemSlotRecipe.slots,
  variants?: {
    variant?: SidebarNavItemVariant
    size?: SidebarNavItemSize
  },
) {
  const variant =
    variants?.variant ?? sidebarNavItemSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? sidebarNavItemSlotRecipe.defaultVariants.size
  const def = sidebarNavItemSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
