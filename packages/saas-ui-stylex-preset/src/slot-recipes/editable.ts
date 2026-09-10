/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const editableRoot = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    gap: spacing._1_5,
    width: sizes.full,
  },
})

export const editableRootSizes = stylex.create({
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

export const editablePreview = stylex.create({
  base: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'inherit',
    backgroundColor: 'transparent',
    borderRadius: semanticRadii.control,
    paddingBlock: spacing._1,
    paddingInline: spacing._1,
    display: 'inline-flex',
    alignItems: 'center',
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.moderate,
    cursor: 'text',
    ':hover': {
      backgroundColor: semanticColors.bgMuted,
    },
    ':disabled': {
      userSelect: 'none',
    },
  },
})

export const editablePreviewSizes = stylex.create({
  sm: {
    minHeight: sizes._8,
  },
  md: {
    minHeight: sizes._9,
  },
  lg: {
    minHeight: sizes._10,
  },
})

export const editableInput = stylex.create({
  base: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'inherit',
    backgroundColor: 'transparent',
    borderRadius: semanticRadii.control,
    outline: 0,
    paddingBlock: spacing._1,
    paddingInline: spacing._1,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.moderate,
    width: sizes.full,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '1px',
    '::placeholder': {
      opacity: 0.6,
    },
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':invalid': {
      '--focus-ring-color': 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },
})

export const editableInputSizes = stylex.create({
  sm: {
    minHeight: sizes._8,
  },
  md: {
    minHeight: sizes._9,
  },
  lg: {
    minHeight: sizes._10,
  },
})

export const editableControl = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._1_5,
  },
})

export type EditableSize = keyof typeof editableRootSizes

export const editableSlotRecipe = {
  slots: {
    root: {
      styles: editableRoot,
      sizes: editableRootSizes,
    },
    preview: {
      styles: editablePreview,
      sizes: editablePreviewSizes,
    },
    input: {
      styles: editableInput,
      sizes: editableInputSizes,
    },
    control: {
      styles: editableControl,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function editableSlotStyles(
  slot: keyof typeof editableSlotRecipe.slots,
  variants?: {
    size?: EditableSize
  },
) {
  const size = variants?.size ?? editableSlotRecipe.defaultVariants.size
  const def = editableSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
