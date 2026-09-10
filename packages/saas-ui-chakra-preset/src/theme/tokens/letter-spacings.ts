import { defineTokens } from '@chakra-ui/react'

export const letterSpacings = defineTokens.letterSpacings({
  tightest: { value: '-0.05em' },
  tighter: { value: '-0.025em' },
  tight: { value: '-0.0125em' },
  normal: { value: '0' },
  wide: { value: '0.0125em' },
  wider: { value: '0.025em' },
  widest: { value: '0.05em' },
  'heading.xs': { value: '0.0025em' },
  'heading.sm': { value: '0' },
  'heading.md': { value: '0' },
  'heading.lg': { value: '-0.0025em' },
  'heading.xl': { value: '-0.005' },
  'heading.2xl': { value: '-0.00625em' },
  'heading.3xl': { value: '-0.0075em' },
  'heading.4xl': { value: '-0.01em' },
  'heading.5xl': { value: '-0.025em' },
  'heading.6xl': { value: '-0.03em' },
  'heading.7xl': { value: '-0.035em' },
})
