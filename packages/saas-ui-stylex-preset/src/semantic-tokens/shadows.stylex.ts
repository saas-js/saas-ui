import * as stylex from '@stylexjs/stylex'

export const semanticShadows = stylex.defineVars({
  xs: 'light-dark(0px 1px 2px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 1px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 1px 1px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  sm: 'light-dark(0px 2px 4px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 2px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 2px 4px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  md: 'light-dark(0px 4px 8px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 3px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 4px 8px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  lg: 'light-dark(0px 8px 16px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 4px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 8px 16px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  xl: 'light-dark(0px 16px 24px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 5px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 16px 24px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  _2xl: 'light-dark(0px 24px 40px color-mix(in oklch, var(--sui-colors-shadow) 10%, transparent), 0px 0px 6px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 24px 40px color-mix(in oklch, var(--sui-colors-shadow) 30%, transparent), 0px 0px 1px inset color-mix(in oklch, var(--sui-colors-white) 5%, transparent))',
  inner:
    'light-dark(inset 0 2px 4px 0 color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), inset 0 2px 4px 0 var(--sui-colors-shadow))',
  inset:
    'light-dark(inset 0 1px 2px 0 color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), inset 0 -1px 2px 0 color-mix(in oklch, var(--sui-colors-white) 4%, transparent), inset 0 0 0 1px color-mix(in oklch, var(--sui-colors-white) 4%, transparent))',
  overlay:
    'light-dark(0px 8px 16px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 4px color-mix(in oklch, var(--sui-colors-shadow) 5%, transparent), 0px 0px 1px color-mix(in oklch, var(--sui-colors-shadow) 80%, transparent), 0px 8px 16px color-mix(in oklch, var(--sui-colors-shadow) 20%, transparent), 0px 0px 3px color-mix(in oklch, var(--sui-colors-shadow) 20%, transparent), 0px 0px 1px color-mix(in oklch, var(--sui-colors-white) 80%, transparent))',
})
