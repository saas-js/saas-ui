'use client'

import { CheckboxGroup, Float, Icon, SimpleGrid } from '@chakra-ui/react'
import { CheckboxCard } from '@saas-ui/react'
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from 'react-icons/hi'

export const CheckboxCardWithIcon = () => {
  return (
    <CheckboxGroup defaultValue={['Guest']}>
      <SimpleGrid minChildWidth="200px" gap="2">
        {items.map((item) => (
          <CheckboxCard
            align="center"
            key={item.label}
            icon={
              <Icon fontSize="2xl" mb="2">
                {item.icon}
              </Icon>
            }
            label={item.label}
            description={item.description}
          />
        ))}
      </SimpleGrid>
    </CheckboxGroup>
  )
}

const items = [
  { icon: <HiShieldCheck />, label: 'Admin', description: 'Give full access' },
  { icon: <HiUser />, label: 'User', description: 'Give limited access' },
  {
    icon: <HiGlobeAlt />,
    label: 'Guest',
    description: 'Give read-only access',
  },
  { icon: <HiLockClosed />, label: 'Blocked', description: 'No access' },
]
