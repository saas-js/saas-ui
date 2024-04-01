import { cardAnatomy } from '@chakra-ui/anatomy'

import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const $bg = cssVar('card-bg')
const $padding = cssVar('card-padding')
const $shadow = cssVar('card-shadow')
const $radius = cssVar('card-radius')
const $border = cssVar('card-border-width', '0')
const $borderColor = cssVar('card-border-color')

const baseStyle = definePartsStyle(() => {
  return {
    container: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
    },
  }
})

const variantElevated = definePartsStyle((props) => {
  return {
    container: {
      [$bg.variable]: 'colors.white',
      [$borderColor.variable]: 'colors.blackAlpha.200',
      [$border.variable]: '1px',
      [$shadow.variable]: 'shadows.sm',
      _dark: {
        [$bg.variable]: 'colors.whiteAlpha.200',
        [$borderColor.variable]: 'colors.whiteAlpha.50',
      },
      '&.chakra-linkbox:hover': {
        [$borderColor.variable]: 'colors.blackAlpha.300',
        _dark: {
          [$borderColor.variable]: 'colors.whiteAlpha.300',
        },
      },
    },
  }
})

const variantFilled = definePartsStyle((props) => {
  const { colorScheme: c } = props

  const color = c ? 'white' : 'inherit'

  return {
    container: {
      [$border.variable]: '0',
      [$shadow.variable]: 'none',
      [$bg.variable]: c ? `${c}.500` : `colors.blackAlpha.100`,
      color,
      '&.chakra-linkbox:hover': {
        [$bg.variable]: c ? `${c}.600` : `colors.blackAlpha.200`,
      },
      _dark: {
        [$bg.variable]: c ? `${c}.500` : `colors.whiteAlpha.100`,
        '&.chakra-linkbox:hover': {
          [$bg.variable]: c ? `${c}.600` : `colors.whiteAlpha.200`,
        },
      },
    },
  }
})

const variantOutline = definePartsStyle((props) => {
  const { colorScheme: c } = props

  return {
    container: {
      [$border.variable]: '1px',
      [$shadow.variable]: 'none',
      [$borderColor.variable]: c ? `${c}.500` : `colors.blackAlpha.200`,
      [$bg.variable]: 'transparent',
      '&.chakra-linkbox:hover': {
        [$borderColor.variable]: c ? `${c}.600` : `colors.blackAlpha.300`,
      },
      _dark: {
        [$borderColor.variable]: c ? `${c}.500` : `colors.whiteAlpha.300`,
        '&.chakra-linkbox:hover': {
          [$borderColor.variable]: c ? `${c}.600` : `colors.whiteAlpha.400`,
        },
      },
    },
  }
})

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

export const cardTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'elevated',
  },
  baseStyle,
  variants: {
    elevated: variantElevated,
    outline: variantOutline,
    filled: variantFilled,
  },
  sizes,
})
