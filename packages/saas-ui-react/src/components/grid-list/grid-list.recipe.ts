import {
  type RecipeVariantProps,
  defineSlotRecipe,
} from '@chakra-ui/react/styled-system'

export const gridListSlotRecipe = defineSlotRecipe({
  className: 'sui-grid-list',
  slots: ['root', 'item', 'header', 'cell'],
  base: {
    root: {
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      userSelect: 'none',
      borderRadius: 'inherit',
      outline: 'none',
      _focusVisible: {
        boxShadow: 'outline',
      },
      _disabled: {
        cursor: 'disabled',
        opacity: 0.5,
        _hover: {
          bg: 'transparent',
          _dark: {
            bg: 'transparent',
          },
        },
        _active: {
          bg: 'transparent',
          _dark: {
            bg: 'transparent',
          },
        },
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      position: 'sticky',
      fontWeight: 'medium',
      color: 'fg.subtle',
    },
    cell: {
      flexShrink: 0,
    },
  },
  variants: {
    interactive: {
      true: {
        item: {
          cursor: 'button',
          transitionProperty: 'bg',
          transitionDuration: 'fast',
          _hover: {
            bg: 'bg.subtle',
          },
          _active: {
            bg: 'bg.subtle',
          },
        },
      },
    },
    variant: {
      simple: {},
      rounded: {
        item: {
          borderRadius: 'md',
          mb: 0.5,
        },
      },
    },
    size: {
      sm: {
        root: {
          textStyle: 'sm',
          py: 0.5,
        },
        item: {
          py: 1,
          px: 2,
          gap: 1,
        },
        header: {
          py: 0.5,
          px: 2,
        },
      },
      md: {
        root: {
          textStyle: 'md',
          py: 1,
        },
        item: {
          py: 2,
          px: 3,
          gap: 2,
        },
        header: {
          py: 1,
          px: 3,
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'rounded',
      size: 'sm',
      css: {
        root: {
          p: 1,
        },
      },
    },
    {
      variant: 'rounded',
      size: 'md',
      css: {
        root: {
          p: 2,
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'simple',
    size: 'md',
  },
})

export type GridListVariantProps = RecipeVariantProps<typeof gridListSlotRecipe>
