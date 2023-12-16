export const fonts = {
  heading: '"Inter Variable", InterVariable, Inter, sans-serif',
  body: '"Inter Variable", InterVariable, Inter, sans-serif',
}

export const textStyles = {
  pageTitle: {
    fontSize: { base: '2xl', sm: '3xl', md: '5xl', lg: '6xl' },
    fontWeight: 'semibold',
    lineHeight: '1.2',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundImage:
      'linear-gradient(to bottom, rgb(0, 0, 0, 0.70) 10%, rgba(0, 0, 0))',
    _dark: {
      backgroundImage:
        'linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.60))',
    },
  },
  sectionTitle: {
    fontWeight: 'semibold',
    lineHeight: '1.1',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundImage:
      'linear-gradient(to bottom, rgb(0, 0, 0, 0.70) 10%, rgba(0, 0, 0))',
    _dark: {
      backgroundImage:
        'linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.60))',
    },
  },
  cardTitle: {
    fontWeight: 'semibold',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundImage:
      'linear-gradient(to bottom, rgb(0, 0, 0, 0.70) 10%, rgba(0, 0, 0))',
    _dark: {
      backgroundImage:
        'linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.60))',
    },
  },
  subtitle: {
    fontSize: { base: 'sm', sm: 'sm', md: '2xl' },
    fontWeight: 'normal',
  },
}
