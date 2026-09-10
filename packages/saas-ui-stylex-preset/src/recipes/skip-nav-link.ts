/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const skipNavLinkStyles = stylex.create({
  base: {
    display: 'inline-flex',
    backgroundColor: semanticColors.bgPanel,
    padding: spacing._2_5,
    borderRadius: semanticRadii.control,
    fontWeight: fontWeights.semibold,
    ':focus-visible': {
      clip: 'auto',
      width: 'auto',
      height: 'auto',
      position: 'fixed',
      top: spacing._6,
      insetStart: 6,
    },
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    userSelect: 'none',
    border: 0,
    height: '1px',
    width: '1px',
    margin: '-1px',
    outline: 0,
    overflow: 'hidden',
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
  },
})

export const skipNavLinkRecipe = {
  styles: skipNavLinkStyles,
  defaultVariants: {},
} as const

export function skipNavLinkRecipeStyles(variants?: { colorPalette?: string }) {
  return [skipNavLinkStyles.base]
}

export type SkipNavLinkVariantProps = Parameters<
  typeof skipNavLinkRecipeStyles
>[0]
