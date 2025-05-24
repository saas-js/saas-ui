'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithSubmenu = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="new-txt">New Text File</Menu.Item>
        <Menu.Item value="new-file">New File...</Menu.Item>
        <Menu.Root positioning={{ placement: 'right-start', gutter: 2 }}>
          <Menu.TriggerItem value="open-recent">Open Recent</Menu.TriggerItem>
          <Menu.Content>
            <Menu.Item value="panda">Panda</Menu.Item>
            <Menu.Item value="ark">Ark UI</Menu.Item>
            <Menu.Item value="chakra">Chakra v3</Menu.Item>
          </Menu.Content>
        </Menu.Root>
        <Menu.Item value="open-file">Open File...</Menu.Item>
        <Menu.Item value="export">Export</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
