'use client'

import { Button, HStack } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterWithExternalClose = () => {
  return (
    <HStack>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.create({
            description: 'File saved successfully',
            type: 'info',
          })
        }
      >
        Show Toast
      </Button>

      <Button variant="outline" size="sm" onClick={() => toast.dismiss()}>
        Close Toasts
      </Button>
    </HStack>
  )
}
