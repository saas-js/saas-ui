import { defineTokens } from '@chakra-ui/react'

import { scaleToken } from '../utils.ts'

export const lineHeights = defineTokens.lineHeights({
  '2xs': { value: scaleToken('0.845rem') }, // 1.25
  xs: { value: scaleToken('1rem') }, //1.33
  sm: { value: scaleToken('1.1375rem') }, // 1.4
  md: { value: scaleToken('1.26rem') }, // 1.44
  lg: { value: scaleToken('1.5rem') }, // 1.5
  xl: { value: scaleToken('1.62rem') }, // 1.44
  '2xl': { value: scaleToken('1.75rem') }, // 1.4
  '3xl': { value: scaleToken('1.95rem') }, // 1.3
  '4xl': { value: scaleToken('2.345rem') }, // 1.25
  '5xl': { value: scaleToken('2.7rem') }, // 1.2
  '6xl': { value: scaleToken('3.45rem') }, // 1.15
  '7xl': { value: scaleToken('4.125rem') }, // 1.1
  '8xl': { value: scaleToken('4.5rem') }, // 1
  '9xl': { value: scaleToken('6rem') }, // 1
  'heading.xs': { value: scaleToken('0.95rem') }, // 1.33
  'heading.sm': { value: scaleToken('1rem') }, // 1.28
  'heading.md': { value: scaleToken('1.20rem') }, // 1.375
  'heading.lg': { value: scaleToken('1.33rem') }, // 1.33
  'heading.xl': { value: scaleToken('1.46rem') }, // 1.3
  'heading.2xl': { value: scaleToken('1.55rem') }, // 1.25
  'heading.3xl': { value: scaleToken('1.8rem') }, // 1.2
  'heading.4xl': { value: scaleToken('2.15rem') }, // 1.15
  'heading.5xl': { value: scaleToken('2.475rem') }, // 1.1
  'heading.6xl': { value: scaleToken('3rem') }, // 1
  'heading.7xl': { value: scaleToken('3.75rem') }, // 1
})
