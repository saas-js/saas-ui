import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { searchInputAnatomy } from '../../anatomy'
const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  searchInputAnatomy.keys
)

export const searchInputTheme = defineMultiStyleConfig({
  baseStyle: {
    input: {
      pr: 8,
    },
  },
  sizes: {
    sm: {
      reset: {
        fontSize: '0.7em',
      },
    },
    lg: {
      input: {
        pr: 10,
      },
    },
  },
})
