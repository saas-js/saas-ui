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
      p: 1,
    },
    md: {
      borderRadius: 'md',
      fontSize: '1em',
      p: 2,
    },
    lg: {
      borderRadius: 'md',
      fontSize: '1.3em',
      p: 3,
    },
  },
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
})
