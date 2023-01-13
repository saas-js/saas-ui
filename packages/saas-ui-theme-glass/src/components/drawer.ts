import { drawerAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/styled-system'

import { runIfFn } from '@chakra-ui/utils'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar('drawer-bg')

const baseStyleOverlay = defineStyle({
  bg: 'blackAlpha.50',
})

const baseStyleDialog = defineStyle((props) => {
  return {
    borderRadius: 'md',
    margin: '8px',
    borderWidth: '1px',
    borderColor: 'chakra-border-color',
    backdropFilter: 'blur(10px) contrast(100%) saturate(100%) brightness(200%)',
    [$bg.variable]: 'colors.whiteAlpha.800',
    fontSize: 'md',
    _dark: {
      backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
      [$bg.variable]: 'colors.grayAlpha.700',
    },
  }
})

const baseStyleHeader = defineStyle({
  px: '4',
  py: '3',
  fontSize: 'md',
  fontWeight: 'semibold',
})

const baseStyleCloseButton = defineStyle({
  position: 'absolute',
  top: '2',
  insetEnd: '3',
})

const baseStyleBody = defineStyle((props) => {
  return {
    px: '4',
    py: '2',
  }
})

const baseStyleFooter = defineStyle({
  px: '3',
  py: '3',
})

const baseStyle = definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: runIfFn(baseStyleBody, props),
  footer: baseStyleFooter,
}))

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})

export default modalTheme
