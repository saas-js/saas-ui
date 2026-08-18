import * as stylex from '@stylexjs/stylex'

export const semanticRadii = stylex.defineVars({
  l1: 'var(--sui-radii-xs)',
  l2: 'var(--sui-radii-sm)',
  l3: 'var(--sui-radii-md)',
  controlSm:
    'calc(var(--sui-radii-xs) * var(--scale-factor, 1) * var(--radius-control, 1))',
  controlMd:
    'calc(var(--sui-radii-sm) * var(--scale-factor, 1) * var(--radius-control, 1))',
  controlLg:
    'calc(var(--sui-radii-md) * var(--scale-factor, 1) * var(--radius-control, 1))',
  panelSm:
    'calc(var(--sui-radii-sm) * var(--scale-factor, 1) * var(--radius-panel, 1))',
  panelMd:
    'calc(var(--sui-radii-md) * var(--scale-factor, 1) * var(--radius-panel, 1  ))',
  panelLg:
    'calc(var(--sui-radii-lg) * var(--scale-factor, 1) * var(--radius-panel, 1))',
  indicatorSm:
    'calc(var(--sui-radii-xs) * var(--scale-factor, 1) * var(--radius-indicator, 1))',
  indicatorMd:
    'calc(var(--sui-radii-sm) * var(--scale-factor, 1) * var(--radius-indicator, 1  ))',
  indicatorLg:
    'calc(var(--sui-radii-md) * var(--scale-factor, 1) * var(--radius-indicator, 1))',
})
