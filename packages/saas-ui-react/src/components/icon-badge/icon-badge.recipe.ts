import { defineRecipe } from '@chakra-ui/react/styled-system'

export const iconBadgeRecipe = defineRecipe({
  className: 'sui-icon-badge',
  base: {
    colorPalette: 'gray',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    variant: {
      outline: {
        borderWidth: '1px',
        borderColor: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
      solid: {
        bg: 'colorPalette.solid',
        color: 'white',
      },
      subtle: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
    },
    size: {
      sm: {
        borderRadius: 'sm',
        fontSize: '0.9em',
        w: 6,
        h: 6,
      },
      md: {
        borderRadius: 'md',
        fontSize: '1.1em',
        w: 8,
        h: 8,
      },
      lg: {
        borderRadius: 'md',
        fontSize: '1.3em',
        w: 10,
        h: 10,
      },
      xl: {
        borderRadius: 'md',
        fontSize: '1.5em',
        w: 12,
        h: 12,
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})
