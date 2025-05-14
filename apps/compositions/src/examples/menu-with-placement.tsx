'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithPlacement = () => {
  return (
    <Menu.Root positioning={{ placement: 'right-start' }}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="new-txt">New Text File</Menu.Item>
        <Menu.Item value="new-file">New File...</Menu.Item>
        <Menu.Item value="new-win">New Window</Menu.Item>
        <Menu.Item value="open-file">Open File...</Menu.Item>
        <Menu.Item value="export">Export</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
