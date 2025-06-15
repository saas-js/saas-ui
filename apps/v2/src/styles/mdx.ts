const mdx = {
  h1: {
    mt: '2rem',
    mb: '.25rem',
    lineHeight: 1.2,
    fontWeight: 'semibold',
    fontSize: '1.875rem',
    letterSpacing: '-.025em',
  },
  h2: {
    mt: '4rem',
    mb: '0.5rem',
    lineHeight: 1.3,
    fontWeight: 'semibold',
    fontSize: '1.5rem',
    letterSpacing: '-.025em',
    '& + h3': {
      mt: '1.5rem',
    },
  },
  h3: {
    mt: '3rem',
    // mb: "0.5rem",
    lineHeight: 1.25,
    fontWeight: 'semibold',
    fontSize: '1.25rem',
    letterSpacing: '-.025em',
  },
  h4: {
    mt: '3rem',
    lineHeight: 1.375,
    fontWeight: 'semibold',
    fontSize: '1.125rem',
  },
  description: {
    color: 'gray.500',
    fontSize: 'xl',
    mb: '0.5rem',
    _dark: {
      color: 'gray.400',
    },
  },
  a: {
    color: 'primary.600',
    fontWeight: 'medium',
    transition: 'color 0.15s',
    transitionTimingFunction: 'ease-out',
    _hover: {
      color: 'black',
    },
    _dark: {
      color: 'primary.300',
      _hover: {
        color: 'white',
      },
    },
  },
  p: {
    mt: '1.25rem',
    lineHeight: 1.7,
    'blockquote &': {
      mt: 0,
    },
  },
  hr: {
    my: '4rem',
  },
  blockquote: {
    bg: 'orange.100',
    borderWidth: '1px',
    borderColor: 'orange.200',
    rounded: 'lg',
    px: '1.25rem',
    py: '1rem',
    my: '1.5rem',
  },
  ul: {
    mt: '1.5rem',
    ml: '1.25rem',
    'blockquote &': { mt: 0 },
    '& > * + *': {
      mt: '0.25rem',
    },
  },
  code: {
    rounded: 'sm',
    px: '1',
    fontSize: '0.875em',
    py: '2px',
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
    borderWidth: '1px',
    borderRadius: 'md',
    color: 'primary.200',
    _dark: {
      color: 'primary.200',
    },
  },
}

export default mdx
