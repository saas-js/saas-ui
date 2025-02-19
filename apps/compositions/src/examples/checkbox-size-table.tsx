'use client'

import { For, Span, Stack, useSlotRecipe } from '@chakra-ui/react'
import { Checkbox } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const CheckboxSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'checkbox' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <Stack>
                      <Checkbox colorPalette={c} size={v}>
                        Checkbox
                      </Checkbox>
                      <Checkbox colorPalette={c} size={v} defaultChecked>
                        Checkbox
                      </Checkbox>
                    </Stack>
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
