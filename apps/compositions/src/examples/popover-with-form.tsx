'use client'

import { Field, Input, Stack, Textarea } from '@chakra-ui/react'
import { Button, Popover } from '@saas-ui/react'

export const PopoverWithForm = () => {
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
          <Stack gap="4">
            <Field.Root>
              <Field.Label>Width</Field.Label>
              <Input placeholder="40px" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Height</Field.Label>
              <Input placeholder="32px" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Comments</Field.Label>
              <Textarea placeholder="Start typing..." />
            </Field.Root>
          </Stack>
        </Popover.Body>
        <Popover.CloseTrigger />
      </Popover.Content>
    </Popover.Root>
  )
}
