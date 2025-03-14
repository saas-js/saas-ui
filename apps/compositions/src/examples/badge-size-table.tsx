'use client'

import { For, Span, useRecipe } from '@chakra-ui/react'
import { Badge } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const BadgeSizeTable = () => {
  const recipe = useRecipe({ key: 'badge' })
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
                    <Badge size={v} colorPalette={c} variant="solid">
                      New
                    </Badge>
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
