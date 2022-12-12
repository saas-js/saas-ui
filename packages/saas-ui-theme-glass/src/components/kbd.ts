import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/styled-system'

const $bg = cssVar('kbd-bg')

const baseStyle = defineStyle({
  [$bg.variable]: 'colors.blackAlpha.300',
  _dark: {
    [$bg.variable]: 'colors.whiteAlpha.300',
  },
  bg: $bg.reference,
  borderRadius: 'md',
  borderWidth: '0',
  borderBottomWidth: '0',
  padding: '1px',
  minW: '20px',
  textAlign: 'center',
  ':last-child': {
    mr: 0,
  },
})

export const kbdTheme = defineStyleConfig({
  defaultProps: {
    variant: 'solid',
  },
  baseStyle,
})

export default kbdTheme
