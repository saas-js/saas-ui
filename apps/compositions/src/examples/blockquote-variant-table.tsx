'use client'

import { For, Span, useSlotRecipe } from '@chakra-ui/react'
import { Blockquote, type BlockquoteProps } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const BlockquoteVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'blockquote' })

  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
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
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <DemoBlockquote variant={v} colorPalette={c} />
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

const DemoBlockquote = (props: BlockquoteProps) => {
  return (
    <Blockquote {...props}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
    </Blockquote>
  )
}
