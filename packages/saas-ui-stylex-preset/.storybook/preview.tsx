import type { Preview } from '@storybook/react-vite'

import { ThemeProvider } from '../src/theme.tsx'
import './preview.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disabled: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light'

      if (typeof document !== 'undefined') {
        document.documentElement.className = theme
        document.documentElement.dataset.colorMode = theme
      }

      return (
        <ThemeProvider colorMode={theme} colorPalette="gray">
          <Story />
        </ThemeProvider>
      )
    },
  ],
}

export default preview
