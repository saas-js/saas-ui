import { ComponentProps } from 'react'

import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { accordion } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(accordion)

export type AccordionProps = ComponentProps<typeof Root>

export const Root = withProvider(ArkAccordion.Root, 'root')
export const Item = withContext(ArkAccordion.Item, 'item')
export const ItemTrigger = withContext(ArkAccordion.ItemTrigger, 'itemTrigger')
export const ItemContent = withContext(ArkAccordion.ItemContent, 'itemContent')
export const ItemBody = withContext('div', 'itemBody')
export const ItemIndicator = withContext(
  ArkAccordion.ItemIndicator,
  'itemIndicator',
)
