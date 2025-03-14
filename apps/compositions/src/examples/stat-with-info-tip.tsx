import { Stat } from '@saas-ui/react'

import { InfoTip } from '../../../../packages/saas-ui-react/src/components/info-tip/info-tip'

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
