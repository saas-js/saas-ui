'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithGroupDynamic = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Window</Button>
      </Menu.Trigger>
      <Menu.Content spaceY="2">
        {items.map((item) => (
          <Menu.ItemGroup key={item.name} title={item.name}>
            {item.children.map((child) => (
              <Menu.Item key={child.value} value={child.value}>
                {child.name}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ))}
      </Menu.Content>
    </Menu.Root>
  )
}

const items = [
  {
    name: 'Top Panel',
    value: 'top',
    children: [
      { value: '5', name: 'index.html' },
      { value: '6', name: 'styles.css' },
    ],
  },
  {
    name: 'Bottom Panel',
    value: 'bottom',
    children: [
      { value: '7', name: 'script.js' },
      { value: '8', name: 'assets' },
    ],
  },
]
