'use client'

import { For, Span, Stack, useSlotRecipe } from '@chakra-ui/react'
import { Checkbox } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const CheckboxVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'checkbox' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
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
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Stack>
                      <Checkbox colorPalette={c} variant={v}>
                        Checkbox
                      </Checkbox>
                      <Checkbox colorPalette={c} variant={v} defaultChecked>
                        Checkbox
                      </Checkbox>
                      <Checkbox
                        colorPalette={c}
                        variant={v}
                        disabled
                        defaultChecked
                      >
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
