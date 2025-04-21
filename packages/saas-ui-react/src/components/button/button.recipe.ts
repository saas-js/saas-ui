import { defineRecipe } from '@chakra-ui/react/styled-system'

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    colorPalette: 'gray',
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
        borderRadius: 'control.sm',
        px: '2',
      },
      sm: {
        gap: '2',
        h: '7',
        minW: '7',
        textStyle: 'sm',
        borderRadius: 'control.md',
        px: '2.5',
      },
      md: {
        gap: '2',
        h: '8',
        minW: '8',
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '3',
      },
      lg: {
        gap: '3',
        h: '10',
        minW: '10',
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '4.5',
      },
      xl: {
        gap: '3',
        h: '12',
        minW: '12',
        borderRadius: 'control.lg',
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
        _popupExpanded: {
          bg: 'colorPalette.solid/90',
        },
      },

      subtle: {
        bg: 'colorPalette.muted',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle',
        },
        _popupExpanded: {
          bg: 'colorPalette.subtle',
        },
      },

      glass: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
        '--btn-shadow': 'shadows.sm',
        boxShadow: {
          base: '0 0 0 1px rgba(0,0,0,0.25) inset, 0px 2px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow)',
          _dark:
            ' 0px 1px 0px 0px rgba(255,255,255,0.2) inset, var(--btn-shadow)',
        },
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        overflow: 'clip',
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
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.8) 40%, rgba(0,0,0,0.6))',
          },
        },
        _popupExpanded: {
          bg: 'colorPalette.solid',
          _after: {
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.8) 40%, rgba(0,0,0,0.6))',
          },
        },
      },

      surface: {
        bg: 'colorPalette.muted/20',
        borderWidth: '1px',
        borderColor: 'colorPalette.emphasized/90',
        color: 'colorPalette.fg',
        shadow: 'xs',
        _hover: {
          bg: 'colorPalette.muted',
          borderColor: 'colorPalette.emphasized',
        },
        _popupExpanded: {
          bg: 'colorPalette.muted',
          borderColor: 'colorPalette.emphasized',
        },
      },

      outline: {
        borderWidth: '0.5px',
        borderColor: 'colorPalette.emphasized',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _popupExpanded: {
          bg: 'colorPalette.muted',
        },
      },

      ghost: {
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle',
        },
        _popupExpanded: {
          bg: 'colorPalette.subtle',
        },
      },

      plain: {
        color: 'colorPalette.fg',
      },
    },
  },

  compoundVariants: [
    {
      variant: 'plain',
      css: {
        px: 0,
      },
    },
  ],

  defaultVariants: {
    size: 'md',
    variant: 'surface',
    colorPalette: 'gray',
  },
})
