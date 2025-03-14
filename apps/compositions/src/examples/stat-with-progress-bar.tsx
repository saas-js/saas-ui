'use client'

import { Progress, Stat } from '@saas-ui/react'

export const StatWithProgressBar = () => {
  return (
    <Stat.Root maxW="240px">
      <Stat.Label>This week</Stat.Label>
      <Stat.ValueText
        value={1340}
        formatOptions={{
          currency: 'USD',
          style: 'currency',
          maximumFractionDigits: 0,
        }}
      />
      <Stat.HelpText mb="2">+12% from last week</Stat.HelpText>
      <Progress.Root>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stat.Root>
  )
}
