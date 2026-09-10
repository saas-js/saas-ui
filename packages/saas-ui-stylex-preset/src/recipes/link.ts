/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const linkStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    outline: 'none',
    gap: spacing._1_5,
    cursor: 'pointer',
    borderRadius: semanticRadii.control,
    ':focus': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
})

export const linkVariants = stylex.create({
  underline: {
    color: colorPalette.fg,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textDecorationColor: 'currentColor/20',
  },
  plain: {
    color: colorPalette.fg,
    ':hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      textDecorationColor: 'currentColor/20',
    },
  },
})

export type LinkVariant = keyof typeof linkVariants

export const linkRecipe = {
  styles: linkStyles,
  variants: linkVariants,
  defaultVariants: {
    variant: 'plain',
  },
} as const

export function linkRecipeStyles(variants?: {
  variant?: LinkVariant
  colorPalette?: string
}) {
  const variant = variants?.variant ?? linkRecipe.defaultVariants.variant

  return [linkStyles.base, linkVariants[variant]]
}

export type LinkVariantProps = Parameters<typeof linkRecipeStyles>[0]
