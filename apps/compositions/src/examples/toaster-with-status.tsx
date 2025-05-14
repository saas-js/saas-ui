'use client'

import { Button, For, HStack } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterWithStatus = () => {
  return (
    <HStack>
      <For each={['success', 'error', 'warning', 'info']}>
        {(type) => (
          <Button
            size="sm"
            variant="outline"
            key={type}
            onClick={() =>
              toast.create({
                title: `Toast status is ${type}`,
                type: type,
              })
            }
          >
            {type}
          </Button>
        )}
      </For>
    </HStack>
  )
}
