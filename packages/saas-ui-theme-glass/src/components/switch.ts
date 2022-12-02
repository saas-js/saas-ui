import { switchAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'
import { cssVar } from '@chakra-ui/theme-tools'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('switch-bg')

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    [$bg.variable]: 'colors.gray.300',
    _dark: {
      [$bg.variable]: 'colors.whiteAlpha.300',
    },
    _checked: {
      [$bg.variable]: `colors.${c}.500`,
      _dark: {
        [$bg.variable]: `colors.${c}.500`,
      },
    },
    bg: $bg.reference,
  }
})

const baseStyleThumb = defineStyle({
  bg: 'white',
  _dark: {
    bg: 'blackAlpha.800',
    _checked: {
      bg: 'white',
    },
  },
})

const baseStyle = definePartsStyle((props) => ({
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
}))

export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    size: 'md',
    colorScheme: 'primary',
  },
})

export default switchTheme
