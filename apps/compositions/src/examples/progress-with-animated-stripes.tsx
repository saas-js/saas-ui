'use client'

import { Progress } from '@saas-ui/react'

export const ProgressWithAnimatedStripes = () => {
  return (
    <Progress.Root maxW="240px" striped animated>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
