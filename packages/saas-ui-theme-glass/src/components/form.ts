import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
  defineStyleConfig,
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

const $borderRadius = cssVar('input-border-radius')
const $height = cssVar('input-height')
const $padding = cssVar('input-padding')

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
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.7',
    },
    addon: {
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.7',
    },
  },
  md: {
    field: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.9',
    },
    addon: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.9',
    },
  },
}

const Input = defineStyleConfig({
  defaultProps: {
    variant: 'outline',
    size: 'sm',
    /* @ts-expect-error */
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: variantOutline,
  },
  sizes,
})

export const formLabelTheme = defineStyleConfig({
  baseStyle: {
    mb: 1,
  },
  variants: {
    horizontal: {
      mb: 0,
      marginStart: '0.5rem',
    },
  },
})

export const inputTheme = Input
export const numberInputTheme = Input
export const pinInputTheme = defineStyleConfig({
  defaultProps: {
    /* @ts-expect-error */
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: variantOutline,
  },
  sizes,
})
export const textareaTheme = defineStyleConfig({
  defaultProps: {
    /* @ts-expect-error */
    focusBorderColor: 'primary.500',
  },
  variants: {
    outline: defineStyle(
      (props) => inputTheme.variants?.outline(props).field ?? {}
    ),
  },
})
export const nativeSelectTheme = inputTheme
