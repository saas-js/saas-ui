'use client'

import { useState } from 'react'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { Button, toast } from '@saas-ui/react'

export const ToasterLifecycle = () => {
  const [statusLog, setStatusLog] = useState<[number, string][]>([])
  const [dismissed, setDismissed] = useState(true)

  return (
    <Stack align="flex-start">
      <Button
        disabled={!dismissed}
        variant="outline"
        size="sm"
        onClick={() =>
          toast.create({
            description: 'This is a toast',
            type: 'info',
            onStatusChange({ status }) {
              setDismissed(status === 'unmounted')
              setStatusLog((prev) => [[Date.now(), status], ...prev])
            },
          })
        }
      >
        Show Toast
      </Button>

      <Stack padding="2" width="full" role="log" borderWidth="1px" minH="100px">
        {statusLog.map(([time, toastStatus], i) => {
          const date = new Date(time)
          return (
            <HStack as="pre" fontFamily="mono" textStyle="sm" key={i}>
              {date.toLocaleTimeString()}{' '}
              <Text fontWeight="bold">{toastStatus}</Text>
            </HStack>
          )
        })}
      </Stack>
    </Stack>
  )
}
