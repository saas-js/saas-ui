/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const splitterResizeTrigger = stylex.create({
  base: {
    '--splitter-border-color': semanticColors.border,
    '--splitter-thumb-color': semanticColors.bg,
    '--splitter-thumb-size': sizes._2,
    '--splitter-thumb-inset': 'calc(var(--splitter-thumb-size) * -0.5)',
    '--splitter-border-size': '1px',
    '--splitter-handle-size': sizes._6,
    outline: 0,
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
    ':focus': {
      '--splitter-border-color': semanticColors.borderEmphasized,
      '--splitter-thumb-color': colorPalette.subtle,
    },
  },
})

export const splitterResizeTriggerSeparator = stylex.create({
  base: {
    position: 'absolute',
    backgroundColor: 'var(--splitter-border-color)',
  },
})

export const splitterResizeTriggerIndicator = stylex.create({
  base: {
    position: 'relative',
    borderRadius: radii.full,
    backgroundColor: 'var(--splitter-thumb-color)',
    boxShadow: semanticShadows.xs,
    borderWidth: '1px',
    zIndex: 1,
  },
})

export const splitterSlotRecipe = {
  slots: {
    resizeTrigger: {
      styles: splitterResizeTrigger,
    },
    resizeTriggerSeparator: {
      styles: splitterResizeTriggerSeparator,
    },
    resizeTriggerIndicator: {
      styles: splitterResizeTriggerIndicator,
    },
  },
  defaultVariants: {},
} as const

export function splitterSlotStyles(
  slot: keyof typeof splitterSlotRecipe.slots,
  variants?: {},
) {
  const def = splitterSlotRecipe.slots[slot]

  return [def.styles.base]
}
