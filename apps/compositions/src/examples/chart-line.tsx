'use client'

import { Chart, useChart } from '@saas-ui/charts'
import { lineY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { useMemo } from 'react'

const data = [
  { date: 'Jan', active: 1240 },
  { date: 'Feb', active: 1580 },
  { date: 'Mar', active: 1490 },
  { date: 'Apr', active: 1820 },
  { date: 'May', active: 1760 },
  { date: 'Jun', active: 2110 },
]

export const ChartLine = () => {
  const chart = useChart({
    data,
    series: [{ name: 'active', label: 'Active users', color: 'indigo.solid' }],
  })

  const definition = useMemo(
    () =>
      chart.define({
        marks: [
          lineY(chart.data, {
            x: 'date',
            y: 'active',
            stroke: chart.color('indigo.solid'),
            strokeWidth: 2,
            points: true,
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
          axis: { line: false, ticks: { size: 0 } },
        },
      }),
    [chart],
  )

  return (
    <Chart.Root
      chart={chart}
      definition={definition}
      height={240}
      ariaLabel="Active users"
    />
  )
}
