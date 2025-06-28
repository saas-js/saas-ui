import { accordionAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const accordionSlotRecipe = defineSlotRecipe({
  className: 'chakra-accordion',
  slots: accordionAnatomy.keys(),
  base: {
    root: {
      width: 'full',
      '--accordion-radius': 'radii.panel.md',
    },
    item: {
      overflowAnchor: 'none',
    },
    itemTrigger: {
      display: 'flex',
      alignItems: 'center',
      width: 'full',
      outline: '0',
      gap: '3',
      fontWeight: 'medium',
      borderRadius: 'var(--accordion-radius)',
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
      },
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    itemBody: {
      pt: 'var(--accordion-padding-y)',
      pb: 'calc(var(--accordion-padding-y) * 2)',
    },
    itemContent: {
      overflow: 'hidden',
      borderRadius: 'var(--accordion-radius)',
      _open: {
        animationName: 'expand-height, fade-in',
        animationDuration: 'moderate',
      },
      _closed: {
        animationName: 'collapse-height, fade-out',
        animationDuration: 'moderate',
      },
    },
    itemIndicator: {
      ms: 'auto',
      transition: 'rotate 0.2s',
      transformOrigin: 'center',
      color: 'fg.subtle',
      _open: {
        rotate: '90deg',
      },
      _icon: {
        width: '1.2em',
        height: '1.2em',
      },
    },
  },

  variants: {
    variant: {
      outline: {
        item: {
          borderBottomWidth: '1px',
        },
      },

      subtle: {
        itemTrigger: {
          px: 'var(--accordion-padding-x)',
        },
        itemContent: {
          px: 'var(--accordion-padding-x)',
        },
        item: {
          borderRadius: 'var(--accordion-radius)',
          _open: {
            bg: 'colorPalette.subtle',
          },
        },
      },

      enclosed: {
        root: {
          borderWidth: '1px',
          borderRadius: 'var(--accordion-radius)',
          divideY: '1px',
          overflow: 'hidden',
        },
        itemTrigger: {
          px: 'var(--accordion-padding-x)',
        },
        itemContent: {
          px: 'var(--accordion-padding-x)',
        },
        item: {
          _open: {
            bg: 'bg.subtle',
          },
        },
      },

      plain: {},
    },

    size: {
      sm: {
        root: {
          '--accordion-padding-x': 'spacing.3',
          '--accordion-padding-y': 'spacing.2',
        },
        itemTrigger: {
          textStyle: 'sm',
          py: 'var(--accordion-padding-y)',
        },
        itemContent: {
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          '--accordion-padding-x': 'spacing.4',
          '--accordion-padding-y': 'spacing.2',
        },
        itemTrigger: {
          textStyle: 'md',
          py: 'var(--accordion-padding-y)',
        },
        itemContent: {
          textStyle: 'md',
        },
      },
      lg: {
        root: {
          '--accordion-padding-x': 'spacing.4.5',
          '--accordion-padding-y': 'spacing.2.5',
        },
        itemTrigger: {
          textStyle: 'lg',
          py: 'var(--accordion-padding-y)',
        },
        itemContent: {
          textStyle: 'lg',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
