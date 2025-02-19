import { tagAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

import { badgeRecipe } from '../badge/badge.recipe'

const badgeVariant = badgeRecipe.variants?.variant

export const tagSlotRecipe = defineSlotRecipe({
  slots: tagAnatomy.keys(),
  className: 'chakra-tag',
  base: {
    root: {
      colorPalette: 'neutral',
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      maxWidth: '100%',
      userSelect: 'none',
      borderRadius: 'full',
      focusVisibleRing: 'outside',
    },
    label: {
      lineClamp: '1',
    },
    closeTrigger: {
      cursor: 'button',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: '0',
      borderRadius: 'full',
      color: 'currentColor',
      opacity: 0.8,
      padding: '1px',
      focusVisibleRing: 'inside',
      focusRingWidth: '2px',
      _hover: {
        opacity: 1,
        bg: 'colorPalette.subtle',
      },
      _after: {
        content: '""',
        position: 'absolute',
        boxSize: '24px',
        borderRadius: 'full',
      },
    },
    startElement: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxSize: 'var(--tag-element-size)',
      _icon: { boxSize: '80% !important' },
      '&:has([data-scope=avatar])': {
        boxSize: 'var(--tag-avatar-size)',
        ms: 'var(--tag-element-offset)',
      },
      '&:has([class*="status__root"])': {
        width: 'var(--tag-status-size)',
      },
    },
    endElement: {
      flexShrink: 0,
      boxSize: 'var(--tag-element-size)',
      _icon: { boxSize: '100%' },
      '&:has(button)': {
        me: 'var(--tag-element-offset)',
      },
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          px: '1.5',
          minH: '5',
          gap: '1',
          '--tag-avatar-size': 'spacing.3.5',
          '--tag-status-size': 'spacing.2',
          '--tag-element-size': 'spacing.3.5',
          '--tag-element-offset': 'spacing.-0.5',
        },
        label: {
          textStyle: 'xs',
        },
      },
      md: {
        root: {
          px: '2',
          minH: '6',
          gap: '1',
          '--tag-avatar-size': 'spacing.4',
          '--tag-status-size': 'spacing.2',
          '--tag-element-size': 'spacing.4',
          '--tag-element-offset': 'spacing.-1',
        },
        label: {
          textStyle: 'xs',
        },
      },
      lg: {
        root: {
          px: '2.5',
          minH: '7',
          gap: '1',
          '--tag-avatar-size': 'spacing.5',
          '--tag-status-size': 'spacing.2',
          '--tag-element-size': 'spacing.5',
          '--tag-element-offset': 'spacing.-1.5',
        },
        label: {
          textStyle: 'sm',
        },
        closeTrigger: {
          padding: '2px',
        },
      },
      xl: {
        root: {
          px: '3',
          minH: '8',
          gap: '1.5',
          '--tag-avatar-size': 'spacing.6',
          '--tag-status-size': 'spacing.2',
          '--tag-element-size': 'spacing.6',
          '--tag-element-offset': 'spacing.-2',
        },
        label: {
          textStyle: 'md',
        },
        closeTrigger: {
          padding: '3px',
        },
      },
    },

    variant: {
      subtle: {
        root: badgeVariant?.subtle,
      },
      solid: {
        root: badgeVariant?.solid,
      },
      outline: {
        root: badgeVariant?.outline,
      },
      surface: {
        root: badgeVariant?.surface,
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})
