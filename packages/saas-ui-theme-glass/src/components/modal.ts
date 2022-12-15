import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system'

import { runIfFn } from '@chakra-ui/utils'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleOverlay = defineStyle({
  bg: 'blackAlpha.400',
})

const baseStyleDialog = defineStyle((props) => {
  return {
    borderRadius: 'md',
    bg: 'white',
    my: '16',
    borderWidth: '1px',
    backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
    fontSize: 'md',
    _dark: {
      bg: 'grayAlpha.700',
      boxShadow: 'dark-lg',
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
  defaultProps: { size: 'md' },
})

export default modalTheme
