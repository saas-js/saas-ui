import { PartsStyleFunction, mode } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction = (props) => {
  const color = mode('gray.300', 'gray.600')(props)

  return {
    container: {},
    item: {
      minHeight: '32px',
      position: 'relative',
    },
    separator: {
      width: '24px',
      flexShrink: 0,
    },
    icon: {
      color,
      py: '7px',
    },
    dot: {
      width: '9px',
      height: '9px',
      bg: 'currentColor',
      borderRadius: 'full',
    },
    track: {
      bg: color,
      width: '1px',
      flex: 1,
    },
    content: {
      pt: '1px',
      px: '2',
    },
  }
}

const variantSolid: PartsStyleFunction = () => {
  return {
    icon: {},
  }
}

const variantOutline: PartsStyleFunction = () => {
  return {
    dot: {
      bg: 'transparent',
      borderColor: 'currentColor',
      borderWidth: '2px',
    },
  }
}

export const timelineStyleConfig = {
  defaultProps: { variant: 'solid', size: 'sm' },
  baseStyle,
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  sizes: {
    sm: {
      icon: {
        minH: '8px',
        minW: '8px',
      },
    },
  },
}
