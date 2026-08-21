'use client'

import { BarSegment, useChart } from '@saas-ui/charts'

const data = [
  { name: 'Starter', value: 70, color: 'indigo.solid' },
  { name: 'Pro', value: 40, color: 'pink.solid' },
  { name: 'Enterprise', value: 25, color: 'fg' },
]

export const BarSegmentWithLegend = () => {
  const chart = useChart({ data })

  return (
    <BarSegment.Root chart={chart} maxW="lg">
      <BarSegment.Content>
        <BarSegment.Label />
        <BarSegment.Bar tooltip />
        <BarSegment.Value />
      </BarSegment.Content>
      <BarSegment.Legend showValue showPercent />
    </BarSegment.Root>
  )
}
