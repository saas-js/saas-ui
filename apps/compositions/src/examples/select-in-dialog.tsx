'use client';
import { useRef } from 'react'

import { createListCollection, Button } from '@chakra-ui/react'
import { Dialog } from 'compositions/ui/dialog'
import { Select } from 'compositions/ui/select'

export const SelectInDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  return (
    <Dialog.Root>
      <Dialog.Backdrop />
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content ref={contentRef}>
        <Dialog.CloseTrigger />
        <Dialog.Header>
          <Dialog.Title>Select in Dialog</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Select.Root collection={frameworks} size="sm">
            <Select.Label>Select framework</Select.Label>
            <Select.Trigger>
              <Select.ValueText placeholder="Select movie" />
            </Select.Trigger>
            <Select.Content portalRef={contentRef}>
              {frameworks.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Dialog.Body>
        <Dialog.Footer />
      </Dialog.Content>
    </Dialog.Root>
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
