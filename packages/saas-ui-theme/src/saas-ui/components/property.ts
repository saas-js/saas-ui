import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { propertyAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(propertyAnatomy.keys)

export const propertyTheme = defineMultiStyleConfig({
  baseStyle: {
    label: {
      color: 'muted',
      _dark: {
        color: 'muted',
      },
    },
  },
})
