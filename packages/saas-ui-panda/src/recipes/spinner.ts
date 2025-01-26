import { defineRecipe } from '../def'

export const spinnerRecipe = defineRecipe({
  className: 'spinner',
  jsx: ['Spinner', 'Button'],
  base: {
    display: 'inline-block',
    borderColor: 'currentColor',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: 'full',
    // width: 'var(--spinner-size)',
    // height: 'var(--spinner-size)',
    animation: 'spin',
    animationDuration: 'slowest',
    '--spinner-track-color': 'transparent',
    borderBottomColor: 'var(--spinner-track-color)',
    borderInlineStartColor: 'var(--spinner-track-color)',
  },
  variants: {
    size: {
      inherit: {
        boxSize: '1em',
      },
      xs: {
        boxSize: '3',
      },
      sm: {
        boxSize: '4',
      },
      md: {
        boxSize: '5',
      },
      lg: {
        boxSize: '8',
      },
      xl: {
        boxSize: '10',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
