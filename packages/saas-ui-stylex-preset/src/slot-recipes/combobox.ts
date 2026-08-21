/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  comboboxIndicatorGroupIconVars,
  comboboxItemIconVars,
} from './combobox.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export { comboboxIndicatorGroupIconVars, comboboxItemIconVars }

export const comboboxRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const comboboxRootSizes = stylex.create({
  xs: {
    '--combobox-input-height': sizes.controlXs,
    '--combobox-input-padding-x': spacing._2,
    '--combobox-indicator-size': sizes._3_5,
  },
  sm: {
    '--combobox-input-height': sizes.controlSm,
    '--combobox-input-padding-x': spacing._2_5,
    '--combobox-indicator-size': sizes._4,
  },
  md: {
    '--combobox-input-height': sizes.controlMd,
    '--combobox-input-padding-x': spacing._3,
    '--combobox-indicator-size': sizes._4,
  },
  lg: {
    '--combobox-input-height': sizes.controlLg,
    '--combobox-input-padding-x': spacing._4,
    '--combobox-indicator-size': sizes._5,
  },
})

export const comboboxLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    userSelect: 'none',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const comboboxInput = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: semanticColors.bgPanel,
    width: sizes.full,
    minHeight: 'var(--combobox-input-height)',
    paddingInline: 'var(--combobox-input-padding-x)',
    '--input-height': 'var(--combobox-input-height)',
    borderRadius: semanticRadii.control,
    outline: 0,
    userSelect: 'none',
    textAlign: 'start',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const comboboxInputSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
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

export const comboboxInputVariants = stylex.create({
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
  subtle: {
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
  flushed: {
    backgroundColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomColor: semanticColors.border,
    borderRadius: 0,
    paddingInline: 0,
    ':focus-visible': {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
    },
  },
})

export const comboboxTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '--input-height': 'var(--combobox-input-height)',
  },
})

export const comboboxTriggerSizes = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    gap: spacing._1,
  },
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    gap: spacing._1,
  },
  md: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    gap: spacing._2,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingBlock: spacing._3,
    gap: spacing._2,
  },
})

export const comboboxClearTrigger = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    pointerEvents: 'auto',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    borderRadius: semanticRadii.control,
  },
})

export const comboboxControl = stylex.create({
  base: {
    pos: 'relative',
  },
})

export const comboboxIndicatorGroup = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing._1,
    pos: 'absolute',
    insetEnd: 0,
    top: 0,
    bottom: 0,
    paddingInline: 'var(--combobox-input-padding-x)',
    [comboboxIndicatorGroupIconVars.width]: 'var(--combobox-indicator-size)',
    [comboboxIndicatorGroupIconVars.height]: 'var(--combobox-indicator-size)',
  },
})

export const comboboxIndicatorGroupVariants = stylex.create({
  flushed: {
    paddingInline: 0,
  },
})

export const comboboxIndicatorGroupIcon = stylex.create({
  base: {
    width: comboboxIndicatorGroupIconVars.width,
    height: comboboxIndicatorGroupIconVars.height,
  },
})

export const comboboxContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '--menu-z-index': zIndices.layer3,
    zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
    outline: 0,
    maxHeight: 'var(--available-height)',
    overflowY: 'auto',
  },
})

