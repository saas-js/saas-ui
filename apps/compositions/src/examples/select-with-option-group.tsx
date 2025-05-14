'use client'

import { createListCollection } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'

export const SelectWithOptionGroup = () => {
  return (
    <Select.Root collection={frameworks} size="sm" width="320px">
      <Select.Label>Select framework</Select.Label>
      <Select.Trigger>
        <Select.ValueText placeholder="Select movie" />
      </Select.Trigger>
      <Select.Content>
        {categories.map((category) => (
          <Select.ItemGroup key={category.group} label={category.group}>
            {category.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.ItemGroup>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'Naruto', value: 'naruto', group: 'Anime' },
    { label: 'One Piece', value: 'one-piece', group: 'Anime' },
    { label: 'Dragon Ball', value: 'dragon-ball', group: 'Anime' },
    {
      label: 'The Shawshank Redemption',
      value: 'the-shawshank-redemption',
      group: 'Movies',
    },
    { label: 'The Godfather', value: 'the-godfather', group: 'Movies' },
    { label: 'The Dark Knight', value: 'the-dark-knight', group: 'Movies' },
  ],
})

const categories = frameworks.items.reduce(
  (acc, item) => {
    const group = acc.find((group) => group.group === item.group)
    if (group) {
      group.items.push(item)
    } else {
      acc.push({ group: item.group, items: [item] })
    }
    return acc
  },
  [] as { group: string; items: (typeof frameworks)['items'] }[],
)
