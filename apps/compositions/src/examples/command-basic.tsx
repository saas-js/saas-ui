'use client'

import { Command, useCommandCollection } from '@chakra-ui/react'
import {
  LuCalendar,
  LuFileText,
  LuMail,
  LuSearch,
  LuSettings,
  LuUser,
  LuX,
} from 'react-icons/lu'

export const CommandBasic = () => {
  const command = useCommandCollection({
    initialItems: items,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Root command={command} borderWidth="1px" maxW="md">
      <Command.Label>Search commands</Command.Label>
      <Command.Control>
        <Command.Indicator>
          <LuSearch />
        </Command.Indicator>
        <Command.Input placeholder="Type a command or search..." />
        <Command.ClearTrigger>
          <LuX />
        </Command.ClearTrigger>
      </Command.Control>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        {command.collection.group().map(([group, groupItems]) => (
          <Command.ItemGroup key={group}>
            <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
            {groupItems.map((item) => (
              <Command.Item key={item.value} item={item}>
                {item.icon}
                <Command.ItemText highlight>{item.label}</Command.ItemText>
                {item.shortcut?.map((key) => (
                  <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                ))}
              </Command.Item>
            ))}
          </Command.ItemGroup>
        ))}
      </Command.List>
    </Command.Root>
  )
}

const items = [
  {
    value: 'calendar',
    label: 'Calendar',
    group: 'Suggestions',
    icon: <LuCalendar />,
  },
  {
    value: 'search-emails',
    label: 'Search emails',
    group: 'Suggestions',
    icon: <LuMail />,
    keywords: ['inbox'],
  },
  {
    value: 'new-document',
    label: 'New document',
    group: 'Suggestions',
    icon: <LuFileText />,
    shortcut: ['⌘', 'N'],
  },
  {
    value: 'profile',
    label: 'Profile',
    group: 'Settings',
    icon: <LuUser />,
    shortcut: ['⌘', 'P'],
  },
  {
    value: 'settings',
    label: 'Settings',
    group: 'Settings',
    icon: <LuSettings />,
    shortcut: ['⌘', ','],
  },
]
