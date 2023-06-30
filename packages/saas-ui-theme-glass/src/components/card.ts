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
const $shadow = cssVar('card-shadow')
const $radius = cssVar('card-radius')
const $border = cssVar('card-border-width', '0')
const $borderColor = cssVar('card-border-color')

const sizes = {
  sm: definePartsStyle({
    container: {
      [$radius.variable]: 'radii.base',
      [$padding.variable]: 'space.3',
    },
  }),
  md: definePartsStyle({
    container: {
      [$radius.variable]: 'radii.md',
      [$padding.variable]: 'space.4',
    },
  }),
  lg: definePartsStyle({
    container: {
      [$radius.variable]: 'radii.xl',
      [$padding.variable]: 'space.6',
    },
  }),
}

const variantShadow = definePartsStyle((props) => {
  const { isHoverable } = props
  return {
    container: {
      [$borderColor.variable]: 'colors.blackAlpha.200',
      [$border.variable]: '1px',
      [$shadow.variable]: 'shadows.sm',
      _hover: isHoverable
        ? {
            [$borderColor.variable]: 'colors.blackAlpha.300',
          }
        : {},
      _dark: {
        [$bg.variable]: 'colors.gray.700',
        [$borderColor.variable]: 'colors.whiteAlpha.50',
        _hover: isHoverable
          ? {
              [$borderColor.variable]: 'colors.whiteAlpha.300',
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
  variants: {
    elevated: variantShadow,
    shadow: variantShadow,
  },
  sizes,
}
