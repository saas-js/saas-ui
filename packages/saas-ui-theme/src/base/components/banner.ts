import { transparentize } from '@chakra-ui/theme-tools'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { bannerAnatomy } from '../../anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(bannerAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    px: 4,
    py: 3,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: ['column', null, 'row'],
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 6,
    marginEnd: 2,
  },
  description: {
    lineHeight: 6,
    marginEnd: 2,
  },
  actions: {
    marginEnd: 2,
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6,
  },
})

const variantSubtle = definePartsStyle((props) => {
  const { theme, colorScheme: c } = props
  return {
    container: {
      bg: `${c}.100`,
      _dark: { bg: transparentize(`${c}.200`, 0.16)(theme) },
    },
    icon: { color: `${c}.500`, _dark: { color: `${c}.200` } },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: `${c}.500`,
      color: 'white',
    },
  }
})

export const bannerTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    subtle: variantSubtle,
    solid: variantSolid,
  },
  defaultProps: {
    variant: 'subtle',
    colorScheme: 'blue',
  },
})
