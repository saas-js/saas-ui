import { mode, Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  global: (props) => ({
    body: {
      WebkitFontSmoothing: 'antialiased',
      TextRendering: 'optimizelegibility',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.200')(props),
      wordWrap: 'break-word',
    },
  }),
}

export default styles
