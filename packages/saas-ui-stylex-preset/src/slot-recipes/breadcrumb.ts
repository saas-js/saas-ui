/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  breadcrumbSeparatorIconVars,
  breadcrumbEllipsisIconVars,
} from './breadcrumb.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { breadcrumbSeparatorIconVars, breadcrumbEllipsisIconVars }

export const breadcrumbList = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word',
    color: semanticColors.fgMuted,
  },
})

export const breadcrumbListSizes = stylex.create({
  sm: {
    gap: spacing._1,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    gap: spacing._1_5,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    gap: spacing._2,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const breadcrumbLink = stylex.create({
  base: {
    outline: 0,
    textDecoration: 'none',
    borderRadius: semanticRadii.control,
    ':focus': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._2,
  },
})

export const breadcrumbLinkVariants = stylex.create({
  underline: {
    color: colorPalette.fg,
    textDecoration: 'underline',
    textUnderlineOffset: '0.2em',
    textDecorationColor: `color-mix(in oklch, ${colorPalette.fg} 20%, transparent)`,
    ':hover': {
      textDecorationColor: colorPalette.fg,
    },
  },
  plain: {
    color: semanticColors.fgMuted,
    ':hover': {
      color: semanticColors.fg,
    },
  },
})

export const breadcrumbItem = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
  },
})

export const breadcrumbSeparator = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    opacity: 0.8,
    [breadcrumbSeparatorIconVars.width]: '1em',
    [breadcrumbSeparatorIconVars.height]: '1em',
  },
})

export const breadcrumbSeparatorIcon = stylex.create({
  base: {
    width: breadcrumbSeparatorIconVars.width,
    height: breadcrumbSeparatorIconVars.height,
  },
})

export const breadcrumbEllipsis = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    [breadcrumbEllipsisIconVars.width]: '1em',
    [breadcrumbEllipsisIconVars.height]: '1em',
  },
})

export const breadcrumbEllipsisIcon = stylex.create({
  base: {
    width: breadcrumbEllipsisIconVars.width,
    height: breadcrumbEllipsisIconVars.height,
  },
})

export const breadcrumbCurrentLink = stylex.create({
  base: {},
})

export const breadcrumbCurrentLinkVariants = stylex.create({
  underline: {
    color: colorPalette.fg,
  },
  plain: {
    color: semanticColors.fg,
  },
})

export type BreadcrumbVariant = keyof typeof breadcrumbLinkVariants

export type BreadcrumbSize = keyof typeof breadcrumbListSizes

export const breadcrumbSlotRecipe = {
  slots: {
    list: {
      styles: breadcrumbList,
      sizes: breadcrumbListSizes,
    },
    link: {
      styles: breadcrumbLink,
      variants: breadcrumbLinkVariants,
    },
    item: {
      styles: breadcrumbItem,
    },
    separator: {
      styles: breadcrumbSeparator,
      icon: {
        vars: breadcrumbSeparatorIconVars,
        styles: breadcrumbSeparatorIcon,
      },
    },
    ellipsis: {
      styles: breadcrumbEllipsis,
      icon: {
        vars: breadcrumbEllipsisIconVars,
        styles: breadcrumbEllipsisIcon,
      },
    },
    currentLink: {
      styles: breadcrumbCurrentLink,
      variants: breadcrumbCurrentLinkVariants,
    },
  },
  defaultVariants: {
    variant: 'plain',
    size: 'md',
  },
} as const

export function breadcrumbSlotStyles(
  slot: keyof typeof breadcrumbSlotRecipe.slots,
  variants?: {
    variant?: BreadcrumbVariant
    size?: BreadcrumbSize
  },
) {
  const variant =
    variants?.variant ?? breadcrumbSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? breadcrumbSlotRecipe.defaultVariants.size
  const def = breadcrumbSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
