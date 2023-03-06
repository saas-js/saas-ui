import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('emptystate').parts(
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
      color: `${c}.500`,
      _dark: {
        color: `${c}.200`
      }
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

export const emptyStateParts = parts

export default {
  parts: parts.keys,
  baseStyle,
  variants: {
    centered: variantCentered,
  },
}
