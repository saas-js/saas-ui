import { alertAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const alertSlotRecipe = defineSlotRecipe({
  slots: alertAnatomy.keys(),
  className: 'chakra-alert',

  base: {
    root: {
      width: 'full',
      display: 'flex',
      alignItems: 'flex-start',
      position: 'relative',
    },
    title: {
      fontWeight: 'medium',
    },
    description: {
      display: 'inline',
    },
    indicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      width: '1em',
      height: '1em',
    },
    content: {
      display: 'flex',
      flex: '1',
      gap: '1',
    },
  },

  variants: {
    status: {
      info: {
        root: { colorPalette: 'blue' },
      },
      warning: {
        root: { colorPalette: 'orange' },
      },
      success: {
        root: { colorPalette: 'green' },
      },
      error: {
        root: { colorPalette: 'red' },
      },
      neutral: {
        root: { colorPalette: 'gray' },
      },
    },

    inline: {
      true: {
        content: {
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
      },
      false: {
        content: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },

    variant: {
      subtle: {
        root: {
          bg: 'colorPalette.subtle',
          color: 'colorPalette.fg',
        },
      },

      surface: {
        root: {
          bg: 'colorPalette.subtle',
          color: 'colorPalette.fg',
          shadow: 'inset 0 0 0px 1px var(--shadow-color)',
          shadowColor: 'colorPalette.solid',
        },
        indicator: {
          color: 'colorPalette.fg',
        },
      },

      outline: {
        root: {
          color: 'colorPalette.fg',
          shadow: 'inset 0 0 0px 1px var(--shadow-color)',
          shadowColor: 'colorPalette.subtle',
        },
        indicator: {
          color: 'colorPalette.fg',
        },
      },

      solid: {
        root: {
          bg: 'colorPalette.solid',
          color: 'colorPalette.contrast',
        },
        indicator: {
          color: 'colorPalette.contrast',
        },
      },
    },

    size: {
      sm: {
        root: {
          gap: '2',
          px: '3',
          py: '3',
          textStyle: 'xs',
          borderRadius: 'panel.sm',
        },
        indicator: {
          textStyle: 'lg',
        },
      },
      md: {
        root: {
          gap: '3',
          px: '4',
          py: '4',
          textStyle: 'sm',
          borderRadius: 'panel.md',
        },
        indicator: {
          textStyle: 'xl',
        },
      },
      lg: {
        root: {
          gap: '3',
          px: '4',
          py: '4',
          textStyle: 'md',
          borderRadius: 'panel.lg',
        },
        indicator: {
          textStyle: '2xl',
        },
      },
    },
  },

  defaultVariants: {
    status: 'info',
    variant: 'subtle',
    size: 'md',
    inline: false,
  },
})
