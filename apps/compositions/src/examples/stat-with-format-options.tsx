'use client'

import { Stat } from '@saas-ui/react'

export const StatWithFormatOptions = () => {
  return (
    <Stat.Root>
      <Stat.Label>Revenue</Stat.Label>
      <Stat.ValueText
        value={935.4}
        formatOptions={{ style: 'currency', currency: 'USD' }}
      />
    </Stat.Root>
  )
}
