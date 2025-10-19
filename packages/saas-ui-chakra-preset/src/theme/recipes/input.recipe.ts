import { defineRecipe } from '@chakra-ui/react/styled-system'

export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    width: '100%',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    _disabled: {
      layerStyle: 'disabled',
    },
    height: 'var(--input-height)',
    minW: 'var(--input-height)',
    '--focus-color': 'colors.colorPalette.focusRing',
    '--error-color': 'colors.border.error',
    _invalid: {
      focusRingColor: 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
  },

  variants: {
    size: {
      xs: {
        borderRadius: 'control.sm',
        textStyle: 'xs',
        px: '2',
        '--input-height': 'sizes.6',
      },
      sm: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '2.5',
        '--input-height': 'sizes.7',
      },
      md: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '3',
        '--input-height': 'sizes.8',
      },
      lg: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '4.5',
        '--input-height': 'sizes.10',
      },
      xl: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '6',
        '--input-height': 'sizes.12',
      },
    },

    variant: {
      outline: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'border',
        focusVisibleRing: 'inside',
        focusRingWidth: '0',
        _hover: {
          borderColor: 'border.emphasized',
          _focusVisible: {
            borderColor: 'var(--focus-ring-color)',
          },
        },
      },
      subtle: {
        borderWidth: '1px',
        borderColor: 'transparent',
        bg: 'bg.muted',
        focusVisibleRing: 'inside',
      },
      flushed: {
        bg: 'transparent',
        borderBottomWidth: '1px',
        borderBottomColor: 'border',
        borderRadius: '0',
        px: '0',
        _focusVisible: {
          borderColor: 'var(--focus-color)',
          boxShadow: '0px 1px 0px 0px var(--focus-color)',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
