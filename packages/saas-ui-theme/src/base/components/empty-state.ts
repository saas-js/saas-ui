import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

import { emptyStateAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(emptyStateAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      color: `${c}.500`,
      _dark: {
        color: `${c}.200`,
      },
    },
    title: {
      mb: 1,
      fontWeight: 'semibold',
    },
    actions: {
      mt: 8,
    },
  }
})

const variantCentered = definePartsStyle((props) => {
  return {
    body: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
    },
  }
})

export const emptyStateTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    centered: variantCentered,
  },
  sizes: {
    sm: {
      icon: {
        fontSize: '2xl',
      },
      title: {
        mt: 4,
        fontSize: 'sm',
      },
      description: {
        fontSize: 'sm',
      },
    },
    md: {
      icon: {
        fontSize: '3xl',
      },
      title: {
        mt: 8,
        fontSize: 'md',
      },
      description: {
        fontSize: 'md',
      },
    },
  },
})
