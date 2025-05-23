'use client'

import type { AlertRootProps } from '@chakra-ui/react'
import { For, Span, useSlotRecipe } from '@chakra-ui/react'
import { Alert } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const AlertSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'alert' })
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
                    <AlertDemo size={v} colorPalette={c} />
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

const AlertDemo = (props: AlertRootProps) => {
  return (
    <Alert title="Alert Title" {...props}>
      Chakra UI v3 is the greatest! Check it out.
    </Alert>
  )
}
