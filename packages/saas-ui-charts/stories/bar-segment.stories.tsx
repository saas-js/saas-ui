import { Card } from '@chakra-ui/react'
import type { Meta } from '@storybook/react-vite'

import { BarSegment, useChart } from '../src'

export default {
  title: 'Charts/BarSegment',
} as Meta

const data = [
  { name: 'Starter', value: 70, color: 'indigo.solid' },
  { name: 'Pro', value: 40, color: 'pink.solid' },
  { name: 'Enterprise', value: 25, color: 'fg' },
]

export const Basic = () => {
  const chart = useChart({ data })

  return (
    <Card.Root maxW="sm" p="4">
      <BarSegment.Root chart={chart}>
        <BarSegment.Content>
          <BarSegment.Bar tooltip />
        </BarSegment.Content>
        <BarSegment.Legend showValue />
      </BarSegment.Root>
    </Card.Root>
  )
}
