import { defineTokens } from '@chakra-ui/react'

const motionBand = (axis: 'fast' | 'medium' | 'slow') => ({
  min: { value: `calc(var(--motion-${axis}) * var(--motion-ratio))` },
  DEFAULT: { value: `var(--motion-${axis})` },
  max: { value: `calc(var(--motion-${axis}) / var(--motion-ratio))` },
})

export const durations = defineTokens.durations({
  fastest: { value: '50ms' },
  faster: { value: '100ms' },
  fast: { value: 'var(--motion-fast)' },
  moderate: { value: 'var(--motion-medium)' },
  slow: { value: '300ms' },
  slower: { value: 'var(--motion-slow)' },
  slowest: { value: '500ms' },
  motion: {
    fast: motionBand('fast'),
    medium: motionBand('medium'),
    slow: motionBand('slow'),
  },
})
