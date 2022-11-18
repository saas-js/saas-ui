import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('nav-group').parts(
  'container',
  'title',
  'icon',
  'content'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      '&:not(:last-of-type)': {
        mb: 4,
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      my: 1,
      height: 6,
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'muted',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      '&.saas-collapse-toggle .chakra-icon': {
        opacity: 0,
      },
      '&.saas-collapse-toggle': {
        cursor: 'pointer',
        borderRadius: 'md',
        _hover: {
          bg: 'blackAlpha.100',
          '& .chakra-icon': {
            opacity: 1,
          },
          _dark: {
            bg: 'whiteAlpha.200',
          },
        },
      },
    },
    content: {},
  }
}

export default {
  parts: parts.keys,
  baseStyle,
}
