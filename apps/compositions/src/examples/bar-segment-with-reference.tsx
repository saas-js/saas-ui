'use client'

import { BarSegment, useChart } from '@saas-ui/charts'

const data = [
  { name: 'Used', value: 72, color: 'indigo.solid' },
  { name: 'Available', value: 28, color: 'bg.muted' },
]

export const BarSegmentWithReference = () => {
  const chart = useChart({ data })

  return (
    <BarSegment.Root chart={chart} maxW="lg">
      <BarSegment.Content>
        <BarSegment.Bar>
          <BarSegment.Reference value={80} label="Limit" />
        </BarSegment.Bar>
      </BarSegment.Content>
      <BarSegment.Legend showValue showPercent />
    </BarSegment.Root>
  )
}
