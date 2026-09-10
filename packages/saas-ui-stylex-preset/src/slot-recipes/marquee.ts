/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { semanticColors } from '../semantic-tokens/colors.stylex.ts'

export const marqueeRoot = stylex.create({
  base: {
    position: 'relative',
    width: '100%',
    '--marquee-edge-color': semanticColors.bg,
    '--marquee-edge-size': '20%',
  },
})

export const marqueeViewport = stylex.create({
  base: {
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
})

export const marqueeContent = stylex.create({
  base: {
    display: 'flex',
    minWidth: 'max-content',
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
    animationDuration: 'var(--marquee-duration)',
    animationDelay: 'var(--marquee-delay)',
    animationIterationCount: 'var(--marquee-loop-count)',
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none !important',
    },
  },
})

export const marqueeEdge = stylex.create({
  base: {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
  },
})

export const marqueeSlotRecipe = {
  slots: {
    root: {
      styles: marqueeRoot,
    },
    viewport: {
      styles: marqueeViewport,
    },
    content: {
      styles: marqueeContent,
    },
    edge: {
      styles: marqueeEdge,
    },
  },
  defaultVariants: {},
} as const

export function marqueeSlotStyles(
  slot: keyof typeof marqueeSlotRecipe.slots,
  variants?: {},
) {
  const def = marqueeSlotRecipe.slots[slot]

  return [def.styles.base]
}
