import { hoverCardAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

import { concentricRadius } from '../utils.ts'

export const hoverCardSlotRecipe = defineSlotRecipe({
  className: 'chakra-hover-card',
  slots: hoverCardAnatomy.keys(),
  base: {
    content: {
      layerStyle: 'overlay',
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
      outline: '0',
      '--hover-card-radius': 'radii.panel',
      '--hover-card-concentric-radius': concentricRadius(
        '--hover-card-radius',
        '--hover-card-padding',
      ),
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
          '--hover-card-padding': 'spacing.3',
          padding: 'var(--hover-card-padding)',
        },
      },
      sm: {
        content: {
          '--hover-card-padding': 'spacing.4',
          padding: 'var(--hover-card-padding)',
        },
      },
      md: {
        content: {
          '--hover-card-padding': 'spacing.5',
          padding: 'var(--hover-card-padding)',
        },
      },
      lg: {
        content: {
          '--hover-card-padding': 'spacing.6',
          padding: 'var(--hover-card-padding)',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
