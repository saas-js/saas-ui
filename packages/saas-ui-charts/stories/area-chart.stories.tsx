import { Container, Text } from '@chakra-ui/react'
import * as React from 'react'
import { StoryObj } from '@storybook/react'

import { AreaChart } from '../src'

export default {
  title: 'Components/Visualization/AreaChart',
  component: AreaChart,
  decorators: [
    (Story: React.ComponentType) => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<typeof AreaChart>

export const Basic: Story = {
  args: {
    data: [
      {
        date: 'Jan 22',
        SemiAnalysis: 2890,
        'The Pragmatic Engineer': 2338,
      },
      {
        date: 'Feb 22',
        SemiAnalysis: 2756,
        'The Pragmatic Engineer': 2103,
      },
      {
        date: 'Mar 22',
        SemiAnalysis: 3322,
        'The Pragmatic Engineer': 2194,
      },
      {
        date: 'Apr 22',
        SemiAnalysis: 3470,
        'The Pragmatic Engineer': 2108,
      },
      {
        date: 'May 22',
        SemiAnalysis: 3475,
        'The Pragmatic Engineer': 1812,
      },
      {
        date: 'Jun 22',
        SemiAnalysis: 3129,
        'The Pragmatic Engineer': 1726,
      },
    ],
    height: '300px',
    categories: ['SemiAnalysis', 'The Pragmatic Engineer'],
  },
}