export const comboboxContentSizes = stylex.create({
  xs: {
    '--combobox-item-padding-x': spacing._1,
    '--combobox-item-padding-y': spacing._0_5,
    '--combobox-indicator-size': sizes._3_5,
    borderRadius: semanticRadii.panel,
    padding: spacing._0_5,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    '--combobox-item-padding-x': spacing._1_5,
    '--combobox-item-padding-y': spacing._1,
    '--combobox-indicator-size': sizes._4,
    borderRadius: semanticRadii.panel,
    padding: spacing._1,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    '--combobox-item-padding-x': spacing._2,
    '--combobox-item-padding-y': spacing._1_5,
    '--combobox-indicator-size': sizes._4,
    borderRadius: semanticRadii.panel,
    padding: spacing._1,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    '--combobox-item-padding-y': spacing._2,
    '--combobox-item-padding-x': spacing._3,
    '--combobox-indicator-size': sizes._5,
    borderRadius: semanticRadii.panel,
    padding: spacing._1,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const comboboxItem = stylex.create({
  base: {
    position: 'relative',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    paddingBlock: 'var(--combobox-item-padding-y)',
    paddingInline: 'var(--combobox-item-padding-x)',
    cursor: cursor.option,
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'start',
    borderRadius: semanticRadii.control,
    ':disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    [comboboxItemIconVars.width]: 'var(--combobox-indicator-size)',
    [comboboxItemIconVars.height]: 'var(--combobox-indicator-size)',
  },
})

export const comboboxItemSizes = stylex.create({
  xs: {
    borderRadius: 'max(0px, calc({radii.panel} - {sizes.0.5}))',
  },
  sm: {
    borderRadius: 'max(0px, calc({radii.panel} - {sizes.0.5}))',
  },
  md: {
    borderRadius: 'max(0px, calc({radii.panel} - {sizes.1}))',
  },
  lg: {
    borderRadius: 'max(0px, calc({radii.panel} - {sizes.1}))',
  },
})

export const comboboxItemIcon = stylex.create({
  base: {
    width: comboboxItemIconVars.width,
    height: comboboxItemIconVars.height,
  },
})

export const comboboxEmpty = stylex.create({
  base: {
    paddingBlock: 'var(--combobox-item-padding-y)',
    paddingInline: 'var(--combobox-item-padding-x)',
  },
})

export const comboboxItemText = stylex.create({
  base: {
    flex: 1,
  },
})

export const comboboxItemGroup = stylex.create({
  base: {
    paddingBottom: 'var(--combobox-item-padding-y)',
    ':last-child': {
      paddingBottom: 0,
    },
  },
})

export const comboboxItemGroupLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    paddingBlock: 'var(--combobox-item-padding-y)',
    paddingInline: 'var(--combobox-item-padding-x)',
  },
})

export const comboboxItemIndicator = stylex.create({
  base: {},
})

export const comboboxItemIndicatorSizes = stylex.create({
  md: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export type ComboboxVariant = keyof typeof comboboxInputVariants

export type ComboboxSize = keyof typeof comboboxRootSizes

export const comboboxSlotRecipe = {
  slots: {
    root: {
      styles: comboboxRoot,
      sizes: comboboxRootSizes,
    },
    label: {
      styles: comboboxLabel,
    },
    input: {
      styles: comboboxInput,
      sizes: comboboxInputSizes,
      variants: comboboxInputVariants,
    },
    trigger: {
      styles: comboboxTrigger,
      sizes: comboboxTriggerSizes,
    },
    clearTrigger: {
      styles: comboboxClearTrigger,
    },
    control: {
      styles: comboboxControl,
    },
    indicatorGroup: {
      styles: comboboxIndicatorGroup,
      variants: comboboxIndicatorGroupVariants,
      icon: {
        vars: comboboxIndicatorGroupIconVars,
        styles: comboboxIndicatorGroupIcon,
      },
    },
    content: {
      styles: comboboxContent,
      sizes: comboboxContentSizes,
    },
    item: {
      styles: comboboxItem,
      sizes: comboboxItemSizes,
      icon: {
        vars: comboboxItemIconVars,
        styles: comboboxItemIcon,
      },
    },
    empty: {
      styles: comboboxEmpty,
    },
    itemText: {
      styles: comboboxItemText,
    },
    itemGroup: {
      styles: comboboxItemGroup,
    },
    itemGroupLabel: {
      styles: comboboxItemGroupLabel,
    },
    itemIndicator: {
      styles: comboboxItemIndicator,
      sizes: comboboxItemIndicatorSizes,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function comboboxSlotStyles(
  slot: keyof typeof comboboxSlotRecipe.slots,
  variants?: {
    size?: ComboboxSize
    variant?: ComboboxVariant
  },
) {
  const size = variants?.size ?? comboboxSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? comboboxSlotRecipe.defaultVariants.variant
  const def = comboboxSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
