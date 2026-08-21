'use client'

import { Chart, useChart } from '@saas-ui/charts'
import { areaY, lineY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { useMemo } from 'react'

const data = [
  { date: 'Jan', mrr: 42000 },
  { date: 'Feb', mrr: 45800 },
  { date: 'Mar', mrr: 47600 },
  { date: 'Apr', mrr: 51200 },
  { date: 'May', mrr: 53800 },
  { date: 'Jun', mrr: 58100 },
]

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const ChartArea = () => {
  const chart = useChart({
    data,
    series: [{ name: 'mrr', label: 'MRR', color: 'indigo.solid' }],
  })

  const definition = useMemo(
    () =>
      chart.define({
        marks: [
          areaY(chart.data, {
            x: 'date',
            y: 'mrr',
            fill: chart.color('indigo.solid'),
            fillOpacity: 0.16,
          }),
          lineY(chart.data, {
            x: 'date',
            y: 'mrr',
            stroke: chart.color('indigo.solid'),
            strokeWidth: 2,
          }),
        ],
        x: {
          scale: () => scaleBand<string>().padding(0.12),
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
      ariaLabel="Monthly recurring revenue"
    />
  )
}
