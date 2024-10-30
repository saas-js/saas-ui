import { defineTokens } from '@chakra-ui/react'

export const zIndices = defineTokens.zIndex({
  // Local elements, eg a badge of an avatar.
  'layer-1': {
    value: 1,
  },
  // Overlay elements, popovers, tooltips, menus, etc.
  'layer-2': {
    value: 10,
  },
  // Elements that should render above main content, eg a sticky header.
  'layer-3': {
    value: 100,
  },
  // Elements not part of main content, eg dialogs.
  'layer-4': {
    value: 1000,
  },
})
