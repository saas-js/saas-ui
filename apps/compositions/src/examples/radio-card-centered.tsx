'use client'

import { HStack, Icon } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'
import { LuClock, LuDollarSign, LuTrendingUp } from 'react-icons/lu'

export const RadioCardCentered = () => {
  return (
    <RadioCard.Root orientation="vertical" align="center" defaultValue="next">
      <RadioCard.Label>Select contract type</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item
            icon={
              <Icon fontSize="2xl" color="fg.muted" mb="2">
                {item.icon}
              </Icon>
            }
            label={item.title}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { icon: <LuDollarSign />, value: 'fixed', title: 'Fixed Rate' },
  { icon: <LuTrendingUp />, value: 'milestone', title: 'Milestone' },
  { icon: <LuClock />, value: 'hourly', title: 'Hourly' },
]
