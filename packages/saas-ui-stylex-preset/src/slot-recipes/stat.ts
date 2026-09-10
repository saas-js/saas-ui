/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { statIndicatorSvgVars } from './stat.stylex.ts'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { letterSpacings } from '../tokens/letter-spacings.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export { statIndicatorSvgVars }

export const statRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    position: 'relative',
    flex: 1,
  },
})

export const statLabel = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const statHelpText = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
})

export const statValueUnit = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: 'initial',
    letterSpacing: 'initial',
  },
})

export const statValueText = stylex.create({
  base: {
    verticalAlign: 'baseline',
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacings.tight,
    fontFeatureSettings: 'pnum',
    fontVariantNumeric: 'proportional-nums',
    display: 'inline-flex',
    gap: spacing._1,
  },
})

export const statValueTextSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
  md: {
    fontSize: fontSizes._2xl,
    lineHeight: lineHeights._2xl,
  },
  lg: {},
})

export const statIndicator = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 1,
    [statIndicatorSvgVars.width]: '1em',
    [statIndicatorSvgVars.height]: '1em',
  },
})

export const statIndicatorSvg = stylex.create({
  base: {
    width: statIndicatorSvgVars.width,
    height: statIndicatorSvgVars.height,
  },
})

export type StatSize = keyof typeof statValueTextSizes

export const statSlotRecipe = {
  slots: {
    root: {
      styles: statRoot,
    },
    label: {
      styles: statLabel,
    },
    helpText: {
      styles: statHelpText,
    },
    valueUnit: {
      styles: statValueUnit,
    },
    valueText: {
      styles: statValueText,
      sizes: statValueTextSizes,
    },
    indicator: {
      styles: statIndicator,
      svg: {
        vars: statIndicatorSvgVars,
        styles: statIndicatorSvg,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function statSlotStyles(
  slot: keyof typeof statSlotRecipe.slots,
  variants?: {
    size?: StatSize
  },
) {
  const size = variants?.size ?? statSlotRecipe.defaultVariants.size
  const def = statSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
