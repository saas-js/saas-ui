/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const alertRoot = stylex.create({
  base: {
    width: sizes.full,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
  },
})

export const alertRootSizes = stylex.create({
  sm: {
    gap: spacing._2,
    paddingInline: spacing._3,
    paddingBlock: spacing._3,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    borderRadius: semanticRadii.panel,
  },
  md: {
    gap: spacing._3,
    paddingInline: spacing._4,
    paddingBlock: spacing._4,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    borderRadius: semanticRadii.panel,
  },
  lg: {
    gap: spacing._3,
    paddingInline: spacing._4,
    paddingBlock: spacing._4,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    borderRadius: semanticRadii.panel,
  },
})

export const alertRootVariants = stylex.create({
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
  },
  surface: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.solid,
  },
  outline: {
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.subtle,
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
})

export const alertRootStatus = stylex.create({
  info: {},
  warning: {},
  success: {},
  error: {},
  neutral: {},
})

export const alertTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const alertDescription = stylex.create({
  base: {
    display: 'inline',
  },
})

export const alertIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '1em',
    height: '1em',
  },
})

export const alertIndicatorSizes = stylex.create({
  sm: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  md: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
  lg: {
    fontSize: fontSizes._2xl,
    lineHeight: lineHeights._2xl,
  },
})

export const alertIndicatorVariants = stylex.create({
  surface: {
    color: colorPalette.fg,
  },
  outline: {
    color: colorPalette.fg,
  },
  solid: {
    color: colorPalette.contrast,
  },
})

export const alertContent = stylex.create({
  base: {
    display: 'flex',
    flex: 1,
    gap: spacing._1,
  },
})

export const alertContentInlines = stylex.create({
  true: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  false: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export type AlertStatus = keyof typeof alertRootStatus

export type AlertInline = keyof typeof alertContentInlines

export type AlertVariant = keyof typeof alertRootVariants

export type AlertSize = keyof typeof alertRootSizes

export const alertSlotRecipe = {
  slots: {
    root: {
      styles: alertRoot,
      sizes: alertRootSizes,
      variants: alertRootVariants,
      status: alertRootStatus,
    },
    title: {
      styles: alertTitle,
    },
    description: {
      styles: alertDescription,
    },
    indicator: {
      styles: alertIndicator,
      sizes: alertIndicatorSizes,
      variants: alertIndicatorVariants,
    },
    content: {
      styles: alertContent,
      inline: alertContentInlines,
    },
  },
  defaultVariants: {
    status: 'info',
    variant: 'subtle',
    size: 'md',
    inline: 'false',
  },
} as const

export function alertSlotStyles(
  slot: keyof typeof alertSlotRecipe.slots,
  variants?: {
    status?: AlertStatus
    variant?: AlertVariant
    size?: AlertSize
    inline?: AlertInline
  },
) {
  const status = variants?.status ?? alertSlotRecipe.defaultVariants.status
  const variant = variants?.variant ?? alertSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? alertSlotRecipe.defaultVariants.size
  const inline = variants?.inline ?? alertSlotRecipe.defaultVariants.inline
  const def = alertSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'status' in def ? def.status[status as keyof typeof def.status] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'inline' in def ? def.inline[inline as keyof typeof def.inline] : false,
  ]
}
