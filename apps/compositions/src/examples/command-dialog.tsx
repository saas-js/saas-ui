'use client'

import { useState } from 'react'

import {
  Command,
  Kbd,
  Text,
  useCommandCollection,
  useHotkeys,
} from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import {
  LuCreditCard,
  LuLayoutDashboard,
  LuLogOut,
  LuSearch,
  LuSettings,
  LuUsers,
} from 'react-icons/lu'

export const CommandDialog = () => {
  const [open, setOpen] = useState(false)

  useHotkeys({
    commands: [
      {
        // The docs search already uses mod+k; use it in your own app.
        hotkey: 'mod+j',
        action: () => setOpen((open) => !open),
      },
    ],
  })

  const command = useCommandCollection({
    initialItems: items,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Provider value={command}>
      <Command.Dialog open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Command.DialogTrigger asChild>
          <Button variant="outline" size="sm" gap="3">
            <LuSearch />
            <Text color="fg.muted">Search...</Text>
            <Kbd size="sm">⌘J</Kbd>
          </Button>
        </Command.DialogTrigger>
        <Command.DialogBackdrop />
        <Command.DialogContent maxW="lg" p="0" overflow="hidden">
          <Command.Root>
            <Command.Control>
              <Command.Indicator>
                <LuSearch />
              </Command.Indicator>
              <Command.Input placeholder="Search for a page or action..." />
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
                    </Command.Item>
                  ))}
                </Command.ItemGroup>
              ))}
            </Command.List>
            <Command.Footer>
              <span>
                <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate
              </span>
              <span>
                <Kbd size="sm">↵</Kbd> to select
              </span>
              <span>
                <Kbd size="sm">esc</Kbd> to close
              </span>
            </Command.Footer>
          </Command.Root>
        </Command.DialogContent>
      </Command.Dialog>
    </Command.Provider>
  )
}

const items = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    group: 'Pages',
    icon: <LuLayoutDashboard />,
  },
  { value: 'members', label: 'Members', group: 'Pages', icon: <LuUsers /> },
  {
    value: 'billing',
    label: 'Billing',
    group: 'Pages',
    icon: <LuCreditCard />,
    keywords: ['invoices', 'plan', 'subscription'],
  },
  {
    value: 'settings',
    label: 'Settings',
    group: 'Pages',
    icon: <LuSettings />,
  },
  { value: 'log-out', label: 'Log out', group: 'Account', icon: <LuLogOut /> },
]
