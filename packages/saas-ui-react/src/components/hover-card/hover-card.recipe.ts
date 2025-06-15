import { hoverCardAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const hoverCardSlotRecipe = defineSlotRecipe({
  className: 'chakra-hover-card',
  slots: hoverCardAnatomy.keys(),
  base: {
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'sm',
      '--hovercard-bg': 'colors.bg.panel',
      bg: 'var(--hovercard-bg)',
      maxWidth: '80',
      '--hover-card-z-index': 'zIndex.layer-2',
      zIndex: 'calc(var(--hover-card-z-index) + var(--layer-index, 0))',
      transformOrigin: 'var(--transform-origin)',
      borderWidth: '1px',
      outline: '0',
      layerStyle: 'overlay',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'faster',
      },
    },
    arrow: {
      '--arrow-size': 'sizes.3',
      '--arrow-background': 'var(--hovercard-bg)',
    },
    arrowTip: {
      borderTopWidth: '0.5px',
      borderInlineStartWidth: '0.5px',
    },
  },

  variants: {
    size: {
      xs: {
        content: {
          padding: '3',
          borderRadius: 'panel.sm',
        },
      },
      sm: {
        content: {
          padding: '4',
          borderRadius: 'panel.md',
        },
      },
      md: {
        content: {
          padding: '5',
          borderRadius: 'panel.md',
        },
      },
      lg: {
        content: {
          padding: '6',
          borderRadius: 'panel.lg',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
