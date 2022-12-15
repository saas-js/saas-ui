import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

const parts = anatomy('card').parts(
  'container',
  'header',
  'title',
  'subtitle',
  'body',
  'footer'
)

const { definePartsStyle } = createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('card-bg')
const $padding = cssVar('card-padding')
const $border = cssVar('card-border')

const baseStyle = definePartsStyle(() => {
  return {
    container: {
      borderColor: $border.reference,
    },
  }
})

const sizes = {
  sm: definePartsStyle({
    container: {
      borderRadius: 'base',
      [$padding.variable]: 'space.3',
    },
  }),
  md: definePartsStyle({
    container: {
      borderRadius: 'md',
      [$padding.variable]: 'space.4',
    },
  }),
  lg: definePartsStyle({
    container: {
      borderRadius: 'xl',
      [$padding.variable]: 'space.6',
    },
  }),
}

const variantShadow = definePartsStyle((props) => {
  const { isHoverable } = props
  return {
    container: {
      [$border.variable]: 'colors.blackAlpha.200',
      boxShadow: 'sm',
      borderWidth: '1px',
      _hover: isHoverable
        ? {
            [$border.variable]: 'colors.blackAlpha.300',
          }
        : {},
      _dark: {
        [$bg.variable]: 'colors.gray.700',
        [$border.variable]: 'colors.whiteAlpha.50',
        _hover: isHoverable
          ? {
              [$border.variable]: 'colors.whiteAlpha.300',
            }
          : {},
      },
    },
  }
})

export default {
  parts: parts.keys,
  defaultProps: {
    variant: 'elevated',
  },
  baseStyle,
  variants: {
    elevated: variantShadow,
    shadow: variantShadow,
  },
  sizes,
}
