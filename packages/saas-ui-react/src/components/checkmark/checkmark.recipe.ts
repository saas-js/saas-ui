import { defineRecipe } from '@chakra-ui/react/styled-system'

export const checkmarkRecipe = defineRecipe({
  className: 'chakra-checkmark',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    color: 'white',
    borderWidth: '1px',
    borderColor: 'transparent',
    borderRadius: 'control.md',
    focusVisibleRing: 'outside',
    _invalid: {
      colorPalette: 'red',
      borderColor: 'border.error',
    },
    _disabled: {
      opacity: '0.5',
    },
  },
  variants: {
    size: {
      xs: {
        boxSize: '3',
      },
      sm: {
        boxSize: '3.5',
      },
      md: {
        boxSize: '4',
        p: '0.5',
      },
      lg: {
        boxSize: '5',
        p: '0.5',
      },
    },

    variant: {
      solid: {
        borderColor: 'border.emphasized',
        '&:is([data-state=checked], [data-state=indeterminate])': {
          bg: 'colorPalette.solid',
          color: 'colorPalette.contrast',
          borderColor: 'colorPalette.solid',
        },
      },
      outline: {
        borderColor: 'border.emphasized',
        '&:is([data-state=checked], [data-state=indeterminate])': {
          color: 'colorPalette.fg',
          borderColor: 'colorPalette.solid',
        },
      },
      subtle: {
        bg: 'colorPalette.muted',
        borderColor: 'colorPalette.emphasized',
        '&:is([data-state=checked], [data-state=indeterminate])': {
          color: 'colorPalette.fg',
        },
      },
      plain: {
        '&:is([data-state=checked], [data-state=indeterminate])': {
          color: 'colorPalette.fg',
        },
      },
      inverted: {
        borderColor: 'border',
        color: 'colorPalette.fg',
        '&:is([data-state=checked], [data-state=indeterminate])': {
          borderColor: 'colorPalette.solid',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})
