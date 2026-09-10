'use client'

import { Badge, For, DataList } from '@chakra-ui/react'
import { useSlotRecipe } from '@chakra-ui/react/styled-system'

import { PlaygroundTable } from '../lib/playground-table'

export const DataListSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'dataList' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td>
                <DataList.Root size={v}>
                  <DataList.Item>
                    <DataList.ItemLabel>Name</DataList.ItemLabel>
                    <DataList.ItemValue>John Doe</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Email</DataList.ItemLabel>
                    <DataList.ItemValue>john@test.com</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Status</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Badge colorPalette="teal">Active</Badge>
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
