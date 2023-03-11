import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'
import { personaAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(personaAnatomy.keys)

const baseStyleLabel = defineStyle((props) => {
  return {
    color: 'gray.500',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minW: 0,
    _dark: {
      color: 'whiteAlpha.600',
    },
  }
})

const baseStyle = definePartsStyle((props) => {
  return {
    details: {
      minW: 0,
    },
    secondaryLabel: baseStyleLabel(props),
    tertiaryLabel: baseStyleLabel(props),
  }
})

const sizes = {
  '2xs': definePartsStyle({
    details: { ms: 2 },
    label: {
      fontSize: 'xs',
    },
    secondaryLabel: { display: 'none' },
    tertiaryLabel: { display: 'none' },
  }),
  xs: definePartsStyle({
    details: { ms: 2 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: { display: 'none' },
    tertiaryLabel: { display: 'none' },
  }),
  sm: definePartsStyle({
    details: { ms: 2 },
    label: { fontSize: 'md' },
    secondaryLabel: { fontSize: 'sm' },
    tertiaryLabel: { display: 'none' },
  }),
  md: definePartsStyle({
    details: { ms: 2 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: {
      fontSize: 'sm',
    },
    tertiaryLabel: { display: 'none' },
  }),
  lg: definePartsStyle({
    details: { ms: 3 },
    label: {
      fontSize: 'md',
    },
    secondaryLabel: {
      fontSize: 'sm',
    },
    tertiaryLabel: {
      fontSize: 'sm',
    },
  }),
  xl: definePartsStyle({
    details: { ms: 3 },
    label: {
      fontSize: 'xl',
    },
    secondaryLabel: {
      fontSize: 'md',
    },
    tertiaryLabel: { fontSize: 'md' },
  }),
  '2xl': definePartsStyle({
    details: { ms: 4 },
    label: {
      fontSize: '2xl',
    },
    secondaryLabel: {
      fontSize: 'lg',
    },
    tertiaryLabel: { fontSize: 'lg' },
  }),
}

export const personaTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  sizes,
})
