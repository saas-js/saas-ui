'use client'

import { Chart, useChart } from '@saas-ui/charts'
import { lineY } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { useMemo } from 'react'

const data = [
  { date: 'Jan', desktop: 820, mobile: 420 },
  { date: 'Feb', desktop: 910, mobile: 670 },
  { date: 'Mar', desktop: 880, mobile: 610 },
  { date: 'Apr', desktop: 1040, mobile: 780 },
  { date: 'May', desktop: 980, mobile: 780 },
  { date: 'Jun', desktop: 1120, mobile: 990 },
]

export const ChartLineMultiple = () => {
  const chart = useChart({
    data,
    series: [
      { name: 'desktop', label: 'Desktop', color: 'indigo.solid' },
      { name: 'mobile', label: 'Mobile', color: 'pink.solid' },
    ],
  })

  const definition = useMemo(
    () =>
      chart.define({
        marks: [
          lineY(chart.data, {
            x: 'date',
            y: 'desktop',
            stroke: chart.color('indigo.solid'),
            strokeWidth: 2,
            points: true,
          }),
          lineY(chart.data, {
            x: 'date',
            y: 'mobile',
            stroke: chart.color('pink.solid'),
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
      ariaLabel="Sessions by device"
    >
      <Chart.Legend />
    </Chart.Root>
  )
}
