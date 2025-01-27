import {
  defineCssVars,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

const vars = defineCssVars('badge', ['bg', 'color', 'shadow', 'border'])

const variantOutline = defineStyle((props) => {
  const { colorScheme: c, theme } = props
  const darkColor = transparentize(`${c}.200`, 0.8)(theme)
  return {
    [vars.color.variable]: `colors.${c}.500`,
    _dark: {
      [vars.color.variable]: darkColor,
    },
    [vars.shadow.variable]: `inset 0 0 0px 1px ${vars.color.reference}`,
  }
})

export const badgeTheme = defineStyleConfig({
  variants: {
    outline: (props) => {
      const styles = variantOutline(props)

      return {
        ...styles,
        _dark: {
          ...styles?._dark,
          [vars.shadow.variable]: `inset 0 0 0px 1px ${vars.border.reference}`,
          [vars.color.variable]: `colors.${props.colorScheme}.200`,
          [vars.border.variable]: `colors.${props.colorScheme}.500`,
        },
      }
    },
    ghost: (props) => {
      const styles = variantOutline(props)

      return {
        ...styles,
        shadow: 'none',
        _dark: {
          ...styles?._dark,
          [vars.color.variable]: `colors.${props.colorScheme}.200`,
        },
      }
    },
  },
})
