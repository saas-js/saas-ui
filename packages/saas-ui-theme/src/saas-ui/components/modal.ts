import { modalAnatomy } from '@chakra-ui/anatomy'

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  return {
    closeButton: {
      top: 4,
      insetEnd: 4,
    },
  }
})

export const modalTheme = defineMultiStyleConfig({ baseStyle })
