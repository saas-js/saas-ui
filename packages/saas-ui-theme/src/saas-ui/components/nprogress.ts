import {
  defineMultiStyleConfig,
  definePartsStyle,
} from '../../base/components/nprogress'

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    bar: {
      bg: `${c}.500`,
      _dark: {
        bg: `${c}.500`,
      },
    },
  }
})

export const nprogressTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
  },
  baseStyle,
})
