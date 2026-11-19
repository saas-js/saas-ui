import { defineRecipe } from '../def'

export const kbdGroupRecipe = defineRecipe({
  className: 'sui-kbd-group',
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
