'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithGroup = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Edit</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.ItemGroup title="Styles">
          <Menu.Item value="bold">Bold</Menu.Item>
          <Menu.Item value="underline">Underline</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Separator />
        <Menu.ItemGroup title="Align">
          <Menu.Item value="left">Left</Menu.Item>
          <Menu.Item value="middle">Middle</Menu.Item>
          <Menu.Item value="right">Right</Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Root>
  )
}
