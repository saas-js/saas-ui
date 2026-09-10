import { appearanceColors } from '../appearance.ts'
import { defineTokens } from '../def'

export type { ColorPalette } from '../palette.ts'

export const colors = defineTokens.colors({
  transparent: { value: 'transparent' },
  current: { value: 'currentColor' },
  black: { value: 'oklch(0.05 0.030 261.692)' },
  white: { value: 'oklch(1 0 0)' },
  base: appearanceColors.base,
  whiteAlpha: {
    50: { value: 'oklch(1 0 0 / 0.04)' },
    100: { value: 'oklch(1 0 0 / 0.06)' },
    200: { value: 'oklch(1 0 0 / 0.08)' },
    300: { value: 'oklch(1 0 0 / 0.16)' },
    400: { value: 'oklch(1 0 0 / 0.24)' },
    500: { value: 'oklch(1 0 0 / 0.36)' },
    600: { value: 'oklch(1 0 0 / 0.48)' },
    700: { value: 'oklch(1 0 0 / 0.64)' },
    800: { value: 'oklch(1 0 0 / 0.80)' },
    900: { value: 'oklch(1 0 0 / 0.92)' },
    950: { value: 'oklch(1 0 0 / 0.95)' },
  },
  blackAlpha: {
    50: { value: 'oklch(0 0 0 / 0.04)' },
    100: { value: 'oklch(0 0 0 / 0.06)' },
    200: { value: 'oklch(0 0 0 / 0.08)' },
    300: { value: 'oklch(0 0 0 / 0.16)' },
    400: { value: 'oklch(0 0 0 / 0.24)' },
    500: { value: 'oklch(0 0 0 / 0.36)' },
    600: { value: 'oklch(0 0 0 / 0.48)' },
    700: { value: 'oklch(0 0 0 / 0.64)' },
    800: { value: 'oklch(0 0 0 / 0.80)' },
    900: { value: 'oklch(0 0 0 / 0.92)' },
    950: { value: 'oklch(0 0 0 / 0.95)' },
  },
})
