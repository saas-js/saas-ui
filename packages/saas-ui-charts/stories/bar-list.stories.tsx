import { Card } from '@chakra-ui/react'
import type { Meta } from '@storybook/react-vite'

import { BarList, useChart } from '../src'

export default {
  title: 'Charts/BarList',
} as Meta

const data = [
  { name: 'Direct', value: 1240 },
  { name: 'Organic', value: 890 },
  { name: 'Referral', value: 640 },
  { name: 'Social', value: 310 },
]

export const Basic = () => {
  const chart = useChart({
    data,
    series: [{ name: 'name', color: 'indigo.solid' }],
  })

  return (
    <Card.Root maxW="sm" p="4">
      <BarList.Root chart={chart}>
        <BarList.Title>Traffic</BarList.Title>
        <BarList.Content>
          <BarList.Label title="Source">
            <BarList.Bar tooltip />
          </BarList.Label>
          <BarList.Label title="Visitors" titleAlignment="end">
            <BarList.Value />
          </BarList.Label>
        </BarList.Content>
      </BarList.Root>
    </Card.Root>
  )
}
