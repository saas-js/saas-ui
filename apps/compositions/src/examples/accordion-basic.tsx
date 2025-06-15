'use client'

import { Accordion } from '@saas-ui/react'

export const AccordionBasic = () => {
  return (
    <Accordion.Root collapsible defaultValue={['b']}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.text}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const items = [
  { value: 'a', title: 'First Item', text: 'Some value 1...' },
  { value: 'b', title: 'Second Item', text: 'Some value 2...' },
  { value: 'c', title: 'Third Item', text: 'Some value 3...' },
]
