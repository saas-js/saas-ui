import { inputAnatomy } from '@chakra-ui/anatomy'

import {
  createMultiStyleConfigHelpers,
  defineStyleConfig,
} from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const inputSizes = {
  sm: definePartsStyle({
    field: {
      borderRadius: 'md',
    },
    addon: {
      borderRadius: 'md',
    },
  }),
  md: definePartsStyle({
    field: {
      px: 3,
      h: 9,
    },
    addon: {
      px: 3,
      h: 9,
    },
  }),
}

const outlineVariant = definePartsStyle((props) => {
  return {
    field: {
      borderColor: `blackAlpha.300`,
      _dark: {
        borderColor: `whiteAlpha.300`,
      },
      _hover: {
        borderColor: `blackAlpha.400`,
        _dark: {
          borderColor: `whiteAlpha.400`,
        },
      },
    },
  }
})

const Input = defineMultiStyleConfig({
  defaultProps: {
    /* @ts-expect-error */
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: outlineVariant,
  },
  sizes: inputSizes,
})

export const formLabelTheme = {
  variants: {
    horizontal: {
      mb: 0,
      marginStart: '0.5rem',
    },
  },
}

export const inputTheme = Input
export const numberInputTheme = Input
export const pinInputTheme = defineStyleConfig({
  defaultProps: {
    /* @ts-expect-error */
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: outlineVariant,
  },
  sizes: inputSizes,
})
export const textareaTheme = Input
export const selectTheme = Input
