import { defineSemanticTokens } from '../def'

function radiusRole(
  primitive: 'xs' | 'sm' | 'md' | 'lg',
  role: 'control' | 'panel' | 'indicator',
) {
  return `calc({radii.${primitive}} * var(--scale-factor, 1) * var(--radius-factor, 1) * var(--radius-${role}-factor, 1))`
}

export const semanticRadii = defineSemanticTokens.radii({
  l1: { value: '{radii.xs}' },
  l2: { value: '{radii.sm}' },
  l3: { value: '{radii.md}' },
  control: {
    DEFAULT: { value: radiusRole('sm', 'control') },
    sm: { value: radiusRole('xs', 'control') },
    md: { value: radiusRole('sm', 'control') },
    lg: { value: radiusRole('md', 'control') },
  },
  panel: {
    DEFAULT: { value: radiusRole('md', 'panel') },
    sm: { value: radiusRole('sm', 'panel') },
    md: { value: radiusRole('md', 'panel') },
    lg: { value: radiusRole('lg', 'panel') },
  },
  indicator: {
    DEFAULT: { value: radiusRole('sm', 'indicator') },
    sm: { value: radiusRole('xs', 'indicator') },
    md: { value: radiusRole('sm', 'indicator') },
    lg: { value: radiusRole('md', 'indicator') },
  },
})
