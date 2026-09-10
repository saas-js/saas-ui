/* Generated from @saas-ui/chakra-preset. Do not edit by hand. */

import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/font-sizes.stylex.ts'
import { lineHeights } from '../tokens/line-heights.stylex.ts'
import { radii } from '../tokens/radii.stylex.ts'
import { semanticColors } from '../semantic-tokens/colors.stylex.ts'

export const personaRoot = stylex.create({
  base: {
    '--presence-border-color': 'var(--bg-currentcolor)',
    '--persona-presence': semanticColors.presenceOffline,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export const personaDetails = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    lineHeight: lineHeights.short,
  },
})

export const personaDetailsSizes = stylex.create({
  '2xs': {
    ms: 1,
  },
  xs: {
    ms: 1.5,
  },
  sm: {
    ms: 2,
  },
  md: {
    ms: 2,
  },
  lg: {
    ms: 3,
  },
  xl: {
    ms: 4,
  },
  '2xl': {
    ms: 4,
  },
})

export const personaLabel = stylex.create({
  base: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    color: semanticColors.fg,
  },
})

export const personaLabelSizes = stylex.create({
  '2xs': {
    fontSize: fontSizes.xs,
  },
  xs: {
    fontSize: fontSizes.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
  },
  md: {
    fontSize: fontSizes.sm,
  },
  lg: {
    fontSize: fontSizes.md,
  },
  xl: {
    fontSize: fontSizes.lg,
  },
  '2xl': {
    fontSize: fontSizes.xl,
  },
})

export const personaSecondaryLabel = stylex.create({
  base: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    color: `color-mix(in oklch, ${semanticColors.fg} 60%, transparent)`,
  },
})

export const personaSecondaryLabelSizes = stylex.create({
  '2xs': {
    display: 'none',
  },
  xs: {
    display: 'none',
  },
  sm: {
    fontSize: fontSizes.xs,
  },
  md: {
    fontSize: fontSizes.xs,
  },
  lg: {
    fontSize: fontSizes.sm,
  },
  xl: {
    fontSize: fontSizes.md,
  },
  '2xl': {
    fontSize: fontSizes.lg,
  },
})

export const personaTertiaryLabel = stylex.create({
  base: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    color: `color-mix(in oklch, ${semanticColors.fg} 60%, transparent)`,
  },
})

export const personaTertiaryLabelSizes = stylex.create({
  '2xs': {
    display: 'none',
  },
  xs: {
    display: 'none',
  },
  sm: {
    display: 'none',
  },
  md: {
    display: 'none',
  },
  lg: {
    fontSize: fontSizes.sm,
  },
  xl: {
    fontSize: fontSizes.md,
  },
  '2xl': {
    fontSize: fontSizes.lg,
  },
})

export const personaPresence = stylex.create({
  base: {},
})

export const personaPresenceVariants = stylex.create({
  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 'calc(var(--avatar-size) / 3)',
    height: 'calc(var(--avatar-size) / 3)',
    transform: 'translate(12%, 12%)',
    borderWidth: '0.10em',
    borderRadius: '50%',
    borderColor: 'var(--presence-border-color)',
    backgroundColor: 'var(--persona-presence)',
  },
  ring: {
    outlineWidth: '2px',
    outlineColor: 'var(--persona-presence)',
    outlineOffset: '2px',
    outlineStyle: 'solid',
    borderRadius: radii.full,
    position: 'absolute',
    inset: 0,
  },
})

export type PersonaSize = keyof typeof personaDetailsSizes

export type PersonaVariant = keyof typeof personaPresenceVariants

export const personaSlotRecipe = {
  slots: {
    root: {
      styles: personaRoot,
    },
    details: {
      styles: personaDetails,
      sizes: personaDetailsSizes,
    },
    label: {
      styles: personaLabel,
      sizes: personaLabelSizes,
    },
    secondaryLabel: {
      styles: personaSecondaryLabel,
      sizes: personaSecondaryLabelSizes,
    },
    tertiaryLabel: {
      styles: personaTertiaryLabel,
      sizes: personaTertiaryLabelSizes,
    },
    presence: {
      styles: personaPresence,
      variants: personaPresenceVariants,
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'badge',
  },
} as const

export function personaSlotStyles(
  slot: keyof typeof personaSlotRecipe.slots,
  variants?: {
    size?: PersonaSize
    variant?: PersonaVariant
  },
) {
  const size = variants?.size ?? personaSlotRecipe.defaultVariants.size
  const variant = variants?.variant ?? personaSlotRecipe.defaultVariants.variant
  const def = personaSlotRecipe.slots[slot]

  return [
    def.styles.base,
    'sizes' in def ? def.sizes[size as keyof typeof def.sizes] : false,
    'variants' in def
      ? def.variants[variant as keyof typeof def.variants]
      : false,
  ]
}
