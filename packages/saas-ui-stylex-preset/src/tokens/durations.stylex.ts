import * as stylex from '@stylexjs/stylex'

export const durations = stylex.defineVars({
  fastest: '50ms',
  faster: '100ms',
  fast: 'var(--motion-fast)',
  moderate: 'var(--motion-medium)',
  slow: '300ms',
  slower: 'var(--motion-slow)',
  slowest: '500ms',
  motionFastMin: 'calc(var(--motion-fast) * var(--motion-ratio))',
  motionFast: 'var(--motion-fast)',
  motionFastMax: 'calc(var(--motion-fast) / var(--motion-ratio))',
  motionMediumMin: 'calc(var(--motion-medium) * var(--motion-ratio))',
  motionMedium: 'var(--motion-medium)',
  motionMediumMax: 'calc(var(--motion-medium) / var(--motion-ratio))',
  motionSlowMin: 'calc(var(--motion-slow) * var(--motion-ratio))',
  motionSlow: 'var(--motion-slow)',
  motionSlowMax: 'calc(var(--motion-slow) / var(--motion-ratio))',
})
