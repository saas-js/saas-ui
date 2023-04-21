import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'
import { getColor, mode } from '@chakra-ui/theme-tools'

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode('blue.500', 'blue.300')(props),
    errorBorderColor: ec || mode('red.500', 'red.300')(props),
  }
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: '1px solid var(--chakra-colors-chakra-border-color)',
      bg: 'inherit',
      _hover: {
        borderColor: 'gray.300',
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: 'none',
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: 'none',
      },
      _dark: {
        bg: 'gray.900',
        borderColor: 'chakra-border-color',
        _hover: {
          borderColor: 'whiteAlpha.400',
        },
        _invalid: {
          borderColor: getColor(theme, ec),
        },
        _focusVisible: {
          borderColor: getColor(theme, fc),
        },
      },
    },
    addon: {
      borderColor: 'inherit',
      bg: 'gray.100',
      _dark: {
        borderColor: 'whiteAlpha.50',
        bg: 'whiteAlpha.300',
      },
    },
  }
})

const sizes = {
  sm: {
    field: {
      borderRadius: '4px',
      h: 7,
    },
    addon: {
      borderRadius: '4px',
      h: 7,
    },
  },
  md: {
    field: {
      px: 3,
      h: 9,
    },
    addon: {
      px: 3,
      h: 9,
    },
  },
}

const Input = {
  defaultProps: {
    variant: 'outline',
    size: 'sm',
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: variantOutline,
  },
  sizes,
}

export default {
  FormLabel: {
    baseStyle: {
      mb: 1,
    },
    variants: {
      horizontal: {
        mb: 0,
        marginStart: '0.5rem',
      },
    },
  },
  Input,
  NumberInput: Input,
  PinInput: Input,
  Textarea: {
    defaultProps: Input.defaultProps,
    variants: {
      outline: defineStyle((props) => variantOutline(props).field),
    },
  },
  Select: Input,
}
