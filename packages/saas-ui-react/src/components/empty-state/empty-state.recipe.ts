import { emptyStateAnatomy } from '@chakra-ui/react/anatomy'
import { defineSlotRecipe } from '@chakra-ui/react/styled-system'

export const emptyStateSlotRecipe = defineSlotRecipe({
  slots: emptyStateAnatomy.extendWith('actions').keys(),
  className: 'chakra-empty-state',
  base: {
    root: {
      colorPalette: 'accent',
      width: 'full',
      height: 'full',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'colorPalette.solid',
      _icon: {
        boxSize: '1em',
      },
    },
    title: {
      fontWeight: 'semibold',
    },
    description: {
      textStyle: 'sm',
      color: 'fg.muted',
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2',
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          px: '4',
          py: '6',
        },
        indicator: {
          textStyle: '3xl',
          mb: '2',
        },
        title: {
          textStyle: 'md',
        },
        description: {
          textStyle: 'xs',
        },
        content: {
          textStyle: 'xs',
        },

        actions: {
          mt: '2',
        },
      },
      md: {
        root: {
          px: '8',
          py: '12',
        },
        indicator: {
          textStyle: '4xl',
          mb: '3',
        },
        title: {
          textStyle: 'lg',
        },
        description: {
          textStyle: 'sm',
        },
        content: {
          textStyle: 'sm',
        },
        actions: {
          mt: '3',
        },
      },
      lg: {
        root: {
          px: '12',
          py: '16',
        },
        indicator: {
          textStyle: '6xl',
          mb: '4',
        },
        title: {
          textStyle: 'xl',
        },
        description: {
          textStyle: 'md',
        },
        content: {
          textStyle: 'md',
        },
        actions: {
          mt: '4',
        },
      },
    },
    align: {
      start: {
        content: {
          alignItems: 'flex-start',
        },
      },
      center: {
        content: {
          alignItems: 'center',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    align: 'center',
  },
})
