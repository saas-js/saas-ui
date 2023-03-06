import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'

const inputSizes = {
  sm: {
    field: {
      borderRadius: 'md',
    },
    addon: {
      borderRadius: 'md',
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

const outlineVariant: PartsStyleFunction<typeof inputAnatomy> = (props) => {
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
}

const Input = {
  defaultProps: {
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: outlineVariant,
  },
  sizes: inputSizes,
}

export default {
  FormLabel: {
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
  Textarea: Input,
  Select: Input,
}
