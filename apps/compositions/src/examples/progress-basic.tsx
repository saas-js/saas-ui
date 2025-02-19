'use client'

import { Progress } from '@saas-ui/react'

export const ProgressBasic = () => {
  return (
    <Progress.Root maxW="240px" value={50}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
