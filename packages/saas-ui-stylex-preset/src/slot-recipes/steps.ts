/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { stepsIndicatorIconVars } from './steps.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { stepsIndicatorIconVars }

export const stepsRoot = stylex.create({
  base: {
    display: 'flex',
    width: sizes.full,
  },
})

export const stepsRootSizes = stylex.create({
  xs: {
    gap: spacing._2_5,
  },
  sm: {
    gap: spacing._3,
  },
  md: {
    gap: spacing._4,
  },
  lg: {
    gap: spacing._6,
  },
})

export const stepsRootOrientations = stylex.create({
  vertical: {
    flexDirection: 'row',
    height: '100%',
  },
  horizontal: {
    flexDirection: 'column',
    width: '100%',
  },
})

export const stepsList = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    '--steps-gutter': spacing._3,
    '--steps-thickness': '2px',
  },
})

export const stepsListSizes = stylex.create({
  xs: {
    '--steps-size': sizes._6,
    '--steps-icon-size': sizes._3_5,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    '--steps-size': sizes._8,
    '--steps-icon-size': sizes._4,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    '--steps-size': sizes._10,
    '--steps-icon-size': sizes._4,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    '--steps-size': sizes._11,
    '--steps-icon-size': sizes._5,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const stepsListOrientations = stylex.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export const stepsTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    color: semanticColors.fg,
  },
})

export const stepsTitleSizes = stylex.create({
  xs: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const stepsDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
  },
})

export const stepsSeparator = stylex.create({
  base: {
    backgroundColor: semanticColors.border,
    flex: 1,
  },
})

export const stepsSeparatorVariants = stylex.create({
  solid: {},
  subtle: {},
})

export const stepsSeparatorOrientations = stylex.create({
  vertical: {
    position: 'absolute',
    width: 'var(--steps-thickness)',
    height: '100%',
    maxHeight: 'calc(100% - var(--steps-size) - var(--steps-gutter) * 2)',
    top: 'calc(var(--steps-size) + var(--steps-gutter))',
    insetStart: 'calc(var(--steps-size) / 2 - 1px)',
  },
  horizontal: {
    width: '100%',
    height: 'var(--steps-thickness)',
    marginInline: 'var(--steps-gutter)',
  },
})

export const stepsIndicator = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: radii.full,
    fontWeight: fontWeights.medium,
    width: 'var(--steps-size)',
    height: 'var(--steps-size)',
    [stepsIndicatorIconVars.flexShrink]: 0,
    [stepsIndicatorIconVars.width]: 'var(--steps-icon-size)',
    [stepsIndicatorIconVars.height]: 'var(--steps-icon-size)',
  },
})

export const stepsIndicatorVariants = stylex.create({
  solid: {},
  subtle: {},
})

export const stepsIndicatorIcon = stylex.create({
  base: {
    flexShrink: stepsIndicatorIconVars.flexShrink,
    width: stepsIndicatorIconVars.width,
    height: stepsIndicatorIconVars.height,
  },
})

export const stepsItem = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    flex: '1 0 0',
  },
})

export const stepsItemOrientations = stylex.create({
  vertical: {
    alignItems: 'flex-start',
  },
  horizontal: {
    alignItems: 'center',
  },
})

export const stepsTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._3,
    textAlign: 'start',
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    borderRadius: semanticRadii.control,
  },
})

export const stepsContent = stylex.create({
  base: {
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export type StepsOrientation = keyof typeof stepsRootOrientations

export type StepsVariant = keyof typeof stepsSeparatorVariants

export type StepsSize = keyof typeof stepsRootSizes

export const stepsSlotRecipe = {
  slots: {
    root: {
      styles: stepsRoot,
      sizes: stepsRootSizes,
      orientation: stepsRootOrientations,
    },
    list: {
      styles: stepsList,
      sizes: stepsListSizes,
      orientation: stepsListOrientations,
    },
    title: {
      styles: stepsTitle,
      sizes: stepsTitleSizes,
    },
    description: {
      styles: stepsDescription,
    },
    separator: {
      styles: stepsSeparator,
      variants: stepsSeparatorVariants,
      orientation: stepsSeparatorOrientations,
    },
    indicator: {
      styles: stepsIndicator,
      variants: stepsIndicatorVariants,
      icon: {
        vars: stepsIndicatorIconVars,
        styles: stepsIndicatorIcon,
      },
    },
    item: {
      styles: stepsItem,
      orientation: stepsItemOrientations,
    },
    trigger: {
      styles: stepsTrigger,
    },
    content: {
      styles: stepsContent,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    orientation: 'horizontal',
  },
} as const

export function stepsSlotStyles(
  slot: keyof typeof stepsSlotRecipe.slots,
  variants?: {
    size?: StepsSize
    variant?: StepsVariant
    orientation?: StepsOrientation
  },
) {
  const size = variants?.size ?? stepsSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? stepsSlotRecipe.defaultVariants.variant
  const orientation =
    variants?.orientation ?? stepsSlotRecipe.defaultVariants.orientation
  const def = stepsSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'orientation' in def
      ? def.orientation[orientation as keyof typeof def.orientation]
      : false,
  ]
}
