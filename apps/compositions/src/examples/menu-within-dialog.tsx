'use client'

import { HStack } from '@chakra-ui/react'
import { Button, Dialog, Menu } from '@saas-ui/react'
import Lorem from 'react-lorem-ipsum'

export const MenuWithinDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Body>
          <HStack justify="space-between" mb="6">
            <Dialog.Title>Welcome to the menu</Dialog.Title>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                  Menu
                </Button>
              </Menu.Trigger>
              <Menu.Content portalled={false}>
                <Menu.Item value="new-txt">New Text File</Menu.Item>
                <Menu.Item value="new-file">New File...</Menu.Item>
                <Menu.Item value="new-win">New Window</Menu.Item>
                <Menu.Item value="open-file">Open File...</Menu.Item>
                <Menu.Item value="export">Export</Menu.Item>
              </Menu.Content>
            </Menu.Root>
          </HStack>
          <Lorem p={4} />
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  )
}
