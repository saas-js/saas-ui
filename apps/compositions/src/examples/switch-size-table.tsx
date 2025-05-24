'use client'

import { For, HStack, Span, useSlotRecipe } from '@chakra-ui/react'
import { Switch } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const SwitchSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'switch' })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
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
                    <HStack>
                      <For each={recipe.variantMap.variant}>
                        {(t) => (
                          <Switch
                            key={t}
                            variant={t}
                            size={v}
                            colorPalette={c}
                            defaultChecked
                          />
                        )}
                      </For>
                    </HStack>
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
