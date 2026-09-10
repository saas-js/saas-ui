'use client';
import { InfoTip } from 'compositions/ui/info-tip'
import { Progress } from '@chakra-ui/react'

export const ProgressWithLabelInfo = () => {
  return (
    <Progress.Root maxW="240px">
      <Progress.Label mb="2">
        Uploading <InfoTip>Uploading document to the server</InfoTip>
      </Progress.Label>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
