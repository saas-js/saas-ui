import { menuAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const menuSlotRecipe = defineSlotRecipe({
  className: 'chakra-menu',
  slots: menuAnatomy.keys(),
  base: {
    content: {
      layerStyle: 'overlay',
      outline: 0,
      color: 'fg',
      maxHeight: 'var(--available-height)',
      '--menu-z-index': 'zIndex.layer-3',
      zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
      overflowY: 'auto',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fastest',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'fastest',
      },
      scrollbar: 'thin',
    },
    item: {
      textDecoration: 'none',
      color: 'fg',
      userSelect: 'none',
      borderRadius: 'control.md',
      width: '100%',
      display: 'flex',
      cursor: 'menuitem',
      alignItems: 'center',
      textAlign: 'start',
      position: 'relative',
      flex: '0 0 auto',
      outline: 0,
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    itemText: {
      flex: '1',
    },
    itemGroupLabel: {
      display: 'flex',
      alignItems: 'center',
      textStyle: 'sm',
      color: 'fg.subtle',
    },
    indicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
    },
    itemCommand: {
      opacity: '0.6',
      textStyle: 'xs',
      ms: 'auto',
      ps: '4',
      letterSpacing: 'widest',
    },
    separator: {
      height: '1px',
      bg: 'bg.muted',
      my: '1',
      mx: '-1',
    },
  },

  variants: {
    variant: {
      subtle: {
        item: {
          _highlighted: {
            bg: 'bg.emphasized',
          },
        },
      },
      solid: {
        item: {
          _highlighted: {
            bg: 'colorPalette.solid',
            color: 'colorPalette.contrast',
          },
        },
      },
    },

    size: {
      sm: {
        content: {
          minW: '8rem',
          padding: '1',
          borderRadius: 'panel.md',
        },
        item: {
          gap: '1',
          textStyle: 'xs',
          minH: '6',
          px: '1.5',
          ps: 'var(--menu-item-inset, {sizes.1.5})',
        },
        itemGroupLabel: {
          textStyle: 'xs',
          minH: '6',
          px: '1.5',
        },
      },
      md: {
        content: {
          minW: '8rem',
          padding: '1',
        },
        item: {
          gap: '2',
          textStyle: 'sm',
          minH: '7',
          px: '2',
          ps: 'var(--menu-item-inset, {sizes.2})',
        },
        itemGroupLabel: {
          textStyle: 'sm',
          minH: '7',
          px: '2',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})
