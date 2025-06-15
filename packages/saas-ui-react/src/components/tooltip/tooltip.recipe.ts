import { tooltipAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: tooltipAnatomy.keys(),
  className: 'chakra-tooltip',
  base: {
    content: {
      '--tooltip-bg': 'colors.bg',
      display: 'flex',
      alignItems: 'center',
      bg: 'var(--tooltip-bg)',
      color: 'fg',
      px: '2.5',
      py: '1',
      borderRadius: 'panel.sm',
      fontWeight: 'medium',
      textStyle: 'xs',
      boxShadow: 'md',
      maxW: 'xs',
      zIndex: 'tooltip',
      transformOrigin: 'var(--transform-origin)',
      _open: {
        animationStyle: 'scale-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'scale-fade-out',
        animationDuration: 'fast',
      },
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': 'var(--tooltip-bg)',
      zIndex: '-1',
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderInlineStartWidth: '1px',
      borderColor: 'var(--tooltip-bg)',
    },
  },
  variants: {
    variant: {
      inverted: {
        content: {
          '--tooltip-bg': 'colors.bg.inverted',
          color: 'fg.inverted',
        },
      },
    },
  },
})
