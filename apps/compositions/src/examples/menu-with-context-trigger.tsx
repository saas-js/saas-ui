'use client'

import { Center } from '@chakra-ui/react'
import { Menu } from '@saas-ui/react'

export const MenuWithContextTrigger = () => {
  return (
    <Menu.Root>
      <Menu.ContextTrigger w="full">
        <Center
          width="full"
          height="40"
          userSelect="none"
          borderWidth="2px"
          borderStyle="dashed"
          rounded="lg"
          padding="4"
        >
          Right click here
        </Center>
      </Menu.ContextTrigger>
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
