/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

export const cardRoot = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: 0,
    wordWrap: 'break-word',
    borderRadius: semanticRadii.panel,
    '--card-radius': semanticRadii.panel,
    '--card-concentric-radius':
      'max(0px, calc(var(--card-radius) - var(--card-padding)))',
    color: semanticColors.fg,
    textAlign: 'start',
  },
})

export const cardRootSizes = stylex.create({
  sm: {
    '--card-padding': spacing._2_5,
  },
  md: {
    '--card-padding': spacing._4,
  },
  lg: {
    '--card-padding': spacing._6,
  },
})

export const cardRootVariants = stylex.create({
  elevated: {
    backgroundColor: semanticColors.bgPanel,
    boxShadow: semanticShadows.md,
    borderWidth: '0.5px',
    borderColor: semanticColors.borderEmphasized,
  },
  outline: {
    backgroundColor: semanticColors.bgPanel,
    borderWidth: '1px',
    borderColor: semanticColors.border,
  },
  subtle: {
    backgroundColor: colorPalette.muted,
  },
  solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
})

export const cardTitle = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
})

export const cardTitleSizes = stylex.create({
  sm: {
    fontSize: fontSizes.sm,
  },
  md: {
    fontSize: fontSizes.md,
  },
  lg: {
    fontSize: fontSizes.lg,
  },
})

export const cardDescription = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.sm,
  },
})

export const cardDescriptionVariants = stylex.create({
  solid: {
    color: `color-mix(in oklch, ${colorPalette.contrast} 80%, transparent)`,
  },
})

export const cardHeader = stylex.create({
  base: {
    padding: 'var(--card-padding)',
    paddingBottom: 'calc(var(--card-padding) / 2)',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1,
  },
})

export const cardBody = stylex.create({
  base: {
    padding: 'var(--card-padding)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
})

export const cardFooter = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    padding: 'var(--card-padding)',
    paddingTop: 'calc(var(--card-padding) / 2)',
  },
})

export type CardSize = keyof typeof cardRootSizes

export type CardVariant = keyof typeof cardRootVariants

export const cardSlotRecipe = {
  slots: {
    root: {
      styles: cardRoot,
      sizes: cardRootSizes,
      variants: cardRootVariants,
    },
    title: {
      styles: cardTitle,
      sizes: cardTitleSizes,
    },
    description: {
      styles: cardDescription,
      variants: cardDescriptionVariants,
    },
    header: {
      styles: cardHeader,
    },
    body: {
      styles: cardBody,
    },
    footer: {
      styles: cardFooter,
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
} as const

export function cardSlotStyles(
  slot: keyof typeof cardSlotRecipe.slots,
  variants?: {
    variant?: CardVariant
    size?: CardSize
  },
) {
  const variant = variants?.variant ?? cardSlotRecipe.defaultVariants.variant
  const size = variants?.size ?? cardSlotRecipe.defaultVariants.size
  const def = cardSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
  ]
}
