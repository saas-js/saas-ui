import { mode, cssVar, SystemStyleFunction } from '@chakra-ui/theme-tools'

const $bg = cssVar('tooltip-bg')
const $arrowBg = cssVar('popper-arrow-bg')

const baseStyle: SystemStyleFunction = (props) => {
  const bg = mode('white', 'gray.700')(props)
  return {
    display: 'flex',
    [$bg.variable]: `colors.${bg}`,
    px: '8px',
    py: '2px',
    bg: [$bg.reference],
    [$arrowBg.variable]: [$bg.reference],
    color: mode('blackAlpha.900', 'whiteAlpha.900')(props),
    borderRadius: 'sm',
    fontWeight: 'medium',
    fontSize: 'xs',
    boxShadow: 'md',
    maxW: '320px',
    zIndex: 'tooltip',
    borderWidth: '1px',
  }
}

export default {
  baseStyle,
}
