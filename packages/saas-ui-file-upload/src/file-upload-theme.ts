import { anatomy } from '@chakra-ui/theme-tools'

export const fileUploadAnatomy = anatomy('file-upload').parts(
  'container',
  'dropzone',
  'button'
)

import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(fileUploadAnatomy.keys)

const baseStyle = definePartsStyle({
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 1,
    borderRadius: 'md',
    borderWidth: 1,
    borderStyle: 'dashed',
    py: 4,
    px: 6,
    transitionProperty: 'common',
    transitionDuration: 'normal',
    '&[data-dragging]:not([data-disabled])': {
      bg: 'blackAlpha.100',
      _dark: {
        bg: 'whiteAlpha.100',
      },
    },
  },
})

export const fileUploadTheme = defineMultiStyleConfig({
  defaultProps: {},
  baseStyle,
})
