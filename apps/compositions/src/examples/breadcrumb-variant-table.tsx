'use client'

import { For, Span, Stack, useSlotRecipe } from '@chakra-ui/react'
import { Breadcrumb } from '@saas-ui/react'

import { colorPalettes } from '../lib/color-palettes'
import { PlaygroundTable } from '../lib/playground-table'

export const BreadcrumbVariantTable = () => {
  const recipe = useSlotRecipe({ key: 'breadcrumb' })
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
                    <Stack>
                      <DemoBreadcrumb variant={v} colorPalette={c} />
                      <DemoBreadcrumb
                        variant={v}
                        colorPalette={c}
                        separator="/"
                      />
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

const DemoBreadcrumb = (props: Breadcrumb.RootProps) => {
  return (
    <Breadcrumb.Root {...props}>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
    </Breadcrumb.Root>
  )
}
