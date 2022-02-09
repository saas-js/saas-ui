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
  ...palette,
}
