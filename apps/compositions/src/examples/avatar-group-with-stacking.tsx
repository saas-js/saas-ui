'use client'

import { Stack } from '@chakra-ui/react'
import { Avatar, AvatarGroup } from '@saas-ui/react'

export const AvatarGroupWithStacking = () => {
  return (
    <Stack>
      <AvatarGroup size="lg" stacking="last-on-top">
        {items.map((item) => (
          <Avatar key={item.name} src={item.src} name={item.name} />
        ))}
        <Avatar fallback="+3" />
      </AvatarGroup>

      <AvatarGroup size="lg" stacking="first-on-top">
        {items.map((item) => (
          <Avatar key={item.name} src={item.src} name={item.name} />
        ))}
        <Avatar fallback="+3" />
      </AvatarGroup>

      <AvatarGroup size="lg" spaceX="1" borderless>
        {items.map((item) => (
          <Avatar key={item.name} src={item.src} name={item.name} />
        ))}
        <Avatar fallback="+3" />
      </AvatarGroup>
    </Stack>
  )
}

const items = [
  {
    src: '/avatars/1.png',
    name: 'David Wilson',
  },
  {
    src: '/avatars/2.png',
    name: 'Marcus Chen',
  },
  {
    src: '/avatars/3.png',
    name: 'Sarah Johnson',
  },
]
