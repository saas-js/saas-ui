import {
  Card,
  CardBody,
  CardHeader,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import * as React from 'react'
import { StoryObj } from '@storybook/react'
import { Sparkline } from '../src'
import { createData } from './utils'

export default {
  title: 'Components/Visualization/Sparkline',
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

const currencyFormatter = (value) => {
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
      <Card maxW="300px">
        <CardBody>
          <Stat>
            <StatLabel>Revenue</StatLabel>
            <StatNumber>
              {currencyFormatter(args.data[args.data.length - 1].value ?? 0)}
            </StatNumber>
            <Sparkline {...args} height="60px" mx="-4" />
          </Stat>
        </CardBody>
      </Card>
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
      <Card maxW="300px">
        <CardBody pb="0">
          <Stat>
            <StatLabel>Revenue</StatLabel>
            <StatNumber>
              {currencyFormatter(args.data[args.data.length - 1].value ?? 0)}
            </StatNumber>
            <Sparkline
              {...args}
              height="60px"
              mx="-4"
              strokeWidth={1.5}
              curveType="natural"
            />
          </Stat>
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
      categories: ['compareValue', 'value'],
      startValues: [3000, 4000],
      growthRate: 1.01,
    }),
    categories: ['compareValue', 'value'],
    colors: ['gray.300', 'primary'],
    curveType: 'monotone',
  },
  render: (args) => {
    const value = Number(args.data[args.data.length - 1].value ?? 0)
    const compareValue = Number(
      args.data[args.data.length - 1].compareValue ?? 0
    )

    const percentage = Math.round(((value - compareValue) / value) * 100)

    return (
      <Card maxW="300px">
        <CardBody>
          <Stat pos="relative">
            <StatLabel>Revenue</StatLabel>
            <StatHelpText pos="absolute" top="0" right="0">
              <StatArrow type="increase" /> {percentage}%
            </StatHelpText>
            <StatNumber>
              {currencyFormatter(args.data[args.data.length - 1].value ?? 0)}
            </StatNumber>
            <Sparkline {...args} height="60px" mx="-4" />
          </Stat>
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
      categories: ['compareValue', 'value'],
      startValues: [3000, 4000],
      growthRate: 1.01,
    }),
    categories: ['compareValue', 'value'],
    colors: ['gray.300', 'primary'],
    curveType: 'monotone',
    stack: true,
  },
  render: (args) => {
    const value = Number(args.data[args.data.length - 1].value ?? 0)
    const compareValue = Number(
      args.data[args.data.length - 1].compareValue ?? 0
    )

    const percentage = Math.round(((value - compareValue) / value) * 100)

    return (
      <Card maxW="300px">
        <CardBody>
          <Stat pos="relative">
            <StatLabel>Revenue</StatLabel>
            <StatHelpText pos="absolute" top="0" right="0">
              <StatArrow type="increase" /> {percentage}%
            </StatHelpText>
            <StatNumber>
              {currencyFormatter(args.data[args.data.length - 1].value ?? 0)}
            </StatNumber>
            <Sparkline {...args} height="60px" mx="-4" />
          </Stat>
        </CardBody>
      </Card>
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
    <SimpleGrid columns={[2, null, 4]} spacing="4">
      <Card maxW="300px">
        <CardBody>
          <Stat>
            <StatLabel color="muted">Revenue</StatLabel>
            <StatNumber>
              {currencyFormatter(
                revenueData[revenueData.length - 1].value ?? 0
              )}
            </StatNumber>
            <Sparkline
              data={revenueData}
              variant="gradient"
              height="40px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>
      <Card maxW="300px">
        <CardBody>
          <Stat>
            <StatLabel color="muted">Signups</StatLabel>
            <StatNumber>
              {customerData[customerData.length - 1].value ?? 0}
            </StatNumber>
            <Sparkline
              data={customerData}
              variant="gradient"
              height="40px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>
      <Card maxW="300px">
        <CardBody>
          <Stat>
            <StatLabel color="muted">Churn</StatLabel>
            <StatNumber>
              {churnData[churnData.length - 1].value ?? 0}
            </StatNumber>
            <Sparkline
              data={churnData}
              variant="gradient"
              height="40px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>
      <Card maxW="300px">
        <CardBody>
          <Stat>
            <StatLabel color="muted">Average customer value</StatLabel>
            <StatNumber>
              {currencyFormatter(valueData[valueData.length - 1].value ?? 0)}
            </StatNumber>
            <Sparkline
              data={valueData}
              variant="gradient"
              height="40px"
              mx="-4"
            />
          </Stat>
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}
