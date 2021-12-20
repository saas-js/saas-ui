const Section = {
  baseStyle: {
    pt: 28,
    pb: 28,
  },
  variants: {
    subtle: {},
    solid: {
      bg: 'primary.400',
    },
    alternate: ({ colorMode }: any) => ({
      bg: colorMode === 'dark' ? 'gray.800' : 'gray.50',
    }),
  },
  defaultProps: {
    variant: 'subtle',
  },
}

export default Section
