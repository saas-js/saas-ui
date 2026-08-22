/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  datePickerTriggerIconVars,
  datePickerPrevTriggerIconVars,
  datePickerNextTriggerIconVars,
  datePickerClearTriggerIconVars,
} from './date-picker.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { zIndices } from '../tokens/z-indices.stylex.ts'

export {
  datePickerTriggerIconVars,
  datePickerPrevTriggerIconVars,
  datePickerNextTriggerIconVars,
  datePickerClearTriggerIconVars,
}

export const datePickerRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
    '--datepicker-indicators-offset': sizes._3,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const datePickerRootSizes = stylex.create({
  xs: {
    '--datepicker-input-height': sizes._6,
    '--datepicker-input-px': sizes._2,
    '--datepicker-indicators-offset': sizes._2,
  },
  sm: {
    '--datepicker-input-height': sizes._7,
    '--datepicker-input-px': sizes._2_5,
    '--datepicker-indicators-offset': sizes._2_5,
  },
  md: {
    '--datepicker-input-height': sizes._8,
    '--datepicker-input-px': sizes._3,
  },
  lg: {
    '--datepicker-input-height': sizes._10,
    '--datepicker-input-px': sizes._4_5,
  },
  xl: {
    '--datepicker-input-height': sizes._12,
    '--datepicker-input-px': sizes._6,
  },
})

export const datePickerLabel = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  },
})

export const datePickerIndicatorGroup = stylex.create({
  base: {
    position: 'absolute',
    insetEnd: 'var(--datepicker-indicators-offset)',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing._1,
  },
})

export const datePickerIndicatorGroupVariants = stylex.create({
  flushed: {
    insetEnd: 0,
  },
})

export const datePickerControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    width: sizes.full,
    position: 'relative',
  },
})

export const datePickerInput = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
    height: 'var(--datepicker-input-height)',
    '--input-height': 'var(--datepicker-input-height)',
    paddingInline: 'var(--datepicker-input-px)',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    backgroundColor: 'transparent',
    borderRadius: semanticRadii.controlMd,
    outline: 0,
    appearance: 'none',
    color: semanticColors.fg,
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const datePickerInputVariants = stylex.create({
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
    '--focus-ring-color': 'var(--focus-color)',
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
    '--focus-ring-color': 'var(--focus-color)',
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
      ':invalid': {
        borderColor: 'var(--error-color)',
        boxShadow: '0px 1px 0px 0px var(--error-color)',
      },
    },
  },
})

export const datePickerTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes._6,
    height: sizes._6,
    borderRadius: semanticRadii.controlSm,
    color: semanticColors.fgMuted,
    outline: 'none',
    ':hover': {
      color: semanticColors.fg,
    },
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    [datePickerTriggerIconVars.width]: sizes._4,
    [datePickerTriggerIconVars.height]: sizes._4,
  },
})

export const datePickerTriggerIcon = stylex.create({
  base: {
    width: datePickerTriggerIconVars.width,
    height: datePickerTriggerIconVars.height,
  },
})

export const datePickerContent = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._3,
    padding: spacing._3,
    minWidth: '18rem',
    color: semanticColors.fg,
    '--date-picker-z-index': zIndices.layer3,
    zIndex: 'calc(var(--date-picker-z-index) + var(--layer-index, 0))',
    outline: 'none',
  },
})

export const datePickerView = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._3,
  },
})

export const datePickerViewSizes = stylex.create({
  xs: {
    '--table-cell-size': sizes._8,
    '--datepicker-nav-trigger-size': sizes._7,
    '--datepicker-select-height': sizes._8,
  },
  sm: {
    '--table-cell-size': sizes._9,
    '--datepicker-nav-trigger-size': sizes._8,
    '--datepicker-select-height': sizes._9,
  },
  md: {
    '--table-cell-size': sizes._10,
    '--datepicker-nav-trigger-size': sizes._8,
    '--datepicker-select-height': sizes._10,
  },
  lg: {
    '--table-cell-size': sizes._10,
    '--datepicker-nav-trigger-size': sizes._9,
    '--datepicker-select-height': sizes._10,
  },
  xl: {
    '--table-cell-size': sizes._10,
    '--datepicker-nav-trigger-size': sizes._9,
    '--datepicker-select-height': sizes._10,
  },
})

export const datePickerViewControl = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing._2,
    height: 'var(--datepicker-nav-trigger-size)',
  },
})

export const datePickerViewTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing._1,
    paddingBlock: spacing._1_5,
    paddingInline: spacing._2,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.semibold,
    borderRadius: semanticRadii.controlMd,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
  },
})

export const datePickerPrevTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--datepicker-nav-trigger-size)',
    height: 'var(--datepicker-nav-trigger-size)',
    borderRadius: semanticRadii.controlMd,
    color: semanticColors.fg,
    ':focus-visible': {
      boxShadow: '0 0 0 2px var(--colors-color-palette-focus-ring)',
    },
    focusRingWidth: '2px',
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
    ':disabled': {
      opacity: 0.5,
    },
    [datePickerPrevTriggerIconVars.width]: sizes._4,
    [datePickerPrevTriggerIconVars.height]: sizes._4,
  },
})

export const datePickerPrevTriggerIcon = stylex.create({
  base: {
    width: datePickerPrevTriggerIconVars.width,
    height: datePickerPrevTriggerIconVars.height,
  },
})

