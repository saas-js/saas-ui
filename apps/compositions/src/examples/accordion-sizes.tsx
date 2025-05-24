'use client'

import { For, Stack, Text } from '@chakra-ui/react'
import { Accordion } from '@saas-ui/react'

export const AccordionSizes = () => {
  return (
    <Stack gap="8">
      <For each={['sm', 'md', 'lg']}>
        {(size) => (
          <Stack gap="2">
            <Text fontWeight="semibold">{size}</Text>
            <Accordion.Root
              size={size}
              key={size}
              collapsible
              defaultValue={['b']}
            >
              {items.map((item, index) => (
                <Accordion.Item key={index} value={item.value}>
                  <Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
                  <Accordion.ItemContent>{item.text}</Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Stack>
        )}
      </For>
    </Stack>
  )
}

const items = [
  { value: 'a', title: 'First Item', text: 'Some value 1...' },
  { value: 'b', title: 'Second Item', text: 'Some value 2...' },
  { value: 'c', title: 'Third Item', text: 'Some value 3...' },
]
