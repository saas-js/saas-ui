import { mode } from '@chakra-ui/theme-tools'
import { cardAnatomy } from '@chakra-ui/anatomy'

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle(() => {
  return {
    container: {
      rounded: 'lg',
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
    header: {
      p: 4,
    },
    body: {
      p: 4,
    },
    footer: {
      p: 4,
    },
  }
})

const variantElevated = definePartsStyle((props) => {
  return {
    container: {
      bg: 'white',
      boxShadow: 'sm',
      borderWidth: '1px',
      borderColor: 'blackAlpha.200',
      _dark: { bg: 'whiteAlpha.200', borderColor: 'whiteAlpha.50' },
      '&.chakra-linkbox:hover': {
        borderColor: 'blackAlpha.300',
        _dark: {
          borderColor: 'whiteAlpha.300',
        },
      },
    },
  }
})

const variantFilled = definePartsStyle((props) => {
  const { colorScheme: c } = props

  const bg = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.100', 'whiteAlpha.100')(props)
  const hoverBg = c
    ? mode(`${c}.600`, `${c}.600`)(props)
    : mode('blackAlpha.200', 'whiteAlpha.200')(props)

  const color = c ? 'white' : 'inherit'

  return {
    container: {
      border: 'none',
      boxShadow: 'none',
      bg,
      color,
      '&.chakra-linkbox:hover': {
        bg: hoverBg,
      },
    },
  }
})

const variantOutline = definePartsStyle((props) => {
  const { colorScheme: c } = props

  const borderColor = c
    ? mode(`${c}.500`, `${c}.500`)(props)
    : mode('blackAlpha.200', 'whiteAlpha.300')(props)

  const hoverColor = c
    ? mode(`${c}.600`, `${c}.600`)(props)
    : mode('blackAlpha.300', 'whiteAlpha.400')(props)

  return {
    container: {
      bg: 'transparent',
      boxShadow: 'none',
      borderWidth: '1px',
      borderColor: borderColor,
      '&.chakra-linkbox:hover': {
        borderColor: hoverColor,
      },
    },
  }
})

export const cardTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'elevated',
  },
  baseStyle,
  variants: {
    elevated: variantElevated,
    outline: variantOutline,
    filled: variantFilled,
  },
})
