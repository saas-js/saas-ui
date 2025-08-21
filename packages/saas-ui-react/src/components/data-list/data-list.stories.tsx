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
      <DataList.Item>
        <DataList.ItemLabel>Created at</DataList.ItemLabel>
        <DataList.ItemValue>2025-01-01</DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}

export const Vertical = () => {
  return (
    <DataList.Root orientation="vertical">
      <DataList.Item>
        <DataList.ItemLabel>Status</DataList.ItemLabel>
        <DataList.ItemValue>
          <Status value="new">New</Status>
        </DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Created at</DataList.ItemLabel>
        <DataList.ItemValue>2025-01-01</DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}

export const VerticalRow = () => {
  return (
    <DataList.Root orientation="vertical" flexDirection="row" gap="8">
      <DataList.Item>
        <DataList.ItemLabel>Status</DataList.ItemLabel>
        <DataList.ItemValue>
          <Status value="new">New</Status>
        </DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Created at</DataList.ItemLabel>
        <DataList.ItemValue>2025-01-01</DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}

export const LabelWidth = () => {
  return (
    <DataList.Root
      css={{
        '--label-width': '60px',
      }}
    >
      <DataList.Item>
        <DataList.ItemLabel>Status</DataList.ItemLabel>
        <DataList.ItemValue>
          <Status value="new">New</Status>
        </DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Created at</DataList.ItemLabel>
        <DataList.ItemValue>2025-01-01</DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}
