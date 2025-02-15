import { defineSlotRecipe } from '../def'

export const numberInputSlotRecipe = defineSlotRecipe({
  className: 'chakra-number-input',
  slots: [
    'root',
    'label',
    'input',
    'control',
    'valueText',
    'incrementTrigger',
    'decrementTrigger',
    'scrubber',
  ],
  base: {
    root: {
      position: 'relative',
      zIndex: '0',
      isolation: 'isolate',
      width: 'full',
    },
    input: {
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
      verticalAlign: 'top',
      pe: 'calc(var(--stepper-width) + 0.5rem)',
    },
    control: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '0',
      insetEnd: '0px',
      margin: '1px',
      width: 'var(--stepper-width)',
      height: 'calc(100% - 2px)',
      zIndex: '1',
      borderStartWidth: '1px',
      divideY: '1px',
    },
    incrementTrigger: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1',
      userSelect: 'none',
      cursor: 'button',
      lineHeight: '1',
      color: 'fg.muted',
      '--stepper-base-radius': 'radii.xs',
      '--stepper-radius': 'calc(var(--stepper-base-radius) + 1px)',
      _icon: {
        boxSize: '1em',
      },
      _disabled: {
        opacity: '0.5',
      },
      _hover: {
        bg: 'bg.muted',
      },
      _active: {
        bg: 'bg.emphasized',
      },
      borderTopEndRadius: 'var(--stepper-radius)',
    },
    decrementTrigger: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1',
      userSelect: 'none',
      cursor: 'button',
      lineHeight: '1',
      color: 'fg.muted',
      '--stepper-base-radius': 'radii.xs',
      '--stepper-radius': 'calc(var(--stepper-base-radius) + 1px)',
      _icon: {
        boxSize: '1em',
      },
      _disabled: {
        opacity: '0.5',
      },
      _hover: {
        bg: 'bg.muted',
      },
      _active: {
        bg: 'bg.emphasized',
      },
      borderBottomEndRadius: 'var(--stepper-radius)',
    },
    valueText: {
      fontWeight: 'medium',
      fontFeatureSettings: 'pnum',
      fontVariantNumeric: 'proportional-nums',
    },
  },
  variants: {
    size: {
      xs: {
        input: {
          borderRadius: 'control.sm',
          textStyle: 'xs',
          px: '2',
          '--input-height': 'sizes.6',
        },
        control: {
          fontSize: '2xs',
          '--stepper-width': 'sizes.4',
        },
      },
      sm: {
        input: {
          borderRadius: 'control.md',
          textStyle: 'sm',
          px: '2.5',
          '--input-height': 'sizes.7',
        },
        control: {
          fontSize: 'xs',
          '--stepper-width': 'sizes.5',
        },
      },
      md: {
        input: {
          borderRadius: 'control.md',
          textStyle: 'sm',
          px: '3',
          '--input-height': 'sizes.8',
        },
        control: {
          fontSize: 'sm',
          '--stepper-width': 'sizes.6',
        },
      },
      lg: {
        input: {
          borderRadius: 'control.lg',
          textStyle: 'md',
          px: '4.5',
          '--input-height': 'sizes.10',
        },
        control: {
          fontSize: 'sm',
          '--stepper-width': 'sizes.6',
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
