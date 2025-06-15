'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithDangerItem = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Menu
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="rename">Rename</Menu.Item>
        <Menu.Item value="export">Export</Menu.Item>
        <Menu.Item
          value="delete"
          color="fg.error"
          _hover={{ bg: 'bg.error', color: 'fg.error' }}
        >
          Delete...
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
