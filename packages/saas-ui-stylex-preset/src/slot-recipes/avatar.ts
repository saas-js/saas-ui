/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const avatarRoot = stylex.create({
  base: {
    '--avatar-font-size': 'calc(var(--avatar-size) / 2)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: fontWeights.medium,
    position: 'relative',
    verticalAlign: 'top',
    flexShrink: 0,
    userSelect: 'none',
    width: 'var(--avatar-size)',
    height: 'var(--avatar-size)',
    fontSize: 'var(--avatar-font-size)',
    borderRadius: 'var(--avatar-radius)',
  },
})

export const avatarRootSizes = stylex.create({
  full: {
    '--avatar-size': '100%',
    '--avatar-font-size': 'calc(var(--tag-avatar-size) / 2)',
  },
  '2xs': {
    '--avatar-size': sizes._4,
  },
  xs: {
    '--avatar-size': sizes._5,
  },
  sm: {
    '--avatar-size': sizes._6,
  },
  md: {
    '--avatar-size': sizes._9,
  },
  lg: {
    '--avatar-size': sizes._12,
  },
  xl: {
    '--avatar-size': sizes._16,
  },
  '2xl': {
    '--avatar-size': sizes._20,
  },
})

export const avatarRootVariants = stylex.create({
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  subtle: {
    backgroundColor: colorPalette.muted,
    color: colorPalette.fg,
  },
  outline: {
    color: colorPalette.fg,
    borderWidth: '1px',
    borderColor: colorPalette.muted,
  },
})

export const avatarRootShapes = stylex.create({
  rounded: {
    '--avatar-radius': semanticRadii.indicatorMd,
  },
  full: {
    '--avatar-radius': radii.full,
  },
})

export const avatarRootBorderless = stylex.create({
  true: {},
})

export const avatarImage = stylex.create({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'var(--avatar-radius)',
  },
})

export const avatarFallback = stylex.create({
  base: {
    lineHeight: 1,
    textTransform: 'uppercase',
    fontWeight: fontWeights.medium,
    fontSize: 'var(--avatar-font-size)',
    borderRadius: 'var(--avatar-radius)',
  },
})

export type AvatarSize = keyof typeof avatarRootSizes

export type AvatarVariant = keyof typeof avatarRootVariants

export type AvatarShape = keyof typeof avatarRootShapes

export type AvatarBorderless = keyof typeof avatarRootBorderless

export const avatarSlotRecipe = {
  slots: {
    root: {
      styles: avatarRoot,
      sizes: avatarRootSizes,
      variants: avatarRootVariants,
      shape: avatarRootShapes,
      borderless: avatarRootBorderless,
    },
    image: {
      styles: avatarImage,
    },
    fallback: {
      styles: avatarFallback,
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'full',
    variant: 'solid',
  },
} as const

export function avatarSlotStyles(
  slot: keyof typeof avatarSlotRecipe.slots,
  variants?: {
    size?: AvatarSize
    shape?: AvatarShape
    variant?: AvatarVariant
  },
) {
  const size = variants?.size ?? avatarSlotRecipe.defaultVariants.size
  const shape = variants?.shape ?? avatarSlotRecipe.defaultVariants.shape
  const variant = variants?.variant ?? avatarSlotRecipe.defaultVariants.variant
  const def = avatarSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'shape' in def ? def.shape[shape as keyof typeof def.shape] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
