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
      fontWeight: '500',
    },
  },
  variants: {
    default: ({ colorMode }: any) => ({
      title: {},
      description: {
        color: 'gray.500',
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
    light: ({ colorMode }: any) => ({
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
