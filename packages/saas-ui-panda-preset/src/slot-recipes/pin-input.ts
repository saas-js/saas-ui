import { defineSlotRecipe } from '../def'

export const pinInputSlotRecipe = defineSlotRecipe({
  className: 'chakra-pin-input',
  slots: ['root', 'label', 'input', 'control'],
  base: {
    input: {
      width: 'var(--input-height)',
      minWidth: '0',
      outline: '0',
      position: 'relative',
      appearance: 'none',
      textAlign: 'center',
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
  },
  variants: {
    size: {
      xs: {
        input: {
          borderRadius: 'control.sm',
          textStyle: 'xs',
          px: 0,
          '--input-height': 'sizes.6',
        },
      },
      sm: {
        input: {
          borderRadius: 'control.md',
          textStyle: 'sm',
          px: 0,
          '--input-height': 'sizes.7',
        },
      },
      md: {
        input: {
          borderRadius: 'control.md',
          textStyle: 'sm',
          px: 0,
          '--input-height': 'sizes.8',
        },
      },
      lg: {
        input: {
          borderRadius: 'control.lg',
          textStyle: 'md',
          px: 0,
          '--input-height': 'sizes.10',
        },
      },
      xl: {
        input: {
          borderRadius: 'control.lg',
          textStyle: 'md',
          px: 0,
          '--input-height': 'sizes.12',
        },
      },
    },
    variant: {
      outline: {
        input: {
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
      },
      subtle: {
        input: {
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'bg.muted',
          focusVisibleRing: 'inside',
        },
      },
      flushed: {
        input: {
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
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
