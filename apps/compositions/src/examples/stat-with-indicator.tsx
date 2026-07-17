'use client'

import { Stat } from 'compositions/ui/stat'

export const StatWithIndicator = () => {
  return (
    <Stat.Root>
      <Stat.Label>Unique visitors</Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
      <Stat.DownTrend variant="plain" px="0">
        1.9%
      </Stat.DownTrend>
    </Stat.Root>
  )
}
