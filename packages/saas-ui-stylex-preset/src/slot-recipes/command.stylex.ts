/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const commandIndicatorIconVars = stylex.defineVars({
  width: 'var(--command-indicator-size)',
  height: 'var(--command-indicator-size)',
})

export const commandClearTriggerIconVars = stylex.defineVars({
  width: sizes._3_5,
  height: sizes._3_5,
})

export const commandItemIconVars = stylex.defineVars({
  width: 'var(--command-indicator-size)',
  height: 'var(--command-indicator-size)',
  flexShrink: 0,
  color: semanticColors.fgSubtle,
})
