import {
  type RecipeVariantProps,
  defineRecipe,
} from '@chakra-ui/react/styled-system'

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
        borderRadius: 'control',
        fontSize: '0.9em',
        w: 'control.xs',
        h: 'control.xs',
      },
      md: {
        borderRadius: 'control',
        fontSize: '1.1em',
        w: 'control.md',
        h: 'control.md',
      },
      lg: {
        borderRadius: 'control',
        fontSize: '1.3em',
        w: 'control.lg',
        h: 'control.lg',
      },
      xl: {
        borderRadius: 'control',
        fontSize: '1.5em',
        w: 'control.xl',
        h: 'control.xl',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

export type IconBadgeVariantProps = RecipeVariantProps<typeof iconBadgeRecipe>
