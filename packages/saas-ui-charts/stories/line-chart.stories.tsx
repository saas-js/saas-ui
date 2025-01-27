import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from '@chakra-ui/react'
import * as React from 'react'
import { StoryObj } from '@storybook/react'
import { LineChart } from '../src'
import { createData } from './utils'

export default {
  title: 'Components/Visualization/LineChart',
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
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Revenue growth
          </Heading>
        </CardHeader>
        <CardBody>
          <LineChart {...args} />
        </CardBody>
      </Card>
    )
  },
}
console.log(
  createData({
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    categories: ['Backend', 'Frontend'],
    startValues: [50, 30],
    growthRate: 1.01,
  })
)
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
          <LineChart {...args} />
        </CardBody>
      </Card>
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
      <Card>
        <CardHeader pb="0">
          <Heading as="h4" fontWeight="medium" size="md">
            Developers
          </Heading>
        </CardHeader>
        <CardBody>
          <LineChart {...args} />
        </CardBody>
      </Card>
    )
  },
}
