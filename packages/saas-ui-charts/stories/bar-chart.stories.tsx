import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from '@chakra-ui/react'
import * as React from 'react'
import { StoryObj } from '@storybook/react'
import { BarChart } from '../src'
import { createData } from './utils'

export default {
  title: 'Components/Visualization/BarChart',
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
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Revenue growth
          </Heading>
        </CardHeader>
        <CardBody>
          <BarChart {...args} />
        </CardBody>
      </Card>
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
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Developers
          </Heading>
        </CardHeader>
        <CardBody>
          <BarChart {...args} />
        </CardBody>
      </Card>
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
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Developers
          </Heading>
        </CardHeader>
        <CardBody>
          <BarChart {...args} />
        </CardBody>
      </Card>
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
  },
  render: (args) => {
    return (
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Developers
          </Heading>
        </CardHeader>
        <CardBody>
          <BarChart {...args} />
        </CardBody>
      </Card>
    )
  },
}
