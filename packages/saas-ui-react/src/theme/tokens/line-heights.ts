import { defineTokens } from '@chakra-ui/react'

import { scaleToken } from '../utils'

export const lineHeights = defineTokens.lineHeights({
  shorter: { value: scaleToken('1.25') },
  short: { value: scaleToken('1.375') },
  moderate: { value: scaleToken('1.5') },
  tall: { value: scaleToken('1.625') },
  taller: { value: scaleToken('2') },
  '3': { value: scaleToken('0.75rem') },
  '4': { value: scaleToken('1rem') },
  '5': { value: scaleToken('1.25rem') },
  '6': { value: scaleToken('1.5rem') },
  '7': { value: scaleToken('1.75rem') },
  '8': { value: scaleToken('2rem') },
  '9': { value: scaleToken('2.25rem') },
  '10': { value: scaleToken('2.5rem') },
})
