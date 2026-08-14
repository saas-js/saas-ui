'use client';
import { InfoTip } from 'compositions/ui/info-tip'
import { Stat } from 'compositions/ui/stat'

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
