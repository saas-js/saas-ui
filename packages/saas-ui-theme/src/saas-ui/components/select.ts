import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { Input } from '@chakra-ui/theme/components'

import { inputTheme } from './form'

export const selectTheme = defineStyleConfig({
  ...Input,
  defaultProps: inputTheme.defaultProps,
  variants: {
    outline: defineStyle((props) => ({
      ...(inputTheme.variants?.outline(props) ?? {}),
    })),
    flushed: defineStyle((props) => Input.variants?.flushed(props) ?? {}),
    filled: defineStyle((props) => Input.variants?.filled(props) ?? {}),
    unstyled: Input.variants?.unstyled ?? {},
  },
  sizes: inputTheme.sizes,
})
