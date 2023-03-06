import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { appShellAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(appShellAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {},
  inner: {},
  main: {},
})

export const appShellTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'fullscreen',
  },
  variants: {
    static: {},
    fullscreen: {
      container: {
        position: 'absolute',
        inset: 0,
      },
    },
  },
  baseStyle,
})
