'use client'

import { HStack, createListCollection } from '@chakra-ui/react'
import { Avatar, Select } from '@saas-ui/react'

const SelectValueItem = () => (
  <Select.ValueText placeholder="Select movie">
    {(items: Array<{ name: string; avatar: string }>) => {
      const { name, avatar } = items[0]
      return (
        <HStack>
          <Avatar name={name} size="xs" src={avatar} />
          {name}
        </HStack>
      )
    }}
  </Select.ValueText>
)

export const SelectWithAvatar = () => {
  return (
    <Select.Root
      collection={members}
      size="sm"
      width="240px"
      defaultValue={['jessica_jones']}
      positioning={{ sameWidth: true }}
    >
      <Select.Label>Select member</Select.Label>
      <Select.Trigger>
        <SelectValueItem />
      </Select.Trigger>
      <Select.Content portalled={false}>
        {members.items.map((item) => (
          <Select.Item item={item} key={item.id} justifyContent="flex-start">
            <Avatar name={item.name} src={item.avatar} size="xs" />
            {item.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const members = createListCollection({
  items: [
    {
      name: 'Jessica Jones',
      id: 'jessica_jones',
      avatar:
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100',
    },
    {
      name: 'Kenneth Johnson',
      id: 'kenneth_johnson',
      avatar:
        'https://images.unsplash.com/photo-1523477800337-966dbabe060b?w=100',
    },
    {
      name: 'Kate Wilson',
      id: 'kate_wilson',
      avatar:
        'https://images.unsplash.com/photo-1609712409631-dbbb050746d1?w=100',
    },
  ],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
})
