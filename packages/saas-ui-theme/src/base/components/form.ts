import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { formAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys)

const horizontalVariant = definePartsStyle({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
})

export const formTheme = defineMultiStyleConfig({
  variants: {
    horizontal: horizontalVariant,
  },
})
