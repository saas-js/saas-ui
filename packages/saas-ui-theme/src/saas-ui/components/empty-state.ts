import { emptyStateAnatomy } from '../../anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(emptyStateAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      boxSize: [10, null, 12],
      color: `${c}.500`,
      _dark: {
        color: `${c}.500`,
      },
    },
  }
})

export const emptyStateTheme = defineMultiStyleConfig({
  baseStyle,
})
