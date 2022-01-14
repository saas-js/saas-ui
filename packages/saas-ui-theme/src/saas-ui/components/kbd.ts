import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantSolid: SystemStyleFunction = (props) => {
  return {
    bg: mode('blackAlpha.300', 'blackAlpha.600')(props),
    display: 'inline-block',
    borderRadius: '3px',
    minW: '20px',
    textAlign: 'center',
    mr: 1,
    ':last-child': {
      mr: 0,
    },
  }
}

export default {
  defaultProps: {
    variant: 'solid',
  },
  variants: {
    basic: {
      opacity: 0.6,
    },
    solid: variantSolid,
  },
}
