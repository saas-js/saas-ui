'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithCommand = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="new-txt-a">
          New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="new-file-a">
          New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="new-win-a">
          New Window <Menu.ItemCommand>⌘⇧N</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="open-file-a">
          Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="export-a">
          Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
