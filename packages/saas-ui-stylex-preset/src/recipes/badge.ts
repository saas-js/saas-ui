import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { type RecipeDefinition, recipeStyles } from '../recipe.ts'
import { textStyles } from '../text-styles.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 9999,
    gap: spacing._1,
    fontWeight: fontWeights.medium,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  variant_solid: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
  },
  variant_subtle: {
    backgroundColor: colorPalette.subtle,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  variant_outline: {
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  variant_surface: {
    backgroundColor: colorPalette.muted,
    color: colorPalette.fg,
    boxShadow: 'inset 0 0 0 1px var(--shadow-color)',
    '--shadow-color': colorPalette.border,
  },
  variant_plain: {
    color: colorPalette.fg,
  },
  size_xs: {
    paddingInline: spacing._1,
    minHeight: sizes._4,
  },
  size_sm: {
    paddingInline: spacing._1_5,
    minHeight: sizes._5,
  },
  size_md: {
    paddingInline: spacing._2,
    minHeight: sizes._6,
  },
  size_lg: {
    paddingInline: spacing._2_5,
    minHeight: sizes._7,
  },
})

export const badgeRecipe = {
  styles,
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
  },
  variantKeys: ['variant', 'size'],
} satisfies RecipeDefinition<{
  variant: Record<'solid' | 'subtle' | 'outline' | 'surface' | 'plain', unknown>
  size: Record<'xs' | 'sm' | 'md' | 'lg', unknown>
}>

export function badgeRecipeStyles(variants?: {
  variant?: 'solid' | 'subtle' | 'outline' | 'surface' | 'plain'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}) {
  const size = variants?.size ?? badgeRecipe.defaultVariants.size

  return [
    size === 'xs'
      ? textStyles._2xs
      : size === 'md' || size === 'lg'
        ? textStyles.sm
        : textStyles.xs,
    ...recipeStyles(badgeRecipe, variants),
  ]
}
