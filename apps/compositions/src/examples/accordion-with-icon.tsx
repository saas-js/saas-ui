'use client'

import { Heading, Icon, Stack } from '@chakra-ui/react'
import { Accordion } from '@saas-ui/react'
import { LuChartBarStacked, LuTags } from 'react-icons/lu'

export const AccordionWithIcon = () => {
  return (
    <Stack width="full" maxW="400px">
      <Heading size="md">Product details</Heading>
      <Accordion.Root collapsible defaultValue={['info']}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              <Icon fontSize="lg" color="fg.subtle">
                {item.icon}
              </Icon>
              {item.title}
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  )
}

const items = [
  {
    value: 'info',
    icon: <LuTags />,
    title: 'Product Info',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.',
  },
  {
    value: 'stats',
    icon: <LuChartBarStacked />,
    title: 'Stats',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.',
  },
]
