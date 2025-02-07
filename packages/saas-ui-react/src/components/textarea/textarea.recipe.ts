import { defineRecipe } from '@chakra-ui/react'

export const textareaRecipe = defineRecipe({
  className: 'chakra-textarea',
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
        py: '1',
        scrollPaddingBottom: '1',
      },
      sm: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '2.5',
        py: '1.5',
        scrollPaddingBottom: '1.5',
      },
      md: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '3',
        py: '1.5',
        scrollPaddingBottom: '1.5',
      },
      lg: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '4',
        py: '2',
        scrollPaddingBottom: '2',
      },
      xl: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '4.5',
        py: '3.5',
        scrollPaddingBottom: '3.5',
      },
    },

    variant: {
      outline: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'border',
        focusVisibleRing: 'inside',
        focusRingWidth: 0,
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
