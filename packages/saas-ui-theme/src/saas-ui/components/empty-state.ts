import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

import { emptyStateParts as parts } from '../../base/components/empty-state'

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
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
  parts: parts.keys,
  baseStyle,
}
