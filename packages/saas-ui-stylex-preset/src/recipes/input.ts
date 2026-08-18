import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { type RecipeDefinition, recipeStyles } from '../recipe.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { textStyles } from '../text-styles.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

const styles = stylex.create({
  base: {
    width: '100%',
    minWidth: 0,
    outline: '0',
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    height: 'var(--input-height)',
    '--focus-color': colorPalette.focusRing,
    '--error-color': semanticColors.borderError,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ':invalid': {
      borderColor: 'var(--error-color)',
    },
  },
  size_xs: {
    borderRadius: semanticRadii.controlSm,
    paddingInline: spacing._2,
    '--input-height': sizes._6,
  },
  size_sm: {
    borderRadius: semanticRadii.controlMd,
    paddingInline: spacing._2_5,
    '--input-height': sizes._7,
  },
  size_md: {
    borderRadius: semanticRadii.controlMd,
    paddingInline: spacing._3,
    '--input-height': sizes._8,
  },
  size_lg: {
    borderRadius: semanticRadii.controlLg,
    paddingInline: spacing._4_5,
    '--input-height': sizes._10,
  },
  size_xl: {
    borderRadius: semanticRadii.controlLg,
    paddingInline: spacing._6,
    '--input-height': sizes._12,
  },
  variant_outline: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: semanticColors.border,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':hover': {
      borderColor: semanticColors.borderEmphasized,
    },
  },
  variant_subtle: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: semanticColors.bgMuted,
    ':focus-visible': {
      outlineWidth: 'var(--focus-ring-width, 0)',
      outlineOffset: '0px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
  },
  variant_flushed: {
    backgroundColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: semanticColors.border,
    borderRadius: 0,
    paddingInline: 0,
    ':focus-visible': {
      borderColor: 'var(--focus-color)',
      boxShadow: '0px 1px 0px 0px var(--focus-color)',
    },
  },
})

export const inputRecipe = {
  styles,
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variantKeys: ['size', 'variant'],
} satisfies RecipeDefinition<{
  size: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', unknown>
  variant: Record<'outline' | 'subtle' | 'flushed', unknown>
}>

export function inputRecipeStyles(variants?: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'subtle' | 'flushed'
}) {
  const size = variants?.size ?? inputRecipe.defaultVariants.size

  return [
    size === 'xs'
      ? textStyles.xs
      : size === 'lg' || size === 'xl'
        ? textStyles.md
        : textStyles.sm,
    ...recipeStyles(inputRecipe, variants),
  ]
}
