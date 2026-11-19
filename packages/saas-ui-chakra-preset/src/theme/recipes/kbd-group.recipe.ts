import {
  type RecipeVariantProps,
  defineRecipe,
} from '@chakra-ui/react/styled-system'

/** Lays out the keys of a keyboard shortcut, e.g. `⌘ K` or `G then I`. */
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
      },
    },
  },
  variants: {
    size: {
      xs: {
        fontSize: '2xs',
      },
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
    size: 'sm',
  },
})

export type KbdGroupVariantProps = RecipeVariantProps<typeof kbdGroupRecipe>
