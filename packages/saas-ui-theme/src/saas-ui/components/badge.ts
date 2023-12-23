import { defineCssVars, defineStyleConfig } from '@chakra-ui/styled-system'

import { Badge } from '@chakra-ui/theme/components'

const vars = defineCssVars('badge', ['bg', 'color', 'shadow', 'border'])

export const badgeTheme = defineStyleConfig({
  variants: {
    outline: (props) => {
      const styles = Badge.variants?.outline(props)

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
      const styles = Badge.variants?.outline(props)

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
