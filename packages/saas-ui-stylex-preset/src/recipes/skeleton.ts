/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { animations } from '../tokens/animations.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'

export const skeletonStyles = stylex.create({
  base: {},
})

export const skeletonLoadings = stylex.create({
  true: {
    borderRadius: semanticRadii.panel,
    boxShadow: 'none',
    backgroundClip: 'padding-box',
    cursor: 'default',
    color: 'transparent',
    pointerEvents: 'none',
    userSelect: 'none',
    flexShrink: 0,
  },
  false: {
    backgroundColor: 'unset',
    animation: 'fade-in var(--fade-duration, 0.1s) ease-out !important',
  },
})

export const skeletonVariants = stylex.create({
  pulse: {
    backgroundColor: semanticColors.bgEmphasized,
    animation: animations.pulse,
    animationDuration: 'var(--duration, 1.2s)',
  },
  shine: {
    '--animate-from': '200%',
    '--animate-to': '-200%',
    '--start-color': semanticColors.bgMuted,
    '--end-color': semanticColors.bgEmphasized,
    backgroundImage:
      'linear-gradient(270deg,var(--start-color),var(--end-color),var(--end-color),var(--start-color))',
    backgroundSize: '400% 100%',
    animation: 'bg-position var(--duration, 5s) ease-in-out infinite',
  },
  none: {
    animation: 'none',
    backgroundColor: semanticColors.bgMuted,
  },
})

export type SkeletonLoading = keyof typeof skeletonLoadings

export type SkeletonVariant = keyof typeof skeletonVariants

export const skeletonRecipe = {
  styles: skeletonStyles,
  loading: skeletonLoadings,
  variants: skeletonVariants,
  defaultVariants: {
    variant: 'pulse',
    loading: 'true',
  },
} as const

export function skeletonRecipeStyles(variants?: {
  loading?: SkeletonLoading
  variant?: SkeletonVariant
  colorPalette?: string
}) {
  const loading = variants?.loading ?? skeletonRecipe.defaultVariants.loading
  const variant = variants?.variant ?? skeletonRecipe.defaultVariants.variant

  return [
    skeletonStyles.base,
    skeletonLoadings[loading],
    skeletonVariants[variant],
  ]
}

export type SkeletonVariantProps = Parameters<typeof skeletonRecipeStyles>[0]
