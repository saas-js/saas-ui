'use client'

import { For, HStack, Span, useSlotRecipe } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const RadioSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'radioGroup' })
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
                    <RadioGroup.Root
                      colorPalette={c}
                      size={v}
                      defaultValue="1"
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <Radio value="1">Radio</Radio>
                        <Radio value="2">Radio</Radio>
                      </HStack>
                    </RadioGroup.Root>
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
