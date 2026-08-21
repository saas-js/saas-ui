/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  numberInputIncrementTriggerIconVars,
  numberInputDecrementTriggerIconVars,
} from './number-input.stylex.ts'

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

export {
  numberInputIncrementTriggerIconVars,
  numberInputDecrementTriggerIconVars,
}

export const numberInputRoot = stylex.create({
  base: {
    position: 'relative',
    zIndex: 0,
    isolation: 'isolate',
    width: sizes.full,
  },
})

export const numberInputInput = stylex.create({
  base: {
    width: '100%',
    minWidth: 'var(--input-height)',
    outline: 0,
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    height: 'var(--input-height)',
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
    verticalAlign: 'top',
    pe: 'calc(var(--stepper-width) + 0.5rem)',
  },
})

export const numberInputInputSizes = stylex.create({
  xs: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingInline: spacing._2,
    '--input-height': sizes.controlXs,
  },
  sm: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._2_5,
    '--input-height': sizes.controlSm,
  },
  md: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing._3,
    '--input-height': sizes.controlMd,
  },
  lg: {
    borderRadius: semanticRadii.control,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing._4_5,
    '--input-height': sizes.controlLg,
  },
})

export const numberInputInputVariants = stylex.create({
  outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: semanticColors.border,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: 0,
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
      ':focus-visible': {
        borderColor: 'var(--focus-ring-color)',
      },
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

export const numberInputControl = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    insetEnd: '0px',
    margin: '1px',
    width: 'var(--stepper-width)',
    height: 'calc(100% - 2px)',
    zIndex: 1,
    borderStartWidth: '1px',
  },
})

export const numberInputControlSizes = stylex.create({
  xs: {
    fontSize: '2xs',
    '--stepper-width': sizes._4,
  },
  sm: {
    fontSize: fontSizes.xs,
    '--stepper-width': sizes._5,
  },
  md: {
    fontSize: fontSizes.sm,
    '--stepper-width': sizes._6,
  },
  lg: {
    fontSize: fontSizes.sm,
    '--stepper-width': sizes._6,
  },
})

export const numberInputIncrementTrigger = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    userSelect: 'none',
    cursor: cursor.button,
    lineHeight: 1,
    color: semanticColors.fgMuted,
    '--stepper-base-radius': radii.xs,
    '--stepper-radius': 'calc(var(--stepper-base-radius) + 1px)',
    ':disabled': {
      opacity: 0.5,
    },
    ':hover': {
      backgroundColor: semanticColors.bgMuted,
    },
    ':active': {
      backgroundColor: semanticColors.bgEmphasized,
    },
    borderTopEndRadius: 'var(--stepper-radius)',
    [numberInputIncrementTriggerIconVars.width]: '1em',
    [numberInputIncrementTriggerIconVars.height]: '1em',
  },
})

export const numberInputIncrementTriggerIcon = stylex.create({
  base: {
    width: numberInputIncrementTriggerIconVars.width,
    height: numberInputIncrementTriggerIconVars.height,
  },
})

export const numberInputDecrementTrigger = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    userSelect: 'none',
    cursor: cursor.button,
    lineHeight: 1,
    color: semanticColors.fgMuted,
    '--stepper-base-radius': radii.xs,
    '--stepper-radius': 'calc(var(--stepper-base-radius) + 1px)',
    ':disabled': {
      opacity: 0.5,
    },
    ':hover': {
      backgroundColor: semanticColors.bgMuted,
    },
    ':active': {
      backgroundColor: semanticColors.bgEmphasized,
    },
    borderBottomEndRadius: 'var(--stepper-radius)',
    [numberInputDecrementTriggerIconVars.width]: '1em',
    [numberInputDecrementTriggerIconVars.height]: '1em',
  },
})

export const numberInputDecrementTriggerIcon = stylex.create({
  base: {
    width: numberInputDecrementTriggerIconVars.width,
    height: numberInputDecrementTriggerIconVars.height,
  },
})

export const numberInputValueText = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontFeatureSettings: 'pnum',
    fontVariantNumeric: 'proportional-nums',
  },
})

export type NumberInputSize = keyof typeof numberInputInputSizes

export type NumberInputVariant = keyof typeof numberInputInputVariants

export const numberInputSlotRecipe = {
  slots: {
    root: {
      styles: numberInputRoot,
    },
    input: {
      styles: numberInputInput,
      sizes: numberInputInputSizes,
      variants: numberInputInputVariants,
    },
    control: {
      styles: numberInputControl,
      sizes: numberInputControlSizes,
    },
    incrementTrigger: {
      styles: numberInputIncrementTrigger,
      icon: {
        vars: numberInputIncrementTriggerIconVars,
        styles: numberInputIncrementTriggerIcon,
      },
    },
    decrementTrigger: {
      styles: numberInputDecrementTrigger,
      icon: {
        vars: numberInputDecrementTriggerIconVars,
        styles: numberInputDecrementTriggerIcon,
      },
    },
    valueText: {
      styles: numberInputValueText,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function numberInputSlotStyles(
  slot: keyof typeof numberInputSlotRecipe.slots,
  variants?: {
    size?: NumberInputSize
    variant?: NumberInputVariant
  },
) {
  const size = variants?.size ?? numberInputSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? numberInputSlotRecipe.defaultVariants.variant
  const def = numberInputSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
