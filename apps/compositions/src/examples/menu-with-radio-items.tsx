'use client'

import { useState } from 'react'

import { Button, Menu } from '@saas-ui/react'
import { HiSortAscending } from 'react-icons/hi'

export const MenuWithRadioItems = () => {
  const [value, setValue] = useState('asc')
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiSortAscending /> Sort
        </Button>
      </Menu.Trigger>
      <Menu.Content minW="10rem">
        <Menu.RadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
          <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
        </Menu.RadioItemGroup>
      </Menu.Content>
    </Menu.Root>
  )
}
