import { defineTokens } from '@chakra-ui/react'

import { scaleToken } from '../utils'

export const fontSizes = defineTokens.fontSizes({
  '2xs': { value: scaleToken('0.65rem') },
  xs: { value: scaleToken('0.725rem') },
  sm: { value: scaleToken('0.875rem') },
  md: { value: scaleToken('1rem') },
  lg: { value: scaleToken('1.125rem') },
  xl: { value: scaleToken('1.25rem') },
  '2xl': { value: scaleToken('1.5rem') },
  '3xl': { value: scaleToken('1.875rem') },
  '4xl': { value: scaleToken('2.25rem') },
  '5xl': { value: scaleToken('3rem') },
  '6xl': { value: scaleToken('3.75rem') },
  '7xl': { value: scaleToken('4.5rem') },
  '8xl': { value: scaleToken('6rem') },
  '9xl': { value: scaleToken('8rem') },
})
