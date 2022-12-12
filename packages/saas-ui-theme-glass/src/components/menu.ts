import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('menu-bg')
const $shadow = cssVar('menu-shadow')

const baseStyleList = defineStyle({
  [$bg.variable]: 'colors.white',
  [$shadow.variable]: 'shadows.lg',
  _dark: {
    [$bg.variable]: 'colors.grayAlpha.700',
    [$shadow.variable]: 'shadows.dark-lg',
  },
  py: '1',
  borderRadius: 'md',
  borderWidth: '1px',
  bg: $bg.reference,
  boxShadow: $shadow.reference,
  backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
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
  },
  _focus: {
    bg: $bg.reference,
  },
  _active: {
    bg: $bg.reference,
  },
  _expanded: {
    bg: $bg.reference,
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
