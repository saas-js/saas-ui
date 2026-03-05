import {
  type RecipeVariantProps,
  defineRecipe,
} from '@chakra-ui/react/styled-system'

export const commandRecipe = defineRecipe({
  className: 'sui-command',
  base: {
    colorPalette: 'gray',
    display: 'inline-flex',
    gap: 1,
    color: 'fg.muted',
    '[role=tooltip] > &': {
      ms: 1,
      _before: {
        content: '"•"',
        me: 1,
        fontSize: 'xs',
      },
    },
  },
  variants: {
    size: {
      xs: {
        fontSize: 'xs',
      },
      sm: {
        fontSize: 'sm',
      },
      md: {
        fontSize: 'md',
      },
      lg: {
        fontSize: 'lg',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export type CommandVariantProps = RecipeVariantProps<typeof commandRecipe>
