import { Card, Heading, Text } from '@chakra-ui/react'
import { barY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import type { Meta } from '@storybook/react-vite'
import * as React from 'react'

import { Chart, useChart } from '../src'

export default {
  title: 'Charts/Chart',
  component: Chart.Root,
} as Meta

const revenue = [
  { date: 'Jan', revenue: 12500 },
  { date: 'Feb', revenue: 15800 },
  { date: 'Mar', revenue: 14200 },
  { date: 'Apr', revenue: 16900 },
  { date: 'May', revenue: 13600 },
  { date: 'Jun', revenue: 19200 },
]

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const Bar = () => {
  const chart = useChart({
    data: revenue,
    series: [{ name: 'revenue', label: 'Revenue', color: 'indigo.solid' }],
  })

  const definition = React.useMemo(
    () =>
      chart.define({
        marks: [
          barY(chart.data, {
            x: 'date',
            y: 'revenue',
            fill: chart.color('indigo.solid'),
            maxThickness: 20,
            radius: 2,
          }),
        ],
        x: {
          scale: () => scaleBand<string>().padding(0.28),
          grid: false,
          axis: { line: false, ticks: { size: 0 } },
        },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: {
            line: false,
            ticks: {
              size: 0,
              format: (value) => compactCurrency.format(value),
            },
          },
        },
      }),
    [chart],
  )

  return (
    <Card.Root maxW="lg">
      <Card.Header gap="0">
        <Heading size="sm" fontWeight="medium" color="fg.muted">
          Revenue
        </Heading>
        <Text fontSize="lg" fontWeight="medium">
          $19,200
        </Text>
      </Card.Header>
      <Card.Body>
        <Chart.Root
          chart={chart}
          definition={definition}
          height={240}
          ariaLabel="Monthly revenue"
        />
      </Card.Body>
    </Card.Root>
  )
}
