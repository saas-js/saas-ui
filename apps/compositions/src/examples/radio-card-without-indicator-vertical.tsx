'use client'

import { HStack, Icon } from '@chakra-ui/react'
import { RadioCard } from '@saas-ui/react'
import { RiAppleFill, RiBankCardFill, RiPaypalFill } from 'react-icons/ri'

export const RadioCardWithoutIndicatorVertical = () => {
  return (
    <RadioCard.Root
      orientation="vertical"
      align="center"
      maxW="400px"
      defaultValue="paypal"
    >
      <RadioCard.Label>Payment method</RadioCard.Label>
      <HStack>
        {items.map((item) => (
          <RadioCard.Item
            label={item.title}
            icon={
              <Icon fontSize="2xl" color="fg.muted">
                {item.icon}
              </Icon>
            }
            indicator={false}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { value: 'paypal', title: 'Paypal', icon: <RiPaypalFill /> },
  { value: 'apple-pay', title: 'Apple Pay', icon: <RiAppleFill /> },
  { value: 'card', title: 'Card', icon: <RiBankCardFill /> },
]
