import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { propertyAnatomy } from '../../anatomy'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(propertyAnatomy.keys)

export const propertyTheme = defineMultiStyleConfig({
  baseStyle: {
    label: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '100px',
      width: '30%',
      marginEnd: 2,
      py: 2,
      color: 'gray.500',
      _dark: {
        color: 'gray.400',
      },
    },
  },
})
