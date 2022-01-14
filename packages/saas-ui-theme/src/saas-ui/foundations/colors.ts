import { createPalette } from '@saas-ui/palette'

const palette = createPalette('#6d28d9', {
  blackLuminance: 0.005,
  colors: {
    gray: '#1f2937',
    yellow: '#fbbf24',
    red: '#d00b00',
    green: '#10b981',
    indigo: '#6d5ace',
  },
})

export default {
  primary: palette.purple,
  secondary: palette.cyan,
  presence: {
    online: 'green.500',
    offline: 'gray.400',
    busy: 'orange.500',
    dnd: 'red.500',
    away: 'gray.400',
  },
  app: {
    background: {
      light: 'white',
      dark: 'black',
    },
    text: {
      light: 'black',
      dark: 'white',
    },
  },
  sidebar: {
    background: {
      light: palette.gray[200],
      dark: palette.gray[800],
    },
    text: {
      light: 'black',
      dark: 'white',
    },
  },
  navbar: {
    background: {
      light: palette.gray[200],
      dark: palette.gray[900],
    },
    text: {
      light: 'black',
      dark: 'white',
    },
  },
  ...palette,
}
