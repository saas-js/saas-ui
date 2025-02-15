import { defineRecipe } from '../def'

export const inputAddonRecipe = defineRecipe({
  className: 'chakra-input-addon',
  base: {
    flex: '0 0 auto',
    width: 'auto',
    height: 'var(--input-height)',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  variants: {
    size: {
      xs: {
        borderRadius: 'control.sm',
        textStyle: 'xs',
        px: '2',
        '--input-height': 'sizes.6',
      },
      sm: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '2.5',
        '--input-height': 'sizes.7',
      },
      md: {
        borderRadius: 'control.md',
        textStyle: 'sm',
        px: '3',
        '--input-height': 'sizes.8',
      },
      lg: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '4.5',
        '--input-height': 'sizes.10',
      },
      xl: {
        borderRadius: 'control.lg',
        textStyle: 'md',
        px: '6',
        '--input-height': 'sizes.12',
      },
    },
    variant: {
      outline: {
        border: '1px solid',
        borderColor: 'border',
        bg: 'bg.muted',
      },
      subtle: {
        border: '2px solid',
        borderColor: 'transparent',
        bg: {
          _light: 'gray.100',
          _dark: 'whiteAlpha.50',
        },
      },
      flushed: {
        borderBottom: '1px solid',
        borderColor: 'inherit',
        borderRadius: '0',
        px: '0',
        bg: 'transparent',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
