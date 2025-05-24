'use client'

import { HStack } from '@chakra-ui/react'
import { Stat } from '@saas-ui/react'

export const StatWithTrend = () => {
  return (
    <Stat.Root>
      <Stat.Label>Unique </Stat.Label>
      <HStack>
        <Stat.ValueText
          value={8456.4}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
        <Stat.UpTrend>12%</Stat.UpTrend>
      </HStack>
      <Stat.HelpText>since last month</Stat.HelpText>
    </Stat.Root>
  )
}
