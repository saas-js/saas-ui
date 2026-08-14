'use client';
import { For, Span, Textarea } from '@chakra-ui/react'
import { useRecipe } from '@chakra-ui/react/styled-system'

import { PlaygroundTable } from '../lib/playground-table'

export const TextareaVariantTable = () => {
  const recipe = useRecipe({ key: 'textarea' })
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr key={v}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Textarea variant={v} placeholder="Placeholder" />
              </td>
            </tr>
          )}
        </For>
        <tr>
          <td>
            <Span fontSize="sm" color="fg.muted" minW="8ch">
              unstyled
            </Span>
          </td>
          <td>
            <Textarea unstyled minW="320px" placeholder="Placeholder" />
          </td>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
