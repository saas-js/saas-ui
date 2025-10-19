import { defineRecipe } from '@chakra-ui/react/styled-system'

export const headingRecipe = defineRecipe({
  className: 'chakra-heading',
  base: {
    fontFamily: 'heading',
    fontWeight: 'semibold',
  },
  variants: {
    size: {
      xs: {
        fontSize: 'xs',
        lineHeight: 'heading.xs',
        letterSpacing: 'heading.xs',
      },
      sm: {
        fontSize: 'sm',
        lineHeight: 'heading.sm',
        letterSpacing: 'heading.sm',
      },
      md: {
        fontSize: 'md',
        lineHeight: 'heading.md',
        letterSpacing: 'heading.md',
      },
      lg: {
        fontSize: 'lg',
        lineHeight: 'heading.lg',
        letterSpacing: 'heading.lg',
      },
      xl: {
        fontSize: 'xl',
        lineHeight: 'heading.xl',
        letterSpacing: 'heading.xl',
      },
      '2xl': {
        fontSize: '2xl',
        lineHeight: 'heading.2xl',
        letterSpacing: 'heading.2xl',
      },
      '3xl': {
        fontSize: '3xl',
        lineHeight: 'heading.3xl',
        letterSpacing: 'heading.3xl',
      },
      '4xl': {
        fontSize: '4xl',
        lineHeight: 'heading.4xl',
        letterSpacing: 'heading.4xl',
      },
      '5xl': {
        fontSize: '5xl',
        lineHeight: 'heading.5xl',
        letterSpacing: 'heading.5xl',
      },
      '6xl': {
        fontSize: '6xl',
        lineHeight: 'heading.6xl',
        letterSpacing: 'heading.6xl',
      },
      '7xl': {
        fontSize: '7xl',
        lineHeight: 'heading.7xl',
        letterSpacing: 'heading.7xl',
      },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
})
