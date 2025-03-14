import React from 'react'

import { Button, Text } from '@chakra-ui/react'

import { DataList } from '../data-list'
import { Popover } from './index.ts'

export default {
  title: 'Components/Popover',
  component: Popover.Root,
}

export const Basic = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Display
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>
          <DataList.Root>
            <DataList.Item>
              <DataList.ItemLabel>Name</DataList.ItemLabel>
              <DataList.ItemValue>John Doe</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
