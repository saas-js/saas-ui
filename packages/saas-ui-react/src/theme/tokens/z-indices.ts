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

  hide: { value: -1 },
  base: { value: 0 },
  docked: { value: 10 },
  dropdown: { value: 1000 },
  sticky: { value: 1100 },
  banner: { value: 1200 },
  overlay: { value: 1300 },
  modal: { value: 1400 },
  popover: { value: 1500 },
  skipNav: { value: 1600 },
  toast: { value: 1700 },
  tooltip: { value: 1800 },
  max: { value: 2147483647 },
})
