import * as stylex from '@stylexjs/stylex'

import { fontSizes } from './tokens/font-sizes.stylex.ts'
import { letterSpacings } from './tokens/letter-spacings.stylex.ts'
import { lineHeights } from './tokens/line-heights.stylex.ts'

export const textStyles = stylex.create({
  _2xs: {
    fontSize: fontSizes._2xs,
    lineHeight: lineHeights._2xs,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
  _2xl: {
    fontSize: fontSizes._2xl,
    lineHeight: lineHeights._2xl,
  },
  _3xl: {
    fontSize: fontSizes._3xl,
    lineHeight: lineHeights._3xl,
  },
  _4xl: {
    fontSize: fontSizes._4xl,
    lineHeight: lineHeights._4xl,
    letterSpacing: letterSpacings.tight,
  },
  _5xl: {
    fontSize: fontSizes._5xl,
    lineHeight: lineHeights._5xl,
    letterSpacing: letterSpacings.tight,
  },
  _6xl: {
    fontSize: fontSizes._6xl,
    lineHeight: lineHeights._6xl,
    letterSpacing: letterSpacings.tighter,
  },
  _7xl: {
    fontSize: fontSizes._7xl,
    lineHeight: lineHeights._7xl,
    letterSpacing: letterSpacings.tightest,
  },
  none: {},
})
