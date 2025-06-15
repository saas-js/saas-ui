'use client'

import { For, Span, Stack, useSlotRecipe } from '@chakra-ui/react'
import { Avatar, Tag } from '@saas-ui/react'
import { HiCheck, HiOutlineBriefcase } from 'react-icons/hi'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const TagVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'tag' })
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
                    <Stack align="flex-start">
                      <Tag variant={v} colorPalette={c}>
                        Gray
                      </Tag>

                      <Tag variant={v} colorPalette={c} closable>
                        Gray
                      </Tag>

                      <Tag
                        variant={v}
                        colorPalette={c}
                        startElement={<HiCheck />}
                      >
                        Gray
                      </Tag>

                      <Tag
                        variant={v}
                        colorPalette={c}
                        startElement={<HiOutlineBriefcase />}
                      >
                        Projects
                      </Tag>

                      <Tag
                        variant={v}
                        colorPalette={c}
                        borderRadius="full"
                        startElement={
                          <Avatar
                            size="full"
                            src="https://bit.ly/dan-abramov"
                            name="Dan Abramov"
                          />
                        }
                      >
                        Dan Abramov
                      </Tag>
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
