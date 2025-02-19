'use client'

import * as React from 'react'

import { Accordion } from '@chakra-ui/react/accordion'

import { ChevronRightIcon } from '../icons/icons.tsx'

export interface ItemTriggerProps extends Accordion.ItemTriggerProps {
  indicatorIcon?: React.ReactNode
  indicatorPlacement?: 'start' | 'end'
}

export const ItemTrigger = React.forwardRef<
  HTMLButtonElement,
  ItemTriggerProps
>(function AccordionItemTrigger(props, ref) {
  const {
    children,
    indicatorPlacement = 'end',
    indicatorIcon = <ChevronRightIcon />,
    ...rest
  } = props

  const indicator = (
    <Accordion.ItemIndicator>{indicatorIcon}</Accordion.ItemIndicator>
  )

  return (
    <Accordion.ItemTrigger {...rest} ref={ref}>
      {indicatorPlacement === 'start' && indicator}
      {children}
      {indicatorPlacement === 'end' && indicator}
    </Accordion.ItemTrigger>
  )
})

export interface ItemContentProps extends Accordion.ItemContentProps {}

export const ItemContent = React.forwardRef<HTMLDivElement, ItemContentProps>(
  function AccordionItemContent(props, ref) {
    return (
      <Accordion.ItemContent>
        <Accordion.ItemBody {...props} ref={ref} />
      </Accordion.ItemContent>
    )
  },
)

export const Root = Accordion.Root
export const Item = Accordion.Item

export type RootProps = Accordion.RootProps
export type ItemProps = Accordion.ItemProps
