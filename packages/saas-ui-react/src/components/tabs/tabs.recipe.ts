import { tabsAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  className: 'chakra-tabs',
  base: {
    root: {
      colorPalette: 'gray',
      '--tabs-trigger-radius': 'radii.control.md',
      position: 'relative',
      _horizontal: {
        display: 'block',
      },
      _vertical: {
        display: 'flex',
      },
    },
    list: {
      display: 'inline-flex',
      position: 'relative',
      isolation: 'isolate',
      '--tabs-indicator-shadow': 'shadows.xs',
      '--tabs-indicator-bg': 'colors.bg',
      minH: 'var(--tabs-height)',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
    },
    trigger: {
      outline: '0',
      minW: 'var(--tabs-height)',
      height: 'var(--tabs-height)',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'medium',
      position: 'relative',
      cursor: 'button',
      gap: '2',
      _focusVisible: {
        zIndex: 1,
        focusVisibleRing: 'outside',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    content: {
      focusVisibleRing: 'inside',
      _horizontal: {
        width: '100%',
        pt: 'var(--tabs-content-padding)',
      },
      _vertical: {
        height: '100%',
        ps: 'var(--tabs-content-padding)',
      },
    },
    indicator: {
      width: 'var(--width)',
      height: 'var(--height)',
      borderRadius: 'var(--tabs-indicator-radius)',
      bg: 'var(--tabs-indicator-bg)',
      shadow: 'var(--tabs-indicator-shadow)',
      zIndex: -1,
    },
  },

  variants: {
    fitted: {
      true: {
        list: {
          display: 'flex',
        },
        trigger: {
          flex: 1,
          textAlign: 'center',
          justifyContent: 'center',
        },
      },
    },

    justify: {
      start: {
        list: {
          justifyContent: 'flex-start',
        },
      },
      center: {
        list: {
          justifyContent: 'center',
        },
      },
      end: {
        list: {
          justifyContent: 'flex-end',
        },
      },
    },

    size: {
      xs: {
        root: {
          '--tabs-height': 'sizes.6',
          '--tabs-content-padding': 'spacing.2',
          '--tabs-trigger-radius': 'radii.control.sm',
        },
        trigger: {
          py: '1',
          px: '2',
          textStyle: 'xs',
        },
      },
      sm: {
        root: {
          '--tabs-height': 'sizes.7',
          '--tabs-content-padding': 'spacing.3',
          '--tabs-trigger-radius': 'radii.control.md',
        },
        trigger: {
          py: '1',
          px: '3',
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          '--tabs-height': 'sizes.8',
          '--tabs-content-padding': 'spacing.4',
          '--tabs-trigger-radius': 'radii.control.md',
        },
        trigger: {
          py: '2',
          px: '4',
          textStyle: 'sm',
        },
      },
      lg: {
        root: {
          '--tabs-height': 'sizes.10',
          '--tabs-content-padding': 'spacing.4.5',
          '--tabs-trigger-radius': 'radii.control.lg',
        },
        trigger: {
          py: '2',
          px: '4.5',
          textStyle: 'md',
        },
      },
    },

    variant: {
      line: {
        list: {
          display: 'flex',
          borderColor: 'border',
          _horizontal: {
            borderBottomWidth: '1px',
          },
          _vertical: {
            borderEndWidth: '1px',
          },
        },
        trigger: {
          color: 'fg.muted',
          _hover: {
            color: 'fg.subtle',
          },
          _disabled: {
            _active: { bg: 'initial' },
          },
          _selected: {
            color: 'fg',
            _horizontal: {
              layerStyle: 'indicator.bottom',
              borderTopRadius: '3px',
              '--indicator-offset-x': 'spacing.3',
              '--indicator-offset-y': '-1px',
              '--indicator-color': 'colors.colorPalette.solid',
            },
            _vertical: {
              layerStyle: 'indicator.end',
              '--indicator-offset-x': '-1px',
            },
          },
        },
      },

      pills: {
        list: {
          gap: 2,
        },
        trigger: {
          borderRadius: 'var(--tabs-trigger-radius)',
          color: 'fg.muted',
          borderWidth: '1px',
          borderColor: 'border.emphasized',
          _hover: {
            bg: 'bg.muted',
            color: 'fg.subtle',
          },
          _selected: {
            bg: 'colorPalette.subtle',
            color: 'colorPalette.fg',
            borderColor: 'colorPalette.solid/40',
            _hover: {
              bg: 'colorPalette.subtle',
              color: 'colorPalette.fg',
            },
          },
        },
      },

      ghost: {
        list: {
          gap: 2,
        },
        trigger: {
          borderRadius: 'var(--tabs-trigger-radius)',
          color: 'fg.subtle',
          _hover: {
            bg: 'colorPalette.muted',
            color: 'colorPalette.fg',
          },
          _selected: {
            bg: 'colorPalette.subtle',
            color: 'colorPalette.fg',
            _hover: {
              bg: 'colorPalette.subtle',
              color: 'colorPalette.fg',
            },
          },
        },
      },

      enclosed: {
        list: {
          bg: 'bg.muted',
          boxShadow: 'inset',
          borderRadius: 'md',
          borderWidth: '1px',
          minH: 'calc(var(--tabs-height) - 4px)',
        },
        trigger: {
          justifyContent: 'center',
          color: 'fg.muted',
          borderRadius: 'calc({radii.md} - 1px)',
          _hover: {
            color: 'fg.subtle',
          },
          _selected: {
            bg: 'bg',
            color: 'colorPalette.fg',
            shadow: 'sm',
          },
        },
      },

      outline: {
        list: {
          '--line-thickness': '1px',
          '--line-offset': 'calc(var(--line-thickness) * -1)',
          borderColor: 'border',
          display: 'flex',
          _horizontal: {
            _before: {
              content: '""',
              position: 'absolute',
              bottom: '0px',
              width: '100%',
              borderBottomWidth: 'var(--line-thickness)',
              borderBottomColor: 'border',
            },
          },
          _vertical: {
            _before: {
              content: '""',
              position: 'absolute',
              insetInline: 'var(--line-offset)',
              height: 'calc(100% - calc(var(--line-thickness) * 2))',
              borderEndWidth: 'var(--line-thickness)',
              borderEndColor: 'border',
            },
          },
        },
        trigger: {
          color: 'fg.muted',
          borderWidth: '1px',
          borderColor: 'transparent',
          _hover: {
            color: 'fg.subtle',
          },
          _selected: {
            bg: 'currentBg',
            color: 'colorPalette.fg',
          },
          _horizontal: {
            borderTopRadius: 'var(--tabs-trigger-radius)',
            marginBottom: 'var(--line-offset)',
            marginEnd: { _notLast: 'var(--line-offset)' },
            _selected: {
              borderColor: 'border',
              borderBottomColor: 'transparent',
            },
          },
          _vertical: {
            borderStartRadius: 'var(--tabs-trigger-radius)',
            marginEnd: 'var(--line-offset)',
            marginBottom: { _notLast: 'var(--line-offset)' },
            _selected: {
              borderColor: 'border',
              borderEndColor: 'transparent',
            },
          },
        },
      },

      plain: {
        trigger: {
          color: 'fg.muted',
          _selected: {
            color: 'colorPalette.fg',
          },
          borderRadius: 'var(--tabs-trigger-radius)',
          '&[data-selected][data-ssr]': {
            bg: 'var(--tabs-indicator-bg)',
            shadow: 'var(--tabs-indicator-shadow)',
            borderRadius: 'var(--tabs-indicator-radius)',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
})
