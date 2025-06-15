'use client'

import { createListCollection } from '@chakra-ui/react'
import { Button, Popover, Select } from '@saas-ui/react'

export const SelectInPopover = () => {
  return (
    <Popover.Root size="xs">
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          Select in Popover
        </Button>
      </Popover.Trigger>

      <Popover.Content>
        <Popover.Header>Select in Popover</Popover.Header>
        <Popover.Body>
          <Select.Root
            collection={frameworks}
            size="sm"
            positioning={{ sameWidth: true, placement: 'bottom' }}
          >
            <Select.Trigger>
              <Select.ValueText placeholder="Select" />
            </Select.Trigger>
            <Select.Content portalled={false} width="full">
              {frameworks.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Popover.Body>
      </Popover.Content>
    </Popover.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
