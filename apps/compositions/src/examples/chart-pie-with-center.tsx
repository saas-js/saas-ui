'use client'

import { Chart, useChart } from '@saas-ui/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { Stack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

const data = [
  { name: 'Starter', value: 42 },
  { name: 'Pro', value: 35 },
  { name: 'Enterprise', value: 23 },
]

export const ChartPieWithCenter = () => {
  const chart = useChart({
    data,
    series: [
      { name: 'Starter', color: 'indigo.solid' },
      { name: 'Pro', color: 'pink.solid' },
      { name: 'Enterprise', color: 'fg' },
    ],
  })

  const definition = useMemo(() => {
    const slices = pie(chart.data, {
      value: 'value',
      gapAngle: (2 * Math.PI) / 180,
    })

    return chart.define({
      marks: [
        polar({
          marks: [
            radialArc(slices, {
              key: 'name',
              color: 'name',
              innerRadius: ({ radius }) => radius * 0.68,
              stroke: 'none',
            }),
          ],
        }),
      ],
      color: {
        domain: chart.data.map((item) => item.name),
        range: chart.palette,
      },
      margin: 0,
    })
  }, [chart])

  return (
    <Chart.Root
      chart={chart}
      definition={definition}
      height={240}
      ariaLabel="Customers by plan"
    >
      <Chart.Center>
        <Stack gap="0" align="center">
          <Text textStyle="xs" color="fg.muted">
            Customers
          </Text>
          <Text textStyle="lg" fontWeight="medium">
            {chart.getTotal('value')}
          </Text>
        </Stack>
      </Chart.Center>
    </Chart.Root>
  )
}
