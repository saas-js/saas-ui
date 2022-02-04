import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    closeButton: {
      top: 4,
      insetEnd: 4,
    },
  }
}

export default {
  baseStyle,
}
