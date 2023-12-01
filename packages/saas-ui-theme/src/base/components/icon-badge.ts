import { defineStyleConfig } from '@chakra-ui/styled-system'

export const iconBadgeTheme = defineStyleConfig({
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    outline: ({ colorScheme }) => {
      return {
        borderWidth: '1px',
        borderColor: colorScheme ? `${colorScheme}.500` : 'chakra-border-color',
        color: colorScheme ? `${colorScheme}.500` : 'currentColor',
      }
    },
    solid: ({ colorScheme = 'gray' }) => {
      return {
        bg: `${colorScheme}.500`,
        color: 'white',
      }
    },
  },
  sizes: {
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
  },
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
})
