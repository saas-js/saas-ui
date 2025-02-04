import React from 'react'

import { VStack } from '@saas-ui/panda-preset/jsx'
import type { Preview } from '@storybook/react'

import './index.css'

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      document.body.classList.add('light')

      return (
        <VStack gap={4} alignItems={'flex-start'}>
          <Story />
        </VStack>
      )
    },
  ],
} satisfies Preview
