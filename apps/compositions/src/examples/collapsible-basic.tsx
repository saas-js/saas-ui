'use client'

import { Collapsible } from '@chakra-ui/react'
import { Button, Card } from '@saas-ui/react'

export const CollapsibleBasic = () => (
  <Collapsible.Root>
    <Collapsible.Trigger asChild>
      <Button variant="ghost" mb="2">
        Toggle Collapsible
      </Button>
    </Collapsible.Trigger>
    <Collapsible.Content>
      <Card.Root p="2" px="4" textStyle="sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Card.Root>
    </Collapsible.Content>
  </Collapsible.Root>
)
