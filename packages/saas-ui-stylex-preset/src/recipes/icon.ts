/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { sizes } from '../tokens/sizes.stylex.ts'

export const iconStyles = stylex.create({
  base: {
    display: 'inline-block',
    lineHeight: '1em',
    flexShrink: 0,
    color: 'currentcolor',
    verticalAlign: 'middle',
    width: 'var(--icon-size)',
    height: 'var(--icon-size)',
  },
})

export const iconSizes = stylex.create({
  inherit: {
    '--icon-size': '1em',
  },
  xs: {
    '--icon-size': sizes._3,
  },
  sm: {
    '--icon-size': sizes._4,
  },
  md: {
    '--icon-size': sizes._5,
  },
  lg: {
    '--icon-size': sizes._6,
  },
  xl: {
    '--icon-size': sizes._7,
  },
  '2xl': {
    '--icon-size': sizes._8,
  },
})

export type IconSize = keyof typeof iconSizes

export const iconRecipe = {
  styles: iconStyles,
  sizes: iconSizes,
  defaultVariants: {
    size: 'inherit',
  },
} as const

export function iconRecipeStyles(variants?: {
  size?: IconSize
  colorPalette?: string
}) {
  const size = variants?.size ?? iconRecipe.defaultVariants.size

  return [iconStyles.base, iconSizes[size]]
}

export type IconVariantProps = Parameters<typeof iconRecipeStyles>[0]
