'use client'

import { Chart, useChart } from '@saas-ui/charts'
import { barY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { useMemo } from 'react'

const data = [
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

export const ChartBar = () => {
  const chart = useChart({
    data,
    series: [{ name: 'revenue', label: 'Revenue', color: 'indigo.solid' }],
  })

  const definition = useMemo(
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
              format: (value: number) => compactCurrency.format(value),
            },
          },
        },
      }),
    [chart],
  )

  return (
    <Chart.Root
      chart={chart}
      definition={definition}
      height={240}
      ariaLabel="Monthly revenue"
    />
  )
}
