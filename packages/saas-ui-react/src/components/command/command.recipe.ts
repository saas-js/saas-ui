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
      sm: {
        fontSize: 'xs',
      },
      md: {
        fontSize: 'sm',
      },
      lg: {
        fontSize: 'md',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type CommandVariantProps = RecipeVariantProps<typeof commandRecipe>
