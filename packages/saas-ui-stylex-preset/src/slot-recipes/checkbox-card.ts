/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const checkboxCardRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    position: 'relative',
    borderRadius: semanticRadii.panel,
    flex: 1,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':disabled': {
      opacity: 0.8,
      borderColor: semanticColors.borderSubtle,
    },
    ':invalid': {
      outline: '2px solid',
      outlineColor: semanticColors.borderError,
    },
  },
})

export const checkboxCardRootSizes = stylex.create({
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

export const checkboxCardRootVariants = stylex.create({
  surface: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':checked': {
      backgroundColor: colorPalette.subtle,
      color: colorPalette.fg,
      borderColor: colorPalette.muted,
    },
    ':disabled': {
      backgroundColor: semanticColors.bgMuted,
    },
  },
  subtle: {
    backgroundColor: semanticColors.bgMuted,
  },
  outline: {
    borderWidth: '1px',
    borderColor: semanticColors.border,
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

export const checkboxCardRootJustifys = stylex.create({
  start: {
    '--checkbox-card-justify': 'flex-start',
  },
  end: {
    '--checkbox-card-justify': 'flex-end',
  },
  center: {
    '--checkbox-card-justify': 'center',
  },
})

export const checkboxCardRootAligns = stylex.create({
  start: {
    '--checkbox-card-align': 'flex-start',
  },
  end: {
    '--checkbox-card-align': 'flex-end',
  },
  center: {
    '--checkbox-card-align': 'center',
  },
})

export const checkboxCardControl = stylex.create({
  base: {
    display: 'inline-flex',
    flex: 1,
    position: 'relative',
    borderRadius: semanticRadii.panel,
    justifyContent: 'var(--checkbox-card-justify)',
    alignItems: 'var(--checkbox-card-align)',
  },
})

export const checkboxCardControlSizes = stylex.create({
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

export const checkboxCardControlVariants = stylex.create({
  subtle: {
    ':checked': {
      backgroundColor: colorPalette.muted,
      color: colorPalette.fg,
    },
  },
})

export const checkboxCardControlOrientations = stylex.create({
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
})

export const checkboxCardLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkboxCardDescription = stylex.create({
  base: {
    opacity: 0.64,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const checkboxCardAddon = stylex.create({
  base: {
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkboxCardAddonSizes = stylex.create({
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

export const checkboxCardIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: colors.white,
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: semanticRadii.control,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':invalid': {
      borderColor: semanticColors.borderError,
    },
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const checkboxCardIndicatorSizes = stylex.create({
  sm: {
    width: sizes._3_5,
    height: sizes._3_5,
  },
  md: {
    width: sizes._4,
    height: sizes._4,
    padding: spacing._0_5,
  },
  lg: {
    width: sizes._5,
    height: sizes._5,
    padding: spacing._0_5,
  },
})

export const checkboxCardIndicatorVariants = stylex.create({
  surface: {
    borderColor: semanticColors.borderEmphasized,
  },
  subtle: {},
  outline: {
    borderColor: semanticColors.borderEmphasized,
  },
  solid: {
    borderColor: semanticColors.border,
    color: colorPalette.fg,
  },
})

export const checkboxCardContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: spacing._1,
    justifyContent: 'var(--checkbox-card-justify)',
    alignItems: 'var(--checkbox-card-align)',
  },
})

export const checkboxCardContentAligns = stylex.create({
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

export type CheckboxCardSize = keyof typeof checkboxCardRootSizes

export type CheckboxCardVariant = keyof typeof checkboxCardRootVariants

export type CheckboxCardJustify = keyof typeof checkboxCardRootJustifys

export type CheckboxCardAlign = keyof typeof checkboxCardRootAligns

export type CheckboxCardOrientation =
  keyof typeof checkboxCardControlOrientations

export const checkboxCardSlotRecipe = {
  slots: {
    root: {
      styles: checkboxCardRoot,
      sizes: checkboxCardRootSizes,
      variants: checkboxCardRootVariants,
      justify: checkboxCardRootJustifys,
      align: checkboxCardRootAligns,
    },
    control: {
      styles: checkboxCardControl,
      sizes: checkboxCardControlSizes,
      variants: checkboxCardControlVariants,
      orientation: checkboxCardControlOrientations,
    },
    label: {
      styles: checkboxCardLabel,
    },
    description: {
      styles: checkboxCardDescription,
    },
    addon: {
      styles: checkboxCardAddon,
      sizes: checkboxCardAddonSizes,
    },
    indicator: {
      styles: checkboxCardIndicator,
      sizes: checkboxCardIndicatorSizes,
      variants: checkboxCardIndicatorVariants,
    },
    content: {
      styles: checkboxCardContent,
      align: checkboxCardContentAligns,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    align: 'start',
    orientation: 'horizontal',
  },
} as const

export function checkboxCardSlotStyles(
  slot: keyof typeof checkboxCardSlotRecipe.slots,
  variants?: {
    size?: CheckboxCardSize
    variant?: CheckboxCardVariant
    align?: CheckboxCardAlign
    orientation?: CheckboxCardOrientation
  },
) {
  const size = variants?.size ?? checkboxCardSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? checkboxCardSlotRecipe.defaultVariants.variant
  const align = variants?.align ?? checkboxCardSlotRecipe.defaultVariants.align
  const orientation =
    variants?.orientation ?? checkboxCardSlotRecipe.defaultVariants.orientation
  const def = checkboxCardSlotRecipe.slots[slot]

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
