'use client'

import { For, Span, Stack, Input } from '@chakra-ui/react'
import { useRecipe } from '@chakra-ui/react/styled-system'

import { PlaygroundTable } from '../lib/playground-table'

export const InputSizeTable = () => {
  const recipe = useRecipe({ key: 'input' })
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.size}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Stack>
                  <Input size={v} placeholder="Placeholder" />
                  <Input variant="subtle" size={v} placeholder="Placeholder" />
                </Stack>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}
