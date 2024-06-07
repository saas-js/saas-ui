import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { formAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys)

const horizontalVariant = definePartsStyle({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export const formTheme = defineMultiStyleConfig({
  variants: {
    horizontal: horizontalVariant,
  },
})
