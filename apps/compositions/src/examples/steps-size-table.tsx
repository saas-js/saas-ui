'use client'

import {
  For,
  Group,
  Span,
  type StepsRootProps,
  useSlotRecipe,
} from '@chakra-ui/react'
import { Button, Steps } from '@saas-ui/react'

import { PlaygroundTable } from '../lib/playground-table'

export const StepsSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'steps' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td key={v}>
                    <DemoSteps
                      size={v}
                      variant={c}
                      minW="600px"
                      defaultValue={1}
                      count={3}
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

const DemoSteps = (props: StepsRootProps) => {
  return (
    <Steps.Root {...props}>
      <Steps.List>
        <Steps.Item index={0} title="Step 1" />
        <Steps.Item index={1} title="Step 2" />
        <Steps.Item index={2} title="Step 3" />
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
