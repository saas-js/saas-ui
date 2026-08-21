/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { buttonIconVars } from './button.stylex.ts'

import { colorPalette } from '../color-palette.stylex.ts'
import { durations } from '../tokens/durations.stylex.ts'
import { fontWeights } from '../tokens/font-weights.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'
import { semanticRadii } from '../semantic-tokens/radii.stylex.ts'
import { semanticShadows } from '../semantic-tokens/shadows.stylex.ts'
import { sizes } from '../tokens/sizes.stylex.ts'
import { spacing } from '../tokens/spacing.stylex.ts'
import { textStyles } from '../text-styles.ts'

export { buttonIconVars }

export const buttonStyles = stylex.create({
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
    outline: 0,
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
    [buttonIconVars.fontSize]: '1em',
    [buttonIconVars.flexShrink]: 0,
  },
})

export const buttonSizes = stylex.create({
  '2xs': {
    gap: spacing._1,
    height: sizes.controlXs,
    minWidth: sizes.controlXs,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2,
  },
  xs: {
    gap: spacing._1,
    height: sizes.controlXs,
    minWidth: sizes.controlXs,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2,
  },
  sm: {
    gap: spacing._2,
    height: sizes.controlSm,
    minWidth: sizes.controlSm,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._2_5,
  },
  md: {
    gap: spacing._2,
    height: sizes.controlMd,
    minWidth: sizes.controlMd,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._3,
  },
  lg: {
    gap: spacing._3,
    height: sizes.controlLg,
    minWidth: sizes.controlLg,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._4_5,
  },
  xl: {
    gap: spacing._3,
    height: sizes.controlXl,
    minWidth: sizes.controlXl,
    borderRadius: semanticRadii.control,
    paddingInline: spacing._6,
  },
})

export const buttonVariants = stylex.create({
  solid: {
    backgroundColor: colorPalette.solid,
    boxShadow: semanticShadows.sm,
    color: colorPalette.contrast,
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 90%, transparent)`,
    },
  },
  subtle: {
    backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 10%, transparent)`,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: `color-mix(in oklch, ${colorPalette.solid} 20%, transparent)`,
    },
  },
  glass: {
    backgroundColor: colorPalette.solid,
    color: colorPalette.contrast,
    '--btn-shadow': semanticShadows.sm,
    boxShadow:
      'light-dark(0 0 0 1px rgba(0,0,0,0.25) inset, 0px 2px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow),  0px 1px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow))',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    overflow: 'clip',
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, white 40%, rgba(0,0,0,0.2))',
      opacity: 0.2,
      transitionProperty: 'opacity',
      transitionDuration: durations.moderate,
      pointerEvents: 'none',
    },
    ':hover': {
      backgroundColor: colorPalette.solid,
      '::after': {
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.8) 40%, rgba(0,0,0,0.6))',
      },
    },
  },
  surface: {
    backgroundColor: semanticColors.bg,
    borderWidth: '1px',
    borderColor: `color-mix(in oklch, ${colorPalette.emphasized} 90%, transparent)`,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.muted,
      borderColor: colorPalette.emphasized,
    },
  },
  outline: {
    borderWidth: '0.5px',
    borderColor: colorPalette.emphasized,
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.muted,
    },
  },
  ghost: {
    color: colorPalette.fg,
    ':hover': {
      backgroundColor: colorPalette.subtle,
    },
  },
  plain: {
    color: colorPalette.fg,
    paddingInline: 0,
  },
})

export const buttonTextStyles = {
  '2xs': textStyles.xs,
  xs: textStyles.xs,
  sm: textStyles.sm,
  md: textStyles.sm,
  lg: textStyles.md,
  xl: textStyles.lg,
} as const

export const buttonWhenVariantSurface = stylex.create({
  sm: {
    boxShadow: semanticShadows.xs,
  },
  md: {
    boxShadow: semanticShadows.sm,
  },
  lg: {
    boxShadow: semanticShadows.sm,
  },
  xl: {
    boxShadow: semanticShadows.md,
  },
})

export const buttonIcon = stylex.create({
  base: {
    fontSize: buttonIconVars.fontSize,
    flexShrink: buttonIconVars.flexShrink,
  },
})

export type ButtonSize = keyof typeof buttonSizes

export type ButtonVariant = keyof typeof buttonVariants

export const buttonRecipe = {
  styles: buttonStyles,
  sizes: buttonSizes,
  variants: buttonVariants,
  textStyles: buttonTextStyles,
  whenVariantSurface: buttonWhenVariantSurface,
  icon: {
    vars: buttonIconVars,
    styles: buttonIcon,
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
} as const

export function buttonRecipeStyles(variants?: {
  size?: ButtonSize
  variant?: ButtonVariant
  colorPalette?: string
}) {
  const size = variants?.size ?? buttonRecipe.defaultVariants.size
  const variant = variants?.variant ?? buttonRecipe.defaultVariants.variant

  return [
    buttonStyles.base,
    buttonTextStyles[size],
    buttonSizes[size],
    buttonVariants[variant],
    variant === 'surface' &&
      buttonWhenVariantSurface[size as keyof typeof buttonWhenVariantSurface],
  ]
}

export type ButtonVariantProps = Parameters<typeof buttonRecipeStyles>[0]

export function buttonIconStyles() {
  return [buttonIcon.base]
}
