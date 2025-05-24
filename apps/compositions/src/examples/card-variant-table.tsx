'use client'

import { For, useSlotRecipe } from '@chakra-ui/react'
import { Button, Card } from '@saas-ui/react'

import { PlaygroundTable } from '../lib/playground-table'

export const CardVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'card' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <td key={v}>
              <Card.Root variant={v}>
                <Card.Body gap="2">
                  <Card.Title>Card Title</Card.Title>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Description>
                </Card.Body>
                <Card.Footer>
                  <Button variant="solid" colorPalette="blue">
                    Button
                  </Button>
                </Card.Footer>
              </Card.Root>
            </td>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}
