import { mode } from '@chakra-ui/theme-tools'

const SectionTitle = {
  parts: ['wrapper', 'title', 'description'],
  baseStyle: {
    wrapper: {
      spacing: [2, null, 3],
      mb: '10',
    },
    title: {
      size: 'xl',
    },
    description: {
      fontSize: 'lg',
      fontWeight: 'medium',
    },
  },
  variants: {
    default: (props: any) => ({
      title: {},
      description: {
        color: mode('gray.500', 'gray.400')(props),
      },
    }),
    dark: {
      title: {
        color: 'gray.800',
      },
      description: {
        color: 'gray.700',
      },
    },
    light: (props: any) => ({
      title: {
        color: 'white',
      },
      description: {
        color: 'gray.200',
      },
    }),
  },
  defaultProps: {
    variant: 'default',
  },
}

export default SectionTitle
