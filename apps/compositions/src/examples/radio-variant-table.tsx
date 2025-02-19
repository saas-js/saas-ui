'use client'

import { For, HStack, Span, useSlotRecipe } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const RadioVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'radioGroup' })
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
                    <RadioGroup
                      defaultValue="1"
                      colorPalette={c}
                      variant={v}
                      readOnly
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <Radio value="1">Radio</Radio>
                        <Radio value="2">Radio</Radio>
                      </HStack>
                    </RadioGroup>
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
