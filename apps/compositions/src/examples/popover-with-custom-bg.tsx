'use client'

import { Input, Text, Button } from '@chakra-ui/react'
import { Popover } from 'compositions/ui/popover'

export const PopoverWithCustomBg = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content css={{ '--popover-bg': 'lightblue' }}>
        <Popover.Arrow />
        <Popover.Body>
          <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
          <Text my="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>
          <Input bg="bg" placeholder="Your fav. character" size="sm" />
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
