import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  StyleFunctionProps,
} from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar('alert-fg')
const $bg = cssVar('alert-bg')
const $b = cssVar('alert-border')

function getBg(props: StyleFunctionProps) {
  const { theme, colorScheme: c } = props
  const darkBg = transparentize(`${c}.600`, 0.16)(theme)
  return {
    light: `colors.${c}.100`,
    dark: darkBg,
  }
}

function getBorder(props: StyleFunctionProps) {
  const { theme, colorScheme: c } = props
  const darkBg = transparentize(`${c}.300`, 0.16)(theme)
  return {
    light: `colors.${c}.200`,
    dark: darkBg,
  }
}

const variantSubtle = definePartsStyle((props) => {
  const { colorScheme: c } = props
  const bg = getBg(props)
  const border = getBorder(props)
  return {
    container: {
      borderWidth: '1px',
      [$fg.variable]: `colors.${c}.500`,
      [$bg.variable]: bg.light,
      [$b.variable]: border.light,
      _dark: {
        [$fg.variable]: `colors.${c}.500`,
        [$bg.variable]: bg.dark,
        [$b.variable]: border.dark,
      },
    },
  }
})

const baseStyle = definePartsStyle(() => {
  return {
    container: {
      borderColor: $b.reference,
      borderRadius: 'md',
      fontSize: 'sm',
    },
    icon: {
      w: 4,
      h: 5,
    },
    title: {
      fontSize: 'sm',
      fontWeight: 'medium',
    },
    description: {
      color: 'muted',
    },
  }
})

export default defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
    colorScheme: 'primary',
  },
  baseStyle,
  variants: {
    subtle: variantSubtle,
  },
})
