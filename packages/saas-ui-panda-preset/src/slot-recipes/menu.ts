import { defineSlotRecipe } from '../def'

export const menuSlotRecipe = defineSlotRecipe({
  className: 'chakra-menu',
  slots: [
    'arrow',
    'arrowTip',
    'content',
    'contextTrigger',
    'indicator',
    'item',
    'itemGroup',
    'itemGroupLabel',
    'itemIndicator',
    'itemText',
    'positioner',
    'separator',
    'trigger',
    'triggerItem',
    'itemCommand',
  ],
  base: {
    content: {
      layerStyle: 'overlay',
      boxShadow: 'md',
      borderWidth: '1px',
      borderColor: 'border',
      outline: 0,
      color: 'fg',
      maxHeight: 'var(--available-height)',
      '--menu-z-index': 'zIndex.layer-3',
      zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
      overflow: 'hidden',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'faster',
      },
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
            bg: 'bg.subtle',
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
          padding: '0.5',
        },
        item: {
          gap: '1',
          textStyle: 'xs',
          py: '1',
          px: '1.5',
        },
        itemGroupLabel: {
          textStyle: 'xs',
          py: '1',
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
          py: '1.5',
          px: '2',
        },
        itemGroupLabel: {
          textStyle: 'sm',
          py: '1.5',
          px: '2',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
})
