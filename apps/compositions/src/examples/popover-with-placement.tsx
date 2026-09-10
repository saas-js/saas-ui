'use client';
import { Button } from '@chakra-ui/react'
import { Popover } from 'compositions/ui/popover'

export const PopoverWithPlacement = () => {
  return (
    <Popover.Root positioning={{ placement: 'bottom-end' }}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>Some content</Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}
