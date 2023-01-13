import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from '@chakra-ui/styled-system'

import { runIfFn } from '@chakra-ui/utils'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $popperBg = cssVar('popper-bg')
const $arrowBg = cssVar('popper-arrow-bg')
const $arrowShadowColor = cssVar('popper-arrow-shadow-color')

const baseStyleContent = defineStyle({
  [$popperBg.variable]: `colors.whiteAlpha.800`,
  bg: $popperBg.reference,
  [$arrowBg.variable]: $popperBg.reference,
  [$arrowShadowColor.variable]: `colors.gray.200`,
  backdropFilter: 'blur(10px) contrast(100%) saturate(100%) brightness(200%)',
  _dark: {
    [$popperBg.variable]: `colors.grayAlpha.700`,
    [$arrowShadowColor.variable]: `colors.whiteAlpha.300`,
    backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
  },
})

const baseStyle = definePartsStyle((props) => ({
  content: runIfFn(baseStyleContent, props),
}))

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: { size: 'md' },
})

export default popoverTheme
