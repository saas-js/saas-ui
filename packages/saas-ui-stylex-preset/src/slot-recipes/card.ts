import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { type RecipeDefinition, recipeStyles } from '../recipe.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

const root = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: 0,
    wordWrap: 'break-word',
    borderRadius: semanticRadii.panelLg,
    color: semanticColors.fg,
    textAlign: 'start',
  },
  size_sm: {
    '--card-padding': spacing._2_5,
  },
  size_md: {
    '--card-padding': spacing._4,
  },
  size_lg: {
    '--card-padding': spacing._6,
  },
  variant_elevated: {
    backgroundColor: semanticColors.bgPanel,
    boxShadow: semanticShadows.md,
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: semanticColors.border,
  },
  variant_outline: {
    backgroundColor: semanticColors.bgPanel,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticColors.border,
  },
  variant_subtle: {
    backgroundColor: colorPalette.muted,
  },
  variant_solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
})

const title = stylex.create({
  base: {
    fontWeight: fontWeights.medium,
  },
  size_sm: {
    fontSize: fontSizes.sm,
  },
  size_md: {
    fontSize: fontSizes.md,
  },
  size_lg: {
    fontSize: fontSizes.lg,
  },
})

const description = stylex.create({
  base: {
    color: semanticColors.fgMuted,
    fontSize: fontSizes.sm,
  },
  variant_solid: {
    color: `color-mix(in oklch, ${colorPalette.contrast} 80%, transparent)`,
  },
})

const header = stylex.create({
  base: {
    padding: 'var(--card-padding)',
    paddingBottom: 'calc(var(--card-padding) / 2)',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing._1,
  },
})

const body = stylex.create({
  base: {
    padding: 'var(--card-padding)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
})

const footer = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing._2,
    padding: 'var(--card-padding)',
    paddingTop: 'calc(var(--card-padding) / 2)',
  },
})

const slotRecipes = {
  root,
  title,
  description,
  header,
  body,
  footer,
} as const

export const cardSlotRecipe = {
  slots: slotRecipes,
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
}

export function cardSlotStyles(
  slot: keyof typeof slotRecipes,
  variants?: {
    size?: 'sm' | 'md' | 'lg'
    variant?: 'elevated' | 'outline' | 'subtle' | 'solid'
  },
) {
  return recipeStyles(
    {
      styles: slotRecipes[slot],
      defaultVariants: cardSlotRecipe.defaultVariants,
    } satisfies RecipeDefinition,
    variants,
  )
}
