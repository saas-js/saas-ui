'use client'

import { Group } from '@chakra-ui/react'
import { Button, Steps } from '@saas-ui/react'

export const StepsWithDescription = () => {
  return (
    <Steps.Root defaultStep={1} count={3}>
      <Steps.List>
        <Steps.Item index={0} title="Step 1" description="This step" />
        <Steps.Item index={1} title="Step 2" description="That step" />
        <Steps.Item index={2} title="Step 3" description="Final step" />
      </Steps.List>

      <Steps.Content index={0}>Step 1</Steps.Content>
      <Steps.Content index={1}>Step 2</Steps.Content>
      <Steps.Content index={2}>Step 3</Steps.Content>
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

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
  )
}
