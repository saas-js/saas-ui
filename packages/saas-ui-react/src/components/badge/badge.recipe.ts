import { defineRecipe } from '@chakra-ui/react/styled-system'

export const badgeRecipe = defineRecipe({
  className: 'chakra-badge',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'full',
    gap: '1',
    fontWeight: 'medium',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  variants: {
    variant: {
      solid: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
      },
      subtle: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      },
      outline: {
        color: 'colorPalette.fg',
        shadow: 'inset 0 0 0px 1px var(--shadow-color)',
        shadowColor: 'colorPalette.subtle',
      },
      surface: {
        bg: 'colorPalette.muted/20',
        color: 'colorPalette.fg',
        shadow: 'inset 0 0 0px 1px var(--shadow-color)',
        shadowColor: 'colorPalette.subtle',
      },
      plain: {
        color: 'colorPalette.fg',
      },
    },
    size: {
      xs: {
        textStyle: '2xs',
        px: '1',
        minH: '4',
      },
      sm: {
        textStyle: 'xs',
        px: '1.5',
        minH: '5',
      },
      md: {
        textStyle: 'sm',
        px: '2',
        minH: '6',
      },
      lg: {
        textStyle: 'sm',
        px: '2.5',
        minH: '7',
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
  },
})
