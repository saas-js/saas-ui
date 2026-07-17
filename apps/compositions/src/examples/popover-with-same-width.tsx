'use client';
import { Button } from '@chakra-ui/react'
import { Popover } from 'compositions/ui/popover'

export const PopoverWithSameWidth = () => {
  return (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline" minW="xs">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content width="auto">
        <Popover.Arrow />
        <Popover.Body>
          This is a popover with the same width as the trigger button
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
