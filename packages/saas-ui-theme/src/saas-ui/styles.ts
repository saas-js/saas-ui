import { mode, Styles } from '@chakra-ui/theme-tools'

const styles: Styles = {
  global: (props) => ({
    // 'html, body': {
    //   height: '100%',
    // },
    body: {
      WebkitFontSmoothing: 'antialiased',
      TextRendering: 'optimizelegibility',
    },
    // 'div#__next, div#__next > div': {
    //   height: '100%',
    // },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.200')(props),
      wordWrap: 'break-word',
    },
  }),
}

export default styles
