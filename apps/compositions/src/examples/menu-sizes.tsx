'use client';
import { HStack } from '@chakra-ui/react'
import { Menu } from 'compositions/ui/menu'

export const MenuSizes = () => {
  return (
    <HStack>
      <Menu.Root size="sm">
        <Menu.Button>Open</Menu.Button>
        <Menu.Content>
          <Menu.Item value="new-txt">New Text File</Menu.Item>
          <Menu.Item value="new-file">New File...</Menu.Item>
          <Menu.Item value="new-win">New Window</Menu.Item>
          <Menu.Item value="open-file">Open File...</Menu.Item>
          <Menu.Item value="export">Export</Menu.Item>
        </Menu.Content>
      </Menu.Root>
      <Menu.Root size="md">
        <Menu.Button>Open</Menu.Button>
        <Menu.Content>
          <Menu.Item value="new-txt">New Text File</Menu.Item>
          <Menu.Item value="new-file">New File...</Menu.Item>
          <Menu.Item value="new-win">New Window</Menu.Item>
          <Menu.Item value="open-file">Open File...</Menu.Item>
          <Menu.Item value="export">Export</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </HStack>
  )
}
