import { fieldAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const fieldSlotRecipe = defineSlotRecipe({
  className: 'chakra-field',
  slots: fieldAnatomy.keys(),
  base: {
    requiredIndicator: {
      color: 'fg.error',
      lineHeight: '1',
    },
    root: {
      display: 'flex',
      width: '100%',
      position: 'relative',
      gap: '1.5',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'start',
      textStyle: 'sm',
      fontWeight: 'medium',
      gap: '1',
      userSelect: 'none',
      _disabled: {
        opacity: '0.5',
      },
    },
    errorText: {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 'medium',
      gap: '1',
      color: 'fg.error',
      textStyle: 'xs',
    },
    helperText: {
      color: 'fg.muted',
      textStyle: 'xs',
    },
  },

  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
      horizontal: {
        root: {
          display: 'grid',
          gridTemplateColumns: 'var(--field-label-width, 8rem) 1fr',
          alignItems: 'center',
          '&:has(textarea)': {
            alignItems: 'flex-start',
            '& label': {
              pt: 1.5,
            },
          },
        },
        helperText: {
          gridColumn: 2,
        },
        errorText: {
          gridColumn: 2,
        },
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
  },
})
