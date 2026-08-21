/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { radioCardItemIndicatorDotVars } from './radio-card.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { radioCardItemIndicatorDotVars }

export const radioCardRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    isolation: 'isolate',
  },
})

export const radioCardItem = stylex.create({
  base: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    position: 'relative',
    borderRadius: semanticRadii.panel,
    ':focus': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.muted} 20%, transparent)`,
    },
    ':disabled': {
      opacity: 0.8,
      borderColor: semanticColors.borderDisabled,
    },
    ':checked': {
      zIndex: 1,
    },
  },
})

export const radioCardItemSizes = stylex.create({
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

export const radioCardItemVariants = stylex.create({
  surface: {
    borderWidth: '1px',
    ':checked': {
      backgroundColor: colorPalette.subtle,
      color: colorPalette.fg,
      borderColor: colorPalette.muted,
    },
  },
  subtle: {
    backgroundColor: semanticColors.bgMuted,
  },
  outline: {
    borderWidth: '1px',
    ':checked': {
      boxShadow: '0 0 0 1px var(--shadow-color)',
      '--shadow-color': colorPalette.solid,
      borderColor: colorPalette.solid,
    },
  },
  solid: {
    borderWidth: '1px',
    ':checked': {
      backgroundColor: colorPalette.solid,
      color: colorPalette.contrast,
      borderColor: colorPalette.solid,
    },
  },
})

export const radioCardItemJustifys = stylex.create({
  start: {
    '--radio-card-justify': 'flex-start',
  },
  end: {
    '--radio-card-justify': 'flex-end',
  },
  center: {
    '--radio-card-justify': 'center',
  },
})

export const radioCardItemAligns = stylex.create({
  start: {
    '--radio-card-align': 'flex-start',
  },
  end: {
    '--radio-card-align': 'flex-end',
  },
  center: {
    '--radio-card-align': 'center',
  },
})

export const radioCardLabel = stylex.create({
  base: {
    display: 'inline-flex',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const radioCardItemText = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const radioCardItemDescription = stylex.create({
  base: {
    opacity: 0.64,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const radioCardItemControl = stylex.create({
  base: {
    display: 'inline-flex',
    flex: 1,
    pos: 'relative',
    borderRadius: 'inherit',
    justifyContent: 'var(--radio-card-justify)',
    alignItems: 'var(--radio-card-align)',
    ':disabled': {
      backgroundColor: semanticColors.bgMuted,
    },
  },
})

export const radioCardItemControlSizes = stylex.create({
  sm: {
    padding: spacing._3,
    gap: spacing._1_5,
  },
  md: {
    padding: spacing._4,
    gap: spacing._2_5,
  },
  lg: {
    padding: spacing._4,
    gap: spacing._3_5,
  },
})

export const radioCardItemControlVariants = stylex.create({
  subtle: {
    ':checked': {
      backgroundColor: colorPalette.muted,
      color: colorPalette.fg,
    },
  },
})

export const radioCardItemControlAligns = stylex.create({
  start: {
    textAlign: 'start',
  },
  end: {
    textAlign: 'end',
  },
  center: {
    textAlign: 'center',
  },
})

export const radioCardItemControlOrientations = stylex.create({
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
})

export const radioCardItemIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    verticalAlign: 'top',
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: radii.full,
    cursor: cursor.radio,
    ':focus-visible': {
      ':focus-visible': {
        outlineWidth: '1px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineColor: colorPalette.focusRing,
      },
    },
    ':invalid': {
      borderColor: semanticColors.borderDestructive,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: cursor.disabled,
    },
    [radioCardItemIndicatorDotVars.height]: '100%',
    [radioCardItemIndicatorDotVars.width]: '100%',
    [radioCardItemIndicatorDotVars.borderRadius]: radii.full,
    [radioCardItemIndicatorDotVars.backgroundColor]: 'currentColor',
    [radioCardItemIndicatorDotVars.scale]: 0.4,
  },
})

export const radioCardItemIndicatorSizes = stylex.create({
  sm: {
    width: sizes._3_5,
    height: sizes._3_5,
  },
  md: {
    width: sizes._4,
    height: sizes._4,
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
  },
})

export const radioCardItemIndicatorVariants = stylex.create({
  surface: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':checked': {
      backgroundColor: colorPalette.solid,
      color: colorPalette.contrast,
      borderColor: colorPalette.solid,
    },
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'inherit',
    ':checked': {
      color: colorPalette.fg,
      borderColor: colorPalette.solid,
    },
    [radioCardItemIndicatorDotVars.scale]: 0.6,
  },
  outline: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':checked': {
      backgroundColor: colorPalette.solid,
      color: colorPalette.contrast,
      borderColor: colorPalette.solid,
    },
  },
  solid: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: 'inherit',
    ':checked': {
      color: colorPalette.solid,
      borderColor: 'currentcolor',
    },
  },
})

export const radioCardItemIndicatorDot = stylex.create({
  base: {
    height: radioCardItemIndicatorDotVars.height,
    width: radioCardItemIndicatorDotVars.width,
    borderRadius: radioCardItemIndicatorDotVars.borderRadius,
    backgroundColor: radioCardItemIndicatorDotVars.backgroundColor,
    scale: radioCardItemIndicatorDotVars.scale,
  },
})

export const radioCardItemAddon = stylex.create({
  base: {
    roundedBottom: 'inherit',
    ':disabled': {
      color: semanticColors.fgMuted,
    },
  },
})

export const radioCardItemAddonSizes = stylex.create({
  sm: {
    paddingInline: spacing._3,
    paddingBlock: spacing._1_5,
    borderTopWidth: '1px',
  },
  md: {
    paddingInline: spacing._4,
    paddingBlock: spacing._2,
    borderTopWidth: '1px',
  },
  lg: {
    paddingInline: spacing._4,
    paddingBlock: spacing._2,
    borderTopWidth: '1px',
  },
})

export const radioCardItemContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: spacing._1,
    justifyContent: 'var(--radio-card-justify)',
    alignItems: 'var(--radio-card-align)',
  },
})

export type RadioCardSize = keyof typeof radioCardItemSizes

export type RadioCardVariant = keyof typeof radioCardItemVariants

export type RadioCardJustify = keyof typeof radioCardItemJustifys

export type RadioCardAlign = keyof typeof radioCardItemAligns

export type RadioCardOrientation = keyof typeof radioCardItemControlOrientations

export const radioCardSlotRecipe = {
  slots: {
    root: {
      styles: radioCardRoot,
    },
    item: {
      styles: radioCardItem,
      sizes: radioCardItemSizes,
      variants: radioCardItemVariants,
      justify: radioCardItemJustifys,
      align: radioCardItemAligns,
    },
    label: {
      styles: radioCardLabel,
    },
    itemText: {
      styles: radioCardItemText,
    },
    itemDescription: {
      styles: radioCardItemDescription,
    },
    itemControl: {
      styles: radioCardItemControl,
      sizes: radioCardItemControlSizes,
      variants: radioCardItemControlVariants,
      align: radioCardItemControlAligns,
      orientation: radioCardItemControlOrientations,
    },
    itemIndicator: {
      styles: radioCardItemIndicator,
      sizes: radioCardItemIndicatorSizes,
      variants: radioCardItemIndicatorVariants,
      dot: {
        vars: radioCardItemIndicatorDotVars,
        styles: radioCardItemIndicatorDot,
      },
    },
    itemAddon: {
      styles: radioCardItemAddon,
      sizes: radioCardItemAddonSizes,
    },
    itemContent: {
      styles: radioCardItemContent,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    align: 'start',
    orientation: 'horizontal',
  },
} as const

export function radioCardSlotStyles(
  slot: keyof typeof radioCardSlotRecipe.slots,
  variants?: {
    size?: RadioCardSize
    variant?: RadioCardVariant
    align?: RadioCardAlign
    orientation?: RadioCardOrientation
  },
) {
  const size = variants?.size ?? radioCardSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? radioCardSlotRecipe.defaultVariants.variant
  const align = variants?.align ?? radioCardSlotRecipe.defaultVariants.align
  const orientation =
    variants?.orientation ?? radioCardSlotRecipe.defaultVariants.orientation
  const def = radioCardSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'align' in def ? def.align[align as keyof typeof def.align] : false,
    'orientation' in def
      ? def.orientation[orientation as keyof typeof def.orientation]
      : false,
  ]
}
