import React from 'react'

import { Status } from '../status/status.tsx'

import { DataList } from './index.ts'

export default {
  title: 'Components/DataList',
}

export const Default = () => {
  return (
    <DataList.Root>
      <DataList.Item>
        <DataList.ItemLabel>Status</DataList.ItemLabel>
        <DataList.ItemValue>
          <Status value="new">New</Status>
        </DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}
