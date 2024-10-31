import { defineTokens } from '@chakra-ui/react'

export const easings = defineTokens.easings({
  linear: { value: 'linear' },
  in: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
  out: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
  'in-out': { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  'bounce-in': { value: 'cubic-bezier(0.34, 1.24, 0.64, 1)' },
  'bounce-out': { value: 'cubic-bezier(0.34, 1.16, 0.64, 1)' },
})
