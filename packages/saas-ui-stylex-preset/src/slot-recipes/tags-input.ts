/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import {
  tagsInputItemDeleteTriggerIconVars,
  tagsInputClearTriggerIconVars,
} from './tags-input.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { tagsInputItemDeleteTriggerIconVars, tagsInputClearTriggerIconVars }

export const tagsInputRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const tagsInputRootSizes = stylex.create({
  xs: {
    '--tags-input-height': sizes._8,
    '--tags-input-px': spacing._1_5,
    '--tags-input-py': spacing._1,
    '--tags-input-gap': spacing._1,
    '--tags-input-item-height': sizes._6,
    '--tags-input-item-px': spacing._2,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    '--tags-input-height': sizes._9,
    '--tags-input-px': spacing._1_5,
    '--tags-input-py': spacing._1,
    '--tags-input-gap': spacing._1,
    '--tags-input-item-height': sizes._6,
    '--tags-input-item-px': spacing._2,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    '--tags-input-height': sizes._10,
    '--tags-input-px': spacing._1_5,
    '--tags-input-py': spacing._1,
    '--tags-input-gap': spacing._1,
    '--tags-input-item-height': sizes._7,
    '--tags-input-item-px': spacing._2,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  lg: {
    '--tags-input-height': sizes._10,
    '--tags-input-px': spacing._1_5,
    '--tags-input-py': spacing._1,
    '--tags-input-gap': spacing._1,
    '--tags-input-item-height': sizes._8,
    '--tags-input-item-px': spacing._2,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const tagsInputLabel = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    ':disabled': {
      opacity: 0.5,
    },
  },
})

export const tagsInputControl = stylex.create({
  base: {
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    minHeight: 'var(--tags-input-height)',
    '--input-height': 'var(--tags-input-height)',
    paddingInline: 'var(--tags-input-px)',
    paddingBlock: 'var(--tags-input-py)',
    gap: 'var(--tags-input-gap)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderRadius: semanticRadii.l2,
    pos: 'relative',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: durations.moderate,
    ':disabled': {
      opacity: 0.5,
    },
    ':invalid': {
      borderColor: 'var(--error-color)',
    },
  },
})

export const tagsInputControlVariants = stylex.create({
  outline: {
    borderWidth: '1px',
    backgroundColor: semanticColors.bg,
    ':focus': {
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: 'var(--focus-color)',
      borderColor: 'var(--focus-color)',
      ':invalid': {
        outlineColor: 'var(--error-color)',
        borderColor: 'var(--error-color)',
      },
    },
  },
  subtle: {
    backgroundColor: semanticColors.bgMuted,
    borderWidth: '1px',
    borderColor: 'transparent',
    ':focus': {
      outlineWidth: '1px',
      outlineStyle: 'solid',
      outlineColor: 'var(--focus-color)',
      borderColor: 'var(--focus-color)',
      ':invalid': {
        outlineColor: 'var(--error-color)',
        borderColor: 'var(--error-color)',
      },
    },
  },
  flushed: {
    borderRadius: 0,
    paddingInline: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomColor: semanticColors.border,
    ':focus': {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
    },
  },
})

export const tagsInputInput = stylex.create({
  base: {
    flex: 1,
    minWidth: sizes._20,
    outline: 'none',
    backgroundColor: 'transparent',
    color: semanticColors.fg,
    paddingInline: 'calc(var(--tags-input-item-px) / 1.25)',
    height: 'var(--tags-input-item-height)',
    ':read-only': {
      display: 'none',
    },
  },
})

export const tagsInputItemText = stylex.create({
  base: {
    lineClamp: 1,
  },
})

export const tagsInputItemInput = stylex.create({
  base: {
    outline: 'none',
    backgroundColor: 'transparent',
    minWidth: '2ch',
    color: 'inherit',
    paddingInline: 'var(--tags-input-item-px)',
    height: 'var(--tags-input-item-height)',
  },
})

export const tagsInputItemPreview = stylex.create({
  base: {
    height: 'var(--tags-input-item-height)',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._1,
    borderRadius: semanticRadii.l1,
    paddingInline: 'var(--tags-input-item-px)',
  },
})

export const tagsInputItemPreviewVariants = stylex.create({
  outline: {
    backgroundColor: colorPalette.subtle,
  },
  subtle: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
  },
  flushed: {
    backgroundColor: colorPalette.subtle,
  },
})

export const tagsInputItemDeleteTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(var(--tags-input-item-height) / 1.5)',
    height: 'calc(var(--tags-input-item-height) / 1.5)',
    me: -1,
    opacity: 0.4,
    ':hover': {
      opacity: 1,
    },
    [tagsInputItemDeleteTriggerIconVars.width]: '80%',
    [tagsInputItemDeleteTriggerIconVars.height]: '80%',
  },
})

export const tagsInputItemDeleteTriggerIcon = stylex.create({
  base: {
    width: tagsInputItemDeleteTriggerIconVars.width,
    height: tagsInputItemDeleteTriggerIconVars.height,
  },
})

export const tagsInputClearTrigger = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(var(--tags-input-item-height) / 1.5)',
    height: 'calc(var(--tags-input-item-height) / 1.5)',
    color: semanticColors.fgMuted,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    borderRadius: semanticRadii.l1,
    [tagsInputClearTriggerIconVars.width]: sizes._5,
    [tagsInputClearTriggerIconVars.height]: sizes._5,
  },
})

export const tagsInputClearTriggerIcon = stylex.create({
  base: {
    width: tagsInputClearTriggerIconVars.width,
    height: tagsInputClearTriggerIconVars.height,
  },
})

export type TagsInputSize = keyof typeof tagsInputRootSizes

export type TagsInputVariant = keyof typeof tagsInputControlVariants

export const tagsInputSlotRecipe = {
  slots: {
    root: {
      styles: tagsInputRoot,
      sizes: tagsInputRootSizes,
    },
    label: {
      styles: tagsInputLabel,
    },
    control: {
      styles: tagsInputControl,
      variants: tagsInputControlVariants,
    },
    input: {
      styles: tagsInputInput,
    },
    itemText: {
      styles: tagsInputItemText,
    },
    itemInput: {
      styles: tagsInputItemInput,
    },
    itemPreview: {
      styles: tagsInputItemPreview,
      variants: tagsInputItemPreviewVariants,
    },
    itemDeleteTrigger: {
      styles: tagsInputItemDeleteTrigger,
      icon: {
        vars: tagsInputItemDeleteTriggerIconVars,
        styles: tagsInputItemDeleteTriggerIcon,
      },
    },
    clearTrigger: {
      styles: tagsInputClearTrigger,
      icon: {
        vars: tagsInputClearTriggerIconVars,
        styles: tagsInputClearTriggerIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
} as const

export function tagsInputSlotStyles(
  slot: keyof typeof tagsInputSlotRecipe.slots,
  variants?: {
    size?: TagsInputSize
    variant?: TagsInputVariant
  },
) {
  const size = variants?.size ?? tagsInputSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? tagsInputSlotRecipe.defaultVariants.variant
  const def = tagsInputSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
