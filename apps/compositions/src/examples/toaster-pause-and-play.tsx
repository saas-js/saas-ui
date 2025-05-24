'use client'

import { useId, useState } from 'react'

import { Button, HStack } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'
import { HiPause, HiPlay } from 'react-icons/hi'

export const ToasterPauseAndPlay = () => {
  const id = useId()
  const [paused, setPaused] = useState(false)
  const [shown, setShown] = useState(false)

  const show = () => {
    toast.success({
      id,
      title: 'This is a success toast',
      onStatusChange: (details) => {
        if (details.status === 'visible') {
          setShown(true)
        } else if (details.status === 'dismissing') {
          setShown(false)
        }
      },
    })
  }

  const pause = () => {
    toast.pause(id)
    setPaused(true)
  }

  const play = () => {
    toast.resume(id)
    setPaused(false)
  }

  return (
    <HStack>
      <Button variant="outline" size="sm" onClick={show} disabled={shown}>
        Show Toast
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={pause}
        disabled={!shown || paused}
      >
        <HiPause />
        Pause Toast
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={play}
        disabled={!shown || !paused}
      >
        <HiPlay />
        Play Toast
      </Button>
    </HStack>
  )
}
