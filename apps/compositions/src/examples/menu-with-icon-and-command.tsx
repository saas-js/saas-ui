'use client'

import { Box } from '@chakra-ui/react'
import { Button, Menu } from '@saas-ui/react'
import { LuClipboardPaste, LuCopy, LuScissors } from 'react-icons/lu'

export const MenuWithIconAndCommand = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Edit</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="cut" valueText="cut">
          <LuScissors />
          <Box flex="1">Cut</Box>
          <Menu.ItemCommand>⌘X</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="copy" valueText="copy">
          <LuCopy />
          <Box flex="1">Copy</Box>
          <Menu.ItemCommand>⌘C</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Item value="paste" valueText="paste">
          <LuClipboardPaste />
          <Box flex="1">Paste</Box>
          <Menu.ItemCommand>⌘V</Menu.ItemCommand>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
