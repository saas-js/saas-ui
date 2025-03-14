'use client'

import { Collapsible } from '@chakra-ui/react'
import { Button, Card } from '@saas-ui/react'

export const CollapsibleLazyMounted = () => (
  <Collapsible.Root unmountOnExit>
    <Collapsible.Trigger asChild>
      <Button variant="ghost" mb="2">
        Toggle Collapse (Unmount on exit)
      </Button>
    </Collapsible.Trigger>
    <Collapsible.Content>
      <Card.Root p="2" px="4" textStyle="sm">
        If you inspect the DOM, you'll notice that the content is unmounted when
        collapsed. This is useful for performance reasons when you have a lot of
        collapsible content.
      </Card.Root>
    </Collapsible.Content>
  </Collapsible.Root>
)
