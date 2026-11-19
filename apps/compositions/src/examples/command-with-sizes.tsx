'use client'

import { Command, Stack, useCommandCollection } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

export const CommandWithSizes = () => {
  return (
    <Stack gap="6" maxW="md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <SizedCommand key={size} size={size} />
      ))}
    </Stack>
  )
}

const SizedCommand = (props: { size: 'sm' | 'md' | 'lg' }) => {
  const command = useCommandCollection({ initialItems: items })

  return (
    <Command.Root command={command} size={props.size} borderWidth="1px">
      <Command.Control>
        <Command.Indicator>
          <LuSearch />
        </Command.Indicator>
        <Command.Input placeholder={`Search (size="${props.size}")`} />
      </Command.Control>
      <Command.List>
        {command.collection.items.map((item) => (
          <Command.Item key={item.value} item={item}>
            <Command.ItemText>{item.label}</Command.ItemText>
          </Command.Item>
        ))}
      </Command.List>
    </Command.Root>
  )
}

const items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'drafts', label: 'Drafts' },
  { value: 'archive', label: 'Archive' },
]
