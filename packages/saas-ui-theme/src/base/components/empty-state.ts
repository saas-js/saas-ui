import { anatomy, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

export const parts = anatomy('emptystate').parts(
  'container',
  'body',
  'icon',
  'title',
  'descripton',
  'actions',
  'footer'
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      boxSize: [10, null, 12],
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
    title: {
      mt: 8,
    },
    actions: {
      mt: 8,
    },
  }
}

const variantCentered: PartsStyleFunction<typeof parts> = (props) => {
  return {
    body: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
    },
  }
}

export default {
  parts: parts.keys,
  baseStyle,
  variants: {
    centered: variantCentered,
  },
}
