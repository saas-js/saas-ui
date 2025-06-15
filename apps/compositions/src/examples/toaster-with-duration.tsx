'use client'

import { Button } from '@chakra-ui/react'
import { toast } from '@saas-ui/react'

export const ToasterWithDuration = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast.create({
          description: 'File saved successfully',
          duration: 6000,
        })
      }
    >
      Show Toast
    </Button>
  )
}
