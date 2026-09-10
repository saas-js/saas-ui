/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const switchRoot = stylex.create({
  base: {
    display: 'inline-flex',
    gap: spacing._2_5,
    alignItems: 'center',
    position: 'relative',
    verticalAlign: 'middle',
    '--switch-diff': 'calc(var(--switch-width) - var(--switch-height))',
    '--switch-x': '[object Object]',
  },
})

export const switchRootSizes = stylex.create({
  xs: {
    '--switch-width': sizes._6,
    '--switch-height': sizes._3,
    '--switch-indicator-font-size': fontSizes.xs,
  },
  sm: {
    '--switch-width': sizes._8,
    '--switch-height': sizes._4,
    '--switch-indicator-font-size': fontSizes.xs,
  },
  md: {
    '--switch-width': sizes._10,
    '--switch-height': sizes._5,
    '--switch-indicator-font-size': fontSizes.sm,
  },
  lg: {
    '--switch-width': sizes._12,
    '--switch-height': sizes._6,
    '--switch-indicator-font-size': fontSizes.md,
  },
})

export const switchLabel = stylex.create({
  base: {
    lineHeight: 1,
    userSelect: 'none',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const switchIndicator = stylex.create({
  base: {
    position: 'absolute',
    height: 'var(--switch-height)',
    width: 'var(--switch-height)',
    fontSize: 'var(--switch-indicator-font-size)',
    fontWeight: fontWeights.medium,
    flexShrink: 0,
    userSelect: 'none',
    display: 'grid',
    placeContent: 'center',
    transition: 'inset-inline-start 0.12s ease',
    insetInlineStart: 'calc(var(--switch-x) - 2px)',
    ':checked': {
      insetInlineStart: '2px',
    },
  },
})

export const switchControl = stylex.create({
  base: {
    display: 'inline-flex',
    gap: '0.5rem',
    flexShrink: 0,
    justifyContent: 'flex-start',
    cursor: cursor.switch,
    borderRadius: radii.full,
    position: 'relative',
    width: 'var(--switch-width)',
    height: 'var(--switch-height)',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ':invalid': {
      '--focus-ring-color': semanticColors.borderError,
    },
  },
})

export const switchControlVariants = stylex.create({
  solid: {
    borderRadius: radii.full,
    backgroundColor: semanticColors.bgEmphasized,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':checked': {
      backgroundColor: colorPalette.solid,
    },
  },
  raised: {
    borderRadius: radii.full,
    height: 'calc(var(--switch-height) / 2)',
    backgroundColor: semanticColors.bgMuted,
    boxShadow: semanticShadows.inset,
    ':checked': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 60%, transparent)`,
    },
  },
})

export const switchThumb = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transitionProperty: 'translate',
    transitionDuration: durations.fast,
    borderRadius: 'inherit',
    ':checked': {
      translate: 'var(--switch-x) 0',
    },
  },
})

export const switchThumbVariants = stylex.create({
  solid: {
    backgroundColor: colors.white,
    width: 'var(--switch-height)',
    height: 'var(--switch-height)',
    scale: 0.8,
    boxShadow: semanticShadows.sm,
    ':checked': {
      backgroundColor: colorPalette.contrast,
    },
  },
  raised: {
    width: 'var(--switch-height)',
    height: 'var(--switch-height)',
    position: 'relative',
    top: 'calc(var(--switch-height) * -0.25)',
    backgroundColor: colors.white,
    boxShadow: semanticShadows.xs,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':checked': {
      backgroundColor: colorPalette.solid,
    },
  },
})

export type SwitchVariant = keyof typeof switchControlVariants

export type SwitchSize = keyof typeof switchRootSizes

export const switchSlotRecipe = {
  slots: {
    root: {
      styles: switchRoot,
      sizes: switchRootSizes,
    },
    label: {
      styles: switchLabel,
    },
    indicator: {
      styles: switchIndicator,
    },
    control: {
      styles: switchControl,
      variants: switchControlVariants,
    },
    thumb: {
      styles: switchThumb,
      variants: switchThumbVariants,
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
} as const

export function switchSlotStyles(
  slot: keyof typeof switchSlotRecipe.slots,
  variants?: {
    variant?: SwitchVariant
    size?: SwitchSize
  },
) {
  const variant = variants?.variant ?? switchSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? switchSlotRecipe.defaultVariants.size
  const def = switchSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
