import * as stylex from '@stylexjs/stylex'

import { colorPalette } from '../color-palette.stylex.ts'
import { type RecipeDefinition, recipeStyles } from '../recipe.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { textStyles } from '../text-styles.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    flexShrink: 0,
    outline: '0',
    lineHeight: 1.2,
    isolation: 'isolate',
    fontWeight: fontWeights.medium,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: durations.moderate,
    ':focus-visible': {
      outlineWidth: '1px',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineColor: colorPalette.focusRing,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  size_2xs: {
    gap: spacing._1,
    height: sizes._6,
    minWidth: sizes._6,
    borderRadius: semanticRadii.controlSm,
    paddingInline: spacing._2,
  },
  size_xs: {
    gap: spacing._1,
    height: sizes._6,
    minWidth: sizes._6,
    borderRadius: semanticRadii.controlSm,
    paddingInline: spacing._2,
  },
  size_sm: {
    gap: spacing._2,
    height: sizes._7,
    minWidth: sizes._7,
    borderRadius: semanticRadii.controlMd,
    paddingInline: spacing._2_5,
  },
  size_md: {
    gap: spacing._2,
    height: sizes._8,
    minWidth: sizes._8,
    borderRadius: semanticRadii.controlMd,
    paddingInline: spacing._3,
  },
  size_lg: {
    gap: spacing._3,
    height: sizes._10,
    minWidth: sizes._10,
    borderRadius: semanticRadii.controlLg,
    paddingInline: spacing._4_5,
  },
  size_xl: {
    gap: spacing._3,
    height: sizes._12,
    minWidth: sizes._12,
    borderRadius: semanticRadii.controlLg,
    paddingInline: spacing._6,
  },
  variant_solid: {
    backgroundColor: colorPalette.solid,
    boxShadow: semanticShadows.sm,
    color: colorPalette.contrast,
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 90%, transparent)`,
    },
  },
  variant_subtle: {
    backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 10%, transparent)`,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 20%, transparent)`,
    },
  },
  variant_surface: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `color-mix(in oklch, ${colorPalette.emphasized} 90%, transparent)`,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.muted,
      borderColor: colorPalette.emphasized,
    },
  },
  variant_outline: {
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: colorPalette.emphasized,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.muted,
    },
  },
  variant_ghost: {
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
  },
  variant_plain: {
    color: colorPalette.fg,
  },
  variant_glass: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
    overflow: 'clip',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    boxShadow: `light-dark(0 0 0 1px rgba(0,0,0,0.25) inset, 0px 1px 0px 0px rgba(255,255,255,0.2) inset), ${semanticShadows.sm}`,
  },
  compound_variant_plain: {
    paddingInline: 0,
  },
  compound_variant_surface_size_sm: {
    boxShadow: semanticShadows.xs,
  },
  compound_variant_surface_size_md: {
    boxShadow: semanticShadows.sm,
  },
  compound_variant_surface_size_lg: {
    boxShadow: semanticShadows.sm,
  },
  compound_variant_surface_size_xl: {
    boxShadow: semanticShadows.md,
  },
})

export const buttonRecipe = {
  styles,
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
  variantKeys: ['size', 'variant'],
} satisfies RecipeDefinition<{
  size: Record<'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', unknown>
  variant: Record<
    'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain' | 'glass',
    unknown
  >
}>

export function buttonRecipeStyles(variants?: {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?:
    | 'solid'
    | 'subtle'
    | 'surface'
    | 'outline'
    | 'ghost'
    | 'plain'
    | 'glass'
  colorPalette?: string
}) {
  return [
    variants?.size === '2xs' || variants?.size === 'xs'
      ? textStyles.xs
      : variants?.size === 'lg'
        ? textStyles.md
        : variants?.size === 'xl'
          ? textStyles.lg
          : textStyles.sm,
    ...recipeStyles(buttonRecipe, variants),
  ]
}

export type ButtonVariantProps = Parameters<typeof buttonRecipeStyles>[0]
