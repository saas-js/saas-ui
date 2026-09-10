import {
  defineRecipe,
  type RecipeVariantProps,
} from '@chakra-ui/react/styled-system'

export const kbdRecipe = defineRecipe({
  className: 'chakra-kbd',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 'medium',
    fontFamily: 'body',
    flexShrink: '0',
    whiteSpace: 'nowrap',
    wordSpacing: '-0.5em',
    userSelect: 'none',
    px: '1',
    borderRadius: 'indicator.md',
  },

  variants: {
    variant: {
      raised: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
        borderWidth: '1px',
        borderBottomWidth: '2px',
        borderColor: 'colorPalette.muted',
      },
      outline: {
        borderWidth: '1px',
        color: 'colorPalette.fg',
      },
      subtle: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
      plain: {
        color: 'colorPalette.fg',
      },
    },

    size: {
      xs: {
        textStyle: '2xs',
        height: '3.75',
      },
      sm: {
        textStyle: 'xs',
        height: '4',
      },
      md: {
        textStyle: 'sm',
        height: '4.5',
      },
      lg: {
        textStyle: 'sm',
        height: '5',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'subtle',
  },
})

export type KbdVariantProps = RecipeVariantProps<typeof kbdRecipe>
