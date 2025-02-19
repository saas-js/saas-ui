'use client'

import { For, Group, Stack } from '@chakra-ui/react'
import { Button, Steps } from '@saas-ui/react'

export const StepsWithSizes = () => {
  return (
    <Stack gap="16">
      <For each={['sm', 'md', 'lg']}>
        {(size) => (
          <Steps.Root key={size} size={size} count={3}>
            <Steps.List>
              <Steps.Item index={0} title="Step 1" />
              <Steps.Item index={1} title="Step 2" />
              <Steps.Item index={2} title="Step 3" />
            </Steps.List>

            <Steps.Content index={0}>Step 1</Steps.Content>
            <Steps.Content index={1}>Step 2</Steps.Content>
            <Steps.Content index={2}>Step 3</Steps.Content>
            <Steps.CompletedContent>
              All steps are complete!
            </Steps.CompletedContent>

            <Group>
              <Steps.PrevTrigger asChild>
                <Button variant="outline" size="sm">
                  Prev
                </Button>
              </Steps.PrevTrigger>
              <Steps.NextTrigger asChild>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </Steps.NextTrigger>
            </Group>
          </Steps.Root>
        )}
      </For>
    </Stack>
  )
}
