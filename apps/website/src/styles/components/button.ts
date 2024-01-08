import { mode } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

const buttonTheme = {
  variants: {
    'nav-link': (props: Dict) => {
      return {
        outline: 'none',
        fontWeight: '500',
        color: 'gray.600',
        transition: 'color .2s ease-in',
        _dark: {
          color: 'whiteAlpha.700',
        },
        _active: {
          color: 'gray.900',
          _dark: {
            color: 'white',
          },
        },
        _hover: {
          textDecoration: 'none',
          color: 'gray.900',
          _dark: {
            color: 'white',
          },
        },
      }
    },
  },
}

export default buttonTheme
