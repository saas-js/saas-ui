import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { Input } from '@chakra-ui/theme/components'
import { selectAnatomy } from '../../anatomy'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  selectAnatomy.keys
)

export const selectTheme = defineMultiStyleConfig({
  defaultProps: Input.defaultProps,
  baseStyle: Input.baseStyle,
  sizes: Input.sizes,
  variants: Input.variants,
})
