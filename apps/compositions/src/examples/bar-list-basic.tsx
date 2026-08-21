'use client'

import { BarList, useChart, type BarListData } from '@saas-ui/charts'

const data: BarListData[] = [
  { name: 'Direct', value: 1240 },
  { name: 'Organic', value: 890 },
  { name: 'Referral', value: 640 },
  { name: 'Social', value: 310 },
]

export const BarListBasic = () => {
  const chart = useChart({
    data,
    series: [{ name: 'name', color: 'indigo.solid' }],
  })

  return (
    <BarList.Root chart={chart} maxW="sm">
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
