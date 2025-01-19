import { defineSemanticTokens } from '@chakra-ui/react'

export const semanticRadii = defineSemanticTokens.radii({
  l1: { value: '{radii.xs}' },
  l2: { value: '{radii.sm}' },
  l3: { value: '{radii.md}' },
  control: {
    sm: {
      value: 'calc({radii.xs} * var(--scale-factor) * var(--radius-control))',
    },
    md: {
      value: 'calc({radii.sm} * var(--scale-factor) * var(--radius-control))',
    },
    lg: {
      value: 'calc({radii.md} * var(--scale-factor) * var(--radius-control))',
    },
  },
  panel: {
    sm: {
      value: 'calc({radii.sm} * var(--scale-factor) * var(--radius-panel))',
    },
    md: {
      value: 'calc({radii.md} * var(--scale-factor) * var(--radius-panel))',
    },
    lg: {
      value: 'calc({radii.lg} * var(--scale-factor) * var(--radius-panel))',
    },
  },
  indicator: {
    sm: {
      value: 'calc({radii.xs} * var(--scale-factor) * var(--radius-indicator))',
    },
    md: {
      value: 'calc({radii.sm} * var(--scale-factor) * var(--radius-indicator))',
    },
    lg: {
      value: 'calc({radii.md} * var(--scale-factor) * var(--radius-indicator))',
    },
  },
})
