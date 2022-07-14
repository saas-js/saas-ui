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
      borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
      _hover: {
        borderColor: mode('blackAlpha.400', 'whiteAlpha.400')(props),
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