export const datePickerNextTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--datepicker-nav-trigger-size)',
    height: 'var(--datepicker-nav-trigger-size)',
    borderRadius: semanticRadii.controlMd,
    color: semanticColors.fg,
    ':focus-visible': {
      boxShadow: '0 0 0 2px var(--colors-color-palette-focus-ring)',
    },
    focusRingWidth: '2px',
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
    ':disabled': {
      opacity: 0.5,
    },
    [datePickerNextTriggerIconVars.width]: sizes._4,
    [datePickerNextTriggerIconVars.height]: sizes._4,
  },
})

export const datePickerNextTriggerIcon = stylex.create({
  base: {
    width: datePickerNextTriggerIconVars.width,
    height: datePickerNextTriggerIconVars.height,
  },
})

export const datePickerRangeText = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.semibold,
  },
})

export const datePickerTable = stylex.create({
  base: {
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
})

export const datePickerTableHeader = stylex.create({
  base: {
    width: 'var(--table-cell-size)',
    paddingBlock: spacing._2,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
    color: semanticColors.fgMuted,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

export const datePickerTableCell = stylex.create({
  base: {
    paddingBlock: spacing._0_5,
  },
})

export const datePickerTableCellTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'var(--table-cell-size)',
    minHeight: 'var(--table-cell-size)',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    borderRadius: semanticRadii.controlMd,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    focusRingOffset: '0px',
    cursor: 'default',
    position: 'relative',
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
    ':disabled': {
      opacity: 0.4,
    },
  },
})

export const datePickerTableCellTriggerHideOutsideDays = stylex.create({
  true: {},
})

export const datePickerMonthSelect = stylex.create({
  base: {
    height: 'var(--datepicker-select-height)',
    ps: 2,
    pe: 8,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    borderWidth: '1px',
    borderRadius: semanticRadii.controlMd,
    outline: 'none',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    appearance: 'none',
    fieldSizing: 'content',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.375rem center',
    backgroundSize: '1.25em',
  },
})

export const datePickerYearSelect = stylex.create({
  base: {
    height: 'var(--datepicker-select-height)',
    ps: 2,
    pe: 8,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    borderWidth: '1px',
    borderRadius: semanticRadii.controlMd,
    outline: 'none',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    appearance: 'none',
    fieldSizing: 'content',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.375rem center',
    backgroundSize: '1.25em',
  },
})

export const datePickerClearTrigger = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes._6,
    height: sizes._6,
    flexShrink: 0,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    borderRadius: semanticRadii.controlMd,
    color: semanticColors.fgMuted,
    ':hover': {
      color: semanticColors.fg,
    },
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    [datePickerClearTriggerIconVars.width]: sizes._4,
    [datePickerClearTriggerIconVars.height]: sizes._4,
  },
})

export const datePickerClearTriggerIcon = stylex.create({
  base: {
    width: datePickerClearTriggerIconVars.width,
    height: datePickerClearTriggerIconVars.height,
  },
})

export type DatePickerSize = keyof typeof datePickerRootSizes

export type DatePickerHideOutsideDays =
  keyof typeof datePickerTableCellTriggerHideOutsideDays

export type DatePickerVariant = keyof typeof datePickerIndicatorGroupVariants

export const datePickerSlotRecipe = {
  slots: {
    root: {
      styles: datePickerRoot,
      sizes: datePickerRootSizes,
    },
    label: {
      styles: datePickerLabel,
    },
    indicatorGroup: {
      styles: datePickerIndicatorGroup,
      variants: datePickerIndicatorGroupVariants,
    },
    control: {
      styles: datePickerControl,
    },
    input: {
      styles: datePickerInput,
      variants: datePickerInputVariants,
    },
    trigger: {
      styles: datePickerTrigger,
      icon: {
        vars: datePickerTriggerIconVars,
        styles: datePickerTriggerIcon,
      },
    },
    content: {
      styles: datePickerContent,
    },
    view: {
      styles: datePickerView,
      sizes: datePickerViewSizes,
    },
    viewControl: {
      styles: datePickerViewControl,
    },
    viewTrigger: {
      styles: datePickerViewTrigger,
    },
    prevTrigger: {
      styles: datePickerPrevTrigger,
      icon: {
        vars: datePickerPrevTriggerIconVars,
        styles: datePickerPrevTriggerIcon,
      },
    },
    nextTrigger: {
      styles: datePickerNextTrigger,
      icon: {
        vars: datePickerNextTriggerIconVars,
        styles: datePickerNextTriggerIcon,
      },
    },
    rangeText: {
      styles: datePickerRangeText,
    },
    table: {
      styles: datePickerTable,
    },
    tableHeader: {
      styles: datePickerTableHeader,
    },
    tableCell: {
      styles: datePickerTableCell,
    },
    tableCellTrigger: {
      styles: datePickerTableCellTrigger,
      hideOutsideDays: datePickerTableCellTriggerHideOutsideDays,
    },
    monthSelect: {
      styles: datePickerMonthSelect,
    },
    yearSelect: {
      styles: datePickerYearSelect,
    },
    clearTrigger: {
      styles: datePickerClearTrigger,
      icon: {
        vars: datePickerClearTriggerIconVars,
        styles: datePickerClearTriggerIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function datePickerSlotStyles(
  slot: keyof typeof datePickerSlotRecipe.slots,
  variants?: {
    size?: DatePickerSize
    variant?: DatePickerVariant
  },
) {
  const size = variants?.size ?? datePickerSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? datePickerSlotRecipe.defaultVariants.variant
  const def = datePickerSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
