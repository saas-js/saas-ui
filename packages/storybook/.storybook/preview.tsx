import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { defaultSystem } from '@saas-ui/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Preview, ReactRenderer } from '@storybook/react'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
}

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        light: '',
        dark: 'dark',
      },
    }),
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
