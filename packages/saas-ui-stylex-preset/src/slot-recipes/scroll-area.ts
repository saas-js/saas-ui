/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'

export const scrollAreaRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    '--scrollbar-margin': '2px',
    '--scrollbar-click-area':
      'calc(var(--scrollbar-size) + calc(var(--scrollbar-margin) * 2))',
  },
})

export const scrollAreaRootSizes = stylex.create({
  xs: {
    '--scrollbar-size': sizes._1,
  },
  sm: {
    '--scrollbar-size': sizes._1_5,
  },
  md: {
    '--scrollbar-size': sizes._2,
  },
  lg: {
    '--scrollbar-size': sizes._3,
  },
})

export const scrollAreaViewport = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    borderRadius: 'inherit',
    scrollbarWidth: 'none',
  },
})

export const scrollAreaContent = stylex.create({
  base: {
    minWidth: '100%',
  },
})

export const scrollAreaScrollbar = stylex.create({
  base: {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    borderRadius: radii.full,
    transition: 'opacity 150ms 300ms',
    position: 'relative',
    margin: 'var(--scrollbar-margin)',
    backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 10%, transparent)`,
    '--thumb-bg': `color-mix(in oklch, ${colorPalette.solid} 25%, transparent)`,
    '::before': {
      content: '""',
      position: 'absolute',
    },
  },
})

export const scrollAreaScrollbarVariants = stylex.create({
  hover: {
    opacity: 0,
  },
  always: {
    opacity: 1,
  },
})

export const scrollAreaThumb = stylex.create({
  base: {
    borderRadius: 'inherit',
    backgroundColor: 'var(--thumb-bg)',
    transition: 'backgrounds',
  },
})

export const scrollAreaCorner = stylex.create({
  base: {
    backgroundColor: semanticColors.bgMuted,
    margin: 'var(--scrollbar-margin)',
    opacity: 0,
    transition: 'opacity 150ms 300ms',
  },
})

export type ScrollAreaVariant = keyof typeof scrollAreaScrollbarVariants

export type ScrollAreaSize = keyof typeof scrollAreaRootSizes

export const scrollAreaSlotRecipe = {
  slots: {
    root: {
      styles: scrollAreaRoot,
      sizes: scrollAreaRootSizes,
    },
    viewport: {
      styles: scrollAreaViewport,
    },
    content: {
      styles: scrollAreaContent,
    },
    scrollbar: {
      styles: scrollAreaScrollbar,
      variants: scrollAreaScrollbarVariants,
    },
    thumb: {
      styles: scrollAreaThumb,
    },
    corner: {
      styles: scrollAreaCorner,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'hover',
  },
} as const

export function scrollAreaSlotStyles(
  slot: keyof typeof scrollAreaSlotRecipe.slots,
  variants?: {
    size?: ScrollAreaSize
    variant?: ScrollAreaVariant
  },
) {
  const size = variants?.size ?? scrollAreaSlotRecipe.defaultVariants.size
  const variant =
    variants?.variant ?? scrollAreaSlotRecipe.defaultVariants.variant
  const def = scrollAreaSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
