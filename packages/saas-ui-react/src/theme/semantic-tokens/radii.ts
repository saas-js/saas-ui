import { defineSemanticTokens } from '@chakra-ui/react'

export const semanticRadii = defineSemanticTokens.radii({
  l1: { value: '{radii.xs}' },
  l2: { value: '{radii.sm}' },
  l3: { value: '{radii.md}' },
  control: {
    sm: {
      value:
        'calc({radii.xs} * var(--scale-factor, 1) * var(--radius-control, 1))',
    },
    md: {
      value:
        'calc({radii.sm} * var(--scale-factor, 1) * var(--radius-control, 1))',
    },
    lg: {
      value:
        'calc({radii.md} * var(--scale-factor, 1) * var(--radius-control, 1))',
    },
  },
  panel: {
    sm: {
      value:
        'calc({radii.sm} * var(--scale-factor, 1) * var(--radius-panel, 1))',
    },
    md: {
      value:
        'calc({radii.md} * var(--scale-factor, 1) * var(--radius-panel, 1  ))',
    },
    lg: {
      value:
        'calc({radii.lg} * var(--scale-factor, 1) * var(--radius-panel, 1))',
    },
  },
  indicator: {
    sm: {
      value:
        'calc({radii.xs} * var(--scale-factor, 1) * var(--radius-indicator, 1))',
    },
    md: {
      value:
        'calc({radii.sm} * var(--scale-factor, 1) * var(--radius-indicator, 1  ))',
    },
    lg: {
      value:
        'calc({radii.md} * var(--scale-factor, 1) * var(--radius-indicator, 1))',
    },
  },
})
