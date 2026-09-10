/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export const navbarRoot = stylex.create({
  base: {
    display: 'flex',
    zIndex: zIndices.layer3,
    width: sizes.full,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.moderate,
    transitionTimingFunction: 'ease-in-out',
  },
})

export const navbarRootSizes = stylex.create({
  md: {
    fontSize: fontSizes.sm,
  },
})

export const navbarRootVariants = stylex.create({
  neutral: {
    backgroundColor: semanticColors.bgPanel,
    color: semanticColors.fg,
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  glass: {
    backgroundColor: semanticColors.bgOverlay,
    backdropFilter: 'var(--overlay-effect)',
    color: semanticColors.fg,
  },
})

export const navbarContent = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: sizes.full,
    height: 'var(--navbar-height)',
    flexWrap: 'nowrap',
  },
})

export const navbarContentSizes = stylex.create({
  md: {
    gap: spacing._4,
  },
})

export const navbarBrand = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: sizes.full,
    backgroundColor: 'transparent',
    textDecoration: 'none',
    color: 'inherit',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
})

export const navbarItemGroup = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: sizes.full,
    backgroundColor: 'transparent',
  },
})

export const navbarLink = stylex.create({
  base: {
    backgroundColor: 'transparent',
    color: 'currentColor',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    borderRadius: semanticRadii.control,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.moderate,
    lineHeight: 1,
    ':focus-visible': {
      outline: 'none',
      boxShadow: semanticShadows.outline,
    },
    ':hover': {
      backgroundColor: semanticColors.bgMuted,
      textDecoration: 'none',
    },
    ':active': {
      fontWeight: fontWeights.semibold,
    },
  },
})

export const navbarLinkSizes = stylex.create({
  md: {
    paddingInline: spacing._3,
    height: sizes._8,
  },
})

export const navbarLinkVariants = stylex.create({
  solid: {
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.contrast} 10%, transparent)`,
    },
  },
})

export type NavbarVariant = keyof typeof navbarRootVariants

export type NavbarSize = keyof typeof navbarRootSizes

export const navbarSlotRecipe = {
  slots: {
    root: {
      styles: navbarRoot,
      sizes: navbarRootSizes,
      variants: navbarRootVariants,
    },
    content: {
      styles: navbarContent,
      sizes: navbarContentSizes,
    },
    brand: {
      styles: navbarBrand,
    },
    itemGroup: {
      styles: navbarItemGroup,
    },
    link: {
      styles: navbarLink,
      sizes: navbarLinkSizes,
      variants: navbarLinkVariants,
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
} as const

export function navbarSlotStyles(
  slot: keyof typeof navbarSlotRecipe.slots,
  variants?: {
    variant?: NavbarVariant
    size?: NavbarSize
  },
) {
  const variant = variants?.variant ?? navbarSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? navbarSlotRecipe.defaultVariants.size
  const def = navbarSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
