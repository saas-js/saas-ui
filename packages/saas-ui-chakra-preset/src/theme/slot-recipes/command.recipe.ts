import { commandAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

/**
 * Chakra's `Command` palette (input + filtered list), styled to match the
 * Saas UI menu and listbox. Keyboard shortcuts use the `suiKbdGroup` recipe.
 */
export const commandSlotRecipe = defineSlotRecipe({
  className: 'chakra-command',
  slots: commandAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: 'full',
      minH: '0',
      outline: 0,
      bg: 'bg.panel',
      color: 'fg',
      borderRadius: 'panel',
      overflow: 'hidden',
      textStyle: 'sm',
    },
    label: {
      srOnly: true,
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: 'var(--command-control-padding-x)',
      borderBottomWidth: '1px',
      borderColor: 'border',
      flexShrink: 0,
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'fg.subtle',
      flexShrink: 0,
      _icon: {
        boxSize: 'var(--command-indicator-size)',
      },
    },
    input: {
      flex: '1',
      width: 'full',
      minW: '0',
      h: 'var(--command-input-height)',
      bg: 'transparent',
      outline: '0',
      _placeholder: {
        color: 'fg.subtle',
      },
    },
    clearTrigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxSize: 'control.xs',
      borderRadius: 'control.sm',
      color: 'fg.subtle',
      cursor: 'button',
      focusVisibleRing: 'inside',
      focusRingWidth: '2px',
      _hover: {
        bg: 'interaction.hover',
        color: 'fg',
      },
      _icon: {
        boxSize: '3.5',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      outline: '0',
      scrollbar: 'thin',
      p: 'var(--command-list-padding)',
      scrollPaddingBlock: 'var(--command-list-padding)',
      '& > *': {
        flexShrink: 0,
      },
    },
    item: {
      position: 'relative',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--command-item-gap)',
      flexShrink: 0,
      cursor: 'option',
      textAlign: 'start',
      borderRadius: 'control',
      minH: 'var(--command-item-height)',
      px: 'var(--command-item-padding-x)',
      _highlighted: {
        bg: 'bg.emphasized',
      },
      _disabled: {
        layerStyle: 'disabled',
      },
      _icon: {
        boxSize: 'var(--command-indicator-size)',
        flexShrink: 0,
        color: 'fg.subtle',
      },
    },
    itemText: {
      flex: '1',
      minW: '0',
      truncate: true,
      '& mark': {
        bg: 'transparent',
        color: 'inherit',
        fontWeight: 'semibold',
      },
    },
    // Matches the menu's shortcut hint rather than a boxed keycap.
    itemCommand: {
      flexShrink: 0,
      ms: 'auto',
      ps: '4',
      opacity: '0.6',
      textStyle: 'xs',
      letterSpacing: 'widest',
      whiteSpace: 'nowrap',
      '& + &': {
        ms: 'calc({spacing.1} - var(--command-item-gap))',
        ps: '0',
      },
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column',
      '& + &': {
        mt: '1.5',
      },
    },
    itemGroupLabel: {
      display: 'flex',
      alignItems: 'center',
      minH: 'var(--command-item-height)',
      px: 'var(--command-item-padding-x)',
      textStyle: 'xs',
      fontWeight: 'medium',
      color: 'fg.subtle',
      userSelect: 'none',
    },
    empty: {
      py: '10',
      px: '4',
      textAlign: 'center',
      color: 'fg.muted',
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2',
      py: '10',
      px: '4',
      color: 'fg.muted',
    },
    separator: {
      flexShrink: 0,
      height: '1px',
      bg: 'border.muted',
      my: '1',
      mx: 'calc(var(--command-list-padding) * -1)',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4',
      borderTopWidth: '1px',
      borderColor: 'border',
      bg: 'bg.inset',
      px: 'var(--command-control-padding-x)',
      py: '2',
      textStyle: 'xs',
      color: 'fg.muted',
      flexShrink: 0,
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          '--command-control-padding-x': 'spacing.3',
          '--command-input-height': 'sizes.control.lg',
          '--command-indicator-size': 'sizes.4',
          '--command-list-padding': 'spacing.1',
          '--command-item-height': 'sizes.control.xs',
          '--command-item-padding-x': 'spacing.1.5',
          '--command-item-gap': 'spacing.1.5',
          textStyle: 'xs',
        },
        input: {
          textStyle: 'sm',
        },
        list: {
          maxH: '72',
        },
      },
      md: {
        root: {
          '--command-control-padding-x': 'spacing.3',
          '--command-input-height': 'sizes.control.xl',
          '--command-indicator-size': 'sizes.4',
          '--command-list-padding': 'spacing.1',
          '--command-item-height': 'sizes.control.sm',
          '--command-item-padding-x': 'spacing.2',
          '--command-item-gap': 'spacing.2',
        },
        input: {
          textStyle: 'sm',
        },
        list: {
          maxH: '96',
        },
      },
      lg: {
        root: {
          '--command-control-padding-x': 'spacing.4',
          '--command-input-height': 'sizes.14',
          '--command-indicator-size': 'sizes.5',
          '--command-list-padding': 'spacing.1.5',
          '--command-item-height': 'sizes.control.md',
          '--command-item-padding-x': 'spacing.2.5',
          '--command-item-gap': 'spacing.2.5',
        },
        control: {
          gap: '3',
        },
        input: {
          textStyle: 'md',
        },
        list: {
          maxH: 'md',
        },
        footer: {
          py: '2.5',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
