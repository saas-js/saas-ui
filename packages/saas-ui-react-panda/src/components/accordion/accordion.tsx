import { ComponentProps } from 'react'

import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { styled } from '@saas-ui/panda-preset/jsx'
import { accordion } from '@saas-ui/panda-preset/recipes'

import { createStyleContext } from '../context'

const { withProvider, withContext } = createStyleContext(accordion)

export type AccordionProps = ComponentProps<typeof Root>

export const Root = withProvider(styled(ArkAccordion.Root), 'root')
export const Item = withContext(styled(ArkAccordion.Item), 'item')
export const ItemTrigger = withContext(
  styled(ArkAccordion.ItemTrigger),
  'itemTrigger',
)
export const ItemContent = withContext(
  styled(ArkAccordion.ItemContent),
  'itemContent',
)
export const ItemBody = withContext(styled.div, 'itemBody')
export const ItemIndicator = withContext(
  styled(ArkAccordion.ItemIndicator),
  'itemIndicator',
)
