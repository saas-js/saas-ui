import { defineSlotRecipe } from '@chakra-ui/react'

export const gridListSlotRecipe = defineSlotRecipe({
  className: 'sui-grid-list',
  slots: ['root', 'item', 'header', 'cell'],
  base: {
    root: {
      py: 2,
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      cursor: 'pointer',
      userSelect: 'none',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      borderRadius: 'inherit',
      outline: 'none',
      _hover: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _focusVisible: {
        boxShadow: 'outline',
      },
      _focus: {
        bg: 'blackAlpha.50',
        _dark: {
          bg: 'whiteAlpha.50',
        },
      },
      _active: {
        bg: 'blackAlpha.100',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      },
      _disabled: {
        cursor: 'inherit',
        opacity: 0.5,
        _hover: {
          bg: 'transparent',
          _dark: {
            bg: 'transparent',
          },
        },
        _active: {
          bg: 'transparent',
          _dark: {
            bg: 'transparent',
          },
        },
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      position: 'sticky',
      fontSize: 'md',
      fontWeight: 'semibold',
      color: 'muted',
    },
    cell: {
      display: 'flex',
      flexShrink: 0,
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fontSize: 'sm',
        },
        item: {
          py: 1,
          px: 1,
        },
        header: {
          py: 1,
          px: 1,
        },
        cell: {
          px: 1,
        },
      },
      md: {
        root: {
          fontSize: 'md',
        },
        item: {
          py: 2,
          px: 2,
        },
        header: {
          py: 2,
          px: 2,
        },
        cell: {
          px: 2,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
