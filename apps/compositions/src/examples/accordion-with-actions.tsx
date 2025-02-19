'use client'

import { AbsoluteCenter, Box, Button } from '@chakra-ui/react'
import { Accordion } from '@saas-ui/react'
import LoremIpsum from 'react-lorem-ipsum'

export const AccordionWithActions = () => {
  return (
    <Accordion.Root spaceY="4" variant="plain" collapsible defaultValue={['b']}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Box position="relative">
            <Accordion.ItemTrigger indicatorPlacement="start">
              {item.title}
            </Accordion.ItemTrigger>
            <AbsoluteCenter axis="vertical" insetEnd="0">
              <Button variant="subtle" colorPalette="blue">
                Action
              </Button>
            </AbsoluteCenter>
          </Box>
          <Accordion.ItemContent>{item.text}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const items = [
  { value: 'a', title: 'First Item', text: <LoremIpsum /> },
  { value: 'b', title: 'Second Item', text: <LoremIpsum /> },
  { value: 'c', title: 'Third Item', text: <LoremIpsum /> },
]
