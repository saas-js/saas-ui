'use client'

import { Text } from '@chakra-ui/react'
import { Button, Input, Popover } from '@saas-ui/react'

export const PopoverBasic = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>
          <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
          <Text my="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>
          <Input placeholder="Your fav. character" size="sm" />
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
