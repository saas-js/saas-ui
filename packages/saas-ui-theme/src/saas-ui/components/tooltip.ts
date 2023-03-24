import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { cssVar } from '@chakra-ui/theme-tools'

const $bg = cssVar('tooltip-bg')
const $fg = cssVar('tooltip-fg')
const $arrowBg = cssVar('popper-arrow-bg')

const baseStyle = defineStyle((props) => {
  return {
    display: 'flex',
    [$bg.variable]: 'colors.white',
    [$fg.variable]: 'colors.blackAlpha.900',
    _dark: {
      [$bg.variable]: 'colors.gray.700',
      [$fg.variable]: 'colors.whiteAlpha.900',
    },
    px: '8px',
    py: '2px',
    bg: [$bg.reference],
    [$arrowBg.variable]: [$bg.reference],
    borderRadius: 'sm',
    fontWeight: 'medium',
    fontSize: 'xs',
    boxShadow: 'md',
    maxW: '320px',
    zIndex: 'tooltip',
    borderWidth: '1px',
  }
})

export const tooltipTheme = defineStyleConfig({
  baseStyle,
})
