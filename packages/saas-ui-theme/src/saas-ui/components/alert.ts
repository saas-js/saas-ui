import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys)

const variantSnackbar = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    container: {
      bg: `white`,
      _dark: {
        bg: `black`,
      },
      borderWidth: '1px',
    },
    icon: {
      color: `${c}.500`,
      _dark: {
        color: `${c}.500`,
      },
      '& .chakra-spinner': {
        color: `black`,
        _dark: {
          color: `white`,
        },
      },
    },
    title: { fontWeight: 'semibold', fontSize: 'md' },
    description: {
      fontSize: 'sm',
      color: `gray.500`,
      _dark: {
        color: `gray.400`,
      },
    },
  }
})

const baseStyle = definePartsStyle({
  container: {
    borderRadius: 'md',
  },
})

export const alertTheme = defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
  },
  baseStyle,
  variants: {
    snackbar: variantSnackbar,
  },
})
