'use client'

import { InfoTip, Stat } from '@saas-ui/react'

export const StatWithInfoTip = () => {
  return (
    <Stat.Root>
      <Stat.Label>
        Unique <InfoTip>Some info</InfoTip>
      </Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
    </Stat.Root>
  )
}
