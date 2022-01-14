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

export default {
  FormLabel: {
    variants: {
      horizontal: {
        mb: 0,
        marginStart: '0.5rem',
      },
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'primary.500',
    },
    sizes: inputSizes,
  },
  NumberInput: {
    defaultProps: {
      focusBorderColor: 'primary.500',
    },
    sizes: inputSizes,
  },
  PinInput: {
    defaultProps: {
      focusBorderColor: 'primary.500',
    },
    sizes: inputSizes,
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'primary.500',
    },
    sizes: inputSizes,
  },
  Select: {
    defaultProps: {
      focusBorderColor: 'primary.500',
    },
    sizes: inputSizes,
  },
}
