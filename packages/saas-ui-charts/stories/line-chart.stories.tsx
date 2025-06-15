import * as React from 'react'

import { Card, Container, Heading } from '@chakra-ui/react'
import { StoryObj } from '@storybook/react'

import { LineChart } from '../src'
import { createData } from './utils'

export default {
  title: 'Visualization/LineChart',
  component: LineChart,
  decorators: [
    (Story: React.ComponentType) => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<typeof LineChart>

export const Basic: Story = {
  args: {
    data: createData({
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      categories: ['Revenue'],
      growthRate: 1.005,
      interval: 7,
    }),
    height: '300px',
    categories: ['Revenue'],
    valueFormatter: (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    },
    yAxisWidth: 80,
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Revenue growth</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}

export const Multiple: Story = {
  args: {
    data: createData({
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      categories: ['Backend', 'Frontend'],
      startValues: [50, 30],
      growthRate: 1.01,
    }),
    height: '300px',
    categories: ['Backend', 'Frontend'],
    colors: ['purple', 'cyan'],
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Developers</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}

export const CustomYAxisBounds: Story = {
  args: {
    data: createData({
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      categories: ['Backend', 'Frontend'],
      startValues: [50, 30],
      growthRate: 1.01,
    }),
    height: '300px',
    categories: ['Backend', 'Frontend'],
    colors: ['purple', 'cyan'],
    minValue: 20,
    maxValue: 50,
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Developers</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}
