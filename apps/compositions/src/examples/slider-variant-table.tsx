'use client'

import { For, Span, useSlotRecipe } from '@chakra-ui/react'
import { Slider } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const SliderVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'slider' })
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
                    <Slider
                      defaultValue={[40]}
                      colorPalette={c}
                      variant={v}
                      minW="200px"
                      mb="2"
                    />
                    <Slider
                      defaultValue={[40]}
                      colorPalette={c}
                      variant={v}
                      minW="200px"
                      disabled
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
