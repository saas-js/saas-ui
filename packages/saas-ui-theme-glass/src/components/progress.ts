import { progressAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

export default defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle: (props) => {
    const { colorScheme } = props
    return {
      track: {
        borderRadius: 'md',
        bg: 'gray.200',
        _dark: {
          bg: 'gray.700',
        },
      },
      filledTrack: {
        bg: `${colorScheme}.500`,
      },
    }
  },
})
