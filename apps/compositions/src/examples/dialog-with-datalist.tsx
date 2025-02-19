'use client'

import { HStack, Textarea, VStack } from '@chakra-ui/react'
import { Avatar, Badge, Button, DataList, Dialog } from '@saas-ui/react'

export const DialogWithDatalist = () => {
  return (
    <VStack alignItems="start">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Prepare Chakra V3</Dialog.Title>
            <Dialog.CloseButton />
          </Dialog.Header>
          <Dialog.Body pb="8">
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Status</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Badge colorPalette="green">Completed</Badge>
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Assigned to</DataList.ItemLabel>
                <DataList.ItemValue>
                  <HStack>
                    <Avatar
                      size="xs"
                      name="Eelco Wiersma"
                      src="https://eelco.dev"
                    />
                    Eelco Wiersma
                  </HStack>
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Due date</DataList.ItemLabel>
                <DataList.ItemValue>12th August 2024</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            <Textarea placeholder="Add a note" mt="8" />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    </VStack>
  )
}
