import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

import { emptyStateAnatomy } from '../../anatomy'

const baseStyle: PartsStyleFunction<typeof emptyStateAnatomy> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      boxSize: [10, null, 12],
      color: `${c}.500`,
      _dark: {
        color: `${c}.500`,
      },
    },
  }
}

export default {
  parts: emptyStateAnatomy.keys,
  baseStyle,
}
