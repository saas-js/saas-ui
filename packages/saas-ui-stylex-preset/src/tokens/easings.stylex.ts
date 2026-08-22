import * as stylex from '@stylexjs/stylex'

export const easings = stylex.defineVars({
  standard: 'var(--ease-standard)',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  easeInSmooth: 'cubic-bezier(0.32, 0.72, 0, 1)',
  bounceIn: 'cubic-bezier(0.34, 1.24, 0.64, 1)',
  bounceOut: 'cubic-bezier(0.34, 1.16, 0.64, 1)',
})
