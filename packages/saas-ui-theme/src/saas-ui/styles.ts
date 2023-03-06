import { mode, Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  global: (props) => ({
    body: {
      WebkitFontSmoothing: 'antialiased',
      TextRendering: 'optimizelegibility',
    },
    '*, *::before, &::after': {
      borderColor: `gray.200`,
      _dark: {
        borderColor: `whiteAlpha.200`,
      },
      wordWrap: 'break-word',
    },
  }),
}

export default styles
