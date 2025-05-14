'use client'

import { DataList } from '@saas-ui/react'

export const DataListWithSeparator = () => {
  return (
    <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
      {items.map((item) => (
        <DataList.Item pt="4" flexGrow={1} key={item.value}>
          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
          <DataList.ItemValue>{item.value}</DataList.ItemValue>
        </DataList.Item>
      ))}
    </DataList.Root>
  )
}

const items = [
  { label: 'First Name', value: 'Jassie' },
  { label: 'Last Name', value: 'Bhatia' },
  { label: 'Email', value: 'jassie@jassie.dev' },
  { label: 'Phone', value: '1234567890' },
  { label: 'Address', value: '1234 Main St, Anytown, USA' },
]
