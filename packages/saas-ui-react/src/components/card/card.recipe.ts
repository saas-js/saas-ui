import { cardAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const cardSlotRecipe = defineSlotRecipe({
  className: 'chakra-card',
  slots: cardAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: '0',
      wordWrap: 'break-word',
      borderRadius: 'lg',
      color: 'fg',
      textAlign: 'start',
    },
    title: {
      fontWeight: 'semibold',
    },
    description: {
      color: 'fg.muted',
      fontSize: 'sm',
    },
    header: {
      padding: 'var(--card-padding)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    body: {
      padding: 'var(--card-padding)',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      '&:is(.chakra-card__header + &)': {
        paddingTop: 0,
      },
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      padding: 'var(--card-padding)',
      paddingTop: 0,
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          '--card-padding': 'spacing.2.5',
        },
        title: {
          fontSize: 'sm',
        },
      },
      md: {
        root: {
          '--card-padding': 'spacing.4',
        },
        title: {
          fontSize: 'md',
        },
      },
      lg: {
        root: {
          '--card-padding': 'spacing.6',
        },
        title: {
          fontSize: 'lg',
        },
      },
    },

    variant: {
      elevated: {
        root: {
          bg: 'bg.panel',
          boxShadow: 'md',
          borderWidth: '0.5px',
          borderColor: 'border',
          _pressable: {
            transitionProperty: 'common',
            transitionDuration: 'fast',
            _hover: {
              borderColor: 'border.emphasized',
            },
          },
        },
      },
      outline: {
        root: {
          bg: 'bg.panel',
          borderWidth: '1px',
          borderColor: 'border',
          _pressable: {
            transitionProperty: 'common',
            transitionDuration: 'fast',
            _hover: {
              borderColor: 'border.emphasized',
            },
          },
        },
      },
      subtle: {
        root: {
          bg: 'colorPalette.muted',
        },
      },
      solid: {
        root: {
          bg: 'colorPalette.solid',
          color: 'colorPalette.contrast',
          _pressable: {
            _hover: {
              bg: 'colorPalette.solid/80',
            },
          },
        },
        description: {
          color: 'colorPalette.contrast/80',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})
