import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

import { emptyStateAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(emptyStateAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      boxSize: [10, null, 12],
      color: `${c}.500`,
      _dark: {
        color: `${c}.200`,
      },
    },
    title: {
      mt: 8,
      fontWeight: 'bold',
      fontSize: 'xl',
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
})
