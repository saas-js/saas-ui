import { anatomy, getColor, mode, transparentize } from '@chakra-ui/theme-tools'
import type {
  PartsStyleObject,
  PartsStyleFunction,
  StyleFunctionProps,
} from '@chakra-ui/theme-tools'

const parts = anatomy('banner').parts(
  'container',
  'icon',
  'content',
  'title',
  'description',
  'actions',
  'close'
)

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    px: 4,
    py: 3,
  },
  content: {
    display: 'flex',
    flex: 1,
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
}

function getBg(props: StyleFunctionProps): string {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.200`, 0.16)(theme)
  return mode(lightBg, darkBg)(props)
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: { bg: getBg(props) },
    icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: `${c}.500`,
      color: 'white',
    },
  }
}

const variants = {
  subtle: variantSubtle,
  solid: variantSolid,
}

const defaultProps = {
  variant: 'subtle',
  colorScheme: 'blue',
}

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  defaultProps,
}
