import { mode } from '@chakra-ui/theme-tools'

const SectionTitle = {
  parts: ['wrapper', 'title', 'description'],
  baseStyle: {
    wrapper: {
      spacing: [2, null, 3],
      mb: '10',
      textAlign: ['left', null, 'center'],
    },
    title: {
      width: '100%',
    },
    description: {
      fontWeight: 'normal',
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
    size: 'xl',
  },
  sizes: {
    lg: {
      title: {
        size: '3xl',
      },
      description: {
        fontSize: '2xl',
      },
    },
    xl: {
      wrapper: {
        mb: 14,
        spacing: [2, null, 3],
      },
      title: {
        fontSize: { base: '3xl', lg: '5xl' },
      },
      description: {
        fontSize: { base: '2xl', lg: '3xl' },
      },
    },
  },
}

export default SectionTitle
