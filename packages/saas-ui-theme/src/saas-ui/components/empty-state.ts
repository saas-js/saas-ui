import { mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

import { emptyStateParts as parts } from '../../base/components/empty-state'

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    icon: {
      boxSize: [10, null, 12],
      color: mode(`${c}.500`, `${c}.500`)(props),
    },
  }
}

export default {
  parts: parts.keys,
  baseStyle,
}
