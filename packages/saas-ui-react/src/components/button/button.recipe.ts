import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    flexShrink: '0',
    outline: '0',
    lineHeight: '1.2',
    isolation: 'isolate',
    fontWeight: 'medium',
    transitionProperty: 'common',
    transitionDuration: 'moderate',
    focusVisibleRing: 'outside',
    _disabled: {
      layerStyle: 'disabled',
    },
    _icon: {
      fontSize: '1em',
      flexShrink: 0,
    },
  },

  variants: {
    size: {
      xs: {
        gap: '1',
        h: '6',
        minW: '6',
        textStyle: 'xs',
        borderRadius: 'sm',
        px: '2',
      },
      sm: {
        gap: '2',
        h: '7',
        minW: '8',
        textStyle: 'sm',
        borderRadius: 'md',
        px: '3',
      },
      md: {
        gap: '2',
        h: '8',
        minW: '8',
        borderRadius: 'md',
        textStyle: 'sm',
        px: '4',
      },
      lg: {
        gap: '3',
        h: '10',
        minW: '10',
        borderRadius: 'lg',
        textStyle: 'md',
        px: '5',
      },
      xl: {
        gap: '3',
        h: '12',
        minW: '12',
        borderRadius: 'lg',
        textStyle: 'lg',
        px: '6',
      },
    },

    variant: {
      solid: {
        bg: 'colorPalette.solid',
        boxShadow: 'sm',
        color: 'colorPalette.contrast',
        _hover: {
          bg: 'colorPalette.solid/90',
        },
        _expanded: {
          bg: 'colorPalette.solid/90',
        },
      },

      subtle: {
        bg: 'colorPalette.muted',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle',
        },
        _expanded: {
          bg: 'colorPalette.subtle',
        },
      },

      glass: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
        '--btn-shadow': 'shadows.sm',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.4) inset, 0px 2px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow)',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        _after: {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'linear-gradient(180deg, white 40%, rgba(0,0,0,0.2))',
          opacity: 0.2,
          transitionProperty: 'opacity',
          transitionDuration: 'moderate',
          pointerEvents: 'none',
        },
        _hover: {
          bg: 'colorPalette.solid',
          _after: {
            opacity: 0.24,
          },
        },
        _expanded: {
          bg: 'colorPalette.solid',
          _after: {
            opacity: 0.24,
          },
        },
      },

      surface: {
        bg: 'colorPalette.surface',
        borderWidth: '0.5px',
        borderColor: 'colorPalette.emphasized',
        color: 'colorPalette.fg',
        shadow: 'sm',
        shadowColor: 'colorPalette.emphasized',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _expanded: {
          bg: 'colorPalette.muted',
        },
      },

      outline: {
        borderWidth: '0.5px',
        borderColor: 'colorPalette.emphasized',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _expanded: {
          bg: 'colorPalette.muted',
        },
      },

      ghost: {
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _expanded: {
          bg: 'colorPalette.muted',
        },
      },

      plain: {
        color: 'colorPalette.fg',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
    colorPalette: 'gray',
  },
})
