'use client'

import { BarList, useChart, type BarListData } from '@saas-ui/charts'

const data: BarListData[] = [
  { name: 'Referral', value: 640 },
  { name: 'Direct', value: 1240 },
  { name: 'Social', value: 310 },
  { name: 'Organic', value: 890 },
]

export const BarListSorted = () => {
  const chart = useChart({
    data,
    sort: { by: 'value', direction: 'desc' },
    series: [{ name: 'name', color: 'teal.solid' }],
  })

  return (
    <BarList.Root chart={chart} maxW="sm">
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
  )
}
