import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { nprogressAnatomy } from '../../anatomy'

export const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(nprogressAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    bar: {
      bg: `${c}.500`,
      _dark: {
        bg: `${c}.300`,
      },
    },
  }
})

export const nprogressTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'teal',
  },
  baseStyle,
})
