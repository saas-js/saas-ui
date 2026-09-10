/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { tagStartElementIconVars, tagEndElementIconVars } from './tag.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { cursor } from '../tokens/cursor.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { tagStartElementIconVars, tagEndElementIconVars }

export const tagRoot = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'top',
    maxWidth: '100%',
    userSelect: 'none',
    borderRadius: radii.full,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export const tagRootSizes = stylex.create({
  sm: {
    paddingInline: spacing._1_5,
    minHeight: sizes._5,
    gap: spacing._1,
    '--tag-avatar-size': spacing._3_5,
    '--tag-status-size': spacing._2,
    '--tag-element-size': spacing._3_5,
    '--tag-element-offset': spacing._05,
  },
  md: {
    paddingInline: spacing._2,
    minHeight: sizes._6,
    gap: spacing._1,
    '--tag-avatar-size': spacing._4,
    '--tag-status-size': spacing._2,
    '--tag-element-size': spacing._4,
    '--tag-element-offset': spacing._1,
  },
  lg: {
    paddingInline: spacing._2_5,
    minHeight: sizes._7,
    gap: spacing._1,
    '--tag-avatar-size': spacing._5,
    '--tag-status-size': spacing._2,
    '--tag-element-size': spacing._5,
    '--tag-element-offset': spacing._15,
  },
  xl: {
    paddingInline: spacing._3,
    minHeight: sizes._8,
    gap: spacing._1_5,
    '--tag-avatar-size': spacing._6,
    '--tag-status-size': spacing._2,
    '--tag-element-size': spacing._6,
    '--tag-element-offset': spacing._2,
  },
})

export const tagRootVariants = stylex.create({
  subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  outline: {
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  surface: {
    backgroundColor: colorPalette.muted,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
})

export const tagLabel = stylex.create({
  base: {
    lineClamp: 1,
  },
})

export const tagLabelSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  lg: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  xl: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
})

export const tagCloseTrigger = stylex.create({
  base: {
    cursor: cursor.button,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    borderRadius: radii.full,
    color: 'currentColor',
    opacity: 0.8,
    padding: '1px',
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    focusRingWidth: '2px',
    ':hover': {
      opacity: 1,
      backgroundColor: colorPalette.subtle,
    },
    '::after': {
      content: '""',
      position: 'absolute',
      width: '24px',
      height: '24px',
      borderRadius: radii.full,
    },
  },
})

export const tagCloseTriggerSizes = stylex.create({
  lg: {
    padding: '2px',
  },
  xl: {
    padding: '3px',
  },
})

export const tagStartElement = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 'var(--tag-element-size)',
    height: 'var(--tag-element-size)',
    [tagStartElementIconVars.width]: '80% !important',
    [tagStartElementIconVars.height]: '80% !important',
  },
})

export const tagStartElementIcon = stylex.create({
  base: {
    width: tagStartElementIconVars.width,
    height: tagStartElementIconVars.height,
  },
})

export const tagEndElement = stylex.create({
  base: {
    flexShrink: 0,
    width: 'var(--tag-element-size)',
    height: 'var(--tag-element-size)',
    [tagEndElementIconVars.width]: '100%',
    [tagEndElementIconVars.height]: '100%',
  },
})

export const tagEndElementIcon = stylex.create({
  base: {
    width: tagEndElementIconVars.width,
    height: tagEndElementIconVars.height,
  },
})

export type TagSize = keyof typeof tagRootSizes

export type TagVariant = keyof typeof tagRootVariants

export const tagSlotRecipe = {
  slots: {
    root: {
      styles: tagRoot,
      sizes: tagRootSizes,
      variants: tagRootVariants,
    },
    label: {
      styles: tagLabel,
      sizes: tagLabelSizes,
    },
    closeTrigger: {
      styles: tagCloseTrigger,
      sizes: tagCloseTriggerSizes,
    },
    startElement: {
      styles: tagStartElement,
      icon: {
        vars: tagStartElementIconVars,
        styles: tagStartElementIcon,
      },
    },
    endElement: {
      styles: tagEndElement,
      icon: {
        vars: tagEndElementIconVars,
        styles: tagEndElementIcon,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
} as const

export function tagSlotStyles(
  slot: keyof typeof tagSlotRecipe.slots,
  variants?: {
    size?: TagSize
    variant?: TagVariant
  },
) {
  const size = variants?.size ?? tagSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? tagSlotRecipe.defaultVariants.variant
  const def = tagSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
