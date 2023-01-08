import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('menu-bg')
const $shadow = cssVar('menu-shadow')

const baseStyleList = defineStyle({
  [$bg.variable]: 'colors.whiteAlpha.500',
  [$shadow.variable]: 'shadows.lg',
  backdropFilter: 'blur(10px) contrast(100%) saturate(190%)',
  _dark: {
    [$bg.variable]: 'colors.grayAlpha.700',
    [$shadow.variable]: 'shadows.dark-lg',
    backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
  },
  py: '1',
  borderRadius: 'md',
  borderWidth: '1px',
  bg: $bg.reference,
  boxShadow: $shadow.reference,
})

const baseStyleItem = defineStyle({
  py: '1.5',
  px: '3',
  mx: '1',
  rounded: 'md',
  fontSize: 'sm',
  width: 'calc(100% - 8px)',
  boxSizing: 'border-box',
  bg: 'transparent',
  _hover: {
    bg: $bg.reference,
    [$bg.variable]: 'colors.grayAlpha.300',
  },
  _focus: {
    bg: $bg.reference,
    [$bg.variable]: 'colors.grayAlpha.300',
  },
  _active: {
    bg: $bg.reference,
    [$bg.variable]: 'colors.grayAlpha.300',
  },
  _expanded: {
    bg: $bg.reference,
    [$bg.variable]: 'colors.grayAlpha.300',
  },
})

const baseStyleGroupTitle = defineStyle({
  mx: 4,
  my: 2,
  fontWeight: 'semibold',
  fontSize: 'sm',
})

const baseStyleButton = defineStyle({
  transitionProperty: 'common',
  transitionDuration: 'normal',
})

const baseStyleDivider = defineStyle({
  my: '1',
})

const baseStyle = definePartsStyle({
  button: baseStyleButton,
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  divider: baseStyleDivider,
})

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
})

export default menuTheme
