'use client'

import { Button, Menu } from '@saas-ui/react'

const Item = (props: { item: Item }) => {
  const { item } = props

  if (item.children) {
    return (
      <Menu.Root positioning={{ placement: 'right-start', gutter: 2 }}>
        <Menu.TriggerItem value={item.value}>{item.label}</Menu.TriggerItem>
        <Menu.Content>
          {item.children.map((item) => (
            <Item key={item.value} item={item} />
          ))}
        </Menu.Content>
      </Menu.Root>
    )
  }

  return <Menu.Item value={item.value}>{item.label}</Menu.Item>
}

export const MenuWithSubmenuDynamic = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Nested</Button>
      </Menu.Trigger>
      <Menu.Content>
        {items.map((item) => (
          <Item key={item.value} item={item} />
        ))}
      </Menu.Content>
    </Menu.Root>
  )
}

interface Item {
  value: string
  label: string
  children?: Item[]
}

const items: Item[] = [
  { value: 'new-txt', label: 'New Text File' },
  { value: 'new-file', label: 'New File...' },
  {
    value: 'open-recent',
    label: 'Open Recent',
    children: [
      { value: 'panda', label: 'Panda' },
      { value: 'ark', label: 'Ark UI' },
      {
        value: 'chakra',
        label: 'Chakra v3',
        children: [
          { value: 'chakra-1', label: 'Chakra v3.1' },
          { value: 'chakra-2', label: 'Chakra v3.2' },
        ],
      },
    ],
  },
  { value: 'open-file', label: 'Open File...' },
  { value: 'export', label: 'Export' },
]
