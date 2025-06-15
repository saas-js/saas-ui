'use client'

import { For } from '@chakra-ui/react'
import { Avatar, HStack, Span, useSlotRecipe } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

function omit<T extends string | undefined>(
  arr: T[] | undefined,
  omit: T[],
): T[] {
  return arr?.filter((v) => !omit?.includes(v)) ?? []
}

export const AvatarSizeTable = () => {
  const recipe = useSlotRecipe({ key: 'avatar' })
  const sizeMap = omit(recipe.variantMap.size, ['full'])
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={sizeMap}>{(v) => <td key={v}>{v}</td>}</For>
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
              <For each={sizeMap}>
                {(v) => (
                  <td key={v}>
                    <HStack>
                      <Avatar
                        src="https://bit.ly/dan-abramov"
                        name="Dan Abramov"
                        colorPalette={c}
                        size={v}
                      />
                      <Avatar name="Dan Abramov" colorPalette={c} size={v} />
                      <Avatar colorPalette={c} size={v} />
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
