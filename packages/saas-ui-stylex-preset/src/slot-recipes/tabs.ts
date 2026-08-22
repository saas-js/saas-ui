/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const tabsRoot = stylex.create({
  base: {
    '--tabs-trigger-radius': semanticRadii.control,
    position: 'relative',
  },
})

export const tabsRootSizes = stylex.create({
  xs: {
    '--tabs-height': sizes.controlXs,
    '--tabs-content-padding': spacing._2,
  },
  sm: {
    '--tabs-height': sizes.controlSm,
    '--tabs-content-padding': spacing._3,
  },
  md: {
    '--tabs-height': sizes.controlMd,
    '--tabs-content-padding': spacing._4,
  },
  lg: {
    '--tabs-height': sizes.controlLg,
    '--tabs-content-padding': spacing._4_5,
  },
})

export const tabsList = stylex.create({
  base: {
    display: 'inline-flex',
    position: 'relative',
    isolation: 'isolate',
    '--tabs-indicator-shadow': semanticShadows.xs,
    '--tabs-indicator-bg': semanticColors.bg,
    minHeight: 'var(--tabs-height)',
  },
})

export const tabsListVariants = stylex.create({
  line: {
    display: 'flex',
    borderColor: semanticColors.border,
  },
  pills: {
    gap: spacing._2,
  },
  ghost: {
    gap: spacing._2,
  },
  enclosed: {
    backgroundColor: semanticColors.bgMuted,
    boxShadow: semanticShadows.inset,
    borderRadius: radii.md,
    borderWidth: '1px',
    minHeight: 'calc(var(--tabs-height) - 4px)',
  },
  outline: {
    '--line-thickness': '1px',
    '--line-offset': 'calc(var(--line-thickness) * -1)',
    borderColor: semanticColors.border,
    display: 'flex',
  },
})

export const tabsListFitteds = stylex.create({
  true: {
    display: 'flex',
  },
})

export const tabsListJustifys = stylex.create({
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
})

export const tabsTrigger = stylex.create({
  base: {
    outline: 0,
    minWidth: 'var(--tabs-height)',
    height: 'var(--tabs-height)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: fontWeights.medium,
    position: 'relative',
    cursor: cursor.button,
    gap: spacing._2,
    ':focus-visible': {
      zIndex: 1,
      ':focus-visible': {
        outlineWidth: '1px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineColor: colorPalette.focusRing,
      },
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
})

export const tabsTriggerSizes = stylex.create({
  xs: {
    paddingBlock: spacing._1,
    paddingInline: spacing._2,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    paddingBlock: spacing._1,
    paddingInline: spacing._3,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    paddingBlock: spacing._2,
    paddingInline: spacing._4,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    paddingBlock: spacing._2,
    paddingInline: spacing._4_5,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const tabsTriggerVariants = stylex.create({
  line: {
    color: semanticColors.fgMuted,
    ':hover': {
      color: semanticColors.fgSubtle,
    },
    ':disabled': {
      ':active': {
        backgroundColor: 'initial',
      },
    },
  },
  subtle: {
    borderRadius: 'var(--tabs-trigger-radius)',
    color: semanticColors.fgMuted,
  },
  pills: {
    borderRadius: 'var(--tabs-trigger-radius)',
    color: semanticColors.fgMuted,
    borderWidth: '1px',
    borderColor: semanticColors.borderEmphasized,
    ':hover': {
      backgroundColor: semanticColors.bgMuted,
      color: semanticColors.fgSubtle,
    },
  },
  ghost: {
    borderRadius: 'var(--tabs-trigger-radius)',
    color: semanticColors.fgSubtle,
    ':hover': {
      backgroundColor: colorPalette.muted,
      color: colorPalette.fg,
    },
  },
  enclosed: {
    justifyContent: 'center',
    color: semanticColors.fgMuted,
    borderRadius: 'calc({radii.md} - 1px)',
    ':hover': {
      color: semanticColors.fgSubtle,
    },
  },
  outline: {
    color: semanticColors.fgMuted,
    borderWidth: '1px',
    borderColor: 'transparent',
    ':hover': {
      color: semanticColors.fgSubtle,
    },
  },
  plain: {
    color: semanticColors.fgMuted,
    borderRadius: 'var(--tabs-trigger-radius)',
  },
})

export const tabsTriggerFitteds = stylex.create({
  true: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})

export const tabsContent = stylex.create({
  base: {
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export const tabsIndicator = stylex.create({
  base: {
    width: 'var(--width)',
    height: 'var(--height)',
    borderRadius: 'var(--tabs-indicator-radius)',
    backgroundColor: 'var(--tabs-indicator-bg)',
    boxShadow: 'var(--tabs-indicator-shadow)',
    zIndex: -1,
  },
})

export type TabsFitted = keyof typeof tabsListFitteds

export type TabsJustify = keyof typeof tabsListJustifys

export type TabsSize = keyof typeof tabsRootSizes

export type TabsVariant = keyof typeof tabsListVariants

export const tabsSlotRecipe = {
  slots: {
    root: {
      styles: tabsRoot,
      sizes: tabsRootSizes,
    },
    list: {
      styles: tabsList,
      variants: tabsListVariants,
      fitted: tabsListFitteds,
      justify: tabsListJustifys,
    },
    trigger: {
      styles: tabsTrigger,
      sizes: tabsTriggerSizes,
      variants: tabsTriggerVariants,
      fitted: tabsTriggerFitteds,
    },
    content: {
      styles: tabsContent,
    },
    indicator: {
      styles: tabsIndicator,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
} as const

export function tabsSlotStyles(
  slot: keyof typeof tabsSlotRecipe.slots,
  variants?: {
    size?: TabsSize
    variant?: TabsVariant
  },
) {
  const size = variants?.size ?? tabsSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? tabsSlotRecipe.defaultVariants.variant
  const def = tabsSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
