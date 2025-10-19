import { defineTokens } from '../../src/def'
import { radiusToken } from '../utils'

export const radii = defineTokens.radii({
  '2xs': {
    value: radiusToken('0.0625rem'),
  },
  xs: { value: radiusToken('0.125rem') },
  sm: { value: radiusToken('0.25rem') },
  md: { value: radiusToken('0.375rem') },
  lg: { value: radiusToken('0.5rem') },
  xl: { value: radiusToken('0.75rem') },
  '2xl': { value: radiusToken('1rem') },
  '3xl': { value: radiusToken('1.5rem') },
  '4xl': { value: radiusToken('2rem') },
  full: { value: 'var(--radius-full)' },
})
