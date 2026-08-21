import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
  transparent: 'transparent',
  current: 'currentColor',
  black: 'oklch(0.05 0.030 261.692)',
  white: 'oklch(1 0 0)',
  baseContrast:
    'light-dark(oklch(from var(--sui-base) 0.985 calc(c * 0.08) h / 1), oklch(from var(--sui-base) 0.16 calc(c * 0.4) h / 1))',
  baseFg:
    'light-dark(oklch(from var(--sui-base) 0.28 calc(c * 0.65) h / 1), oklch(from var(--sui-base) 0.84 calc(c * 0.5) h / 1))',
  baseMuted:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.05), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.08))',
  baseSubtle:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.08), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.13))',
  baseEmphasized:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.14), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.2))',
  baseSolid:
    'light-dark(oklch(from var(--sui-base) 0.2 calc(c * 0.5) h / 1), oklch(from var(--sui-base) 0.92 calc(c * 0.25) h / 1))',
  baseFocusRing:
    'light-dark(oklch(from var(--sui-base) 0.48 calc(c * 0.8) h / 1), oklch(from var(--sui-base) 0.68 calc(c * 0.8) h / 1))',
  baseBorder:
    'light-dark(oklch(from var(--sui-base) calc(0.18 + 0.02 * max(calc(-1 * var(--sui-contrast)), 0) - 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.12), oklch(from var(--sui-base) calc(0.94 - 0.02 * max(calc(-1 * var(--sui-contrast)), 0) + 0.02 * max(var(--sui-contrast), 0)) calc(c * 0.3) h / 0.18))',
  whiteAlpha50: 'oklch(1 0 0 / 0.04)',
  whiteAlpha100: 'oklch(1 0 0 / 0.06)',
  whiteAlpha200: 'oklch(1 0 0 / 0.08)',
  whiteAlpha300: 'oklch(1 0 0 / 0.16)',
  whiteAlpha400: 'oklch(1 0 0 / 0.24)',
  whiteAlpha500: 'oklch(1 0 0 / 0.36)',
  whiteAlpha600: 'oklch(1 0 0 / 0.48)',
  whiteAlpha700: 'oklch(1 0 0 / 0.64)',
  whiteAlpha800: 'oklch(1 0 0 / 0.80)',
  whiteAlpha900: 'oklch(1 0 0 / 0.92)',
  whiteAlpha950: 'oklch(1 0 0 / 0.95)',
  blackAlpha50: 'oklch(0 0 0 / 0.04)',
  blackAlpha100: 'oklch(0 0 0 / 0.06)',
  blackAlpha200: 'oklch(0 0 0 / 0.08)',
  blackAlpha300: 'oklch(0 0 0 / 0.16)',
  blackAlpha400: 'oklch(0 0 0 / 0.24)',
  blackAlpha500: 'oklch(0 0 0 / 0.36)',
  blackAlpha600: 'oklch(0 0 0 / 0.48)',
  blackAlpha700: 'oklch(0 0 0 / 0.64)',
  blackAlpha800: 'oklch(0 0 0 / 0.80)',
  blackAlpha900: 'oklch(0 0 0 / 0.92)',
  blackAlpha950: 'oklch(0 0 0 / 0.95)',
})
