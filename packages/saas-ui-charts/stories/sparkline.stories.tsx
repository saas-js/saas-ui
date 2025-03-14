import * as React from 'react'

import { Card, Container, SimpleGrid, Stat } from '@chakra-ui/react'
import { StoryObj } from '@storybook/react'

import { Sparkline } from '../src'
import { createData } from './utils'

export default {
  title: 'Visualization/Sparkline',
  component: Sparkline,
  decorators: [
    (Story: React.ComponentType) => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
}

type Story = StoryObj<typeof Sparkline>

const currencyFormatter = (value: number | bigint) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const Basic: Story = {
  args: {
    data: createData({
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      growthRate: 1.005,
      interval: 7,
    }),
    categories: ['value'],
  },
  render: (args) => {
    return (
      <Card.Root maxW="300px">
        <Card.Body>
          <Stat.Root>
            <Stat.Label>Revenue</Stat.Label>
            <Stat.ValueText>
              {currencyFormatter(
                Number(args.data[args.data.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline {...args} height="60px" mx="-3" />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
    )
  },
}

export const SolidVariant: Story = {
  args: {
    data: createData({
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      growthRate: 1.005,
      interval: 7,
    }),
    variant: 'solid',
  },
  render: (args) => {
    return (
      <Card.Root maxW="300px" overflow="clip">
        <Card.Body pb="0">
          <Stat.Root>
            <Stat.Label>Revenue</Stat.Label>
            <Stat.ValueText>
              {currencyFormatter(
                Number(args.data[args.data.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline
              {...args}
              height="60px"
              mx="-3"
              strokeWidth={1.5}
              curveType="natural"
            />
          </Stat.Root>
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
      categories: ['compareValue', 'value'],
      startValues: [3000, 4000],
      growthRate: 1.01,
    }),
    categories: ['compareValue', 'value'],
    colors: ['gray', 'purple'],
    curveType: 'monotone',
  },
  render: (args) => {
    const value = Number(args.data[args.data.length - 1].value ?? 0)
    const compareValue = Number(
      args.data[args.data.length - 1].compareValue ?? 0,
    )

    const percentage = Math.round(((value - compareValue) / value) * 100)

    return (
      <Card.Root maxW="300px">
        <Card.Body>
          <Stat.Root pos="relative">
            <Stat.Label>Revenue</Stat.Label>
            <Stat.HelpText pos="absolute" top="0" right="0">
              <Stat.UpIndicator /> {percentage}%
            </Stat.HelpText>
            <Stat.ValueText>
              {currencyFormatter(
                Number(args.data[args.data.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline {...args} height="60px" mx="-3" />
          </Stat.Root>
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
      categories: ['compareValue', 'value'],
      startValues: [3000, 4000],
      growthRate: 1.01,
    }),
    categories: ['compareValue', 'value'],
    colors: ['gray.300', 'purple'],
    curveType: 'monotone',
    stack: true,
  },
  render: (args) => {
    const value = Number(args.data[args.data.length - 1].value ?? 0)
    const compareValue = Number(
      args.data[args.data.length - 1].compareValue ?? 0,
    )

    const percentage = Math.round(((value - compareValue) / value) * 100)

    return (
      <Card.Root maxW="300px" size="sm">
        <Card.Body>
          <Stat.Root pos="relative">
            <Stat.Label>Revenue</Stat.Label>
            <Stat.HelpText pos="absolute" top="0" right="0">
              <Stat.UpIndicator /> {percentage}%
            </Stat.HelpText>
            <Stat.ValueText>
              {currencyFormatter(
                Number(args.data[args.data.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline {...args} height="60px" mx="-2" />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
    )
  },
}

export const Metrics = () => {
  const revenueData = createData({
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    growthRate: 1.005,
    interval: 7,
  })

  const customerData = createData({
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    growthRate: 1.005,
    interval: 7,
    startValues: [100],
  })

  const churnData = createData({
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    growthRate: 1.001,
    interval: 7,
    startValues: [5],
  })

  const valueData = createData({
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    growthRate: 1.002,
    interval: 7,
    startValues: [250],
  })

  return (
    <SimpleGrid columns={[2, null, 4]} gap="4">
      <Card.Root maxW="300px" size="sm">
        <Card.Body>
          <Stat.Root>
            <Stat.Label color="muted">Revenue</Stat.Label>
            <Stat.ValueText>
              {currencyFormatter(
                Number(revenueData[revenueData.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline
              data={revenueData}
              variant="gradient"
              height="40px"
              mx="-2"
            />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root maxW="300px" size="sm">
        <Card.Body>
          <Stat.Root>
            <Stat.Label color="muted">Signups</Stat.Label>
            <Stat.ValueText>
              {customerData[customerData.length - 1].value ?? 0}
            </Stat.ValueText>
            <Sparkline
              data={customerData}
              variant="gradient"
              height="40px"
              mx="-2"
            />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root maxW="300px" size="sm">
        <Card.Body>
          <Stat.Root>
            <Stat.Label color="muted">Churn</Stat.Label>
            <Stat.ValueText>
              {churnData[churnData.length - 1].value ?? 0}
            </Stat.ValueText>
            <Sparkline
              data={churnData}
              variant="gradient"
              height="40px"
              mx="-2"
            />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
      <Card.Root maxW="300px" size="sm">
        <Card.Body>
          <Stat.Root>
            <Stat.Label color="muted">Average customer value</Stat.Label>
            <Stat.ValueText>
              {currencyFormatter(
                Number(valueData[valueData.length - 1].value ?? 0),
              )}
            </Stat.ValueText>
            <Sparkline
              data={valueData}
              variant="gradient"
              height="40px"
              mx="-2"
            />
          </Stat.Root>
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  )
}
