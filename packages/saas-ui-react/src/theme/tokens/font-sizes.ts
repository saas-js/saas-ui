import { defineTokens } from '@chakra-ui/react'

import { scaleToken } from '../utils'

export const fontSizes = defineTokens.fontSizes({
  '2xs': { value: scaleToken('0.675rem') },
  xs: { value: scaleToken('0.75rem') },
  sm: { value: scaleToken('0.8125rem') },
  md: { value: scaleToken('0.875rem') },
  lg: { value: scaleToken('1rem') },
  xl: { value: scaleToken('1.125rem') },
  '2xl': { value: scaleToken('1.25rem') },
  '3xl': { value: scaleToken('1.5rem') },
  '4xl': { value: scaleToken('1.875rem') },
  '5xl': { value: scaleToken('2.25rem') },
  '6xl': { value: scaleToken('3rem') },
  '7xl': { value: scaleToken('3.75rem') },
  '8xl': { value: scaleToken('4.5rem') },
  '9xl': { value: scaleToken('6rem') },
})
