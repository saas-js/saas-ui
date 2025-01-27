import * as React from 'react'

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from '@chakra-ui/react'
import { StoryObj } from '@storybook/react'

import { BarChart } from '../src'
import { createData } from './utils'

export default {
  title: 'Visualization/BarChart',
  component: BarChart,
  decorators: [
    (Story: React.ComponentType) => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<typeof BarChart>

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
    yAxisWidth: 80,
    valueFormatter: (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    },
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Revenue growth</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChart {...args} />
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
          <BarChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}

export const Stacked: Story = {
  args: {
    data: createData({
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      categories: ['New', 'Active', 'Churned'],
      startValues: [50, 30, 2],
      growthRate: 1.05,
    }),
    height: '300px',
    categories: ['New', 'Active', 'Churned'],
    colors: ['green', 'blue', 'red'],
    stack: true,
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Developers</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}

export const StackedBySign: Story = {
  args: {
    data: createData({
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      categories: ['New', 'Active', 'Churned'],
      startValues: [50, 30, -20],
      growthRate: 1.05,
    }),
    height: '300px',
    categories: ['New', 'Active', 'Churned'],
    colors: ['green', 'blue', 'red'],
    stack: true,
    stackOffset: 'sign',
    barSize: 8,
  },
  render: (args) => {
    return (
      <Card.Root size="sm">
        <Card.Header pb="0">
          <Card.Title>Developers</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChart {...args} />
        </Card.Body>
      </Card.Root>
    )
  },
}
