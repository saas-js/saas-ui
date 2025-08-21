import { progressAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const progressCircleSlotRecipe = defineSlotRecipe({
  className: 'chakra-progress-circle',
  slots: progressAnatomy.keys(),
  base: {
    root: {
      display: 'inline-flex',
      textStyle: 'sm',
      position: 'relative',
    },
    circle: {
      _indeterminate: {
        animation: 'spin 2s linear infinite',
      },
    },
    circleTrack: {
      '--track-color': 'colors.colorPalette.muted',
      stroke: 'var(--track-color)',
    },
    circleRange: {
      stroke: 'colorPalette.solid',
      transitionProperty: 'stroke-dasharray',
      transitionDuration: '0.6s',
      _indeterminate: {
        animation: 'circular-progress 1.5s linear infinite',
      },
    },
    label: {
      display: 'inline-flex',
    },
    valueText: {
      lineHeight: '1',
      fontWeight: 'medium',
      letterSpacing: 'tight',
      fontVariantNumeric: 'tabular-nums',
    },
  },

  variants: {
    size: {
      xs: {
        circle: {
          '--size': 'sizes.4',
          '--thickness': '3px',
        },
        valueText: {
          textStyle: '2xs',
        },
      },
      sm: {
        circle: {
          '--size': 'sizes.6',
          '--thickness': '5px',
        },
        valueText: {
          textStyle: '2xs',
        },
      },
      md: {
        circle: {
          '--size': 'sizes.10',
          '--thickness': '6px',
        },
        valueText: {
          textStyle: 'xs',
        },
      },
      lg: {
        circle: {
          '--size': 'sizes.14',
          '--thickness': '7px',
        },
        valueText: {
          textStyle: 'sm',
        },
      },
      xl: {
        circle: {
          '--size': 'sizes.16',
          '--thickness': '8px',
        },
        valueText: {
          textStyle: 'sm',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
