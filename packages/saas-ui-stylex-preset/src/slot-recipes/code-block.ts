/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colors } from '../tokens/colors.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { fonts } from '../tokens/fonts.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const codeBlockRoot = stylex.create({
  base: {
    borderRadius: 'var(--code-block-radius)',
    overflow: 'hidden',
    backgroundColor: semanticColors.bg,
    color: semanticColors.fg,
    borderWidth: '1px',
    '--code-block-max-height': '320px',
    '--code-block-bg': semanticColors.bg,
    '--code-block-fg': semanticColors.fg,
    '--code-block-obscured-opacity': '0.5',
    '--code-block-obscured-blur': '1px',
    '--code-block-line-number-width': sizes._3,
    '--code-block-line-number-margin': spacing._4,
    '--code-block-highlight-bg': `color-mix(in oklch, ${colors.tealFocusRing} 20%, transparent)`,
    '--code-block-highlight-border': colors.tealFocusRing,
    '--code-block-highlight-added-bg': `color-mix(in oklch, ${colors.greenFocusRing} 20%, transparent)`,
    '--code-block-highlight-added-border': colors.greenFocusRing,
    '--code-block-highlight-removed-bg': `color-mix(in oklch, ${colors.redFocusRing} 20%, transparent)`,
    '--code-block-highlight-removed-border': colors.redFocusRing,
  },
})

export const codeBlockRootSizes = stylex.create({
  sm: {
    '--code-block-padding': spacing._4,
    '--code-block-radius': semanticRadii.panelSm,
    '--code-block-header-height': sizes._8,
  },
  md: {
    '--code-block-padding': spacing._4,
    '--code-block-radius': semanticRadii.panelMd,
    '--code-block-header-height': sizes._10,
  },
  lg: {
    '--code-block-padding': spacing._5,
    '--code-block-radius': semanticRadii.panelLg,
    '--code-block-header-height': sizes._12,
  },
})

export const codeBlockHeader = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    position: 'relative',
    paddingInline: 'var(--code-block-padding)',
    minHeight: 'var(--code-block-header-height)',
    marginBottom: 'calc(var(--code-block-padding) / 2 * -1)',
  },
})

export const codeBlockTitle = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing._1_5,
    flex: 1,
    color: semanticColors.fgMuted,
  },
})

export const codeBlockTitleSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  md: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  lg: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
})

export const codeBlockControl = stylex.create({
  base: {
    gap: spacing._1_5,
    display: 'inline-flex',
    alignItems: 'center',
  },
})

export const codeBlockFooter = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing._2,
    paddingInline: 'var(--code-block-padding)',
    minHeight: 'var(--code-block-header-height)',
  },
})

export const codeBlockContent = stylex.create({
  base: {
    position: 'relative',
    colorScheme: 'dark',
    borderBottomRadius: 'var(--code-block-radius)',
    maxHeight: 'var(--code-block-max-height)',
  },
})

export const codeBlockOverlay = stylex.create({
  base: {
    '--bg': `color-mix(in oklch, ${colors.black} 50%, transparent)`,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: spacing._4,
    bgImage: 'linear-gradient(0deg,var(--bg) 25%,transparent 100%)',
    color: colors.white,
    minHeight: '5rem',
    pos: 'absolute',
    bottom: 0,
    insetInline: 0,
    zIndex: 1,
    fontWeight: fontWeights.medium,
  },
})

export const codeBlockCode = stylex.create({
  base: {
    fontFamily: fonts.mono,
    lineHeight: lineHeights.tall,
    whiteSpace: 'pre',
    counterReset: 'line 0',
    overflowX: 'auto',
    overflowY: 'hidden',
  },
})

export const codeBlockCodeSizes = stylex.create({
  sm: {
    fontSize: fontSizes.xs,
  },
  md: {
    fontSize: fontSizes.sm,
  },
  lg: {
    fontSize: fontSizes.sm,
  },
})

export const codeBlockCodeText = stylex.create({
  base: {
    paddingInline: 'var(--code-block-padding)',
    paddingBlock: 'var(--code-block-padding)',
    position: 'relative',
    display: 'block',
    width: '100%',
  },
})

export type CodeBlockSize = keyof typeof codeBlockRootSizes

export const codeBlockSlotRecipe = {
  slots: {
    root: {
      styles: codeBlockRoot,
      sizes: codeBlockRootSizes,
    },
    header: {
      styles: codeBlockHeader,
    },
    title: {
      styles: codeBlockTitle,
      sizes: codeBlockTitleSizes,
    },
    control: {
      styles: codeBlockControl,
    },
    footer: {
      styles: codeBlockFooter,
    },
    content: {
      styles: codeBlockContent,
    },
    overlay: {
      styles: codeBlockOverlay,
    },
    code: {
      styles: codeBlockCode,
      sizes: codeBlockCodeSizes,
    },
    codeText: {
      styles: codeBlockCodeText,
    },
  },
  defaultVariants: {
    size: 'md',
  },
} as const

export function codeBlockSlotStyles(
  slot: keyof typeof codeBlockSlotRecipe.slots,
  variants?: {
    size?: CodeBlockSize
  },
) {
  const size = variants?.size ?? codeBlockSlotRecipe.defaultVariants.size
  const def = codeBlockSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
