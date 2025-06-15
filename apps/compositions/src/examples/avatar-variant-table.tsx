import { For, HStack, Span, useSlotRecipe } from '@chakra-ui/react'
import { Avatar } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const AvatarVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'avatar' })
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
                    <HStack>
                      <Avatar
                        src="https://bit.ly/dan-abramov"
                        name="Dan Abramov"
                        colorPalette={c}
                        variant={v}
                      />
                      <Avatar name="Dan Abramov" colorPalette={c} variant={v} />
                      <Avatar colorPalette={c} variant={v} />
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
